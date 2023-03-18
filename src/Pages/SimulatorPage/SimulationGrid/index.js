import React, { useEffect, useState } from 'react'
import { inject, observer, PropTypes } from 'mobx-react'

import {
  EuiDataGrid,
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


const SimulationGrid = ({ paramStore }) => {
  const items = Cashflow(paramStore)

  const columns = [
    {
      id: 'year',
      display: '年数',
    },
    {
      id: 'rentIncome',
      display: '家賃収入',
      render: formatMoney,
    },
    {
      id: 'managementFee',
      display: '管理費',
      render: formatMoney,
    },
    {
      id: 'maintainanceFee',
      display: '修繕費',
      render: formatMoney,
    },
    {
      id: 'yearlyCost',
      display: '年間諸経費',
      render: formatMoney,
    },
    {
      id: 'reformExpense',
      display: '大規模修繕',
      render: formatMoney,
    },
    {
      id: 'interest',
      display: '返済利息',
      render: formatMoney,
    },
    {
      id: 'depreciation',
      display: '減価償却',
      render: formatMoney,
    },
    {
      id: 'operatingIncome',
      display: '経常利益',
      render: formatMoney,
    },
    {
      id: 'carryOverLost',
      display: '繰越損失',
      render: formatMoney,
    },
    {
      id: 'taxableIncome',
      display: '税引前利益',
      render: formatMoney,
    },
    {
      id: 'tax',
      display: '法人税',
      render: formatMoney,
    },
    {
      id: 'principalPayment',
      display: '本金返済',
      render: formatMoney,
    },
    {
      id: 'cashflow',
      display: 'CF',
      render: formatMoney,
    },
    {
      id: 'remainingAmount',
      display: 'ローン残額',
      render: formatMoney,
    },
    {
      id: 'accumulatedCashflow',
      display: '累計CF',
      render: formatMoney,
    },
    {
      id: 'actualProfitRate',
      display: '実質利回り',
      render: formatPercentage,
    },
  ]

  const RenderCellValue = ({ rowIndex, columnId, setCellProps }) => {
    useEffect(() => {
      if (columnId === 'amount') {
        if (Object.prototype.hasOwnProperty.call(items, rowIndex)) {
          const numeric = parseFloat(
            items[rowIndex][columnId].match(/\d+\.\d+/)[0],
            10,
          )
          setCellProps({
            style: {
              backgroundColor: `rgba(0, 255, 0, ${numeric * 0.0002})`,
            },
          })
        }
      }
    }, [rowIndex, columnId, setCellProps])
    const column = columns.find(col => col.id === columnId)

    const getFormatted = (row, col) => {
      return column.render ? column.render(items[row][col]) : items[row][col]
    }

    return Object.prototype.hasOwnProperty.call(items, rowIndex) ? getFormatted(rowIndex, columnId) : null
  }

  const [visibleColumns, setVisibleColumns] = useState(
    columns.map(({ id }) => id),
  )

  return (
    <EuiDataGrid
      columns={columns.map(col => ({ ...col, isSortable: false, isResizable: false, isExpandable: false }))}
      rowCount={items.length}
      columnVisibility={{ visibleColumns, setVisibleColumns }}
      renderCellValue={RenderCellValue}
      toolbarVisibility={{
        showColumnSelector: false,
        showSortSelector: false,
      }}
      gridStyle={{
        border: 'all',
        stripes: false,
        rowHover: 'highlight',
        header: 'shade',
        fontSize: 'm',
        cellPadding: 's',
      }}
    />
  )
}

SimulationGrid.propTypes = {
  paramStore: PropTypes.objectOrObservableObject.isRequired,
}

export default inject('paramStore')(observer(SimulationGrid))
