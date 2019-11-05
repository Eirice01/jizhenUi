
import {
    SET_BASE_DATA
} from './mutation-type.js'

export default {
    [SET_BASE_DATA](state, data) {
        if (data) {
            state.dataSourceList = data
        }
    },
    showEditorModal(state, data) {
        state.addEditorModal = data
    },
    showPreviewModal(state, data) {
        state.previewModal = data
    },
    getuserInfo(state, data) {
        state.userInfo = data
    },
    // getMeauTop(state, data) {
    //   state.isMeauTop = data
    // },
    setUserInfo(state, data) {
        state.setUser = data
    }
}
