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
      const remainingAmount = interestableAmount > 0 ? (interestableAmount - repayAmount) * (1 + monthlyInterest) : 0
      const loanPayment = Math.min(repayAmount, interestableAmount)

      acc.push({
        month: index + 1,
        loanPayment,
        remainingAmount: Math.max(remainingAmount, 0),
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

      // income
      // income
      const expectedRent = (price * (profitRate / 100))
      const rentDecrease = index * (rentDecreaseRate / 100)
      const actualRent = expectedRent * (1 - rentDecrease)
      const rentIncome = actualRent * (rentRate / 100)

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
      const payout = loanPayment + managementFee + maintainanceFee + yearlyCost + reformExpense

      // cashflow
      // payout is negative
      const cashflow = rentIncome - payout

      const actualProfitRate = ((cashflow + loanPayment) / (price + purchaseCost)) * 100

      accumulatedCashflow += cashflow

      return {
        year: currentYear,
        rentIncome,
        loanPayment: -loanPayment,
        managementFee: -managementFee,
        maintainanceFee: -maintainanceFee,
        yearlyCost: -yearlyCost,
        reformExpense: -reformExpense,
        cashflow,
        depreciation: -depreciation,
        remainingAmount: -items[items.length - 1].remainingAmount,
        accumulatedCashflow,
        actualProfitRate,
      }
    })

  return yearlyItems
}
