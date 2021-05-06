<template>
  <div class="app-container">
    <!-- 搜索栏 -->
    <div class="filter-container">
      <el-form :inline="true"
               :model="parameterDto"
               class="demo-form-inline"
               @keyup.enter.native="loadPageTableList">
        <el-input v-model="parameterDto.deviceName"
                  placeholder="分拣任务列表"
                  style="width: 150px;"
                  class="filter-item"
                  maxlength="32" />
        <el-button v-waves
                   class="filter-item"
                   type="primary"
                   icon="el-icon-search"
                   @click="loadPageTableList">搜索</el-button>
      </el-form>
    </div>
    <!-- 表单信息 -->
    <el-table :data="fjTaskList"
              row-key="id"
              border>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建用户">
        <template slot-scope="scope">
          <span>{{ scope.row.createUser }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务状态">
        <template slot-scope="scope">
          <p v-if="scope.row.state ==0">正常</p>
          <p v-if="scope.row.state ==1">运行中</p>
          <p v-if="scope.row.state ==2">空闲</p>
          <p v-if="scope.row.state ==3">异常</p>
        </template>
      </el-table-column>
      <el-table-column label="序号">
        <template slot-scope="scope">
          <span>{{ scope.row.planTotal }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')"
                       width="300">
        <template slot-scope="scope">
          <el-button type="primary"
                     size="mini"
                     @click="doTask(scope.row.id)">执行
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 详情弹窗 -->
    <el-dialog title="计划通知详情"
               :visible.sync="detailsVisible"
               width="70%"
               :before-close="handleClose">
      <el-table :data="mesAdviceDetailList"
                row-key="id"
                border>
        <el-table-column label="计划执行状态">
          <template slot-scope="scope">
            <span>{{ scope.row.planCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="切割校验状态">
          <template slot-scope="scope">
            <span>{{ scope.row.cutCheck }}</span>
          </template>
        </el-table-column>
        <el-table-column label="分拣校验状态">
          <template slot-scope="scope">
            <p v-if="scope.row.fjCheck ==0">正常</p>
            <p v-if="scope.row.fjCheck ==1">运行中</p>
            <p v-if="scope.row.fjCheck ==2">空闲</p>
            <p v-if="scope.row.fjCheck ==3">异常</p>
          </template>
        </el-table-column>
        <el-table-column label="计划错误类型">
          <template slot-scope="scope">
            <span>{{ scope.row.errCode }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.actions')">
          <template slot-scope="scope">
            <el-button type="primary"
                       size="mini"
                       @click="errReport(scope.row)">错误上报
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="detailsVisible = false">退 出</el-button>
      </span>
    </el-dialog>
    <!-- 分页插件 -->
    <pagination v-show="total>0"
                :total="total"
                :page.sync="parameterDto.current"
                :limit.sync="parameterDto.size"
                @pagination="loadPageTableList" />
  </div>
</template>

<script>
/**
  Auth: Lei.j1ang
  Created: 2018/1/19-14:54
*/
import { selectFjTaskList } from '@/api/task/fjTask'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'fjTask',
  components: { Pagination },
  data: () => ({
    fileListUpload: [],
    limitUpload: 3,
    fjTaskList: [],
    mesAdviceDetailList: [],
    dialogVisible: false,
    detailsVisible: false,
    total: 0,
    parameterDto: {
      cutTaskCode: "",
      current: 1,
      size: 10,
    },
  }),
  directives: {
    waves
  },
  created () {
    this.loadPageTableList();
  },
  methods: {
    // 加载表单数据方法
    loadPageTableList () {
      this.listLoading = true
      selectFjTaskList(this.parameterDto).then(response => {
        this.fjTaskList = response.data
        this.total = response.count
        this.listLoading = false
      })
    },
    //执行任务
    doTask (FjTaskId) {
      doFjTask(FjTaskId).then(response => {
        alert(response.msg)
      })
    },
    //查看详情计划
    // mesAdviceDetails (mesAdiveId) {
    //   this.detailsVisible = true
    //   getDetails(mesAdiveId).then(response => {
    //     this.mesAdviceDetailList = response.data

    //   })
    // },

    //取消导入
    handleClose (done) {
      this.dialogVisible = false;
    },

    //错误上报
    errReport () {
    }
  },
}
</script>



