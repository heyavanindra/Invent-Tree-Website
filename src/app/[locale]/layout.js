import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Oswald } from "next/font/google";
import { ThemeProviders } from "../../components/ThemeProvider";
import Container from "../../components/container";
import Footer from "../../components/Footer";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
const OswaldFont = Oswald({
  weight: ["300", "400"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Invent Tree",
  description:
    "Discover Invent-Tree – a leading political, survey, and geospatial consultancy firm. Explore our services, case studies, and blog in English and Hindi. Modern, responsive, and insight-driven. ",
};

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${OswaldFont.className} antialiased`}>
        <ThemeProviders
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            {children}
            <Footer />
          </NextIntlClientProvider>
        </ThemeProviders>
      </body>
    </html>
  );
}
