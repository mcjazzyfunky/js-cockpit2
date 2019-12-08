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
            activeItemId: '3',
            items: [
              { type: 'item', itemId: '1', text: 'Dashboard' },
              { type: 'item', itemId: '2', text: 'User management' },
              { type: 'item', itemId: '3', text: 'Catalog' },
              { type: 'item', itemId: '4', text: 'CMS' }
            ]
          }}
        />
      }

      slotActions={ <><UserMenu displayName="Jane Doe"/><LogoutButton/></>}
      slotSidebar={
        <SideNav
          menu={{
            type: 'groups',
            groups: [
              {
                type: 'group',
                title: 'Group-1',
                items: [
                  {
                    type: 'item',
                    title: 'Item-1-1',
                    itemId: '1'
                  },
                  {
                    type: 'item',
                    title: 'Item-1-2',
                    itemId: '2'
                  }
                ]
              },
              {
                type: 'group',
                title: 'Group-2',
                items: [
                  {
                    type: 'group',
                    title: 'Group-2',
                    items: [
                      {
                        type: 'item',
                        title: 'Item-2-1',
                        itemId: '1'
                      },
                      {
                        type: 'item',
                        title: 'Item-2-1',
                        itemId: '2'
                      }
                    ]
                  },
                  {
                    type: 'group',
                    title: 'Group-2',
                    items: [
                      {
                        type: 'item',
                        title: 'Item-2-1',
                        itemId: '1'
                      },
                      {
                        type: 'item',
                        title: 'Item-2-1',
                        itemId: '2'
                      }
                    ]
                  }
                ]
              }
            ]
          }}
        />
      }
      slotCenter="Center"
    />
  </App>