import React from 'react'
import { Provider as MobxProvider } from 'mobx-react'
import {
  EuiContext,
} from '@elastic/eui'

import { rootStore } from '../Stores'

import SimulatorPage from './SimulatorPage'
import i18nMapping from '../I18n'

const App = () => (
  <MobxProvider {...rootStore}>
    <EuiContext i18n={{
      mapping: i18nMapping.jp,
    }}
    >
      <SimulatorPage />]
    </EuiContext>
  </MobxProvider>
)

export default App
