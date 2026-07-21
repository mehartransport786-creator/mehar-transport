export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  
  return {
    title: isAr 
      ? "سياسة الإلغاء والاسترجاع | ميهار للنقل" 
      : "Cancellation & Refund Policy | Mehar Transport",
    description: isAr
      ? "سياسة الإلغاء والاسترجاع لخدمات النقل المقدمة من ميهار للنقل."
      : "Cancellation and refund policy for Mehar Transport services.",
  };
}

export default async function CancellationPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  
  return (
    <main className="bg-background min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-primary mb-8">
          {isAr ? "سياسة الإلغاء والاسترجاع" : "Cancellation & Refund Policy"}
        </h1>
        <div className="prose prose-lg dark:prose-invert">
          <p className="text-gray-600 dark:text-gray-300">
            {isAr 
              ? "يتم تحديث هذه الصفحة حالياً. ستتوفر سياسة الإلغاء والاسترجاع قريباً." 
              : "This page is currently being updated. The Cancellation & Refund Policy will be available soon."}
          </p>
        </div>
      </div>
    </main>
  );
}
