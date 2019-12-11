// external imports
import React from 'react'

// derived imports
const { createContext } = React

// --- context -------------------------------------------------------

export default createContext<'compact' | 'default' | 'large'>('default')
