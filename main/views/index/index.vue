<template>
  <div class="index">
    <img :src="introduction" alt="业务中台" />
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import introduction from './images/introduction.png';
@Component({})
export default class Index extends Vue {
  introduction = introduction;
}
</script>

<style lang="less" scoped>
.index {
  height: calc(100vh - 130px);
  background: #f7f8fb;
  background-size: 100%, auto;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  > img {
    width: 523px;
    height: 132px;
  }
}
</style>
