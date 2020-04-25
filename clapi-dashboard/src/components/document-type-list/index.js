import {h, React} from 'preact';
import {route} from "preact-router";
import * as api from "../../api";
import DataLoader from "../data-loader";

function renderList(data) {
  return (
      <div>
        {data.map((item, i) => (<div onClick={() =>
            route("/edit/" + item.collectionName
                + "/")}>{item.collectionName}</div>))}
      </div>);
}

const DocumentTypeList = () => {
  return (
      <DataLoader uri={api.fetchCollection("type-definition")}>
        {data => renderList(data)}
      </DataLoader>
  );
};
export default DocumentTypeList;