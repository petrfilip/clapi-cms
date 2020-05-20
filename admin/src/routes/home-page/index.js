import { React } from 'preact'
import style from './style.css'
import CollectionList from '../../components/collection-list'
import { useContext } from 'preact/hooks'
import DocumentTypeList from '../../components/document-type-list'
import Button from '../../components/elementary/button'
import { LayoutContext } from '../../components/layout/layout-context'
import { useDocumentTitle } from '../../components/layout/window-title'

const HomePage = () => {
  useDocumentTitle('Entries')
  const { setActionSidebar } = useContext(LayoutContext)

  return (
    <div className={style.home}>
      <Button
        onClick={() => {
          setActionSidebar(<DocumentTypeList />)
        }}
      >
        Create new
      </Button>
      <CollectionList />
    </div>
  )
}

export default HomePage
