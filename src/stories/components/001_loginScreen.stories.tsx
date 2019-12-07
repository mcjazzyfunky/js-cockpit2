import React from 'react'
import { App, Brand, LoginForm, LoginScreen, Text } from '../js-cockpit'

export default {
  title: 'Login screen'
}

export const loginScreen = () =>
  <App>
    <LoginScreen
      slotHeader={<Brand vendor="meet&amp;greet" title="Back Office"/>}
      slotFooter={<Text>&copy; 2019, meet+greet</Text>}
      slotLoginForm={<LoginForm/>}
    />
  </App>
