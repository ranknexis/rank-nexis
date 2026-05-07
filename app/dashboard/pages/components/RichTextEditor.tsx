"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  List, 
  ListOrdered, 
  Heading1, 
  Heading2, 
  Heading3,
  Link as LinkIcon,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
  MoreHorizontal,
  Plus
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  label?: string;
  placeholder?: string;
}

const MenuButton = ({ onClick, isActive, children, title }: any) => (
  <button
    title={title}
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
    className={`p-2 rounded-lg transition-all flex items-center justify-center ${
      isActive 
        ? 'bg-brand text-white shadow-lg shadow-brand/20' 
        : 'bg-white text-text-muted hover:bg-brand/5 hover:text-brand border border-stroke'
    }`}
  >
    {children}
  </button>
);

export default function RichTextEditor({ value, onChange, label, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-brand underline decoration-brand/30 underline-offset-4 font-bold',
        },
      }),
      Placeholder.configure({
        placeholder: placeholder || 'Start writing your strategic insight...',
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-2xl border border-stroke shadow-premium max-w-full my-10',
        },
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: 'focus:outline-none prose prose-slate max-w-none min-h-[400px] text-text-primary antialiased',
      },
    },
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
    <div className="space-y-4">
      {label && <label className="text-[11px] font-bold uppercase text-brand ml-4 tracking-[0.2em]">{label}</label>}
      
      <div className="border border-stroke rounded-[2.5rem] bg-white overflow-hidden focus-within:border-brand/30 transition-all shadow-premium group">

        <div className="px-8 py-6 border-b border-stroke bg-surface/10 flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 p-1 bg-white border border-stroke rounded-xl shadow-sm">
            <MenuButton title="Bold" onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')}>
              <Bold size={16} />
            </MenuButton>
            <MenuButton title="Italic" onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')}>
              <Italic size={16} />
            </MenuButton>
            <MenuButton title="Underline" onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')}>
              <UnderlineIcon size={16} />
            </MenuButton>
          </div>

          <div className="w-px h-8 bg-stroke mx-2" />

          <div className="flex items-center gap-1.5 p-1 bg-white border border-stroke rounded-xl shadow-sm">
            <MenuButton title="Heading 1" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })}>
              <Heading1 size={16} />
            </MenuButton>
            <MenuButton title="Heading 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })}>
              <Heading2 size={16} />
            </MenuButton>
            <MenuButton title="Heading 3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })}>
              <Heading3 size={16} />
            </MenuButton>
            <MenuButton title="Text" onClick={() => editor.chain().focus().setParagraph().run()} isActive={editor.isActive('paragraph')}>
              <Type size={16} />
            </MenuButton>
          </div>

          <div className="w-px h-8 bg-stroke mx-2" />

          <div className="flex items-center gap-1.5 p-1 bg-white border border-stroke rounded-xl shadow-sm">
            <MenuButton title="Align Left" onClick={() => editor.chain().focus().setTextAlign('left').run()} isActive={editor.isActive({ textAlign: 'left' })}>
              <AlignLeft size={16} />
            </MenuButton>
            <MenuButton title="Align Center" onClick={() => editor.chain().focus().setTextAlign('center').run()} isActive={editor.isActive({ textAlign: 'center' })}>
              <AlignCenter size={16} />
            </MenuButton>
            <MenuButton title="Align Right" onClick={() => editor.chain().focus().setTextAlign('right').run()} isActive={editor.isActive({ textAlign: 'right' })}>
              <AlignRight size={16} />
            </MenuButton>
          </div>

          <div className="w-px h-8 bg-stroke mx-2" />

          <div className="flex items-center gap-1.5 p-1 bg-white border border-stroke rounded-xl shadow-sm">
            <MenuButton title="Bullet List" onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')}>
              <List size={16} />
            </MenuButton>
            <MenuButton title="Numbered List" onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')}>
              <ListOrdered size={16} />
            </MenuButton>
          </div>

          <div className="w-px h-8 bg-stroke mx-2" />

          <div className="flex items-center gap-1.5 p-1 bg-white border border-stroke rounded-xl shadow-sm">
            <MenuButton title="Add Link" onClick={setLink} isActive={editor.isActive('link')}>
              <LinkIcon size={16} />
            </MenuButton>
          </div>

          <div className="flex-grow" />

          <div className="flex items-center gap-1.5 p-1">
            <button onClick={() => editor.chain().focus().undo().run()} className="p-2 text-text-muted hover:text-brand transition-colors"><Undo size={16} /></button>
            <button onClick={() => editor.chain().focus().redo().run()} className="p-2 text-text-muted hover:text-brand transition-colors"><Redo size={16} /></button>
          </div>
        </div>

        <div className="relative">

          {editor && (
            <BubbleMenu editor={editor}>
              <div className="flex items-center gap-1 p-1 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden scale-90 md:scale-100 origin-bottom">
                 <button 
                   onClick={() => editor.chain().focus().toggleBold().run()} 
                   className={`p-2 rounded-lg text-white transition-all ${editor.isActive('bold') ? 'bg-brand' : 'hover:bg-white/10'}`}
                 >
                   <Bold size={14} />
                 </button>
                 <button 
                   onClick={() => editor.chain().focus().toggleItalic().run()} 
                   className={`p-2 rounded-lg text-white transition-all ${editor.isActive('italic') ? 'bg-brand' : 'hover:bg-white/10'}`}
                 >
                   <Italic size={14} />
                 </button>
                 <div className="w-px h-4 bg-white/10 mx-1" />
                 <button 
                   onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} 
                   className={`p-2 rounded-lg text-white transition-all ${editor.isActive('heading', { level: 1 }) ? 'bg-brand' : 'hover:bg-white/10'}`}
                 >
                   <Heading1 size={14} />
                 </button>
                 <button 
                   onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} 
                   className={`p-2 rounded-lg text-white transition-all ${editor.isActive('heading', { level: 2 }) ? 'bg-brand' : 'hover:bg-white/10'}`}
                 >
                   <Heading2 size={14} />
                 </button>
                 <div className="w-px h-4 bg-white/10 mx-1" />
                 <button 
                   onClick={setLink} 
                   className={`p-2 rounded-lg text-white transition-all ${editor.isActive('link') ? 'bg-brand' : 'hover:bg-white/10'}`}
                 >
                   <LinkIcon size={14} />
                 </button>
              </div>
            </BubbleMenu>
          )}

          <div className="p-10 md:p-16 min-h-[400px]">
             <EditorContent editor={editor} />
          </div>
        </div>

        <div className="px-8 py-3 border-t border-stroke bg-surface/5 flex justify-between items-center">
            <div className="flex gap-4">
               <p className="text-[9px] font-bold uppercase text-text-muted">Intelligence: <span className="text-brand">Active</span></p>
               <p className="text-[9px] font-bold uppercase text-text-muted">Protocol: <span className="text-brand">HTML5</span></p>
            </div>
            <p className="text-[9px] font-bold uppercase text-text-muted">Ready for deployment</p>
        </div>
      </div>
    </div>
  );
}
