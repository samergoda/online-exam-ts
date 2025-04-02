'use client';

import { ReactNode, useEffect } from 'react';

interface PopupProps {
  id: string;
  setShowPopup: (value: boolean) => void;
  token: string;
  children: ReactNode;
}

function Popup({ id, setShowPopup, token, children }: PopupProps) {
  useEffect(() => {}, []);

  function handleTogglePopup() {
    setShowPopup(false);
  }

  return (
    <>
      <i
        onClick={handleTogglePopup}
        className='fixed bg-[#0000002b] top-0 left-0 w-full h-full'
      ></i>
      {children}
    </>
  );
}

export default Popup;
