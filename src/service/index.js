import fetch from '@/config/fetch'

/***************************************************************************/

/*
 *   账号密码登录
 */
export const accountLogin = (username, password) => {
    return fetch(`jzweb/login/loginUser?username=${username}&password=${password}`, {}, 'POST')
}

/**
 *   获取用户信息
 */
export const getCurrentInfo = () => {
    return fetch('jzweb/login/getCurrentInfo')
}
/**
 *   获取用户退出登录
 */
export const userLoginOut = () => {
    return fetch('jzweb/login/logout')
}
/**
 *   获取部门管理机构树
 */
export const departTree = () => {
    return fetch('jzweb/depart/departTree')
}
/**
 *  获取子机构
 */
export const getDeptChildren = (departId) => {
    return fetch('jzweb/depart/departByPid/' + departId)
}
export const getDept = () => {
    return fetch('jzweb/flow/departAllByCascader')
}

/**
 *  软件管理开始
 */

/**
 *  获取软件信息总表
 */

export const querySof = (sendData) => {
    return fetch('jzweb/softDownload/query', {
        name: sendData.name,
        type: sendData.type,
        page: sendData.current,
        size: sendData.size
    })
}

/**
 *  获取新增软件下载选择
 */
export const getSofDownload = (filename) => {
    return fetch(`jzweb/softDownload/downloadList?filename=${filename}`, {}, 'POST')
}

/**
 *  获取新增软件保存
 */
export const softDownload = (sendData) => {
    return fetch('/jzweb/softDownload/save', {
        fileName: sendData.fileName,
        filePath: sendData.filePath,
        fileSize: sendData.fileSize,
        name: sendData.name,
        type: sendData.type
    }, 'POST')
}
/**
 *  新增软件列表
 */
export const getTypeDiction = () => {
    return fetch('jzweb/softDownload/getTypeDiction', {}, 'POST')
}
/**
 *  删除软件
 */
export const delFsofDef = (id) => {
    return fetch(`jzweb/softDownload/delete?id=${id}`, {}, 'DELETE')
}
/**
 *  软件名称校验
 */
export const checkSof = (filename) => {
    return fetch(`jzweb/softDownload/checkFileName?filename=${filename}`, {}, 'POST')
}

/**
 *  软件管理结束
 */

/**
 *  应用平台开始
 */

/**
 *  获取应用平台分页数据
 */
export const appPageData = (sendData) => {
    return fetch('jzweb/platform/pagePlatform', {
        sort: sendData.sort,
        page: sendData.current,
        size: sendData.size
    })
}
/**
 *  获取应用平台分页搜索
 */
export const appSearch = (sendData) => {
    return fetch('jzweb/platform/pagePlatform', {
        des1: sendData.des1,
        name: sendData.name,
        sort: sendData.sort,
        page: sendData.current,
        size: sendData.size
    })
}
/**
 *  获取应用平台新增
 */
export const upDtaAppPage = (sendData) => {
    return fetch('jzweb/platform/addEditPlatform', {
        des: sendData.des,
        images: sendData.images,
        name: sendData.name,
        url: sendData.url
    }, 'POST')
}
/**
 *  获取应用平台修改
 */
export const upAppPage = (sendData) => {
    return fetch('jzweb/platform/addEditPlatform', {
        id: sendData.id,
        des: sendData.des,
        images: sendData.images,
        name: sendData.name,
        url: sendData.url
    }, 'POST')
}
/**
 *  获取应用平台链接交换位置
 */
export const changeIds = (des, id1) => {
    return fetch(`jzweb/platform/sortAppPlatform?des=${des}&id1=${id1}`, {}, 'POST')
}

/**
 *  获取应用平台下拉列表
 */
export const appSelectData = () => {
    return fetch('jzweb/platform/getAppPlatformDiction', {})
}

/**
 *  获取应用平台删除
 */
export const deleteApptData = (id) => {
    return fetch(`jzweb/platform/delPlatform?id=${id}`, {}, 'POST')
}

/**
 *  应用平台结束
 */

/**
 *外部导航开始
 */
/**
 *  获取外部导航分页数据
 */
export const outLinkPage = (sendData) => {
    return fetch('jzweb/links/pageLinks', {
        type1: sendData.type1,
        name: sendData.name,
        sort: sendData.sort,
        page: sendData.current,
        size: sendData.size
    })
}

/**
 *  获取外部导航下拉列表
 */
export const outLinkList = () => {
    return fetch('jzweb/links/getLinksDiction', {})
}

/**
 *  获取外部导航表格删除
 */
