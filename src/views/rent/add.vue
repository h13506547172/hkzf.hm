<template>
  <div class="rentAdd-page">
    <!-- 顶部标题 -->
    <van-nav-bar title="发布房源" left-arrow @click-left="clickLeftFn" />
    <div class="list-head">房源信息</div>
    <!-- 填写的信息 -->
    <div class="am-list-body">
      <div class="am-list-item" @click="goSearch">
        <div class="am-list-line">
          <div class="am-list-content">小区名称</div>
          <div class="am-list-content am-list-extra">{{ house.xiaoqu }}</div>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="am-list-item">
        <div class="am-list-line">
          <div class="am-list-content w100">
            租&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金
          </div>
          <div class="am-input-control">
            <input
              type="text"
              placeholder="请输入租金/月"
              v-model="house.zujin"
            />
          </div>
          <div class="am-list-content am-list-extra">￥/月</div>
        </div>
      </div>
      <div class="am-list-item">
        <div class="am-list-line">
          <div class="am-list-content">建筑面积</div>
          <div class="am-input-control">
            <input
              type="text"
              placeholder="请输入建筑面积"
              v-model="house.mianji"
            />
          </div>
          <div class="am-list-content am-list-extra">㎡</div>
        </div>
      </div>
      <div class="am-list-item" @click="showPopup1">
        <div class="am-list-line">
          <div class="am-list-content">户型</div>
          <div class="am-list-content am-list-extra">{{ house.huxin }}</div>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="am-list-item" @click="showPopup2">
        <div class="am-list-line">
          <div class="am-list-content">所在楼层</div>
          <div class="am-list-content am-list-extra">{{ house.leiceng }}</div>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="am-list-item" @click="showPopup3">
        <div class="am-list-line">
          <div class="am-list-content">朝向</div>
          <div class="am-list-content am-list-extra">{{ house.chaoxiang }}</div>
          <van-icon name="arrow" />
        </div>
      </div>
      <!-- 输入房屋标题 -->
      <div class="list-head am-list-header">房屋标题</div>
      <div class="am-list-item">
        <div class="am-list-line no-bor">
          <input
            type="text"
            placeholder="请输入标题（例如：整租 小区名 2室 5000元）"
            class="ipt"
            v-model="house.name"
          />
        </div>
      </div>
      <!-- 上传房屋图像 -->
      <div class="list-head am-list-header">房屋图像</div>
      <form
        action="http://127.0.0.1:3000/houses/image"
        enctype="multipart/form-data"
        method="post"
        id="formImg"
      >
        <div class="up-imgbox">
          <van-uploader
            v-model="house.img"
            multiple
            :max-count="3"
            :after-read="afterRead"
          />
        </div>
      </form>

      <!-- 房屋配置 -->
      <div class="list-head am-list-header">房屋配置</div>
      <van-grid square :column-num="5" :border="false">
        <van-grid-item
          v-for="(item, index) in iconArr"
          :key="index"
          :text="item[0]"
          @click="curFn(item[0])"
          :class="{ current: house.peizhi.some((ite) => ite === item[0]) }"
        >
          <template #icon>
            <i class="iconfont" :class="item[1]"></i>
          </template>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 房屋描述 -->
    <div class="house-area">
      <div class="title am-list-header">房屋描述</div>
      <div class="area-con">
        <van-field
          v-model="house.miaoshu"
          rows="2"
          autosize
          type="textarea"
          placeholder="请输入留言"
          show-word-limit
        />
      </div>
    </div>
    <div class="Add_bottom">
      <div class="Add_cancel">取消</div>
      <div class="Add_cancel green" @click="submit">提交</div>
    </div>
    <!-- 户型选择面板 -->
    <van-popup v-model="show1" position="bottom" :style="{ height: '40%' }">
      <van-area :area-list="areaList1" :columns-num="1" @confirm="confirmFn1" />
    </van-popup>
    <!-- 楼层选择面板 -->
    <van-popup v-model="show2" position="bottom" :style="{ height: '40%' }">
      <van-area :area-list="areaList2" :columns-num="1" @confirm="confirmFn2" />
    </van-popup>
    <!-- 朝向选择面板 -->
    <van-popup v-model="show3" position="bottom" :style="{ height: '40%' }">
      <van-area :area-list="areaList3" :columns-num="1" @confirm="confirmFn3" />
    </van-popup>
  </div>
