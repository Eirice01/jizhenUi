var debug = true;
// var debug = false;
var contextPath = ''
var DEBUG;
DEBUG = {
    isDebug: debug,
    /** ************************************图片新闻start**********************************************/
    querycuration: contextPath + '/api/curationtable/querycuration.json'
    /** ************************************图片新闻end**********************************************/
};
var RELEASE = {
    isDebug: debug
};
var URL = debug ? DEBUG : RELEASE;

export {
    URL, debug
}
