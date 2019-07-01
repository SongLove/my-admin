<template>
  <el-form
    ref="form"
    :model="form"
    :rules="rules"
    label-width="80px"
    style="margin:20px;min-width:600px;"
  >
    <el-row>
      <el-col :span="12">
        <el-form-item
          label="文章标题"
          prop="artic_title"
        >
          <el-input v-model="form.artic_title"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="文章栏目"
          prop="artic_type"
        >
          <el-select
            v-model="form.artic_type"
            placeholder="请选择活动区域"
            prop="artic_type"
          >
            <el-option
              label="文艺"
              value="文艺"
            ></el-option>
            <el-option
              label="旅行"
              value="旅行"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item
      label="文章简介"
      prop="abstract"
    >
      <el-input
        v-model="form.abstract"
        type="textarea"
      ></el-input>
    </el-form-item>
    <el-form-item
      label="文章性质"
      prop="type_label"
    >
      <el-checkbox-group v-model="form.type_label">
        <el-checkbox
          label="文艺"
          name="type"
        ></el-checkbox>
        <el-checkbox
          label="新闻"
          name="type"
        ></el-checkbox>
        <el-checkbox
          label="旅游"
          name="type"
        ></el-checkbox>
        <el-checkbox
          label="讨论"
          name="type"
        ></el-checkbox>
      </el-checkbox-group>
    </el-form-item>

    <el-form-item
      label="文章内容"
      prop="artic_content"
    >
      {{ form.artic_content }}
      <tinymce-editor
        :msg="form.artic_content"
        :disabled="disabled"
        @onClick="onClick"
        @input="input"
        ref="editor"
      ></tinymce-editor>
    </el-form-item>
    <el-form-item>
      <el-button
        @click="addArticle"
        :loading="loading"
        type="primary"
      >立即创建</el-button>
      <el-button @click.native.prevent>取消</el-button>
      <el-button @click="clear">清空内容</el-button>
      <el-button @click="disabled = true">禁用</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import TinymceEditor from "components/tinymce-editor";
import util from "../../common/js/util";
export default {
  data() {
    return {
      form: this.bus.form,
      rules: {
        artic_title: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          { min: 3, max: 25, message: "长度在 3 到 25 个字符", trigger: "blur" }
        ],
        artic_type: [
          { required: true, message: "请选择文章栏目", trigger: "change" }
        ],
        type_label: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个文章类别",
            trigger: "change"
          }
        ],
        abstract: [
          { required: true, message: "请文章简介", trigger: "change" }
        ],
        artic_content: [
          { required: true, message: "请填写文章正文", trigger: "change" }
        ]
      },
      disabled: false,
      loading: false,
      // 编辑类型 add 添加，edit 编辑
      menu_type: this.bus.menu_type
    };
  },
  components: {
    TinymceEditor
  },
  methods: {
    //鼠标单击的事件
    onClick(e, editor) {
      console.log("Element clicked");
      console.log(e);
      console.log(editor);
    },
    // 添加文章
    addArticle() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let obj = {
            user_name: "admin",
            artic_title: this.form.artic_title,
            artic_type: this.form.artic_type,
            abstract: this.form.abstract,
            release_time: new Date().getTime(),
            artic_content: this.form.artic_content,
            type_label: this.form.type_label,
            menu_type: this.bus.menu_type
          };
          if (this.bus.menu_type === "edit") {
            obj._id = this.form._id;
          }
          //this.loading = true;
          console.log(obj);
          this.addArticleApi(obj).then(data => {
            console.log(data);
            this.loading = false;
            this.$message({
              message: "发表成功",
              type: "success",
              duration: 1000,
              onClose: () => {
                this.clear();
                if (this.$route.name === "Table") {
                  this.$emit("addEnd");
                } else {
                  this.$router.push({ path: "/table" });
                }
              }
            });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    input(msg) {
      this.form.artic_content = msg;
    },
    //清空内容
    clear() {
      for (let i in this.form) {
        //this.form[i] = "";
        console.log(i);
        if (i === "type_label") {
          this.form.type_label = [];
        } else {
          this.form[i] = "";
        }
      }
      //this.form.type_label = "";
      this.$refs.editor.clear();
    }
  }
};
</script>