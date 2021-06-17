import { observable, action, reaction } from 'mobx'

// import Geocoder from '../Services/Geocoder'
import LandPriceLookup from '../Services/LandPriceLookup'

class ParamStore {
  constructor(rootStore) {
    this.rootStore = rootStore

    reaction(() => this.price, () => {
      if (Number(this.price) > 0) {
        this.purchaseCost = (Number(this.price) * 0.07).toFixed(2)
      }
    })
  }

  // basic  info
  @observable price = ''

  @observable profitRate = ''

  @observable propertyStructure = 'wood'

  @observable elapsedYear = ''

  @observable buildingSize = ''

  // property info

  @observable address = ''

  @observable lat = ''

  @observable lng = ''

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

  @observable yearlyCost = 10

  @observable taxRate = 30

  // Reform

  @observable initialReformFee = ''

  @observable reformAfter = ''

  @observable reformEvery = ''

  @observable reformFee = ''

  @action saveParams = (params) => {
    Object.keys(params).forEach((key) => {
      this[key] = params[key]
    })
  }

  @action getGeocode = async () => {
    // const result = await Geocoder(this.address)
    // if (!result) {
    //   window.alert('住所が確定できませんでした。住所をもう一度ご確認ください')
    //   return
    // }
    const { values } = await LandPriceLookup({ lat: this.lat, lng: this.lng })
    // take the first one
    this.saveParams({ roadPrice: values[0].price / 10 })
  }
}

export default ParamStore