export const deleteLink = (id) => {
    return fetch(`jzweb/links/delLinks?id=${id}`, {}, 'POST')
}

/**
 *  获取外部导航新增
 */
export const addLink = (sendData) => {
    return fetch('jzweb/links/addEditLinks', {
        type: sendData.type,
        name: sendData.name,
        url: sendData.url
    }, 'POST')
}

/**
 *  获取外部导航编辑
 */
export const updateLink = (sendData) => {
    return fetch('jzweb/links/addEditLinks', {
        id: sendData.id,
        type: sendData.type,
        name: sendData.name,
        url: sendData.url
    }, 'POST')
}

/**
 *  获取外部导航链接交换位置
 */
export const linkCahngeIds = (des, id1) => {
    return fetch(`jzweb/links/sortLinks?des=${des}&id1=${id1}`, {}, 'POST')
}

/**
 *  获取外部导航分页搜索
 */
export const linkSearch = (sendData) => {
    return fetch('jzweb/links/pageLinks', {
        type1: sendData.type1,
        name: sendData.name,
        sort: sendData.sort,
        page: sendData.current,
        size: sendData.size
    })
}
/**
 *外部导航结束
 */

/**
 * 内容维护开始
 */
/**
 *  获取内容维护下拉数据
 */
export const menuSelect = () => {
    return fetch('jzweb/word/getallDiction', {})
}

/**
 *  获取内容维护分页
 */
export const menuPage = (sendData) => {
    return fetch('jzweb/word/pageWord', {
        type1: sendData.type1,
        title: sendData.title,
        top: sendData.top,
        sort: sendData.sort,
        page: sendData.current,
        size: sendData.size
    })
}

/**
 *  内容新增
 */
export const addMenu = (sendData) => {
    return fetch('jzweb/word/addEditWord', {
        contents: sendData.contents,
        files: sendData.files,
        publishflag: sendData.publishflag,
        title: sendData.title,
        type: sendData.type,
        top: sendData.top
    }, 'POST')
}

/**
 *  内容编辑
 */
export const updateMenu = (sendData) => {
    return fetch('jzweb/word/addEditWord', {
        contents: sendData.contents,
        files: sendData.files,
        publishflag: sendData.publishflag,
        id: sendData.id,
        top: sendData.top,
        title: sendData.title,
        type: sendData.type
    }, 'POST')
}
/**
 *  内容发布状态更改
 */

export const changeStatus = (sendData) => {
    return fetch('jzweb/word/publishWord', {
        publishflag: sendData.publishflag,
        id: sendData.id,
        top:sendData.top,
    }, 'POST')
}
/**
 *  内容置顶状态更改
 */

export const changeTop = (sendData) => {
    return fetch('jzweb/word/topWord', {
        top: sendData.top,
        id: sendData.id
    }, 'POST')
}
/**
 *  内容表格删除
 */
export const deleteMenu = (id) => {
    return fetch(`jzweb/word/delWord?id=${id}`, {}, 'POST')
}
/**
 *  新增上传
 */
export const deleteFile = (fileBs) => {
    return fetch(`jzweb/word/delFile?fileBs=${fileBs}`, {}, 'DELETE')
}
/**
 *  获取内容列表搜索
 */
export const menuSearch = (sendData) => {
    return fetch('jzweb/word/pageWord', {
        sort: sendData.sort,
        top: sendData.top,
        type1: sendData.type1,
        title: sendData.title,
        page: sendData.current,
        size: sendData.size
    })
}
/**
 * 内容维护结束
 */

/**
 * 详情页面附件下载
 */

export const dowMyFile = (fileBs,fileName) => {
   return fetch(`jzweb/word/fileDownload?fileBs=${fileBs}&fileName=${fileName}`, {},)
}

export const getSystemNotice = (msgNum) => {
    return fetch('sysNotices', { pageSize: msgNum })
}

/**
 *  首页审核按钮操作
 */
export const appDocApplyOp = (data) => {
    return fetch(`flows/flowApprUsers/${data.urlData}`, {
        flowRunId: data.params.flowRunId,
        bizType: data.params.bizType
    })
}

/**
 *  查询审批列表数据
 */
export const queryApprovalListData = (msgNum) => {
    return fetch('appDocs/appr')
}

/**
 *  首页查询饼图数据
 */
export const queryIndexPieGraph = (msgNum) => {
    return fetch('docWorkCount')
}

/**
 *  首页查柱状图数据
 */
export const queryIndexBarGraph = (msgNum) => {
    return fetch('weekCaseCount')
}

/**
 *  首页代办查看列表数据
 */
