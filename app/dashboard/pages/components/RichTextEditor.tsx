"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import TipTapImage from '@tiptap/extension-image';
import { Mark, mergeAttributes } from '@tiptap/core';
import { useState } from 'react';
import { toast } from 'sonner';
import CloudinaryUpload from '../../components/CloudinaryUpload';
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
  Image as ImageIcon,
  Copy,
  Plus
} from 'lucide-react';

// 1. Declare Custom Font Size Extension
export const FontSize = Mark.create({
  name: 'fontSize',

  addAttributes() {
    return {
      size: {
        default: null,
        parseHTML: element => element.style.fontSize,
        renderHTML: attributes => {
          if (!attributes.size) {
            return {};
          }
          return {
            style: `font-size: ${attributes.size}`,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[style*=font-size]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setFontSize: size => ({ chain }) => {
        return chain()
          .setMark('fontSize', { size })
          .run();
      },
      unsetFontSize: () => ({ chain }) => {
        return chain()
          .unsetMark('fontSize')
          .run();
      },
    };
  },
});

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (size: string) => ReturnType;
      unsetFontSize: () => ReturnType;
    };
  }
}

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
  // Modal states
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');

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
      TipTapImage.configure({
        HTMLAttributes: {
          class: 'rounded-2xl border border-stroke shadow-premium max-w-full my-10',
        },
      }),
      FontSize,
    ],
    content: value,
    editorProps: {
      attributes: {
        class: 'focus:outline-none prose prose-slate max-w-none min-h-[400px] text-text-primary antialiased blog-content-area',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  // Custom Modal Actions for Links
  const openLinkModal = () => {
    const previousUrl = editor.getAttributes('link').href || '';
    setLinkUrl(previousUrl);
    setIsLinkModalOpen(true);
  };

  const handleApplyLink = () => {
    if (linkUrl.trim() === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
    }
    setIsLinkModalOpen(false);
  };

  const handleRemoveLink = () => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run();
    setIsLinkModalOpen(false);
  };

  // Custom Modal Actions for Images
  const handleInsertImage = () => {
    if (!uploadedImageUrl) return;
    editor.chain().focus().setImage({ src: uploadedImageUrl }).run();
    setIsImageModalOpen(false);
    setUploadedImageUrl('');
  };

  const handleCopyLink = () => {
    if (!uploadedImageUrl) return;
    navigator.clipboard.writeText(uploadedImageUrl);
    toast.success("Image URL copied to clipboard!");
  };

  const fontSizes = ['10px', '12px', '14px', '16px', '18px', '20px', '24px', '30px', '36px', '40px', '48px', '64px'];

  return (
    <div className="space-y-4">
      {label && <label className="text-[11px] font-bold uppercase text-brand ml-4 tracking-[0.2em]">{label}</label>}
      
      <div className="border border-stroke rounded-[2.5rem] bg-white overflow-hidden focus-within:border-brand/30 transition-all shadow-premium group">

        <div className="px-8 py-6 border-b border-stroke bg-surface/10 flex flex-wrap items-center gap-2">
          
          {/* Typography Styles */}
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

          {/* Heading levels */}
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

          {/* Dynamic Font Sizes Dropdown */}
          <div className="flex items-center gap-1.5 p-1 bg-white border border-stroke rounded-xl shadow-sm">
            <span className="text-[10px] font-bold uppercase text-text-muted px-2 select-none">Size:</span>
            <select
              value={editor.getAttributes('fontSize').size || ''}
              onChange={(e) => {
                const val = e.target.value;
                if (!val) {
                  editor.chain().focus().unsetFontSize().run();
                } else {
                  editor.chain().focus().setFontSize(val).run();
                }
              }}
              className="bg-transparent text-[10px] font-bold uppercase outline-none pr-3 cursor-pointer text-text-primary focus:text-brand transition-colors"
            >
              <option value="">Default</option>
              {fontSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="w-px h-8 bg-stroke mx-2" />

          {/* Alignments */}
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

          {/* Lists */}
          <div className="flex items-center gap-1.5 p-1 bg-white border border-stroke rounded-xl shadow-sm">
            <MenuButton title="Bullet List" onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')}>
              <List size={16} />
            </MenuButton>
            <MenuButton title="Numbered List" onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')}>
              <ListOrdered size={16} />
            </MenuButton>
          </div>

          <div className="w-px h-8 bg-stroke mx-2" />

          {/* Links & Images Custom Modal Access */}
          <div className="flex items-center gap-1.5 p-1 bg-white border border-stroke rounded-xl shadow-sm">
            <MenuButton title="Add Link" onClick={openLinkModal} isActive={editor.isActive('link')}>
              <LinkIcon size={16} />
            </MenuButton>
            <MenuButton title="Add Image" onClick={() => setIsImageModalOpen(true)} isActive={editor.isActive('image')}>
              <ImageIcon size={16} />
            </MenuButton>
          </div>

          <div className="flex-grow" />

          {/* Undo/Redo */}
          <div className="flex items-center gap-1.5 p-1">
            <button type="button" onClick={() => editor.chain().focus().undo().run()} className="p-2 text-text-muted hover:text-brand transition-colors"><Undo size={16} /></button>
            <button type="button" onClick={() => editor.chain().focus().redo().run()} className="p-2 text-text-muted hover:text-brand transition-colors"><Redo size={16} /></button>
          </div>
        </div>

        <div className="relative">

          {editor && (
            <BubbleMenu editor={editor}>
              <div className="flex items-center gap-1 p-1 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden scale-90 md:scale-100 origin-bottom">
                 <button 
                   type="button"
                   onClick={() => editor.chain().focus().toggleBold().run()} 
                   className={`p-2 rounded-lg text-white transition-all ${editor.isActive('bold') ? 'bg-brand' : 'hover:bg-white/10'}`}
                 >
                   <Bold size={14} />
                 </button>
                 <button 
                   type="button"
                   onClick={() => editor.chain().focus().toggleItalic().run()} 
                   className={`p-2 rounded-lg text-white transition-all ${editor.isActive('italic') ? 'bg-brand' : 'hover:bg-white/10'}`}
                 >
                   <Italic size={14} />
                 </button>
                 <div className="w-px h-4 bg-white/10 mx-1" />
                 <button 
                   type="button"
                   onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} 
                   className={`p-2 rounded-lg text-white transition-all ${editor.isActive('heading', { level: 1 }) ? 'bg-brand' : 'hover:bg-white/10'}`}
                 >
                   <Heading1 size={14} />
                 </button>
                 <button 
                   type="button"
                   onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} 
                   className={`p-2 rounded-lg text-white transition-all ${editor.isActive('heading', { level: 2 }) ? 'bg-brand' : 'hover:bg-white/10'}`}
                 >
                   <Heading2 size={14} />
                 </button>
                 <div className="w-px h-4 bg-white/10 mx-1" />
                 <button 
                   type="button"
                   onClick={openLinkModal} 
                   className={`p-2 rounded-lg text-white transition-all ${editor.isActive('link') ? 'bg-brand' : 'hover:bg-white/10'}`}
                 >
                   <LinkIcon size={14} />
                 </button>
              </div>
            </BubbleMenu>
          )}

          <div className="p-5 sm:p-8 md:p-10 min-h-[400px]">
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

      {/* Link Dialog Modal Overlay */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-stroke shadow-2xl p-6 w-full max-w-md space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-2.5 pb-2.5 border-b border-stroke">
              <LinkIcon className="text-brand animate-pulse" size={18} />
              <h3 className="text-xs font-black uppercase tracking-wider text-text-primary">Insert / Modify Link</h3>
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-bold uppercase text-text-muted px-1 tracking-widest">Destination URL</label>
              <input
                type="text"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="e.g. https://ranknexis.com"
                className="w-full h-11 bg-surface border border-stroke rounded-xl px-4 text-xs font-semibold focus:outline-none focus:border-brand transition-all text-text-primary"
              />
            </div>
            <div className="flex gap-2 justify-end pt-3 border-t border-stroke">
              <button
                type="button"
                onClick={() => setIsLinkModalOpen(false)}
                className="px-4 h-10 border border-stroke rounded-xl text-[10px] font-bold uppercase text-text-muted hover:bg-surface transition-all cursor-pointer"
              >
                Cancel
              </button>
              {editor.isActive('link') && (
                <button
                  type="button"
                  onClick={handleRemoveLink}
                  className="px-4 h-10 border border-red-200 text-red-500 rounded-xl text-[10px] font-bold uppercase hover:bg-red-50 transition-all cursor-pointer"
                >
                  Remove Link
                </button>
              )}
              <button
                type="button"
                onClick={handleApplyLink}
                className="px-5 h-10 bg-brand text-white rounded-xl text-[10px] font-bold uppercase hover:scale-[1.02] active:scale-98 transition-all cursor-pointer"
              >
                Apply Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Upload/Insertion Dialog Modal Overlay */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-stroke shadow-2xl p-6 w-full max-w-lg space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-2.5 pb-2.5 border-b border-stroke">
              <ImageIcon className="text-brand" size={18} />
              <h3 className="text-xs font-black uppercase tracking-wider text-text-primary">Insert Content Image</h3>
            </div>
            
            <div className="space-y-4">
              <CloudinaryUpload
                value={uploadedImageUrl}
                onChange={(url) => {
                  setUploadedImageUrl(url);
                  if (url) {
                    editor.chain().focus().setImage({ src: url }).run();
                    try {
                      navigator.clipboard.writeText(url);
                      toast.success("Uploaded image URL copied to clipboard and inserted at cursor!");
                    } catch (e) {
                      toast.success("Uploaded image inserted successfully!");
                    }
                    setIsImageModalOpen(false);
                    setUploadedImageUrl('');
                  }
                }}
                label="Deploy Image Asset to Cloudinary"
              />
              
              {uploadedImageUrl && (
                <div className="flex gap-3 justify-start items-center p-3 bg-surface rounded-xl border border-stroke">
                  <p className="text-[9px] font-mono text-text-muted truncate flex-grow px-1 select-all">{uploadedImageUrl}</p>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="px-3 h-8 bg-white border border-stroke rounded-lg text-[9px] font-bold uppercase flex items-center gap-1 hover:text-brand transition-colors cursor-pointer"
                  >
                    <Copy size={12} /> Copy Link
                  </button>
                </div>
              )}
            </div>

            <div className="flex gap-2 justify-end pt-3 border-t border-stroke">
              <button
                type="button"
                onClick={() => {
                  setIsImageModalOpen(false);
                  setUploadedImageUrl('');
                }}
                className="px-4 h-10 border border-stroke rounded-xl text-[10px] font-bold uppercase text-text-muted hover:bg-surface transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleInsertImage}
                disabled={!uploadedImageUrl}
                className="px-5 h-10 bg-brand text-white rounded-xl text-[10px] font-bold uppercase hover:scale-[1.02] active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Insert into Editor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
