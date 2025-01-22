import './globals.css';
import Navbar from './components/Navbar';

export const metadata = {
  title: "Smart Wardrobe Organizer",
  description: "Organize your wardrobe and plan outfits efficiently.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
