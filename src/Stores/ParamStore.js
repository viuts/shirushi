import { observable, action } from 'mobx'

import Geocoder from '../Services/Geocoder'
import LandPriceLookup from '../Services/LandPriceLookup'

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

  @observable address = ''

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

  @action getGeocode = async () => {
    const result = await Geocoder(this.address)
    if (!result) {
      window.alert('住所が確定できませんでした。住所をもう一度ご確認ください')
      return
    }
    const { values } = await LandPriceLookup(result)
    // take the first one
    this.saveParams({ roadPrice: values[0].price / 10 })
  }
}

export default ParamStore
