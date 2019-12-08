import React from 'react'
import { App, WorkspaceSelector, Brand, Cockpit, DataExplorer, LogoutButton, SideNav, UserMenu } from '../js-cockpit'

export default {
  title: 'Cockpit'
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
            activeItemId: '123',
            groups: [
              {
                type: 'group',
                title: 'Products',
                items: [
                  {
                    type: 'item',
                    title: 'Item-1-1',
                    itemId: '1'
                  },
                  {
                    type: 'item',
                    title: 'Item-1-2',
                    itemId: '123'
                  }
                ]
              },
              {
                type: 'group',
                title: 'Articles',
                items: [
                  {
                    type: 'group',
                    title: 'Variants',
                    items: [
                      {
                        type: 'item',
                        title: 'Item-2-1',
                        itemId: '1',
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
                    title: 'Services',
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
              },
              {
                type: 'group',
                title: 'Categories',
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
            ]
          }}
        />
      }
      slotCenter={
        dataExplorer
      }
    />
  </App>

const dataExplorer =
  <DataExplorer
    title="Back-office users"
  />