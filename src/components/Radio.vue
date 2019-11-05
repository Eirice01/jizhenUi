<template>
    <div class="radio">
        <RadioGroup v-model="disabledGroup" style="color: black">
            <Radio label="设为主页">
            </Radio>
            <Radio label="加入收藏">
            </Radio>
        </RadioGroup>
    </div>
</template>

<script>
    export default {
        name: "radio",
        data() {
            return {
              disabledGroup:'设为主页'
            }
        },
        methods: {}
    }
</script>

<style scoped lang="less">
.ivu-radio-wrapper{
  font-size: 14px;
}
</style>