</template>

<script>
import { pubRequireAPI, upImgAPI, pubHouseAPI } from '@/api/index'

export default {
  created() {
    this.getData()
  },
  data() {
    return {
      house: {
        huxin: '请选择',
        leiceng: '请选择',
        chaoxiang: '请选择',
        name: '',
        zujin: '',
        mianji: '',
        xiaoqu: this.$route.params.communityName || '请选择小区',
        img: [],
        peizhi: [],
        miaoshu: ''
      },
      // 楼层 朝向 户型
      roomData: {},
      // 弹出面板的相关数据
      show1: false,
      show2: false,
      show3: false,
      areaList1: {
        province_list: {
          110000: '一室',
          120000: '二室',
          130000: '三室',
          140000: '四室',
          150000: '四室+'
        }
      },
      areaList2: {
        province_list: {
          110000: '低楼层',
          120000: '中楼层',
          130000: '高楼层'
        }
      },
      areaList3: {
        province_list: {
          110000: '东',
          120000: '南',
          130000: '西',
          140000: '北',
          150000: '东南',
          160000: '东北',
          170000: '西南',
          180000: '西北'
        }
      },
      // 图标
      iconArr: [
        ['热水器', 'icon-haofangtuo400iconfont2reshuiqi'],
        ['天然气', 'icon-meiqitianranqi'],
        ['电视机', 'icon-dianshiji'],
        ['冰箱', 'icon-bingxiang'],
        ['洗衣机', 'icon-xiyiji'],
        ['空调', 'icon-kongtiao'],
        ['沙发', 'icon-shafa'],
        ['暖气', 'icon-nuanqi'],
        ['衣柜', 'icon-yigui'],
        ['宽带', 'icon-WIFI']
      ],

      // area
      areaMsg: ''
    }
  },
  methods: {
    // 获取上传房屋所需的数据
    async getData() {
      try {
        // 获取发布数据对应的字段
        const res = await pubRequireAPI()
        this.roomData = res.data.body
        // console.log(this.roomData)
      } catch (error) {
        console.log(error)
      }
    },
    // 点击提交上传数据
    async submit() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        // console.log(this.house.img[0].file)
        const formData = new FormData()
        this.house.img.forEach((item) => {
          formData.append('file', item.file)
        })
        // 上传图片
        const res = await upImgAPI(formData)
        console.log(res)
        // 转换图片格式
        let imgStr = res.data.body
        imgStr = imgStr.join(',')
        // 转换楼层等格式
        const floor = this.roomData.floor.find((item) => {
          return this.house.leiceng === item.label
        })
        const oriented = this.roomData.oriented.find((item) => {
          return this.house.chaoxiang === item.label
        })
        const roomType = this.roomData.roomType.find((item) => {
          return this.house.huxin === item.label
        })
        const res2 = await pubHouseAPI({
          title: this.house.name,
          description: this.house.miaoshu,
          houseImg: imgStr,
          oriented: oriented.value,
          supporting: this.house.peizhi.join(','),
          price: this.house.zujin,
          roomType: roomType.value,
          size: this.house.mianji,
          floor: floor.value,
          community: this.$route.params.community
        })
        console.log(res2)
        this.$toast.success('上传成功')
      } catch (error) {
        this.$toast.fail('上传失败')
      }
    },
    // 跳转到查询小区页面
    goSearch() {
      this.$router.push('/rent/search')
    },
    // 上传图片
    afterRead(file) {
      // 会自动添加到数组中
      // console.log(this.house.img[0])
    },
    clickLeftFn() {
      this.$router.back()
    },
    curFn(val) {
      const index = this.house.peizhi.findIndex((item) => {
        return item === val
      })
      // 如果存在就删除 不存在就添加
      if (index === -1) {
        this.house.peizhi.push(val)
      } else {
        this.house.peizhi.splice(index, 1)
      }
    },
    // 请选择户型
    showPopup1() {
      this.show1 = true
    },
    showPopup2() {
      this.show2 = true
    },
    showPopup3() {
      this.show3 = true
    },
    // 点击确认
    confirmFn1(val) {
      console.log(val)
      this.house.huxin = val[0].name
      this.show1 = false
    },
    confirmFn2(val) {
      console.log(val)
      this.house.leiceng = val[0].name
      this.show2 = false
    },
    confirmFn3(val) {
      console.log(val)
      this.house.chaoxiang = val[0].name
      this.show3 = false
    }
  }
}
</script>

