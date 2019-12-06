// external imports
import React from 'react'
import { component } from 'js-react-utils'
import * as Spec from 'js-spec/validators'

// internal imports

// derived imports
const { useCallback, useEffect, useState } = React

// --- components ----------------------------------------------------

const DataExplorer = component<DataExplorerProps>({
  displayName: 'DataExplorer',
  render: DataExplorerView
})

// --- views ---------------------------------------------------------

function DataExplorerView({

}) {
  return <div>[DataExplorer]</div>
}

// --- types ---------------------------------------------------------

type DataExplorerProps = {
  title?: string
}

// --- validation ----------------------------------------------------

const validateDataExplorerProps = Spec.checkProps({
  optional: {
    title: Spec.string
  }
})

// --- exports -------------------------------------------------------

export default DataExplorer

