import {
    CHANGE_LOGIN_STATUS,
    SET_TOKEN,
    SET_USERINFO,
    SET_AUTH,
    SET_ROLES,
    CLEAR_AUTH,
    SET_ASIDE_MENU
} from './mutation-type'
import { setStore } from '@/config/mUtils'

const user = {
    state: {
        isLogin: false,
        roles: [],
        token: '',
        userInfo: {},
        auth: new Map(),
        // wsuri: window.__private__.wsUrl,
        noSubAsideMenu: '1',
        permissionList: []
    },

    mutations: {
        CHANGE_LOGIN_STATUS: (state, bool) => {
            state.isLogin = bool;
        },

        SET_TOKEN: (state, token) => {
            setStore('token', token);
            state.token = token;
        },

        SET_USERINFO: (state, data) => {
            setStore('userInfo', data);
            state.userInfo = data;
        },

        SET_AUTH: (state, data) => {
            for (let i = 0; i < data.length; i++) {
                let key = data[i];
                let val = '';
                state.auth.set(key, val);
            }
        },

        SET_ROLES: (state, roles) => {
            setStore('authList', roles);
            state.roles = roles;
        },

        CLEAR_AUTH: (state) => {
            state.auth.forEach((val, key, map) => {
                map.delete(key)
            });
        },
        UPDATE_PERMISSIONLIST: (state, payload) => {
            state.permissionList = payload;
        }
    },
    actions: {
        GET_PERMISSIONLIST: async ({ state, commit }) => {
            if (state.permissionList.length) return;
            const requestConfig = {
                credentials: 'include',
                method: 'GET',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                mode: 'no-cors',
                cache: 'no-cache'
            }
            let res = await fetch('api/jzweb/login/getCurrentInfo', requestConfig);
            let userInfo = await res.json();
            commit('UPDATE_PERMISSIONLIST', userInfo.data.ocodeList)
        }
    }
}

export default user
