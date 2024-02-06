<template>
  <div class="card flex justify-content-center" >
      <Toast position="bottom-center" group="bc" @close="onClose">
          <template #message="slotProps">
              <div class="flex flex-column align-items-start" style="flex: 1">
                  <div class="flex align-items-center gap-2">
                      <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
                      <span class="font-bold text-900">Amy Elsner</span>
                  </div>
                  <div class="font-medium text-sm my-3 text-900">{{ slotProps.message.summary }}</div>
                  <Button  label="Reply" @click="onReply()"></Button>
              </div>
          </template>
      </Toast>
    
  </div>
</template>


<script  setup>
import { useToast } from "primevue/usetoast";



const toast = useToast();





const onReply = () => {
    toast.removeGroup('bc');
  
   
}

const onClose = () => {
  
    toast.removeGroup('bc');
}

</script>

<style>

</style>