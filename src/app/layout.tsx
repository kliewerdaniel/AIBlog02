import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ClientThemeProvider from '@/components/ClientThemeProvider';
import PageTransition from '@/components/PageTransition';

export const metadata: Metadata = {
  title: 'Daniel Kliewer | Programming Blog',
  description: 'Daniel Kliewer\'s blog about programming, web development, data annotation, and digital art',
  icons: {
    icon: [
      { url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9ImJsYWNrIi8+PC9zdmc+' },
    ],
  },
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
              <main className="container py-8 flex-grow bg-gray-50 dark:bg-gray-900">{children}</main>
            </PageTransition>
            <Footer />
          </div>
        </ClientThemeProvider>
      </body>
    </html>
  );
}
