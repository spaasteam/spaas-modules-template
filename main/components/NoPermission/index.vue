<script lang="tsx">
import {Vue, Component, Prop, Emit} from 'vue-property-decorator';
import noLimit from './images/noLimit.png';

@Component({})
export default class NoPermiss extends Vue {
  private noLimit;

  @Prop(Function) readonly goIndex;

  @Emit()
  goBackToIndex() {
    if (this.goIndex) {
      this.goIndex();
    } else {
      this.$router.replace('/');
    }
  }
  render() {
    return (
      <div class="no-permission-component">
        <img src={noLimit} alt="您暂时没有查看的权限" class="img-block" />
        <p class="sorry-info">抱歉，您暂时没有查看的权限</p>
        <el-button type="primary" onclick={this.goBackToIndex}>
          返回首页
        </el-button>
      </div>
    );
  }
}
</script>
<style lang="less">
.no-permission-component {
  text-align: center;
  .img-block {
    width: 120px;
    height: 120px;
    display: inline-block;
  }
  .sorry-info {
    height: 70px;
    line-height: 70px;
    color: #2d303b;
    font-size: 16px;
  }
}
</style>
