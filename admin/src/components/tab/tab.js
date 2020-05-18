/*
 * Source: https://codepen.io/span/pen/MWaQYXV
 * */

import React from 'preact/compat'
import styled from 'styled-components'

const Tab = ({ config }) => {
  const [visibleTab, setVisibleTab] = React.useState(config[0].id)

  const listTitles = config.map((item) => (
    <TabsTitle onClick={() => setVisibleTab(item.id)} className={visibleTab === item.id && ' active'}>
      {item.tabTitle}
    </TabsTitle>
  ))

  const selectedContent = config.find((item) => visibleTab === item.id)

  return (
    <div>
      <TabsTitles>{listTitles}</TabsTitles>
      {selectedContent.tabContent}
    </div>
  )
}

const TabsTitles = styled.ul`
  list-style: none;
  padding: 0px;
  margin: 0;
`

const TabsTitle = styled.li`
  background-color: #fff;
  display: inline-block;
  padding: 10px;
  color: #c7c6c2;
  cursor: pointer;
  margin-left: 1px;

  :active {
    color: black;
  }
`

export default Tab
