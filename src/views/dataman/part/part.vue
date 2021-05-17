<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="parameterDto" class="demo-form-inline" @keyup.enter.native="loadPageTableList">
        <el-input v-model="parameterDto.partCode" placeholder="零件编号" style="width: 150px;" class="filter-item" maxlength="32" />
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="loadPageTableList">搜索</el-button>
        <!-- <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate(false)">添加</el-button> -->
      </el-form>
    </div>

    <el-table :data="partList" row-key="id" border>
      <el-table-column label="主计划编号">
        <template slot-scope="scope">
          <span>{{ scope.row.planCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="零件编号">
        <template slot-scope="scope">
          <span>{{ scope.row.partCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="零件类型">
        <template slot-scope="scope">
          <p v-if="scope.row.partType ==0">小件</p>
          <p v-if="scope.row.partType ==1">中件</p>
          <p v-if="scope.row.partType ==2">大件</p>
        </template>
      </el-table-column>
      <el-table-column label="零件状态">
        <template slot-scope="scope">
          {{ scope.row.partState ==0 ?"正常":"异常" }}
        </template>
      </el-table-column>
      <el-table-column label="分拣开始时间">
        <template slot-scope="scope">
          <span>{{ scope.row.startTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分拣结束时间">
        <template slot-scope="scope">
          <span>{{ scope.row.endTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="入框开始时间">
        <template slot-scope="scope">
          <span>{{ scope.row.rkStartTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="入框结束时间">
        <template slot-scope="scope">
          <span>{{ scope.row.rkEndTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="料框编码">
        <template slot-scope="scope">
          <span>{{ scope.row.frameCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="长">
        <template slot-scope="scope">
          <span>{{ scope.row.length }}</span>
        </template>
      </el-table-column>
      <el-table-column label="宽">
        <template slot-scope="scope">
          <span>{{ scope.row.width }}</span>
        </template>
      </el-table-column>
      <el-table-column label="高">
        <template slot-scope="scope">
          <span>{{ scope.row.height }}</span>
        </template>
      </el-table-column>
      <el-table-column label="重">
        <template slot-scope="scope">
          <span>{{ scope.row.weight }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分拣类型">
        <template slot-scope="scope">
          {{ scope.row.fjType ==  0 ?"机械":"人工" }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column :label="$t('table.actions')" width="300">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleCreate(scope.row)">{{ $t('table.add') }}</el-button>
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row.partId)">{{ $t('table.delete') }}</el-button>
        </template>
      </el-table-column> -->
    </el-table>



    <pagination v-show="total>0" :total="total" :page.sync="parameterDto.current" :limit.sync="parameterDto.size" @pagination="loadPageTableList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="submitForm" :model="submitForm" label-width="100px" class="organizationForm" style="width: 400px; margin-left:50px;">
        <el-form-item label="零件编号" prop="partCode" label-width="110px">
          <el-input v-model.trim="submitForm.partCode" placeholder="输入零件编号" maxlength="32" />
        </el-form-item>
        <el-form-item label="主计划编码" prop="planCode" label-width="110px">
          <el-input v-model.trim="submitForm.planCode" placeholder="输入主计划编码"/>
        </el-form-item>
        <el-form-item label="零件类型" prop="partType" label-width="110px">
          <el-input v-model.trim="submitForm.partType" placeholder="输入零件类型"/>
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
import { pcPartList, pcAddPart, updatePart, removePart } from '@/api/controlSys/part/part'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'Location',
  components: { Pagination },
  directives: {
    waves
  },
  data: () => ({
    partList: [],
    total: 0,
    parameterDto: {
      partCode: '',
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
      partId: '',
      partCode: '',
      planCode: '',
      partType: ''
    }
  }),
  created() {
    this.loadPageTableList()
  },
  methods: {
    loadPageTableList() {
      this.listLoading = true
      pcPartList(this.parameterDto).then(response => {
        this.partList = response.data
        this.total = response.count
        this.listLoading = false
      })
    },
    handleCreate() {
      this.partCode = ''
      this.planCode = ''
      this.partType = ''
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.submitForm = {}
    },
    createData() {
      pcAddPart(this.submitForm).then(response => {
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
      updatePart(this.submitForm).then(response => {
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
        removePart(id).then(response => {
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

