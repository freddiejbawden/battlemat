import React from 'react'
import { Box, Image } from 'grommet'
import eventManager from '../../engine/eventManager'

export default function ObjectView(props) {
  return (
    <Box onClick={() => eventManager.triggerEvent('add-token')} draggable={false} height="200px" width="200px" background="dark-3" >
      <Image draggable={false} fit="cover" src={props.objectData} />
    </Box>
  )
}
