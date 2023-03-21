type Emitter<T = string> = (eventName: T, ...args: any[]) => void;
type ModelEmitter = Emitter<'update:modelValue'>;
type ValidationEmitter = Emitter<'blur' | 'update:modelValue'>;
