<template>
  <div class="icons-container">
    <aside>
      <a
        href="https://panjiachen.github.io/vue-element-admin-site/guide/advanced/icon.html"
        target="_blank"
        >Add and use</a
      >
    </aside>
    <el-tabs type="border-card">
      <el-tab-pane label="Icons">
        <div
          v-for="item of svgIcons"
          :key="item"
          @click="handleClipboard(generateIconCode(item), $event)"
        >
          <el-tooltip placement="top">
            <div slot="content">{{ generateIconCode(item) }}</div>
            <div class="icon-item">
              <svg-icon :icon-class="item" class-name="disabled" />
              <span>{{ item }}</span>
            </div>
          </el-tooltip>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Element-UI Icons">
        <div
          v-for="item of elementIcons"
          :key="item"
          @click="handleClipboard(generateElementIconCode(item), $event)"
        >
          <el-tooltip placement="top">
            <div slot="content">{{ generateElementIconCode(item) }}</div>
            <div class="icon-item">
              <i :class="'el-icon-' + item" />
              <span>{{ item }}</span>
            </div>
          </el-tooltip>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import {Tabs, TabPane} from '@femessage/element-ui';
import {Vue, Component, Emit} from 'vue-property-decorator';
import clipboard from '~/utils/clipboard';
import svgIcons from './svg-icons';
import elementIcons from './element-icons';

@Component({
  [Tabs.name]: Tabs,
  [TabPane.name]: TabPane,
})
export default class Icons extends Vue {
  svgIcons = svgIcons;
  elementIcons = elementIcons;
  @Emit()
  generateIconCode(symbol: string) {
    return `<svg-icon icon-class="${symbol}" />`;
  }
  @Emit()
  generateElementIconCode(symbol: string) {
    return `<i class="el-icon-${symbol}" />`;
  }
  @Emit()
  handleClipboard(text: any, event: any) {
    console.error(event);
    clipboard(text, event);
  }
}
</script>

<style lang="less" scoped>
.icons-container {
  margin: 10px 20px 0;
  overflow: hidden;

  .icon-item {
    margin: 20px;
    height: 85px;
    text-align: center;
    width: 100px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
  }

  span {
    display: block;
    font-size: 16px;
    margin-top: 10px;
  }

  .disabled {
    pointer-events: none;
  }
}
</style>
