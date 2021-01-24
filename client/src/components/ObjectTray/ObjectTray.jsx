import { Tabs, Tab, Box, Grommet } from 'grommet'
import React, { Component } from 'react'
import ObjectBar from '../ObjectBar'
import './objecttray.css'

export default class ObjectTray extends Component {
  render() {
    return (
      <Box width="100vw" >
        <Tabs 
          width="100%"
          className="object-tray-container"
          alignControls="start"
          alignSelf="start"
          background=""
        >
          <Tab title="Tokens">
            <ObjectBar addEvents={['add-token']} url={'/api/tokens'} />
          </Tab>
          <Tab title="Shapes">
            <ObjectBar addEvents={['activate-shape-creator', 'activate-line-creator']} url={'/api/shapes'} />
          </Tab>
        </Tabs> 
      </Box>
    )
  }
}
