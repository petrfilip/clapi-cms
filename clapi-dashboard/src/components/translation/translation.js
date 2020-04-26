import {useContext, useEffect, useState} from "preact/hooks";
import {LanguageContext} from "./language-context";



export default function useTranslation( langFile = null) {
  const language = useContext(LanguageContext);
  const [source, setSource] = useState(langFile);

  useEffect(() => {
    return () => {
      //todo load file by lang (language) and setSource
    };
  });

  function translate(translationKey) {
    const properties = Array.isArray(translationKey) ? translationKey : translationKey.split('.')
    return properties.reduce((prev, curr) => prev && prev[curr], source)
  }

  return translate;
}