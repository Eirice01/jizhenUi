let tools = {}
// 将 unix 时间戳转换为 2033-12-02
tools.unix_change = function (value) {
    if (value !== 0 && !!value) {
        let d = new Date(parseInt(value) * 1000)
        return (d.getFullYear()) + '-' +
          (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) +
          '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate())
    } else {
        return ''
    }
}
// currentTime_change(new Date)----> 2017-10-24
tools.currentTime_change = function (item) {
    if (item) {
        const a = new Date(item)
        const time = (a.getFullYear()) +
          '-' + (a.getMonth() + 1 > 9 ? a.getMonth() + 1 : '0' + (a.getMonth() + 1)) +
          '-' + (a.getDate() > 9 ? a.getDate() : '0' + a.getDate()) +
          ' ' + (a.getHours() > 9 ? a.getHours() : '0' + a.getHours()) +
          ':' + (a.getMinutes() > 9 ? a.getMinutes() : '0' + a.getMinutes()) +
          ':' + (a.getSeconds() > 9 ? a.getSeconds() : '0' + a.getSeconds())
        return time
    } else {
        return ''
    }
}
export {
    tools
}
