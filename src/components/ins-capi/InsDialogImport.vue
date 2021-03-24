<!--
名称：对话框-导入Excel
版本：1.0.0
作者：林加炳
时间：2021
-->
<template>
  <div class="ins-dialog-import">
    <!-- {{ msg }} -->
    <ins-dialog-edit ref="insDialogEditRef" :title-full="'从Excel导入'" :ok-text="'导 入'">
      <el-form v-if="ruleForm" ref="ruleForm" :rules="rules" :model="ruleForm" label-width="180px">
        <el-form-item v-if="false" label="标签库" prop="labelId">
          <!-- select -->
          <!-- <el-select v-model="ruleForm.labelId" >
                <el-option v-for="option in labelDocumentOptions" :key="option.value" :label="option.label" :value="option.value" />
              </el-select> -->
          <span>
            123
            <!-- {{ getLabelActiveItem.label||'' }} -->
          </span>
        </el-form-item>
        <!-- :data="{labelLibraryId:null}" -->
        <el-form-item label="文件">
          <!-- :on-preview="handlePreview" -->
          <!-- :headers="headerToken" -->
          <!-- :on-change="handleChange" -->
          <!-- :on-error="handleError" -->
          <!-- :on-success="handleSuccess" -->
          <!-- :on-exceed="handleExceed" -->
          <!-- :before-remove="beforeRemove" -->
          <!-- :before-upload="beforeUpload" -->
          <!-- :on-remove="handleRemove" -->
          <el-upload
            ref="elUpload"
            :limit="1"
            :file-list="fileList"
            :auto-upload="false"
            :action="uploadUrl"
            name="file"
            class="upload-demo"
          >
            <el-button size="small" type="primary">选择文件</el-button>
            <div slot="tip">
              <div class="mt-5">
                <a :href="downloadUrl">
                  <el-button type="primary">下载模板</el-button>
                </a>
              </div>
              <div class="text-red-500 text-xs mt-3">
                提示：仅允许导入 ”xls“ 或 ”xlsx“ 格式的文件
              </div>
            </div>
          </el-upload>
        </el-form-item>
        <!-- <el-form-item label="" /> -->
        <!-- <el-form-item label="">
              <div class="el-upload__tip">提示：仅允许导入 ”xls“ 或 ”xlsx“ 格式的文件</div>
            </el-form-item> -->
        <div />
      </el-form>
    </ins-dialog-edit>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from '@vue/composition-api'

// component
import InsDialogEdit from './InsDialogEdit.vue'

// use

// common
// import merge from 'lodash/merge'
// import copy from 'fast-copy'

// api

export default defineComponent({
  name: 'InsDialogImport',
  components: {
    InsDialogEdit,
  },
  props: {},
  setup(props, ctx) {
    const state = reactive({
      msg: 'hello',
      ruleForm: {
        labelId: null,
        file: 123,
      },
      rules: {
        labelId: [{ required: true, message: '请选择标签库', trigger: 'change' }],
        file: [{ required: true, message: '请选择文件', trigger: 'change' }],
      },
      fileList: [
        // { name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }
      ],
      labelDocumentOptions: [],
      uploadUrl: null,
      downloadUrl: null,
    })

    const edit = () => {
      ctx.refs.insDialogEditRef.edit()
    }

    const render = () => {
      // statePage.setTableHead([
      //   {
      //     label: '标题',
      //     prop: 'speName',
      //   },
      //   {
      //     label: '备注',
      //     prop: 'speDesc',
      //   },
      // ])
    }

    const init = () => {
      render()
    }

    onMounted(() => {
      init()
    })

    return {
      ...toRefs(state),
      edit,
    }
  },
})
</script>

<style lang="scss" scoped>
.mt-5 {
  margin-top: 1.25rem;
}

.text-red-500 {
  --tw-text-opacity: 1;
  color: rgba(239, 68, 68, var(--tw-text-opacity));
}

.text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}

.mt-3 {
  margin-top: 0.75rem;
}

.ins-dialog-import {
  visibility: initial;
}
</style>
