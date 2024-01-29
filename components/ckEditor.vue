<template>
  
  <div class="container max-w-2xl mx-auto my-8">
    <section v-if="editor"
      class="buttons flex text-gray-700 flex-wrap items-center gab-x-4 border-t border-l border-r border-gray-400 p-4">
      <button @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'bg-gray-200': editor.isActive('bold') }"
        class="p-1" type="button">
        <MdiIcon icon="mdiFormatBold" title="Bold" />

      </button>
      <button @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'bg-gray-200': editor.isActive('italic') }" class=" p-1 mx-1" type="button">
        <MdiIcon icon="mdiFormatItalic" />
      </button>

      <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'bg-gray-200': editor.isActive('heading', { level: 1 }) }" class=" p-1 mx-1" type="button">
        <MdiIcon icon="mdiFormatHeader1" />
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'bg-gray-200': editor.isActive('heading', { level: 2 }) }" class=" p-1 mx-1" type="button">
        <MdiIcon icon="mdiFormatHeader2" />
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'bg-gray-200': editor.isActive('heading', { level: 3 }) }" class=" p-1 mx-1" type="button">
        <MdiIcon icon="mdiFormatHeader3" />
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        :class="{ 'bg-gray-200': editor.isActive('heading', { level: 4 }) }" class=" p-1 mx-1" type="button">
        <MdiIcon icon="mdiFormatHeader4" />
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        :class="{ 'bg-gray-200': editor.isActive('heading', { level: 5 }) }" class=" p-1 mx-1" type="button">
        <MdiIcon icon="mdiFormatHeader5" />
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        :class="{ 'bg-gray-200': editor.isActive('heading', { level: 6 }) }" class=" p-1 mx-1" type="button">
        <MdiIcon icon="mdiFormatHeader6" />
      </button>
      <button @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'bg-gray-200': editor.isActive('bulletList') }" class=" p-1 mx-1" type="button">
        <MdiIcon icon="mdiFormatListBulleted" />
      </button>
      <button @click="editor.chain().focus().toggleUnderline().run()"
        :class="{ 'bg-gray-200': editor.isActive('underline') }" class=" p-1 mx-1" type="button">
        <MdiIcon icon="mdiCheckUnderline" />
      </button>


      <button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()"
        class="disabled:text-gray-400 p-1 mx-1">
        <MdiIcon icon="mdiArrowULeftTop" />
      </button>
      <button   @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()"
        class="disabled:text-gray-400 p-1 mx-1" type="button">
        <MdiIcon icon="mdiArrowULeftBottom" />
      </button>
      <button @click="setLink" :class="{ 'bg-gray-200': editor.isActive('link') }"
        class="disabled:text-gray-400 p-1 mx-1" type="button">
        setLink
      </button>
      <button @click="editor.chain().focus().unsetLink().run()" :disabled="!editor.isActive('link')"
        class="disabled:text-gray-400 p-1 mx-1" type="button">
        unsetLink
      </button>
    </section>


      <editor-content :editor="editor" />
  
   
  </div>
</template>

<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline';
import Link from "@tiptap/extension-link";



const props=defineProps({
  modelValue:String
})

watch(()=>props.modelValue,()=>{
  console.log(props.modelValue)
  editor.value.commands.setContent(props.modelValue)
})
const emit=defineEmits(["update:modelValue"])
const editor = useEditor({
//  content: props.modelValue,
  onUpdate:({editor})=>{
    
    emit("update:modelValue",editor.getHTML())

   

  },
  // onFocus:({editor})=>{

  //   console.log(props.modelValue)

  //   editor.commands.setContent(props.modelValue)

  // },
  
  extensions: [
    StarterKit,
    Underline,
    Link.configure({
      protocols: ['ftp', 'mailto'],
      autolink: false,
    })
  ],
  editorProps: {
    attributes: {
      class: 'border border-gray-400 p-4 min-h-[12rem] max-h-[12rem] overflow-y-auto prose max-w-none prose-zinc outline-none',
    },
  }
})




const setLink = function addLink() {
  const previousUrl = editor.value.getAttributes("link").href
  const url = window.prompt('URL', previousUrl)
  console.log(previousUrl);

  // cancelled
  if (url === null) {
    return
  }

  // empty
  if (url === '') {
    editor.value
      .chain()
      .focus()
      .extendMarkRange('link')
      .unsetLink()
      .run()

    return
  }

  // update link
  editor.value
    .chain()
    .focus()
    .extendMarkRange('link')
    .setLink({ href: url })
    .run()

}




</script>

