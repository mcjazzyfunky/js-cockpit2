import React from 'react'
import { App, Cockpit } from '../js-cockpit'

export default {
  title: 'Cockpit'
}

export const cockpit = () => 
  <App>
    <Cockpit
      slotBrand="Brand"
      slotTopNav="TopNav"
      slotActionArea="ActionArea"
      slotMenu="Menu"
      slotSidebar="Sidebar"
      slotCenter="Center"
    />
  </App>