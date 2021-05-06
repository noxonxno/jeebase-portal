<template>
  <div class="app-container">
    <el-table :data="apiList" row-key="planLogId" border>
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
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改时间">
        <template slot-scope="scope">
          <span>{{ scope.row.updataTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="切割任务ID">
        <template slot-scope="scope">
          <span>{{ scope.row.ctaskId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分拣任务ID">
        <template slot-scope="scope">
          <span>{{ scope.row.ftaskId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上下料任务ID">
        <template slot-scope="scope">
          <span>{{ scope.row.wtaskId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="钢板型号">
        <template slot-scope="scope">
          <span>{{ scope.row.steelType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="执行状态">
        <template slot-scope="scope">
          <p v-if="scope.row.statues ==0">正常</p>
          <p v-if="scope.row.statues ==1">运行中</p>
          <p v-if="scope.row.statues ==2">空闲</p>
          <p v-if="scope.row.statues ==3">异常</p>
        </template>
      </el-table-column>
      <el-table-column label="任务环节">
        <template slot-scope="scope">
          <span>{{ scope.row.planStep }}</span>
        </template>
      </el-table-column>
      <el-table-column label="切割总耗时">
        <template slot-scope="scope">
          <span>{{ scope.row.ctaskTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上料总耗时">
        <template slot-scope="scope">
          <span>{{ scope.row.wtaskTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分拣总耗时">
        <template slot-scope="scope">
          <span>{{ scope.row.ftaskTime }}</span>
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
import { listTaskLog } from '@/api/log/log'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'Tasklog',
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
      listTaskLog(this.parameterDto).then(response => {
        this.apiList = response.data
        this.total = response.count
        this.listLoading = false
      })
    }
  }
}
</script>

