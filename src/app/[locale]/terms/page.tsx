export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  
  return {
    title: isAr 
      ? "الشروط والأحكام | ميهار للنقل" 
      : "Terms & Conditions | Mehar Transport",
    description: isAr
      ? "الشروط والأحكام لخدمات النقل المقدمة من ميهار للنقل."
      : "Terms and conditions for Mehar Transport services.",
  };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  
  return (
    <main className="bg-background min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-primary mb-8">
          {isAr ? "الشروط والأحكام" : "Terms & Conditions"}
        </h1>
        <div className="prose prose-lg dark:prose-invert">
          <p className="text-gray-600 dark:text-gray-300">
            {isAr 
              ? "يتم تحديث هذه الصفحة حالياً. ستتوفر الشروط والأحكام قريباً." 
              : "This page is currently being updated. The Terms and Conditions will be available soon."}
          </p>
        </div>
      </div>
    </main>
  );
}
