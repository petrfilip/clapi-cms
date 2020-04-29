import { React } from 'preact'
import Select from '../../elementary/select'

const Block = (props) => (
    <>
        <div>Block</div>
        <Select>
            <option>Gallery</option>
            <option>Text</option>
            <option>Quote</option>
            <option>Image</option>
        </Select>
    </>
)

export default Block
