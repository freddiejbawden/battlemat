import React from 'react'
import { Box, Image } from 'grommet'
import eventManager from '../../engine/eventManager'

export default function ObjectView(props) {
  const onClickEvent = (e) => {
    e.stopPropagation()
    e.preventDefault()
    eventManager.triggerEvent('cancel-action', {})
    eventManager.triggerEvent(props.addEvent, {})
  }

  return (
    <Box margin="medium" pad="medium" onClick={onClickEvent} draggable={false} height="200px" width="200px" background="dark-3" >
      <Image draggable={false} fit="cover" src={props.objectData} />
    </Box>
  )
}
