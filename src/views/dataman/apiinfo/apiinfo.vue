<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="parameterDto" class="demo-form-inline" @keyup.enter.native="loadPageTableList">
        <el-input v-model="parameterDto.apiName" placeholder="接口名称" style="width: 150px;" class="filter-item" maxlength="32" />
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="loadPageTableList">搜索</el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate(false)">添加</el-button>
      </el-form>

    </div>

    <el-table :data="apiList" row-key="id" border>
      <el-table-column label="接口名称">
        <template slot-scope="scope">
          <span>{{ scope.row.apiName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="ip地址">
        <template slot-scope="scope">
          <span>{{ scope.row.apiIp }}</span>
        </template>
      </el-table-column>
      <el-table-column label="接口路径">
        <template slot-scope="scope">
          <span>{{ scope.row.apiUrl }}</span>
        </template>
      </el-table-column>
      <el-table-column label="请求参数">
        <template slot-scope="scope">
          <span>{{ scope.row.apiParam }}</span>
        </template>
      </el-table-column>
      <el-table-column label="接口提供方">
        <template slot-scope="scope">
          <span>{{ scope.row.apiSys }}</span>
        </template>
      </el-table-column>
      <el-table-column label="业务描述">
        <template slot-scope="scope">
          <span>{{ scope.row.apiNote }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务环节">
        <template slot-scope="scope">
          <span>{{ scope.row.apiTask }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.actions')" width="300">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleCreate(scope.row)">{{ $t('table.add') }}</el-button>
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button type="primary" size="mini" @click="handleTest(scope.row)">测试</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row.apiId)">{{ $t('table.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="parameterDto.current" :limit.sync="parameterDto.size" @pagination="loadPageTableList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="submitForm" :model="submitForm" label-width="100px" class="organizationForm" style="width: 400px; margin-left:50px;">
        <el-form-item label="接口名称" prop="apiName">
          <el-input v-model.trim="submitForm.apiName" placeholder="输入接口名称" maxlength="32" />
        </el-form-item>
        <el-form-item label="IP地址" prop="apiIp">
          <el-input v-model.trim="submitForm.apiIp" placeholder="输入IP地址" maxlength="32" />
        </el-form-item>
        <el-form-item label="接口路径" prop="apiUrl">
          <el-input v-model.trim="submitForm.apiUrl" placeholder="输入接口路径" />
        </el-form-item>
        <el-form-item label="请求参数" prop="apiParam">
          <el-input v-model.trim="submitForm.apiParam" placeholder="输入请求参数" />
          <div class="sub-title" style="color:red;font-size:15px">请求参数格式：{"ip":"1"}；没有无需输入</div>
        </el-form-item>
        <el-form-item label="提供方" prop="apiSys">
          <el-input v-model.trim="submitForm.apiSys" placeholder="输入提供方" />
        </el-form-item>
        <el-form-item label="业务描述" prop="apiNote">
          <el-input v-model.trim="submitForm.apiNote" placeholder="输入业务描述" />
        </el-form-item>
        <el-form-item label="任务环节" prop="apiTask">
          <el-input v-model.trim="submitForm.apiTask" placeholder="输入任务环节" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{ $t('table.confirm') }}</el-button>
        <el-button v-else type="primary" @click="updateData">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
/**
  Auth: Lei.j1ang
  Created: 2018/1/19-14:54
*/
import { selectLapiList, addApiInfo, updateApiInfo, deleteApiInfo, testApiInfo } from '@/api/controlSys/apiInfo/apiinfo'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'ApiInfo',
  components: { Pagination },
  directives: {
    waves
  },
  data: () => ({
    apiList: [],
    total: 0,
    parameterDto: {
      apiName: '',
      current: 1,
      size: 10
    },
    textMap: {
      update: '编辑',
      create: '添加'
    },
    dialogStatus: '',
    dialogFormVisible: false,
    submitForm: {
      apiName: '',
      apiId: '',
      apiUrl: '',
      apiParam: '',
      apiSys: '',
      apiNote: '',
      apiTask: ''
    }
  }),
  created() {
    this.loadPageTableList()
  },
  methods: {
    loadPageTableList() {
      this.listLoading = true
      selectLapiList(this.parameterDto).then(response => {
        this.apiList = response.data
        this.total = response.count
        this.listLoading = false
      })
    },
    handleCreate() {
      this.apiName = ''
      this.apiId = ''
      this.apiUrl = ''
      this.apiSys = ''
      this.apiParam = ''
      this.apiNote = ''
      this.apiTask = ''
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.submitForm = {}
    },
    createData() {
      addApiInfo(this.submitForm).then(response => {
        if (response.code == 200) {
          this.$message({
            message: '新增成功',
            type: 'success'
          })
          this.loadPageTableList()
          this.$refs['submitForm'].resetFields()
          this.dialogFormVisible = false
        } else {
          this.$message({
            message: '新增失败',
            type: 'error'
          })
        }
      })
    },
    handleUpdate(row) {
      this.submitForm = Object.assign({}, row) // Object.assign方法用于对象的合并 复制到目标对象
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    updateData() {
      updateApiInfo(this.submitForm).then(response => {
        if (response.code == 200) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.loadPageTableList()
          this.$refs['submitForm'].resetFields()
          this.dialogFormVisible = false
        } else {
          this.$message({
            message: '修改失败',
            type: 'error'
          })
        }
      })
    },
    handleDelete(id) {
      this.$confirm(
        '删除该接口, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        this.listLoading = true
        deleteApiInfo(id).then(response => {
          if (response.code == 200) {
            this.listLoading = false
            this.loadPageTableList()
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
    },
    handleTest(row) {
      this.submitForm = Object.assign({}, row) // Object.assign方法用于对象的合并 复制到目标对象
      testApiInfo(this.submitForm).then(response => {
        this.$message({
          type: 'success',
          message: response
        })
      })
    }
  }
}
</script>

