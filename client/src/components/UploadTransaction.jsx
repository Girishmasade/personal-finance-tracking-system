import { Dialog } from '@mui/material'
import React from 'react'

const UploadTransaction = ({openUploadFile, setOpenTransaction}) => {
  return (
    <Dialog
    open={openUploadFile}
    onClose={() => setOpenTransaction(false)}
    >
      
    </Dialog>
  )
}

export default UploadTransaction
