<template>
    <div>
        <NuxtLink to="/dashboard" class=" underline">/dashborad</NuxtLink><span>/posts</span>

        <div v-if="posts">
            <div v-for="post in posts" :key="post.id"
                class="max-w-xxl mt-4  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">


                <figure class=" w-fit">
                    <img class=" w-fit rounded-lg" :srcset="post.images[0].path" />
                    <figcaption
                        class="mt-2 text-sm text-center flex items-center justify-around text-gray-500 dark:text-gray-400">
                        <span class="block">Views:{{ post.views }}</span>
                        <span class="block">Author:{{ post.Author.user_name }}</span>
                        <span class="block">Category:{{ post.category.name }}</span>
                    </figcaption>

                </figure>

                <article class="prose max-w-none prose-slate prose-headings:underline p-6">

                    <div class=" flex items-center justify-start">
                        <h5>Meta Title: </h5>
                        <span class=" block">{{ post.meta_title }}</span>
                    </div>


                    <div class=" flex items-center justify-start">

                        <h5>Slug:</h5>
                        <span class=" block">{{ post.slug }}</span>
                    </div>
                    <div class=" flex items-center justify-start">

                        <h5>Summary:</h5>
                        <span class=" block" dir="rtl">{{ post.summary }}</span>
                    </div>


                </article>

                <article dir="rtl" class="max-w-none prose  prose-slate prose-headings:underline prose-a:text-blue-600 p-6">
                    <h1>{{ post.title }}</h1>
                    <div v-html="post.content"></div>

                </article>

                <div class=" bg-slate-100 py-5 mt-12 flex justify-around items-center w-full">

                    <button class=" border border-spacing-9 p-2 rounded bg-red-700 text-center text-white" type="button"
                        @click="deletePost(post.id)"> Delete</button>
                    <button @click="updatePost(post.id)"
                        class=" border border-spacing-9 p-2 rounded bg-green-700 text-center text-white" type="button">
                        Update</button>
                </div>








            </div>
        </div>

        <button class="flex justify-center border border-spacing-9 p-2 bg-blue-400  my-14 rounded" type="button"
            @click="gotToNewPost">
            <MdiIcon icon="mdiDatabasePlus" />New Post
        </button>
    </div>
</template>

<script setup>
import { useRouter } from '#imports';
import { usePrimevueToastService } from '~/composables/usePrimevueToastService';
const router = useRouter();
const toastService=usePrimevueToastService();

const posts = ref(null);
const htmlContent = ref(null);

const getPosts = () => {
    const url = "/posts";
    const { Api } = useFetchingData();

    Api.get(url).then((response) => {
        if (response) {
            if (response.status == 200) {
                posts.value = response.data.data;

            }


        }




    }).catch((error) => {
        console.log(error)

    })

}

onMounted(() => {

    getPosts();

})

const deletePost = (id) => {



    const url = `/posts/${id}`;
    const { Api } = useFetchingData();

    Api.delete(url).then((response) => {
        if (response) {
            if (response.status == 200) {
               toastService.add({
                severity:"success",
                group:"SFB",
                life:3000,
                summary:"Deleted Successfully"
               })
                 location.reload();

            }

        }




    }).catch((error) => {
        console.log(error)

    });



}

const updatePost = (id) => {
    return router.push({ path: `/dashboard/posts/edit-post/${id}` });

}

function gotToNewPost() {

    return router.push({ path: "/dashboard/posts/new-post" })

};

</script>

<style lang="scss" scoped></style>