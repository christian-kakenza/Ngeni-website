import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

// ============================================================
// Public Layout — wraps landing page with Navbar + Footer
// Auth pages & dashboard inherit directly from [locale]/layout
// ============================================================

type PublicLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export default function PublicLayout({
  children,
  params: { locale },
}: PublicLayoutProps) {
  return (
    <>
      <Navbar locale={locale} />
      <main className="pt-16">{children}</main>
      <Footer locale={locale} />
      <ScrollToTop />
    </>
  );
}
