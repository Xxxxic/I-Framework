<template>
  <el-dialog v-model="$store.state.AddOpen" title="增加设备">
    <el-form 
        :model="form" 
        :rules="rules"
        ref="formRef"
    >
      <el-form-item label="设备id" :label-width="formLabelWidth" prop="id">
        <el-input v-model="form.id" autocomplete="off" />
      </el-form-item>
      <el-form-item label="设备名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="设备位置" :label-width="formLabelWidth" prop="location">
        <el-input v-model="form.location" autocomplete="off" />
      </el-form-item>
      <el-form-item label="预警信息" :label-width="formLabelWidth" prop="alert">
        <el-switch 
          v-model="form.alert" 
          active-value="true"
          inactive-value="false"
        />
        <!-- el-switch: https://blog.csdn.net/m0_46581222/article/details/120169700 -->
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="store.commit('AddOpen')">关闭</el-button>
        <el-button type="primary" @click="onSubmit(formRef)">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormRules, FormInstance } from "element-plus";
import { useStore } from "vuex";
import url from '../../../api/api.js'
import link from '../../../api/link.js'
let store = useStore();

const formRef = ref<FormInstance>('')
// const dialogFormVisible = ref(true);
// 采用在store的全局开关
const formLabelWidth = "140px";

const form = reactive({
  id: "",
  name: "",
  location: "",
  alert: "false",
});
// 设置表单验证规则 参考：https://blog.zixutech.cn/archives/718
// 还没设置正则表达式 pattern
const rules=reactive<FormRules>({
    id: [
        { required: true, message: '请输入正确的设备id', trigger: 'blur' },
    ],
    name: [
        { required: true, message: '请输入正确的设备名称', trigger: 'blur' },
    ],
    location: [
        { required: true, message: '请输入正确的设备位置', trigger: 'blur' },
    ],
})

// 提交
const onSubmit = (form) => {
  // 先验证表单
  form.validate((valid, fields) => {
    if (valid) {
      //这里可以提交到数据库 但是会得到乱码的数据？？？？
      let data={
        id: form.id,
        name: form.name,
        location: form.location,
        alert: form.alert,
      }
      link(url.productlist,"post",data).then((ok)=>{
        console.log("success",ok)
      }).catch((err)=>{
        console.log("something error",err)
      })
      store.commit("AddOpen")
      window.location.reload()
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
