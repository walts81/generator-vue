import { Tooltip } from 'bootstrap';

export interface TooltipProps {
  hasHtml?: boolean;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  text: string;
}

export const vTooltip = {
  created(el: any, binding: { value: TooltipProps }) {
    el.setAttribute('data-bs-toggle', 'tooltip');
    el.setAttribute('data-bs-placement', binding.value.placement || 'top');
    el.setAttribute('data-bs-title', binding.value.text);
    if (binding.value.hasHtml) {
      el.setAttribute('data-bs-html', 'true');
    }
    new Tooltip(el);
  },
};
