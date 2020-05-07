<template>
  <div class="app-options" v-if="hasHide">
    <span class="app-options-title">当前应用：</span>
    <div class="select-container">
      {{ labelText }}
      <div class="select-icon">
        <svg-icon icon-class="down-triangle" />
      </div>
      <el-select
        v-model="curAppId"
        size="small"
        :disabled="loading || isDisabled"
        v-loading="loading"
        class="select"
      >
        <el-option v-for="app in appList" :key="app.value" :label="app.label" :value="app.value">
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import routeInfo from '@/const/route-info.json'
const NONE = '2'
const DISABLED = '3'

@Component
export default class AppOptions extends Vue {
  loading = false;
  labelText = '请选择';

  get centerId() {
    return this.$store.state.permission.centerId
  }

  get appList() {
    return this.$store.state.app.appList
  }

  get curAppId() {
    const appId = this.$store.state.app.appId
    const [currentApp] = this.appList.filter(({ value }) => value === appId)
    this.labelText = currentApp ? currentApp.label : '请选择'
    return appId && Number(appId)
  }

  set curAppId(value) {
    this.$store.commit('app/setAppId', value)
    const [currentApp] = this.appList.filter(({ value: val }) => val === value)
    this.$store.commit('app/setApp', currentApp)
  }

  get path() {
    return this.$route.path
  }

  get matchedPath() {
    const matched = this.$route.matched
    const len = matched.length
    return len ? (matched[len - 1] || {}).path : ''
  }

  get isDisabled() {
    const curInfo = routeInfo[this.matchedPath]
    return curInfo && curInfo.appType === DISABLED
  }

  get hasHide() {
    const curInfo = routeInfo[this.matchedPath]
    const ifShow = curInfo && curInfo.appType !== NONE
    this.$emit('changeShowStatus', ifShow)
    return ifShow
  }

  @Watch('centerId')
  onCenterIdChanged(value) {
    value && this.getList()
  }

  @Watch('curAppId')
  onCurAppIdChanged(value) {
    if (value && this.hasHide) {
      this.setQuery(value)
    }
  }

  @Watch('path')
  onPathChanged(newVal, oldVal) {
    if (newVal !== oldVal && this.hasHide) {
      this.curAppId && this.setQuery(this.curAppId)
    }
  }

  created() {
    if (this.hasHide) {
      this.centerId && this.getList()
    }
  }

  getList() {
    this.loading = true
    this.$store.dispatch('app/getAppList').finally(() => {
      this.loading = false
    })
  }

  setQuery(id) {
    this.$router.replace({
      query: { ...this.$route.query, appId: id }
    })
  }
}
</script>

<style lang="less">
.app-options {
  height: 40px;
  padding: 0 20px;
  display: flex;
  align-items: center;

  &-title {
    margin-right: 6px;
  }
}

.select-container {
  position: relative;
  display: inline-block;
  padding-right: 20px;
  min-width: 100px;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 32px;
  line-height: 32px;

  .select-icon {
    position: absolute;
    top: 0;
    right: 0;
  }

  .select {
    min-width: 200px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
  }
}
</style>
