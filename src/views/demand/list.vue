<template>
  <div class="className">
    <el-card class="anoCard">
      <!-- <div slot="header">
        <span>需求列表</span>
      </div> -->
      <!-- <search-box></search-box> -->
      <div class="searchDiv">
        <el-input
          type="text"
          placeholder="请输入需求号"
          class="width1"
          v-model="sch_order"
        ></el-input>
        <el-select
          v-model="sch_status"
          clearable
          class="width1"
          placeholde="请选择状态"
        >
          <el-option
            v-for="item in options"
            :label="item.label"
            :value="item.value"
            :key="item.value"
          ></el-option>
        </el-select>
        <el-date-picker
          class="width1"
          v-model="sch_date"
          type="date"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <el-button type="primary" icon="el-icon-search" @click="searchTab()"
          >搜索</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="addTab"
          >添加</el-button
        >
      </div>
      <el-table :data="tableData" border stripe> 
        <el-table-column type="expand">
          <template slot-scope="props">
            {{props.row.desc}}
            <div v-html="props.row.desc"></div>
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称"> 
              </el-form-item>
              <el-form-item label="所属店铺"> 
              </el-form-item>
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item> 
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="billCode" label="需求编号" width="200"></el-table-column>
        <el-table-column prop="inputDate" label="录入时间" width="100"></el-table-column>
        <el-table-column prop="customerName" label="客户名称"></el-table-column>
        <el-table-column prop="telephone" label="手机" width="150"></el-table-column>
        <el-table-column prop="implement" label="实施/客服"  width="100"></el-table-column>
        <el-table-column prop="status" label="状态" width="80">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | tagClass">{{
              scope.row | statusText
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="editTable(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              type="warning"
              @click="toConfirm(scope.row)"
              :disabled="scope.row.status === 1 ? false : true"
              >审核</el-button
            >
            <!-- <el-button
              type="success"
              @click="toSuccess(scope.row)"
              :disabled="scope.row.status === 2 ? false : true"
              >完成</el-button
            > -->
            <el-button
              type="danger"
              @click="toDelete(scope.row)"
              :disabled="scope.row.status !== 3 ? false : true"
              >取消</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total, sizes, prev, pager, next"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        :current-page="currentPage"
        :total="total"
        class="fyDiv"
        @size-change="handleSize"
        @current-change="handlePage"
      >
      </el-pagination>
    </el-card>
    <el-dialog title="需求修改" :visible.sync="diaIsShow" class="diaForm">
      <el-form
        ref="diaForm"
        :model="formData"
        :rules="rules"
        label-width="140px"
      >
        <el-form-item label="需求编号">
          <el-input
            type="text"
            v-model="formData.billCode"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="录入时间" prop="inputDate">
          <el-date-picker
            v-model="formData.inputDate"
            type="date"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="客户名称" prop="customerName">
          <el-input
            type="text"
            placeholder="请输入客户名称"
            v-model="formData.customerName"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="telephone">
          <el-input
            type="text"
            placeholder="请输入电话"
            v-model="formData.telephone"
          ></el-input>
        </el-form-item>
        <el-form-item label="实施/客服" prop="implement">
          <el-input
            type="text"
            placeholder="请输入实施/客服"
            v-model="formData.implement"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="formData.status" placeholde="请选择状态">
            <el-option
              v-for="item in options"
              :label="item.label"
              :value="item.value"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changeTab('diaForm', editType)"
            >确认</el-button
          >
          <el-button @click="diaIsShow = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getPageTab2 } from '@/api/table'
