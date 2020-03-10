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
  EuiProgress,
  EuiPanel,
  EuiEmptyPrompt,
  EuiText,
  EuiSpacer,
} from '@elastic/eui'

import Header from '../../Components/Header'
import LinkImporter from '../../Components/LinkImporter'

import SummaryBlock from './SummaryBlock'
import ParametersFrom from './ParametersForm'
import SimulatedChart from './SimulatedChart'
import SimulatedTable from './SimulatedTable'

import URLImporter from '../../Services/URLImporter'

import PropertySummary from '../../Models/PropertySummary'

import round from '../../Utils/round'

const SimulatorPage = ({ paramStore }) => {
  const [showDialog, setShowDialog] = useState(false)
  const [loading, setLoading] = useState(0)
  const [loadingText, setLoadingText] = useState('')

  const {
    price,
    profitRate,
    elapsedYear,
    buildingSize,
  } = paramStore

  const onURLSubmit = async ({ provider, url }) => {
    setShowDialog(false)
    setLoading(20)
    setLoadingText('物件情報を取得しています・・・')
    const result = await URLImporter(provider, url)
    if (!result) {
      window.alert('failed to import')
      return
    }
    setLoading(50)
    setLoadingText('路線価を取得しています・・・')
    paramStore.saveParams(result)
    await paramStore.getGeocode()
    setLoading(90)
    const summary = PropertySummary(paramStore)
    const purchaseCost = round((summary.landPrice + summary.buildingPrice) * 0.04, 1)
    const yearlyCost = round(paramStore.price * 0.7 * 0.017, 1)

    paramStore.saveParams({
      purchaseCost,
      yearlyCost,
    })
    setLoading(0)
  }

  const renderRightBlock = () => {
    if (loading > 0) {
      return (
        <EuiPanel
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <EuiProgress value={loading} max={100} size="l" />
          <EuiSpacer size="s" />
          <EuiText>{loadingText}</EuiText>
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
                右上のボタンからリンクを貼れば、物件情報が自動的に入力されます。
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
