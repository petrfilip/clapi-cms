import { h, React } from 'preact'
import { useState } from 'preact/hooks'
import DataManager from '../../data-loader/data-manager'
import * as api from './../../../api'
import Button from '../../elementary/button'
import Input from '../../elementary/input'

const DirectoryCreate = ({ callback, currentLocation }) => {
    const [inputValue, setInputValue] = useState('')

    function submitHandler(callback, currentLocation, newDirectory) {
        const data = {
            location: currentLocation,
            directory: newDirectory,
        }
        DataManager.saveOrUpdate(api.fetchMediaDirectory(), 'json', data, callback)
    }

    return (
        <div>
            <Input
                type={'text'}
                value={inputValue}
                onInput={(event) => {
                    setInputValue(event.target.value)
                }}
            />
            <Button
                disabled={!inputValue.length}
                onClick={(e) => {
                    e.preventDefault()
                    submitHandler(callback, currentLocation, inputValue)
                    setInputValue('')
                }}
            >
                Create directory
            </Button>
        </div>
    )
}
export default DirectoryCreate
