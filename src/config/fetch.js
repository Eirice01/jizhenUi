import { redirectUrl } from './process_request_conf'

export default async(url = '', data = {}, type = 'GET', headerConfig = {}, method = 'fetch') => {
    type = type.toUpperCase()
    url = `/api/${url}`

    if (type === 'GET') {
        let dataStr = '' // 数据拼接字符串
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&'
        })

        if (dataStr !== '') {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
            url = url + '?' + dataStr
        }
    }

    if (window.fetch && method === 'fetch') {
        let requestConfig = {
            credentials: 'include',
            method: type,
            headers: {
                'Accept': 'application/json',
                'Content-Type': headerConfig['contentType'] ? headerConfig['contentType'] : 'application/json'
            },
            mode: 'no-cors',
            cache: 'no-cache'
        }

        if (type === 'POST' || type === 'DELETE') {
            requestConfig.mode = 'cors'
            Object.defineProperty(requestConfig, 'body', { value: JSON.stringify(data) })
        }

        try {
            let response = null
            response = await fetch(url, requestConfig)
            if (response.type == 'opaque' || response.redirected) return redirectUrl()
            const responseJson = await response.json()
            return responseJson
        } catch (error) {
            throw new Error(error)
        }
    } else {
        return new Promise((resolve, reject) => {
            let requestObj
            if (window.XMLHttpRequest) {
                requestObj = new XMLHttpRequest()
            } else if (window.ActiveXObject) {
                requestObj = new ActiveXObject()
            }

            let sendData = ''
            if (type === 'POST') { sendData = JSON.stringify(data) }

            let auth = sessionStorage.getItem('token') || ''
            requestObj.open(type, url, true)
            requestObj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
            requestObj.setRequestHeader('Authorization', auth)
            requestObj.send(sendData)

            requestObj.onreadystatechange = () => {
                if (requestObj.readyState === 4) {
                    if (requestObj.status === 200) {
                        let obj = requestObj.response
                        if (typeof obj !== 'object') {
                            obj = JSON.parse(obj)
                        }
                        resolve(obj) // 更改status pending -> fulflled(resolved)
                    } else {
                        reject(requestObj) // 更改status pending -> rejected
                    }
                }
            }
        })
    }
}
