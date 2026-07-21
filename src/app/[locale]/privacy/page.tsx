export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  
  return {
    title: isAr 
      ? "سياسة الخصوصية | ميهار للنقل" 
      : "Privacy Policy | Mehar Transport",
    description: isAr
      ? "سياسة الخصوصية لخدمات النقل المقدمة من ميهار للنقل."
      : "Privacy Policy for Mehar Transport services.",
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  
  return (
    <main className="bg-background min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-primary mb-8">
          {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
        </h1>
        <div className="prose prose-lg dark:prose-invert">
          <p className="text-gray-600 dark:text-gray-300">
            {isAr 
              ? "يتم تحديث هذه الصفحة حالياً. ستتوفر سياسة الخصوصية قريباً." 
              : "This page is currently being updated. The Privacy Policy will be available soon."}
          </p>
        </div>
      </div>
    </main>
  );
}
