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
        console.log(response);
        post.value = response.data;
        console.log(post.value);



    }).catch((error) => {
        console.log(error)

    })

}



onBeforeMount(()=>{
  getPost()
})


</script>

<style>

</style>