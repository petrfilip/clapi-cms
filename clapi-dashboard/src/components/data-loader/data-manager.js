import {useContext, useEffect, useState} from "preact/hooks";
import * as api from "../../api";
import {AppModalContext} from "../modal/AppModalContextProvider";
import {FlashMessageContext} from "../flash-message-manager/flash-message-context";
import UserManager from "../user-manager";

export default class DataManager {

  /**
   *
   * @param uri
   * @param headers
   * @param data
   */
  static saveOrUpdate = (uri, contentType, dataToSave, callback) => {

    if (typeof (dataToSave) == "string" || dataToSave instanceof String) {
      dataToSave = JSON.parse(dataToSave);
    }

    const {addMessage} = useContext(FlashMessageContext)


    async function saveOrUpdate() {
      if (uri) {
        try {
          const request = contentType === "json" ?  jsonRequest : dataRequest
          const feedbackData = await request(uri);
          callback && callback(feedbackData);
          addMessage({type: "success", message: "Saved"})
          return (feedbackData);
        } catch (e) {

          console.log(e)
          alert(e);
        }
      }
    }

    async function jsonRequest(uri) {
      const headers = new Headers();
      headers.set("Content-Type", "application/json" )
      UserManager.getUserDetails() && headers.set("authorization", "Bearer "+ UserManager.getUserDetails().token )

      return await fetch(uri, {
        headers,
        // credentials: "include",
        method: dataToSave._id ? 'put' : 'post',
        body: JSON.stringify(dataToSave)
      })
      .then(function (response) {
        return response.json();
      });
    }

    async function dataRequest(uri) {
      const headers = new Headers();
      UserManager.getUserDetails() && headers.set("authorization", "Bearer "+ UserManager.getUserDetails().token )

      return await fetch(uri, {
        headers,
        method: dataToSave._id ? 'put' : 'post',
        body: dataToSave
      })
      .then(function (response) {
        return response.json();
      });
    }



    saveOrUpdate();
  }

  /**
   * load data
   * @param uri
   * @param action
   * @returns {[unknown, boolean, unknown]}
   */
  static load = (uri, action) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    //
    // function loadData() {
    //   setLoading(true);
    //   fetch(uri)
    //   .then(function (response) {
    //     if (!response.ok) {
    //       throw Error(response.statusText);
    //     }
    //     return response;
    //   }).then(function (response) {
    //     return response.json();
    //   }).then(function (json) {
    //     setData(json);
    //     return json;
    //   }).catch(function(error) {
    //     console.log('Looks like there was a problem: \n', error);
    //     setError(error);
    //     setLoading(false);
    //     return error;
    //   });
    // }

    async function loadData() {
      if (uri) {
        try {
          setLoading(true);
          const processAction = action || defaultAction;
          const loadedData = await processAction(uri);
          setData(loadedData);
        } catch (e) {
          setError(e);
        } finally {
          setLoading(false);
        }
      }
    }

    async function defaultAction(uri) {
      const headers = new Headers();
      UserManager.getUserDetails() && headers.set("authorization", "Bearer "+ UserManager.getUserDetails().token )
      return await fetch(uri, {headers})
      .then(function (response) {
        return response.json();
      })
    }

    useEffect(() => {
      loadData();
    }, [uri, action]);
    return [data, loading, error];
  }
}