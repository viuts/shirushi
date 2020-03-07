import React from 'react'
import { inject, observer, PropTypes } from 'mobx-react'

import {
  EuiBasicTable,
} from '@elastic/eui'

const totalMonths = 50 * 12

const SimulatedTable = ({ paramStore }) => {
  const {
    price,
    profitRate,
    propertyStructure,
    elapsedYear,
    landSize,
    buildingSize,
    roadPrice,
    selfCapital,
    interestRate,
    loanDuration,
    rentRate,
    rentDecreaseRate,
    managementCost,
    maintainanceCost,
    taxRate,
  } = paramStore

  const loanAmount = price - selfCapital

  console.log(loanAmount)

  const items = Array(totalMonths).fill(1).map((_, i) => i)
    .reduce((acc, month) => {
      const yearPassed = month % 12 === 0
      const repayAmount = acc.length === 0 ? (loanAmount / totalMonths) : (acc[acc.length - 1].remainingAmount / totalMonths)
      const interestableAmount = acc.length === 0 ? loanAmount - repayAmount : acc[acc.length - 1].remainingAmount - repayAmount
      const remainingAmount = interestableAmount * (1 + interestRate / (100 * 12))
      acc.push({
        repayAmount,
        interestableAmount,
        remainingAmount,
      })
      return acc
    }, [])

  const columns = [
    {
      field: 'repayAmount',
      name: 'repayAmount',
    },
    {
      field: 'interestableAmount',
      name: 'interestableAmount',
    },
    {
      field: 'remainingAmount',
      name: 'remainingAmount',
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
