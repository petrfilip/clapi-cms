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

const FileSelect = (props) => {
  const onMediaSelected = (item) => {
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
                    routeAllowed={false}
                    selectedItem={data}
                    fileListMode={Mode.SELECT}
                    onMediaClick={onMediaSelected}
                    params={[{}]}
                  />
                )
              }}
            >
              Select
            </Button>

            <PreviewContainer>
              <FilePreview file={data} />
              {data && data.originName}
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
  align-items: center;

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

  font-size: 1.5em;

  & > img {
    height: 50px;
  }
`

export default FileSelect
