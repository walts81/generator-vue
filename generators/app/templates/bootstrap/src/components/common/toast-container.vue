<template>
  <div
    class="toast-container position-fixed p-3"
    :class="{
      'top-0 start-0': topLeft,
      'top-0 start-50 translate-middle-x': topCenter,
      'top-0 end-0': topRight,
      'top-50 start-0 translate-middle-y': middleLeft,
      'top-50 start-50 translate-middle': middleCenter,
      'top-50 end-0 translate-middle-y': topRight,
      'bottom-0 start-0': bottomLeft,
      'bottom-0 start-50 translate-middle-x': bottomCenter,
      'bottom-0 end-0': bottomRight,
    }"
  >
    <ToastMessage
      v-for="item of toasts"
      :ref="setToastRef"
      :autoclose="item.autoclose"
      :color="item.color"
      :dark="item.dark"
      :delay="item.delay"
      :id="item.id"
      :message="item.message"
      :time="item.time"
      :title="item.title"
      :image="item.image"
      :key="item.id"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useToasts } from './use-toasts';
import ToastMessage from './toast-message.vue';

export interface PropDefs {
  topLeft?: boolean;
  topCenter?: boolean;
  topRight?: boolean;
  middleLeft?: boolean;
  middleCenter?: boolean;
  middleRight?: boolean;
  bottomLeft?: boolean;
  bottomCenter?: boolean;
  bottomRight?: boolean;
}

withDefaults(defineProps<PropDefs>(), {
  topLeft: () => false,
  topCenter: () => false,
  topRight: () => false,
  middleLeft: () => false,
  middleCenter: () => false,
  middleRight: () => false,
  bottomLeft: () => false,
  bottomCenter: () => false,
  bottomRight: () => true,
});

let toastRefs: any[] = [];
const setToastRef = (el: any) => {
  if (el) {
    toastRefs.push(el);
  }
};
const { toasts } = useToasts();

const defaultTimeHndl = -9999999999;
let timeHndl = defaultTimeHndl;
const updateTimes = () => {
  for (const toast of toastRefs) {
    toast.updateTime();
  }
};
onMounted(() => {
  timeHndl = setInterval(() => updateTimes(), 10000) as any;
});
onUnmounted(() => {
  if (timeHndl !== defaultTimeHndl) {
    clearInterval(timeHndl);
  }
});
</script>
