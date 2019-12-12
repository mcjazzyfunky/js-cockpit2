// external imports
import React from 'react'
import { component } from 'js-react-utils'
import * as Spec from 'js-spec/validators'
import { Button, KIND } from 'baseui/button'
import { ButtonGroup } from 'baseui/button-group'
import { Input, SIZE } from 'baseui/input'
import { Select } from 'baseui/select'
import { LabelSmall, Label3 } from 'baseui/typography'

import { GoPlus as NewIcon } from 'react-icons/go'
import { FiEdit as EditIcon } from 'react-icons/fi'
import { FiTrash as DeleteIcon } from 'react-icons/fi'
import { MdFileDownload as DownloadIcon } from 'react-icons/md'

import {
  StyledTable,
  StyledHeadCell,
  StyledBodyCell,
} from 'baseui/table-grid'

// internal imports
import defineStyles from '../tools/defineStyles'
import Text from './Text'

// derived imports
const { useCallback, useEffect, useState } = React

// --- constants -----------------------------------------------------

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100, 250, 500]

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
      display: 'flex',
      flexDirection: 'column',
      height: '300px',
      margin: '2px',
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
    },

    dataTable: {
  
    },

    paginator: {
      display: 'flex',
      alignItems: 'center'
    },

    pageInputContainer: {
      display: 'flex',
      alignItems: 'center',
      margin: '0 10px',
      ...theme.typography.font200,
      fontWeight: 600
    },

    pageInput: {
      width: '4em',
      margin: '0 10px'
    },

    pageButton: {
      display: 'table-cell',
      width: '28px',
      height: '20px',
      padding: '10px 0',
      textAlign: 'center',
      background: 'none',
      outline: 'none',
      border: 'none',
      
      ':hover': {
        backgroundColor: theme.colors.buttonTertiaryHover
      },

      ':active': {
        backgroundColor: theme.colors.buttonTertiaryActive
      }
    },

    pageSizeSelector: {
      display: 'flex',
      flexFlow: 'row nowrap',
      alignItems: 'center',
      margin: '0 2rem'
    },

    pageSizeLabel: {
      padding: '0 0.8rem',
      whiteSpace: 'nowrap'
    },

    paginationInfo: {
      flexGrow: 1,
      textAlign: 'right',
      margin: '0 1rem',
      whiteSpace: 'nowrap'
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
      <DataTable classes={classes}/>
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
        classes={classes}
      />
      <PageSizeSelector
        pageSize={50}
        disabled={false}
        classes={classes}
      />
      <div className={classes.paginationInfo}>
        <LabelSmall>Items 1-50 from 2.143</LabelSmall>
      </div>
    </div>
  ) 
}

function Paginator({
  pageIndex,
  pageCount,
  disabled = false,
  classes
}: {
  pageIndex: number,
  pageCount: number,
  disabled: boolean,
  classes: DataExplorerClasses
}) {
  return (
    <div className={classes.paginator}>
      <a className={classes.pageButton}>
        <svg width="20px" height="20px" viewBox="0 0 64 64">
          <g>
            <polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="bevel" strokeMiterlimit="10" points="32.936,48.936 
              15.936,31.936 32.936,14.936"/>
          </g>
          <g>
            <polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="bevel" strokeMiterlimit="10" points="47.936,48.936 
              30.936,31.936 47.936,14.936"/>
          </g>
        </svg>
      </a>

      <a className={classes.pageButton}>
        <svg width="20px" height="20px" viewBox="0 0 64 64">
          <g>
            <polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="bevel" strokeMiterlimit="10" points="37,15 20,32 
              37,49"/>
          </g>
        </svg>
      </a>
      
      <div className={classes.pageInputContainer}>
        <div>Page</div>
        <Input
          size={SIZE.compact}
          value={"1"}
          disabled={disabled}

          overrides={{
            Root: {
              props: {
                className: classes.pageInput
              }
            },

            Input: {
              props: {
                xxxclassName: classes.pageInput
              }
            }
          }}
        />
        <div>of 125</div>
      </div>
      <a className={classes.pageButton}>
        <svg width="20px" height="20px" viewBox="0 0 64 64">
          <g>
            <polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="bevel" strokeMiterlimit="10" points="27,15 44,32 
              27,49"/>
          </g>
        </svg>
      </a>
      <a className={classes.pageButton}>
        <svg width="20px" height="20px" viewBox="0 0 64 64">
          <g>
            <polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="bevel" strokeMiterlimit="10" points="31,15 48,32 
              31,49"/>
          </g>
          <g>
            <polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="bevel" strokeMiterlimit="10" points="16,15 33,32 
              16,49"/>
          </g>
        </svg>
      </a>
    </div>
  )
}

function DataTable({
  classes
}: {
  classes: DataExplorerClasses
}) {
  return (
    <div className={classes.dataTable}>
      <StyledTable $gridTemplateColumns="max-content auto auto auto">
        <StyledHeadCell $sticky={false}>Task</StyledHeadCell>
        <StyledHeadCell $sticky={false}>Status</StyledHeadCell>
        <StyledHeadCell $sticky={false}>Last Run</StyledHeadCell>
        <StyledHeadCell $sticky={false}>Details</StyledHeadCell>
      </StyledTable>
    </div>
  )
}

function PageSizeSelector({
  pageSize,
  disabled,
  classes
}: {
  pageSize: number
  disabled: boolean,
  classes: DataExplorerClasses
}) {
  return (
    <div className={classes.pageSizeSelector}>
      <div className={classes.pageSizeLabel}>
        <Label3>Page size:</Label3>
      </div>
      <Select
        id="select-id"
        size={SIZE.compact}
        clearable={false}
        value={[{id: 10}]}
        searchable={false}

        options={
          PAGE_SIZE_OPTIONS.map(pageSize => ({
            id: pageSize
          }))
        }

        labelKey="id"
        valueKey="id"
      />
    </div>
  )
}

// --- exports -------------------------------------------------------

export default DataExplorer

