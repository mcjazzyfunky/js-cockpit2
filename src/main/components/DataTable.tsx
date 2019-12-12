// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import { FiLayers as DefaultLogo } from 'react-icons/fi'
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
    }
  }
})

// --- view ----------------------------------------------------------

function DataTableView({
}: DataTableProps) {
  const classes = useDataTableStyles()

  return (
    <div className={classes.root}>
      [DataTable]
    </div>
  )
}

// --- exports -------------------------------------------------------

export default DataTable