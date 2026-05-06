"use client";

import { 
    Plus, 
    Trash2, 
    GripVertical, 
    ChevronDown, 
    ChevronUp 
} from 'lucide-react';

interface RepeaterFieldProps {
  label: string;
  items: any[];
  onChange: (items: any[]) => void;
  renderItem: (item: any, index: number, updateItem: (data: any) => void) => React.ReactNode;
  newItemDefault: any;
}

export default function RepeaterField({ 
  label, 
  items = [], 
  onChange, 
  renderItem, 
  newItemDefault 
}: RepeaterFieldProps) {
  
  const addItem = () => {
    onChange([...items, { ...newItemDefault }]);
  };

  const removeItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    onChange(newItems);
  };

  const updateItem = (index: number, data: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], ...data };
    onChange(newItems);
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === items.length - 1) return;

    const newItems = [...items];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
    onChange(newItems);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center ml-4">
         <label className="text-[11px] font-bold uppercase text-brand">{label}</label>
         <button 
           onClick={(e) => { e.preventDefault(); addItem(); }}
           className="flex items-center gap-2 text-[10px] font-bold uppercase text-brand hover:text-brand/80"
         >
            <Plus size={14} /> Add Item
         </button>
      </div>

      <div className="space-y-4">
         {items.map((item, index) => (
            <div key={index} className="flex gap-4 group">
               <div className="flex flex-col gap-2 pt-4">
                  <button onClick={(e) => { e.preventDefault(); moveItem(index, 'up'); }} className="text-text-muted hover:text-brand transition-colors"><ChevronUp size={16} /></button>
                  <GripVertical size={16} className="text-stroke group-hover:text-text-muted" />
                  <button onClick={(e) => { e.preventDefault(); moveItem(index, 'down'); }} className="text-text-muted hover:text-brand transition-colors"><ChevronDown size={16} /></button>
               </div>
               
               <div className="flex-grow bg-surface/30 border border-stroke rounded-3xl p-6 relative">
                  <button 
                    onClick={(e) => { e.preventDefault(); removeItem(index); }}
                    className="absolute -top-3 -right-3 w-8 h-8 bg-white border border-stroke rounded-full flex items-center justify-center text-red-500 shadow-sm hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                  >
                     <Trash2 size={14} />
                  </button>
                  
                  {renderItem(item, index, (data) => updateItem(index, data))}
               </div>
            </div>
         ))}

         {items.length === 0 && (
            <div className="p-10 border-2 border-dashed border-stroke rounded-3xl text-center">
               <p className="text-[10px] font-bold uppercase text-text-muted">No items added yet.</p>
               <button 
                onClick={(e) => { e.preventDefault(); addItem(); }}
                className="mt-4 text-[10px] font-bold uppercase text-brand"
               >
                  Create First Item
               </button>
            </div>
         )}
      </div>
    </div>
  );
}

