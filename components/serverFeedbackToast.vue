<template>
  <div class="card flex justify-content-center" >
      <Toast position="bottom-center" group="SFB" >
          <template #message="slotProps">
              <div class="flex flex-column align-items-start" style="flex: 1">
                 
                  <div class="font-medium text-sm my-3 text-900">{{ slotProps.message.summary }}</div>
                
              </div>
          </template>
      </Toast>
    
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>