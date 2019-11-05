<template>
  <div id="cls-part">
    <div class="deparDox">
    <Row justify="start" :gutter="10" type="flex" style="flex-wrap: nowrap" id="cls-part-content">
      <!--机构树-->
      <Col span="4" id="left-tree">
        <Card dis-hover id="cls-tree">
          <p slot="title"><Icon type="md-git-network" />&nbsp;机构</p>
          <Tree style="overflow: auto" :data="treeData" ref="treeDepart" @on-select-change="treeSelect" :load-data="loadData_2"></Tree>
        </Card>
      </Col>
      <!--右边子机构管理-->
      <Col span="20">
        <Card dis-hover>
          <UserSearch :filters="filter" :searchInfo="searchData" :dutylist="dutylist" :departList="departList" @radioSelect="radioSelect" @addUserinfo="addUserinfo" @addUpload="addUpload"  @selectData="selectData" @loadData="loadData" @search="search" @resat="resat" ref="searchInfo"></UserSearch>
          <Table :row-class-name="rowClassName" :height="tableHeight"  :columns="columns" :data="userData"  @on-sort-change="sortClick" :stripe="showStripe"  size="small"></Table>
          <div style="margin-top:10px;">
              <Paging :pages="searchData.page" @pageChange="pageChangeFn"></Paging>
          </div>
        </Card>
      </Col>
    </Row>
    <!--新增用户页面-->
    <Modal v-model="openFlag" :title="openTitle" @on-visible-change="winChange" width="750px">
      <p slot="header">
        <Icon type="md-person-add" />
        <span ref="header">{{openTitle}}</span>
      </p>
      <div>
        <Form :model="saveData" ref="formCustom" :rules="ruleValidate" label-position="right" :label-width="100">
          <Row>
            <Col span="12">
            <FormItem label="账号" prop="username">
              <Input type="text" v-model="saveData.username" :disabled="editName === false" placeholder="账号"  style="width:200px" :maxlength="50"> </Input>
            </FormItem>
            </Col>
            <Col span='12'>
            <FormItem label="部门" prop="depart">
              <Cascader :data="addDepartList" :placeholder="departValue" v-model="departValueArr" :load-data="loadData" @on-change="departFun" change-on-select style="width:240px" clearable></Cascader>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <!--<Col span="12">-->
            <!--<FormItem label="真实姓名" prop="fullname">-->
              <!--<Input type="text" v-model="saveData.fullname" placeholder="真实姓名" style="width:200px" :disabled="editName === false" :maxlength="50"> </Input>-->
            <!--</FormItem>-->
            <!--</Col>-->
            <!--<Col span='12'>-->
            <!--<FormItem label="职位" prop="duty">-->
              <!--<Select :placeholder="dutyValue" v-model="saveData.duty.id" style="width:240px" @on-change="dutyFun" filterable clearable>-->
                <!--<Option v-for="(item,index) in dutylist" :value="item.id" :key="index">{{item.dutyname}} </Option>-->
              <!--</Select>-->
            <!--</FormItem>-->
            <!--</Col>-->
          </Row>
          <Row>
            <!--<Col span="12">-->
            <!--<FormItem  label="身份证号" prop="cardId">-->
              <!--<Input  type="text" v-model="saveData.cardId" placeholder="身份证号" style="width:200px"> </Input>-->
            <!--</FormItem>-->
            <!--</Col>-->
            <!--<Col span="12">
            <FormItem  label="警号" prop="policeNum">
              <Input type="text" v-model="saveData.policeNum" placeholder="警号" style="width:200px" :maxlength="10"> </Input>
            </FormItem>
            </Col>-->
          </Row>
          <Row>
             <!--<Col span="12">-->
                <!--<FormItem label="权限组" prop="operGroup">-->
                  <!--<Select v-model="saveData.operGroup.id" style="width:200px"  filterable clearable>   &lt;!&ndash;:disabled="saveData.id === 1032"&ndash;&gt;-->
                    <!--<Option v-for="(item,index) in operGroupList" :value="item.id" :key="index">{{item.gname}} </Option>-->
                  <!--</Select>-->
                <!--</FormItem>-->
            <!--</Col>-->
            <Col span="12">
              <FormItem  label="密码" prop="password">
                <Input  type="text" v-model="saveData.password"   :placeholder="regPwd" style="width:200px" :maxlength="80"> </Input>
                <!--<Tooltip v-if="saveData.id == ''" placement="top" content='默认密码：123456'>-->
                  <!--<span class="helpIcon"><Icon type="md-help" style="color: #fff"/></span>-->
                <!--</Tooltip>-->
            </FormItem>
            </Col>
          </Row>
          <Row>
            <!--<Col span="12">-->
            <!--<FormItem label="入职日期" prop="hiredate">-->
              <!--<DatePicker  type="date"  :value="saveData.hiredate" @on-change="hiredateFn" placeholder="请选择入职日期" style="width: 200px" format="yyyy-MM-dd"></DatePicker>-->
            <!--</FormItem>-->
            <!--</Col>-->
            <!--<Col span="12">-->
            <!--<FormItem label="性别">-->
              <!--<RadioGroup v-model="saveData.sex" >-->
                <!--<Radio label="true" style="margin-left:50px">-->
                  <!--<Icon type="md-male" /><span>男</span>-->
                <!--</Radio>-->
                <!--<Radio label="false" style="margin-left:10px">-->
                  <!--<Icon type="md-female" /><span>女</span>-->
                <!--</Radio>-->
                <!--</Radio>-->
              <!--</RadioGroup>-->
            <!--</FormItem>-->
            <!--</Col>-->
          </Row>
          <Row>
            <!--<Col span="12">-->
            <!--<FormItem label="生日" prop="birthday">-->
              <!--<DatePicker  :value="saveData.birthday" type="date" @on-change="birthdayFn" placeholder="请选择生日" style="width: 200px" format="yyyy-MM-dd"></DatePicker>-->
            <!--</FormItem>-->
            <!--</Col>-->
			      <!--<Col span="12">-->
              <!--<FormItem label="单位电话">-->
                <!--<Input type="text" v-model="saveData.workPhone" placeholder="单位电话" style="width:240px" > </Input>-->
              <!--</FormItem>-->
            <!--</Col>-->
          </Row>
          <Row>
             <!--<Col span="12">-->
                <!--<FormItem label="电子邮箱">-->
                 	<!--<Input type="email" v-model="saveData.email" placeholder="电子邮箱" style="width:200px" > </Input>-->
                <!--</FormItem>-->
            <!--</Col>-->
             <!--<Col span="12">-->
              <!--<FormItem label="移动电话">-->
                <!--<Input type="text" v-model="saveData.mobilePhone" placeholder="移动电话" style="width:240px" > </Input>-->
              <!--</FormItem>-->
            <!--</Col>-->
          </Row>
          <Row>
			<Col span="12">
				<FormItem label="备注">
					<Input type="textarea" v-model="saveData.remark" style="width:240px;position:absolute" :autosize="{minRows: 2,maxRows:4}"> </Input>
				</FormItem>
            </Col>
          </Row>
			<!--<Row style="margin-top:10px" class="signImgUpload">
				<Col span="12">
					<FormItem label="签名上传">
						    <Row>
								<Col span="12" style="display:none;">
								&lt;!&ndash; 签章上传 &ndash;&gt;
								<div class="demo-upload-list" v-for="item in uploadList" :key="item.url" style="width: 120px;height:70px">
									<img :src="item.url" >
									<div class="demo-upload-list-cover">
										<Icon type="ios-eye-outline" @click.native="handleView(item,1)"></Icon>
										<Icon type="ios-trash-outline" @click.native="handleRemove(item,1)"></Icon>
									</div>
								</div>
								<div v-if="uploadSignShow">
								<Upload ref="uploadSign"
										:show-upload-list="false"
										:format="['jpg','jpeg','png']"
										:max-size="2048"
										:before-upload="handleBeforeUpload"
										type="drag"
										action="//jsonplaceholder.typicode.com/posts/"
										style="display: inline-block;width:120px">
									<div style="width: 120px;height:70px;padding:10px">
										<Icon type="ios-camera" size="30" style="line-height: 25px;color: #3399ff"></Icon>
										<p style="font-size:12px;color:#80848f;line-height: 20px;letter-spacing:1px">公章图片</p>
									</div>
								</Upload>
								</div>
								</Col>
								&lt;!&ndash; 签名上传 &ndash;&gt;
								<Col span="12">
								<div class="demo-upload-list" v-for="item in uploadList_1" :key="item.url" style="width: 120px;height:70px">
									<img :src="item.url" >
									<div class="demo-upload-list-cover">
										<Icon type="ios-eye-outline" @click.native="handleView(item,2)"></Icon>
										<Icon type="ios-trash-outline" @click.native="handleRemove(item,2)"></Icon>
									</div>
								</div>
								<div v-if="uploadSignShow_1">
								<Upload ref="uploadSign_1"
										:show-upload-list="false"
										:format="['jpg','jpeg','png']"
										:max-size="2048"
										type="drag"
										:before-upload="handleBeforeUpload_1"
										action="//jsonplaceholder.typicode.com/posts/"
										style="display: inline-block;width:120px">
									<div style="width: 120px;height:70px;padding:10px">
										<Icon type="ios-camera" size="30" style="line-height: 25px;color: #3399ff"></Icon>
										<p style="font-size:12px;color:#80848f;line-height: 20px;letter-spacing:1px;">签名图片</p>
									</div>
								</Upload>
								</div>
								</Col>
							</Row>
					</FormItem>
				</Col>
          </Row>-->
        </Form>
      </div>
      <div slot="footer">
        <Button type="default" @click="closeUser('formCustom')" size="small" >取消</Button>
        <Button type="primary" @click="submitUser('formCustom')" size="small" >保存</Button>
      </div>
    </Modal>
    <!--新增用户页面end-->
    <!-- 展示图片详情 begin-->
    <Modal :title="imgDetailTitle" v-model="imgDetailVisible" >
      <img :src="imgDetailSrc" v-if="imgDetailVisible" style="width: 100%">
    </Modal>
    </div>
  </div>
