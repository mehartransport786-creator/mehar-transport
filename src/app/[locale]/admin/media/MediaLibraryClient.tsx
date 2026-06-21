"use client";

import { useState, useEffect, useCallback } from "react";
import { UploadCloud, Folder, Search, Trash2, Maximize, Copy, Check, FileImage } from "lucide-react";
import ImageCropperModal from "@/components/admin/media/ImageCropperModal";
import Image from "next/image";

interface MediaImage {
  url: string;
  fileName: string;
  size: number;
  createdAt: string;
}

export default function MediaLibraryClient({ locale, isAr }: { locale: string, isAr: boolean }) {
  const [images, setImages] = useState<MediaImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [folder, setFolder] = useState("fleet");
  const [uploading, setUploading] = useState(false);
  
  const [cropFile, setCropFile] = useState<File | null>(null);
  const [cropImageUrl, setCropImageUrl] = useState<string | null>(null);
  
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const folders = ["fleet", "packages", "routes", "hero", "avatars", "blog", "misc"];

  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/media?folder=${folder}`);
      const data = await res.json();
      if (data.images) {
        setImages(data.images);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [folder]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setCropFile(file);
      setCropImageUrl(URL.createObjectURL(file));
      e.target.value = ''; // reset input
    }
  };

  const uploadBlob = async (blob: Blob) => {
    if (!cropFile) return;
    setUploading(true);
    
    // Create File from Blob
    const newFile = new File([blob], cropFile.name, { type: 'image/jpeg' });
    const formData = new FormData();
    formData.append("file", newFile);
    formData.append("folder", folder);

    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        fetchImages();
      } else {
        alert(isAr ? "فشل الرفع" : "Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert(isAr ? "حدث خطأ" : "Error occurred");
    } finally {
      setUploading(false);
      setCropFile(null);
      setCropImageUrl(null);
    }
  };

  const deleteImage = async (path: string) => {
    if (!confirm(isAr ? "هل أنت متأكد من حذف هذه الصورة؟" : "Are you sure you want to delete this image?")) return;
    
    try {
      const res = await fetch(`/api/admin/media?path=${encodeURIComponent(path)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchImages();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row gap-6 h-full overflow-hidden">
      {/* Sidebar Folders */}
      <div className="w-full md:w-64 bg-white border border-gray-100 rounded-2xl p-4 flex-shrink-0 flex flex-col shadow-sm">
        <h3 className="font-bold text-[#1B1E4F] mb-4 px-2 uppercase tracking-wider text-xs">
          {isAr ? "المجلدات" : "Folders"}
        </h3>
        <div className="space-y-1 overflow-y-auto flex-1 pr-2">
          {folders.map(f => (
            <button
              key={f}
              onClick={() => setFolder(f)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors font-medium text-sm ${
                folder === f 
                  ? "bg-[#D9A63A]/10 text-[#D9A63A]" 
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Folder className={`w-4 h-4 ${folder === f ? "fill-[#D9A63A]/20" : ""}`} />
              <span className="capitalize">{f}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white border border-gray-100 rounded-2xl flex flex-col shadow-sm overflow-hidden relative">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4 bg-gray-50/50">
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg flex-1 max-w-sm focus-within:ring-2 focus-within:ring-[#D9A63A] transition-all">
            <Search className="w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder={isAr ? "البحث عن صورة..." : "Search images..."} 
              className="bg-transparent border-none outline-none text-sm w-full"
            />
          </div>

          <label className={`cursor-pointer px-5 py-2.5 bg-[#1B1E4F] text-white font-bold rounded-xl text-sm hover:bg-[#2a2f6b] transition-all shadow-lg shadow-[#1B1E4F]/20 flex items-center gap-2 ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
            {uploading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <UploadCloud className="w-4 h-4" />
            )}
            {isAr ? "رفع صورة" : "Upload Image"}
            <input type="file" accept="image/*" className="hidden" onChange={handleFileSelect} disabled={uploading} />
          </label>
        </div>

        {/* Image Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="w-8 h-8 border-4 border-[#D9A63A]/30 border-t-[#D9A63A] rounded-full animate-spin" />
            </div>
          ) : images.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                <FileImage className="w-10 h-10 text-gray-300" />
              </div>
              <p>{isAr ? "لا توجد صور في هذا المجلد" : "No images in this folder"}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {images.map((img) => (
                <div key={img.url} className="group flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="aspect-square relative bg-gray-100 flex items-center justify-center overflow-hidden">
                    <Image 
                      src={img.url} 
                      alt={img.fileName}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 20vw"
                    />
                    
                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button 
                        onClick={() => copyToClipboard(img.url)}
                        className="p-2 bg-white text-[#1B1E4F] rounded-full hover:bg-[#D9A63A] hover:text-white transition-colors"
                        title="Copy URL"
                      >
                        {copiedUrl === img.url ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <button 
                        onClick={() => deleteImage(img.url)}
                        className="p-2 bg-white text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-medium text-gray-700 truncate" title={img.fileName}>{img.fileName}</p>
                    <p className="text-[10px] text-gray-400 mt-1 uppercase">{(img.size / 1024).toFixed(1)} KB • WEBP</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cropper Modal */}
      {cropImageUrl && (
        <ImageCropperModal
          imageSrc={cropImageUrl}
          isAr={isAr}
          onCancel={() => {
            setCropFile(null);
            setCropImageUrl(null);
          }}
          onCropComplete={uploadBlob}
          aspectRatio={folder === "hero" ? 16/9 : folder === "avatars" ? 1 : undefined}
        />
      )}
    </div>
  );
}
