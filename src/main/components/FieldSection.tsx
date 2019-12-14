// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import { FiLayers as DefaultLogo } from 'react-icons/fi'
import * as Spec from 'js-spec/validators'

// internal import
import defineStyles from '../tools/defineStyles'

// --- components ----------------------------------------------------

const FieldSection = component<FieldSectionProps>({
  displayName: 'FieldSection',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateFieldSectionProps) }
    : null,
 
  render: FieldSectionView
})

// --- types ---------------------------------------------------------

type FieldSectionProps = {
  title?: string,
  children?: ReactNode
}

// --- validation ----------------------------------------------------

const validateFieldSectionProps = Spec.checkProps({
  optional: {
    title: Spec.string,
    children: isNode
  }
})

// --- styles --------------------------------------------------------

const useFieldSectionStyles = defineStyles((theme, hasTitle: boolean) => {
  return {
    root: {
    },

    title: {
      ...theme.typography.font100,
      fontWeight: 600,
      color: theme.colors.mono800,
      textTransform: 'uppercase'
    },

    content: {
      padding: '1em 1em',
      borderWidth: '.5px 0 0 0',
      borderStyle: 'solid',
      borderColor: theme.borders.border500.borderColor
    }
  }
})

// --- view ----------------------------------------------------------

function FieldSectionView({
  title,
  children
}: FieldSectionProps) {
  const
    hasTitle = !!title,
    classes = useFieldSectionStyles(hasTitle),

    titleContent = title
      ? <div className={`${classes.title}`}>
          {title}
        </div>
      : null

  return (
    <div data-component="FieldSection" className={`${classes.root}`}>
      {titleContent}
      <div className={classes.content}>
        {children}
      </div>
    </div>
  )
}

// --- exports -------------------------------------------------------

export default FieldSection