<style lang="less" scoped>
.rentAdd-page {
  padding-bottom: 70px;
  background-color: #f5f5f9;
  // 头部navbar
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
  // head
  .list-head {
    border-bottom: 1px solid #f2f2f2;
    color: #21b97a;
    background-color: #fff;
    font-size: 15px;
    padding: 15px 15px 9px;
    width: 100%;
    box-sizing: border-box;
  }
  // 填写详细信息
  .am-list-body {
    position: relative;
    background-color: #fff;
    .am-list-item {
      padding-left: 15px;
      padding-right: 15px;
      .am-list-line {
        border-bottom: 1px #f2f2f2 solid;
        position: relative;
        display: flex;
        min-height: 44px;
        background-color: #fff;
        vertical-align: middle;
        overflow: hidden;
        transition: background-color 0.2s;
        align-items: center;
      }
      .am-list-content {
        flex: 1;
        text-align: left;
        font-size: 14px;
        line-height: 1.5;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-top: 7px;
        padding-bottom: 7px;
      }
      .am-list-extra {
        color: #888;
        text-align: right;
      }
      .van-icon {
        color: #ddd;
        font-size: 20px;
        margin-left: 5px;
      }
      // 输入框
      .am-input-control {
        flex: 2;
        font-size: 17px;
        input {
          font-size: 14px;
          color: #000;
          appearance: none;
          width: 100%;
          padding: 2px 0;
          border: 0;
          background-color: transparent;
          line-height: 1;
          box-sizing: border-box;
        }
      }
    }
    .am-list-header {
      color: #333;
      font-size: 14px;
    }
    .no-bor {
      border-bottom: 0px !important;
    }
    .ipt {
      color: #000;
      font-size: 14px;
      appearance: none;
      width: 100%;
      padding: 2px 0;
      border: 0;
      background-color: transparent;
      line-height: 1;
      box-sizing: border-box;
    }
    .up-imgbox {
      padding: 9px 8px 0;
      margin-bottom: 15px;
    }
    // 房屋配套设施
    /deep/ .van-grid-item {
      .iconfont {
        font-size: 23px;
      }

      .van-grid-item__text {
        font-size: 14px;
      }
    }
  }
  .house-area {
    margin-top: 20px;
    .title {
      border-bottom: 0.02667rem solid #f2f2f2;
      background-color: #fff;
      color: #333;
      font-size: 0.37333rem;
      padding: 0.4rem 0.4rem 0.24rem;
      width: 100%;
      box-sizing: border-box;
    }
  }
  .area-con {
    min-height: 144px;
    .van-cell {
      min-height: 144px;
    }
  }
  .Add_bottom {
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    height: 45px;
    z-index: 1;
    color: #fff;
    font-size: 15px;
    background-color: #fff;
    .Add_cancel {
      flex: 1;
      color: #21b97a;
      background-color: #fff;
      height: 100%;
      line-height: 45px;
    }
    .green {
      background-color: #21b97a;
      color: #fff;
    }
  }
  .current {
    color: #21b97a;
  }
}
</style>
