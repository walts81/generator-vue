<template>
  <span class="input-group-text">
    <slot>{{ text }}</slot>
  </span>
</template>

<script setup lang="ts">
defineProps<{ text?: string }>();
</script>
