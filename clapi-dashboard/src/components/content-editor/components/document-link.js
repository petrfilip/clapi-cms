import {useContext, useEffect, useState} from "preact/hooks";
import {AppModalContext} from "../../modal/AppModalContextProvider";
import CollectionList from "../../collection-list";
import * as api from "../../../api";
import DataLoader from "../../data-loader";
import Button from "../../elementary/button";
import React from "preact/compat";
import styled from "styled-components";

const DocumentLink = (props) => {

  const onDocumentSelected = (item) => {
    props.onInputChangeCallback(props.id, {id: item._id, collectionName: item.metadata.collectionName});
  }

  const {setModalBody} = useContext(AppModalContext)

  return (
      <ComponentContainer>

        <DataLoader
            uri={props.initialValue && props.initialValue.id
            && api.fetchCollectionContent(props.initialValue.collectionName,
                props.initialValue.id)}>
          {data => (
              <>
                <Button
                    onClick={() => {
                      setModalBody(<CollectionList
                          onRowClick={onDocumentSelected}/>);
                    }}>Select
                </Button>
                <PreviewContainer>{data && data._id}</PreviewContainer>
                <Button onClick={() => onDocumentSelected({})}>Remove</Button>
              </>
          )}
        </DataLoader>
      </ComponentContainer>

  )
};

const ComponentContainer = styled.div`
display: flex;
align-items: baseline;

  & > div {
    flex: 1;
   }

 & > div:last-child {
  margin-left: auto;
 }
`

const PreviewContainer = styled.div`
  font-size: 1.5em;
`

export default DocumentLink;
