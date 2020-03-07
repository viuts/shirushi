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

import ParametersFrom from './ParametersForm'
import Header from '../../Components/Header'
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
                <h1>Page title</h1>
              </EuiTitle>
            </EuiPageHeaderSection>
            <EuiPageHeaderSection>Page abilities</EuiPageHeaderSection>
          </EuiPageHeader>

          <EuiFlexGroup>
            <EuiFlexItem grow={false}>
              <ParametersFrom />
            </EuiFlexItem>

            <EuiFlexItem>
              <EuiPageContent>
                <SimulatedTable />
              </EuiPageContent>

            </EuiFlexItem>

          </EuiFlexGroup>

        </EuiPageBody>
      </EuiPage>
    </>
  )
}
