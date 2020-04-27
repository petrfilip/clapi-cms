import {useContext, useEffect, useState} from "preact/hooks";
import * as api from "../../api";
import DataManager from "../data-loader/data-manager";
import TypeDefinitionBuilder from "./type-definition-builder";
import TypeDefinitionBuilderMenu from "./type-definition-builder-menu";

import React from "preact/compat";
import styled from "styled-components";
import TwoColumnsLayout from "../layout/two-columns-layout";
import {MenuContext} from "../menu/menu-context";
import Button from "../elementary/button";

const saveOrUpdate = (data) => {
  DataManager.saveOrUpdate(api.fetchCollection("type-definition"), "json", data)
}

const TypeDefinitionEditor = (props) => {
  const {setMenuContext} = useContext(MenuContext)
  const [typeDefinition, setTypeDefinition] = useState(
      props.typeDefinition || {});
  const [typeDefinitionConfig, setTypeDefinitionConfig] = useState(
      props.typeDefinition.config || {});

  const onNewDefinition = (obj) => {
    setTypeDefinitionConfig(
        addToObject(typeDefinitionConfig, obj.apiKey, obj.value, obj.position));

  }

  const onUpdateDefinition = (obj) => {
    console.log(obj)

  }

  const onRemoveDefinition = (key) => {
    const copy = Object.assign({}, typeDefinitionConfig);
    delete copy[key];
    console.log(copy)
    setTypeDefinitionConfig(copy);
  }

  function saveOrUpdateAction() {
    typeDefinition.config = typeDefinitionConfig;
    saveOrUpdate(typeDefinition);
  }

  useEffect(() => {
    setMenuContext(<Button onClick={saveOrUpdateAction}>update
      definition</Button>);
    return () => setMenuContext(null);
  }, [typeDefinitionConfig]);

  {/*{JSON.stringify(typeDefinitionConfig, null, 2)}*/
  }

  return (

      <TwoColumnsLayout
          left={<TypeDefinitionBuilder
              typeDefinitionConfig={typeDefinitionConfig}
              onNewDefinition={onNewDefinition}
              onUpdateDefinition={onUpdateDefinition}
              onRemoveDefinition={onRemoveDefinition}
          />}
          right={<TypeDefinitionBuilderMenu/>}/>

  );
};

const addToObject = function (obj, key, value, index) {

  // Create a temp object and index variable
  const temp = {};
  let i = 0;

  // Loop through the original object
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {

      // If the indexes match, add the new item
      if (i === index && key && value) {
        temp[key] = value;
      }

      // Add the current item in the loop to the temp obj
      temp[prop] = obj[prop];

      // Increase the count
      i++;

    }
  }

  // If no index, add to the end
  if (!index && key && value) {
    temp[key] = value;
  }

  return temp;

};

export default TypeDefinitionEditor;
