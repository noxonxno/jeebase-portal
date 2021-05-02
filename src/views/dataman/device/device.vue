<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="parameterDto" class="demo-form-inline" @keyup.enter.native="loadPageTableList">
        <el-input v-model="parameterDto.deviceName" placeholder="设备名称" style="width: 150px;" class="filter-item" maxlength="32" />
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="loadPageTableList">搜索</el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate(false)">添加</el-button>
      </el-form>

    </div>

    <el-table :data="deviceList" row-key="id" border>
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
      <el-table-column label="设备状态">
        <template slot-scope="scope">
          <p v-if="scope.row.deviceState ==0">正常</p>
          <p v-if="scope.row.deviceState ==1">运行中</p>
          <p v-if="scope.row.deviceState ==2">空闲</p>
          <p v-if="scope.row.deviceState ==3">异常</p>
        </template>
      </el-table-column>
      <el-table-column label="创建人">
        <template slot-scope="scope">
          <span>{{ scope.row.createUser }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
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
          <el-button type="danger" size="mini" @click="handleDelete(scope.row.deviceId)">{{ $t('table.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="parameterDto.current" :limit.sync="parameterDto.size" @pagination="loadPageTableList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="submitForm" :model="submitForm" label-width="100px" class="organizationForm" style="width: 400px; margin-left:50px;">
        <el-form-item label="设备编码" prop="deviceCode">
          <el-input v-model.trim="submitForm.deviceCode" placeholder="输入设备编码" maxlength="32" />
        </el-form-item>
        <el-form-item label="设备名称" prop="deviceName">
          <el-input v-model.trim="submitForm.deviceName" placeholder="输入设备名称" maxlength="32" />
        </el-form-item>
        <el-form-item label="设备类型" prop="deviceType">
          <el-input v-model.trim="submitForm.deviceType" oninput="value=value.replace(/^\.+|[^\d.]/g,'')" placeholder="输入设备类型(输入编号)" />
          <div class="sub-title" style="color:red">0:辊道   1:天车   2:喷码机   3:切割机   4:举升机   5:小件分拣机器人   6:大件分拣机器人   7:沙光机   8:皮带输送线   9:入筐机器人</div>
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
import { selectDeviceList, addDevice, updateDevice, deleteDevice } from '@/api/controlSys/device/device'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'Device',
  components: { Pagination },
  directives: {
    waves
  },
  data: () => ({
    deviceList: [],
    total: 0,
    parameterDto: {
      deviceName: '',
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
      deviceCode: '',
      deviceName: '',
      deviceState: ''
    }
  }),
  created() {
    this.loadPageTableList()
  },
  methods: {
    loadPageTableList() {
      this.listLoading = true
      selectDeviceList(this.parameterDto).then(response => {
        this.deviceList = response.data
        this.total = response.count
        this.listLoading = false
      })
    },
    handleCreate() {
      this.deviceCode = ''
      this.deviceName = ''
      this.deviceState = ''
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.submitForm = {}
    },
    createData() {
      addDevice(this.submitForm).then(response => {
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
      updateDevice(this.submitForm).then(response => {
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

