import { computed, ref, nextTick } from 'vue';

export type ValidationRule = (v: any) => boolean | string;
export type ValidationRules = ValidationRule[];

export interface ValidationProps {
  modelValue: any;
  rules: ValidationRules;
  label?: string;
}

export interface ValidationArgs {
  props: ValidationProps;
  emit: ValidationEmitter;
}

export const useValidation = ({ props, emit }: ValidationArgs) => {
  const isInvalid = ref(false);
  const validationMessage = computed(() => {
    if (isInvalid.value) {
      const msg = evaluateRules();
      const defaultMsg = !!props.label ? props.label + ' is invalid.' : 'Invalid';
      return msg || defaultMsg;
    }
    return '';
  });

  const evaluateRules = () => {
    const rules = props.rules || [];
    if (rules.length === 0) return true;

    const value = props.modelValue;
    for (const rule of rules) {
      const result = rule(value);
      if (result !== true) {
        return result;
      }
    }
    return true;
  };

  const validate = () => {
    isInvalid.value = false;
    return nextTick(() => (isInvalid.value = evaluateRules() !== true));
  };

  const validateAndBlur = async (e: any) => {
    await validate();
    emit('blur', e);
  };

  return { isInvalid, validationMessage, validate, validateAndBlur };
};
