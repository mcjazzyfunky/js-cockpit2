import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import { Label1, Label2, Label3 } from 'baseui/typography'
import { Button, KIND, SHAPE, SIZE } from 'baseui/button'
import { Input } from 'baseui/input'
import { FormControl } from 'baseui/form-control'
import * as Spec from 'js-spec/validators'

// internal import
import defineStyles from '../styling/tools/defineStyles'

// --- components ----------------------------------------------------

const LoginForm = component<LoginFormProps>({
  displayName: 'LoginForm',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateLoginFormProps) }
    : null,
 
  render: LoginFormView
})

// --- types ---------------------------------------------------------

type LoginFormProps = {
}

// --- validation ----------------------------------------------------

const validateLoginFormProps = Spec.checkProps({
  optional: {
  }
})

// --- styles --------------------------------------------------------

const useLoginFormStyles = defineStyles(theme => {
  return {
    root: {
      width: '300px',
      border: '1px solid #aaa',
      padding: '2rem 4rem'
    },

    fieldsContainer: {
      
    },

    fieldWrapper: {
      display: 'table-row',
      margin: '0 0 1em 0'
    },

    loginButtonWrapper: {
      margin: '1em 0 0 0'
    },

    loginButtonText: {
      width: '300px',
    }
  }
})

// --- view ----------------------------------------------------------

function LoginFormView({
}: LoginFormProps) {
  const classes = useLoginFormStyles()

  return (
     <div className={classes.root}> 
        <Label1>Login</Label1>

        <div className={classes.fieldsContainer}>
          <label className={classes.fieldWrapper}>
            <span>Username</span>
            <Input size={SIZE.compact}/>
          </label>

          <label className={classes.fieldWrapper}>
            <FormControl
              label={() => "Password"}
            >
              <Input type="password" size={SIZE.compact}/>
            </FormControl>
          </label>
        </div>

        <div className={classes.loginButtonWrapper}>
          <Button size={SIZE.compact} kind={KIND.primary}>
            <div className={classes.loginButtonText}>Login</div>
          </Button>
        </div>
     </div>
  )
}

// --- exports -------------------------------------------------------

export default LoginForm 
