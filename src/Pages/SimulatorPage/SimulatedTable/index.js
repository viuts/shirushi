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
      field: 'interest',
      name: '返済利息',
      render: formatMoney,
    },
    {
      field: 'emptyRoomLoss',
      name: '空室損失',
      render: formatMoney,
    },
    {
      field: 'depreciation',
      name: '減価償却',
      render: formatMoney,
    },
    {
      field: 'operatingIncome',
      name: '経常利益',
      render: formatMoney,
    },
    {
      field: 'tax',
      name: '法人税',
      render: formatMoney,
    },
    {
      field: 'principalPayment',
      name: '本金返済',
      render: formatMoney,
    },
    {
      field: 'cashflow',
      name: 'CF',
      render: formatMoney,
    },
    // {
    //   field: 'loanPayment',
    //   name: 'ローン支払い',
    //   render: formatMoney,
    // },
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
      compressed
      tableLayout="auto"
    />
  )
}

SimulatedTable.propTypes = {
  paramStore: PropTypes.objectOrObservableObject.isRequired,
}

export default inject('paramStore')(observer(SimulatedTable))
