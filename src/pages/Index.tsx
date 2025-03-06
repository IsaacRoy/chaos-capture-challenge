
import React from 'react';
import AnnoyingLogin from '../components/AnnoyingLogin';

const Index: React.FC = () => {
  return (
    <div>
      <div className="fixed top-4 left-0 right-0 z-50 text-center pointer-events-none">
        <h1 className="text-white text-xl md:text-2xl font-bold px-4 py-2 bg-black/70 inline-block rounded">
          World's Most Annoying Login
        </h1>
      </div>
      <AnnoyingLogin />
    </div>
  );
};

export default Index;
