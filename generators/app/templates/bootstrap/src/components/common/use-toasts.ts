import { computed, ref } from 'vue';
import { useComponentHelpers } from './use-component-helpers';

export interface ToastMessage {
  id: string;
  autoclose?: boolean;
  color?: string;
  dark?: boolean;
  delay?: number;
  image?: string;
  message: string;
  time?: string;
  title?: string;
}

const toasts = ref<ToastMessage[]>([]);

export const useToasts = () => {
  const { generateId } = useComponentHelpers();
  const addToast = (toast: ToastMessage) => {
    if (!toast.id) {
      toast.id = generateId('toast-message');
    }
    const updated = [...toasts.value];
    updated.unshift(toast);
    toasts.value = updated;
    return toast.id;
  };
  const addToastMessage = (message: string, title = '', time = '', autoclose = true) => {
    const id = generateId('toast-message');
    return addToast({ id, autoclose, message, title, time });
  };
  const closeToast = (id: string) => {
    const updated = [...toasts.value];
    const ix = updated.findIndex(x => x.id === id);
    if (ix > -1) {
      updated.splice(ix, 1);
      toasts.value = updated;
      return true;
    }
    return false;
  };
  return {
    addToast,
    addToastMessage,
    closeToast,
    toasts,
  };
};
