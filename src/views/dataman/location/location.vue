<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="parameterDto" class="demo-form-inline" @keyup.enter.native="loadPageTableList">
        <el-input v-model="parameterDto.steelType" placeholder="存放型号" style="width: 150px;" class="filter-item" maxlength="32" />
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="loadPageTableList">搜索</el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate(false)">添加</el-button>
      </el-form>
    </div>

    <el-table :data="locationList" row-key="id" border>
      <el-table-column label="库位编号">
        <template slot-scope="scope">
          <span>{{ scope.row.locationCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="库位状态">
        <template slot-scope="scope">
          {{ scope.row.locationState ==0 ?"正常":"异常" }}
        </template>
      </el-table-column>
      <el-table-column label="库位型号">
        <template slot-scope="scope">
          <span>{{ scope.row.steelType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最大存放数量">
        <template slot-scope="scope">
          <span>{{ scope.row.locationMaxNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="库存数量">
        <template slot-scope="scope">
          <span>{{ scope.row.locationTotal }}</span>
        </template>
      </el-table-column>
      <el-table-column label="负责人">
        <template slot-scope="scope">
          <span>{{ scope.row.locationUser }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改人">
        <template slot-scope="scope">
          <span>{{ scope.row.updateUser }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改时间">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" width="300">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleCreate(scope.row)">{{ $t('table.add') }}</el-button>
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row.locationId)">{{ $t('table.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="parameterDto.current" :limit.sync="parameterDto.size" @pagination="loadPageTableList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="submitForm" :model="submitForm" label-width="100px" class="organizationForm" style="width: 400px; margin-left:50px;">
        <el-form-item label="库存型号" prop="steelType" label-width="110px">
          <el-input v-model.trim="submitForm.steelType" placeholder="输入库存型号" maxlength="32" />
        </el-form-item>
        <el-form-item label="最大库存数量" prop="locationMaxNum" label-width="110px">
          <el-input v-model.trim="submitForm.locationMaxNum" oninput="value=value.replace(/^\.+|[^\d.]/g,'')" placeholder="输入最大库存数量" />
        </el-form-item>
        <el-form-item label="库存数量" prop="locationTotal" label-width="110px">
          <el-input v-model.trim="submitForm.locationTotal" oninput="value=value.replace(/^\.+|[^\d.]/g,'')" placeholder="输入库存数量" />
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
import { selectLocationList, addLocation, updateLocation, removeLocation } from '@/api/controlSys/location/location'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'Location',
  components: { Pagination },
  directives: {
    waves
  },
  data: () => ({
    locationList: [],
    total: 0,
    parameterDto: {
      steelType: '',
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
      locationId: '',
      locationCode: '',
      steelType: '',
      locationMaxNum: '',
      locationTotal: ''
    }
  }),
  created() {
    this.loadPageTableList()
  },
  methods: {
    loadPageTableList() {
      this.listLoading = true
      selectLocationList(this.parameterDto).then(response => {
        this.locationList = response.data
        this.total = response.count
        this.listLoading = false
      })
    },
    handleCreate() {
      this.steelType = ''
      this.locationMaxNum = ''
      this.locationTotal = ''
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.submitForm = {}
    },
    createData() {
      addLocation(this.submitForm).then(response => {
        if (response.code === 200) {
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
      updateLocation(this.submitForm).then(response => {
        if (response.code === 200) {
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
        '删除该库位, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        this.listLoading = true
        removeLocation(id).then(response => {
          if (response.code === 200) {
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
    }
  }
}
</script>

