import { ValidationRules } from './use-validation';

export interface BaseModelPropDefs {
  label?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  rules?: ValidationRules;
}

export interface ModelPropDefs<T> extends BaseModelPropDefs {
  modelValue: T;
}

export const getComputedBoolean = <T extends { options?: T }>(props: T, getValue: (p: T) => boolean | undefined) => {
  const optionsVal = !!props.options ? getValue(props.options) : undefined;
  const propsVal = getValue(props);
  return optionsVal === true ? true : optionsVal === false ? false : propsVal === true;
};

export const getComputedNumber = <T extends { options?: T }>(props: T, getValue: (p: T) => number | undefined) => {
  const optionsVal = !!props.options ? getValue(props.options) : undefined;
  const propsVal = getValue(props);
  return optionsVal === 0 ? 0 : !!optionsVal ? optionsVal : propsVal;
};

export const getComputedProp = <T extends { options?: T }, TVal = any>(
  props: T,
  getValue: (p: T) => TVal | undefined
) => {
  const optionsVal = !!props.options ? getValue(props.options) : undefined;
  const propsVal = getValue(props);
  return optionsVal || propsVal;
};
