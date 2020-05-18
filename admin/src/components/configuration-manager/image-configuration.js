import React from 'preact/compat'
import styled from 'styled-components'
import Table from '../table'
import Button from '../elementary/button'
import Input from '../elementary/input'
import Select from '../elementary/select'
import DataManager from '../data-loader/data-manager'
import * as api from '../../api'
import DataLoader from '../data-loader'

const sizesOptions = [
  { label: 'Contain', value: 'contain' },
  { label: 'Max', value: 'max' },
  { label: 'Fill', value: 'fill' },
  { label: 'Stretch', value: 'stretch' },
  { label: 'Crop', value: 'crop' },
]

const imageEncodingOptions = [
  { label: 'jpg', value: 'jpg' },
  { label: 'Progressive jpg', value: 'pjpg' },
  { label: 'png', value: 'png' },
  { label: 'gif', value: 'gif' },
  { label: 'webp', value: 'webp' },
]

const onSave = (data, newProfiles) => {
  const newData = Object.assign({}, data)
  newData.profiles = newProfiles
  newData.configName = 'imageConfiguration'
  DataManager.saveOrUpdate(api.fetchConfiguration(), 'json', newData, (data) => {
    console.log('SUCCESS')
  }),
    (data) => {
      alert('ERROR')
    }
}

const ImageConfiguration = (props) => {
  const columns = [
    {
      key: 'name',
      title: 'Profile',
      content: ({ name, onInput }) => <Input value={name} onInput={onInput} />,
    },
    {
      key: 'quality',
      title: 'Quality',
      content: ({ quality, onInput, format }) => <Input value={quality} onInput={onInput} />,
    },
    {
      key: 'width',
      title: 'Width',
      content: ({ width, onInput }) => <Input value={width} onInput={onInput} />,
    },
    { key: 'height', title: 'Height', content: ({ height, onInput }) => <Input value={height} onInput={onInput} /> },
    { key: 'fit', title: 'Fit', content: ({ onInput }) => <Select options={imageEncodingOptions} onInput={onInput} /> },
    {
      key: 'format',
      title: 'Image Format',
      content: ({ onInput }) => <Select options={sizesOptions} onInput={onInput} />,
    },
    {
      key: '_id',
      title: 'Delete',
      content: ({ removeRow }) => (
        <Button
          onClick={(e) => {
            e.stopPropagation()
            removeRow()
          }}
        >
          Delete
        </Button>
      ),
    },
  ]

  return (
    <div>
      <DataLoader uri={api.getConfiguration('imageConfiguration')}>
        {(data) => {
          return <Table columns={columns} rows={data.profiles} onSave={(newData) => onSave(data, newData)} />
        }}
      </DataLoader>
    </div>
  )
}

const Form = styled.form`
  width: 400px;
  background: white;
  padding: 4px;
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.gray};
  margin: 5px auto;
`

export default ImageConfiguration
