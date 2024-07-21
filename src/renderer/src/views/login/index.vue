<template>
  <div>
    login {{ stores.objGather.title }} <br>
    <div class="mb-4">
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </div>
  </div>

</template>

<script setup lang="ts">
import { useLoginStore } from '../../stores/useLogin';
const stores = useLoginStore();
console.log('stores')

</script>

<style scoped></style>