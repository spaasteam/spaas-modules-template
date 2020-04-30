<script lang="tsx">
import {Vue, Component, Prop, Emit} from 'vue-property-decorator';
import img404 from './images/404.png';

@Component({})
export default class NotExit extends Vue {
  private img404;

  @Prop(Function) readonly goIndex;

  @Emit()
  goBackToIndex() {
    if (this.goIndex) {
      this.goIndex();
    } else {
      this.$router.replace('/');
    }
  }

  protected render() {
    return (
      <div class="not-exit-component">
        <img src={img404} alt="404" class="img-block" />
        <p class="sorry-info">抱歉，你访问的页面不存在</p>
        <el-button type="primary" onclick={this.goBackToIndex}>
          返回首页
        </el-button>
      </div>
    );
  }
}
// export default {
//   props: {
//     goIndex: Function,
//   },
//   data() {
//     return {
//       img404,
//     };
//   },
//   methods: {
//     goBackToIndex() {
//       if (this.goIndex) {
//         this.goIndex();
//       } else {
//         this.$router.replace('/');
//       }
//     },
//   },
// };
</script>
<style lang="less">
.not-exit-component {
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
