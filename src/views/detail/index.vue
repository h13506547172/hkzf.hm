<template>
  <div class="detail-page">
    <!-- 底部按钮 -->
    <div class="fixedBottom">
      <div class="fixed-item" @click="shoucangFn">
        <span class="iconfont icon-shoucang"></span> 收藏
      </div>
      <div class="fixed-item">在线咨询</div>
      <div class="fixed-item">电话预约</div>
    </div>
    <!-- 顶部标题 -->
    <van-nav-bar title="房屋信息" left-arrow @click-left="clickLeftFn" />
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in detailObj.houseImg" :key="index">
        <img :src="'http://liufusong.top:8080' + item" alt="" />
      </van-swipe-item>
    </van-swipe>
    <!-- 房屋信息 -->
    <div class="HouseDetail_info">
      <h3 class="info-title">{{ detailObj.title }}</h3>
      <div class="tags">
        <span
          class="tag"
          v-for="(item, index) in detailObj.tags"
          :key="index"
          >{{ item }}</span
        >
      </div>
      <!-- 中间盒子 -->
      <div class="cenBox">
        <div class="item">
          <p class="text1">{{ detailObj.price }}元/月</p>
          <div class="text2">租金</div>
        </div>
        <div class="item">
          <p class="text1">{{ detailObj.roomType }}</p>
          <div class="text2">房型</div>
        </div>
        <div class="item">
          <p class="text1">{{ detailObj.size }}</p>
          <div class="text2">面积</div>
        </div>
      </div>
      <!-- 底下盒子 -->
      <div class="box-bottom">
        <div class="box-bottom-item">
          <div><span class="title">装修：</span>精装</div>
          <div><span class="title">楼层：</span>{{ detailObj.floor }}</div>
        </div>
        <div class="box-bottom-item">
          <div>
            <span class="title">朝向：</span>{{ detailObj.oriented[0] }}
          </div>
          <div><span class="title">类型：</span>普通住宅</div>
        </div>
      </div>
    </div>
    <!-- 地图部分 -->
    <div class="map">
      <div class="map-title">小区：{{ detailObj.community }}</div>
      <div class="map-con"></div>
    </div>
    <!-- 房屋配套 -->
    <div class="mating">
      <div class="title">房屋配套</div>
      <div class="mat-list">
        <div
          class="mat-item"
          v-for="(item, index) in detailObj.supporting"
          :key="index"
        >
          <p><i class="iconfont" :class="iconObj[item]"></i></p>
          {{ item }}
        </div>
      </div>
    </div>
    <!-- 房源概括 -->
    <div class="msg">
      <div class="title">房源概括</div>
      <div class="main">
        <div class="user">
          <img src="http://liufusong.top:8080/img/avatar.png" alt="" />
          <div class="txt">
            <p>王女士</p>
            <p class="approve">已认证房主</p>
          </div>
          <div class="message">发消息</div>
        </div>
        <div class="content">
          1.周边配套齐全，地铁四号线陶然亭站，交通便利，公交云集，距离北京南站、西站都很近距离。
          2.小区规模大，配套全年，幼儿园，体育场，游泳馆，养老院，小学。
          3.人车分流，环境优美。
          4.精装两居室，居家生活方便，还有一个小书房，看房随时联系。
        </div>
      </div>
    </div>
    <!-- 猜你喜欢 -->
    <div class="recommend">
      <div class="title">猜你喜欢</div>
      <div class="home-item">
        <div class="pic">
          <img src="http://liufusong.top:8080/img/message/1.png" alt="" />
        </div>
        <div class="text">
          <h3 class="mu">安贞西里 3室1厅</h3>
          <p class="mu">72.32㎡/南 北/低楼层</p>
          <van-tag type="success">随时看房</van-tag>
          <div class="mu money">
            <span>4500</span>
            元/月
          </div>
        </div>
      </div>
      <div class="home-item">
        <div class="pic">
          <img src="http://liufusong.top:8080/img/message/1.png" alt="" />
        </div>
        <div class="text">
          <h3 class="mu">安贞西里 3室1厅</h3>
          <p class="mu">72.32㎡/南 北/低楼层</p>
          <van-tag type="success">随时看房</van-tag>
          <div class="mu money">
            <span>4500</span>
            元/月
          </div>
        </div>
      </div>
      <div class="home-item">
        <div class="pic">
          <img src="http://liufusong.top:8080/img/message/1.png" alt="" />
        </div>
        <div class="text">
          <h3 class="mu">安贞西里 3室1厅</h3>
          <p class="mu">72.32㎡/南 北/低楼层</p>
          <van-tag type="success">随时看房</van-tag>
          <div class="mu money">
            <span>4500</span>
            元/月
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { homeDelAPI } from '@/api/index'
export default {
  data() {
    return {
      detailObj: {},
      iconObj: {
        热水器: 'icon-haofangtuo400iconfont2reshuiqi',
        天然气: 'icon-meiqitianranqi',
        电视机: 'icon-dianshiji',
        冰箱: 'icon-bingxiang',
        洗衣机: 'icon-xiyiji',
        空调: 'icon-kongtiao',
        沙发: 'icon-shafa',
        暖气: 'icon-nuanqi',
        衣柜: 'icon-yigui',
        宽带: 'icon-WIFI'
      }
    }
  },
  async created() {
    // console.log(this.iconObj)
    try {
      const res = await homeDelAPI(this.$route.query.homeCode)
      console.log(res)
      this.detailObj = res.data.body
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    clickLeftFn() {
      this.$router.back()
    },
    // 收藏事件
    shoucangFn() {}
  }
}
</script>
<style>
body {
  background-color: #f5f5f9;
  font-size: 14px !important;
}
</style>
<style lang="less" scoped>
* {
  margin: 0;
}
.detail-page {
  padding-bottom: 50px;
  // 底部导航
  .fixedBottom {
    display: flex;
    z-index: 9;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-top: 1px solid #cecece;
    text-align: center;
    font-size: 17px;
    color: #999;
    background-color: #fff;
    .fixed-item {
      box-sizing: border-box;
      flex: 1;
      margin-left: 8px;
      min-width: 10px;
    }
  }
  .van-nav-bar {
    background-color: #21b97a;
    /deep/ .van-nav-bar__title {
      color: #fff;
      font-size: 18px;
    }
    /deep/ .van-icon {
      color: #fff;
    }
  }
  // 轮播图
  .my-swipe .van-swipe-item {
    max-height: 250px;
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
  // 房屋信息
  .HouseDetail_info {
    padding: 15px;
    background: #fff;
    .info-title {
      font-weight: 400;
      font-size: 16px;
      color: #333;
    }
    .tags {
      position: relative;
      margin: 10px 0;
      .tag {
        display: inline-block;
        font-size: 12px;
        border-radius: 3px;
        padding: 4px 5px;
        margin-right: 5px;
        line-height: 12px;
        color: #39becd;
        background: #e1f5f8;
      }
    }
    // 中间盒子
    .cenBox {
      border-top: 1px solid #cecece;
      border-bottom: 1px solid #cecece;
      margin: 15px 0;
      padding: 15px 0;
      text-align: left;
      overflow: hidden;
      display: flex;
      .item {
        text-align: center;
        box-sizing: border-box;
        flex: 1;
        margin-left: 8px;
        min-width: 10px;
        .text1 {
          margin: 0;
          color: #fa5741;
          font-size: 18px;
          font-weight: bolder;
        }
        .text2 {
          color: #999;
          font-size: 14px;
        }
      }
    }
    // 底部盒子
    .box-bottom {
      text-align: left;
      overflow: hidden;
      display: flex;
      .box-bottom-item {
        font-size: 13px;
        box-sizing: border-box;
        flex: 1;
        margin-left: 0px;
        min-width: 10px;
        .title {
          display: inline-block;
          color: #999;
          padding-right: 5px;
          line-height: 26px;
        }
      }
    }
  }
  // 地图
  .map {
    margin-top: 10px;
    background: #fff;
    .map-title {
      margin: 0 3%;
      line-height: 44px;
      color: #666;
      font-size: 14px;
    }
    .map-con {
      background: pink;
      // position: absolute;
      // left: 0px;
      // top: 0px;
      // z-index: 9;
      overflow: hidden;
      user-select: none;
      width: 375px;
      height: 145px;
    }
  }
  // 房屋配套
  .mating {
    margin-bottom: 10px;
    padding: 0 10px;
    background: #fff;
    .title {
      font-weight: 600;
      font-size: 15px;
      margin-bottom: 10px;
      padding: 15px 0;
      border-bottom: 1px solid #cecece;
    }
    .mat-list {
      display: flex;
      flex-wrap: wrap;
      text-align: center;
      background: #fff;
      .mat-item {
        font-size: 14px;
        margin: 10px 0;
        width: 20%;
        line-height: 23px;
        p {
          margin: 0;
        }
        .iconfont {
          font-size: 26px;
        }
      }
    }
  }
  // 房源概括
  .msg {
    background-color: #fff;
    margin: 10px 0;
    padding: 0 10px;
    line-height: 150%;
    .title {
      font-weight: 600;
      font-size: 15px;
      margin-bottom: 10px;
      padding: 15px 0;
      border-bottom: 1px solid #cecece;
    }
    .main {
      .user {
        position: relative;
        margin-bottom: 10px;
        display: flex;
        img {
          width: 52px;
          height: 52px;
          margin: 10px 10px 0 0;
        }
        .txt {
          padding: 17px 0 0 5px;
          p {
            margin: 0;
          }
          .approve {
            font-size: 12px;
            color: #fa5741;
          }
        }
        .message {
          position: absolute;
          right: 15px;
          top: 20px;
          color: #33be85;
          border: 1px solid #33be85;
          border-radius: 3px;
          padding: 3px 15px;
        }
      }
      .content {
        line-height: 1.6;
        padding: 10px 0;
        color: #333;
      }
    }
  }
  // 推荐
  .recommend {
    margin: 10px 0 0;
    padding: 0 15px;
    background-color: #fff;
    .title {
      font-weight: 600;
      font-size: 15px;
      margin-bottom: 10px;
      padding: 15px 0;
      border-bottom: 1px solid #cecece;
    }
    .home-item {
      display: flex;
      height: 120px;
      position: relative;
      box-sizing: border-box;
      padding-top: 18px;
      border-bottom: 1px solid #e5e5e5;
      .pic {
        width: 106px;
        height: 80px;
        img {
          width: 106px;
          height: 80px;
        }
      }
      .text {
        padding-left: 12px;
        h3 {
          font-size: 15px;
          color: #394043;
        }
        p {
          font-size: 12px;
          color: #afb2b3;
        }
        .money {
          font-size: 12px;
          color: #fa5741;
          span {
            font-size: 16px;
            font-weight: bolder;
          }
        }
      }
    }
  }
}
</style>
