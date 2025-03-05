import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ClientThemeProvider from '@/components/ClientThemeProvider';
import PageTransition from '@/components/PageTransition';

export const metadata: Metadata = {
  title: 'Monochrome Blog',
  description: 'A sophisticated black and white blog with elegant typography and smooth animations'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClientThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <PageTransition>
              <main className="container py-8 flex-grow">{children}</main>
            </PageTransition>
            <Footer />
          </div>
        </ClientThemeProvider>
      </body>
    </html>
  );
}