import { getDemandList,create,confirm } from '@/api/demand'
import SearchBox from './components/SearchBox'
export default {
  components:{
      SearchBox
  },
  data() {
    return {
      tableData1: [],
      tableData: [],
      allList: [],
      schArr: [],
      sch_order: '',
      sch_status: null,
      sch_date: null,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      pageSizes: [10, 20, 30, 40],
      diaIsShow: false,
      formData: {},
      editType: '',
      options: [
        { label: '待审核', value: 1 },
        { label: '配送中', value: 2 },
        { label: '已完成', value: 0 },
        { label: '已取消', value: 3 }
      ],
      rowIndex: 0,
      rules: {
        // order: [{ required: true, message: '请输入订单号', trigger: 'blur' }],
        inputDate: [
          {
            // type: 'datetime',
            required: true,
            message: '请输入时间',
            trigger: 'change'
          }
        ],
        customerName: [{ required: true, message: '请输入客户名称', trigger: 'blur' }],
        telephone: [{ required: true, message: '请输入联系方式', trigger: 'blur' }],
        implement: [{ required: true, message: '请输入实施员', trigger: 'blur' }],
        status: [
          { required: true, message: '请选择订单状态', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this._getPageTab2()
  },
  filters: {
    statusText(row) {
      let val =row.status
      if (val === undefined) return
      if (val === 0) {
        return '已完成'
      } else if (val === 1) {
        return '待审核'
      } else if (val === 2) {
        return '配送中'
      } else {
        return '已取消'
      }
    },
    tagClass(val) {
      if (val === undefined) return
      if (val === 0) {
        return 'success'
      } else if (val === 1) {
        return 'info'
      } else if (val === 2) {
        return 'warning'
      } else {
        return 'danger'
      }
    }
  },
  methods: {
    //切换页面大小
    handleSize(val) {
      this.pageSize = val
      this.getPageData()
    },
    //切换页码
    handlePage(val) {
      this.currentPage = val
      this.getPageData()
    },
    _getPageTab2() {
      getDemandList({
        index:this.currentPage,
        size:this.pageSize
      })
        .then(res => { 
          res.data.tableList.forEach(item=>{ 
            item.desc =  `<h1>I believe I can fly `+ item.id +`</h1>`
          })
          this.allList = res.data.tableList  
          this.schArr = this.allList
          this.getPageData()
          this.total = res.data.total
        })
        .catch(error => {
          this.$message.error(error.message)
        }) 
    },
    //获取页面数据
    getPageData() {
      let start = (this.currentPage - 1) * this.pageSize
      let end = start + this.pageSize
      this.tableData = this.schArr.slice(start, end) 
    },
    // 查找
    searchTab() {
      let arrList = []
      for (let item of this.allList) {
        if (
          this.sch_order.trim() === '' &&
          this.sch_status === null &&
          this.sch_date === null
        ) {
          arrList = this.allList
          break
        } else if (
          item.order.startsWith(this.sch_order) &&
          (this.sch_status !== null ? item.status === this.sch_status : true) &&
          (this.sch_date !== null ? item.time.startsWith(this.sch_date) : true)
        ) {
          let obj = Object.assign({}, item)
          arrList.push(obj)
        }
      }
      this.schArr = arrList
      this.total = arrList.length
      this.currentPage = 1
      this.pageSize = 10
      this.getPageData()
    },
    // add 添加
    addTab() {
      this.formData = {}
      this.diaIsShow = true
      this.formData.billCode = (Math.random() * 10e18).toString()
      this.formData.id = this.allList.length + 1
      this.formData.inputDate = new Date()
      this.formData.status = 1
      this.editType = 'add'
      this.$nextTick(() => {
        this.$refs.diaForm.clearValidate()
      })
    },
    // 编辑
    editTable(index, row) {
      this.formData = Object.assign({}, row)
      this.editType = 'update'
      this.diaIsShow = true
      this.$nextTick(() => {
        this.$refs.diaForm.clearValidate()
      })
      this.rowIndex = index
    },
    // 审核
    toConfirm(row) {
      confirm({id:row.id}).then(res=>{
        if (res.error_code===0) {
          row.status = 2
          this.$notify({
            title: '成功',
            message: res.msg,
            type: 'success'
          })
        }
      }) 
    },
    // 完成
    toSuccess(row) {
      row.status = 0
      this.$notify({
        title: '成功',
        message: '该订单已完成配送',
        type: 'success'
      })
    },
    // 取消
    toDelete(row) {
      row.status = 3
      this.$notify({
        title: '成功',
        message: '已取消该订单',
        type: 'success'
      })
    },
    //对话框点击确定
    changeTab(form, type) {
      //验证表单数据
      this.$refs[form].validate(valid => {
        if (valid) {
          let newObject = Object.assign({}, this.formData)
          create(newObject).then(res=>{
                if (res.success) {
                  if (type === 'update') {
                    // 解决数组不能通过索引响应数据变化
                    this.$set(this.tableData,this.rowIndex,newObject)
                  }else {
                    this.tableData.unshift(newObject)
                    this.allList.push(newObject)
                  }
                  
                  this.$notify({
                    title: '成功',
                    message: res.data.msg,
                    type: 'success'
                  }) 
                  
                }
            }).finally(()=>this.diaIsShow = false)
        } else {
          return
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.fyDiv {
  float: right;
  margin-top: 30px;
  padding-bottom: 20px;
}
.anoCard .el-table .el-button {
  padding: 8px 18px;
  font-size: 12px;
}
.searchDiv {
  margin-bottom: 20px;
  .el-button {
    padding: 11px 20px;
  }
}
.width1 {
  width: 180px;
  margin-right: 10px;
}
.diaForm {
  .el-input {
    width: 350px;
  }
}
</style>
<style lang="scss">
.anoCard {
  .el-card__body:after {
    content: '';
    clear: both;
    width: 0;
    height: 0;
    visibility: hidden;
    display: block;
  }
}
.diaForm .el-form-item__label {
  padding-right: 20px;
}
.searchDiv [class^='el-icon'] {
  color: #fff;
}
</style>
