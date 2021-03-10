<!--
InsTemplate 模板 composition api
默认是页面
  app-container
-->
<template>
  <!-- 自定义组件-->
  <el-table-column v-bind="$attrs" class-name="ins-table-column-meta-data">
    <template #default="{ row }">
      <div class="py-2">
        <div>
          <ins-status active="01" />
          <span class="font-bold text-gray-800 ml-1.5"> {{ row['resourceName'] }}</span>
          <el-rate
            class="-top-0.5 el-rate inline-block ml-2.5 relative "
            :value="4"
            disabled
            show-score
          />
          分
        </div>
        <el-row>
          <el-col :span="18">
            <div class="ellipsis-two mr-5 my-5 text-gray-700">
              {{ row['resourceDigest'] }}
            </div>
          </el-col>
          <el-col :span="4">
            <div>
              <span class="block font-bold mt-5 text-center text-gray-700 text-lg">
                {{ 308090 }}</span
              >
            </div>
            <div class="mt-1.5 text-center text-gray-500 text-xs">{{ '资源容量' }}</div>
          </el-col>
          <!-- <el-col :span="8">ss</el-col> -->
        </el-row>
        <div class="text-gray-500">
          <span class="mr-3">
            <i class="iconfont icon-user mr-1" />{{ row['resourceProviderName'] }}
          </span>
          <span class="mr-3"> <i class="iconfont icon-phone  mr-1" />{{ '18009878988' }} </span>
          <span class="mr-3"> <i class="iconfont icon-time-o  mr-1" />{{ '3个月前' }} </span>
          <span class="mr-3"> <i class="iconfont icon-message  mr-1" />{{ '外勤部' }} </span>
        </div>

        <!-- {{ item.prop }} -->
        <!-- {{ item }} -->
        <!-- {{ $attrs }} -->
        <!-- {{ column.property }} -->
        <!-- {{ row[column.property] }} 内容 -->
      </div>
    </template>
  </el-table-column>
</template>
<script>
import { defineComponent, onMounted, toRefs, reactive } from '@vue/composition-api'
// component
import InsStatus from '../InsStatus.vue'

// common
// api
export default defineComponent({
  name: 'InsTableColumnMetaData',
  components: { InsStatus },
  props: {},
  data() {
    return {}
  },
  setup(props, ctx) {
    let state = reactive({
      msg: 'hello',
    })
    //#region common
    //#endregion
    /**
     * 渲染页面
     */
    const render = () => {}
    /**
     * 获取数据
     */
    const fetchData = async () => {
      // stateEdit.loading.value = true
      // let res = null
      // if (ctx.root.$route.query.pkid) {
      //   res = await roleDetail({ pkid: ctx.root.$route.query.pkid })
      // }
      // state.item = res?.data
      // stateEdit.loading.value = false
    }
    /**
     * 初始化
     */
    const init = async () => {
      render()
      await fetchData()
    }
    onMounted(() => {
      init()
    })
    return {
      ...toRefs(state),
    }
  },
})
</script>
<style lang="scss">
.ins-table-column-meta-data {
  visibility: initial;
  font-size: 14px;
}
</style>
