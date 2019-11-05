import { Message } from 'iview'
export const process_error = (error) => {
    let message = error.message
    if (message) {
        let code = error.statusCode
        console.log(code)
        switch (code) {
        case 300:
            Message.error('登陆会话超时,请重新登录!')
            window.location.href = '/'
            return
        case 302:
            Message.error('CAS服务未登录,请重新登录!')
            redirectUrl()
            return
        case 504:
            Message.error('服务器未连接,请重新登录!')
            window.location.href = '/'
            return
        case 401:
            Message.error('服务器未连接,请重新登录!')
            window.location.href = '#/login'
            return
        default:
            let msg = message || '请求异常'
            Message.error(msg)
        }
    }
}
export const redirectUrl = () => {
    let redirectUrl = `http://${window.location.hostname}/login?service=${window.location.href}`
    window.location.href = redirectUrl
}
