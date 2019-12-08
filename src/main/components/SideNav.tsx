
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
  groups: SideNavGroup[],
  activeItemId?: string | null
}

type SideNavGroup = {
  type: 'group',
  title: string,
  items: (SideNavGroup | SideNavItem)[]
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
      padding: '10px 0'
    },

    groupTitle: {
      textTransform: 'uppercase',
      ...theme.typography.font300,
      fontWeight: 600
    },
    
    groupTitleTopLevel: {
      fontSize: theme.typography.font350.fontSize + ' !important'
    },

    itemList: {
      ...theme.typography.font100,
      listStyle: 'none',
      margin: '8px 0 8px 0',
      padding: '0 24px'
    },

    item: {
      ...theme.typography.font300,
      fontWeight: 'normal',
      padding: '3px 0'
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
  group: SideNavGroup,
  level: number,
  activeItemId: string | undefined | null,
  classes: Classes
){
  const classTitle = classNames(
    classes.groupTitle,
    level === 0
      ? classes.groupTitleTopLevel
      : null)
  
  return (
    <li>
      <div className={classTitle}>
        {group.title}
      </div>
      <ul className={classes.itemList}>
        {
          group.items.map(it => {
            return it.type === 'item'
              ? renderSideNavItem(it, activeItemId, classes)
              : renderSideNavGroup(it, level + 1, activeItemId, classes)
          })
        }
      </ul>
    </li>
  )
}

function renderSideNavItem(
  item: SideNavItem,
  activeItemId: string | null | undefined,
  classes: Classes
) {
  return (
    <li className={classes.item}>
      <a>{item.title}</a>
    </li>
  )
}

// --- exports -------------------------------------------------------

export default SideNav 
