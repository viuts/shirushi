import React from 'react'

import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiFlexGroup,
  EuiFlexItem,
} from '@elastic/eui'

import Header from '../../Components/Header'

import SummaryBlock from './SummaryBlock'
import ParametersFrom from './ParametersForm'
import SimulatedTable from './SimulatedTable'

export default () => {
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
            <EuiPageHeaderSection>Page abilities</EuiPageHeaderSection>
          </EuiPageHeader>

          <EuiFlexGroup>
            <EuiFlexItem grow={false}>
              <ParametersFrom />
            </EuiFlexItem>

            <EuiFlexItem>
              <EuiFlexGroup direction="column">
                <EuiFlexItem>
                  <SummaryBlock />
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiPageContent>
                    <SimulatedTable />
                  </EuiPageContent>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>

          </EuiFlexGroup>

        </EuiPageBody>
      </EuiPage>
    </>
  )
}
