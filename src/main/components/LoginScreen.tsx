// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'

// internal import
import Text from './Text'
import defineStyles from '../styling/tools/defineStyles'
//import LoginGraphic from 'react-svg-loader!../illustrations/login.svg'

// --- components ----------------------------------------------------

const LoginScreen = component<LoginScreenProps>({
  displayName: 'LoginScreen',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateLoginScreenProps) }
    : null,
 
  render: LoginScreenView
})

// --- types ---------------------------------------------------------

type LoginScreenProps = {
  slotHeader?: ReactNode,
  slotFooter?: ReactNode,
  slotLoginForm?: ReactNode
}

type Classes = ReturnType<typeof useLoginScreenStyles>

// --- validation ----------------------------------------------------

const validateLoginScreenProps = Spec.checkProps({
  optional: {
    slotHeader: isNode,
    slotFooter: isNode,
    slotLogin: isNode,
  }
})

// --- styles --------------------------------------------------------

const useLoginScreenStyles = defineStyles(theme => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      position: 'absolute',
      width: '100%',
      height: '100%'
    },

    header: {
      display: 'flex',
      alignItems: 'center',
      padding: '0 32px',
      height: '52px',
      maxHeight: '52px',
      overflow: 'hidden',
      boxShadow: theme.lighting.shadow500
    },

    body: {
      display: 'flex',
      alignItems: 'center',
      flexGrow: 1,
      overflow: 'auto'
    },

    footer: {
      display: 'flex',
      alignItems: 'center',
      padding: '0 32px',
      height: '44px',
      maxHeight: '44px',
      boxShadow: theme.lighting.shadow500
    }
  }
})

// --- view ----------------------------------------------------------

function LoginScreenView({
  slotHeader,
  slotFooter,
  slotLoginForm
}: LoginScreenProps) {
  const classes = useLoginScreenStyles()

  return (
    <div className={classes.root}>
      {renderHeader(slotHeader, classes)}
      {renderBody(slotLoginForm, classes)}
      {renderFooter(slotFooter, classes)}
    </div>
  )
}

function renderHeader(
  slotHeader: ReactNode,
  classes: Classes
) {
  if (!slotHeader) {
    return null
  }

  return (
    <div className={classes.header}>
      {slotHeader}
    </div>
  )
}

function renderFooter(
  slotFooter: ReactNode,
  classes: Classes
) {
  if (!slotFooter) {
    return null
  }

  return (
    <div className={classes.footer}>
      {slotFooter}
    </div>
  )
}

function renderBody(
  slotLoginForm: ReactNode,
  classes: Classes
) {
  if (!slotLoginForm) {
    return null
  }

  return (
    <div className={classes.body}>
      {slotLoginForm}
    </div>
  )
}

// --- exports -------------------------------------------------------

export default LoginScreen 
