import PackageForm from "@/components/admin/PackageForm";

export default function NewPackagePage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <div className="p-8">
      <PackageForm locale={locale} />
    </div>
  );
}
