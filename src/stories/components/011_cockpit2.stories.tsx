import React from 'react'
import { App, WorkspaceSelector, Brand, Cockpit, LogoutButton, SideNav, UserMenu } from '../js-cockpit'

export default {
  title: 'Cockpit-2'
}

export const cockpit = () => 
  <App>
    <Cockpit
      slotBrand={<Brand vendor="meet&amp;greet" title="Back Office" size="small" multicolor={true}/>}

      slotTopNav={
        <WorkspaceSelector
          menu={{
            type: 'items',
            activeItemId: '1',
            items: [
              { type: 'item', itemId: '1', text: 'Dashboard' },
              { type: 'item', itemId: '2', text: 'User management' },
              { type: 'item', itemId: '2', text: 'Catalog' },
              { type: 'item', itemId: '2', text: 'CMS' }
            ]
          }}
        />
      }

      slotActions={ <><UserMenu displayName="Jane Doe"/><LogoutButton/></>}
      slotSidebar={
        <SideNav
          menu={[
            {
              type: 'menu' as 'menu',
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
              type: 'menu' as 'menu',
              title: 'Cat-2'
            }
          ]}
        />
      }
      slotCenter="Center"
    />
  </App>