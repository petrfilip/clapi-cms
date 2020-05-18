import style from '../file-list/style.css'
import downloadIcon from '../file-list/download.svg'
import styled from 'styled-components'
import React from 'preact/compat'

const FileContextMenu = ({ file, config, visible }) => {
  return (
    visible && (
      <Menu onClick={(e) => e.stopPropagation()}>
        {config.map((item) => (
          <MenuItem src={item.icon} alt={item.alt} onClick={(e) => item.onClick(file)} />
        ))}
      </Menu>
    )
  )
}

const Menu = styled.div`
  //margin-top: -50px;
  height: 50px;
  width: 100%;
  cursor: default;
  background: rgba(0, 0, 0, 0.25);
  z-index: 2;
  display: flex;
  justify-content: space-between;

  opacity: 0;
  transition: opacity 0.3s;
  :hover {
    opacity: 1;
  }
`
const MenuItem = styled.img`
  z-index: 3;
  margin: 5px;
  cursor: pointer;
  width: 20px;
  display: block;
  padding: 5px;
`

export default FileContextMenu
