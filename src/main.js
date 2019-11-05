
import vueToTop from 'vue-totop'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap"
import '@/assets/font/style.css'
import './theme/app.less'
import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store'
import Meta from 'vue-meta'
import router from './router'
import iview from 'iview'
import $ from 'jquery'
import promise from 'es6-promise'
import 'ie-placeholder'
require('@babel/polyfill')
Vue.use(Meta)
Vue.use(iview)
Vue.use(vueToTop)
promise.polyfill()
Vue.config.productionTip = false
//清除console
if (!window.console) {
    window.console = {
        log: '',
        dir: '',
        warn: ''
    }
}
// 判断当前浏览器是不不是IE,ie下做兼容处理
if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    if (!('calssList' in document.documentElement)) {
        Object.defineProperty(HTMLElement.prototype, 'classList', {
            get: function () {
                var _this = this;
                function update (fn) {
                    return function (value) {
                        var classes = _this.className.split(/\s+/g);
                        var index = classes.indexOf(value)
                        fn(classes, index, value);
                        _this.className = classes.join(' ');
                    };
                }
                return {
                    add: update(function (classes, index, value) {
                        if (!~index) classes.push(value);
                    }),
                    remove: update(function (classes, index) {
                        if (~index) classes.splice(index, 1)
                    }),
                    toggle: update(function (classes, index, value) {
                        if (~index) { classes.splice(index, 1); } else { classes.push(value) }
                    }),
                    contains: function (value) {
                        return !!~_this.className.split(/\s+/g).indexOf(value)
                    },
                    item: function (i) {
                        return _this.className.split(/\s+/g)[i] || null;
                    }
                }
            }
        })
    }
    var isIE = function () {
        return (window.navigator.userAgent.indexOf('MSIE') >= 1);
    }
    // 修复ie10及其以下版本不支持dateset属性的问题，兼容transfer-daom.js中使用了dateset的问题
    if (isIE() && window.HTMLElement) {
        if (Object.getOwnPropertyNames(HTMLElement.prototype).indexOf('dataset') === -1) {
            Object.defineProperty(HTMLElement.prototype, 'dataset', {
                get: function () {
                    var attributes = this.attributes;
                    var name = [];
                    var value = [];
                    var obj = {};
                    for (var i = 0; i < attributes.length; i++) {
                        if (attributes[i].nodeName.slice(0, 5) == 'data-') {
                            name.push(attributes[i].nodeName.slice(5));
                            value.push(attributes[i].nodeValue)
                        }
                    }
                    for (var j = 0; j < name.length; j++) {
                        obj[name[j]] = value[j]
                    }
                    return obj
                }

            })
        }
    }
    // window.requestAnimationFrame 多浏览器兼容问题补丁
    (function () {
        var lastTime = 0;
        var wendors = ['ms', 'moz', 'webkit', 'o'];
        for (var x = 0; x < wendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[wendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[wendors[x] + 'CancelAnimationFrame'] || window[wendors[x] + 'CancelRequestAnimationFrame'];
        }
        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function (callback, element) {
                var currtime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currtime - lastTime));
                var id = window.setTimeout(function () {
                    callback(currtime + timeToCall)
                }, timeToCall);
                lastTime = currtime + timeToCall;
                return id
            }
        }
        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function (id) {
                clearTimeout(id)
            }
        }
    }())
}

// 清除console
window.console = window.console || (function() {
    var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile = c.clear = c.exception = c.trace = c.assert = function() {};
    return c
})();

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
