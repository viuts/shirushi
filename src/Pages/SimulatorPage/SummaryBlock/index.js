
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
    price,
    landSize,
    buildingSize,
  } = paramStore
  const {
    landPrice,
    buildingPrice,
    profitPrice,
    repayRate,
    libilityRecoverYears,
    roi,
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
              isLoading={landSize === 0}
            />
          </EuiPanel>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel>
            <EuiStat
              title={formatPrice(buildingPrice)}
              description="建物価格"
              textAlign="right"
              isLoading={buildingSize === 0}
            />
          </EuiPanel>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel>
            <EuiStat
              title={formatPrice(landPrice + buildingPrice)}
              description="積算価格"
              textAlign="right"
              isLoading={landSize === 0 || buildingSize === 0}
            />
          </EuiPanel>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel>
            <EuiStat
              title={formatPrice(profitPrice)}
              description="収益価格 (DCF: 4%)"
              textAlign="right"
              isLoading={price === 0}
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
        <EuiFlexItem>
          <EuiPanel>
            <EuiStat
              title={`${roi.toFixed(1)}%`}
              description="ROI"
              textAlign="right"
              isLoading={roi === 0}
            />
          </EuiPanel>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel>
            <EuiStat
              title={`${libilityRecoverYears.toFixed(1)}年`}
              description="債務償還年数"
              textAlign="right"
              isLoading={libilityRecoverYears === 0}
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
