import _ from 'lodash-es'
import Constant from '../Config/Constant'

export default (props) => {
  const { propertyStructure } = props
  const {
    price,
    profitRate,
    elapsedYear,
    buildingSize,
    selfCapital,
    interestRate,
    loanDuration,
    rentRate,
    rentDecreaseRate,
    managementCost,
    maintainanceCost,
    purchaseCost,
    yearlyCost,
    reformAfter,
    reformEvery,
    reformFee,
    taxRate,
  } = _.mapValues(props, Number)

  const loanAmount = price - selfCapital
  const monthlyInterest = (interestRate / 100) / 12 // in percentage

  const totalMonths = (loanDuration + 10) * 12

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
  const yearlyItems = Array(totalMonths / 12).fill(1)
    .map((v, index) => {
      const items = monthlyItems.slice(index * 12, (index + 1) * 12)
      const currentYear = index + 1
      const loanPayment = _.sumBy(items, 'loanPayment')
      const interest = _.sumBy(items, 'interest')
      const principalPayment = _.sumBy(items, 'principalPayment')

      // income
      // income
      const expectedRent = (price * (profitRate / 100))
      const rentDecrease = index * (rentDecreaseRate / 100)
      const actualRent = expectedRent * (1 - rentDecrease)
      const emptyRoomLoss = actualRent * (1 - (rentRate / 100))
      const rentIncome = actualRent - emptyRoomLoss

      // yearly items
      const { year, reconstructurePrice } = Constant.PROPERTY_STRUCTURES[propertyStructure]
      const remainingYear = Math.max(year - elapsedYear, 0)
      const buildingYearlyDepreciation = (buildingSize * reconstructurePrice) / year
      const depreciation = (remainingYear - currentYear) >= 0 ? buildingYearlyDepreciation : 0

      // expenses
      const managementFee = rentIncome * (managementCost / 100)
      const maintainanceFee = rentIncome * (maintainanceCost / 100)
      const reformExpense = (index - (reformAfter - 1)) % reformEvery === 0 ? reformFee : 0

      // payout
      const payout = managementFee + maintainanceFee + yearlyCost + reformExpense + interest + (currentYear === 1 ? purchaseCost : 0)

      // cashflow
      const operatingIncome = rentIncome - (payout + emptyRoomLoss + depreciation)
      const tax = operatingIncome > 0 ? operatingIncome * (taxRate / 100) : 0
      const cashflow = operatingIncome - tax + depreciation + emptyRoomLoss - principalPayment

      const actualProfitRate = ((cashflow + principalPayment + interest) / (price + purchaseCost)) * 100

      accumulatedCashflow += cashflow

      return {
        year: currentYear,
        rentIncome,
        managementFee: -managementFee,
        maintainanceFee: -maintainanceFee,
        yearlyCost: -yearlyCost,
        reformExpense: -reformExpense,
        emptyRoomLoss: -emptyRoomLoss,
        depreciation: -depreciation,
        principalPayment: -principalPayment,
        interest: -interest,
        operatingIncome,
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
