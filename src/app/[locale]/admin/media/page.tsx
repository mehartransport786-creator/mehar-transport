import { Image as ImageIcon, UploadCloud, Folder, Search, Filter } from "lucide-react";
import MediaLibraryClient from "./MediaLibraryClient";

export default function AdminMediaPage({ params: { locale } }: { params: { locale: string } }) {
  const isAr = locale === "ar";
  
  return (
    <div className="p-8 h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-gray-100 pb-6 flex-shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-[#1B1E4F] flex items-center gap-2">
            <ImageIcon className="w-6 h-6" />
            {isAr ? "مكتبة الوسائط" : "Media Library"}
          </h2>
          <p className="text-gray-500 mt-1">
            {isAr ? "إدارة وتحسين جميع الصور والأصول المرئية." : "Manage and optimize all images and visual assets."}
          </p>
        </div>
      </div>

      <MediaLibraryClient locale={locale} isAr={isAr} />
    </div>
  );
}
