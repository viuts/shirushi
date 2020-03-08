
import React from 'react'
import { inject, observer, PropTypes } from 'mobx-react'

import {
  EuiStat,
  EuiFlexItem,
  EuiFlexGroup,
  EuiPanel,
} from '@elastic/eui'

import PropertySummary from '../../../Models/PropertySummary'

const formatPrice = value => `${value.toFixed(1)}万円`

const SummaryBlock = ({ paramStore }) => {
  const {
    landPrice,
    buildingPrice,
    profitPrice,
    repayRate,
  } = PropertySummary(paramStore)

  return (
    <>
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiPanel>
            <EuiStat
              title={formatPrice(landPrice)}
              description="土地価格"
              textAlign="right"
              isLoading={landPrice === 0}
            />
          </EuiPanel>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel>
            <EuiStat
              title={formatPrice(buildingPrice)}
              description="建物価格"
              textAlign="right"
              isLoading={buildingPrice === 0}
            />
          </EuiPanel>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel>
            <EuiStat
              title={formatPrice(landPrice + buildingPrice)}
              description="積算価格"
              textAlign="right"
              isLoading={landPrice === 0 || buildingPrice === 0}
            />
          </EuiPanel>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel>
            <EuiStat
              title={formatPrice(profitPrice)}
              description="収益価格"
              textAlign="right"
              isLoading={profitPrice === 0}
            />
          </EuiPanel>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel>
            <EuiStat
              title={`${repayRate.toFixed(1)}%`}
              description="返済比率"
              textAlign="right"
              isLoading={repayRate === 0}
            />
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  )
}

SummaryBlock.propTypes = {
  paramStore: PropTypes.objectOrObservableObject.isRequired,
}

export default inject('paramStore')(observer(SummaryBlock))
