<template>
  <div class="app-container">
    <!-- 搜索栏 -->
    <div class="filter-container">
      <el-form :inline="true"
               :model="parameterDto"
               class="demo-form-inline"
               @keyup.enter.native="loadPageTableList">
        <el-input v-model="parameterDto.planCode"
                  placeholder="MES可执行计划编号"
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
    <el-table :data="mesDoPlanList"
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
      <el-table-column label="计划状态">
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
                     @click="mesAdviceDetails(scope.row.id)">查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 详情弹窗 -->
    <!-- <el-dialog title="计划通知详情"
               :visible.sync="detailsVisible"
               width="30%"
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
    </el-dialog> -->
    <!-- 分页插件 -->
    <pagination v-show="total>0"
                :total="total"
                :page.sync="parameterDto.current"
                :limit.sync="parameterDto.size"
                @pagination="loadPageTableList" />
  </div>
</template>

<script>
import { selectMesDoPlanList } from '@/api/plan/mesDoPlan'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'mesDoPlan',
  components: { Pagination },
  data: () => ({
    disabled: false,
    mesDoPlanList: [],
    detailsVisible: false,
    total: 0,
    parameterDto: {
      mesAdivceCode: "",
      current: 1,
      size: 10,
    },
    dialogStatus: '',
    dialogFormVisible: false,
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
      selectMesDoPlanList(this.parameterDto).then(response => {
        this.mesDoPlanList = response.data
        this.total = response.count
        this.listLoading = false
      })
    },
  },
}
</script>



