import { route } from 'preact-router'
import PropTypes from 'prop-types'
import * as api from './../../api'
import DataLoader from '../data-loader'
import React from 'preact/compat'
import styled from 'styled-components'

const CollectionVersionList = ({ collectionName }) => {
  return (
    <DataLoader uri={api.fetchCollectionRevisions(collectionName)}>
      {(data) => {
        const sortedVersions = data.sort((a, b) => {
          if (a.sys.version > b.sys.version) {
            return -1
          } else {
            return 1
          }
        })
        return sortedVersions.map((value) => (
          <Tile>
            <Version>{value.sys && value.sys.version}</Version>
            <UpdatedDate>{value.sys && value.sys.updated}</UpdatedDate>
          </Tile>
        ))
      }}
    </DataLoader>
  )
}

const Tile = styled.div`
  //background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 40px;
  padding: 10px;
  margin: 10px;
  overflow: auto;
  background-color: #e2e2e2;
  font-size: 16px;
  border-radius: 2px;
`

const Version = styled.div``

const UpdatedDate = styled.div``

export default CollectionVersionList
