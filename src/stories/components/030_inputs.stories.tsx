import React from 'react'
import { App, DateField, TextInput, SelectBox } from '../js-cockpit'

export default {
  title: 'Input components'
}

export const textInput = () =>
  <App>
     <TextInput label="First name"/>
     <br/>
     <TextInput label="Last name"/>
  </App>

export const selectBox = () =>
  <App>
     <SelectBox label="salutation"/>
     <br/>
     <SelectBox label="country"/>
  </App>

export const dateField = () =>
  <App>
     <DateField label="Day of birth"/>
  </App>