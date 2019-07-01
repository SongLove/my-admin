<template>
  <section>
    <!--工具条-->
    <el-col
      :span="24"
      class="toolbar"
      style="padding-bottom: 0px;"
    >
      <el-form
        :inline="true"
        :model="filters"
      >
        <el-form-item>
          <el-input
            v-model="filters.name"
            placeholder="栏目"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            v-on:click="getArticle"
          >查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleAdd"
          >新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table
      :data="articles"
      highlight-current-row
      v-loading="listLoading"
      @selection-change="selsChange"
      style="width: 100%;"
    >
      <el-table-column
        type="selection"
        width="55"
      >
      </el-table-column>
      <el-table-column
        type="index"
        width="60"
      >
      </el-table-column>
      <el-table-column
        prop="user_name"
        label="作者"
        width="150"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="artic_title"
        label="标题"
        :show-overflow-tooltip="true"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="artic_type"
        label="栏目	"
        width="150"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="release_time"
        label="发布时间"
        width="150"
        sortable
      >
      </el-table-column>
      <!-- <el-table-column
        prop="abstract"
        label="摘要"
        min-width="180"
      >
      </el-table-column> -->
      <el-table-column
        label="操作"
        width="150"
      >
        <template scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            type="danger"
            size="small"
            @click="handleDel(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col
      :span="24"
      class="toolbar"
    >
      <el-button
        type="danger"
        @click="batchRemove"
        :disabled="this.sels.length===0"
      >批量删除</el-button>
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="20"
        :total="total"
        style="float:right;"
      >
      </el-pagination>
    </el-col>

    <!--新增界面 与编辑-->
    <el-dialog
      title="新增1"
      width="85%"
      :modal-append-to-body="false"
      :visible.sync="addAndEditVisible"
      @close="close"
    >
      <form-vue
        ref="editmodal"
        @addEnd="addEnd"
      ></form-vue>
    </el-dialog>
  </section>
</template>

<script>
import util from "../../common/js/util";
import FormVue from "./Form";
//import NProgress from 'nprogress'

export default {
  data() {
    return {
      filters: {
        name: ""
      },
      articles: [],
      total: 0,
      page: 5,
      listLoading: false,
      sels: [], //列表选中列

      addAndEditVisible: false //编辑界面是否显示
    };
  },
  components: { FormVue },
  methods: {
    close() {
      console.log("关闭");
      this.$refs.editmodal.clear();
    },
    //性别显示转换
    formatSex: function(row, column) {
      return row.sex == 1 ? "男" : row.sex == 0 ? "女" : "未知";
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getArticle();
    },
    // 创建完毕
    addEnd() {
      console.log("创建网吧");
      this.getArticle();
      this.addAndEditVisible = false;
    },
    queryArticle() {
      let para = {
        page: this.page,
        name: this.filters.name
      };
      this.getArticle(para);
    },
    //获取用户列表
    getArticle(query) {
      this.listLoading = true;
      //NProgress.start();
      // 获取文章列表
      this.sendArticleList(query).then(({ data }) => {
        console.log(data);
        this.total = data.total;
        this.articles = data.list;
        this.listLoading = false;
      });
    },
    //删除
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { _id: row._id };
          console.log(row);
          //return;
          this.deleteArticle(para).then(({ msg }) => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: msg,
              type: "success",
              duration: 700,
              onClose: () => {
                this.getArticle();
              }
            });
          });
        })
        .catch(() => {});
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.sendArticleList({ _id: row._id }).then(({ data }) => {
        console.log(data);
        this.$nextTick(() => {
          this.bus.$emit("upMenuType", "edit");
          this.bus.$emit("openMenu", data.list[0]);
        });
        this.addAndEditVisible = true;
      });
      // this.editForm = Object.assign({}, row);
    },
    //显示新增界面
    handleAdd: function() {
      console.log("点击");
      this.bus.$emit("upMenuType", "add");
      this.addAndEditVisible = true;
    },
    //编辑
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.editForm);
            para.birth =
              !para.birth || para.birth == ""
                ? ""
                : util.formatDate.format(new Date(para.birth), "yyyy-MM-dd");
            editUser(para).then(res => {
              this.editLoading = false;
              //NProgress.done();
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["editForm"].resetFields();
              this.addAndEditVisible = false;
              this.getArticle();
            });
          });
        }
      });
    },
    selsChange: function(sels) {
      this.sels = sels;
    },
    //批量删除
    batchRemove: function() {
      var ids = this.sels.map(item => item.id).toString();
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { _id: ids };
          this.deleteArticle(para).then(res => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getArticle();
          });
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.getArticle();
  }
};
</script>

<style scoped>
</style>