<template>
  <div class="popup-container">
    <!-- 连接线 -->
    <div class="link-line"></div>
    <!-- 显示内容框 -->
    <div class="box-wrap">
         <!--关闭弹窗-->
        <div class="close" @click="closeClick">X</div>
        <div class="area">
            <div class="area-title fontColor">
                <template v-if="props.title">{{ props.title }}</template>
                <slot v-else name="title"></slot>
            </div>
        </div>
        <div class="content">
            <div class="data-li">
              <div class="data-label textColor">地址：</div>
              <div class="data-value yellowColor">
                  <template v-if="props.content">{{ props.content }}</template>
                  <slot v-else name="content"></slot>
              </div>
            </div>
          </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
const props = defineProps({
  title: {
    type: String,
    default: "标题"
  },
  content: {
    type: String,
    default: "内容"
  },
  closeEvent: Function
})

const closeClick = () => {
   props?.closeEvent() ;
};


</script>

<style lang='scss' scoped>
.popup-container {
  width: 270px;
  position: relative;
  bottom: 0;
  left: 0;
}
.link-line {
  position: absolute;
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  line-height: 120px;
  text-indent: 5px;
}

.link-line::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: -83px;
  width: 40%;
  height: 60px;
  box-sizing: border-box;
  border-bottom: 1px solid #38e1ff;
  transform-origin: bottom center;
  transform: rotateZ(135deg) scale(1.5);
  animation: slash 0.5s;
  filter: drop-shadow(1px 0px 2px #03abb4);
  /* transition: slash 2s; */
}

@keyframes slash {
  0% {
    transform: rotateZ(135deg) scale(0);
  }

  100% {
    transform: rotateZ(135deg) scale(1.5);
  }
}


.close {
  position: absolute;
  color: #fff;
  top: 1px;
  right: 10px;
  text-shadow: 2px 2px 2px #022122;
  cursor: pointer;
  animation: fontColor 1s;
}

.box-wrap {
  position: absolute;
  left: 21%;
  top: 0;
  width: 100%;
  height: 163px;
  border-radius: 6px;
  border: 1px solid #38e1ff;
  background-color: #38e1ff4a;
  box-shadow: 0 0 10px 2px #29baf1;
  animation: slide 2s;
}

@keyframes slide {
  0% {
    border: 1px solid #38e1ff00;
    background-color: #38e1ff00;
    box-shadow: 0 0 10px 2px #29baf100;
  }
  100% {
    border: 1px solid #38e1ff;
    background-color: #38e1ff4a;
    box-shadow: 0 0 10px 2px #29baf1;
  }
}


.box-wrap .area {
  position: absolute;
  top: 30px;
  right: 0;
  width: 95%;
  height: 30px;
  background-image: linear-gradient(to left, #4cdef9, #4cdef96b);
  border-radius: 30px 0px 0px 0px;
  animation: area 1s;
}

@keyframes area {
  0% {
    width: 0%;
  }

  25% {
    width: 0%;
  }

  100% {
    width: 95%;
  }
}

.area .area-title {
  text-align: center;
  line-height: 30px;
  font-size: 16px;
  font-weight: 800;
  color: #ffffff;
  text-shadow: 1px 1px 5px #002520d2;
  animation: fontColor 1s;
}

.textColor {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  text-shadow: 1px 1px 5px #002520d2;
  animation: fontColor 1s;
  width: 20%;
}

.yellowColor {
  font-size: 14px;
  font-weight: 600;
  color: #f09e28;
  text-shadow: 1px 1px 5px #002520d2;
  animation: fontColor 1s;
}
@keyframes fontColor {
  0% {
    color: #ffffff00;
    text-shadow: 1px 1px 5px #00252000;
  }

  40% {
    color: #ffffff00;
    text-shadow: 1px 1px 5px #00252000;
  }

  100% {
    color: #ffffff;
    text-shadow: 1px 1px 5px #002520d2;
  }
}

.content {
  padding: 55px 10px 10px 10px;
}

.content .data-li {
  display: flex;
  margin: 2rem 0;
}


</style>