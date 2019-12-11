// external imports
import React, { ReactNode } from 'react'
import { component, isNode, isElementOfType, withChildren } from 'js-react-utils'
import { StatefulTabs as Tabs, Tab } from 'baseui/tabs'
import * as Spec from 'js-spec/validators'

// internal import
import defineStyles from '../tools/defineStyles'
import TabPage from './TabPage'

// derived imports
const { Children } = React

// --- components ----------------------------------------------------

const TabBox = component<TabBoxProps>({
  displayName: 'TabBox',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateTabBoxProps) }
    : null,
 
  render: TabBoxView
})

// --- types ---------------------------------------------------------

type TabBoxProps = {
  children: ReactNode
}

// --- validation ----------------------------------------------------

const validateTabBoxProps = Spec.checkProps({
  optional: {
    children: withChildren(Spec.all(isElementOfType(TabPage)))
  }
})

// --- styles --------------------------------------------------------

const useTabBoxStyles = defineStyles(theme => {
  return {
    root: {
    },
  }
})

// --- view ----------------------------------------------------------

function TabBoxView({
  children
}: TabBoxProps) {
  const classes = useTabBoxStyles()
    
  // Children.map would modify keys
  const pages: ReactNode[] = []

  Children.forEach(children, (page: any, idx) => {
    pages.push(
      <Tab title={page.props.title} key={idx}>
        {page.props.children}
      </Tab>
    )
  })

  return (
    <Tabs>
      {pages}
    </Tabs>
  )
}

// --- exports -------------------------------------------------------

export default TabBox