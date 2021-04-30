<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="parameterDto" class="demo-form-inline" @keyup.enter.native="loadPageTableList">
          <el-input v-model="parameterDto.plcName" placeholder="标识名称" style="width: 150px;" class="filter-item" maxlength="32" />
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="loadPageTableList">搜索</el-button>
          <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate(false)">添加</el-button>
      </el-form>

    </div>

    <el-table :data="plcList" row-key="id" border>
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
      <el-table-column label="标识名称">
        <template slot-scope="scope">
          <span>{{ scope.row.plcName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述">
        <template slot-scope="scope">
          <span>{{ scope.row.plcNote }}</span>
        </template>
      </el-table-column>
     
      <el-table-column :label="$t('table.actions')" width="300">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleCreate(scope.row)">{{ $t('table.add') }}</el-button>
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row.plcId)">{{ $t('table.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0"  :total="total"  :page.sync="parameterDto.current" :limit.sync="parameterDto.size" @pagination="loadPageTableList" />



    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="submitForm" :model="submitForm" label-width="100px" class="organizationForm" style="width: 400px; margin-left:50px;">
        <el-form-item label="设备编码" prop="deviceCode">
          <el-input v-model.trim="submitForm.deviceCode" placeholder="输入设备编码" maxlength="32" />
        </el-form-item>
        <el-form-item label="标识名称" prop="plcName">
          <el-input v-model.trim="submitForm.plcName" placeholder="输入标识名称" maxlength="32" />
        </el-form-item>
        <el-form-item label="描述" prop="plcNote">
          <el-input v-model.trim="submitForm.plcNote" placeholder="输入描述" />
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
import { selectListPlcInfo, addPlcInfo, updatePlcInfo, deletePlcInfo} from '@/api/controlSys/plcinfo/plcinfo'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'plcInfo',
  components: { Pagination },
  data: () => ({
    plcList: [],
    total: 0,
    parameterDto: { 
      plcName: "",
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
      plcName: "",
      plcNote: ""
    }
  }),
  directives: {
    waves
  },
  created() {
  this.loadPageTableList();
  },
  methods: {
      loadPageTableList(){
        this.listLoading = true
        selectListPlcInfo(this.parameterDto).then(response => {
          this.plcList = response.data
          this.total = response.count
          this.listLoading = false
          })
      },
      handleCreate() {
        this.deviceCode = ""
        this.plcName = ""
        this.plcNote = ""
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.submitForm = {}
        
      },
      createData() {
        addPlcInfo(this.submitForm).then(response => {
           if(response.code==200){
              this.$message({
                  message: '新增成功',
                  type: 'success'
              })
              this.loadPageTableList();
              this.$refs['submitForm'].resetFields()
              this.dialogFormVisible = false
           }else{
              this.$message({
                  message: '新增失败',
                  type: 'error'
              })
           }
        })
      },
      handleUpdate(row) {
        this.submitForm = Object.assign({}, row) //Object.assign方法用于对象的合并 复制到目标对象
          this.dialogStatus = 'update'
          this.dialogFormVisible = true
      },
      updateData() {
         updatePlcInfo(this.submitForm).then(response => {
           if(response.code==200){
              this.$message({
                  message: '修改成功',
                  type: 'success'
              })
              this.loadPageTableList();
              this.$refs['submitForm'].resetFields()
              this.dialogFormVisible = false
           }else{
              this.$message({
                  message: '修改失败',
                  type: 'error'
              })
           }
        })
      },
      handleDelete(id) {
      this.$confirm(
        '删除该点位, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
          this.listLoading = true
          deletePlcInfo(id).then(response => {
            if(response.code==200){
                this.listLoading = false
                this.loadPageTableList();
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
            }else{
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



