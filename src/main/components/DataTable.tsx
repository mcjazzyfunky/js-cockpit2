// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import { VariableSizeGrid } from 'react-window'
import useResizeAware from 'react-resize-aware'
import * as Spec from 'js-spec/validators'

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
  title?: string | null,
  
  rowSelectionOptions?: {
    mode: 'none' | 'single' | 'multi'
  } | null,

  sortBy?: string | null,
  sortDir?: 'asc' | 'desc',

  columns: {
    title: string, 
    field?: string | null,
    align?: 'start' | 'center' | 'end',
    width?: number,
    sortable?: boolean
  }[],

  data: object[],

  onRowSelectionChange?: (event: RowSelectionChangeEvent) => void
  onSortChange?: (event: SortChangeEvent) => void,

  ref?: any // TODO
}

type RowSelectionChangeEvent = any // TODO
type SortChangeEvent = any // TODO

type Classes = ReturnType<typeof useDataTableStyles>

// --- validation ----------------------------------------------------

const validateDataTableProps = Spec.checkProps({
  optional: {
  }
})

// --- styles --------------------------------------------------------

const useDataTableStyles = defineStyles(theme => {
  return {
    root: {
      position: 'relative',
      height: '100%',
      overflow: 'hidden'
    },

    tableContainer: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    }
  }
})

// --- view ----------------------------------------------------------

function DataTableView({
  columns
}: DataTableProps) {
  const classes = useDataTableStyles()
  const [resizeListener, size] = useResizeAware()

  const table = size.width === null
    ? null
    : renderTable({
        columns,
        width: size.width,
        height: size.height,
        classes
      })
  
  return (
    <div className={classes.root}>
      {renderTableHead(columns, false)} 
      <div className={classes.tableContainer}>
        {resizeListener}
        {table}
      </div>
    </div>
  )
}

function renderTable({
  columns,
  width,
  height,
  classes
}: {
  columns: DataTableProps['columns'],
  width: number,
  height: number,
  classes: Classes
}) {
  const
    hasSelectorColumn = false, // TODO
    columnWidths = calculateColumnWidths(columns, hasSelectorColumn, width)

  return (
    <VariableSizeGrid key={Math.random()}
      style={{ overflowX: 'hidden'}}
      columnCount={columns.length + Number(hasSelectorColumn)}
      rowCount={100} // TODO
      rowHeight={() => 40} // TODO
      width={width}
      height={height}
      columnWidth={idx =>
        idx === 0 && hasSelectorColumn
          ? columnWidths.selectorColumn
          : columnWidths.dataColumns[idx - Number(hasSelectorColumn)]
      }
    >
      {({ columnIndex, rowIndex, style }) => (
        <div style={style}>
          row {rowIndex}, column {columnIndex}
        </div>
      )}
    </VariableSizeGrid>
  )
}

function calculateColumnWidths(
  columns: DataTableProps['columns'],
  hasSelectorColumn: boolean,
  totalWidth: number
) {
  const
    selectorColumnWidth = hasSelectorColumn ? 32 : 0,
    columnCount = columns.length,

    ret = {
      selectorColumn: selectorColumnWidth,
      dataColumns: [] as number[]
    }

    const
      realTotal = totalWidth - selectorColumnWidth,

      ratioTotal = columns.reduce((sum, col) => {
        return sum + (col.width || 100)
      }, 0)

    let sumRealWidths = 0 

    for (let i = 0; i < columnCount; ++i) {
      const
        column = columns[i],
  
        realWidth =
          i < columnCount - 1
            ? Math.round((column.width || 100) * realTotal / ratioTotal)
            : realTotal - sumRealWidths - 0.5 // TODO: why -0.5?

      sumRealWidths += realWidth

      ret.dataColumns.push(realWidth)
    }

    return ret
}

function renderTableHead(
  columns: DataTableProps['columns'],
  hasSelectorColumn: boolean
) {
  return (
    <table style={{ width: '100%' }}>
      <thead>
        <tr>
          {columns.map(column => {
            return <th style={{ width: (column.width || 100) + '*'}}>{column.title}</th>
          })}
        </tr>
      </thead>
    </table>
  )
}

// --- exports -------------------------------------------------------

export default DataTable

