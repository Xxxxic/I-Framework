<template>
  <el-dialog v-model="$store.state.editOpen" title="修改设备信息">
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
        <el-button @click="store.commit('EditOpen')">关闭</el-button>
        <el-button type="primary" @click="onSubmit(formRef)">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, onUpdated } from "vue";
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
// 加载当前要编辑的设备 要是在初始化时就赋值 store那边也还是空的 那就会找不到undefined
// Vue3的生命周期函数：https://blog.csdn.net/weixin_39897392/article/details/110091023
onUpdated(() => {
  form.id=store.state.editlist.id;
  form.name=store.state.editlist.name;
  form.location=store.state.editlist.location;
  form.alert=store.state.editlist.alert;
  //console.log(form.id)
})

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
      //这里可以提交到数据库 但是会得到乱码的数据:下面的data是undefined 未解决
      let data={
        id: form.id,
        name: form.name,
        location: form.location,
        alert: form.alert,
      }
      console.log(data)
      link(url.productlist,"POST",data).then((ok)=>{
        console.log(ok)
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
