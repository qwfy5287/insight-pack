<!--
名称：对话框-导入Excel
版本：1.0.0
作者：林加炳
时间：2021
-->
<template>
  <div class="ins-dialog-import">
    <!-- {{ msg }} -->
    <ins-dialog-edit
      ref="insDialogEditRef"
      :title-full="'从Excel导入'"
      :ok-text="'导 入'"
      @save="save"
    >
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
        <el-form-item label="文件">
          <el-upload
            ref="elUpload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-upload="beforeUpload"
            :before-remove="beforeRemove"
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :auto-upload="false"
            :on-success="handleSuccess"
            :on-error="handleError"
            :on-change="handleChange"
            :action="uploadUrl"
            name="file"
            class="upload-demo"
            :data="elUploadData"
            :headers="headers"
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
  props: {
    /**
     * 上传地址
     */
    uploadUrl: { type: String, required: true },
    /**
     * 下载模板地址
     */
    downloadUrl: { type: String, required: true },
    /**
     * 请求头部 token 等
     */
    headers: { type: Object, default: () => {} },
  },
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
      // uploadUrl: null,
      // downloadUrl: null,
      loading: false,
      /**
       * 上传时附带的额外参数
       */
      elUploadData: null,
    })

    const edit = (item) => {
      state.elUploadData = item
      ctx.refs.insDialogEditRef.edit()
    }

    const save = () => {
      let result = false
      ctx.refs['ruleForm'].validate((valid) => {
        if (valid) {
          // result = this.ruleForm
          // this.$emit('save', result)
          // ctx.refs.elUpload.data.labelLibraryId = this.ruleForm.labelId

          if (ctx.refs.elUpload.uploadFiles.length) {
            try {
              state.loading = true
              ctx.refs.elUpload.submit()
              state.loading = false
            } catch (error) {
              state.loading = false
            }
          } else {
            ctx.root.$message.error('请选择文件')
          }

          // this.dialogVisible = false
        } else {
          result = false
        }
      })
      return result
    }
    const beforeUpload = (a, b, c) => {}
    const handleRemove = (file, fileList) => {
      console.log(file, fileList)
    }
    const handlePreview = (file) => {
      console.log(file)
    }
    const handleExceed = (files, fileList) => {
      // this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      ctx.root.$message.warning(`当前限制选择 1 个文件`)
    }
    const beforeRemove = (file, fileList) => {
      return ctx.root.$confirm(`确定移除 ${file.name}？`)
    }
    const handleSuccess = (res, file, fileList) => {
      state.loading = false

      if (res?.code === '20000') {
        ctx.root.$message.success(res.msg || '操作成功。')
        ctx.emit('save')
        ctx.refs.insDialogEditRef.close()
      } else {
        ctx.root.$message.error(`${res.msg}，请重新选择文件。`)
        ctx.refs.elUpload.clearFiles()
      }

      // // if (res) {
      // // if (res.errorCode === 200) {
      // if (res === '') {
      //   ctx.root.$message(res || '操作成功。')
      //   ctx.emit('save')
      //   // state.dialogVisible = false
      //   ctx.refs.insDialogEditRef.edit()
      // } else if (res?.msg) {
      //   ctx.root.$message.error(`${res.msg}，请重新选择文件。`)
      //   ctx.refs.elUpload.clearFiles()
      // } else {
      //   ctx.root.$message(res || '操作成功。')
      //   ctx.emit('save')
      //   // this.dialogVisible = false
      // }
      // }
    }
    const handleError = (errinfo, file, fileList) => {
      state.loading = false
      let message = '内部异常，请重新上传正确的模板文件。'
      if (errinfo?.message) {
        message = JSON.parse(errinfo?.message)?.message
      }
      ctx.emit('save')
      ctx.root.$message.error(message)
    }
    const handleChange = (file) => {
      if (!(file && (file.name.includes('xlsx') || file.name.includes('xls')))) {
        ctx.root.$message.error(`仅允许导入 ”xls“ 或 ”xlsx“ 格式的文件，请重新选择文件。`)
        ctx.refs.elUpload.clearFiles()
      }
    }

    const render = () => {
      //
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
      save,
      beforeUpload,
      handleRemove,
      handlePreview,
      handleExceed,
      beforeRemove,
      handleSuccess,
      handleError,
      handleChange,
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
