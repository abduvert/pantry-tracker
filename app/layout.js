import { Poppins } from 'next/font/google';
import './globals.css';
import { UserProvider } from './context/UserContext';
import Header from './components/header';  
import Footer from './components/footer';  
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata = {
  title: 'Pantry Tracker',
  description: 'Manage your inventories here',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <UserProvider>
        <Header />
        <main>{children}</main>
        <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
