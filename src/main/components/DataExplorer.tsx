// external imports
import React from 'react'
import { component } from 'js-react-utils'
import * as Spec from 'js-spec/validators'
import { Button, KIND, SIZE } from 'baseui/button'

import { GoPlus as NewIcon } from 'react-icons/go'
import { FiEdit as EditIcon } from 'react-icons/fi'
import { FiTrash as DeleteIcon } from 'react-icons/fi'
import { MdFileDownload as DownloadIcon } from 'react-icons/md'

// internal imports
import defineStyles from '../tools/defineStyles'
import DataTable from './DataTable'
import Paginator from './Paginator'
import PageSizeSelector from './PageSizeSelector'
import PaginationInfo from './PaginationInfo'

// derived imports
const { useCallback, useEffect, useState } = React


// --- public components ---------------------------------------------

const DataExplorer = component<DataExplorerProps>({
  displayName: 'DataExplorer',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateDataExplorerProps) }
    : null,
  
    render: DataExplorerView
})

// --- types ---------------------------------------------------------

type DataExplorerProps = {
  title?: string
}

type DataExplorerClasses = ReturnType<typeof useDataExplorerStyles>

// --- validation ----------------------------------------------------

const validateDataExplorerProps = Spec.checkProps({
  optional: {
    title: Spec.string
  }
})

// --- styles --------------------------------------------------------

const useDataExplorerStyles = defineStyles(theme => {
  return {
    root: {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      padding: '2px',
      boxSizing: 'border-box'
    },

    header: {
      display: 'flex',
      alignItems: 'center',
      borderWidth: '0 0 .5px 0',
      borderColor: theme.borders.border400.borderColor,
      borderStyle: 'solid',
      marginBottom: '3px',
      padding: '4px 10px'
    },

    body: {
      flexGrow: 1
    },

    footer: {
      display: 'flex',
      flexFlow: 'row nowrap',
      alignItems: 'center',
      padding: '3px 5px',
      borderStyle: 'solid',
      borderColor: theme.borders.border400.borderColor,
      borderWidth: `${theme.borders.border400.borderWidth} 0 0 0`,
    },

    title: {
      ...theme.typography.font550,
      fontWeight: 400,
      padding: '3px 4px',
      margin: '0 28px 0 0'
    },

    actionButtons: {
    }
  }
})

// --- views ---------------------------------------------------------

function DataExplorerView({
  title
}: DataExplorerProps) {
  const classes = useDataExplorerStyles()

  return (
    <div className={classes.root}>
      {renderHeader(title, classes)}
      {renderBody(classes)}
      {renderFooter(classes)}
    </div>
  )
}

function renderHeader(
  title: string | undefined,
  classes: DataExplorerClasses
) {
  return (
    <div className={classes.header}>
      <div className={classes.title}>
        {title}
      </div>
      <div className={classes.actionButtons}>
        <Button size={SIZE.compact} kind="minimal"><NewIcon/> &nbsp; New</Button>
        <Button size={SIZE.compact} kind="minimal"><EditIcon/> &nbsp; Edit</Button>
        <Button size={SIZE.compact} kind="minimal"><DeleteIcon/> &nbsp; Delete</Button>
        <Button size={SIZE.compact} kind="minimal"><DownloadIcon/> &nbsp; Export</Button>
      </div>
    </div>
  ) 
}

function renderBody(classes: DataExplorerClasses) {
  return (
    <div className={classes.body}>
      <DataTable
        title="Contacts"
        columns={[
          {
            title: 'Column1',
            width: 50,
          },
          {
            title: 'Column2',
            width: 200
          },
          {
            title: 'Column3'
          }
        ]}
      
        data={[]}
      />
    </div>
  ) 
}

function renderFooter(classes: DataExplorerClasses) {
  return (
    <div className={classes.footer}>
      <Paginator
        pageIndex={1}
        pageCount={143}
        disabled={false}
      />
      <PageSizeSelector
        pageSize={50}
        disabled={false}
      />
      <PaginationInfo
        about="items"
      />
    </div>
  ) 
}

// --- exports -------------------------------------------------------

export default DataExplorer
