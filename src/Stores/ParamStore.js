import { observable, action } from 'mobx'

class ParamStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  // basic  info
  @observable price = ''

  @observable profitRate = ''

  @observable propertyStructure = 'wood'

  @observable elapsedYear = ''

  @observable buildingSize = ''

  // property info

  @observable landSize = 0

  @observable roadPrice = 0

  // Detailed settings
  @observable selfCapital = 0

  @observable interestRate = 2

  @observable loanDuration = 20

  @observable rentRate = 80

  @observable rentDecreaseRate = 1

  // Cost
  @observable managementCost = 5

  @observable maintainanceCost = 5

  @observable purchaseCost = 0

  @observable yearlyCost = 0

  @observable taxRate = 30

  // Reform

  @observable reformAfter = ''

  @observable reformEvery = ''

  @observable reformFee = ''

  @action saveParams = (params) => {
    Object.keys(params).forEach((key) => {
      this[key] = params[key]
    })
  }
}

export default ParamStore
