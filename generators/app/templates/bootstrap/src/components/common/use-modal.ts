import { computed, nextTick, onMounted, onBeforeUnmount, useSlots } from 'vue';
import { Modal } from 'bootstrap';
import { useComponentHelpers } from './use-component-helpers';

export interface ModalOptions {
  contentAlign: 'left' | 'center' | 'right';
  headerAlign: 'left' | 'center' | 'right';
  footerAlign: 'left' | 'center' | 'right';
  closeable: boolean;
  color: string;
  confirmable: boolean;
  confirmText: string;
  cancelText: string;
  closeIsConfirm: boolean;
  dark: boolean;
  message: string;
  title: string;
  options?: ModalOptions;
}

export const getModalProps = (): ModalOptions => ({
  contentAlign: 'left',
  headerAlign: 'center',
  footerAlign: 'right',
  closeable: true,
  color: '',
  confirmable: false,
  confirmText: 'OK',
  cancelText: 'Cancel',
  closeIsConfirm: false,
  dark: false,
  message: '',
  title: '',
});

export const useModal = (modalProps: Partial<ModalOptions>, emit: Emitter<'confirm' | 'cancel'>) => {
  const props = computed(() => modalProps);
  const propsToUse = computed<ModalOptions>(() => props.value.options || (props.value as any));
  const slots = useSlots();
  const { generateId } = useComponentHelpers();
  const id = computed(() => generateId('modal'));
  const titleId = computed(() => generateId('modal-title'));

  const hasHeader = computed(() => propsToUse.value.closeable || !!propsToUse.value.title || !!slots.header);
  const hasFooter = computed(() => propsToUse.value.confirmable || !!slots.footer);

  let modalRef: { show: () => void; hide: () => void; dispose: () => void } | null = null;

  const open = () => {
    if (!!modalRef) modalRef.show();
  };
  const close = () => {
    if (!!modalRef) modalRef.hide();
  };
  const closeFromHeader = () => {
    if (propsToUse.value.closeIsConfirm) {
      confirm();
    } else {
      cancel();
    }
  };
  const confirm = () => {
    close();
    nextTick(() => emit('confirm'));
  };
  const cancel = () => {
    close();
    nextTick(() => emit('cancel'));
  };

  onMounted(() => {
    const m = new Modal('#' + id.value);
    modalRef = m;
  });
  onBeforeUnmount(() => {
    if (!!modalRef) {
      modalRef.dispose();
      modalRef = null;
    }
  });
  return {
    id,
    titleId,
    modalOptions: propsToUse,
    hasHeader,
    hasFooter,
    open,
    close,
    closeFromHeader,
    confirm,
    cancel,
  };
};
