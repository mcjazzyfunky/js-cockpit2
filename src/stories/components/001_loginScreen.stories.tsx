import React from 'react'
import { App, Brand, LoginScreen, Text, TextField, SelectBox, PasswordField } from '../js-cockpit'

export default {
  title: 'Login screen'
}

export const loginScreen = () =>
  <App>
    <LoginScreen
      slotHeader={
        <Brand
          vendor="meet&amp;greet"
          title="Back Office"
          size="medium"
        />}

      slotFooter={<Text>&copy; 2019, meet+greet</Text>}
    />
  </App>
