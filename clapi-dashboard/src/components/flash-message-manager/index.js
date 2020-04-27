import {React} from "preact";
import {useContext} from "preact/hooks";
import {FlashMessageContext} from "./flash-message-context";
import style from "./style.css"


const FlashMessages = (props) => {

  const {removeMessage} = useContext(FlashMessageContext)

  return props.messages.length > 0 && <div>
    <div className={style.messageWrapper}>{
      props.messages.map((item, index) =>
          <div onClick={() => removeMessage(index)} className={style[item.type]}>
            <span className={style.closebtn}>&times;</span>
            {item.message}
          </div>)
    }</div>
  </div>;

};

export default FlashMessages;
