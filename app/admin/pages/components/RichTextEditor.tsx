"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  List, 
  ListOrdered, 
  Heading1, 
  Heading2, 
  Link as LinkIcon,
  Undo,
  Redo
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  label?: string;
}

const MenuButton = ({ onClick, isActive, children }: any) => (
  <button
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
    className={`p-2 rounded-lg transition-all ${
      isActive ? 'bg-brand text-white shadow-lg shadow-brand/20' : 'bg-white border border-stroke text-text-muted hover:bg-surface'
    }`}
  >
    {children}
  </button>
);

export default function RichTextEditor({ value, onChange, label }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="space-y-3">
      {label && <label className="text-[11px] font-bold uppercase text-brand ml-4">{label}</label>}
      <div className="border border-stroke rounded-[2rem] bg-white overflow-hidden focus-within:border-brand transition-all shadow-sm">
        <div className="px-6 py-4 border-b border-stroke bg-surface/30 flex flex-wrap gap-2">
          <MenuButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')}>
            <Bold size={16} />
          </MenuButton>
          <MenuButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')}>
            <Italic size={16} />
          </MenuButton>
          <MenuButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')}>
            <UnderlineIcon size={16} />
          </MenuButton>
          
          <div className="w-px h-8 bg-stroke mx-1" />
          
          <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })}>
            <Heading1 size={16} />
          </MenuButton>
          <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })}>
            <Heading2 size={16} />
          </MenuButton>
          
          <div className="w-px h-8 bg-stroke mx-1" />
          
          <MenuButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')}>
            <List size={16} />
          </MenuButton>
          <MenuButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')}>
            <ListOrdered size={16} />
          </MenuButton>
          
          <div className="w-px h-8 bg-stroke mx-1" />
          
          <MenuButton onClick={setLink} isActive={editor.isActive('link')}>
            <LinkIcon size={16} />
          </MenuButton>
          
          <div className="flex-grow" />
          
          <MenuButton onClick={() => editor.chain().focus().undo().run()} isActive={false}>
            <Undo size={16} />
          </MenuButton>
          <MenuButton onClick={() => editor.chain().focus().redo().run()} isActive={false}>
            <Redo size={16} />
          </MenuButton>
        </div>
        
        <div className="p-8 prose prose-sm max-w-none min-h-[250px] focus:outline-none">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}

