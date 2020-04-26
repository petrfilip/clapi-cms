import {h, React} from 'preact';
import {useEffect, useState} from "preact/hooks";
import style from "./style.css";
import Loader from "../loader";
import {route} from 'preact-router';
import PropTypes from 'prop-types';
import * as api from './../../api'
import DataLoader from "../data-loader";

function renderList(data, onRowClick) {
  onRowClick = onRowClick || ((value) => route(
      `/edit/${value.collectionName}/${value._id}`))
  return <>
    <section className={style.listTable}>
      <header className={style.listRow}>
        <div className={style.listCol}>id</div>
        <div className={style.listCol}>uid</div>
        <div className={style.listCol}>Text</div>
      </header>
      {data.map((value, index) => {
            return (
                <div className={style.listRow}
                     onClick={() => onRowClick(value)}>
                  <div className={style.listCol}>{value._id}</div>
                  <div className={style.listCol}>{value._id}</div>
                  <div
                      className={style.listCol}>{value.metadata.collectionName}</div>
                </div>
            )
          }
      )}
    </section>

  </>;
}

const CollectionList = (props) => {
  //todo list over all
  return (
      <>
        <DataLoader uri={api.fetchCollection("novinky")}>
          {data => renderList(data, props.onRowClick)}
        </DataLoader>
      </>
  );
};

CollectionList.propType = {
  onRowClick: PropTypes.func
}
export default CollectionList;