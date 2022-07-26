<template>
  <div class="layout">
    <p class="login-top">展示网登录</p>
    <!-- 状态栏 -->
    <el-tabs type="border-card" v-model="activeName">
      <!-- 登录标签 -->
      <el-tab-pane label="登录" name="first">
        <el-form
          label-position="right"
          label-width="60px"
          style="max-width: 460px"
          class="loginForm"
        >
        <el-form-item label="账号：">
          <el-row>
            <el-input 
              clearable
              placeholder="账号"
              v-model="Form.email"
            />          
          </el-row>
        </el-form-item>
        <el-form-item label="密码：">
          <el-row>
            <el-input 
              clearable
              show-password
              placeholder="密码" 
              v-model="Form.password" 
              @keyup.enter="login"
            />            
          </el-row>
        </el-form-item>
       
        <el-row>
          <el-checkbox
            class="checkBox"
            v-model="Form.isAgree"
            label="同意用户使用准则"
            name="type"
          />
        </el-row>

        <el-button type="primary" class="loginBtn" @click="login">
          登录
        </el-button>
        </el-form>
      </el-tab-pane>

      <!-- 注册标签 -->
      <el-tab-pane label="注册" name="second">
        <el-form
          label-position="right"
          label-width="100px"
          style="max-width: 460px"
          class="loginForm"
        >
          <el-form-item label="邮箱：">
            <el-input v-model="registerForm.rEmail" autocomplete="off" />
          </el-form-item>
          <el-form-item label="密码：">
            <el-input type="password" v-model="registerForm.rPassword" />
          </el-form-item>
          <el-form-item label="确认密码：">
            <el-input
              type="password"
              v-model="registerForm.confirmPassword"
            />
          </el-form-item>
          <el-form-item label="验证码：">
            <el-row>
              <el-input
                type="password"
                v-model="registerForm.identifyCode"
                class="inpWidth"
              />
              <!--验证码组件-->
              <!-- <PicCode :width="200" :height="60" v-model:Code="Code" /> -->
            </el-row>
          </el-form-item>

          <!-- 用户准则确认按钮 -->
          <el-row>
            <el-checkbox
              class="checkBox"
              v-model="registerForm.rAgree"
              label="同意用户使用准则"
              name="type"
            />
          </el-row>

          <el-button type="primary" class="loginBtn" @click="register">
            注册
          </el-button>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, onMounted, watch} from "vue"
  import { ElMessage } from 'element-plus'
  import link from "../../api/link.js"
  import url from "../../api/api.js"
  import PicCode from "./components/PicCode/PicCode.vue"

  // 控制登陆注册的切换
  const activeName=ref('first')

  // 表单
  const Form = reactive({
  email:'666@qq.com',
  password: '666',
  isAgree:true,
  });
  const registerForm = reactive({
    rEmail: "",
    rPassword: "",
    confirmPassword: "",
    identifyCode: "",
    rAgree:true,
  });

  // 登录
  import {useRouter} from "vue-router"
  let router=useRouter()
  const login = () => {
    if(!Form.email)
      ElMessage.error('请先填写邮箱.');
    else if(!Form.password)
      ElMessage.error('请先填写密码.');
    else if(registerForm.rAgree!=true)
      ElMessage.error('请先确认用户使用准则.');
    else
    {
      link(`${url.user}?username=${Form.email}&password=${Form.password}`).then((ok)=>{
        //console.log(ok.data)
        if(ok.data.length!=0){
          ElMessage.success("登陆成功");
          router.push("/charts")        
        }else{
          ElMessage.error("登录失败")
        }
      })
    }
  }
  // 注册
  const register =() =>{
    if(!registerForm.rEmail)
      ElMessage.error('请先填写邮箱.');
    else if(!registerForm.rPassword)
      ElMessage.error('请先填写密码.');
    else if(!registerForm.confirmPassword)
      ElMessage.error('请再次填写密码.');
    else if (registerForm.confirmPassword !== registerForm.rPassword)
      ElMessage.error('请保证两次输入的密码一致.');
    else if(!registerForm.identifyCode)
      ElMessage.error('请先填写验证码.');
    else if(registerForm.rAgree!=true)
      ElMessage.error('请先确认用户使用准则.');
    else{
      let data = {
        username:registerForm.rEmail,
        password:registerForm.rPassword
      };
      link(url.user, "POST", data).then((ok) => {
        //console.log(ok);
        //判断传回数据的data是否为空 然后判断是否注册成功
        if(Object.keys(ok.data).length!==0){
          ElMessage({
            type:'success',
            showClose:true,
            message:"注册成功",
            center:true
          })
          //注册成功跳到登陆部分
          activeName.value="first";
        }else{
          ElMessage.error('注册失败')
        }
      }).catch((err)=>{
        console.log(err)
        // 未知错误 一直报500错误  数据提交不上去
        ElMessage.error("未知错误")
      });
    }
  }

  // 验证码组件
  // 组件来源：https://gitee.com/toling/vue3PicCode
  const Code = ref(1);

</script>

<style scoped>
.layout {
  position: absolute;
  left: calc(50% - 200px);
  top: 20%;
  width: 350px;
}
.loginBtn {
  width: 100px;
}
.loginForm {
  text-align: center;
}
.checkBox {
  margin-left: 7px;
}
.inpWidth {
  width: 165px;
}
.login-top{
  top:10px;
  left: 300px;
  font-size: 20px;
  font-family: 微软雅黑;
  text-align: center;
  line-height: 10px;
}
</style>
