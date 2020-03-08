import React from 'react'
import { inject, observer, PropTypes } from 'mobx-react'

import {
  EuiBasicTable,
  EuiText,
} from '@elastic/eui'

import Cashflow from '../../../Models/Cashflow'

const formatMoney = value => (
  <EuiText
    color={value >= 0 ? 'default' : 'danger'}
  >
    {value.toFixed(1)}万円
  </EuiText>
)


const formatPercentage = value => (
  <EuiText
    color={value >= 0 ? 'default' : 'danger'}
  >
    {value.toFixed(2)}%
  </EuiText>
)


const SimulatedTable = ({ paramStore }) => {
  const items = Cashflow(paramStore)

  const columns = [
    {
      field: 'year',
      name: '年数',
    },
    {
      field: 'rentIncome',
      name: '家賃収入',
      render: formatMoney,
    },
    {
      field: 'loanPayment',
      name: 'ローン支払い',
      render: formatMoney,
    },
    {
      field: 'managementFee',
      name: '管理費',
      render: formatMoney,
    },
    {
      field: 'maintainanceFee',
      name: '修繕費',
      render: formatMoney,
    },
    {
      field: 'yearlyCost',
      name: '年間諸経費',
      render: formatMoney,
    },
    {
      field: 'reformExpense',
      name: '大規模修繕',
      render: formatMoney,
    },
    {
      field: 'cashflow',
      name: 'CF',
      render: formatMoney,
    },
    {
      field: 'depreciation',
      name: '減価償却',
      render: formatMoney,
    },
    {
      field: 'remainingAmount',
      name: 'ローン残額',
      render: formatMoney,
    },
    {
      field: 'accumulatedCashflow',
      name: '累計CF',
      render: formatMoney,
    },
    {
      field: 'actualProfitRate',
      name: '実質利回り',
      render: formatPercentage,
    },
  ]

  return (
    <EuiBasicTable
      items={items}
      columns={columns}
    />
  )
}

SimulatedTable.propTypes = {
  paramStore: PropTypes.objectOrObservableObject.isRequired,
}

export default inject('paramStore')(observer(SimulatedTable))
