<template>
  <section class="upload-section">
    <el-upload
      class="upload-demo 	"
      drag
      action="http://127.0.0.1:3100/upfile"
      multiple
      :file-list="fileList"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handSuccess"
      :on-error="handError"
      :on-change="handChange"
    >
      <i class="el-icon-upload">
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div
          class="el-upload__tip"
          slot="tip"
        >只能上传jpg/png文件，且不超过500kb</div>
      </i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img
        width="100%"
        :src="dialogImageUrl"
        alt=""
      >
    </el-dialog>
  </section>
</template>
<script>
export default {
  name: "fileku",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      // 上传图片列表
      fileList: []
    };
  },
  methods: {
    sendMaterial(param) {
      this.getMaterial(param)
        .then(({ data }) => {
          console.log(data);
          this.fileList = data.map(item => {
            let obj = {
              name: item.material_name,
              url: item.material_url
            };
            return obj;
          });
          console.log(this.fileList);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 上传成功
    handSuccess(response, file, fileList) {
      console.log(response, file, fileList);
      //this.fileList.unshift(fileList);
    },
    // 上传失败
    handError(err, file, fileList) {
      console.log(err, file, fileList);
    },
    // 文件改变
    handChange(file, fileList) {
      //console.log(file, fileList);
    },
    // 删除文件
    handRemove(file) {},
    handRequest(file) {
      console.log(file);
    }
  },
  mounted() {
    this.sendMaterial();
  }
};
</script>

<style scope>
.upload-section {
  padding-top: 200px;
  position: relative;
}
.el-upload--picture-card {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
}
.el-upload-dragger {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
}
</style>
