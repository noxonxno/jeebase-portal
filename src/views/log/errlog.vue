<template>
  <div class="app-container">
    <el-table :data="apiList" row-key="logId" border>
      <el-table-column label="异常类型">
        <template slot-scope="scope">
          <span>{{ scope.row.epType }}</span>
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
      <el-table-column label="异常来源">
        <template slot-scope="scope">
          <span>{{ scope.row.epSource }}</span>
        </template>
      </el-table-column>
      <el-table-column label="异常详情">
        <template slot-scope="scope">
          <span>{{ scope.row.epDetails }}</span>
        </template>
      </el-table-column>
      <el-table-column label="处理标识">
        <template slot-scope="scope">
          <span>{{ scope.row.epStatus == 1 ? '处理完成' : '未处理' }}</span>
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
import { listErrLog } from '@/api/log/log'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'Errlog',
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
      listErrLog(this.parameterDto).then(response => {
        this.apiList = response.data
        this.total = response.count
        this.listLoading = false
      })
    }
  }
}
</script>

