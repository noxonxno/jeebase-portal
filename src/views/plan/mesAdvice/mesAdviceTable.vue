<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true"
               :model="parameterDto"
               class="demo-form-inline"
               @keyup.enter.native="loadPageTableList">
        <el-input v-model="parameterDto.deviceName"
                  placeholder="MES通知总计划数"
                  style="width: 150px;"
                  class="filter-item"
                  maxlength="32" />
        <el-button v-waves
                   class="filter-item"
                   type="primary"
                   icon="el-icon-search"
                   @click="loadPageTableList">搜索</el-button>
        <el-button class="filter-item"
                   style="margin-left: 10px;"
                   type="primary"
                   icon="el-icon-edit"
                   @click="handleCreate(false)">导入</el-button>
      </el-form>

    </div>

    <el-table :data="mesAdviceList"
              row-key="id"
              border>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.deviceCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建用户">
        <template slot-scope="scope">
          <span>{{ scope.row.deviceName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="计划状态">
        <template slot-scope="scope">
          <p v-if="scope.row.deviceState ==0">正常</p>
          <p v-if="scope.row.deviceState ==1">运行中</p>
          <p v-if="scope.row.deviceState ==2">空闲</p>
          <p v-if="scope.row.deviceState ==3">异常</p>
        </template>
      </el-table-column>
      <el-table-column label="序号">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')"
                       width="300">
        <template slot-scope="scope">
          <el-button type="primary"
                     size="mini"
                     @click="handleCreate(scope.row)">错误上报
          </el-button>
        </template>
      </el-table-column>
    </el-table>

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
import { selectMesAdivceList } from '@/api/plan/mesAdivce'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'mesAdivce',
  components: { Pagination },
  data: () => ({
    mesAdviceList: [],
    total: 0,
    parameterDto: {
      deviceName: "",
      current: 1,
      size: 10,
    },
    textMap: {
      update: '编辑',
      create: '添加'
    },
    dialogStatus: '',
    dialogFormVisible: false,
    submitForm: {
      deviceCode: "",
      deviceName: "",
      deviceState: ""
    }
  }),
  directives: {
    waves
  },
  created () {
    this.loadPageTableList();
  },
  methods: {
    loadPageTableList () {
      this.listLoading = true
      selectMesAdivceList(this.parameterDto).then(response => {
        this.mesAdviceList = response.data
        this.total = response.count
        this.listLoading = false
      })
    },

    handleCreate () {
      this.deviceCode = ""
      this.deviceName = ""
      this.deviceState = ""
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.submitForm = {}
    },

    handleUpdate (row) {
      this.submitForm = Object.assign({}, row) //Object.assign方法用于对象的合并 复制到目标对象
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },

    handleDelete (id) {
      this.$confirm(
        '删除该设备, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        this.listLoading = true
        deleteDevice(id).then(response => {
          if (response.code == 200) {
            this.listLoading = false
            this.loadPageTableList();
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else {
            this.$message({
              message: '删除失败',
              type: 'error'
            })
          }
        })
      })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>



