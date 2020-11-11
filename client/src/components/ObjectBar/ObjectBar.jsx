import React, { Component } from 'react'
import { Box } from 'grommet'
import ObjectView from './ObjectView'
import { useEffect, useState } from 'react'
export default function ObjectBar() {

  const [ objects, setObjects ] = useState([])

  useEffect(() => {
    fetch('/api/tokens')
      .then((res) => res.json())
      .then((data => setObjects(data)))
  }, [])
  return (
  <Box background="ui-background" pad="medium">{objects.map((elm) => <ObjectView objectData={elm} />)}</Box>
  )
}

