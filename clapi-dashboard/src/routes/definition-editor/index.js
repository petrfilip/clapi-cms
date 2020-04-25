import {h, Component, React} from 'preact';
import ContentEditor from "../../components/content-editor/content-editor";
import mockStructure from '../../mock-structure.json'
import {useEffect, useState} from "preact/hooks";
import Loader from "../../components/loader";
import Error from "../../components/error";
import TypeDefinitionEditor from "../../components/type-definition-manager";
import TypeDefinitionList
  from "../../components/type-definition-manager/type-definition-list";
import * as api from "../../api";
import DataLoader from "../../components/data-loader";

const DefinitionEditor = ({typeDefinition}) => {

  return (typeDefinition === "" ?
          (<><TypeDefinitionList/></>) :
          <DataLoader uri={api.fetchTypeDefinition(typeDefinition)}>
            {data => <TypeDefinitionEditor typeDefinition={data}/>}
          </DataLoader>
  )
};

export default DefinitionEditor;