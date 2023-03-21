<template>
  <div
    ref="el"
    :id="id"
    class="toast"
    :class="{ 'align-items-center': centerContent, [`text-bg-${color}`]: !!color }"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div class="toast-header" v-if="hasHeader">
      <img v-if="!!image" :src="image" class="rounded me-2" alt="..." />
      <strong class="me-auto" v-if="!!title">{{ title }}</strong>
      <small v-if="!!timeText">{{ timeText }}</small>
      <button
        type="button"
        class="btn-close"
        :class="{ 'btn-close-white': dark }"
        data-bs-dismiss="toast"
        aria-label="Close"
        @click="close()"
      ></button>
    </div>
    <div class="toast-body" v-html="message" v-if="hasHeader"></div>
    <div class="d-flex" v-if="!hasHeader">
      <div class="toast-body" v-html="message"></div>
      <button
        type="button"
        class="btn-close me-2 m-auto"
        :class="{ 'btn-close-white': dark }"
        data-bs-dismiss="toast"
        aria-label="Close"
        @click="close()"
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import dayjs from 'dayjs';
import { Toast } from 'bootstrap';
import { useToasts } from './use-toasts';

export interface PropDefs {
  id: string;
  autoclose?: boolean;
  centerContent?: boolean;
  color?: string;
  dark?: boolean;
  delay?: number;
  image?: string;
  message: string;
  time?: string;
  title?: string;
}

const props = withDefaults(defineProps<PropDefs>(), {
  autoclose: () => true,
  centerContent: () => false,
  color: () => '',
  dark: () => false,
  delay: () => 7000,
  image: () => '',
  time: () => '',
  title: () => '',
});

const el = ref<any>(null);
const { closeToast } = useToasts();
const timeText = ref('');
const hasHeader = computed(() => !!props.time || !!props.title || !!props.image);

const close = () => {
  closeToast(props.id);
};

const getTime = () => {
  if (!props.time) return '';
  return dayjs(props.time).fromNow();
};

const updateTime = () => {
  timeText.value = getTime();
};

onMounted(() => {
  updateTime();
  const toast = new Toast(el.value, { autohide: false });
  if (props.autoclose) {
    setTimeout(() => close(), props.delay);
  }
  toast.show();
});

defineExpose({
  updateTime,
});
</script>
