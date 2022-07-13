<template>
  <div class="my-page">
    <!-- 头部面板-未登录 -->
    <div class="My_title" v-if="!whoShow">
      <img src="http://liufusong.top:8080/img/profile/bg.png" alt="" />
      <div class="My_info">
        <div class="headPic">
          <img src="http://liufusong.top:8080/img/profile/avatar.png" alt="" />
        </div>
        <p class="text">游客</p>
        <van-button type="primary" class="exitBtn" @click="goLogin"
          >去登陆</van-button
        >
      </div>
    </div>
    <!-- 头部面板-已经登录 -->
    <div class="My_title" v-if="whoShow">
      <!-- 背景 -->
      <img :src="'http://liufusong.top:8080' + userInfo.avatar" alt="" />
      <div class="My_info">
        <!-- 头像 -->
        <div class="headPic">
          <img :src="'http://liufusong.top:8080' + userInfo.avatar" alt="" />
        </div>
        <p class="text">{{ userInfo.nickname }}</p>
        <van-button type="primary" class="exitBtn" @click="exitFn"
          >退出</van-button
        >
        <p class="bj-text">编辑个人资料</p>
      </div>
    </div>
    <!-- 宫格 -->
    <van-grid :column-num="3" :border="false">
      <van-grid-item icon="star-o" text="我的收藏" @click="collectionFn" />
      <van-grid-item icon="wap-home-o" text="我的出租" @click="watchRent" />
      <van-grid-item icon="clock-o" text="看房记录" />
      <van-grid-item icon="debit-pay" text="成为房主" />
      <van-grid-item icon="contact" text="个人资料" />
      <van-grid-item icon="service-o" text="联系我们" />
    </van-grid>
    <!-- 底部广告 -->
    <div class="adImg">
      <img src="http://liufusong.top:8080/img/profile/join.png" alt="" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { removeItem } from '@/utils/storage'
// 引入获取用户数据axios
import { getUserInfoAPI } from '@/api/index'
export default {
  data() {
    return {
      userInfo: {}
    }
  },
  computed: {
    // 从容器中取值，然后就可以当自己的数据使用了
    ...mapState(['userToken']),
    whoShow() {
      if (this.$store.state.userToken === null) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    goLogin() {
      this.$router.push({
        path: '/login'
      })
    },
    exitFn() {
      this.$store.userToken = null
      removeItem('token')
      this.$router.push({
        path: '/login'
      })
    },
    // 查看收藏
    collectionFn() {
      if (this.userToken === null) {
        return this.$router.push({
          path: '/login'
        })
      }
    },
    watchRent() {
      if (this.userToken === null) {
        return this.$router.push({
          path: '/login'
        })
      }
    }
  },
  async created() {
    // 如果未登录就return
    if (this.userToken === null) {
      return console.log('无token')
    }
    try {
      const res = await getUserInfoAPI()
      // console.log(res)
      this.userInfo = res.data.body
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.my-page {
  .My_title {
    min-height: 300px;
    position: relative;
    margin-bottom: 10px;
    img {
      width: 100%;
    }
    .My_info {
      position: absolute;
      background: #fff;
      width: 85%;
      height: 55%;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      box-shadow: 0 0 10px 3px #ddd;
      margin: 50px auto 0;
      padding: 0 20px;
      text-align: center;
      font-size: 13px;
      .exitBtn {
        font-size: 13px;
        height: 30px;
        line-height: 30px;
        padding: 0 15px;
        background-color: #21b97a;
      }
      .headPic {
        position: relative;
        transform: translateY(-50%);
        border-radius: 50%;
        width: 70px;
        height: 70px;
        border: 5px solid #f5f5f5;
        display: inline-block;
        box-shadow: 0 2px 2px #bdbdbd;
      }
      .text {
        margin-top: -20px;
      }
      .bj-text {
        color: #999;
        font-size: 12px;
        margin-top: 20px;
      }
    }
  }
  // 底部广告
  .adImg {
    margin: 0 auto;
    width: 92%;
    img {
      width: 100%;
    }
  }
}
</style>
