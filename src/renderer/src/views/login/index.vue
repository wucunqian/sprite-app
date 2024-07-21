<template>
  <div>
    login {{ stores.objGather.title }} <br>
  </div>

</template>

<script setup lang="ts">
import { useLoginStore } from '../../stores/useLogin';
const stores = useLoginStore();
</script>

<style scoped></style>