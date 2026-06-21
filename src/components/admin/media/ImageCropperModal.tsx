"use client";

import { useState, useRef } from "react";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { X, Crop as CropIcon, Check } from "lucide-react";

interface ImageCropperModalProps {
  imageSrc: string;
  isAr: boolean;
  onCropComplete: (croppedBlob: Blob) => void;
  onCancel: () => void;
  aspectRatio?: number; // e.g., 16/9, 1
}

export default function ImageCropperModal({ imageSrc, isAr, onCropComplete, onCancel, aspectRatio }: ImageCropperModalProps) {
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 90,
    height: 90,
    x: 5,
    y: 5
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleComplete = async () => {
    if (!completedCrop || !imageRef.current) return;
    
    const image = imageRef.current;
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    
    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );
    
    canvas.toBlob((blob) => {
      if (blob) {
        onCropComplete(blob);
      }
    }, "image/jpeg", 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
          <h3 className="font-bold text-[#1B1E4F] flex items-center gap-2">
            <CropIcon className="w-5 h-5" />
            {isAr ? "قص الصورة" : "Crop Image"}
          </h3>
          <button onClick={onCancel} className="p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-auto flex-1 flex items-center justify-center bg-gray-50">
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspectRatio}
            className="max-h-full"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              ref={imageRef} 
              src={imageSrc} 
              alt="Crop target" 
              className="max-h-[60vh] object-contain"
              crossOrigin="anonymous"
            />
          </ReactCrop>
        </div>

        <div className="p-4 border-t border-gray-100 flex items-center justify-end gap-3 flex-shrink-0">
          <button 
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-xl transition-colors"
          >
            {isAr ? "إلغاء" : "Cancel"}
          </button>
          <button 
            onClick={handleComplete}
            disabled={!completedCrop?.width || !completedCrop?.height}
            className="px-6 py-2 bg-[#D9A63A] text-[#1B1E4F] font-bold rounded-xl hover:bg-[#c59532] transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Check className="w-4 h-4" />
            {isAr ? "حفظ الصورة المخصوصة" : "Save Cropped Image"}
          </button>
        </div>
      </div>
    </div>
  );
}
