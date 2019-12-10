// internal imports
import FormField from './FOrmField'

// --- types ---------------------------------------------------------

type FormModel = {
  fields: {
    [fieldName: string]: FormField
  }
}

// --- exports -------------------------------------------------------

export default FormModel
