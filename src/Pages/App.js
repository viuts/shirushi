import React from 'react'
import { Provider as MobxProvider } from 'mobx-react'

import { rootStore } from '../Stores'

import SimulatorPage from './SimulatorPage'

const App = () => (
  <MobxProvider {...rootStore}>
    <SimulatorPage />]
  </MobxProvider>
)

export default App
