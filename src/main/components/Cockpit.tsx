// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'

// internal import
import defineStyles from '../styling/tools/defineStyles'

// --- components ----------------------------------------------------

const Cockpit = component<CockpitProps>({
  displayName: 'Cockpit',
  validate: Spec.lazy(() => validateCockpitProps),
  render: CockpitView
})

// --- types ---------------------------------------------------------

type CockpitProps = {
  slotBrand?: ReactNode,
  slotTopNav?: ReactNode,
  slotActionArea?: ReactNode,
  slotMenu?: ReactNode,
  slotSidebar?: ReactNode,
  slotCenter?: ReactNode
}

// --- validation ----------------------------------------------------

const validateCockpitProps = Spec.checkProps({
  optional: {
    slotBrand: isNode,
    slotTopNav: isNode,
    slotActionArea: isNode,
    slotMenu: isNode,
    slotSidebar: isNode,
    slotCenter: isNode
  }
})

// --- styles --------------------------------------------------------

const useCockpitStyles = defineStyles((theme: any) => { // TODO
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      position: 'absolute',
      width: '100%',
      height: '100%',
      padding: 0,
      margin: 0
    },

    header: {
      border: '1px solid red',
      display: 'flex',
      flexDirection: 'row'
    },

    brand: {
    },

    topNav: {
      flexGrow: 1
    },

    actionArea: {
    },

    menu: {
    },

    body: {
      display: 'flex',
      flexDirection: 'row',
      flexGrow: 1,
      height: '100%'
    },

    sidebar: {
      backgroundColor: 'green',
      width: '250px'
    },

    center: {
      flexGrow: 1,
      backgroundColor: 'yellow'
    }
  }
})

// --- view ----------------------------------------------------------

function CockpitView({
  slotBrand,
  slotTopNav,
  slotActionArea,
  slotMenu,
  slotSidebar,
  slotCenter
}: CockpitProps) {
  const classes = useCockpitStyles()

  const
    header = renderHeader(slotBrand, slotTopNav, slotActionArea, classes),
    menu = renderMenu(slotMenu, classes),
    body = renderBody(slotSidebar, slotCenter, classes)

  return (
    <div className={classes.root}>
      {header}
      {menu}
      {body}
    </div>
  )
}

function renderHeader(
  slotBrand: ReactNode,
  slotTopNav: ReactNode,
  slotActionArea: ReactNode,
  classes: any // TODO
) {
  if (!slotBrand && !slotTopNav && !slotActionArea) {
    return null
  }

  const
    col1 = !slotBrand
      ? null
      : <div className={classes.brand}>{slotBrand}</div>,
    
    col2 = !slotTopNav
      ? null
      : <div className={classes.topNav}>{slotTopNav}</div>,
    
    col3 = !slotActionArea
      ? null
      : <div className={classes.actionArea}>{slotActionArea}</div>

  return (
    <div className={classes.header}>{col1}{col2}{col3}</div>
  )
}

function renderMenu(slotMenu: ReactNode, classes: any) {
  if (!slotMenu) {
    return null
  }

  return (
    <div className={classes.menu}>
      {slotMenu}
    </div>
  )
}

function renderBody(slotSidebar: ReactNode, slotCenter: ReactNode, classes: any) {
  if (!slotSidebar && !slotCenter) {
    return null
  }
  
  const
    col1 = !slotSidebar
      ? null
      : <div className={classes.sideBar}>{slotSidebar}</div>,
    
    col2 = !slotCenter
      ? null
      : <div className={classes.center}>{slotCenter}</div>

  return (
    <div className={classes.body}>
      {col1}
      {col2}
    </div>
  )
}

// --- exports -------------------------------------------------------

export default Cockpit

