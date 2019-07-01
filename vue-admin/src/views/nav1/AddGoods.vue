<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item
      label="商品名称"
      prop="name"
    >
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item
      label="商品详情"
      prop="desc"
    >
      <el-input
        type="textarea"
        v-model="ruleForm.desc"
      ></el-input>
    </el-form-item>
    <el-form-item
      label="商品区域"
      prop="region"
    >
      <el-select
        v-model="ruleForm.region"
        placeholder="请选择区域"
      >
        <el-option
          label="美妆"
          value="shanghai"
        ></el-option>
        <el-option
          label="生活"
          value="beijing"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item
      label="是否开启优惠"
      prop="delivery"
    >
      <el-switch v-model="ruleForm.delivery"></el-switch>
    </el-form-item>
    <div v-show="ruleForm.delivery">
      <el-form-item
        label="活动时间"
        required
      >
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ruleForm.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col
          class="line"
          :span="2"
        >-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker
              placeholder="选择时间"
              v-model="ruleForm.date2"
              style="width: 100%;"
            ></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
    </div>
    <el-form-item
      label="活动性质"
      prop="type"
    >
      <el-checkbox-group v-model="ruleForm.type">
        <el-checkbox
          label="美食/餐厅线上活动"
          name="type"
        ></el-checkbox>
        <el-checkbox
          label="地推活动"
          name="type"
        ></el-checkbox>
        <el-checkbox
          label="线下主题活动"
          name="type"
        ></el-checkbox>
        <el-checkbox
          label="单纯品牌曝光"
          name="type"
        ></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item
      label="特殊资源"
      prop="resource"
    >
      <el-radio-group v-model="ruleForm.resource">
        <el-radio label="线上品牌商赞助"></el-radio>
        <el-radio label="线下场地免费"></el-radio>
      </el-radio-group>
    </el-form-item>
    <section>
      <!--工具条-->
      <el-col
        :span="24"
        class="toolbar"
        style="padding-bottom: 0px;"
      >
        <el-form :inline="true">
          <el-form-item>
            <el-button
              @click="handleAdd"
              type="primary"
            >新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--列表-->
      <el-table
        :data="goods"
        v-loading="listLoading"
        style="width: 100%;"
      >

        <el-table-column
          type="index"
          width="60"
        >
        </el-table-column>
        <el-table-column
          prop="goods_icon"
          label="图标"
        >
          <template slot-scope="scope">
            <img
              :src="scope.row.goods_icon"
              min-width="70"
              height="70"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="  
            goods_url"
          label="地址	"
          width="800"
          :show-overflow-tooltip="true"
          sortable
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
        >
          <template scope="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)"
            >复制地址</el-button>
            <el-button
              type="danger"
              size="small"
              @click="handleDel(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <!--新增界面 与编辑-->
    <el-dialog
      title="添加图片介绍"
      width="85%"
      :modal-append-to-body="false"
      :visible.sync="addAndEditVisible"
    >
      <el-upload
        class="upload-demo"
        drag
        action="http://127.0.0.1:3100/upfile"
        multiple
        :file-list="fileList"
        list-type="picture"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div
          class="el-upload__tip"
          slot="tip"
        >只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
    <el-form-item>
      <el-button
        type="primary"
        @click="submitForm('ruleForm')"
      >立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import config from "api/config";
export default {
  name: "addGoods",
  data() {
    return {
      // 查看uil
      dialogImageUrl: "",
      // 查看图片盒子
      dialogVisible: false,
      // 上传图片列表
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      serverUser: config.serverUser,
      // 显示上传图片盒子
      addAndEditVisible: false,
      // 商品介绍图table列表
      goods: [],

      listLoading: false,
      // 检查数据
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      // 检查数据提示
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 新增图片
    handleAdd() {
      this.addAndEditVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 编辑
    handleEdit: function(index, row) {},
    //删除
    handleDel: function(index, row) {}
  }
};
</script>