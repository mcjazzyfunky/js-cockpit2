// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'
import { FiUser as UserIcon } from 'react-icons/fi'

// internal import
import defineStyles from '../styling/tools/defineStyles'

// --- components ----------------------------------------------------

const UserMenu = component<UserMenuProps>({
  displayName: 'UserMenu',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateUserMenuProps) }
    : null,
  
    render: UserMenuView
})

// --- types ---------------------------------------------------------

type UserMenuProps = {
  displayName?: string,
}

// --- validation ----------------------------------------------------

const validateUserMenuProps = Spec.checkProps({
  optional: {
    displayName: Spec.string
  }
})

// --- styles --------------------------------------------------------

const useUserMenuStyles = defineStyles(theme => {
  return {
    root: {
      display: 'flex',
      color: theme.colors.foreground,
      padding: '.2rem .5rem',
      alignItems: 'center'
    },

    icon: {
      width: '24px',
      height: '24px',
    },

    displayName: {
      fontSize: theme.sizing.scale600,
      margin: '0 8px'
    }
  }
})

// --- view ----------------------------------------------------------

function UserMenuView({
  displayName
}: UserMenuProps) {
  const classes = useUserMenuStyles()

  return (
    <div className={classes.root}>
      <UserIcon className={classes.icon}/>
      <div className={classes.displayName}>{displayName}</div>
    </div>
  )
}

// --- exports -------------------------------------------------------

export default UserMenu 
