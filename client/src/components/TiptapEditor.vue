<template>
  <div class="relative rounded-lg overflow-hidden" style="border: 1px solid #e5e7eb; background: #fff;">

    <!-- Toolbar -->
    <div class="flex flex-wrap items-center gap-0.5 px-3 py-2" style="border-bottom: 1px solid #f3f4f6; background: #f9fafb;">
      <ToolBtn @click="editor?.chain().focus().toggleBold().run()" :active="editor?.isActive('bold')" title="Bold">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/></svg>
      </ToolBtn>
      <ToolBtn @click="editor?.chain().focus().toggleItalic().run()" :active="editor?.isActive('italic')" title="Italic">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"/></svg>
      </ToolBtn>
      <ToolBtn @click="editor?.chain().focus().toggleUnderline().run()" :active="editor?.isActive('underline')" title="Underline">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"/></svg>
      </ToolBtn>

      <div class="w-px h-5 mx-1" style="background: #e5e7eb;"></div>

      <ToolBtn @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()" :active="editor?.isActive('heading', { level: 2 })" title="Heading 2">
        <span class="text-xs font-bold">H2</span>
      </ToolBtn>
      <ToolBtn @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()" :active="editor?.isActive('heading', { level: 3 })" title="Heading 3">
        <span class="text-xs font-bold">H3</span>
      </ToolBtn>

      <div class="w-px h-5 mx-1" style="background: #e5e7eb;"></div>

      <ToolBtn @click="editor?.chain().focus().toggleBulletList().run()" :active="editor?.isActive('bulletList')" title="Bullet list">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"/></svg>
      </ToolBtn>
      <ToolBtn @click="editor?.chain().focus().toggleOrderedList().run()" :active="editor?.isActive('orderedList')" title="Ordered list">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"/></svg>
      </ToolBtn>
      <ToolBtn @click="editor?.chain().focus().toggleBlockquote().run()" :active="editor?.isActive('blockquote')" title="Quote">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/></svg>
      </ToolBtn>
      <ToolBtn @click="editor?.chain().focus().toggleCodeBlock().run()" :active="editor?.isActive('codeBlock')" title="Code block">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>
      </ToolBtn>

      <div class="w-px h-5 mx-1" style="background: #e5e7eb;"></div>

      <ToolBtn @click="toggleLink" :active="editor?.isActive('link')" title="Link">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>
      </ToolBtn>
      <ToolBtn v-if="editor?.isActive('link')" @click="editor?.chain().focus().unsetLink().run()" :active="false" title="Remove link">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2zm-3-4h8v2H8v-2z"/></svg>
      </ToolBtn>
    </div>

    <!-- Link input bar -->
    <div v-if="showLinkInput" class="flex items-center gap-2 px-4 py-2" style="border-bottom: 1px solid #f3f4f6; background: #eff6ff;">
      <input
        ref="linkInputRef"
        v-model="linkUrl"
        @keydown.enter.prevent="applyLink"
        @keydown.escape="showLinkInput = false"
        placeholder="https://example.com"
        class="flex-1 text-sm px-3 py-1.5 rounded-lg"
        style="border: 1px solid #e5e7eb; outline: none; background: #fff; color: #111827;"
      />
      <button @click="applyLink" class="px-3 py-1.5 text-xs font-semibold rounded-lg text-white" style="background: #6CC551; border: none; cursor: pointer;">Set</button>
      <button @click="showLinkInput = false" class="px-3 py-1.5 text-xs rounded-lg" style="color: #374151; border: none; background: transparent; cursor: pointer;">Cancel</button>
    </div>

    <!-- Editor content -->
    <div class="px-5 py-4" style="min-height: 320px; max-height: 560px; overflow-y: auto;">
      <editor-content :editor="editor" class="tiptap-content" />
    </div>

    <!-- Status bar -->
    <div class="flex items-center justify-between px-5 py-2" style="border-top: 1px solid #f3f4f6; background: #f9fafb;">
      <div class="flex items-center gap-3 text-xs font-mono" style="color: #6b7280;">
        <span v-if="editor?.isActive('bold')">Bold</span>
        <span v-if="editor?.isActive('italic')">Italic</span>
        <span v-if="editor?.isActive('heading', { level: 2 })">H2</span>
        <span v-if="editor?.isActive('heading', { level: 3 })">H3</span>
        <span v-if="editor?.isActive('blockquote')">Quote</span>
        <span v-if="editor?.isActive('codeBlock')">Code</span>
        <span v-if="editor?.isActive('link')">Link</span>
      </div>
      <span class="text-xs font-mono" style="color: #9ca3af;">{{ wordCount }} words</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, nextTick, onBeforeUnmount, defineComponent, h } from 'vue';
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';

