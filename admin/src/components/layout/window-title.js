import { useEffect } from 'preact/hooks'

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = [title, 'CLAPI CMS'].join(' | ')
  }, [title])
}
