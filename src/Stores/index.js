import ParamStore from './ParamStore'

class RootStore {
  constructor() {
    this.paramStore = new ParamStore(this)
  }
}


export const rootStore = new RootStore()
