'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { Bold, Italic, List, ListOrdered, Link as LinkIcon, Image as ImageIcon, Heading1, Heading2, Quote, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none min-h-[300px]',
      },
    },
  });

  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt('URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="border border-gray-200 dark:border-white/10 rounded-lg overflow-hidden bg-white dark:bg-[#0F172A]">
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-white/10 transition-colors ${editor.isActive('bold') ? 'bg-gray-200 dark:bg-white/10 text-[#D9A63A]' : 'text-gray-600 dark:text-gray-300'}`}
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-white/10 transition-colors ${editor.isActive('italic') ? 'bg-gray-200 dark:bg-white/10 text-[#D9A63A]' : 'text-gray-600 dark:text-gray-300'}`}
        >
          <Italic className="w-4 h-4" />
        </button>
        
        <div className="w-px h-6 bg-gray-300 dark:bg-white/10 mx-1" />
        
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-white/10 transition-colors ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200 dark:bg-white/10 text-[#D9A63A]' : 'text-gray-600 dark:text-gray-300'}`}
        >
          <Heading1 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-white/10 transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 dark:bg-white/10 text-[#D9A63A]' : 'text-gray-600 dark:text-gray-300'}`}
        >
          <Heading2 className="w-4 h-4" />
        </button>
        
        <div className="w-px h-6 bg-gray-300 dark:bg-white/10 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-white/10 transition-colors ${editor.isActive('bulletList') ? 'bg-gray-200 dark:bg-white/10 text-[#D9A63A]' : 'text-gray-600 dark:text-gray-300'}`}
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-white/10 transition-colors ${editor.isActive('orderedList') ? 'bg-gray-200 dark:bg-white/10 text-[#D9A63A]' : 'text-gray-600 dark:text-gray-300'}`}
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-white/10 transition-colors ${editor.isActive('blockquote') ? 'bg-gray-200 dark:bg-white/10 text-[#D9A63A]' : 'text-gray-600 dark:text-gray-300'}`}
        >
          <Quote className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-300 dark:bg-white/10 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-white/10 transition-colors ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200 dark:bg-white/10 text-[#D9A63A]' : 'text-gray-600 dark:text-gray-300'}`}
        >
          <AlignLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-white/10 transition-colors ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200 dark:bg-white/10 text-[#D9A63A]' : 'text-gray-600 dark:text-gray-300'}`}
        >
          <AlignCenter className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-white/10 transition-colors ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200 dark:bg-white/10 text-[#D9A63A]' : 'text-gray-600 dark:text-gray-300'}`}
        >
          <AlignRight className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-300 dark:bg-white/10 mx-1" />

        <button
          type="button"
          onClick={setLink}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-white/10 transition-colors ${editor.isActive('link') ? 'bg-gray-200 dark:bg-white/10 text-[#D9A63A]' : 'text-gray-600 dark:text-gray-300'}`}
        >
          <LinkIcon className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={addImage}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-gray-600 dark:text-gray-300"
        >
          <ImageIcon className="w-4 h-4" />
        </button>
      </div>
      <EditorContent editor={editor} className="p-4" />
    </div>
  );
}
