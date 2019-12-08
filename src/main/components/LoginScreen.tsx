// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'

// internal import
import Text from './Text'
import defineStyles from '../styling/tools/defineStyles'
import { FormControl } from 'baseui/form-control'
import { Input, SIZE } from 'baseui/input'
import { Button } from 'baseui/button'
import { Checkbox } from 'baseui/checkbox'
import { IoIosUnlock as LoginIcon } from 'react-icons/io'

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
  
  loginFields?: LoginField[]
}

type LoginField = 
  { type: 'text', name: string, label: string }
    | { type: 'password', name: string, label: string }

type Classes = ReturnType<typeof useLoginScreenStyles>

// --- validation ----------------------------------------------------

const validateLoginScreenProps = Spec.checkProps({
  optional: {
    slotHeader: isNode,
    slotFooter: isNode,
  
    loginFields: Spec.arrayOf(
      Spec.and(
        Spec.prop('type', Spec.oneOf('text', 'password', 'select')),

        Spec.or({
          when: Spec.prop('type', Spec.is('type')),
          then: Spec.exact({
            type: Spec.is('text'),
            name: Spec.string,
            label: Spec.string
          })
        }, {
          when: Spec.prop('type', Spec.is('type')),
          then: Spec.exact({
            type: Spec.is('text'),
            name: Spec.string,
            label: Spec.string
          })
        })
      )
    )
  }
})

// --- styles --------------------------------------------------------

const useLoginScreenStyles = defineStyles(theme => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: '#f3f3f2',
    },

    topSpacer: {
      flexGrow: 3
    },

    bottomSpacer: {
      flexGrow: 5 
    },

    header: {
      color: '#888'
    },

    body: {
      height: '500px',
      width: '560px',
      display: 'flex',
      margin: '16px',
      boxShadow: theme.lighting.shadow600
    },

    footer: {
      color: '#888'
    },
    
    column1: {
      flexGrow: 5,
      display: 'flex',
      flexDirection: 'column',
      minWidth: '280px',
      maxWidth: '280px',
      padding: '10px 24px',
      boxSizing: 'border-box',
      color: 'white',
      backgroundColor: 'rgb(0, 195, 154)',
      borderRadius: '6px 0 0 6px',
      textAlign: 'center',

      backgroundImage: `url('data:image/svg+xml;charset=UTF-8,`
        + `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">`
        + '<g transform="translate(0 15)">'
        + `<circle fill="white" opacity="0.14" cx="0" cy="50" r="30"/>`
        + `<circle fill="white" opacity="0.14" cx="10" cy="80" r="50"/>`
        + `<circle fill="white" opacity="0.14" cx="10" cy="100" r="30"/>`
        + `<circle fill="white" opacity="0.17" cx="70" cy="100" r="65"/>`
        + `<circle fill="white" opacity="0.16" cx="120" cy="60" r="50"/>`
        + '</g>'
        + `</svg>')`,

      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'bottom',
    },

    column2: {
      display: 'flex',
      flexDirection: 'column',
      minWidth: '300px',
      maxWidth: '300px',
      padding: '24px 20px',
      flexGrow: 7,
      backgroundColor: 'white',
      borderRadius: '0 6px 6px 0'
    },

    column1Top: {
      flexGrow: 1
    },

    column1Bottom: {
      marginBottom: '25px'
    },

    headline: {
      ...theme.typography.font100,
      fontSize: '32px',
      fontWeight: 100
    },
    
    subheadline: {
      ...theme.typography.font100,
      fontSize: '17px',
      fontWeight: 100,
    },

    column2Top: {
      flexGrow: 1
    },

    column2Bottom: {
    },

    loginButton: {
      width: '100%',
      backgroundColor: 'rgb(0, 195, 154) !important',
      margin: '16px 0 0 0 !important'
    }
  }
})

// --- view ----------------------------------------------------------

function LoginScreenView({
  slotHeader,
  slotFooter,
  loginFields
}: LoginScreenProps) {
  const classes = useLoginScreenStyles()

  return (
    <div className={classes.root}>
      <div className={classes.topSpacer}/>
      {renderHeader(slotHeader, classes)}
      <div className={classes.body}>
        <div className={classes.column1}>
          <div className={classes.column1Top}>
            <h3 className={classes.headline}>Login</h3>
            <div className={classes.subheadline}>Please enter your credentials to log in</div>
          </div>
          <div className={classes.column1Bottom}>
            <LoginIcon size="70"/>
          </div>
        </div>

        <div className={classes.column2}>
          {renderFields(loginFields, classes)}
          {renderLoginActions(classes)}
        </div>
      </div>
      {renderFooter(slotFooter, classes)}
      <div className={classes.bottomSpacer}/>
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

function renderFields(fields: LoginField[] | undefined, classes: Classes) {
  console.log(fields)
  if (!fields) {
    return null
  }

  return (
    <div className={classes.column2Top}>
      {
        fields.map(field => {
          switch (field.type) {
          case 'text':
            return renderTextField(field, classes)
          
          case 'password':
            return renderPasswordField(field, classes)
          }
        })
      }
    </div>
  )
}

function renderTextField(field: LoginField, classes: Classes) {
  return (
    <FormControl label={field.label}>
      <Input size={SIZE.compact} name={field.name}/>
    </FormControl>
  )
}

function renderPasswordField(field: LoginField, classes: Classes) {
  return (
    <FormControl label={field.label}>
      <Input type="password" size={SIZE.compact} name={field.name}/>
    </FormControl>
  )
}

function renderLoginActions(classes: Classes) {
  const overrides = {
    BaseButton: {
      props: {
        className: classes.loginButton
      }
    }
  }

  return (
    <div className={classes.column2Bottom}>
      <Checkbox name="rememberLogin">
        Remember login
      </Checkbox>
      <Button size={SIZE.compact} overrides={overrides}>
        Log in
      </Button>
    </div>
  )
}

// --- exports -------------------------------------------------------

export default LoginScreen 
