import { Footer, Navbar, Sidebar } from './components';

export function ChannelLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Navbar />
      <Sidebar />
      {children}
      <Footer />
    </main>
  );
}
