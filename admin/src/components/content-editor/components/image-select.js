import FileManager from '../../file-manager'
import { useContext } from 'preact/hooks'
import { Mode } from '../../file-manager/file-list'
import * as api from '../../../api'
import DataLoader from '../../data-loader'
import { FilePreview } from '../../file-manager/file-preview/file-preview'
import React from 'preact/compat'
import styled from 'styled-components'
import Button from '../../elementary/button'
import { LayoutContext } from '../../layout/layout-context'

const ImageSelect = (props) => {
  const onMediaSelected = (item) => {
    props.onChangeObjectCallback && props.onChangeObjectCallback(item)
    props.onInputChangeCallback(props.id, item._id)
  }

  const { setActionSidebar } = useContext(LayoutContext)

  return (
    <ComponentContainer>
      <DataLoader forceShowChild={true} uri={props.initialValue && api.fetchMedia(props.initialValue)}>
        {(data) => (
          <>
            <Button
              onClick={() => {
                setActionSidebar(
                  <FileManager
                    location={props.config.location || '/'}
                    routeAllowed={false}
                    selectedItem={data}
                    fileListMode={Mode.SELECT}
                    onMediaClick={onMediaSelected}
                  />
                )
              }}
            >
              Select
            </Button>

            <PreviewContainer>
              <FilePreview file={data} />
            </PreviewContainer>
            <Button onClick={() => onMediaSelected({})}>Remove</Button>
          </>
        )}
      </DataLoader>
    </ComponentContainer>
  )
}

const ComponentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  height: 100px;

  & > div {
    flex: 1;
  }

  & > div:last-child {
    margin-left: auto;
  }
`

const PreviewContainer = styled.div`
  display: flex;
  align-items: center;

  font-size: 1em;

  & > img {
    object-fit: cover;
    height: 100px;
    width: 100%;
    max-width: 300px;
  }
`

export default ImageSelect
