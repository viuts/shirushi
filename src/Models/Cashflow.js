import _ from 'lodash-es'
import Constant from '../Config/Constant'

export default (props) => {
  const { propertyStructure } = props
  const {
    price,
    profitRate,
    elapsedYear,
    // buildingSize,
    selfCapital,
    interestRate,
    loanDuration,
    rentRate,
    rentDecreaseRate,
    managementCost,
    maintainanceCost,
    purchaseCost,
    yearlyCost,
    initialReformFee,
    reformAfter,
    reformEvery,
    reformFee,
    taxRate,
    propertyDepreciationRatio,
  } = _.mapValues(props, Number)

  const loanAmount = Math.max(price - selfCapital, 0)
  const monthlyInterest = (interestRate / 100) / 12 // in percentage

  const totalMonths = (loanDuration) * 12

  // x = Ar(1+r)^n / (1+r)^n −1
  // A -> loan Amount
  // r -> interest rate
  // n -> total payment count
  // x -> monthly payment amount

  const top = (loanAmount * monthlyInterest) * ((1 + monthlyInterest) ** (loanDuration * 12))
  const buttom = ((1 + monthlyInterest) ** (loanDuration * 12)) - 1
  const repayAmount = top / buttom

  const monthlyItems = Array(totalMonths).fill(1)
    .reduce((acc, v, index) => {
      // loan
      const interestableAmount = acc.length === 0 ? loanAmount : acc[acc.length - 1].remainingAmount
      const interest = interestableAmount > 0 ? (interestableAmount) * (monthlyInterest) : 0
      const principalPayment = interestableAmount > 0 ? repayAmount - interest : 0

      const newBase = (interestableAmount + interest)
      const loanPayment = newBase - repayAmount < 1 ? newBase : Math.min(repayAmount, newBase)
      const remainingAmount = Math.max(newBase - loanPayment, 0)

      acc.push({
        month: index + 1,
        interest,
        loanPayment,
        principalPayment,
        remainingAmount,
      })
      return acc
    }, [])

  // transform to year
  let accumulatedCashflow = 0
  let carryOverLost = 0
  let carryYears = 0

  // Before passing legal years
  // Depreciation Years = (Legal Years - Elapsed Years) + Elapsed Years * 0.2
  // After passing legal years
  // Depreciation Years = Legal Years * 0.2
  const { year } = Constant.PROPERTY_STRUCTURES[propertyStructure]

  let depreciations = [
    {
      name: 'building',
      years: year - elapsedYear > 0 ? Math.round((year - elapsedYear) + elapsedYear * 0.2) : Math.round(year * 0.2),
      amount: (price + purchaseCost) * (propertyDepreciationRatio / 100),
    },
    {
      name: 'initialReform',
      years: year,
      amount: initialReformFee,
    },
  ].map((item) => {
    item.depreciationAmount = item.amount / item.years
    return item
  })

  const yearlyIncomes = []
  const yearlyItems = Array(totalMonths / 12).fill(1)
    .map((v, index) => {
      const items = monthlyItems.slice(index * 12, (index + 1) * 12)
      const currentYear = index + 1
      const loanPayment = _.sumBy(items, 'loanPayment')
      const interest = _.sumBy(items, 'interest')
      const principalPayment = _.sumBy(items, 'principalPayment')

      // income
      const expectedRent = (price * (profitRate / 100))
      const rentDecrease = index * (rentDecreaseRate / 100)
      const actualRent = expectedRent * (1 - rentDecrease)
      const emptyRoomLoss = actualRent * (1 - (rentRate / 100))
      const rentIncome = actualRent - emptyRoomLoss

      // expenses
      const managementFee = rentIncome * (managementCost / 100)
      const maintainanceFee = rentIncome * (maintainanceCost / 100)
      let reformExpense = 0
      if (currentYear === 1) {
        reformExpense = initialReformFee
      } else {
        reformExpense = (index - (reformAfter - 1)) % reformEvery === 0 ? reformFee : 0
        if (reformExpense > 0) {
          depreciations.push({
            name: 'routineReform',
            years: year,
            amount: reformExpense,
            depreciationAmount: reformExpense / year,
          })
        }
      }

      // depreciation
      const depreciationAssets = depreciations.reduce((acc, cur) => {
        return acc + cur.amount
      }, 0)

      const depreciation = depreciations.reduce((acc, cur) => {
        if (cur.amount <= 0) {
          return acc
        }

        return acc + cur.depreciationAmount
      }, 0)

      depreciations = depreciations.map(({ name, years, amount, depreciationAmount }) => {
        return {
          name,
          years,
          amount: amount - depreciationAmount,
          depreciationAmount,
        }
      })

      // payout
      const payout = managementFee + maintainanceFee + yearlyCost + interest
      const capitalPayout = reformExpense + (currentYear === 1 ? purchaseCost : 0)

      // cashflow
      const operatingIncome = rentIncome - (payout + depreciation)
      if (operatingIncome < 0) {
        carryOverLost += operatingIncome
      } else {
        carryOverLost = Math.min(carryOverLost + operatingIncome, 0)
      }

      const taxableIncome = Math.max(operatingIncome + carryOverLost, 0)
      if (carryOverLost < 0 && taxableIncome < 0) {
        carryYears += 1
      }

      // reset if it passed 10 years
      if (carryYears > 10 || carryOverLost === 0) {
        carryOverLost = 0
        carryYears = 0
      }

      const tax = taxableIncome > 0 ? taxableIncome * (taxRate / 100) : 0
      const cashflow = operatingIncome - tax + depreciation - principalPayment - capitalPayout

      yearlyIncomes.push({
        year: currentYear,
        amount: operatingIncome,
      })

      const actualProfitRate = ((cashflow + principalPayment + interest) / (price + purchaseCost)) * 100

      accumulatedCashflow += cashflow

      return {
        year: currentYear,
        rentIncome,
        managementFee: -managementFee,
        maintainanceFee: -maintainanceFee,
        yearlyCost: currentYear === 1 ? -(yearlyCost + purchaseCost) : -yearlyCost,
        reformExpense: -reformExpense,
        emptyRoomLoss: -emptyRoomLoss,
        depreciationAssets,
        depreciation: -depreciation,
        principalPayment: -principalPayment,
        interest: -interest,
        carryOverLost,
        operatingIncome,
        taxableIncome,
        tax: -tax,
        cashflow,
        loanPayment: -loanPayment,
        remainingAmount: -items[items.length - 1].remainingAmount,
        accumulatedCashflow,
        actualProfitRate,
      }
    })

  return yearlyItems
}
