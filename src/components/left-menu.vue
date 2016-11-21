<template>
  <section class='left-tree'>
    <div  class='radius-img'></div>
    <el-tree class='tree' :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  </section>
  
</template>


<script>
  export default {
    data() {
      return {
        data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            url:'/foo'
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1'
          }, {
            label: '二级 2-2'
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1'
          }, {
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods:{
      handleNodeClick : function (data) {
        if(data.url) {
          console.log(data.url)
          router.push(data.url);
        }
      }
    }
  };
</script>
<style lang='less' scoped="">
  .left-tree{
    width:10%;
    float: left;
    height: auto;
    /*background-color: #676a6c;*/
    .tree{
     background-color: #676a6c;
      color:#fff;
    }
    .radius-img{
      border-radius: 50%;
      width: 100%;
      height: 50px;
      line-height: 50px;
      background: url("../assets/defaltShareImg.jpg");
      background-position: center;
      background-repeat: no-repeat;
      background-size: 40px 40px;
      /*background-image: */
      /*background-attachment: fixed;*/
    }
    
  }
</style>