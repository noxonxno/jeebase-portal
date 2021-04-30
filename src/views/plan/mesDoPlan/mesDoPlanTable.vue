<template>
  <div class="app-container">
    <!-- 搜索 -->
    <div class="filter-container">
      <el-form :inline="true"
               :model="parameterDto"
               class="demo-form-inline"
               @keyup.enter.native="loadPageTableList">
        <el-input v-model="parameterDto.deviceName"
                  placeholder="MES可执行计划编号"
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
                   @click="loadPageTableList(false)">导入</el-button>
      </el-form>

    </div>
    <!-- 数据table -->
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
      <el-table-column label="计划数量">
        <template slot-scope="scope">
          <span>{{ scope.row.deviceName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="通知状态">
        <template slot-scope="scope">
          <p v-if="scope.row.state ==0">待校验</p>
          <p v-if="scope.row.state ==1">校验中</p>
          <p v-if="scope.row.state ==2">通过校验</p>
          <p v-if="scope.row.state ==3">校验失败</p>
        </template>
      </el-table-column>
      <el-table-column label="序号">
        <template slot-scope="scope">
          <span>{{ scope.row.adviceOrder }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')"
                       width="300">
        <template slot-scope="scope">
          <el-button type="primary"
                     size="mini"
                     @click="loadPageTableList(scope.row)">错误上报
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 底部分页 -->
    <pagination v-show="total>0"
                :total="total"
                :page.sync="parameterDto.current"
                :limit.sync="parameterDto.size"
                @pagination="loadPageTableList" />

    <!-- 添加校验表单 -->
    <el-dialog :title="textMap[dialogStatus]"
               :visible.sync="dialogFormVisible">
      <el-form ref="submitForm"
               :model="submitForm"
               label-width="100px"
               class="organizationForm"
               style="width: 400px; margin-left:50px;">
        <el-form-item label="设备编码"
                      prop="deviceCode">
          <el-input v-model.trim="submitForm.deviceCode"
                    placeholder="输入设备编码"
                    maxlength="32" />
        </el-form-item>
        <el-form-item label="设备名称"
                      prop="deviceName">
          <el-input v-model.trim="submitForm.deviceName"
                    placeholder="输入设备名称"
                    maxlength="32" />
        </el-form-item>
        <el-form-item label="设备类型"
                      prop="deviceType">
          <el-input v-model.trim="submitForm.deviceType"
                    oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
                    placeholder="输入设备类型(输入编号)" />
          <div class="sub-title"
               style="color:red">0:辊道 1:天车 2:喷码机 3:切割机 4:举升机 5:小件分拣机器人 6:大件分拣机器人 7:沙光机 8:皮带输送线 9:入筐机器人</div>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button v-if="dialogStatus=='create'"
                   type="primary"
                   @click="createData">{{ $t('table.confirm') }}</el-button>
        <el-button v-else
                   type="primary"
                   @click="updateData">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/**
  Auth: Lei.j1ang
  Created: 2018/1/19-14:54
*/
import { selectMesDoPlanList } from '@/api/plan/mesDoPlan'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'mesDoPlanTable',
  components: { Pagination },
  data: () => ({
    mesDoPlanList: [],
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
      selectMesDoPlanList(this.parameterDto).then(response => {
        this.mesDoPlanList = response.data
        this.total = response.count
        this.listLoading = false
      })
    },
  }
}
</script>



