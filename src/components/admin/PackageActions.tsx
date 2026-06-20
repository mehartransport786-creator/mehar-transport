"use client";

import { Edit3, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PackageActions({ packageId, locale, isAr }: { packageId: string, locale: string, isAr: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm(isAr ? "هل أنت متأكد من حذف هذه الباقة؟" : "Are you sure you want to delete this package?")) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/packages/${packageId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
      } else {
        alert(isAr ? "فشل الحذف" : "Failed to delete");
      }
    } catch (err) {
      console.error(err);
      alert(isAr ? "حدث خطأ" : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <Link href={`/${locale}/admin/packages/${packageId}/edit`} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title={isAr ? "تعديل" : "Edit"}>
        <Edit3 className="w-4 h-4" />
      </Link>
      <button onClick={handleDelete} disabled={loading} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50" title={isAr ? "حذف" : "Delete"}>
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
