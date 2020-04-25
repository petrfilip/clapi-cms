import {h, React} from 'preact';
import {useState} from "preact/hooks";
import DataManager from "../../data-loader/data-manager";
import * as api from "./../../../api"

function submitHandler(callback, currentLocation, newDirectory) {
  // newDirectory && alert("Empty");
  const data = {
    action: "create-directory",
    location: currentLocation,
    directory: newDirectory
  }
  DataManager.saveOrUpdate(api.fetchMediaDirectory(), "json" , data, callback);

}

const DirectoryCreate = ({callback, currentLocation}) => {
  const [inputValue, setInputValue] = useState("");

  return (
      <div>
        <input type={"text"}
               value={inputValue}
               onInput={((event) => {
                 setInputValue(event.target.value)
               })}
        />
        <input type="submit"
               disabled={!inputValue.length}
               onClick={(e) => {
          e.preventDefault();
          submitHandler(callback, currentLocation, inputValue);
          setInputValue("");
        }}>
          Create directory
        </input>
      </div>
  );
};
export default DirectoryCreate;
