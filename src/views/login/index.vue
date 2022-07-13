<template>
  <div class="login-page">
    <!-- 顶部标题 -->
    <van-nav-bar title="账号登录" left-arrow @click-left=clickLeftFn />
    <!-- 登录表单 -->
    <van-form @submit="onSubmit">
      <van-field
        class="ipt"
        v-model="model.username"
        name="user"
        placeholder="请输入账号"
      />
      <van-field
        class="ipt"
        v-model="model.password"
        type="password"
        name="password"
        placeholder="请输入密码"
      />
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登 录</van-button>
      </div>
    </van-form>
    <p class="zhuceBtn"><a href="#">还没有账号，去注册</a></p>
  </div>
</template>

<script>
import { loginAPI } from '@/api/index'
export default {
  data() {
    return {
      model: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async onSubmit() {
      // 表单验证
      if (!/^[a-zA-Z0-9]{5,8}$/.exec(this.model.username)) {
        return this.$toast.fail('账号为5-8位字母数字')
      } else if (!/^[a-zA-Z0-9]{5,12}$/.exec(this.model.password)) {
        return this.$toast.fail('密码为5-12位字母数字')
      }
      // 点击后通过表单验证触发事件
      try {
        const res = await loginAPI(this.model)
        // console.log(res)
        if (res.data.status === 200) {
          this.$toast.success('登陆成功')
          this.$store.commit('setUserToken', res.data.body)
          this.$router.back()
        }
      } catch (err) {
        // console.log(err)
        if (err.data.status === 400) {
          this.$toast.fail('你输入的账号或密码不正确')
        } else {
          this.$toast.fail('登录失败，请重试')
        }
      }
    },
    clickLeftFn() {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.login-page {
  .van-nav-bar {
    background-color: #21b97a;
    margin-bottom: 21px;
    /deep/ .van-nav-bar__title {
      color: #fff;
      font-size: 18px;
    }
    /deep/ .van-icon {
      color: #fff;
    }
  }
  // 表单区域
  .ipt {
    padding-top: 15px;
    height: 60px;
    border: 0;
    color: #000;
    font-size: 17px;
    background-color: transparent;
  }
  .van-cell::after {
    background-color: #ddd;
  }

  // 提交按钮
  .van-button {
    background-color: #21b97a;
    border: 0px;
    font-size: 18px;
    color: #fff;
    height: 50px;
    margin-top: 20px;
  }
  .zhuceBtn {
    text-align: center;
    a {
      color: #666;
      font-size: 12px;
    }
  }
}
</style>
