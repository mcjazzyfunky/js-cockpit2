// external imports
import React, { ReactNode } from 'react'

// derived imports
const { createElement: h } = React

// internal imports
import FormCtrlCtx from '../context/FormCtrlCtx'
import FormModel from '../types/FormModel'
import FormCtrl from '../types/FormCtrl'

// -- exports --------------------------------------------------------

export default function useFormMgmt(formModel: FormModel) {
  const
    formCtrl: FormCtrl = null as any // TODO,
  
  function FormCtrlProvider({
    children 
  }: {
    children: ReactNode
  }) {
    return h(FormCtrlCtx.Provider, { value: formCtrl }, children)
  }

  function setSubmitHandler() {
    // TODO
  }

  return [formCtrl, setSubmitHandler, FormCtrlProvider]
}

// --- types ---------------------------------------------------------

type FormCtrlParams = {
  initialData: Record<string, any>,
  handleChange(fieldName: string, value: any, dirty: boolean): void,
  handleSubmit(data: Record<string, any>): void,
  isFieldRequired(fieldName: string): void,
  isFieldDisabled(fieldName: string): void,
  getGeneralErrors(): string[]
}

// --- misc ----------------------------------------------------------

function createFormCtrl({
  initialData = {},
  handleChange,
  handleSubmit,
  isFieldRequired,
  isFieldDisabled,
  getGeneralErrors
}: FormCtrlParams): FormCtrl {
  const
    data: Map<string, any> = new Map(),
    dirtyData: Map<string, any> = new Map(),
    dirtyFields: Set<string> = new Set()

  Object.entries(initialData).forEach(([key, value]) => {
    data.set(key, value)
    dirtyData.set(key, value)
  })

  const ret: FormCtrl = {
    setFieldValue(fieldName, value, dirty = false) {
      if (!dirty) {
        data.set(fieldName, value)
        dirtyData.set(fieldName, value)
        dirtyFields.delete(fieldName)
      } else {
        dirtyData.set(fieldName, value)
        dirtyFields.add(fieldName)
      }

      handleChange(fieldName, value, dirty)
    },

    getFieldValue(fieldName, dirty: boolean = false) {
      return (dirty ? dirtyData : data).get(fieldName) 
    },
    
    isFieldDirty(fieldName: string) {
      return dirtyFields.has(fieldName)
    },

    isFieldRequired(fieldName: string) {
      return true // TODO
    },
    
    isFieldDisabled(fieldName: string) {
      return false
    },
    
    getFieldErrors(fieldName: string) {
     return []
    },

    getGeneralErrors() {
      return [] // TODO
    },

    getFormData(dirty: boolean = false) {
      const
        ret: Record<string, any> = {},
        dat = (dirty ? dirtyData : data)
    
      dat.forEach((value, key) => {
        ret[key] = value
      })

      return ret
    },

    submit() {
      dirtyFields.forEach(fieldName => {
        data.set(fieldName, dirtyData.get(fieldName))
      })

      dirtyFields.clear()

      handleSubmit(ret.getFormData(false))
    }
  }

  return ret
}