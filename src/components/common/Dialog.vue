<template>
  <!-- 打开弹框的动画 -->
  <transition name="animation">
    <div class="sl-dialog-box" :class="{ 'sl-mask': mask }" v-show="isShowDialog">
      <div class="sl-dialog-conent">
        <div class="sl-dialog-head">
          <!-- 这样写可以做到若有传递过来的title就用传递过来的title 若有传递过来的插槽，就以插槽的为准 -->
          <slot name="header">
            <div class="head-title">
              <span class="iconfont icon-img" :class="iconFont" v-show="iconFont"></span>
              <span>{{ title }}</span>
            </div>
          </slot>
          <i @click="close" v-show="showCloseIcon" class="iconfont icon-guanbi"></i>
        </div>
        <div class="sl-dialog-body">
          <!-- 内容区我们使用默认插槽 -->
          <slot></slot>
          <div class="footer">
            <slot name="footer" ></slot>  
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { onMounted } from 'vue';
export default {
  name: "dialogComponent",
  props: {
    // 控制是否展示或隐藏对话框
    isShowDialog: {
      type: Boolean,
      default: false,
    },
    // 父组件传过来的标题值
    title: {
      type: String,
      default: "",
    },
    // 父组件传过来的图标
    iconFont:{
      type: String,
      default: "",
    },
    // 是否显示关闭小图标
    showCloseIcon: {
      type: Boolean,
      default: true,
    },
    // 是否开启背景遮罩层
    mask: {
      type: Boolean,
      default: true,
    },
  },
  setup(props,{emit}) {
    console.log(props);
    // 关闭弹出框
    function close() {
       emit("beforeClose", false);
    }
    // 根据浏览器可视区域高度，确定弹窗最大高度
    function getHight(){
      var maxHeight = document.body.clientHeight-35; // 浏览器可视区域高度
      let popupBody = document.querySelector('.sl-dialog-body') as any;
      if(!popupBody) return;
      popupBody.style.cssText = "max-height:"+maxHeight+'px;overflow-y:auto';
    }
    onMounted(()=>{
      getHight();
    })
    return {
      close,
    };
  },
};
</script>

<style lang="scss" scoped>
.animation-enter,
.animation-leave-to {
  opacity: 0;
}
.animation-enter-active,
.animation-leave-active {
  transition: opacity 0.3s;
}
.sl-dialog-box{
  position:fixed;
  z-index:2000;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  overflow: auto;
  display:flex;
  justify-content: center;
  align-items: center;
}
.sl-mask{
  width:100%;
  height:100%;
  background:rgba(0,0,0,0.1)
}
.sl-dialog-conent{
  overflow: auto;
  min-width:55rem;
  flex-shrink: 0;
  background:#fff;
  box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px 0px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
  border-radius: 2px;
  .sl-dialog-head{
    border-bottom:1px solid #e5e5e5;
    height:3.5rem;
    font-size:1.6rem;
    font-weight: 500;
    color:#3e81ee;
    line-height:3.5rem;
    padding:0 1.5rem 0 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.4rem;
  }
}
.icon-guanbi{
    font-size:1.8rem;
    cursor:pointer;
    color: #111826;
}
.sl-dialog-body{
  padding:1.5rem 2rem;
}
.footer{
  width:100%;
  text-align: center;
  padding:1rem;
}
.icon-img{
  color: $blue !important;
  font-size: 1.8rem;
  margin-right: 0.6rem;
}
</style>