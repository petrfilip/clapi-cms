import {FilePreview} from "../file-manager/file-preview/file-preview";
import {React} from "preact";
import {InputWrapper} from "./input-wrapper";
import DataLoader from "../data-loader";
import * as api from "../../api";
import {useState} from "preact/hooks";
import DataManager from "../data-loader/data-manager";
import {route} from "preact-router";

function fields(file, setFile) {
  return (
      <>
        <FilePreview file={file}/>
        <InputWrapper label={"Description"}>
                  <textarea value={file.description} onInput={(e) => {
                    file.description = e.target.value
                    setFile(file);
                  }}/>
        </InputWrapper>
        <button onClick={(e) => {
          e.preventDefault()
          DataManager.saveOrUpdate(api.fetchMediaFile(), "json", file,
              (data) => {
                console.log(data);
                route("/media" + data.path);
              })

        }}>Update changes
        </button>
        <button onClick={(e) => {
          e.preventDefault()
          route("/media" + file.path);
        }}>Back
        </button>
        <a target={"_blank"} href={api.fetchDownloadMediaFile(file._id)}>Download</a>
      </>
  )
}

export const FileEditor = ({fileId}) => {
  const [file, setFile] = useState()

  return (
      <DataLoader uri={api.fetchMedia(fileId)}>
        {data => {
          setFile(data)
          return file && fields(file, setFile);
        }}
      </DataLoader>
  );

}