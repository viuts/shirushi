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
    landSize,
    roadPrice,
    areaProfitRate,
  } = _.mapValues(props, Number)

  const landPrice = landSize * roadPrice
  const { year, reconstructurePrice } = Constant.PROPERTY_STRUCTURES[propertyStructure]
  const remainingYear = Math.max(year - elapsedYear, 0)
  const buildingPrice = ((buildingSize * reconstructurePrice) / year) * remainingYear
  const rentIncome = (price * (profitRate / 100))
  const profitPrice = areaProfitRate > 0 ? rentIncome / (areaProfitRate / 100) : 0

  // loan
  const loanAmount = price - selfCapital
  const monthlyInterest = (interestRate / 100) / 12 // in percentage
  const top = (loanAmount * monthlyInterest) * ((1 + monthlyInterest) ** (loanDuration * 12))
  const buttom = ((1 + monthlyInterest) ** (loanDuration * 12)) - 1
  const repayAmount = top / buttom
  const repayRate = ((repayAmount * 12) / rentIncome) * 100

  return {
    landPrice,
    buildingPrice,
    profitPrice,
    repayRate,
  }
}
