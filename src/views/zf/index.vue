<template>
  <div class="zf-page">
    <!-- 搜索框 -->
    <div class="search-box">
      <van-search
        v-model="searchIpt"
        label="广州"
        input-align="left"
        placeholder="  请输入小区或地址"
        background="rgba(0,0,0,0)"
      >
        <template #left-icon>
          <van-icon name="arrow-down" />
        </template>
      </van-search>
      <div class="icon-map">
        <van-icon name="aim" />
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
