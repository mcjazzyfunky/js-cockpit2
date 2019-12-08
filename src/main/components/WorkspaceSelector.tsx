// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import { FiLayers as DefaultLogo } from 'react-icons/fi'
import * as Spec from 'js-spec/validators'

// internal import
import classNames from '../styling/tools/classNames'
import defineStyles from '../styling/tools/defineStyles'

// --- components ----------------------------------------------------

const WorkspaceSelector = component<WorkspaceSelectorProps>({
  displayName: 'WorkspaceSelector',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateWorkspaceSelectorProps) }
    : null,
 
  render: WorkspaceSelectorView
})

// --- types ---------------------------------------------------------

type WorkspaceSelectorProps = {
  menu: WorkspaceSelectorItems
}

type WorkspaceSelectorItems = {
  type: 'items',
  items: WorkspaceSelectorItem[]
  activeItemId?: string,
}

type WorkspaceSelectorItem = {
  type: 'item',
  itemId: string,
  text: string,
  description?: string
}

type Classes = ReturnType<typeof useWorkspaceSelectorStyles>

// --- validation ----------------------------------------------------

const validateWorkspaceSelectorProps = Spec.checkProps({
  required: {
    menu: Spec.lazy(() => validateWorkspaceSelectorItems)
  }
})

const validateWorkspaceSelectorItems = Spec.exact({
  type: Spec.is('items'),
  activeItemId: Spec.nullableOptional(Spec.string),
  items: Spec.arrayOf(Spec.lazy(() => validateWorkspaceSelectorItem))
})

const validateWorkspaceSelectorItem = Spec.exact({
  type: Spec.is('item'),
  itemId: Spec.string,
  text: Spec.string,
  description: Spec.optional(Spec.string)
})

// --- styles --------------------------------------------------------

const useWorkspaceSelectorStyles = defineStyles(theme => {
  return {
    root: {
    },

    menuIcon: {
      display: 'inline-block',
      color: theme.colors.primary300,
      margin: '0 8px'
    },

    workspaceLink: {
      ...theme.typography.font200,
      padding: '11px 10px',
      margin: '0 2px',
    },

    workspaceLinkInactive: {
      cursor: 'pointer',
      fontWeight: 'normal',

      ':hover': {
        backgroundColor: theme.colors.primary300,
        borderRadius: '1px'
      }
    },

    workspaceLinkActive: {
      fontWeight: 600,
      borderColor: theme.colors.primary300,
      borderWidth: '0 0 3px 0',
      borderStyle: 'solid'
    }
  }
})

// --- view ----------------------------------------------------------

function WorkspaceSelectorView({
  menu
}: WorkspaceSelectorProps) {
  const classes = useWorkspaceSelectorStyles()

  if (!menu) {
    return null
  }

  return (
    <div className={classes.root}>
      <div className={classes.menuIcon}>
        <WorkspaceSelectorIcon/>
      </div>
      {
        menu.items.map(item =>
          renderWorkspaceLink(item, menu.activeItemId, classes))
      }
    </div>
  )
}

function renderWorkspaceLink(
  item: WorkspaceSelectorItem,
  activeItemId: string | undefined,
  classes: Classes
) {
  const
    active = typeof activeItemId === 'string' && item.itemId === activeItemId,

    className = classNames(
      classes.workspaceLink,
      active ? classes.workspaceLinkActive :  classes.workspaceLinkInactive)

  return (
    <a className={className}>
      {item.text}
    </a>
  )
}

function WorkspaceSelectorIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 64 64">
      <g fill="currentColor">
        <path d="M 0 0 L 0 26 L 26 26 L 26 0 Z"/>
        <path d="M 0 37 L 0 63 L 26 63 L 26 37 Z"/>
        <path d="M 37 0 L 37 26 L 63 26 L 63 0 Z"/>
        <path d="M 37 37 L 37 63 L 63 63 L 63 37 Z"/>
      </g>
    </svg>
  )
}


// --- exports -------------------------------------------------------

export default WorkspaceSelector 