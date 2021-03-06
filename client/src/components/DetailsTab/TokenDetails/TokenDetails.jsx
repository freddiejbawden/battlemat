import React, {useState, useEffect} from 'react'
import {Box, Text,FormField, TextInput, Button} from 'grommet'
import { engine } from '../../../engine/engine'
import { createEntityUpdate } from '../../../engine/statemanagement/state'
export default function TokenDetails(props) {
  const {gameObjectId,tokenLabel} = props;
  const [value, setValue] = useState(tokenLabel)

  useEffect(() => {
    setValue(tokenLabel)
  }, [gameObjectId])

  const save = () => {
    console.log('save')
    createEntityUpdate({id: props.gameObjectId, options: {text: value}})
  }
  
  return (
    <Box margin="small">
      <FormField label="Token Label">
        <TextInput
          value={value}
          onChange={event => setValue(event.target.value)}
        />
      </FormField>
      <Button primary label="Save" onClick={save}></Button>
      
      
    </Box>
  )
}

// TODO: PropTypes here 