export const getIndexAgentInquire = (msgNum) => {
    return fetch('queryTables/task')
}

/**
 * fanhua流程相关请求接口开始
 */

/**
 *  获取所有定义流程集合
 */
export const findFlowList = () => {
    return fetch('village/flow/flowDefList', { page: 1, size: 100, sort: 'createTime,desc' })
}

/**
 *  获取所有使用流程集合
 */
export const flowDefListUse = (sendData) => {
    return fetch('village/flow/flowDefListUse', {
        page: sendData.page.number,
        size: sendData.page.size,
        sort: sendData.page.sort,
        fname: sendData.fname
    })
}

/**
 *  获取所有流程实体集合
 */
export const flowInsList = (sendData) => {
    return fetch('village/flow/flowInsList', {
        page: sendData.page.number,
        size: sendData.page.size,
        sort: sendData.page.sort,
        fname: sendData.fname
    })
}

/**
 *  根据流程实体获取所有审批历史集合
 */
export const spHistoryList = (insId) => {
    return fetch('village/flow/spHistoryList/' + insId)
}

/**
 *  获取流程节点集合
 */
export const findNodeList = (flowId) => {
    return fetch('village/flow/flowNodeList/' + flowId, {
        page: 1,
        size: 100,
        sort: 'orders'
    })
}

/**
 *  保存流程
 */
export const saveFlowDef = (flowDef) => {
    return fetch('village/flow/flowDefAddOrUpd', flowDef, 'POST')
}

/**
 *  保存流程节点
 */
export const saveFlowNode = (flowId, flowNode) => {
    return fetch('village/flow/flowNodeAddOrUpd/' + flowId, flowNode, 'POST')
}

/**
 *  查看流程
 */
export const getFlowDef = (flowId) => {
    return fetch('village/flow/flowDefView/' + flowId)
}

/**
 *  查看流程节点
 */
export const getFlowNode = (nodeId) => {
    return fetch('village/flow/flowNodeView/' + nodeId)
}

/**
 *  删除流程
 */
export const delFlowDef = (flowId) => {
    return fetch('village/flow/flowDefDel/' + flowId, '', 'DELETE')
}

/**
 *  删除流程节点
 */
export const delNode = (nodeId) => {
    return fetch('village/flow/flowNodeDel/' + nodeId, '', 'DELETE')
}

/**
 *  获取机构列表（级联选择数据）
 */

/**
 *  获取角色列表（穿梭框数据）
 */
export const getRole = () => {
    return fetch('village/flow/dutyAllByTransfer')
}

/**
 *  获取用户列表（穿梭框数据）
 */
export const getUser = () => {
    return fetch('village/flow/userAllByTransfer')
}

/**
 *  获取子机构
 */

/**
 *  修改流程节点序号
 */
export const updNodeOrders = (type, deptId) => {
    return fetch('village/flow/updNodeOrders/' + type + '/' + deptId, '', 'POST')
}

/**
 * fanhua流程相关请求接口结束
 */

/**
 * zlm用户接口begin
 */

/**
 *  查询所有用户（分页）
 */
export const userAll = (sendData) => {
    return fetch('jzweb/userinfo/queryUserinfo', {
        page: sendData.page.pageNumber,
        size: sendData.page.size,
        sort: sendData.page.sort,
        username: sendData.username,
        fullname: sendData.fullname,
        [`depart.id`]: sendData.depart.id,
        [`duty.id`]: sendData.duty.id,
        policeNum: sendData.policeNum,
        able: sendData.able,
        delFlag: sendData.del
    })
}

/**
 * 级联查询机构
 */
export const departAllByCascader = () => {
    return fetch('village/flow/departAllByCascader')
}
/**
 * 级联查询子机构
 */
/**
 * 级联查询机构
 */
export const departByCascader = () => {
    return fetch('jzweb/depart/departByCascader')
}
/**
 * 级联查询子机构
 */
export const departByPid = (departId) => {
    return fetch('jzweb/depart/departByPid/' + departId)
}

/**
 *  用户保存
 */
export const saveUser = (sendData) => {
    return fetch('jzweb/userinfo/save', sendData, 'POST')
}

/**
 *  用户删除
 */
export const delUser = (id) => {
    return fetch('jzweb/userinfo/delete/' + id, '', 'DELETE')
}

/**
 * 恢复已删除用户
 */
export const recoverUser = (id) => {
    return fetch('village/userinfo/recover/' + id, '', 'GET')
}

/**
 *  更改用户状态（启用/禁用）
 */
export const ableSwitch = (id) => {
    return fetch('village/userinfo/ableSwitch/' + id)
}

