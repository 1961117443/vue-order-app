<template>
  <div class="className">
    <el-card class="anoCard">
      <!-- <div slot="header">
        <span>需求录入</span>
      </div>-->
      <div class="searchDiv">
        <el-input type="text" placeholder="请输入需求号" class="width1" v-model="sch_order"></el-input>
        <el-select v-model="sch_status" clearable class="width1" placeholde="请选择状态">
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
        <el-button type="primary" icon="el-icon-search" @click="searchTab()">搜索</el-button>
      </div>
      <el-table :data="tableData" border stripe>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="billCode" label="需求编号" width="200"></el-table-column>
        <el-table-column prop="auditDate" label="审核时间" width="160"></el-table-column>
        <el-table-column prop="customerName" label="客户名称"></el-table-column> 
        <el-table-column prop="employeeName" label="开发人员" width="80">
          <template slot-scope="scope">
            <el-tag :type="scope.row | tagClass">{{ scope.row.employeeName }} </el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row | tagClass">{{ scope.row | statusText }}</el-tag>
          </template>
        </el-table-column> -->
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <!-- <el-button
              type="warning"
              @click="toConfirm(scope.row)"
              :disabled="scope.row.status === 1 ? false : true"
            >接收</el-button> -->
            <el-button type="primary" @click="toAssign(scope.$index, scope.row)">指派</el-button>
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
      ></el-pagination>
    </el-card>
    <!--指派开发人员的对话框-->
    <el-dialog title="需求指派" :visible.sync="diaIsShow" class="diaForm">
      <el-form ref="diaForm" :model="formData" :rules="rules" label-width="140px">
        <el-form-item label="需求编号">
          <el-input type="text" v-model="formData.billCode" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="客户名称" prop="customerName">
          <el-input
            type="text"
            placeholder="请输入客户名称"
            v-model="formData.customerName"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="开发人员" prop="employeeId">
          <el-select
            v-model="formData.employeeId"
            placeholde="请选择开发人员"
            clearable
            @change="changeEmployeeId"
          >
            <el-option v-for="item in userList" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="状态" prop="status">
          <el-select v-model="formData.status" placeholde="请选择状态">
            <el-option
              v-for="item in options"
              :label="item.label"
              :value="item.value"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="changeTab('diaForm', editType)">确认</el-button>
          <el-button @click="diaIsShow = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getPageTab2 } from "@/api/table";
import { getDemandAssign } from "@/api/demand";
export default {
  data() {
    return {
      tableData1: [],
      tableData: [],
      allList: [],
      schArr: [],
      sch_order: "",
      sch_status: null,
      sch_date: null,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      pageSizes: [10, 20, 30, 40],
      diaIsShow: false,
      formData: {},
      editType: "",
      userList: [
        { name: "张三", id: 1 },
        { name: "李四", id: 2 },
        { name: "王五", id: 3 },
        { name: "田七", id: 4 },
        { name: "黑八", id: 5 }
      ],
      options: [{ label: "待指派", value: 0 }, { label: "待完成", value: 1 }],
      rowIndex: 0,
      rules: {
        employeeId: [
          { required: false, message: "请选择开发人员", trigger: "blur" }
        ],
        status: [
          { required: true, message: "请选择需求状态", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this._getPageTab2();
  },
  filters: {
    statusText(row) {
      let val = row.employeeName;
      return val ? "待完成" : "待指派";
    },
    tagClass(row) {
      let val = row.employeeName;
      return val ? "danger" : "info";
    }
  },
  methods: {
    //改变开发人员
    changeEmployeeId(key) {
      let user = this.userList.find(u => u.id === key);
      this.formData.employeeName = user ? user.name : "";
    },
    //切换页面大小
    handleSize(val) {
      this.pageSize = val;
      this.getPageData();
    },
    //切换页码
    handlePage(val) {
      this.currentPage = val;
      this.getPageData();
    },
    _getPageTab2() {
      getDemandAssign()
        .then(res => {
          this.allList = res.data.tableList;
          this.schArr = this.allList;
          this.getPageData();
          this.total = res.data.total;
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    //获取页面数据
    getPageData() {
      let start = (this.currentPage - 1) * this.pageSize;
      let end = start + this.pageSize;
      this.tableData = this.schArr.slice(start, end);
    },
    // 查找
    searchTab() {
      let arrList = [];
      for (let item of this.allList) {
        if (
          this.sch_order.trim() === "" &&
          this.sch_status === null &&
          this.sch_date === null
        ) {
          arrList = this.allList;
          break;
        } else if (
          item.order.startsWith(this.sch_order) &&
          (this.sch_status !== null ? item.status === this.sch_status : true) &&
          (this.sch_date !== null ? item.time.startsWith(this.sch_date) : true)
        ) {
          let obj = Object.assign({}, item);
          arrList.push(obj);
        }
      }
      this.schArr = arrList;
      this.total = arrList.length;
      this.currentPage = 1;
      this.pageSize = 10;
      this.getPageData();
    },
    // add 添加
    addTab() {
      this.formData = {};
      this.diaIsShow = true;
      this.formData.billCode = (Math.random() * 10e18).toString();
      this.formData.id = this.allList.length + 1;
      this.editType = "add";
      this.$nextTick(() => {
        this.$refs.diaForm.clearValidate();
      });
    },
    // 指派需求
    toAssign(index, row) {
      this.formData = Object.assign({}, row);
      this.editType = "update";
      this.diaIsShow = true;
      this.$nextTick(() => {
        this.$refs.diaForm.clearValidate();
      });
      this.rowIndex = index;
    },
    // 审核
    toConfirm(row) {
      row.status = 2;
      this.$notify({
        title: "成功",
        message: "需求接收成功",
        type: "success"
      });
    },
    // 完成
    // toAssign(row) {
    //   row.status = 0
    //   this.$notify({
    //     title: '成功',
    //     message: '该订单已完成配送',
    //     type: 'success'
    //   })
    // },
    // 取消
    toDelete(row) {
      row.status = 3;
      this.$notify({
        title: "成功",
        message: "已取消该订单",
        type: "success"
      });
    },
    //对话框点击确定
    changeTab(form, type) {
      //验证表单数据
      this.$refs[form].validate(valid => {
        if (valid) {
          if (type === "update") {
            // 改变整个表格数据
            let start = (this.currentPage - 1) * this.pageSize;
            this.allList[start + this.rowIndex] = Object.assign(
              {},
              this.formData
            );
            // 解决数组不能通过索引响应数据变化
            this.$set(
              this.tableData,
              this.rowIndex,
              Object.assign({}, this.formData)
            );
            this.$notify({
              title: "成功",
              message: "开发人员已修改成功",
              type: "success"
            });
          } else {
            this.tableData.unshift(Object.assign({}, this.formData));
            this.allList.push(Object.assign({}, this.formData));
          }
          this.diaIsShow = false;
        } else {
          return;
        }
      });
    }
  }
};
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
    content: "";
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
.searchDiv [class^="el-icon"] {
  color: #fff;
}
</style>
