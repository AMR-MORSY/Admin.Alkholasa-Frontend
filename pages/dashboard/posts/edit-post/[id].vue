<template>
  <div>
    <PostForm :post="post" :formType="formType"></PostForm>
  </div>
</template>

<script  setup>

const route = useRoute();

const post=ref();

const formType="Update";

const getPost=()=>{
  
  const url = `/posts/${route.params.id}`;
    const { Api } = useFetchingData();

    Api.get(url).then((response) => {
      if(response)
      {
        if (response.status==200) {
          post.value = response.data;
        
          
        }
      }

      



    }).catch((error) => {
     

    })

}



onBeforeMount(()=>{
  getPost()
})


</script>

<style>

</style>