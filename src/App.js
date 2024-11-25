import React, { useEffect, useState } from 'react';
import Index from 'Pages/Routes';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import './App.scss';
import ScreenLoader from 'Components/Screen Loader/ScreenLoader';
import { useAuthContext } from 'Context/AuthContext';

function App() {
  const { isApploading } = useAuthContext();

  if (isApploading) return <ScreenLoader />;

  return (
    <>
      <Index />
    </>
  );
}

export default App;
