import React from 'react'
import { App, WorkspaceSelector, Brand, Cockpit,
  DataExplorer, DataForm, Fieldset, LogoutButton,
  TabBox, TabPage, TextField,
  SelectBox, SideNav, UserMenu } from '../js-cockpit'

export default {
  title: 'Cockpit'
}

export const cockpit = () =>
  <App>
    <div>
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
                    title: 'Manage products',
                    itemId: '1'
                  },
                  {
                    type: 'item',
                    title: 'Price calculation',
                    itemId: '123'
                  },
                  {
                    type: 'item',
                    title: 'Import products',
                    itemId: '3'
                  },
                  {
                    type: 'item',
                    title: 'Export products',
                    itemId: '3'
                  }
                ]
              },
              {
                type: 'group',
                title: 'Articles',
                items: [
                  {
                    type: 'item',
                    title: 'Assign articles to products',
                    itemId: '1',
                  },
                  {
                    type: 'item',
                    title: 'Export articles',
                    itemId: '2'
                  }
                ]
              },
              /*
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
              }*/
              {
                type: 'group',
                title: 'Categories',
                items: [
                  {
                    type: 'item',
                    title: 'Manage categories',
                    itemId: '1'
                  },
                  {
                    type: 'item',
                    title: 'Import categories',
                    itemId: '1'
                  },
                  {
                    type: 'item',
                    title: 'Export categories',
                    itemId: '2'
                  }
                ]
              },
            ]
          }}
        />
      }
      slotCenter={
        mainContent
      }
    />
    </div>
  </App>

const dataExplorer =
  <DataExplorer
    title="Back-office users"
  />

const dataForm = 
  <DataForm title="Products">
    <Fieldset title="Adress data">
      <TextField name="productId" label="Product no."/>
      <TabBox>
        <TabPage title="Customer data">
          <Fieldset title="Primary contact">
            <TextField name="firstName" label="First name" required/>
            <TextField name="lastName" label="Last name" required/>
            <TextField name="street" label="Street" required/>
            <TextField name="city" label="City" required/>
            
            <SelectBox
              name="country"
              label="Country" 
              options={[
                { key: 'FR', text: 'France'},
                { key: 'DE', text: 'Germany'}
              ]}
            />
          </Fieldset>
        </TabPage>
        <TabPage title="Documents">
        </TabPage>
        <TabPage title="Images">
        </TabPage>
        <TabPage title="Setting">
        </TabPage>
        <TabPage title="Permission">
        </TabPage>
      </TabBox>
    </Fieldset>
  </DataForm>

const mainContent = dataForm