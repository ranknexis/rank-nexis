"use client";

import { useState } from "react";
import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";

interface Target {
  id: string;
  title: string;
  slug: string;
}

interface Recommendation {
  id: string;
  type: "service" | "blog" | "work";
  title: string;
  slug: string;
}

interface RecommendationsEditorProps {
  value: Recommendation[];
  onChange: (val: Recommendation[]) => void;
  allServices: Target[];
  allBlogs: Target[];
  allCaseStudies: Target[];
}

export default function RecommendationsEditor({
  value = [],
  onChange,
  allServices = [],
  allBlogs = [],
  allCaseStudies = [],
}: RecommendationsEditorProps) {
  const [selectedType, setSelectedType] = useState<"service" | "blog" | "work">("service");
  const [selectedItemId, setSelectedItemId] = useState<string>("");

  // Determine available items for selection based on type
  const getAvailableItems = () => {
    let items: Target[] = [];
    if (selectedType === "service") items = allServices;
    else if (selectedType === "blog") items = allBlogs;
    else if (selectedType === "work") items = allCaseStudies;

    // Filter out items already selected
    return items.filter((item) => !value.some((v) => v.id === item.id && v.type === selectedType));
  };

  const availableItems = getAvailableItems();

  const handleAdd = () => {
    if (!selectedItemId) return;

    let itemToAdd: Target | undefined;
    if (selectedType === "service") itemToAdd = allServices.find((i) => i.id === selectedItemId);
    else if (selectedType === "blog") itemToAdd = allBlogs.find((i) => i.id === selectedItemId);
    else if (selectedType === "work") itemToAdd = allCaseStudies.find((i) => i.id === selectedItemId);

    if (!itemToAdd) return;

    const newRec: Recommendation = {
      id: itemToAdd.id,
      type: selectedType,
      title: itemToAdd.title,
      slug: itemToAdd.slug,
    };

    onChange([...value, newRec]);
    setSelectedItemId("");
  };

  const handleRemove = (index: number) => {
    const updated = [...value];
    updated.splice(index, 1);
    onChange(updated);
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === value.length - 1) return;

    const newIndex = direction === "up" ? index - 1 : index + 1;
    const updated = [...value];
    const temp = updated[index];
    updated[index] = updated[newIndex];
    updated[newIndex] = temp;
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface/50 border border-stroke rounded-2xl p-5 space-y-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-text-primary">Add Related Recommendation</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold uppercase text-text-muted px-1">Type</label>
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value as any);
                setSelectedItemId("");
              }}
              className="w-full h-11 bg-white border border-stroke rounded-xl px-3 text-[10px] font-bold uppercase focus:border-brand outline-none cursor-pointer text-text-primary"
            >
              <option value="service">Service</option>
              <option value="blog">Blog / Article</option>
              <option value="work">Work / Case Study</option>
            </select>
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-[9px] font-bold uppercase text-text-muted px-1">Choose Recommendation Item</label>
            <div className="flex gap-2">
              <select
                value={selectedItemId}
                onChange={(e) => setSelectedItemId(e.target.value)}
                className="flex-grow h-11 bg-white border border-stroke rounded-xl px-3 text-[10px] font-bold uppercase focus:border-brand outline-none cursor-pointer text-text-primary"
              >
                <option value="">-- Select an Item --</option>
                {availableItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleAdd}
                disabled={!selectedItemId}
                className="h-11 px-4 bg-brand text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-brand-dark active:scale-95 transition-all shadow-md shadow-brand/10 disabled:opacity-50 shrink-0 cursor-pointer"
              >
                <Plus size={16} /> Add
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-[10px] font-black uppercase text-text-muted px-1 tracking-wider">Current Recommendations ({value.length})</h4>
        
        {value.length === 0 ? (
          <div className="py-10 border border-dashed border-stroke rounded-2xl text-center bg-surface/10">
            <p className="text-[10px] font-bold uppercase text-text-muted tracking-wider">No recommendations set. Respective public pages will show fallback content.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {value.map((rec, index) => (
              <div
                key={`${rec.type}-${rec.id}`}
                className="flex items-center justify-between p-4 bg-white border border-stroke rounded-xl hover:border-brand/30 transition-all group shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <span className={`px-2.5 py-1 text-[8px] font-black uppercase rounded-lg border tracking-wider shrink-0 ${
                    rec.type === "service"
                      ? "bg-brand/5 border-brand/20 text-brand"
                      : rec.type === "blog"
                      ? "bg-amber-50 border-amber-200 text-amber-600"
                      : "bg-emerald-50 border-emerald-200 text-emerald-600"
                  }`}>
                    {rec.type}
                  </span>
                  <div>
                    <p className="text-xs font-bold text-text-primary uppercase tracking-tight">{rec.title}</p>
                    <p className="text-[9px] font-bold text-text-muted uppercase">Slug: {rec.slug}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveItem(index, "up")}
                    disabled={index === 0}
                    className="p-2 text-text-muted hover:text-brand disabled:opacity-20 transition-colors cursor-pointer"
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem(index, "down")}
                    disabled={index === value.length - 1}
                    className="p-2 text-text-muted hover:text-brand disabled:opacity-20 transition-colors cursor-pointer"
                  >
                    <ArrowDown size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
