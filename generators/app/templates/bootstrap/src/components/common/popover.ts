import { Popover } from 'bootstrap';

export interface PopoverProps {
  placement?: 'top' | 'right' | 'bottom' | 'left';
  title?: string;
  content: string;
}

export const vPopover = {
  created(el: any, binding: { value: PopoverProps }) {
    el.setAttribute('data-bs-container', 'body');
    el.setAttribute('data-bs-toggle', 'popover');
    el.setAttribute('data-bs-placement', binding.value.placement || 'right');
    el.setAttribute('data-bs-content', binding.value.content);
    el.setAttribute('data-bs-trigger', 'focus');
    if (!!binding.value.title) {
      el.setAttribute('title', binding.value.title);
    }
    new Popover(el, { trigger: 'focus' });
  },
};
