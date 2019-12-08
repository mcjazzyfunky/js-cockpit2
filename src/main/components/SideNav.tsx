
// external imports
import React from 'react'
import { component } from 'js-react-utils'
import * as Spec from 'js-spec/validators'
import { Accordion, Panel } from 'baseui/accordion'
import { Navigation } from 'baseui/side-navigation'

// internal import
import defineStyles from '../styling/tools/defineStyles'
import classNames from '../styling/tools/classNames'

// --- components ----------------------------------------------------

const SideNav = component<SideNavProps>({
  displayName: 'SideNav',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateSideNavProps) }
    : null,
 
  render: SideNavView
})

// --- types ---------------------------------------------------------

type SideNavProps = {
  menu: SideNavGroups
}

type SideNavGroups = {
  type: 'groups',
  groups: SideNavGroupLevel0[],
  activeItemId?: string | null
}

type SideNavGroupLevel0 = {
  type: 'group',
  title: string,
  items: (SideNavGroupLevel1 | SideNavItem)[]
}

type SideNavGroupLevel1 = {
  type: 'group',
  title: string,
  items: SideNavItem[]
}

type SideNavItem = {
  type: 'item',
  title: string,
  itemId?: string
}

type Classes = ReturnType<typeof useSideNavStyles>

// --- validation ----------------------------------------------------

const validateSideNavProps = Spec.checkProps({
  required: {
    menu: Spec.any // TODO
  }
})
/*

const validateSideNavGroups = Spec.exact({
  type: Spec.is('groups'),
  group: Spec.arrayOf(
    Spec.and(
      type: Spec.oneOf('group', 'item'),
      Spec.or(
        {
          when: Spec.prop(Spec.is('group')),
          then: Spec.exact({
            type: Spec.is('group')
          })
        }
      )
    )
  )
})
type SideNavProps = {
  menu: SideNavGroups
}

type SideNavGroups = {
  type: 'groups',
  groups: SideNavGroup
}

type SideNavGroup = {
  type: 'group',
  title: string,
  items?: (SideNavGroup | SideNavItem)[]
}

type SideNavItem = {
  type: 'item',
  title: string,
  itemId?: string
}
*/
// --- styles --------------------------------------------------------

const useSideNavStyles = defineStyles(theme => {
  return {
    root: {
      padding: '10px 0 10px 1px',
      margin: '0'
    },

    groupTitle: {
      textTransform: 'uppercase',
      ...theme.typography.font300,
      fontWeight: 600,
      padding: '0 20px'
    },
    
    groupTitleLevel0: {
      fontSize: theme.typography.font350.fontSize + ' !important',
      paddingLeft: '20px',
      margin: '5px 0'
    },
    
    groupTitleLevel1: {
      fontSize: theme.typography.font350.fontSize + ' !important',
      padding: '3px 40px 0 40px',
    },

    itemList: {
      ...theme.typography.font100,
      listStyle: 'none',
      margin: '0 0 6px 0',
      padding: 0 
    },

    item: {
      ...theme.typography.font300,
      fontWeight: 'normal',
    },
    
    itemLevel0: {
      padding: '5px 35px',
    },
   
    itemLevel1: {
      padding: '5px 60px',
    },

    itemInactive: {
      cursor: 'pointer',

      ':hover': {
        backgroundColor: theme.colors.mono400
      }
    },

    itemActive: {
      backgroundColor: theme.colors.mono400,
      borderWidth: '0 0 0 4px',
      borderColor: theme.colors.primary,
      borderStyle: 'solid'
    }
  }
})

// --- view ----------------------------------------------------------

function SideNavView({
  menu
}: SideNavProps) {
  const classes = useSideNavStyles()

  const
    activeItemId = menu.activeItemId,
    groups = menu.groups

  return (
    <div className={classes.root}>
      <ul className={classes.itemList}>
        {
          groups.map(group => {
            return renderSideNavGroup(group, 0, activeItemId, classes)
          })
        }
      </ul>
    </div>
  )
}

function renderSideNavGroup(
  group: SideNavGroupLevel0,
  level: number,
  activeItemId: string | undefined | null,
  classes: Classes
){
  const classTitle = classNames(
    classes.groupTitle,
    level === 0
      ? classes.groupTitleLevel0
      : classes.groupTitleLevel1)
  
  return (
    <li>
      <div className={classTitle}>
        {group.title}
      </div>
      <ul className={classes.itemList}>
        {
          group.items.map(it => {
            return it.type === 'item'
              ? renderSideNavItem(it, level, activeItemId, classes)
              : renderSideNavGroup(it, level + 1, activeItemId, classes)
          })
        }
      </ul>
    </li>
  )
}

function renderSideNavItem(
  item: SideNavItem,
  level: number,
  activeItemId: string | null | undefined,
  classes: Classes
) {
  const className = classNames(
    classes.item,
    level === 0
      ? classes.itemLevel0
      : classes.itemLevel1,
    typeof activeItemId === 'string'
      && activeItemId.length > 0
      && activeItemId === item.itemId
        ? classes.itemActive
        : classes.itemInactive)

  return (
    <li className={className}>
      <a>{item.title}</a>
    </li>
  )
}

// --- exports -------------------------------------------------------

export default SideNav 
