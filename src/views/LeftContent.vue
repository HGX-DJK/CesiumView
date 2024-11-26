<template>
   <div class="menu-box">
      <div class="left-title">Cesium示例集合</div>
      <div class="content-box">
         <div class="father-content" v-for="(item, index) of menuStore.menuList" :key="index">
            <div @click="showchildren(item)" class="father-item" :class="{ 'active': item.show }">
               <span class="name">{{ item.name }}</span>
               <span class="iconfont icon-xiala" :class="{ 'icon-rotate': !item.show }"></span>
            </div>
            <div class="children-content" :style="{ 'maxHeight': item.show ? computedChildheight(item) + 'rem' : '0rem' }">
               <div class="child-item" v-for="(ele, i) of item.children" :key="i" @click="operateDifferentFun(ele)" :class="[{ 'active': menu.leafActive == ele.name },{'special':ele.newFlag}]">
                  <span v-show="ele.newFlag" class="new-tag">新</span>
                  <span class="name">{{ ele.name }}</span>
               </div>
            </div>
         </div>
      </div>

   </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { MenuStore } from "@/store/menu";
let router = useRouter();
const menuStore = MenuStore();
const menu = reactive({
   leafActive: ""
})
//获取子节点的高度
function computedChildheight(item: { [key: string]: any }) {
   let height = 0;
   if (item.children) {
      height = item.children.length * 4 + (item.children.length + 1);
   };
   return height
}

//显示子节点的内容数据
function showchildren(item: { [key: string]: any }) {
   item.show = !item.show;
}

//子节点对于不同的功能
function operateDifferentFun(item: { [key: string]: any }) {
   if (menu.leafActive == item.name) {
      menu.leafActive = "";
      router.push("/");
   } else {
      menu.leafActive = item.name;
      router.push(item.path);
   };
}
</script>


<style scoped lang="scss">
.menu-box {
   .left-title {
      padding: 1.5rem 0.5rem;
      font-weight: bold;
      color: #9aa4c8;
      font-size: 1.8rem;
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
   }
   .content-box{
      height: calc(100% - 8.6rem);
      width: 104%;
      overflow: hidden;
      overflow-y: auto;
   }

   .father-content {
      cursor: pointer;
      font-size: 1.6rem;

      .father-item {
         display: flex;
         padding: 2rem 1rem;
         .name {
            width: 75%;
         }
         .icon-rotate {
            transform: rotateZ(-90deg);
         }
      }
      .father-item:hover {
         background: rgb(57, 66, 75);
      }
   }
}

.children-content {
   overflow: hidden;
   transition: all 0.3s;
   background: #565c64;
   .child-item {
      display: flex;
      align-items: center;
      height: 4rem;
      padding: 2.5rem 0rem;
      padding-left: 3rem;
      text-align: center;
      font-size: 1.5rem;
      box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.2);  
      .new-tag{
         color:#ff0000;
         position: relative;
         top: -1rem;
         transform: rotateZ(-10deg);
         font-size: 1.4rem;
         margin-right: 0.4rem;
         left: -2rem;
      }
      &.active {
         color: $yellow
      }
   }
   .special .name{
      position: relative;
      left: -2rem;
   }
   .child-item:hover {
      background: rgb(57, 66, 75);
   }
}
</style>