<template>
  <router-view />
</template>
<script setup lang="ts">
const ipcHandle = () => window.electron.ipcRenderer.send('ping');
</script>