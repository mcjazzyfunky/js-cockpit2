// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import { FiLayers as DefaultLogo } from 'react-icons/fi'
import * as Spec from 'js-spec/validators'

import {
  StyledTable,
  StyledHeadCell,
  StyledBodyCell,
} from 'baseui/table-grid';

// internal import
import defineStyles from '../tools/defineStyles'

// --- components ----------------------------------------------------

const DataTable = component<DataTableProps>({
  displayName: 'DataTable',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateDataTableProps) }
    : null,
 
  render: DataTableView
})

// --- types ---------------------------------------------------------

type DataTableProps = {
}

// --- validation ----------------------------------------------------

const validateDataTableProps = Spec.checkProps({
  optional: {
  }
})

// --- styles --------------------------------------------------------

const useDataTableStyles = defineStyles(theme => {
  return {
    root: {
      overflow: 'auto'
    }
  }
})

// --- view ----------------------------------------------------------

function DataTableView({
}: DataTableProps) {
    const classes = useDataTableStyles()


    const data: any = []

    for (let i = 0; i < 5; ++i) {
        const row: any = []
        for (let j = 0; j < 10; ++j) {
          row.push(Math.floor(Math.random() * 100000))
        }

        data.push(row)
    }

  return (
    <div className={classes.root}>
      <StyledTable $gridTemplateColumns="width: 100px">
        <StyledHeadCell>Column 1</StyledHeadCell>
        <StyledHeadCell>Column 2</StyledHeadCell>
        <StyledHeadCell>Column 3</StyledHeadCell>
        <StyledHeadCell>Column 4</StyledHeadCell>
        <StyledHeadCell>Column 5</StyledHeadCell>
        {data.map((row: any, index: number) => {
          return (
            <React.Fragment key={index}>
              <StyledBodyCell>{row[0]}</StyledBodyCell>
              <StyledBodyCell>{row[1]}</StyledBodyCell>
              <StyledBodyCell>{row[2]}</StyledBodyCell>
              <StyledBodyCell>{row[3]}</StyledBodyCell>
              <StyledBodyCell>{row[4]}</StyledBodyCell>
            </React.Fragment>
          );
        })}
      </StyledTable>
    </div>
  )
}

// --- exports -------------------------------------------------------

export default DataTable