</template>

<script>
import { getCurrentInfo,getDept, getDeptChildren, getAllDuty, delUser, recoverUser, saveUser, userAll, ableSwitch, operGroupAllList,departByCascader} from '../../service/index';//一部请求链接
import UserSearch from '../../components/System/PartManagement/common/tools/userSearch';//用户的查询
import Paging from '../../components/System/PartManagement/common/tools/paging'
import { idCard } from '../../components/System/PartManagement/common/tools/validateFun';//校验
import UserInfo from '../../components/System/PartManagement/common/tools/userinfo'
import {process_error} from '@/config/process_request_conf' //请求成功返回的状态
export default {
  name: "userManagement",
  components: { Paging, UserSearch },
  data() {
    const validCheckSelect = (rule, value, callback) => {
	  let v = '';
      if (this.validCheckSelectFlag) {
        if ('depart' === rule.type) {
          v = this.saveData.depart.dname;
        }
        if (v === '') {
          callback(new Error(rule.message));
        } else {
          callback();
        }
      }
    };

    return {
		uploadList: [],
		uploadList_1: [],
		uploadSignShow :true,
		uploadSignShow_1 :true,
		imgDetailTitle:'',
		imgDetailSrc:'',
		imgDetailVisible:false,
		showLoading: true,
		showStripe: true,
		openFlag: false,
		uploadModal: false,
		editName:true,
		filter: '0',
		departValue: '请选择',
		departValueArr: [],
		dutyValue: '请选择',
		validCheckSelectFlag: false,//针对下拉校验的开关
		openTitle: '新增用户信息',
		regPwd:'请输入用户登录密码',
		file: null,
		loadingStatus: false,
		filename:'',
		treeData:[],//机构树的数据
		defaultDepId:"",//默认的机构信息
    tableHeight:0,
		columns: [
			{
			type: 'expand',
			width: 30,
			render: (h, params) => {
				return h(UserInfo, {
				props: {
					row: params.row,
				}
				})
			}
			},
        { title: '序号', type: 'index',  align: 'center' },
        { title: '账号', key: 'username',align: 'center'},
        // { title: '真实姓名', key: 'fullname', minWidth: 140},
        // { title: '警号', key: 'policeNum', width: 140, sortable: 'custom',align: 'center'  },
        // { title: '职位', key: 'dutyName', minWidth: 120},
        // { title: '权限', key: 'operGroupName', minWidth: 120},
        { title: '部门', key: 'departNames',align: 'center'},
        // { title: '级别', key: 'ulevelName', width: 120},
        // { title: '状态', key: 'able',width: 140, align: 'center', sortable: 'custom',
        //   render: (h, params) => {
        //     return h('div', [
        //       h('i-switch', { //数据库1是已处理，0是未处理
        //         props: {
        //           type: 'primary',
        //           size: 'large',
        //           value: params.row.able === true, //控制开关的打开或关闭状态，官网文档属性是value
        //           //disabled: params.row.username === 'admin' ||  !this.$store.state.user.auth.has('1-1-1-4')
        //         },
        //         on: {
        //           'on-change': (value) => {//触发事件是on-change,用双引号括起来，
        //             //参数value是回调值，并没有使用到
        //             this.switch(params.row) //params.index是拿到table的行序列，可以取到对应的表格值
        //           }
        //         }
        //       }, [
        //           h('span', {
        //             slot: 'open',
        //             domProps: {
        //               innerHTML: '启用'
        //             }
        //           }),
        //           h('span', {
        //             slot: 'close',
        //             domProps: {
        //               innerHTML: '禁用'
        //             }
        //           })
        //         ]
        //       )
        //     ]);
        //   }
        // },
        { title: '操作时间', width: 170, key: 'lastModifyTime', sortable: 'custom' },
        {
          title: '操作', width: 100, key: 'action', align: 'center',
          render: (h, params) => {
            if (!params.row.delFlag) {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    shape: 'circle',
                    icon: 'md-create'
                  },
                  attrs:{title:"编辑"},
                  /*directives: [{
                    name: 'auth',
                    value: -1,
                    expression: '1-1-1-2'
                  }],*/
                  style: {
                    marginRight: '10px',
                    color: '#2d8cf0',
                    width: '23px',
                    height: '23px'
                  },
                  on: {
                    click: () => {
                      this.editData(params.row);
                    }
                  }
                }),
                h('Poptip', {
                  props: {
                    title:'您确定删除< '+params.row.username+' >吗？',
                    confirm: true,
                    okText:'删除',
                    transfer: true
                  },
                  // directives: [{
                  //   name: 'auth',
                  //   value: -1,
                  //   expression: '1-1-3-3'
                  // }],
                  on: {
                    'on-ok' : () => {
                      this.delUser(params.row.id)
                    }
                  }
                }, [
                  h('Button',{
                    props: {
                      type: 'text',
                      shape:'circle',
                      icon:'ios-close-circle'
                    },
                    attrs:{title:"删除"},
                    style:{
                      color:'#ED3F14',
                      width:'23px',
                      height:'23px'
                    }
                  })
                ])
              ]);
            } else {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    shape: 'circle',
                    icon: 'ios-redo'
                  },
                  /*directives: [{
                    name: 'auth',
                    value: -1,
                    expression: '1-1-1-5'
                  }],*/
                  attrs:{title:"恢复"},
                  style: {
                    color: '#ff9900',
                    width: '23px',
                    height: '23px'
                  },
                  on: {
                    click: () => {
                      this.recoverData(params);
                    }
                  }
                })
              ]);
            }
          }
        }
      ],
      searchData: {
        page: {
          totalElements: 1,
          size: 10,
          pageNumber: 1,
          sort: "id,desc"
        },
        able: '' ,
        del: '',
        username:'',
        fullname: '',
        depart:{
          id:''
        },
        duty:{
          id:''
        },
        policeNum: ''
      },
      dutylist: [],//职位下拉数组
      departList: [],//查询 部门下拉数组
      addDepartList: [],//新增 部门下拉数组
      operGroupList:[],//权限组 下拉数组
      userData: [
      ],//用户列表中的数据
      saveData: { //保存的数据格式
        id:'',
        depart: {
          id: 0,
          dname: '',
        },

        username: '',
        password: '',
        // fullname: '',
        // key: '',
        // ulevel: '',
        remark: '',

      },
      ruleValidate: {//校验
        //用户名
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { type: 'string', max: 50, message: '用户名太长', trigger: 'blur' }
        ],
        //密码
        password: [
          {type: 'string', max: 16, trigger: 'blur' }
        ],
        // ulevel: [
        //   { required: true, message: '用户级别必选', trigger: 'blur' }
        // ],
        //真实姓名
        // fullname: [
        //   { required: true, message: '真实姓名不能为空', trigger: 'blur' },
        //   { type: 'string', max: 50, message: '真实姓名太长', trigger: 'blur' }
        // ],
        //身份证号码
        // cardId: [
        //   { required: true, trigger: 'blur', validator: idCard }
        // ],
        // policeNum: [
        //     { required: true,message: '请输入警号', trigger: 'blur' }
        // ],
        depart: [
          { required: true, message: '请选择部门', trigger: 'change', validator: validCheckSelect, type: 'depart' },
        ],
        // operGroup:[
        //   { required: true, message: '请选择权限组', trigger: 'change', validator: validCheckSelect, type: 'operGroup' },
        // ],
        // duty: [
        //   { required: true, message: '请选择职位', trigger: 'change', validator: validCheckSelect, type: 'duty', times: '0' },
        // ]
      }

    }
  },
  methods: {
    //分页查询全部用户
    async getTableList(sendData) {
      this.showLoading = true;
      await userAll(sendData)
        .then(res => {
          if(res.statusCode !== 200) return process_error(res);
          this.showLoading = false;
          this.userData = res.data.content;
          this.$store.commit("getuserInfo", res.data.content);
          this.searchData.page.totalElements = res.data.totalElements;
        }).catch(err => {
          this.showLoading = false;
        })
    },
    // 分页及复合搜索处理
    pageChangeFn(page) {
      this.searchData['page']['pageNumber'] = page.pageNumber;
      this.showLoading = true;
      this.searchData['page']['size'] = page.size;
      this.switchTable(this.filter);
    },
    async switch(data) {
      await ableSwitch(data.id)
        .then(res => {
          if(res.statusCode !== 200) return process_error(res);
          this.showLoading = false;
          this.$Message.success(res.message);
          this.radioSelect(this.filter);
        })
        .catch(err => {
          this.showLoading = false;
          this.$Message.error(err);
        })
    },
    //职位下拉
    async selectData() {
      try {
        let res = await getAllDuty();
        if(res.statusCode !== 200) return process_error(res);
        this.dutylist = res.data;
        let v = await getDept();
        if(v.statusCode !== 200) return process_error(v);
        this.departList = eval(JSON.stringify(v.data).replace(/"children":null,/g,"").replace(/,"loading":null/g,""));
      } catch (err) {
        throw new Error();
      }
    },
    //权限组下拉
    async selectOptGroupData() {
      try {
        let res = await operGroupAllList();
        if(res.statusCode !== 200) return process_error(res);
        this.operGroupList = res.data;
      } catch (err) {
        throw new Error();
      }
    },
    //部门级联 子数据的异步加载
    async  loadData(item, callback) {
      item.loading = true;
      await getDeptChildren(item.value)

        .then(res => {
          if(res.statusCode !== 200) return process_error(res);
          item.loading = false;
          item.children = eval(JSON.stringify(res.data).replace(/"children":null,/g, "").replace(/,"loading":null/g, ''));
          item.loading = false;
          callback();
        }
        );
    },
    //新增 提交
    async saveUser(sendData) {
      await saveUser(sendData)
        .then(res => {
          if (res.statusCode !== 200) return process_error(res);
          this.$Message.success(res.message);
          this.resat();
          this.openFlag = false;
          this.radioSelect(this.filter);
        })
        .catch(err => {
          this.showLoading = false;
        })
    },
    //入职日期
    // hiredateFn(date){
    //   this.saveData.hiredate = date;
    // },
    // //生日日期
    // birthdayFn(date){
    //   this.saveData.birthday = date;
    // },
    //表格 删除
    async delUser(id) {
      await delUser(id)
        .then(res => {
          if(res.statusCode !== 200) return process_error(res);
          this.$Message.success("删除成功！")
          this.radioSelect('0');
        })
        .catch(err => {
          this.showLoading = false;
          //console.log(err);
        })
    },
    //删除 相关的询问提示
    delData(param) {
      this.$Modal.confirm({
        title: '删除',
        content: '确认删除？',
        okText: '确认',
        cancelText: '取消',
        closable: true,
        onOk: () => {
          this.delUser(param.row.id);
        },
      });
    },
    rowClassName(row) {
      return 'demo-table-info-row';
    },
    //表格 编辑
    async editData(row) {
		this.uploadSignShow = true;
		this.uploadSignShow_1 = true;
		this.uploadList = [];
		this.uploadList_1 = [];
		let v = await getDept();
		this.editName = false;
		this.addDepartList = eval(JSON.stringify(v.data).replace(/"children":null,/g,"").replace(/,"loading":null/g,""));
		this.openFlag = true;
		this.openTitle = "编辑用户信息";
		this.regPwd = "不填写则不会修改原密码";
		this.saveData.password = '';
		this.saveData.id = row.id;
		this.saveData.username = row.username;
		// this.saveData.fullname = row.fullname;
		// this.saveData.sex = (row.sex ? 'true':'false');
		// this.saveData.cardId = row.cardId;
		// this.saveData.key = row.key;
		// this.saveData.operGroup.id = (row.operGroupId == null ? '':row.operGroupId );
		// this.saveData.policeNum = row.policeNum;
		// this.saveData.ulevel = `${row.ulevel}`;
		// this.saveData.birthday = row.birthday;
		// this.saveData.hiredate = row.hiredate;
		this.saveData.remark = row.remark;
		// this.saveData.duty.dutyname = row.dutyName;
		// this.saveData.duty.id = (row.dutyId == null ? '':row.dutyId );
		this.saveData.depart.dname = row.departName;
		this.saveData.depart.id = (row.departId == null ? '':row.departId );
		this.departValue = row.departNames;
		// this.dutyValue = row.dutyName;
		if(!!row.gzcodeStr){
			this.uploadList.push({url:row.gzcodeStr});
			this.uploadSignShow = false;
		}
		if(!!row.qmcodeStr){
			this.uploadList_1.push({url:row.qmcodeStr});
			this.uploadSignShow_1 = false;
		}
    },
    //表格 恢复
    async recoverUser(param) {
      await recoverUser(param.row.id)
        .then(res => {
          this.radioSelect('0');
        })
        .catch(err => {
          this.showLoading = false;
          //console.log(err);
        })
    },
    //恢复相关的询问提示
    recoverData(param) {
      this.$Modal.confirm({
        title: '恢复',
        content: '确认恢复？',
        okText: '确认',
        cancelText: '取消',
        closable: true,
        onOk: () => {
          this.recoverUser(param);
        },
      });
    },

    //查询项 查询
    search(departId) {
    //   this.searchData.depart.id = departId;
      this.searchData.page.pageNumber = 1;
      this.radioSelect(this.filter);
    },
    //查询项 重置
    resat() {
      this.searchData = {
        page: {
          totalElements: 1,
          size: 10,
          pageNumber: 1,
          sort: "id,desc"
        },
        able: '',
        del:'',
        username:'',
        fullname: '',
        depart:{id:this.searchData.depart.id},
        duty:{id:''},
        policeNum: '',
      };
      this.radioSelect(this.filter);
    },
    //标签选取刷新
    radioSelect(v) {
      this.$refs['searchInfo'].setFilter(v);
      this.filter = v
      this.searchData.page.pageNumber = 1;
      this.searchData.page.size = 10;
      this.switchTable(v);
    },
    //数据切换
    switchTable(v) {
      switch (v) {
        case '0'://全部
          this.searchData.del = false;
          this.searchData.able = '';
          break;
        case '1'://禁用
          this.searchData.del = false;
          this.searchData.able = false;
         // this.getDisableList(this.searchData);
          break;
        case '2'://启用
          this.searchData.del = false;
          this.searchData.able = true;
          //this.getAbleList(this.searchData);
          break;
        case '3'://已删除
          this.searchData.del = true;
          this.searchData.able = '';
          //this.getDelList(this.searchData);
          break;
      }
      this.getTableList(this.searchData);
    },
    //新增
    async addUserinfo() {
		this.uploadSignShow = true;
		this.uploadSignShow_1 = true;
		let v = await getDept();

		this.editName = true;
		this.addDepartList = eval(JSON.stringify(v.data).replace(/"children":null,/g,"").replace(/,"loading":null/g,""));
      // console.log('>>>>>>',this.addDepartList)
		this.departValueArr = [];
		this.departValue = '请选择';
		this.dutyValue = '请选择';
		this.uploadList = []
		this.uploadList_1 = []
		let data = {
			id:'',
			depart: {
			id: 0,
			dname: '',
			},
			duty: {
			id: '',
			dutyname: '',
			},
			operGroup: {
			id: '',
			gname: ''
			},
			username: '',
			password: '123456',
			fullname: '',
			sex: 'true',
			cardId: '',
			key: '',
			policeNum: '',
			ulevel: '5',
			birthday: '',
			hiredate: '',
			remark: '',
			workPhone:'',
			mobilePhone:'',
			email:'',
			gzcodeStr:'',
			qmcodeStr:''
		}
		this.saveData = data;
		this.validCheckSelectFlag = true;
		this.openFlag = true;
		this.openTitle = "新增用户信息";
		this.regPwd="请输入用户登录密码";
    },
    //提交
    submitUser(name) {
      if(this.uploadList.length > 0){
        this.saveData.gzcodeStr = this.uploadList[0].url
      }else{
		this.saveData.gzcodeStr = "";
	  }
      if(this.uploadList_1.length > 0){
        this.saveData.qmcodeStr = this.uploadList_1[0].url
      }else{
		this.saveData.qmcodeStr = "";
	  }
      this.validCheckSelectFlag = true;
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.saveUser(this.saveData);
        } else {
          this.$Message.error('校验失败!');
        }
      })
    },
    //关闭
    closeUser(name) {
      this.openFlag = false;
      this.$refs[name].resetFields();
    },
    addUpload(){
      this.uploadModal = true;
    },
    //窗口的状态改变触发
    async winChange(status) {
      //清空校验
      if (status === false) {
        this.departValue = '请选择';
        this.dutyValue = '请选择';
        this.departValueArr = [];
        this.$refs['formCustom'].resetFields();
      }
    },
    // 部门下拉选项 对选中的值进行赋值
    departFun(value, selectedData) {
      if (0 < value.length) {
        let obj = selectedData.pop();
        this.saveData.depart.id = obj.value;
        this.saveData.depart.dname = obj.label;
      }else{
		this.saveData.depart.id = "";
        this.saveData.depart.dname = "";
	  }
    },
    //职位下拉选项
    dutyFun(o) {
      if (this.openFlag) {
        let name = this.getDutyObjById(o);
        this.saveData.duty.dutyname = name;
      }
    },
    //循环遍历 通过id获得对应的名称
    getDutyObjById(o) {
      let name = "";
      if (o != "") {
        this.dutylist.filter(function(e) {
          if (o === e.id) {
            name = e.dutyname;
          }
        })
      }
      return name;
    },
    //上传文件前
    handleUpload (file) {
      this.file = file;
      return false;
    },
    clear(){
      this.$refs.upload.clearFiles();
      this.file.name ='';
    },
    handleSuccess (res, file) {
      file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
      file.name = '7eb99afb9d5f317c912f08b5212fd69a';
    },
    handleFormatError (file) {
      alert("format");
      this.$Message.warning({
        title: '文件格式错误',
        desc: '文件[ ' + file.name + ']格式错误,请选择xlsx格式'
      });
    },
    handleMaxSize (file) {
      alert("maxsize")
      this.$Message.warning({
        title: 'Exceeding file size limit',
        desc: 'File  ' + file.name + ' is too large, no more than 2M.'
      });
    },
    async sortClick(column){
      if(column.order != 'normal'){
        this.searchData.page.sort=(column.key+","+column.order);
      }
      this.getTableList(this.searchData);
	},
	//部门树
	async getDepartTree(){
		await departByCascader().then(res=>{
			if(res.statusCode !== 200) return process_error(res);
			this.defaultDepId = res.data.value;
			if(res.data.children === null){
				res.data = JSON.parse(JSON.stringify(res.data).replace(/"children":null,/g, "").replace(/,"loading":null/g, ''));
			}
			let temTree = new Array();
			temTree[0] = res.data;
			this.treeData =  temTree;
			this.searchData.depart.id = this.defaultDepId;
			this.getTableList(this.searchData);
			})
	},
	treeSelect(){
		let domNode = this.$refs.treeDepart;
		if(!!domNode && domNode.getSelectedNodes().length !== 0){
			this.searchData.depart.id = this.$refs.treeDepart.getSelectedNodes()[0].value;
    }
    this.searchData['page']['pageNumber'] = 1;
    this.searchData['page']['size'] = 10;
		this.getTableList(this.searchData);
		},

    loadData_2(item, callback){
      // console.log(item)
      item.loading = true;
      getDeptChildren(item.value)
        .then(res => {
            item.loading = false;
            // console.log(res)
            callback(eval(JSON.stringify(res.data).replace(/"children":null,/g, "").replace(/,"loading":null/g, '')));
          }
        );
    },
	handleBeforeUpload(file) {
		const _uploadComponent = this.$refs.uploadSign;
		//格式是否正确的校验
		 if (_uploadComponent.format.length) {
                    const _file_format = file.name.split('.').pop().toLocaleLowerCase();
                    const checked = _uploadComponent.format.some(item => item.toLocaleLowerCase() === _file_format);
                    if (!checked) {
							this.$Notice.warning({
								title: '文件格式不正确',
								desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
							})
                        return false;
                    }
                }
    	//文件大小是否超出大小的校验
		if (_uploadComponent.maxSize) {
			if (file.size > _uploadComponent.maxSize * 1024) {
				this.$Notice.warning({
					title: '超出文件大小限制',
					desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
					})
				return false;
			}
		}
		// 创建一个 FileReader 对象
		let reader = new FileReader()
		// readAsDataURL 方法用于读取指定 Blob 或 File 的内容
		// 当读操作完成，readyState 变为 DONE，loadend 被触发，此时 result 属性包含数据：URL（以 base64 编码的字符串表示文件的数据）
		// 读取文件作为 URL 可访问地址
		reader.readAsDataURL(file)

		const _this = this
		reader.onloadend = function (e) {
			file.url = reader.result
			_this.uploadList.push(file)

		}
		this.uploadSignShow = false;
		return false;
	},
	handleBeforeUpload_1(file) {
		const _uploadComponent = this.$refs.uploadSign_1;
		//格式是否正确的校验
		 if (_uploadComponent.format.length) {
                    const _file_format = file.name.split('.').pop().toLocaleLowerCase();
                    const checked = _uploadComponent.format.some(item => item.toLocaleLowerCase() === _file_format);
                    if (!checked) {
							this.$Notice.warning({
								title: '文件格式不正确',
								desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
							})
                        return false;
                    }
                }
    	//文件大小是否超出大小的校验
		if (_uploadComponent.maxSize) {
			if (file.size > _uploadComponent.maxSize * 1024) {
				this.$Notice.warning({
					title: '超出文件大小限制',
					desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
					})
				return false;
			}
		}
		// 创建一个 FileReader 对象
		let reader = new FileReader()
		// readAsDataURL 方法用于读取指定 Blob 或 File 的内容
		// 当读操作完成，readyState 变为 DONE，loadend 被触发，此时 result 属性包含数据：URL（以 base64 编码的字符串表示文件的数据）
		// 读取文件作为 URL 可访问地址
		reader.readAsDataURL(file)

		const _this = this
		reader.onloadend = function (e) {
			file.url = reader.result
			_this.uploadList_1.push(file)

		}
		this.uploadSignShow_1 = false;
		return false;
	},

    handleRemove(file,sign) {
		if(sign === 1){
			this.uploadList.splice(0)
		}else{
			this.uploadList_1.splice(0)
		}
		if(this.uploadList.length === 0){
			this.uploadSignShow = true;
		}
		if(this.uploadList_1.length === 0){
			this.uploadSignShow_1 = true;
		}
	},
	handleView(file,name){
		this.imgDetailVisible = true;
		this.imgDetailTitle = name === 1 ? "公章图片" : "签名图片";
		this.imgDetailSrc = file.url
	},

	defaultClick(){
		return;
	}
  },
	mounted() {
		this.getDepartTree();
		// this.selectData();
		// this.selectOptGroupData();
    // this.tableHeight = this.$tools.autoHeight('main-content',184);
    // this.$refs.treeDepart.$el.style.height = (this.tableHeight + 57) + 'px';
    // window.onresize = ()=>{
    //   this.tableHeight = this.$tools.autoHeight('main-content',184);
    //   this.$refs.treeDepart.$el.style.height = (this.tableHeight + 57) + 'px';
    // };
	}
}
</script>

<style lang="less">
.signImgUpload{
	.ivu-upload{
		border-color: #4d4d4d;
	}
	.ivu-upload:hover{
		border-color: #2d8cf0;
	}
}
.searchInfo {
  text-align: left;
}
.helpIcon{
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #f90;
    text-align: center;
    line-height: 18px
  }
  .demo-upload-list {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
}

.demo-upload-list img {
    width: 100%;
    height: 100%;
}

.demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
}

.demo-upload-list:hover .demo-upload-list-cover {
    display: block;
}

.demo-upload-list-cover i {
    color: #fff;
    font-size: 25px;
    cursor: pointer;
	margin: 0 7px;
	position: relative;
	 top: 10px;

}

</style>
