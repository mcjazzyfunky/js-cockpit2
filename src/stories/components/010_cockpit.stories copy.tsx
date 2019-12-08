import React from 'react'
import { App, Brand, Cockpit, LogoutButton, SideNav, UserMenu } from '../js-cockpit'

export default {
  title: 'Cockpit'
}

export const cockpit = () => 
  <App>
    <Cockpit
      slotBrand={<Brand vendor="meet&amp;greet" title="Back Office" size="small"/>}
      slotTopNav="TopNav"
      slotActions={ <><UserMenu displayName="Jane Doe"/><LogoutButton/></>}
      slotSidebar={
        <SideNav
          menu={[
            {
              type: 'category' as 'category',
              title: 'Cat-1',
              items: [
                {
                  type: 'menu',
                  title: 'Menu-1',
                  items: [
                    {
                      type: 'item',
                      title: 'Item-1',
                      itemId: '1'
                    },
                    {
                      type: 'item',
                      title: 'Item-2',
                      itemId: '2'
                    }
                  ]
                }, {
                  type: 'item',
                  title: 'Men-2'
                }
              ]
            },
            {
              type: 'category' as 'category',
              title: 'Cate-2'
            }
          ]}
        />
      }
      slotCenter="Center"
    />
  </App>