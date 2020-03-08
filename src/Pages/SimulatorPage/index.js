import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import {
  EuiButton,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLoadingChart,
  EuiPanel,
  EuiEmptyPrompt,
  EuiText,
} from '@elastic/eui'

import Header from '../../Components/Header'
import LinkImporter from '../../Components/LinkImporter'

import SummaryBlock from './SummaryBlock'
import ParametersFrom from './ParametersForm'
import SimulatedChart from './SimulatedChart'
import SimulatedTable from './SimulatedTable'

import URLImporter from '../../Services/URLImporter'

const SimulatorPage = ({ paramStore }) => {
  const [showDialog, setShowDialog] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    price,
    profitRate,
    elapsedYear,
    buildingSize,
  } = paramStore

  const onURLSubmit = async ({ provider, url }) => {
    setShowDialog(false)
    setLoading(true)
    const result = await URLImporter(provider, url, true)
    if (result) {
      paramStore.saveParams(result)
    }
    setLoading(false)
  }

  const renderRightBlock = () => {
    if (loading) {
      return (
        <EuiPanel>
          <EuiLoadingChart size="xl" />
        </EuiPanel>
      )
    }

    if (price === '' || profitRate === '' || elapsedYear === '' || buildingSize === '') {
      return (
        <EuiPanel>
          <EuiEmptyPrompt
            iconType="editorStrike"
            title={<h2>データを入力してください</h2>}
            body={(
              <EuiText>
                 左のパネルから物件情報を入力してください。
                 右上のボタンからリンクを貼れば、物件情報が自動的に入力されんます。
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
            <SimulatedTable />
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
            <EuiPageHeaderSection>
              <EuiButton
                onClick={() => setShowDialog(true)}
                fill
              >
                ネットからインポート
              </EuiButton>
            </EuiPageHeaderSection>
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
      <LinkImporter
        show={showDialog}
        onDismiss={() => setShowDialog(false)}
        onSubmit={onURLSubmit}
      />
    </>
  )
}

SimulatorPage.propTypes = {
  paramStore: PropTypes.object.isRequired,
}

export default inject('paramStore')(observer(SimulatorPage))
