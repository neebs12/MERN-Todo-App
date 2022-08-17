import React, { useState } from 'react'

import { useAppSelector, useAppDispatch } from '../../hooks'
import { hideNewTodo } from '../../features/modal/modalSlice'

import { Box, Button, Typography, Toolbar, TextField, CssBaseline, Switch, FormGroup, FormControlLabel } from '@mui/material'
import { Modal } from '@mui/material'
import NoteAddIcon from '@mui/icons-material/NoteAdd'

interface ModalFormProps {
  show: boolean
}

const ModalForm = ({ show }: ModalFormProps) => {
  const dispatch = useAppDispatch()
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [Completed, setCompleted] = useState<boolean>(false)

  const handleOnClose = () => {
    // plus, 
    dispatch(hideNewTodo())
    // setOpenState(false)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('recognized form submission at modal')
    dispatch(hideNewTodo())
  }

  const style = {
    position: 'absolute' as 'absolute',
    // moves top-left corner to center of screen
    top: '50%', left: '50%', 
    // transforms element compared to itself be at center of the screen
    transform: 'translate(-50%, -50%)', 
    width: 400,
    // references the theme
    bgcolor: 'background.paper',
    border: '2px solid #e0e0e0',
    borderRadius: '20px',
    boxShadow: 24,
    // padding
    p: 4,
  } // 

  return (
    <Modal
      open={show} // temp
      onClose={handleOnClose}
      // linked id for the title
      aria-labelledby="modal-modal-title"
      // linked id for the description
      aria-describedby="modal-modal-description"        
    >
      <Box sx={{...style}}>
        <CssBaseline />
        <Box id="modal-modal-title" sx={{display: 'flex'}}>
          <NoteAddIcon fontSize='large'/>
          <Typography variant="h6" component="h2" sx={{mt: 0.5, ml: 1}}>
            Create a New Todo!
          </Typography>
        </Box>
        <Box 
          component='form' 
          sx={{
            '& .MuiTextField-root': { m: 1 } // sets all 
          }} 
          onSubmit={handleSubmit}
        >
          <TextField
            required 
            fullWidth
            variant='standard'
            id='todo-title'
            name='todo-title'
            label='Title'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <TextField 
            required 
            fullWidth
            multiline
            variant='standard'
            rows={4}
            id='todo-description'
            name='todo-description'              
            label='Description'
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <FormGroup>
            <FormControlLabel control={
                <Switch checked={Completed} onChange={() => setCompleted(s => !s)}/>
              }
              label='Completed'
            />
          </FormGroup>

          <Box sx={{mt: 1, display: 'flex', alignItems: 'flex-end', flexDirection: 'column'}}>
            <Button
              disableElevation
              variant='contained'
              type='submit'
              disabled={!(title && description)}
            >Submit</Button>
          </Box>
        </Box>
      </Box>        
    </Modal>
  )
}

export default ModalForm