import { useContext, useEffect, useState } from 'preact/hooks'
import * as api from '../../api'
import { AppModalContext } from '../modal/AppModalContextProvider'
import { FlashMessageContext } from '../flash-message-manager/flash-message-context'
import UserManager from '../user-manager'
import queryString from 'querystring'

export default class DataManager {
    /**
     *
     * @param uri
     * @param headers
     * @param data
     */
    static saveOrUpdate = (uri, contentType, dataToSave, onSuccessCallback, onFailCallback) => {
        if (typeof dataToSave == 'string' || dataToSave instanceof String) {
            dataToSave = JSON.parse(dataToSave)
        }

        async function saveOrUpdate() {
            if (uri) {
                try {
                    const request = contentType === 'json' ? jsonRequest : dataRequest
                    const feedbackData = await request(uri)
                    onSuccessCallback && onSuccessCallback(feedbackData)
                    return feedbackData
                } catch (e) {
                    const feedbackData = await e
                    console.log(feedbackData)
                    ;(onFailCallback && onFailCallback(feedbackData)) || alert(JSON.stringify(feedbackData))
                }
            }
        }

        async function jsonRequest(uri) {
            const headers = new Headers()
            headers.set('Content-Type', 'application/json')
            UserManager.getUserDetails() && headers.set('authorization', 'Bearer ' + UserManager.getUserDetails().token)

            return await fetch(uri, {
                headers,
                // credentials: "include",
                method: dataToSave._id ? 'put' : 'post',
                body: JSON.stringify(dataToSave),
            }).then((response) => {
                if (!response.ok) {
                    throw response.json()
                }
                return response.json()
            })
        }

        async function dataRequest(uri) {
            const headers = new Headers()
            UserManager.getUserDetails() && headers.set('authorization', 'Bearer ' + UserManager.getUserDetails().token)

            return await fetch(uri, {
                headers,
                method: dataToSave._id ? 'put' : 'post',
                body: dataToSave,
            }).then(function (response) {
                return response.json()
            })
        }

        saveOrUpdate()
    }

    /**
     * load data
     */
    static load = (uri, params) => {
        const [loading, setLoading] = useState(false)
        const [error, setError] = useState(null)
        const [data, setData] = useState(null)

        async function loadData() {
            if (uri) {
                try {
                    setLoading(true)
                    const loadedData = await DataManager.fetchData(uri, params)
                    setData(loadedData)
                } catch (e) {
                    setError(e)
                } finally {
                    setLoading(false)
                }
            }
        }

        useEffect(() => {
            loadData()
        }, [uri, params])
        return [data, loading, error, setData, setLoading, setError]
    }

    static fetchData = async (uri, params) => {
        const headers = new Headers()
        UserManager.getUserDetails() && headers.set('authorization', 'Bearer ' + UserManager.getUserDetails().token)

        params = {}
        const convertedQueryParams = (params && queryString.stringify(params)) || ''

        //todo fix it
        return await fetch(uri + '&' + convertedQueryParams, { headers }).then(function (response) {
            return response.json()
        })
    }

    static fetchBinaryData = async (uri, params) => {
        const headers = new Headers()
        UserManager.getUserDetails() && headers.set('authorization', 'Bearer ' + UserManager.getUserDetails().token)

        params = {}
        const convertedQueryParams = (params && queryString.stringify(params)) || ''

        //todo fix it
        fetch(uri + '&' + convertedQueryParams, { headers })
            .then((response) => {
                return response.blob().then((blob) => {
                    return {
                        filename: response.headers.get('X-Filename'),
                        raw: blob,
                    }
                })
            })
            .then((data) => {
                const url = window.URL.createObjectURL(new Blob([data.raw]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', data.filename)
                document.body.appendChild(link)
                link.click()
                link.parentNode.removeChild(link)
            })
    }
}
