import React, {useEffect, useState} from 'react'
import { Box, Button } from 'grommet'
import eventManager from '../../engine/eventManager'
import engine from '../../engine/engine';
import TokenDetails from './TokenDetails/TokenDetails';
import Token from '../../game/token';

export default function DetailsTab() {
  const [detailObject, setDetailObject] = useState()
  useEffect(() => {
    eventManager.registerEvent('show-details')
    eventManager.registerListener('show-details', id => {

      const go = engine.getGameObject(id);
      console.log(go)
      // change this 
      if (go instanceof Token) {
        setDetailObject(<TokenDetails gameObjectId={go.id} tokenLabel={go.options.text} />)
      }
    })
  }, [])
  return (
    <Box elevation="small" width="400px" background="white" flex="grow" alignSelf="end" margin="small">
      <Button label="X"></Button>
      {detailObject}
    </Box>
  )
}
