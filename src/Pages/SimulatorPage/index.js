import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import {
  // EuiButton,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiEmptyPrompt,
  EuiText,
} from '@elastic/eui'

import Header from '../../Components/Header'

import SummaryBlock from './SummaryBlock'
import ParametersFrom from './ParametersForm'
import SimulatedChart from './SimulatedChart'
// import SimulatedTable from './SimulatedTable'
import SimulationGrid from './SimulationGrid'

const SimulatorPage = ({ paramStore }) => {
  const {
    price,
    profitRate,
    elapsedYear,
    buildingSize,
  } = paramStore

  const renderRightBlock = () => {
    if (price === '' || profitRate === '' || elapsedYear === '' || buildingSize === '') {
      return (
        <EuiPanel>
          <EuiEmptyPrompt
            iconType="editorStrike"
            title={<h2>データを入力してください</h2>}
            body={(
              <EuiText>
                左のパネルから物件情報を入力してください。
              </EuiText>
            )}
          />
        </EuiPanel>
      )
    }

    return (
      <EuiFlexGroup direction="column">
        <EuiFlexItem>
          <SummaryBlock />
        </EuiFlexItem>
        <EuiFlexItem>
          <SimulatedChart />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPageContent>
            <SimulationGrid />
          </EuiPageContent>
        </EuiFlexItem>
      </EuiFlexGroup>
    )
  }

  return (
    <>
      <Header />
      <EuiPage>
        <EuiPageBody>
          <EuiPageHeader>
            <EuiPageHeaderSection>
              <EuiTitle size="l">
                <h1>キャッシュフローシミュレーター</h1>
              </EuiTitle>
            </EuiPageHeaderSection>
            {/* <EuiPageHeaderSection>
              <EuiButton
                onClick={() => setShowDialog(true)}
                fill
              >
                ネットからインポート
              </EuiButton>
            </EuiPageHeaderSection> */}
          </EuiPageHeader>

          <EuiFlexGroup>
            <EuiFlexItem grow={false}>
              <ParametersFrom />
            </EuiFlexItem>
            <EuiFlexItem>
              {renderRightBlock()}
            </EuiFlexItem>
          </EuiFlexGroup>

        </EuiPageBody>
      </EuiPage>
    </>
  )
}

SimulatorPage.propTypes = {
  paramStore: PropTypes.object.isRequired,
}

export default inject('paramStore')(observer(SimulatorPage))
