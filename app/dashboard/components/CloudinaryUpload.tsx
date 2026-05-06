"use client";

import { useState } from 'react';
import { UploadCloud, ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

interface CloudinaryUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function CloudinaryUpload({ value, onChange, label }: CloudinaryUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      toast.error("Cloudinary credentials not configured in environment variables.");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const json = await res.json();
      if (json.secure_url) {
        onChange(json.secure_url);
        toast.success("Image deployed to Cloudinary");
      } else {
        throw new Error(json.error?.message || "Upload failed");
      }
    } catch (err: any) {
      toast.error("Upload Error: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4 w-full">
      {label && <label className="text-[11px] font-bold uppercase text-brand ml-4">{label}</label>}
      
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="w-40 h-40 rounded-2xl overflow-hidden border border-stroke bg-surface flex items-center justify-center shrink-0 relative group">
          {value ? (
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon size={32} className="text-stroke" />
          )}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
             <p className="text-[8px] font-bold text-white uppercase tracking-widest">Current Asset</p>
          </div>
        </div>
        
        <div className="flex-grow space-y-4 w-full">
          <input 
            type="text" 
            value={value} 
            onChange={e => onChange(e.target.value)}
            placeholder="Static URL or Generated Asset ID..."
            className="input-field"
          />
          
          <div className="relative border-2 border-dashed border-stroke rounded-xl p-6 hover:bg-surface hover:border-brand transition-all text-center group cursor-pointer">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload}
              disabled={uploading}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            />
            <div className="flex flex-col items-center gap-2">
              <UploadCloud size={24} className={`text-brand group-hover:-translate-y-1 transition-transform ${uploading ? 'animate-pulse' : ''}`} />
              <p className="text-[10px] font-bold text-text-primary uppercase tracking-tight">
                {uploading ? "Uploading Node..." : "Upload New Asset"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
