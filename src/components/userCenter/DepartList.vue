<template >
  <div id="cls-part">
  <div class="deparDox">
    <Row justify="start" :gutter="10" type="flex" style="flex-wrap: nowrap" id="cls-part-content">
      <!--机构树-->
      <Col span="4" id="left-tree">
        <Card dis-hover id="cls-tree">
          <p slot="title"><Icon type="md-git-network" />&nbsp;机构</p>
          <Tree style="overflow: auto;" :data="treeData" :model="treeDepart" ref="treeDepart" @on-select-change="treeSelect"></Tree>
        </Card>
      </Col>
      <!--机构树-->
      <!--右边子机构管理-->
      <Col span="20">
        <Card dis-hover>
          <!--子机构搜索-->
          <Row>
            <Col span="20">
            <Form label-position="left" :model="searchInfo" ref="searchInfo" inline>
              <FormItem :label-width="50" label="名称" prop="dname">
                <Input v-model="searchInfo.dname" placeholder="输入机构名称" style="width: 140px" clearable/>
              </FormItem>
              <FormItem :label-width="50" label="描述" prop="ddesc">
                <Input v-model="searchInfo.ddesc" placeholder="输入机构描述" style="width: 140px" clearable/>
              </FormItem>
              <FormItem>
                <Button  type="primary" icon="ios-search" @click="search" size="small">搜索</Button>&nbsp;
                <Button type="primary" icon="ios-sync" size="small" @click="reset">重置</Button>
              </FormItem>
            </Form>
            </Col>
          </Row>
          <!--子机构搜索-->
          <!--子机构过滤-->
          <Form label-position="left" ref="searchInfo" inline>
            <Row >
              <Col span="21">
                  <FormItem :label-width="1" >
                  <RadioGroup v-model="filter" @on-change="radioSelect" type="button">
                    <Radio label="0">机构列表</Radio>
                    <!--<Radio label="1">已删机构</Radio>-->
                  </RadioGroup>
                  <span style=" margin-left: 10px;vertical-align: middle;overflow: hidden">
                    当前父级机构：<b>{{addForm.parent.dname}}</b>
                  </span>
                </FormItem>
              </Col>
              <Col span="3" style="text-align: right">
              <Form>
                <FormItem :label-width="10">
                  <Button @click="addModal()" style="margin-right: 10px"  type="success" icon="md-add" title="新增机构信息" >新增</Button>
                </FormItem>
              </Form>
              </Col>
            </Row>

          </Form>
          <!--子机构过滤-->
          <!--子机构列表-->
          <Table :columns="columns" :height="tableHeight" :data="DepartmentData" size="small"   @on-sort-change="sortClick"></Table>
          <Paging style="margin-top:10px;" :pages="searchData.page" @pageChange="pageChangeFn" ></Paging>
          <!--子机构列表-->
        </Card>
      </Col>
      <!--右边子部门管理-->
      <!-- 新增机构信息页面 -->
      <Modal  v-model="addDepart" :mask-closable="false" @on-cancel="handleReset('addForm')">
        <p slot="header">
          <Icon type="md-git-network" />
          <span ref="header">{{header}}</span>
        </p>
        <Form ref="addForm"  :model="addForm" :rules="addValidate"  label-position="right" :label-width="100" >
          <FormItem label="名称" prop="dname">
            <Input v-model.trim="addForm.dname" placeholder="请输入机构名称" style="width: 300px" :maxlength="50"/>
          </FormItem>
          <FormItem label="父机构" >
            <Input v-model="addForm.parent.dname" :placeholder="addForm.parent.dname"  disabled style="width: 300px"/>
          </FormItem>
          <FormItem label="描述" prop="ddesc">
            <Input v-model="addForm.ddesc" placeholder="请输入描述" style="width: 300px" type="textarea" :autosize="{minRows: 4,maxRows:8}" />
          </FormItem>
          <FormItem label="备注" prop="remark">
            <Input v-model="addForm.remark" style="width: 300px" placeholder="请输入备注" />
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="default"  @click="handleReset('addForm')">取消</Button>
          <Button type="primary"  @click="handleSubmit('addForm')">提交</Button>
        </div>
      </Modal>
      <!-- 新增机构信息页面 -->
    </Row>
  </div>
  </div>
