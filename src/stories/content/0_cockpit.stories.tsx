import React from 'react'
import { App, Brand, Cockpit, LogoutButton } from '../js-cockpit'

export default {
  title: 'Cockpit'
}

export const cockpit = () => 
  <App>
    <Cockpit
      slotBrand={<Brand vendor="meet&amp;greet" title="Back Office"/>}
      slotTopNav="TopNav"
      slotActionArea={<LogoutButton/>}
      slotSidebar="Sidebar"
      slotCenter="Center"
    />
  </App>