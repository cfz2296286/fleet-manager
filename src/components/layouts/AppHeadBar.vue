<template>
  <div class="app-head-bar">
    <div class="fl">
      <AppCrumb />
    </div>
    <div class="fr">
      <Dropdown placement="bottomRight">
        <template #overlay>
          <Menu @click="handleClickMenu">
            <!-- <Menu.Item key="password">
              <LockOutlined />
              <span class="m-txt">修改密码</span>
            </Menu.Item> -->
            <Menu.Divider></Menu.Divider>
            <Menu.Item key="logout">
              <PoweroffOutlined />
              <span class="m-txt">exit</span>
            </Menu.Item>
          </Menu>
        </template>
        <div class="head-btn">
          <Space>
            <Avatar style="background-color: var(--pColor);">
              <UserOutlined></UserOutlined>
            </Avatar>
            <span>{{curUser.name}}</span>
          </Space>
        </div>
      </Dropdown>
    </div>
  </div>
</template>

<script setup>
import { Avatar, Space, Dropdown, Menu, Modal, message} from 'ant-design-vue';
import { storeToRefs } from 'pinia'
import { UserOutlined, LockOutlined, PoweroffOutlined } from '@ant-design/icons-vue';
import { useAccountStore } from '@/store/account';
import AppCrumb from './AppCrumb.vue';
import { useRouter } from 'vue-router';
import { logout } from '@/apis/account';
import axios from 'axios';

const accountStore = useAccountStore()
const { curUser } = storeToRefs(accountStore)

const router = useRouter()

const handleClickMenu = ({key})=>{
  if(key === 'logout'){
    Modal.confirm({
      title: 'Are you sure you want to exit?',
      onOk: async ()=>{
        const token = localStorage.getItem("token")
        const params = {
          'auth_token':token
        }
        // axios.post('/server/logout/',params)
        await logout(params);
        message.success('Exit successful!')
        router.push('/login')
        localStorage.clear()
      }
    })
  }
}

</script>

<style lang="less" scoped>
.app-head-bar {
  height: 56px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;

  .fl,
  .fr {
    height: 100%;
    display: flex;
    align-items: center;
  }
}

.head-btn {
  height: 100%;
  padding: 0 15px;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;

  &:hover {
    background-color: var(--bgColor);
  }
}

.m-txt {
  margin-left: 10px;
  margin-right: 30px;
}
</style>