</template>

<script>
  import {getAllDepart,departTree,saveDepart,recoverDepart,delDepart} from '../../service/index'
  import Paging from '../../components/System/PartManagement/common/tools/paging'
  import {process_error} from '@/config/process_request_conf'
  import DepartInfo from '../../components/System/PartManagement/common/tools/info'
  export default {
    name: "departmentList",
    components:{Paging},
    showLoading: false,
    data() {
      return {
        searchInfo: {
          dname: '',
          ddesc: ''
        },
        treeDepart:'',
        filter:'0',
        addDepart:false,
        header:'新增部门信息',
        addForm: {
          parent:{
            id:'',
            dname:''
          },
          dname: '',
          ddesc: '',
          remark: '',
          id:''
        },
        tableHeight:0,
        columns: [
          {
            type: 'expand',
            width: 30,
            render: (h, params) => {
              return h(DepartInfo, {
                props: {
                  row: params.row,
                }
              })
            }
          },
          {title: '序号', type: 'index', width: 60,align: 'center'},
          {title: '名称', key: 'dname',align: 'left',width:160},
          {title: '级别', key: 'dlevel',align: 'left',width:100},
          {title: '父机构', key: 'parentDname',align: 'left',width:250},
          {title: '操作时间', key: 'lastModifyTime',align: 'left', sortable: 'custom',width:160},
          {title: '操作', key: 'name',align: 'center',
            render:(h,params)=>{
              if(!params.row.delFlag){
                return h('div',[
                  h('Button', {
                    props: {
                      type: 'text',
                      shape:'circle',
                      icon:'md-create'
                    },
                    attrs:{title:"编辑"},
                    // directives: [{
                    //   name: 'auth',
                    //   value: -1,
                    //   expression: '1-1-2-2'
                    // }],
                    style: {
                      marginRight: '10px',
                      color:'#2d8cf0',
                      width:'23px',
                      height:'23px'
                    },
                    on: {
                      click: () => {
                        this.editData(params.row);
                      }
                    }
                  }),
                  h('Poptip', {
                    props: {
                      title:'您确定删除机构< '+params.row.dname+' >吗？',
                      confirm: true,
                      okText:'删除',
                      transfer: true
                    },
                    // directives: [{
                    //   name: 'auth',
                    //   value: -1,
                    //   expression: '1-1-2-3'
                    // }],
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      'on-ok' : () => {
                        this.delData(params.row.id)
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
              }else{
                return h('div',[
                  h('Poptip', {
                    props: {
                      title:'您确定恢复机构< '+params.row.dname+' >吗？',
                      confirm: true,
                      okText:'恢复',
                      transfer: true
                    },
                    // directives: [{
                    //   name: 'auth',
                    //   value: -1,
                    //   expression: '1-1-2-4'
                    // }],
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      'on-ok': () => {
                        this.recoverData(params.row.id);
                      }
                    }
                  }, [
                    h('Button',{
                      props: {
                        type: 'text',
                        shape:'circle',
                        icon:'ios-redo'
                      },
                      attrs:{title:"恢复"},
                      style:{
                        color:'#ff9900',
                        width:'23px',
                        height:'23px'
                      }
                    })
                  ])
                ]);
              }
            }
          },
        ],
        addValidate: {
          dname: [
            { required: true, message: '请输入机构名称！', trigger: 'blur',max: 100 }
          ],
          ddesc: [
            { required: false , trigger: 'blur' },
            { type: 'string', max: 120, message: '描述不能超过200字', trigger: 'blur' }
          ],
          remark: [
            { required: false , trigger: 'blur' },
            { type: 'string', max: 100, message: '备注不能超过80字', trigger: 'blur' }
          ]
        },
        DepartmentData: [
          {
            "createTime" : "2019-05-27 10:03:09",
            "lastModifyTime" : "2019-05-27 10:03:09",
            "createUID" : 1032,
            "lastModifyUID" : 1032,
            "id" : 20657,
            "dname" : "机构1用户删除",
            "ddesc" : null,
            "dlevel" : 1,
            "remark" : null,
            "del" : false,
            "departNames" : "机构1用户删除",
            "parentDname" : "总机构",
            "parentid" : 1
          }, {
            "createTime" : "2019-05-17 09:48:49",
            "lastModifyTime" : "2019-05-17 09:48:49",
            "createUID" : null,
            "lastModifyUID" : 18703,
            "id" : 2686,
            "dname" : "研发部门",
            "ddesc" : "测试部门test12",
            "dlevel" : 1,
            "remark" : "机构备注",
            "del" : false,
            "departNames" : "研发部门",
            "parentDname" : "总机构",
            "parentid" : 1
          }, {
            "createTime" : "2019-05-17 09:35:22",
            "lastModifyTime" : "2019-05-17 09:35:22",
            "createUID" : null,
            "lastModifyUID" : 18703,
            "id" : 328,
            "dname" : "河北寄递项目部门测试",
            "ddesc" : "河北寄递test123",
            "dlevel" : 1,
            "remark" : null,
            "del" : false,
            "departNames" : "河北寄递项目部门测试",
            "parentDname" : "总机构",
            "parentid" : 1
          }, {
            "createTime" : "2019-05-17 09:35:03",
            "lastModifyTime" : "2019-05-17 09:35:03",
            "createUID" : null,
            "lastModifyUID" : 18703,
            "id" : 1023,
            "dname" : "支队",
            "ddesc" : "河北支队test1",
            "dlevel" : 1,
            "remark" : null,
            "del" : false,
            "departNames" : "支队",
            "parentDname" : "总机构",
            "parentid" : 1
          } ],
        "last" : true,
        "totalPages" : 1,
        "totalElements" : 4,
        "numberOfElements" : 4,
        "size" : 10,
        "number" : 0,
        "first" : true,
        "sort" : [ {
          "direction" : "DESC",
          "property" : "lastModifyTime",
          "ignoreCase" : false,
          "nullHandling" : "NATIVE",
          "descending" : true,
          "ascending" : false
        }
        ],
        treeData:[
              {
              "id" : 1,
              "parentid" : 0,
              "title" : "总机构",
              "parentTitle" : null,
              "expand" : false,
              "disabled" : false,
              "disableCheckbox" : false,
              "selected" : false,
              "checked" : false,
              "isDepart" : true,
              "children" : [ {
                "id" : 20657,
                "parentid" : 1,
                "title" : "机构1用户删除",
                "parentTitle" : "总机构",
                "expand" : false,
                "disabled" : false,
                "disableCheckbox" : false,
                "selected" : false,
                "checked" : false,
                "isDepart" : true,
                "children" : [ {
                  "id" : 20660,
                  "parentid" : 20657,
                  "title" : "机构2级",
                  "parentTitle" : "机构1用户删除",
                  "expand" : false,
                  "disabled" : false,
                  "disableCheckbox" : false,
                  "selected" : false,
                  "checked" : false,
                  "isDepart" : true,
                  "children" : [ ],
                  "childNum" : 0
                }, {
                  "id" : 20661,
                  "parentid" : 20657,
                  "title" : "机构2级1",
                  "parentTitle" : "机构1用户删除",
                  "expand" : false,
                  "disabled" : false,
                  "disableCheckbox" : false,
                  "selected" : false,
                  "checked" : false,
                  "isDepart" : true,
                  "children" : [ ],
                  "childNum" : 0
                }, {
                  "id" : 26338,
                  "parentid" : 20657,
                  "title" : "机构名称机构名称机构名称机构名称机构名称",
                  "parentTitle" : "机构1用户删除",
                  "expand" : false,
                  "disabled" : false,
                  "disableCheckbox" : false,
                  "selected" : false,
                  "checked" : false,
                  "isDepart" : true,
                  "children" : [ ],
                  "childNum" : 0
                } ],
                "childNum" : 3
              }, {
                "id" : 1023,
                "parentid" : 1,
                "title" : "支队",
                "parentTitle" : "总机构",
                "expand" : false,
                "disabled" : false,
                "disableCheckbox" : false,
                "selected" : false,
                "checked" : false,
                "isDepart" : true,
                "children" : [ {
                  "id" : 2701,
                  "parentid" : 1023,
                  "title" : "七大队",
                  "parentTitle" : "支队",
                  "expand" : false,
                  "disabled" : false,
                  "disableCheckbox" : false,
                  "selected" : false,
                  "checked" : false,
                  "isDepart" : true,
                  "children" : [ ],
                  "childNum" : 0
                }, {
                  "id" : 22717,
                  "parentid" : 1023,
                  "title" : "流程一大队",
                  "parentTitle" : "支队",
                  "expand" : false,
                  "disabled" : false,
                  "disableCheckbox" : false,
                  "selected" : false,
                  "checked" : false,
                  "isDepart" : true,
                  "children" : [ {
                    "id" : 22718,
                    "parentid" : 22717,
                    "title" : "流程1小队",
                    "parentTitle" : "支队>流程一大队",
                    "expand" : false,
                    "disabled" : false,
                    "disableCheckbox" : false,
                    "selected" : false,
                    "checked" : false,
                    "isDepart" : true,
                    "children" : [ ],
                    "childNum" : 0
                  } ],
                  "childNum" : 1
                }, {
                  "id" : 2602,
                  "parentid" : 1023,
                  "title" : "三大队",
                  "parentTitle" : "支队",
                  "expand" : false,
                  "disabled" : false,
                  "disableCheckbox" : false,
                  "selected" : false,
                  "checked" : false,
                  "isDepart" : true,
                  "children" : [ {
                    "id" : 2703,
                    "parentid" : 2602,
                    "title" : "小分队",
                    "parentTitle" : "支队>三大队",
                    "expand" : false,
                    "disabled" : false,
                    "disableCheckbox" : false,
                    "selected" : false,
                    "checked" : false,
                    "isDepart" : true,
                    "children" : [ ],
                    "childNum" : 0
                  } ],
                  "childNum" : 1
                } ],
                "childNum" : 3
              }, {
                "id" : 2686,
                "parentid" : 1,
                "title" : "研发部门",
                "parentTitle" : "总机构",
                "expand" : false,
                "disabled" : false,
                "disableCheckbox" : false,
                "selected" : false,
                "checked" : false,
                "isDepart" : true,
                "children" : [ {
                  "id" : 19659,
                  "parentid" : 2686,
                  "title" : "算法组",
                  "parentTitle" : "研发部门",
                  "expand" : false,
                  "disabled" : false,
                  "disableCheckbox" : false,
                  "selected" : false,
                  "checked" : false,
                  "isDepart" : true,
                  "children" : [ ],
                  "childNum" : 0
                }, {
                  "id" : 19680,
                  "parentid" : 2686,
                  "title" : "前端组",
                  "parentTitle" : "研发部门",
                  "expand" : false,
                  "disabled" : false,
                  "disableCheckbox" : false,
                  "selected" : false,
                  "checked" : false,
                  "isDepart" : true,
                  "children" : [ ],
                  "childNum" : 0
                }, {
                  "id" : 19681,
                  "parentid" : 2686,
                  "title" : "后端组",
                  "parentTitle" : "研发部门",
                  "expand" : false,
                  "disabled" : false,
                  "disableCheckbox" : false,
                  "selected" : false,
                  "checked" : false,
                  "isDepart" : true,
                  "children" : [ ],
                  "childNum" : 0
                }, {
                  "id" : 19682,
                  "parentid" : 2686,
                  "title" : "UI组",
                  "parentTitle" : "研发部门",
                  "expand" : false,
                  "disabled" : false,
                  "disableCheckbox" : false,
                  "selected" : false,
                  "checked" : false,
                  "isDepart" : true,
                  "children" : [ ],
                  "childNum" : 0
                }, {
                  "id" : 19683,
                  "parentid" : 2686,
                  "title" : "产品组",
                  "parentTitle" : "研发部门",
                  "expand" : false,
                  "disabled" : false,
                  "disableCheckbox" : false,
                  "selected" : false,
                  "checked" : false,
                  "isDepart" : true,
                  "children" : [ ],
                  "childNum" : 0
                }, {
                  "id" : 19684,
                  "parentid" : 2686,
                  "title" : "测试组",
                  "parentTitle" : "研发部门",
                  "expand" : false,
                  "disabled" : false,
                  "disableCheckbox" : false,
                  "selected" : false,
                  "checked" : false,
                  "isDepart" : true,
                  "children" : [ ],
                  "childNum" : 0
                }, {
                  "id" : 19685,
                  "parentid" : 2686,
                  "title" : "运维组",
                  "parentTitle" : "研发部门",
                  "expand" : false,
                  "disabled" : false,
                  "disableCheckbox" : false,
                  "selected" : false,
                  "checked" : false,
                  "isDepart" : true,
                  "children" : [ ],
                  "childNum" : 0
                }, {
                  "id" : 19686,
                  "parentid" : 2686,
                  "title" : "项目管理组",
                  "parentTitle" : "研发部门",
                  "expand" : false,
                  "disabled" : false,
                  "disableCheckbox" : false,
                  "selected" : false,
                  "checked" : false,
                  "isDepart" : true,
                  "children" : [ ],
                  "childNum" : 0
                }, {
                  "id" : 19687,
                  "parentid" : 2686,
                  "title" : "售前组",
                  "parentTitle" : "研发部门",
                  "expand" : false,
                  "disabled" : false,
                  "disableCheckbox" : false,
                  "selected" : false,
                  "checked" : false,
                  "isDepart" : true,
                  "children" : [ ],
                  "childNum" : 0
                }, {
                  "id" : 19688,
                  "parentid" : 2686,
                  "title" : "售后组",
                  "parentTitle" : "研发部门",
                  "expand" : false,
                  "disabled" : false,
                  "disableCheckbox" : false,
                  "selected" : false,
                  "checked" : false,
                  "isDepart" : true,
                  "children" : [ ],
                  "childNum" : 0
                }, {
                  "id" : 19689,
                  "parentid" : 2686,
                  "title" : "数据分析组",
                  "parentTitle" : "研发部门",
                  "expand" : false,
                  "disabled" : false,
                  "disableCheckbox" : false,
                  "selected" : false,
                  "checked" : false,
                  "isDepart" : true,
                  "children" : [ ],
                  "childNum" : 0
                } ],
                "childNum" : 11
              }, {
                "id" : 328,
                "parentid" : 1,
                "title" : "河北寄递项目部门测试",
                "parentTitle" : "总机构",
                "expand" : false,
                "disabled" : false,
                "disableCheckbox" : false,
                "selected" : false,
                "checked" : false,
                "isDepart" : true,
                "children" : [ {
                  "id" : 26053,
                  "parentid" : 328,
                  "title" : "测试部门",
                  "parentTitle" : "河北寄递项目部门测试",
                  "expand" : false,
                  "disabled" : false,
                  "disableCheckbox" : false,
                  "selected" : false,
                  "checked" : false,
                  "isDepart" : true,
                  "children" : [ ],
                  "childNum" : 0
                }, {
                  "id" : 330,
                  "parentid" : 328,
                  "title" : "935分管单位",
                  "parentTitle" : "河北寄递项目部门测试",
                  "expand" : false,
                  "disabled" : false,
                  "disableCheckbox" : false,
                  "selected" : false,
                  "checked" : false,
                  "isDepart" : true,
                  "children" : [ ],
                  "childNum" : 0
                }, {
                  "id" : 331,
                  "parentid" : 328,
                  "title" : "审批部门",
                  "parentTitle" : "河北寄递项目部门测试",
                  "expand" : false,
                  "disabled" : false,
                  "disableCheckbox" : false,
                  "selected" : false,
                  "checked" : false,
                  "isDepart" : true,
                  "children" : [ ],
                  "childNum" : 0
                }, {
                  "id" : 332,
                  "parentid" : 328,
                  "title" : "厅领导部门",
                  "parentTitle" : "河北寄递项目部门测试",
                  "expand" : false,
                  "disabled" : false,
                  "disableCheckbox" : false,
                  "selected" : false,
                  "checked" : false,
                  "isDepart" : true,
                  "children" : [ ],
                  "childNum" : 0
                }, {
                  "id" : 329,
                  "parentid" : 328,
                  "title" : "申请单位",
                  "parentTitle" : "河北寄递项目部门测试",
                  "expand" : false,
                  "disabled" : false,
                  "disableCheckbox" : false,
                  "selected" : false,
                  "checked" : false,
                  "isDepart" : true,
                  "children" : [ ],
                  "childNum" : 0
                } ],
                "childNum" : 5
              } ],
              "childNum" : 4
            }
        ],
        searchData:{
          page:{
            totalElements: 0,
            size: 10,
            pageNumber:1,
            sort: "lastModifyTime,desc"
          },
          del: 0,
          id:""
        },
      }
    },
    methods:{
      //列表请求
      async getDataList(sendData){
        this.showLoading = true;
        this.searchData.del = this.filter;
        await getAllDepart(sendData,this.addForm.parent.id,this.searchInfo)
          .then(res=>{
            this.showLoading = false;
            if(res.statusCode !== 200) return process_error(res);
            if(res.data.content.length === 0){
              this.searchData['page']['totalElements'] = 0;
              this.searchData['page']['pageNumber'] = 1;
              this.searchData['page']['size'] = 10;
            }
            this.DepartmentData = res.data.content;
            this.searchData.page.totalElements = res.data.totalElements;
          })
      },
      //部门树
      async getDepartTree(){
        await departTree()
          .then(res=>{
            if(res.statusCode !== 200) return process_error(res);
            this.treeData = res.data;
            this.treeData[0].expand = true;
            this.treeData[0].selected = true;
            this.treeData[0].checkted = true;
            this.addForm.parent.id =  this.treeData[0].id;
            this.addForm.parent.dname = this.treeData[0].title;
          })
      },
      // 分页及复合搜索处理
      pageChangeFn(page) {
        this.searchData['page']['pageNumber'] = page.pageNumber;
        this.searchData['page']['size'] = page.size;
        this.getDataList(this.searchData)
      },
      search(){
        this.searchData.page.pageNumber = 1;
        this.getDataList(this.searchData);
      },
      treeSelect(){
        let domNode = this.$refs.treeDepart;
        if(!!domNode && domNode.getSelectedNodes().length !== 0){
          if(this.$refs.treeDepart.getSelectedNodes()[0].parentid == 0){
            this.searchData.id = "";
            this.addForm.parent.id = this.$refs.treeDepart.getSelectedNodes()[0].id;
          }else{
            this.searchData.id = this.addForm.parent.id = this.$refs.treeDepart.getSelectedNodes()[0].id;
          }
          this.addForm.parent.dname = this.$refs.treeDepart.getSelectedNodes()[0].title;
        }else{
          this.searchData.id = this.addForm.parent.id = "";
        }
        this.searchData['page']['pageNumber'] = 1;
        this.searchData['page']['size'] = 10;
        this.getDataList(this.searchData);
      },
      radioSelect(){
        this.getDataList(this.searchData);
      },
      addModal(){
        this.treeSelect();
        this.header = '新增机构信息';
        this.addForm.id ='';
        this.addDepart = true;
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.save(this.addForm);
          }else{
            this.$Message.error('校验失败!');
          }
        })
      },
      sortFun(arr){
        for(let i = 0;i < arr.length; i++){
            arr[i].expand=true;
          if(arr[i].id == this.addForm.parent.id ){
            arr[i].selected=true;
            arr[i].checked = true;
            return;
          }else{
            if(arr[i].children){
                this.sortFun(arr[i].children);
            }
          }
        }
      },
      handleReset (name) {
        this.addDepart = false;
        this.$refs[name].resetFields();
      },
     async save(data) {
      this.showLoading = true;
      await saveDepart(data)
        .then(res=>{
            if(res.statusCode !== 200) return process_error(res);
            this.showLoading = false;
            this.$Message.success(res.message);
            this.$refs['addForm'].resetFields();
            this.addDepart=false;
            departTree().then(response => {
              this.treeData = response.data;
              this.treeData[0].expand = true;
              this.sortFun(this.treeData);
              this.getDataList(this.searchData);
            })
        })
        .catch(err => {
          this.showLoading = false;
        })
    },
      reset(){

        this.searchInfo={
          ddesc:'',
          dname:'',
        }
        this.$refs['searchInfo'].resetFields();
        this.getDataList(this.searchData);
      },
      async updateModalSign(data){
        this.addDepart = true;
        this.addForm['id'] = data.id;
        this.addForm['dname'] = data.dname;
        this.addForm.parent.id = data.parentid;
        this.addForm.parent.dname = data.parentDname;
        this.addForm['ddesc'] = data.ddesc;
        this.addForm['remark'] = data.remark;
        this.header='编辑机构信息';
      },
      //编辑
      editData(row){
         this.updateModalSign(row);
      },
      //删除
      async delData(id){
        this.showLoading = true;
        await delDepart(id)
          .then(res => {
            this.showLoading = false;
            this.$Message.success(res.message);
            if(res.statusCode === 200){
              this.getDepartTree();
              this.getDataList(this.searchData);
            }
          })
          .catch(err => {
            this.showLoading = false;
          })
      },
      async recoverData(id){
        this.showLoading = true;
        await recoverDepart(id)
          .then(res => {
            this.showLoading = false;
            this.$Message.success(res.message);
            if(res.statusCode === 200){
              this.getDepartTree();
              this.getDataList(this.searchData);
            }
          })
          .catch(err => {
            this.showLoading = false;
            //this.$Message.error(err);
          })
      },
      async sortClick(column){
        if(column.order != 'normal'){
          this.searchData.page.sort=(column.key+","+column.order);
        }
        this.getDataList(this.searchData);
      }
    },
    mounted(){
      // // this.treeData=this.treeData[data];
      // this.treeData[0].expand = true;
      // this.treeData[0].selected = true;
      // this.treeData[0].checkted = true;
      this.getDepartTree();
      this.getDataList(this.searchData);
      // this.tableHeight = this.$tools.autoHeight('main-content',180);
      // this.$refs.treeDepart.$el.style.height = (this.tableHeight + 52) + 'px';
      // window.onresize = ()=>{
      //     this.tableHeight = this.$tools.autoHeight('main-content',180)
      //     this.$refs.treeDepart.$el.style.height = (this.tableHeight + 52) + 'px';
      // };
    }
  }
</script>
<style lang="less" scoped>
  #cls-part{
    width: 100%;
    height: calc(100% - 50px);
    padding: 15px;
  }
  #cls-part-content{
    width: 100%;
    height:100%;
  }
  #left-tree{
    height:calc(100% - 30px) ;

  }
  .deparDox {
    width: 100%;
    height:100%;
    overflow: hidden;
    .ivu-form-item {
      margin-bottom: 2px;
    }
    .ivu-input-wrapper textarea{
      font-size: 6px
    }
    .ivu-modal-content .ivu-form-item{
      margin-bottom: 18px
    }
  }
 #cls-tree{
   height: 100%;
   overflow: auto;
 }
</style>