/**
 * 获得所有权限组（不分页）
 */
export const operGroupAllList = () => {
    return fetch('village/operate/operGroupAllList')
}

/**
 * zlm用户接口end
 */

/**
 * zlm职位接口begin
 */
/**
 *  查询所有职位(分页)
 */
export const dutyAll = (sendData) => {
    return fetch('village/duty/allDuty', {
        page: sendData.page.pageNumber,
        size: sendData.page.size,
        sort: sendData.page.sort,
        delFlag: sendData.del !== '0',
        dlevel: sendData.dlevel,
        dutyname: sendData.dutyname
    })
}

// 注册的职位
export const outdutyAll = (sendData) => {
    return fetch('out/ufi/dutyAll')
}
// 注册的职位
export const userRegist = (sendData) => {
    return fetch('out/ufi/userRegist', sendData, 'POST')
}

/**
 *  查询所有职位
 */
export const getAllDuty = () => {
    //console.log('查询所有职位')
    return fetch('village/duty/dutyAll')
}

/**
 *  保存/更新职位信息
 */
export const saveDuty = (sendData) => {
    return fetch('village/duty/save', sendData, 'POST')
}
/**
 *  删除职位信息
 */
export const delDuty = (id) => {
    return fetch('village/duty/delete/' + id)
}
/**
 *  恢复职位信息
 */
export const recoverDuty = (id) => {
    return fetch('village/duty/recover/' + id)
}
/**
 * zlm职位接口end
 */

/**
 * zlm机构接口begin
 */
/**
 *  机构列表查询接口（分页）
 */
export const getAllDepart = (sendData, pid, searchInfo) => {
    return fetch('jzweb/depart/getAllDepart', {
        page: sendData.page.pageNumber,
        size: sendData.page.size,
        sort: sendData.page.sort,
        dname: searchInfo.dname,
        ddesc: searchInfo.ddesc,
        [`parent.id`]: pid,
        delFlag: sendData.del !== '0'
    })
};

// /**
//  *  机构树
//  */
// export const departTree = () => {
//     // return fetch('village/depart/departTree', {})
//     return fetch('./api/management/treeData', {})
// };

export const outDepartTree = () => {
    return fetch('out/ufi/departTree', {})
};

/**
 *  保存/更新机构信息
 */
export const saveDepart = (sendData, pid) => {
    return fetch('jzweb/depart/save', sendData, 'POST')
}

/**
 *  删除机构信息
 */

export const delDepart = (id) => {
    return fetch('jzweb/depart/delete/' + id)
}
/**
 *  恢复机构信息
 */
export const recoverDepart = (id) => {
    return fetch('village/depart/recover/' + id)
}
/**
 * zlm机构接口end
 */

/**
 *  获取操作列表
 */
export const getOperList = (sendData) => {
    return fetch('village/operate/operaterList', {
        page: sendData.page.pageNumber,
        size: sendData.page.size,
        sort: sendData.page.sort,
        oname: sendData.oname,
        typeName: sendData.typeName,
        ocode: sendData.ocode
    })
}

/**
 *  新增、修改操作
 */
export const saveOperate = (sendData) => {
    return fetch(`village/operate/saveOperate`, sendData, 'POST')
}
/**
 *  删除操作
 */
export const deleteOperate = (id) => {
    return fetch(`village/operate/deleteOperate/${id}`, '', 'DELETE')
}

/**
 *  获取权限列表
 */
export const getOperGroupList = (sendData) => {
    return fetch('village/operate/operGroupList', {
        page: sendData.page.number,
        size: sendData.page.size,
        sort: sendData.page.sort,
        gname: sendData.operGroup.gname
    })
}

/**
 *  新增、修改权限
 */
export const saveOperGroup = (sendData, oids) => {
    return fetch('village/operate/saveOperGroup', sendData, 'POST')
}

/**
 * 获取操作组集合
 */
export const operaterByGroupList = () => {
    return fetch('village/operate/operaterByGroupList')
}

/**
 * 获取操作组名称集合
 */
export const operTypenameList = () => {
    return fetch('village/operate/operTypenameList')
}

/**
 * 获取日志列表集合
 */
export const logList = (sendData) => {
    return fetch('uf/logmonitor/logList', {
        page: sendData.page.number,
        size: sendData.page.size,
        sort: sendData.page.sort,
        userName: sendData.log.userName,
        goal: sendData.log.goal,
        ip: sendData.log.ip,
        sysName: sendData.log.sysName,
        start: sendData.log.beginDate,
        end: sendData.log.endDate,
        caseName: sendData.log.caseName
    })
}

