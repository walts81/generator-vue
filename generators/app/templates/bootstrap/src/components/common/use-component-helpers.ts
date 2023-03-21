import { useValidation, ValidationArgs } from './use-validation';

export const useComponentHelpers = (args?: ValidationArgs) => {
  const argsToUse = args || { props: { modelValue: null, rules: [], label: '' }, emit: x => {} };
  const validation = useValidation(argsToUse);

  const generateId = (prefix: string, length: number = 5) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = length || characters.length;
    for (let i = 0; i < charactersLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return prefix + '-' + result;
  };
  const getKey = (id: string, index: number) => id + '_' + index.toString();

  const createOptionalBooleanProp = (defaultValue = false) => ({
    type: Boolean,
    default: defaultValue,
    required: false,
  });
  const createOptionalNumberProp = (defaultValue = 0) => ({ type: Number, default: defaultValue, required: false });
  const createOptionalStringProp = (defaultValue = '') => ({ type: String, default: defaultValue, required: false });

  const result = {
    generateId,
    getKey,
    createOptionalBooleanProp,
    createOptionalNumberProp,
    createOptionalStringProp,
  };

  return { ...result, ...validation };
};
