import React, {useEffect, useState} from 'react'
import { Box, Button } from 'grommet'
import eventManager from '../../engine/eventManager'
import engine from '../../engine/engine';
import TokenDetails from './TokenDetails/TokenDetails';
import Token from '../../game/token';
export default function DetailsTab() {
  const [detailObject, setDetailObject] = useState()
  const [showDetails, setShowDetails] = useState(false)
  
  useEffect(() => {
    eventManager.registerEvent('show-details')
    eventManager.registerListener('show-details', id => {
      const go = engine.getGameObject(id);
      console.log(go)
      if (go instanceof Token) {
        setDetailObject(<TokenDetails gameObjectId={go.id} tokenLabel={go.options.text} />)
        setShowDetails(true)
      }
    })
  }, [])

  return (showDetails) ? (<Box elevation="small" background="white" flex="grow" direction="column" alignSelf="end" margin="small">
      <Button plain border={"none"} onClick={() => setShowDetails(false)} alignSelf="end" margin="small" width="40px" label="X"></Button>
      {detailObject}
    </Box>) : <Box flex="grow" width="10px" alignSelf="end"  />
}
