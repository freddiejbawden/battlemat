import React, { useEffect, useState }  from 'react'
import { Box } from 'grommet'
import ObjectView from './ObjectView'

export default function ObjectBar(props) {
  const [ objects, setObjects ] = useState([])

  useEffect(() => {
    fetch(props.url)
      .then((res) => res.json())
      .then((data => setObjects(data)))
  }, [props.url])
  return (
  <Box direction="row" background="ui-background" pad="medium">{objects.map((elm, i) => <ObjectView key={i} addEvent={props.addEvents[i]} objectData={elm} />)}</Box>
  )
}

