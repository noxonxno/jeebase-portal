<template>
  <div class="app-container">
    <el-table :data="apiList" row-key="logId" border>
      <el-table-column label="设备ID">
        <template slot-scope="scope">
          <span>{{ scope.row.deviceId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备编码">
        <template slot-scope="scope">
          <span>{{ scope.row.deviceCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备名称">
        <template slot-scope="scope">
          <span>{{ scope.row.deviceName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备类型">
        <template slot-scope="scope">
          <p v-if="scope.row.deviceType ==0">辊道</p>
          <p v-if="scope.row.deviceType ==1">天车</p>
          <p v-if="scope.row.deviceType ==2">喷码机</p>
          <p v-if="scope.row.deviceType ==3">切割机</p>
          <p v-if="scope.row.deviceType ==4">举升机</p>
          <p v-if="scope.row.deviceType ==5">小件分拣机器人</p>
          <p v-if="scope.row.deviceType ==6">大件分拣机器人</p>
          <p v-if="scope.row.deviceType ==7">砂光机</p>
          <p v-if="scope.row.deviceType ==8">皮带输送线</p>
          <p v-if="scope.row.deviceType ==9">入框机器人</p>
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="主计划ID">
        <template slot-scope="scope">
          <span>{{ scope.row.planId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="主计划编码">
        <template slot-scope="scope">
          <span>{{ scope.row.planCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备动作详情">
        <template slot-scope="scope">
          <span>{{ scope.row.actionDetails }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="parameterDto.current" :limit.sync="parameterDto.size" @pagination="loadPageTableList" />
  </div>

</template>

<script>
/**
  Auth: Lei.j1ang
  Created: 2018/1/19-14:54
*/
import { listDeviceLog } from '@/api/log/log'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'Devicelog',
  components: { Pagination },
  directives: {
    waves
  },
  data: () => ({
    apiList: [],
    total: 0,
    parameterDto: {
      current: 1,
      size: 10
    },
    dialogFormVisible: false
  }),
  created() {
    this.loadPageTableList()
  },
  methods: {
    loadPageTableList() {
      this.listLoading = true
      listDeviceLog(this.parameterDto).then(response => {
        this.apiList = response.data
        this.total = response.count
        this.listLoading = false
      })
    }
  }
}
</script>

