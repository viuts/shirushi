
import React from 'react'
import { inject, observer, PropTypes } from 'mobx-react'

import {
  Chart,
  Settings,
  Axis,
  LineSeries,
} from '@elastic/charts'

import Cashflow from '../../../Models/Cashflow'

const SimulatedChart = ({ paramStore }) => {
  const items = Cashflow(paramStore)

  const extractData = (key) => {
    return items.map((item) => {
      return [item.year, item[key].toFixed(1)]
    })
  }

  return (
    <Chart size={{ height: 400 }}>
      <Settings showLegend showLegendExtra />

      <LineSeries
        id="rentIncome"
        name="家賃収入"
        data={extractData('rentIncome')}
        xScaleType="time"
        xAccessor={0}
        yAccessors={[1]}
      />

      <LineSeries
        id="cashflow"
        name="CF"
        data={extractData('cashflow')}
        xScaleType="time"
        xAccessor={0}
        yAccessors={[1]}
      />

      <LineSeries
        id="accumulatedCashflow"
        name="累計CF"
        data={extractData('accumulatedCashflow')}
        xScaleType="time"
        xAccessor={0}
        yAccessors={[1]}
      />

      <Axis
        title="年数"
        id="bottom-axis"
        position="bottom"
        showGridLines
      />
      <Axis
        title="(万円)"
        id="left-axis"
        position="left"
        showGridLines
      />
    </Chart>
  )
}

SimulatedChart.propTypes = {
  paramStore: PropTypes.objectOrObservableObject.isRequired,
}

export default inject('paramStore')(observer(SimulatedChart))
