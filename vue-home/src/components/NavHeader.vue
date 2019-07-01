<template>
  <nav class="fixed-top">
    <div class="navbar navbar-expand-lg">
      <div class="container">
        <a
          href="https://www.ugediao.com/"
          rel="home"
          class="navbar-brand m-0 order-1 order-lg-1"
        >
          <img
            src="https://res.moseacg.com/wp-content/uploads/2019/04/logocenterwhite.png"
            class=""
            alt="有格调"
          >
        </a>
        <!-- / brand -->
        <div class="collapse navbar-collapse order-lg-2">
          <ul class="navbar-nav main-menu mx-auto px-4">
            <li
              id="menu-item-368"
              class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-368"
            ><a
                class="nav-link"
                href="https://www.ugediao.com/category/reading"
              >阅读</a></li>
            <li
              id="menu-item-367"
              class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-367"
            ><a
                class="nav-link"
                href="https://www.ugediao.com/category/music"
              >音乐</a></li>
            <li
              id="menu-item-369"
              class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-369"
            ><a
                class="nav-link"
                href="https://www.ugediao.com/category/videos"
              >视频</a></li>
            <li
              id="menu-item-370"
              class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-370"
            ><a
                class="nav-link"
                href="https://www.ugediao.com/category/software"
              >软件</a></li>
            <li
              id="menu-item-371"
              class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-371"
            ><a
                class="nav-link"
                href="https://www.ugediao.com/category/radio"
              >电台</a></li>
            <li
              id="menu-item-372"
              class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-372"
            ><a
                class="nav-link"
                href="https://www.ugediao.com/category/picture"
              >美图</a></li>
            <li
              id="menu-item-2383"
              class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2383"
            ><a
                class="nav-link"
                href="https://www.ugediao.com/zhuantituijian"
              >专题推荐</a></li>
            <li
              id="menu-item-1372"
              class="menu-item menu-item-type-custom menu-item-object-custom menu-item-1372"
            ><a
                class="nav-link"
                href="https://www.ugediao.com/1217.html?suijituijian"
              >随机推荐</a></li>
            <li
              id="menu-item-4392"
              class="menu-item menu-item-type-custom menu-item-object-custom menu-item-4392"
            ><a
                class="nav-link"
                href="https://www.ugediao.com/tougao"
              ><b>投稿</b></a></li>
          </ul>
        </div>
        <ul class="nav nav-pills nav-submenu align-items-center order-2 order-lg-3">
          <!--<li class="nav-item d-none d-lg-inline-block mr-2">
                                <a href="https://www.ugediao.com/wp-admin/post-new.php" class="nav-link"><i class="text-lg iconfont icon-bianji"></i></a>
                            </li>-->
          <li class="nav-item">
            <a
              class="nav-link sign-link active"
              href="https://www.ugediao.com/wp-login.php"
            >登录</a>
          </li>
          <li class="nav-item">
            <a
              href="#"
              class="nav-link search-popup"
            ><i class="text-lg iconfont icon-sousuo"></i></a>
          </li>
          <li class="nav-item d-lg-none">
            <a
              class="nav-link"
              href="#"
              id="sidebar-mobile-trigger"
            ><i class="text-lg iconfont icon-menu-outline mr-2"></i></a>
          </li>
        </ul>

        <form
          role="search"
          method="get"
          class="navbar-search-wrap"
          action="https://www.ugediao.com/"
          style="display: none;"
        ><input
            type="search"
            class="form-control navbar-search-input"
            placeholder="请输入搜索关键词…"
            name="s"
          > <i
            class="iconfont icon-quxiao"
            id="navbar-search-close"
          ></i></form>
        <!-- brand -->
      </div>
    </div>
    <div class="navbar-collapse navbar-scroll d-lg-none">
      <div class="container">
        <ul class="navbar-nav flex-row">
          <li class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-368"><a
              class="nav-link"
              href="https://www.ugediao.com/category/reading"
            >阅读</a></li>
          <li class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-367"><a
              class="nav-link"
              href="https://www.ugediao.com/category/music"
            >音乐</a></li>
          <li class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-369"><a
              class="nav-link"
              href="https://www.ugediao.com/category/videos"
            >视频</a></li>
          <li class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-370"><a
              class="nav-link"
              href="https://www.ugediao.com/category/software"
            >软件</a></li>
          <li class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-371"><a
              class="nav-link"
              href="https://www.ugediao.com/category/radio"
            >电台</a></li>
          <li class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-372"><a
              class="nav-link"
              href="https://www.ugediao.com/category/picture"
            >美图</a></li>
          <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2383"><a
              class="nav-link"
              href="https://www.ugediao.com/zhuantituijian"
            >专题推荐</a></li>
          <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-1372"><a
              class="nav-link"
              href="https://www.ugediao.com/1217.html?suijituijian"
            >随机推荐</a></li>
          <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-4392"><a
              class="nav-link"
              href="https://www.ugediao.com/tougao"
            ><b>投稿</b></a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navHeader"
};
</script>
<style>
</style>