/**
 * 查看权限
 */
export const viewOperGroup = (id) => {
    return fetch('village/operate/viewOperGroup', { id: id })
}

/**
 * 删除权限
 */
export const deleteOperGroup = (id) => {
    return fetch('village/operate/deleteOperGroup/' + id, '', 'DELETE')
}

/**
 * 修改权限默认状态
 */
export const saveOperGroupInitUse = (id) => {
    return fetch(`village/operate/saveOperGroupInitUse?id=${id}`, {}, 'POST')
}
/**
 * 修改用户密码
 */
export const updatePwd = (sendData) => {
    return fetch(`village/userinfo/updatePwd?oldPwd=${sendData.oldPwd}&newPwd=${sendData.newPwd}&confirmPwd=${sendData.confirmPwd}`, {}, 'POST')
}

/**
 * 通知公告新增
 */
export const editAnnunciate = (sendData) => {
    return fetch(`uf/ann/editAnnunciate`, sendData, 'POST')
}

/**
 * 红名单接口 start
 */
/**
 * 红名单接口新增
 */
export const saveOrUpdateRedName = (sendData) => {
    return fetch(`village/redname/saveOrUpdateRedName`, { 'rname': sendData.addName, 'rphone': sendData.addTel, 'rlevel': sendData.addDuty, 'id': sendData.id }, 'POST')
}
/**
 * 获取红名单列表
 */
export const redNameList = (sendData) => {
    return fetch(`village/redname/redNameList?page=${sendData.page.pageNumber - 1}&size=${sendData.page.size}&sort=${sendData.page.sort}&rname=${sendData.rname}&rphone=${sendData.rphone}&rlevel=${sendData.rlevel}`)
}
/**
 * 删除红名单
 */
export const deleteRedName = (sendData) => {
    return fetch(`village/redname/deleteRedName?id=${sendData.id}`)
}
/**
 * 获取当前用户消息列表
 */
export const pushMessageList = (sendData) => {
    return fetch(`village/message/pushMessageList?page=${sendData.page.pageNumber - 1}&size=${sendData.page.size}&sort=${sendData.page.sort}&puser=${sendData.puser}&pcontent=${sendData.pcontent}&osname=${sendData.osname}&read=${sendData.read}`)
}
/**
 * 全部消息标为已读
 */
export const updateAllMessage = (sendData) => {
    return fetch(`village/message/updateAllMessage?ruserId=${sendData.ruserId}`, {}, 'POST')
}
/**
 * 标记未读消息为已读
 */
export const updateMessage = (sendData) => {
    return fetch(`village/message/updateMessage`, sendData, 'POST')
}
export const annunciateList = (sendData) => {
    return fetch(`uf/ann/annunciateList`, sendData)
}

export const viewAnnunciate = (sendData) => {
    return fetch(`uf/ann/viewAnnunciate`, sendData)
}

export const dwonLoadFile = (sendData) => {
    return fetch(`uf/ann/downLoadFile`, sendData)
}

export const deleteAnnFile = (sendData) => {
    return fetch(`uf/ann/deleteAnnFile`, sendData)
}

export const deleteAnnunciate = (sendData) => {
    return fetch(`uf/ann/deleteAnnunciate`, sendData)
}

export const userById = (id) => {
    return fetch(`village/userinfo/userById/${id}`)
}

export const getUnreadCount = (sendData) => {
    return fetch(`village/message/getUnreadCount`, sendData, 'POST')
}

export const checkAnnTitle = (sendData) => {
    return fetch(`village/ann/checkAnnTitle`, sendData)
}

export const annList = (sendData) => {
    return fetch(`out/ufi/annList`, sendData)
}

// 审批注册用户列表
export const registUserList = (sendData) => {
    return fetch(`village/userinfo/registUserList`, sendData)
}

// 审批注册用户列表
export const approvalUser = (sendData) => {
    return fetch(`village/userinfo/approvalUser`, sendData)
}
// 审批注册用户列表
export const userByUsername = (sendData) => {
    return fetch(`out/ufi/userByUsername`, sendData)
}

//首页软件信息列表
export const homeSoftwareList = (count) => {
  return fetch(`jzweb/softDownload/homeSoftwareList?count=${count}`, {},'POST');

}
//软件下载
export const softwareDownload = (filename) => {
  return fetch(`jzweb/softDownload/softwareDownload?filename=${filename}`, {},'POST');
}
//软件详情
export const softwareDetails = () => {
  return fetch(`jzweb/softDownload/softwareDetails`, {},'POST');
}
