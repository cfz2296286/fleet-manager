<template>
  <div class="login-wrap">
    <div class="box">
      <div class="fl">
      </div>
      <div class="fr">
        <img class="login-logo" :src="logo" alt=""/>
        <div class="form">
          <!-- <h1>账户登录</h1> -->
          <div style="height:10px;"></div>
          <Form :model="formState" @finish="handleSubmit">
            <FormItem name="username" :rules="[{ required: true, message: 'Account cannot be empty' }]">
              <Input size="large" placeholder="Username" v-model:value="formState.username">
              <template #prefix>
                <UserOutlined />
              </template>
              </Input>
            </FormItem>
            <FormItem name="password" :rules="[{ required: true, message: 'Password cannot be empty' }]">
              <Input.Password size="large" placeholder="Password" v-model:value="formState.password">
                <template #prefix>
                  <LockOutlined />
                </template>
              </Input.Password>
            </FormItem>
            <div style="height:30px;"></div>
            <Button type="primary" block size="large" html-type="submit" :loading="sending">log on</Button>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Form, FormItem, Input, Button, message} from 'ant-design-vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { ref, reactive } from "vue"
import { useRouter } from 'vue-router';

import { useAppTab } from '@/store/appTab';
import { login } from '@/apis/account';
import logo from '@/assets/logo.png';
import axios from 'axios';

const appTabStore = useAppTab()

const formState = reactive({
  username: '',
  password: ''
})

const sending = ref(false)

const router = useRouter()


const handleSubmit = async (values) => {
  if(!sending.value){
    sending.value = true
    try {
      axios.get('/server/login/');
      
      // axios.post('/server/login/',values).then(function(resp){
      //   return resp = resp.data,
      //   localStorage.setItem("token", resp.data.token);
      // }).catch( (error)=> {
      //   const config = error?.response?.data
      //   if (!config || !config.noErrorMessage) {
      //     message.error(error?.response?.data?.error || 'request failure')
      //   }
      //   return Promise.reject(error)
      // });
      const resp = await login(values);
      console.log(resp);
      // return false;
      sending.value = false
      localStorage.setItem("token", resp.data.token);
      localStorage.setItem("is_superuser", resp.data.is_superuser);
      const stationIdList = resp.data.station_id.map(item=>({
        label:item.station_id ?? 0,
        value:item.station_id ?? "",
      }))
      localStorage.setItem('stationIdList',JSON.stringify(stationIdList))
      // localStorage.setItem("token", values.username);
      message.success('Login succeeded')
      
      appTabStore.$reset()
      router.push('/')
    } catch (error) {
      sending.value = false
      throw error
    }
  }
}

</script>

<style scoped lang="less">
.login-wrap {
  width: 100vw;
  height: 100vh;
  // background: linear-gradient(-45deg, #002951, #2a94ff);
  background-color: var(--bgColor);
  display: flex;
  align-items: center;
  justify-content: center;

  .box {
    width: 960px;
    height: 500px;
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    margin-bottom: 100px;
    box-shadow: 10px 10px 50px rgba(0, 0, 0, 0.3);
  }

  .fl {
    flex: 1;
    padding: 50px;
    // background: linear-gradient(-45deg, #00468c, #07e);
    background: url('@/assets/login.png') no-repeat 100% 100%;
    background-size: 100%;

    h1 {
      color: #fff;
    }

    h3 {
      color: #fff;
    }
  }

  .fr {
    background-color: #fff;
    width: 400px;
    padding: 50px;

    .form {
      margin-top: 40px;
    }
  }
}
.login-logo{
  display: block;
  height: 88px;
  margin: 0 auto
}
</style>