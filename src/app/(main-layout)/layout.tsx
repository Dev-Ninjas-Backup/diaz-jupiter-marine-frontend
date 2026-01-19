import AskAI from '@/components/shared/AskAI/AskAI';
import Footer from '@/components/shared/main/Footer/Footer';
import Navbar from '@/components/shared/main/Navbar/Navbar';
import { SearchResultsProvider } from '@/context/SearchResultsContext';
import { ReactNode } from 'react';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SearchResultsProvider>
      <div className="">
        <div className="my-2 md:my-3 mx-2 md:mx-5 rounded-2xl">
          <Navbar />
          <AskAI />
          <div className="min-h-screen">{children}</div>
        </div>
        <Footer />
      </div>
    </SearchResultsProvider>
  );
};

export default MainLayout;
