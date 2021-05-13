<template>
	<div>
    <div style="margin: 16px;">
      <van-form :model="partDao">
            <van-field
              style="border:1px solid black"
              v-model="partDao.partCode"
              placeholder="零件编码"
              :clearable=true
            />
      </van-form>
      <div style="margin-top:10px">
        <van-button type="info" native-type="submit" @click="loadPart">搜索</van-button>
        <van-button type="info" native-type="submit" @click="createDialog">新增</van-button>
      </div>
    </div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :offset="offset" @load="onLoad">
        <table class="_table" border="1" cellspacing="0" width="100%" align="center" style="table-layout:fixed;word-wrap:break-word;word-break:break-all">
            <tr class="_tr">
              <td width="50%">零件编码</td>
              <td width="50%">计划编号</td>
            </tr>
            <tr v-for="(item,index) in list" :key="index">
              <td width="50%" style="word-wrap: break-word;">
                <div class="my_title">{{item.partCode}}</div>
              </td>
              <td width="50%" style="word-wrap: break-word;">
                <div class="my_title">{{item.planCode}}</div>
              </td>
            </tr>
        </table>
    </van-list>
    <van-dialog v-model="show" title="新增零件" show-cancel-button :beforeClose="beforeClose">
          <van-form :model="submitForm">
            <van-field
              v-model="submitForm.partCode"
              label="零件编码"
              placeholder="零件编码"
            />
          </van-form>
    </van-dialog>
	</div>
</template>
<script>

import { Toast } from 'vant'
import { selectPartList, addPart } from '@/api/controlSys/mobile/mobile'

export default {
  data() {
    return {
      list: [],
      offset: 0,
      loading: false,
      finished: false,
      total: '',
      show: false,
      partDao: {
        current: 1,
        size: 20,
        partCode: ''
      },
      submitForm: {
        partCode: ''
      }
    }
  },
  methods: {
    onLoad() {
      this.loadPart() // 调用获取目录的数据
    },
    loadPart() {
      selectPartList(this.partDao).then(response => {
        if (response.code === 200) {
          this.loading = false // 这一次的加载状态结束 
          this.list = response.data
          this.total = response.count
          if (response.data.length == this.total) {
            this.finished = true
          } else {
            this.partDao.size += 10
          }
        } else {
          this.finished = false
        }
      })
    },
    createDialog() {
      this.show = true
    },
    beforeClose(action, done) {
      if (action === 'confirm') {
        if (this.submitForm.partCode === '') {
          Toast('零件编码不能为空')
          done()
          return
        }
        addPart(this.submitForm).then(response => {
          if (response.code === 200) {
            Toast('新增成功')
            //关闭
            done()
            this.loadPart()
          } else {
            Toast('新增失败')
          }
          this.submitForm.partCode = ''
        })
      } else if (action === 'cancel') {
        done()//关闭
      }
    }
  }
}
</script>
<style lang="scss" scoped>
._table{
  border: 1px solid #b3b3b3;
}
._table tr td{
  font-size: 1rem;
  padding: 10px;
  align-items: center;
}
.my_title{
  display:flex;
  align-items:center;
  line-height:16px;
  padding:5px;
  color: #606266;
}
._tr td{
  color:#b3b3b3;
  text-align: center;
}
</style>
