
// external imports
import React from 'react'
import { component } from 'js-react-utils'
import * as Spec from 'js-spec/validators'
import { Accordion, Panel } from 'baseui/accordion'
import { Navigation } from 'baseui/side-navigation'

// internal import
import defineStyles from '../styling/tools/defineStyles'

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
  menu: SideNavCategory[] | (SideNavMenu | SideNavItem)[]
}

type SideNavCategory = {
  type: 'category',
  title: string,
  items?: (SideNavMenu | SideNavItem)[]
}

type SideNavMenu = {
  type: 'menu',
  title: string,
  items?: (SideNavMenu | SideNavItem)[]
}

type SideNavItem = {
  type: 'item',
  title: string,
  itemId?: string
}

// --- validation ----------------------------------------------------

const validateSideNavProps = Spec.checkProps({
  optional: {
  }
})

// --- styles --------------------------------------------------------

const useSideNavStyles = defineStyles(theme => {
  return {
    root: {
    },
  }
})

// --- view ----------------------------------------------------------

function SideNavView({
  menu
}: SideNavProps) {
  const classes = useSideNavStyles()

  if (!menu || menu.length === 0) {
    return null
  }

  let content
  
  if (menu[0].type === 'category') {
    content = renderCategories(menu as SideNavCategory[])
  } else {
    content =
      <Navigation
        items={
          buildItems(menu as (SideNavMenu[] | SideNavItem[])) as any // TODO
        }
        activeItemId={'1'} // TODO
      />
  }

  return (
    <div className={classes.root}>
      {content}
    </div>
  )
}

function renderCategories(categories: SideNavCategory[]) {
  return (
    <Accordion>
      {
        categories.map(category => {
          return (
            <Panel title={category.title}>
              <Navigation
                items={
                  buildItems(category.items as any) as any // TODO
                }
                activeItemId={'1'} // TODO
              />
            </Panel>
          )
        })
      }
    </Accordion>
  )
}

function buildItems(items: (SideNavMenu | SideNavItem)[]): any { // TODO
  if (!items) {
    return []
  }

  return items.map((item: any) => { // TODO
    if (item.type === 'menu') {
      return {
        title: item.title,
        subNav: buildItems(item.items)
      }
    } else if (item.type === 'item') {
      return {
        title: item.title,
        ...item.hasOwnProperty('itemId') ? { itemId: item.itemId} : null
      }
    }
  })
}

// --- exports -------------------------------------------------------

export default SideNav 
