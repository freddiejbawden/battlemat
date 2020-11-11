import { Tabs, Tab, Box, Grommet } from 'grommet'
import React, { Component } from 'react'
import ObjectBar from '../ObjectBar'
import './objecttray.css'

export default class ObjectTray extends Component {
  render() {
    return (
      <div>
        <Tabs 
          className="object-tray-container"
          alignControls="start"
          alignSelf="start"
        >
          <Tab title="Tokens">
            <ObjectBar />
          </Tab>
          <Tab title="Scenery">
            <ObjectBar />
          </Tab>
        </Tabs> 
      </div>
    )
  }
}
