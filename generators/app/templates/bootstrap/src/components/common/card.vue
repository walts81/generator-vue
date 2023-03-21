<template>
  <div class="card">
    <div class="card-header" v-if="showHeader">
      <slot name="header"></slot>
    </div>
    <div class="card-body">
      <h5 class="card-title" v-if="showTitle">
        <slot name="title"></slot>
      </h5>
      <p class="card-text" v-if="showText">
        <slot name="text"></slot>
      </p>
      <slot></slot>
    </div>
    <div class="card-footer text-muted" v-if="showFooter">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';

const slots = useSlots();
const showHeader = computed(() => !!slots.header);
const showTitle = computed(() => !!slots.title);
const showText = computed(() => !!slots.text);
const showFooter = computed(() => !!slots.footer);
</script>

<style scoped lang="scss">
.card {
  text-align: left;
}
</style>
