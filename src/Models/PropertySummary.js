import _ from 'lodash-es'
import Constant from '../Config/Constant'
import Cashflow from './Cashflow'

export default (props) => {
  const { propertyStructure } = props
  const {
    price,
    profitRate,
    elapsedYear,
    buildingSize,
    selfCapital,
    landSize,
    roadPrice,
  } = _.mapValues(props, Number)

  const items = Cashflow(props)

  const landPrice = landSize * roadPrice
  const { year, reconstructurePrice } = Constant.PROPERTY_STRUCTURES[propertyStructure]
  const remainingYear = Math.max(year - elapsedYear, 0)
  const buildingPrice = ((buildingSize * reconstructurePrice) / year) * remainingYear
  const rentIncome = (price * (profitRate / 100))
  const pureProfit = items.reduce((acc, item) => {
    return acc + (item.cashflow + Math.abs(item.principalPayment))
  }, 0)
  const buildingRemainingPrice = items.reduce((acc, item) => {
    return acc - item.depreciation
  }, buildingPrice)
  const profitPrice = pureProfit + (landPrice) + (buildingRemainingPrice)

  // loan
  const loanAmount = price - selfCapital
  const repayRate = (Math.abs(items[0].loanPayment) / rentIncome) * 100

  let remainingLoan = loanAmount
  let libilityRecoverYears = items[items.length - 1].year
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    remainingLoan -= (item.cashflow + Math.abs(item.loanPayment))
    if (remainingLoan <= 0) {
      libilityRecoverYears = item.year
      break
    }
  }

  return {
    landPrice,
    buildingPrice,
    profitPrice,
    repayRate,
    libilityRecoverYears,
  }
}
