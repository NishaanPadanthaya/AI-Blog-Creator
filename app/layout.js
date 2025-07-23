import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AI Blog Generator',
  description: 'Generate professional blogs with AI',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark-theme">
        <body className={inter.className}>
          <main className="min-h-screen bg-gradient-to-b from-dark to-dark-light text-white">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
