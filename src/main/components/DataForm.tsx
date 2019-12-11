// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import { FiLayers as DefaultLogo } from 'react-icons/fi'
import * as Spec from 'js-spec/validators'

// internal import
import defineStyles from '../tools/defineStyles'

// --- components ----------------------------------------------------

const DataForm = component<DataFormProps>({
  displayName: 'DataForm',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateDataFormProps) }
    : null,
 
  render: DataFormView
})

// --- types ---------------------------------------------------------

type DataFormProps = {
  title?: string,
  children?: ReactNode
}

// --- validation ----------------------------------------------------

const validateDataFormProps = Spec.checkProps({
  optional: {
  }
})

// --- styles --------------------------------------------------------

const useDataFormStyles = defineStyles(theme => {
  return {
    root: {
      margin: '5px'
    },

    header: {
      borderWidth: '0 0 0.5px 0',
      borderStyle: 'solid',
      borderColor: theme.colors.mono500
    },

    title: {
      padding: '12px 20px',
      ...theme.typography.font200,
      fontWeight: 200,
      fontSize: '24px'
    },

    body: {
      padding: '12px 20px',
    }
  }
})

// --- view ----------------------------------------------------------

function DataFormView({
  title,
  children
}: DataFormProps) {
  const classes = useDataFormStyles()

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.title}>
            {title}
        </div>
      </div>
      <div className={classes.body}>
        {children}
      </div>
    </div>
  )
}

// --- exports -------------------------------------------------------

export default DataForm