<!--
 * @Description: main layout 布局
 * @Author: barret
 * @Date: 2019-08-05 14:24:09
 * @LastEditTime: 2020-05-15 11:24:53
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-container direction="vertical">
    <!-- 头部导航 -->
    <LayoutHead />
    <el-container>
      <!-- 侧边栏 -->
      <Sidebar />
      <el-container class="main-container" direction="vertical">
        <!-- 页面 header -->
        <VBreadcrumb v-if="hasHeader" class="nuxt-header main-breadcurmb" />
        <AppOptions v-if="hasAppOptions" @changeShowStatus="changeShowStatus" />
        <el-main class="nuxt-main">
          <div
            :class="{
              'nuxt-content': true,
              'medium-height': !hasHeader && !hasAppOptions,
              'small-height': hasHeader && !hasAppOptions,
              'min-height': hasHeader && hasAppOptions
            }"
          >
            <nuxt />
            <el-footer class="footer-container" height="40px">
              <Copyright />
            </el-footer>
          </div>
        </el-main>
      </el-container>
    </el-container>

    <CopyModule v-if="ifShowCopyModule" />
  </el-container>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'
import { mapState } from 'vuex'
import Copyright from '@/components/copyright.vue'
import LayoutHead from '@/components/layoutHead/index.vue'
import VBreadcrumb from './components/breadcrumb/index.vue'
import AppOptions from './components/app-options/index.vue'
import Sidebar from './components/sidebar.vue'
import CopyModule from './components/copy-module/index.vue'
import breadCrumbMixin from '@/mixins/breadcrubMixin'
import { hasSelectApp } from '../../../spaas.config'

// @ts-ignore
@Component({
  components: {
    Copyright,
    LayoutHead,
    Sidebar,
    VBreadcrumb,
    AppOptions,
    CopyModule
  }
})
export default class Layout extends Mixins(breadCrumbMixin as any) {
  // @ts-ignore
  @Prop({ default: process.env.NODE_ENV !== 'production' }) readonly ifNotProduction!: boolean;

  created(this: any) {
    const { path, name } = this.$route
    this.ifShowCopyModule = process.env.COPY_MODULE
    this.showAppOptions = true
    this.hasHeader = path !== '/' && name !== 'all'
    this.hasAppOptions = hasSelectApp && path !== '/'
  }

  ifShowCopyModule: any = null;
  showAppOptions = false;
  hasHeader: any = null;
  hasAppOptions: any = null;

  // @ts-ignore
  @Watch('$route', {
    immediate: true
  })
  onRouteChanged(this: any) {
    const { path, name } = this.$route
    this.hasHeader = path !== '/' && name !== 'all'
    this.showAppOptions = true
    this.$nextTick(() => {
      this.hasAppOptions = hasSelectApp && path !== '/' && this.showAppOptions
    })
  }

  changeShowStatus(ifShow) {
    this.showAppOptions = ifShow
  }
}
</script>
<style lang="less">
#__nuxt {
  // 最小宽度，防止屏幕缩小顶部栏会变形
  min-width: 900px;
  @title-bg: rgba(242, 244, 249, 1);
  @menu-height: 50px;
  @primary-color: #1890ff;
  @main-bg: #f7f8fb;

  .el-header,
  .el-main {
    padding: 0;
  }
  .el-footer {
    background: @main-bg;
  }

  .nuxt-header {
    line-height: 60px;
    padding-left: 20px;
    transition: margin-left 0.28s;
  }

  // 主体区域 Main container
  .main-container {
    background: @main-bg;
  }

  .nuxt-main {
    position: relative;
    box-sizing: border-box;
    background: @main-bg;
  }

  .nuxt-content {
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    margin-bottom: 40px;
    background: #fff;
    padding: 20px 20px 10px;
  }

  .footer-container {
    position: absolute;
    bottom: -40px;
    left: 0;
    right: 0;
  }

  .medium-height {
    min-height: calc(100vh - 140px);
  }
  .small-height {
    min-height: calc(100vh - 190px);
  }
  .min-height {
    min-height: calc(100vh - 240px);
  }
}
</style>
