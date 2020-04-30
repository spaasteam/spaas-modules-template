<template>
  <div ref="rightPanel" :class="{show: show}" class="rightPanel-container">
    <div class="rightPanel-background" />
    <div class="rightPanel">
      <div class="handle-button" :style="{top: buttonTop + 'px'}" @click="show = !show">
        <i :class="show ? 'el-icon-close' : 'el-icon-question'" />
      </div>
      <div class="rightPanel-items">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="tsx">
import {Vue, Component, Prop, Emit, Watch} from 'vue-property-decorator';
import {addClass, removeClass} from '@/utils/utils.js';

export default class RightPanel extends Vue {
  private show = false;

  @Prop({default: false}) readonly clickNotClose: Boolean;

  @Prop({default: 250}) readonly buttonTop: Number;

  mounted() {
    this.insertToBody();
  }

  beforeDestroy() {
    const elx = this.$refs.rightPanel as any;
    elx.remove();
  }

  @Emit()
  addEventClick() {
    window.addEventListener('click', this.closeSidebar);
  }

  @Emit()
  closeSidebar(evt) {
    const parent = evt.target.closest('.rightPanel');
    if (!parent) {
      this.show = false;
      window.removeEventListener('click', this.closeSidebar);
    }
  }

  @Emit()
  insertToBody() {
    const elx = this.$refs.rightPanel as any;
    const body = document.querySelector('body');
    body.insertBefore(elx, body.firstChild);
  }

  @Watch('show')
  @Emit()
  // watch事件用on[xxx]Change 写
  onshowChange(value: string): void {
    if (value && !this.clickNotClose) {
      this.addEventClick();
    }
    if (value) {
      addClass(document.body, 'showRightPanel');
    } else {
      removeClass(document.body, 'showRightPanel');
    }
  }
}
</script>

<style>
.showRightPanel {
  overflow: hidden;
  position: relative;
  width: calc(100% - 15px);
}
</style>

<style lang="less" scoped>
.rightPanel-background {
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  background: rgba(0, 0, 0, 0.2);
  z-index: -1;
}

.rightPanel {
  width: 100%;
  max-width: 340px;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
  transform: translate(100%);
  background: #fff;
  z-index: 40000;
}

.show {
  transition: all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);

  .rightPanel-background {
    z-index: 20000;
    opacity: 1;
    width: 100%;
    height: 100%;
  }

  .rightPanel {
    transform: translate(0);
  }
}

.handle-button {
  width: 48px;
  height: 48px;
  position: absolute;
  left: -48px;
  background-color: @primary-color;
  text-align: center;
  font-size: 24px;
  border-radius: 6px 0 0 6px !important;
  z-index: 0;
  pointer-events: auto;
  cursor: pointer;
  color: #fff;
  line-height: 48px;
  i {
    font-size: 24px;
    line-height: 48px;
  }
}
</style>
