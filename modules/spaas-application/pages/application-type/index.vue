<script lang="tsx">
import { Vue, Component, Emit } from 'vue-property-decorator'

@Component({})
export default class AppType extends Vue {
  created() {
    console.log(
      this.$api.petstore.pet.findPetsByStatus
        .request({
          status: 'sold'
        })
        .then(res => {
          console.log(res)
        }),
      '11'
    )
  }

  render() {
    return <div>22</div>
  }
}
</script>

<style scoped lang="less"></style>
