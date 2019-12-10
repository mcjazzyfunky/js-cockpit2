// external imports
import React from 'react'

// internal imports
import FormCtrlCtx from '../context/FormCtrlCtx'

// derived imports
const { useContext } = React

// --- hoks -----------------------------------------------------------

function useFormCtrl() {
  return useContext(FormCtrlCtx)
}

// --- exports ---------------------------------------------------------
export default useFormCtrl
