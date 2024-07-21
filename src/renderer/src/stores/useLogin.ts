import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useLoginStore = defineStore('useLoginStore', () => {
  interface UseLogin {
    title: string;
    msg: string;
  }
  const objGather = ref<UseLogin>({
    title: 'useLogin',
    msg: "pinia获取",
    count: 123
  });
  return { objGather };
});