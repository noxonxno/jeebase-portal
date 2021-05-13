<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="parameterDto" class="demo-form-inline" @keyup.enter.native="loadPageTableList">
        <el-input v-model="parameterDto.taryInfo" placeholder="托盘信息" style="width: 150px;" class="filter-item" maxlength="32" />
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="loadPageTableList">搜索</el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate(false)">添加</el-button>
        <el-input
          v-model="taryFixNum"
          autocomplete="off"
          placeholder="设置托盘阈值"
          oninput="value=value.replace(/[^\d]/g,'')"
          class="filter-item"
          style="width: 150px; margin-left: 100px"
          @blur="updateTaryFixNumFun"
        />
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" @click="updateTaryFixNum">确定</el-button>
      </el-form>

    </div>

    <el-table :data="taryList" row-key="id" border>
      <el-table-column label="托盘编号">
        <template slot-scope="scope">
          <span :id="scope.row.id">{{ scope.row.taryId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="托盘信息">
        <template slot-scope="scope">
          <span>{{ scope.row.taryInfo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="托盘状态">
        <template slot-scope="scope">
          {{ scope.row.taryState==0 ?"正常":"异常" }}
        </template>
      </el-table-column>
      <el-table-column label="使用次数标记">
        <template slot-scope="scope">
          <span>{{ scope.row.taryNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="使用累计次数">
        <template slot-scope="scope">
          <span>{{ scope.row.taryMaxNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="使用阈值">
        <template slot-scope="scope">
          <span>{{ scope.row.taryFixNum }}</span>
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
          <el-button type="danger" size="mini" @click="handleDelete(scope.row.taryId)">{{ $t('table.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="parameterDto.current" :limit.sync="parameterDto.size" @pagination="loadPageTableList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="submitForm" :model="submitForm" label-width="120px" class="organizationForm" style="width: 400px; margin-left:50px;">
        <el-form-item label="托盘信息" prop="taryInfo">
          <el-input v-model.trim="submitForm.taryInfo" placeholder="输入托盘信息" maxlength="32" />
        </el-form-item>
        <el-form-item label="托盘使用次数" prop="taryNum">
          <el-input v-model.trim="submitForm.taryNum" placeholder="输入托盘使用次数" oninput="value=value.replace(/[^0-9]/g,'')" @blur="taryNumFun" />
        </el-form-item>
        <el-form-item label="托盘使用阈值" prop="taryFixNum">
          <el-input v-model.trim="submitForm.taryFixNum" placeholder="输入托盘使用阈值" oninput="value=value.replace(/[^0-9]/g,'')" @blur="taryFixNumFun" />
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
import { selectTrayList, addTary, updateTary, deleteTaryById, batchUpdate } from '@/api/controlSys/tary/tary'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'Tary',
  components: { Pagination },
  directives: {
    waves
  },
  data: () => ({
    taryFixNum: '',
    taryList: [],
    total: 0,
    parameterDto: {
      taryInfo: '',
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
      taryInfo: '',
      taryNum: '',
      taryFixNum: ''
    }
  }),
  created() {
    this.loadPageTableList()
  },
  methods: {
    updateTaryFixNumFun(e) {
      this.taryFixNum = e.target.value
    },
    taryNumFun(e) {
      this.submitForm.taryNum = e.target.value
    },
    taryFixNumFun(e) {
      this.submitForm.taryFixNum = e.target.value
    },
    loadPageTableList() {
      this.listLoading = true
      selectTrayList(this.parameterDto).then(response => {
        this.taryList = response.data
        this.total = response.count
        this.listLoading = false
      })
    },
    handleCreate() {
      this.taryInfo = ''
      this.taryNum = ''
      this.taryFixNum = ''
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.submitForm = {}
    },
    createData() {
      addTary(this.submitForm).then(response => {
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
      updateTary(this.submitForm).then(response => {
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
        '删除该托盘, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        this.listLoading = true
        deleteTaryById(id).then(response => {
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
    },
    updateTaryFixNum() {
      var fixNum = this.taryFixNum
      console.log(fixNum)
      if (fixNum <= 0) {
        this.$message({
          type: 'error',
          message: '阈值必须大于0'
        })
        return
      }
      this.$confirm(
        '设置所有托盘阈值, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        this.listLoading = true
        batchUpdate(fixNum).then(() => {
          this.listLoading = false
          this.loadPageTableList()
          this.taryFixNum = ''
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
        })
      })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          })
        })
    }
  }
}
</script>

