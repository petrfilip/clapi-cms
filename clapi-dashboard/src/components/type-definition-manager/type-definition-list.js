import {h, React} from 'preact';
import {route} from "preact-router";
import * as api from "../../api";
import DataLoader from "../data-loader";

function renderList(data) {
  return (
      <div>

        {data.map((item, i) => (<div onClick={() =>
            route("/definition-editor/"
                + item.collectionName)}>{item.collectionName}</div>))}
      </div>);
}

const TypeDefinitionList = () => {
  return (

      <DataLoader uri={api.fetchCollection("type-definition")}>
        {data => renderList(data)}
      </DataLoader>
  );
};
export default TypeDefinitionList;