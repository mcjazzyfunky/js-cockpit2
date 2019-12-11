import React from 'react'
import { App, DateField, TextField, SelectBox } from '../js-cockpit'

export default {
  title: 'Input components'
}

export const textField = () =>
  <App>
     <TextField label="First name"/>
     <br/>
     <TextField label="Last name"/>
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