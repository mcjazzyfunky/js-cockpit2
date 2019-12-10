// externals imports
import React from 'react'

// internal imports
import FormCtrl from '../types/FormCtrl'

// derived imports
const { createContext } = React

// --- exports -------------------------------------------------------

export default createContext<FormCtrl | null>(null)