const props = defineProps<{ modelValue: string }>();
const emit  = defineEmits<{ (e: 'update:modelValue', v: string): void }>();

const showLinkInput = ref(false);
const linkUrl       = ref('');
const linkInputRef  = ref<HTMLInputElement | null>(null);

const ToolBtn = defineComponent({
  props: { active: Boolean, title: String },
  emits: ['click'],
  setup(props, { slots, emit }) {
    return () => h('button', {
      type: 'button',
      title: props.title,
      onClick: () => emit('click'),
      style: props.active
        ? 'background:#6CC551;color:#fff;padding:6px;border-radius:6px;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;'
        : 'background:transparent;color:#374151;padding:6px;border-radius:6px;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;',
    }, slots.default?.());
  },
});

const editor = useEditor({
  extensions: [
    StarterKit.configure({ heading: { levels: [2, 3] } }),
    Underline,
    Link.configure({ openOnClick: false }),
    Image.configure({ HTMLAttributes: { class: 'rounded-lg max-w-full' } }),
    Placeholder.configure({ placeholder: 'Write the post content here…' }),
  ],
  content: props.modelValue || '',
  onUpdate({ editor: e }) {
    emit('update:modelValue', e.getHTML());
  },
  immediatelyRender: false,
});

watch(() => props.modelValue, (val) => {
  if (!editor.value) return;
  const current = editor.value.getHTML();
  if (val !== current) editor.value.commands.setContent(val || '', false);
});

const wordCount = computed(() => {
  if (!editor.value) return 0;
  return editor.value.getText().split(/\s+/).filter(Boolean).length;
});

const toggleLink = async () => {
  if (!editor.value) return;
  linkUrl.value = (editor.value.getAttributes('link').href as string) || '';
  showLinkInput.value = true;
  await nextTick();
  linkInputRef.value?.focus();
};

const applyLink = () => {
  if (!editor.value) return;
  if (linkUrl.value) {
    editor.value.chain().focus().setLink({ href: linkUrl.value }).run();
  } else {
    editor.value.chain().focus().unsetLink().run();
  }
  showLinkInput.value = false;
  linkUrl.value = '';
};

onBeforeUnmount(() => editor.value?.destroy());
</script>

<style>
.tiptap-content .ProseMirror {
  outline: none;
  color: #111827;
  font-size: 0.9375rem;
  line-height: 1.75;
}
.tiptap-content .ProseMirror p { margin: 0 0 0.75em; }
.tiptap-content .ProseMirror h2 { font-size: 1.375rem; font-weight: 700; color: #1E2833; margin: 1.25em 0 0.5em; }
.tiptap-content .ProseMirror h3 { font-size: 1.125rem; font-weight: 600; color: #1E2833; margin: 1em 0 0.4em; }
.tiptap-content .ProseMirror ul { list-style: disc; padding-left: 1.5em; margin: 0.5em 0; }
.tiptap-content .ProseMirror ol { list-style: decimal; padding-left: 1.5em; margin: 0.5em 0; }
.tiptap-content .ProseMirror li { margin: 0.25em 0; }
.tiptap-content .ProseMirror blockquote { border-left: 3px solid #6CC551; padding-left: 1em; color: #4b5563; margin: 1em 0; font-style: italic; }
.tiptap-content .ProseMirror code { background: #f0fdf4; color: #15803d; padding: 2px 6px; border-radius: 4px; font-size: 0.875em; }
.tiptap-content .ProseMirror pre { background: #1E2833; color: #e5e7eb; padding: 1em; border-radius: 8px; overflow-x: auto; margin: 1em 0; }
.tiptap-content .ProseMirror pre code { background: none; color: inherit; padding: 0; }
.tiptap-content .ProseMirror a { color: #6CC551; text-decoration: underline; }
.tiptap-content .ProseMirror hr { border: none; border-top: 1px solid #e5e7eb; margin: 1.5em 0; }
.tiptap-content .ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #6b7280;
  pointer-events: none;
  height: 0;
}
</style>
