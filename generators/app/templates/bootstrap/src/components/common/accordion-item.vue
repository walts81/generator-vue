<template>
  <div class="accordion-item" ref="el">
    <h2 class="accordion-header" :id="headerId">
      <button
        ref="btn"
        class="accordion-button"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="'#' + id"
        :aria-controls="id"
      >
        <slot name="header">{{ title }}</slot>
      </button>
    </h2>
    <div ref="collapseable" class="accordion-collapse collapse" :id="id" :aria-labelledby="headerId">
      <div class="accordion-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useComponentHelpers } from './use-component-helpers';

export interface PropDefs {
  defaultOpen?: boolean;
  title?: string;
}

const props = withDefaults(defineProps<PropDefs>(), {
  defaultOpen: () => false,
  title: () => '',
});

const { generateId } = useComponentHelpers();
const headerId = computed(() => generateId('accordion-item-header'));
const id = computed(() => generateId('accordion-item'));
const el = ref<any>(null);
const btn = ref<any>(null);
const collapseable = ref<any>(null);

onMounted(() => {
  if (props.defaultOpen) {
    collapseable.value.classList.add('show');
    btn.value.setAttribute('aria-expanded', 'true');
  } else {
    btn.value.setAttribute('aria-expanded', 'false');
    btn.value.classList.add('collapsed');
  }
});
</script>

<style scoped lang="scss">
.accordion-body {
  text-align: left;
}
</style>
