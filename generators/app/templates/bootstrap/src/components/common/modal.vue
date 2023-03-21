<template>
  <div
    class="modal fade"
    :id="id"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    data-bs-focus="true"
    tabindex="-1"
    :aria-labelledby="titleId"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div
          class="modal-header"
          v-if="hasHeader"
          :class="{
            [`text-bg-${modalOptions.color}`]: !!modalOptions.color,
          }"
        >
          <slot name="header">
            <div
              class="modal-header-title col-12"
              :class="{
                closeable: modalOptions.closeable,
                'justify-content-start': modalOptions.headerAlign === 'left',
                'justify-content-center': modalOptions.headerAlign === 'center',
                'justify-content-end': modalOptions.headerAlign === 'right',
                'text-start': modalOptions.headerAlign === 'left',
                'text-center': modalOptions.headerAlign === 'center',
                'text-end': modalOptions.headerAlign === 'right',
              }"
            >
              <h1 class="modal-title fs-5" :id="titleId" v-if="!!modalOptions.title">{{ modalOptions.title }}</h1>
            </div>
          </slot>
          <div class="justify-content-end" v-if="modalOptions.closeable">
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              :class="{ 'btn-close-white': modalOptions.dark }"
              @click="closeFromHeader()"
            ></button>
          </div>
        </div>
        <div
          class="modal-body"
          :class="{
            'justify-content-start': modalOptions.contentAlign === 'left',
            'justify-content-center': modalOptions.contentAlign === 'center',
            'justify-content-end': modalOptions.contentAlign === 'right',
            'text-start': modalOptions.contentAlign === 'left',
            'text-center': modalOptions.contentAlign === 'center',
            'text-end': modalOptions.contentAlign === 'right',
          }"
        >
          <slot>{{ modalOptions.message }}</slot>
        </div>
        <div
          class="modal-footer"
          v-if="hasFooter"
          :class="{
            'justify-content-start': modalOptions.footerAlign === 'left',
            'justify-content-center': modalOptions.footerAlign === 'center',
            'justify-content-end': modalOptions.footerAlign === 'right',
            'text-start': modalOptions.footerAlign === 'left',
            'text-center': modalOptions.footerAlign === 'center',
            'text-end': modalOptions.footerAlign === 'right',
          }"
        >
          <slot name="footer">
            <button
              type="button"
              class="btn btn-secondary"
              key="default-cancel-btn"
              v-if="modalOptions.confirmable"
              @click="cancel()"
            >
              {{ modalOptions.cancelText }}
            </button>
            <button
              type="button"
              class="btn btn-primary"
              key="default-confirm-btn"
              v-if="modalOptions.confirmable"
              @click="confirm()"
            >
              {{ modalOptions.confirmText }}
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useModal, ModalOptions } from './use-modal';

export interface PropDefs {
  contentAlign?: 'left' | 'center' | 'right';
  headerAlign?: 'left' | 'center' | 'right';
  footerAlign?: 'left' | 'center' | 'right';
  closeable?: boolean;
  color?: string;
  confirmable?: boolean;
  confirmText?: string;
  cancelText?: string;
  closeIsConfirm?: boolean;
  dark?: boolean;
  message?: string;
  title?: string;
  options?: ModalOptions;
}

const props = withDefaults(defineProps<PropDefs>(), {
  contentAlign: () => 'left',
  headerAlign: () => 'center',
  footerAlign: () => 'right',
  closeable: () => true,
  color: () => '',
  confirmable: () => false,
  confirmText: () => 'OK',
  cancelText: () => 'Cancel',
  closeIsConfirm: () => false,
  dark: () => false,
  message: () => '',
  title: () => '',
  options: () => null as any,
});
const emit = defineEmits(['confirm', 'cancel']);

const { id, titleId, modalOptions, hasHeader, hasFooter, confirm, cancel, open, close, closeFromHeader } = useModal(
  props,
  emit
);

defineExpose({
  confirm,
  cancel,
  open,
  close,
});
</script>

<style scoped lang="scss">
.modal {
  .modal-header-title.closeable {
    margin-right: -32px;
  }
}
</style>
