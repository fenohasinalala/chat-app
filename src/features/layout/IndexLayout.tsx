import { Footer, Navbar } from './components';

export function IndexLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
