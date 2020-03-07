import { observable, action } from 'mobx'

class ParamStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  // Property info
  @observable price = 0

  @observable profitRate = 0

  @observable propertyStructure = 'wood'

  @observable elapsedYear = 0

  @observable landSize = 0

  @observable buildingSize = 0

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

  @observable yearlyCost = 0

  @observable taxRate = 30

  @action saveParams = (params) => {
    Object.keys(params).forEach((key) => {
      this[key] = params[key]
    })
  }
}

export default ParamStore
