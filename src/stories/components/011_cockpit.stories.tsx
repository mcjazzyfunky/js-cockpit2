import React from 'react'
import { App, WorkspaceSelector, Brand, CheckBoxGroup, Cockpit,
  DataExplorer, DataForm, DateField, FormSection, Fieldset, FilterBox, LogoutButton,
  MenuBar, RadioButtonGroup, TabBox, TabPage, TextField,
  SelectBox, SideMenu, UserMenu
} from '../js-cockpit'

export default {
  title: 'Cockpit'
}

// TODO!!!!!

import { registerIcons } from '@uifabric/styling'

registerIcons({
  icons: {
    chevrondown: (
      <svg width="12" height="12" viewBox="0 0 12 12">
        <g>
          <polyline fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="bevel" strokeMiterlimit="10"
            points="1,5 6,11 11,5"/>
        </g>
      </svg>
    )
  }
}, { disableWarnings: true})

const menuBar = 
  <MenuBar
    items={[
      {
        id: '1',
        type: 'menu',
        text: 'Menu-1',

        items: [
          {
            id: '1-1',
            type: 'item',
            text: 'Item-1-1',
          }, {
            id: '1-2',
            type: 'item',
            text: 'Item-1-2',
          }, {
            id: '1-3',
            type: 'item',
            text: 'Item-1-2',
          },
          {
            type: 'divider',
          }, {
            id: '1-4',
            type: 'item',
            text: 'Item-1-2',
          }, {
            id: '1-5',
            type: 'item',
            text: 'Item-1-2',
          },
        ]
      },
      {
        id: '2',
        type: 'menu',
        text: 'Menu-2',

        items: [
          {
            id: '2-1',
            type: 'item',
            text: 'Item-2-1',
          }, {
            id: '2-2',
            type: 'item',
            text: 'Item-2-2',
          }, {
            id: '2-3',
            type: 'item',
            text: 'Item-2-3',
          },
          {
            type: 'divider',
          }, {
            id: '2-4',
            type: 'item',
            text: 'Item-2-4',
          }, {
            id: '2-5',
            type: 'item',
            text: 'Item-1-2',
          },
        ]
      }, {
        type: 'menu',
        id: '233',
        text: 'Menu-3',
        items: []
      }
    ]}
  />

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
              { type: 'item', itemId: '1', text: 'Dashboard', description: 'A easy overview of your business' },
              { type: 'item', itemId: '2', text: 'User management', description: 'Handle user and user groups' },
              { type: 'item', itemId: '3', text: 'Catalog', description: 'Manage products and categories' },
              { type: 'item', itemId: '4', text: 'CMS', description: 'Content management system' }
            ]
          }}
        />
      }

      slotActions={
        <><UserMenu displayName="Jane Doe"/><LogoutButton/></>
      }

      //slotMenu={menuBar}

      slotSidebar={
        <SideMenu
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
    
    slotFiltering={
      <FilterBox>
       <Fieldset>
         <TextField name="firstName" label="First name" size="compact"/>
         <TextField name="lastName" label="Last name" size="compact"/>
       </Fieldset>
       <Fieldset>
         <TextField name="postcode" label="Postcode" size="compact"/>
         <TextField name="city" label="City" size="compact"/>
       </Fieldset>
       <Fieldset>
         <DateField name="dateFrom" label="Date from" size="compact"/>
         <DateField name="dateTo" label="Date to" size="compact"/>
       </Fieldset>
      </FilterBox>
    }
  />


const dataForm = 
  <DataForm title="Products">
    <TabBox>
      <TabPage title="Customer data">
        <FormSection title="Address">
          <Fieldset>
            <RadioButtonGroup
              name="salutation"
              label="Salutation"
              align="horizontal"
              value="mrs"

              options={[
                { value: 'mrs', text: 'Mrs' },
                { value: 'mr', text: 'Mrs' }
              ]}
            />
            
            <TextField name="firstName" label="First name" required/>
            <TextField name="lastName" label="Last name" required/>
            <TextField name="street" label="Street" required/>
            <TextField name="city" label="City" required/>
          </Fieldset>
            
          <Fieldset>
            <TextField name="firstName" label="First name" required/>
            <TextField name="lastName" label="Last name" required/>
            <TextField name="street" label="Street" required/>
            <TextField name="city" label="City" required/>
          </Fieldset>
        </FormSection>
        <FormSection title="Meta data">
          <Fieldset>
            <TextField name="firstName" label="First name" required/>
            <TextField name="lastName" label="Last name" required/>
            <TextField name="street" label="Street" required/>
            <TextField name="city" label="City" required/>
          </Fieldset>
            
          <Fieldset>
            <TextField name="firstName" label="First name" required/>
            <TextField name="lastName" label="Last name" required/>
            <TextField name="street" label="Street" required/>
            <TextField name="city" label="City" required/>
          </Fieldset>
        </FormSection>
      </TabPage>
      <TabPage title="Documents">
        {dataExplorer}
      </TabPage>
      <TabPage title="Images">
      </TabPage>
      <TabPage title="Setting">
      </TabPage>
      <TabPage title="Permission">
      </TabPage>
    </TabBox>
  </DataForm>

/*
const dataForm = 
  <DataForm title="Products">
    <Fieldset>
      <TextField name="productId" label="Product no."/>
    </Fieldset>
    <TabBox>
      <TabPage title="Customer data">
        <div>
          <Fieldset title="Primary contact">
            <RadioButtonGroup
                name="salutation"
                label="Salutation"
                required
              />
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
            <DateField name="dayOfBirth" label="Day of Birth" required/>

            <CheckBoxGroup
              label="Options"
            />
          </Fieldset>
          <Fieldset title="Secondary contact">
            <RadioButtonGroup
                name="salutation"
                label="Salutation"
                required
              />
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
            <DateField name="dayOfBirth" label="Day of Birth" required/>
          </Fieldset>
        </div>
        <div>
          <Fieldset title="Secondary contact">
            <RadioButtonGroup
                name="salutation"
                label="Salutation"
                required
              />
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
            <DateField name="dayOfBirth" label="Day of Birth" required/>
          </Fieldset>
        </div>
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
  </DataForm>
*/
const mainContent = dataForm
