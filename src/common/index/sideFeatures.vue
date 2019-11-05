<template>
  <div class="sideFeatures">
    <transition name="move" mode="out-in">
      <div
        class="agentTaskBox"
        :class="{'open':bool,'close':!bool}"
        ref="agentTaskBox"
        @click="goFlowCenter"
      >
        <div class="agentTask">
          <Badge class-name="badgeCount" overflow-count="999" :count="agentTaskCount"></Badge>
          <i class="icon-tuding"></i>
          <p class="vertical">{{agentTask}}</p>
        </div>
        <ul class="agentContent">
          <li v-for="(item,index) in agentMessage" :key="index">
            <span>
              <Icon :type="item.icon" size="14"/>
              <i class="content">{{item.text}}</i>
            </span>
            <span
              style="display:inline-block;padding:2px 5px;border:1px solid #c23869;border-radius:3px;background:#c23869;color:#ffedfa;"
            >{{item.count}}</span>
          </li>
        </ul>
      </div>
    </transition>
    <div class="feedback" @click="showFeedbackModal">
      <i class="icon-yijianfankui"></i>
      <p class="vertical">{{feedback}}</p>
    </div>
    <!-- 反馈意见 -->
    <Modal
      v-model="feedbackModal"
      :transition-names="transitionNames"
      draggable
      class-name="ModalIviewStyleReset"
      title="反馈意见"
    >
      <Form :model="feedbackForm" ref="feedbackForm" :label-width="80">
        <FormItem label="姓名：">
          <Input v-model="feedbackForm.name" style="width:230px;" placeholder="请输入姓名" readonly></Input>
        </FormItem>
        <FormItem label="单位：">
          <Input v-model="feedbackForm.deptName" style="width:230px;" placeholder="请输入单位" readonly></Input>
        </FormItem>
        <FormItem label="日期：">
          <DatePicker
            type="date"
            style="width:230px;"
            format="yyyy-MM-dd"
            placeholder="请填写日期"
            :value="defaultTime"
            @on-change="feedbackForm.sDate = $event"
          ></DatePicker>
        </FormItem>
        <FormItem label="内容：">
          <Input
            v-model="feedbackForm.content"
            placeholder="请输入内容"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
          ></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button
          style="margin-right:10px;background:#1d3261;border-color:#23b7bb;color:#fff;"
          @click="feedbackModalConfirm('feedbackForm')"
        >提交</Button>
        <Button
          style="background:#1d3261;border-color:#23b7bb;color:#fff;"
          @click="cancel('feedbackForm')"
        >取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { Message } from 'iview'
import { saveOpinion } from '@/service'
import { getStore } from '@/config/mUtils'
import { tools } from '@/util/tools'
import { process_error } from '@/config/process_request_conf'
export default {
    data() {
        return {
            agentTask: '待办任务',
            agentTaskCount: 0,
            feedbackModal: false,
            feedback: '反馈意见',
            feedbackForm: {
                content: '',
                sDate: '',
                name: '',
                deptId: '',
                departName: ''
            },
            departList: [{ label: '高新分局', value: '1' }],
            agentMessage: [
                { icon: 'ios-folder-outline', text: '高新审批', count: 23 },
                { icon: 'ios-folder-outline', text: '分局审批', count: 13 }
            ],
            bool: false,
            transitionNames: ['ease', 'fade'],
            userInfo: {},
            defaultTime: ''
        }
    },
    methods: {
        changeView() {
            return (this.bool = !this.bool)
        },
        goFlowCenter() {
            let url = `${window.allLinkURL.flowCenterURL}&cardId=${this.userInfo.cardId}`;
            window.open(url)
        },
        showFeedbackModal() {
            this.feedbackModal = true
            this.feedbackForm.sDate = this.defaultTime
            this.feedbackForm.name = this.userInfo.fullname
            this.feedbackForm.deptName = this.userInfo.departName
            this.feedbackForm.deptId = this.userInfo.departId
        },
        async feedbackModalConfirm(name) {
            try {
                let res = await saveOpinion(this.feedbackForm)
                if (res.statusCode !== 200) return process_error(res)
                Message.success('提交成功')
                this.cancel(name)
            } catch (err) {
                //console.log(err)
            }
        },
        async queryAgentTaskCount() {
            try {
                this.userInfo = JSON.parse(getStore('userInfo'))
                let res = await fetch(
                    `${window.location.origin}/out/getUndoCount?cardId=${this.userInfo.cardId}`
                )
                let content = await res.json()
                this.agentTaskCount = content.datas.undoCount || 0
            } catch (err) {
                //console.log(err)
            }
        },
        cancel(name) {
            this.feedbackModal = false
            Object.keys(this.feedbackForm).forEach(k => (this.feedbackForm[k] = ''))
        }
    },
    mounted() {
        this.defaultTime = tools
            .unix_change(new Date().getTime() / 1000 - 3600 * 24 * 90)
            .slice(0, 10)
        this.queryAgentTaskCount()
    }
}
</script>
<style lang="less">
@import '../../theme/skin/resetIview.less';
.sideFeatures {
  color: #edffe7;
  font-size: 15px;
  .feedback,
  .agentTask {
    right: 0;
    width: 45px;
    height: 175px;
    cursor: pointer;
    text-align: center;
    width: 40px;
    height: 175px;
    background: url("../assets/images/sideFeatures.png") no-repeat;
    background-size: contain;
  }
  .feedback {
    margin-top: 10px;
    padding-top: 20px;
    bottom: 30px;
    position: fixed;
  }
  .vertical {
    margin: 0 auto;
    width: 20px;
    line-height: 24px;
  }
  .open {
    right: 0px;
  }
  .close {
    right: -260px;
  }
  .agentTaskBox {
    height: 367px;
    width: 300px;
    position: fixed;
    bottom: 30px;
    display: flex;
    .agentContent {
      width: 280px;
      border: 1px solid #2f4abb;
      height: 367px;
      display: flex;
      cursor: pointer;
      .agentContent{
        width:280px;
        border:1px solid #2f4abb;
        height:367px;
        display:flex;
        overflow-y:auto;
        flex-direction:column;
        background:#0e2456;
        color:#eff2ff;
        >li{
          list-style: none;
          height:30px;
          font-size:12px;
          line-height: 30px;
          display: flex;
          justify-content: space-between;
          padding:0px 15px;
          margin:5px 0;
          .content{
            font-style: normal;
            font-size:12px;
            padding-left:10px;
            vertical-align: middle;
          }
          &:hover{background: #132b67;}
        }
      }
    }
  }
  .agentTask {
    bottom: 220px;
    padding-top: 25px;
  }
  .ivu-badge {
    top: 0px;
    left: -6px;
    position: absolute;
  }
  i {
    font-size: 16px;
  }
}
</style>
