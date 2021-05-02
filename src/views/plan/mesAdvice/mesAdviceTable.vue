<template>
  <div class="app-container">
    <!-- 搜索栏 -->
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
      </el-form>
    </div>
    <!-- exl导入 -->
    <div>
      <div>
        <el-upload style="margin-left: 8px;"
                   class="upload-demo inline-block margin-right-10"
                   action=""
                   :on-change="handleChange"
                   :show-file-list="false"
                   :on-remove="handleRemove"
                   :file-list="fileListUpload"
                   :limit="limitUpload"
                   accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                   :auto-upload="false">
          <el-button type="primary">导入</el-button>
          <el-link href="src/template/xxx.xlsx"
                   style="margin-left: 8px;">
            <el-button type="primary">模板下载</el-button>
          </el-link>
        </el-upload>
      </div>
    </div>
    <!-- 表单信息 -->
    <el-table :data="mesAdviceList"
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
    <!-- excel确认 -->
    <el-dialog title="导入数据(XXX)"
               :visible.sync="dialogVisible"
               width="60%"
               :before-close="handleClose"
               center>
      <el-table :data="excelList"
                border
                style="width: 100%;">
        <el-table-column prop="xxx"
                         header-align="center"
                         align="center"
                         label="XXX">
        </el-table-column>
      </el-table>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button type="primary"
                   @click="importExcel()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 详情弹窗 -->
    <el-dialog title="计划通知详情"
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
      <!-- <el-table :data="detailList"
              border
              style="width: 100%;">
      <el-table-column prop="计划执行状态"
                        header-align="center"
                        align="center"
                        label="计划执行状态">
      </el-table-column>
      <el-table-column prop="切割校验状态"
                        header-align="center"
                        align="center"
                        label="切割校验状态">
      </el-table-column>
      <el-table-column prop="分拣校验状态"
                        header-align="center"
                        align="center"
                        label="分拣校验状态">
      </el-table-column>
      <el-table-column prop="计划错误类型"
                        header-align="center"
                        align="center"
                        label="计划错误类型">
      </el-table-column>
      <el-table-column :label="$t('table.actions')">
        <template slot-scope="scope">
          <el-button type="primary"
                      size="mini"
                      @click="errReport(scope.row)">错误上报
          </el-button>
        </template>
      </el-table-column>
    </el-table> -->
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
import { selectMesAdviceList, importExl, getDetails } from '@/api/plan/mesAdivce'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'mesAdivce',
  components: { Pagination },
  data: () => ({
    fileListUpload: [],
    limitUpload: 3,
    excelList: [],
    mesAdviceList: [],
    mesAdviceDetailList: [],
    dialogVisible: false,
    detailsVisible: false,
    total: 0,
    parameterDto: {
      mesAdivceCode: "",
      current: 1,
      size: 10,
    },
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
    // 加载表单数据方法
    loadPageTableList () {
      this.listLoading = true
      selectMesAdviceList(this.parameterDto).then(response => {
        this.mesAdviceList = response.data
        this.total = response.count
        this.listLoading = false
      })
    },

    //查看详情计划
    mesAdviceDetails (mesAdiveId) {
      this.detailsVisible = true
      getDetails(mesAdiveId).then(response => {
        this.mesAdviceDetailList = response.data

      })
    },

    //错误上报
    errReport () {
    },

    // excel表上传
    handleChange (file, fileList) {
      this.fileTemp = file.raw
      let fileName = file.raw.name
      let fileType = fileName.substring(fileName.lastIndexOf('.') + 1);
      // 判断上传文件格式
      if (this.fileTemp) {
        if ((fileType == 'xlsx') || (fileType == 'xls')) {
          this.importf(this.fileTemp)
        } else {
          this.$message({
            type: 'warning',
            message: '附件格式错误，请删除后重新上传！'
          })
        }
      } else {
        this.$message({
          type: 'warning',
          message: '请上传附件！'
        })
      }
    },
    // 移除excel表
    handleRemove (file, fileList) {
      this.fileTemp = null
    },
    //取消导入
    handleClose (done) {
      this.dialogVisible = false;
    },
    //确认导入
    importExcel () {
      importExl(this.excelList).then(({ data }) => {
        if (data && data.code === 0) {
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1500
          })
          this.selectMesAdviceList(this.parameterDto)
        }
      })
      this.dialogVisible = false;
    },
    //导入的方法
    importf (obj) {
      this.dialogVisible = true;
      let _this = this;
      let inputDOM = this.$refs.inputer;   // 通过DOM取文件数据
      this.file = event.currentTarget.files[0];
      var rABS = false; //是否将文件读取为二进制字符串
      var f = this.file;
      var reader = new FileReader();
      //if (!FileReader.prototype.readAsBinaryString) {
      FileReader.prototype.readAsBinaryString = function (f) {
        var binary = "";
        var rABS = false; //是否将文件读取为二进制字符串
        var pt = this;
        var wb; //读取完成的数据
        var outdata;
        var reader = new FileReader();
        reader.onload = function (e) {
          var bytes = new Uint8Array(reader.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          var XLSX = require('xlsx');
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
              type: 'base64'
            });
          } else {
            wb = XLSX.read(binary, {
              type: 'binary'
            });
          }
          // outdata就是你想要的东西 excel导入的数据
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
          // excel 数据再处理
          let arr = []
          outdata.map(v => {
            // let jsonString = JSON.stringify(v).replace(/\*/g, '').replace(/\s/ig,'');
            let jsonString = JSON.stringify(v).replace(/\//g, '').replace(/\s/ig, '');
            debugger;
            console.log(jsonString);
            v = JSON.parse(jsonString);
            let obj = {}
            //xxx代表列名
            obj.riskType = v.xxx
            obj.riskDescription = v.xxx
            obj.typeAccident = v.xxx
            obj.riskLevel = v.xxx
            obj.controlMeasures = v.xxx
            obj.hierarchyManage = v.xxx
            obj.orgLiableDict = v.xxx
            obj.personLiableDict = v.xxx
            // obj.id = v.id
            arr.push(obj)
          })
          _this.excelList = [...arr];
        }
        reader.readAsArrayBuffer(f);
      }
      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },
  },
}
</script>



