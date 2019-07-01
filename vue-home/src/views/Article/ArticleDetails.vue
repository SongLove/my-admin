<template>
  <div>文章</div>
</template>
<script>
export default {
  name: "ArticleDetails",
  mounted() {
    this.sendArticleList().then(({ data }) => {
      console.log(data);
    });
  }
};
</script>
<style>
</style>
