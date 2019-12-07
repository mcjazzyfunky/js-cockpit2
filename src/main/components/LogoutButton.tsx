// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'
import { MdPowerSettingsNew as LogoutIcon } from 'react-icons/md'

// internal imports
import defineStyles from '../styling/tools/defineStyles'


// --- components ----------------------------------------------------

const LogoutButton = component<LogoutButtonProps>({
  displayName: 'LogoutButton',

  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateLogoutButtonProps) }
    : null,

  render: LogoutButtonView
})

// --- types ---------------------------------------------------------

type LogoutButtonProps = {
  onAction?: Function // TODO
}

// --- validation ----------------------------------------------------

const validateLogoutButtonProps = Spec.checkProps({
  optional: {
    onAction: Spec.func
  }
})

// --- styles --------------------------------------------------------

const useLogoutButtonStyles = defineStyles(theme => {
  return {
    button: {
      width: '48px',
      height: '48px',
      border: 'none',
      color: theme.colors.accent400,
      backgroundColor: theme.colors.mono400,
      outline: 'none',
      cursor: 'pointer',

      ':hover': {
        color: theme.colors.accent400,
        backgroundColor: theme.colors.accent200,
      },

      ':active': {
        color: theme.colors.accent500,
        backgroundColor: theme.colors.accent300,
      }
    },

    icon: {
      padding: '6px 6px',
      width: '32px',
      height: '32px'
    }
  }
})

// --- view ----------------------------------------------------------

function LogoutButtonView({
  onAction
}: LogoutButtonProps) {
  const classes = useLogoutButtonStyles()

  return (
    <button className={classes.button}>
      <LogoutIcon className={classes.icon}/>
    </button>
  )
}

// --- exports -------------------------------------------------------

export default LogoutButton
