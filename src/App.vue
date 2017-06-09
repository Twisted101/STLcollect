<template>
  <div style="height:100%">
   <div class="top-header">
    <button type="button" class="hamburger is-closed animated fadeInLeft" data-toggle="offcanvas">
      <span class="hamb-top"></span>
      <span class="hamb-middle"></span>
      <span class="hamb-bottom"></span>
    </button>
    <span>采集服务<span>智能物联网协议</span></span>
    <i class="iconfont"></i>
  </div>
  <!-- /.top-header -->
  <!-- #wrapper -->
  <div id="wrapper" class="toggled">
    <!-- .navbar -->
    <nav class="navbar navbar-fixed-top" id="sidebar-wrapper" role="navigation">
      <ul class="nav sidebar-nav">
        <li class="dropdown">
          <router-link class="dropdown-toggle" data-toggle="dropdown" to="/communication"><i class="glyphicon glyphicon-send"></i>通讯接口<span></span>
          </router-link>
          <ul class="dropdown-menu" role="menu">
          </ul>
        </li>
        <li class="dropdown">
          <router-link class="dropdown-toggle" data-toggle="dropdown" to="/acquisition"><i class="glyphicon glyphicon-duplicate"></i>采集单元<span></span>
          </router-link>
          <ul class="dropdown-menu" role="menu">
          </ul>
        </li>
      </ul>
    </nav>
    <!-- /.navbar -->
    <!-- #page-content-wrapper -->
    <div id="page-content-wrapper">
      <div class="content-body" style='position:relative'>
      <!-- 加载动画 -->
        <div class="undfan-loading">
          <div class="spinner">
            <div class="spinner-container container1">
              <div class="circle1"></div>
              <div class="circle2"></div>
              <div class="circle3"></div>
              <div class="circle4"></div>
            </div>
            <div class="spinner-container container2">
              <div class="circle1"></div>
              <div class="circle2"></div>
              <div class="circle3"></div>
              <div class="circle4"></div>
            </div>
            <div class="spinner-container container3">
              <div class="circle1"></div>
              <div class="circle2"></div>
              <div class="circle3"></div>
              <div class="circle4"></div>
            </div>
          </div>
        </div>
        <!-- .......内容区域....... -->
        <router-view></router-view>
      </div>
    </div>
    <!-- /#page-content-wrapper -->
  </div>
</div>
</template>
<script>
  import Acquisition from '@/components/acquisition'
  import Communication from '@/components/communication'


  export default {
    name: 'app', 
    components: {
      Acquisition,
      Communication
    }
  };
</script>
<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    height: 100%;
  }
</style>
