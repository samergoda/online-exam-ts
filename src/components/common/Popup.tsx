// import { useEffect } from "react";
import { ReactNode } from "react";
interface PopupProps {
  setShowPopup: (value: boolean) => void;

  children: ReactNode;
}

function Popup({ children }: PopupProps) {
  // function handleTogglePopup() {
  //   setShowPopup(false);
  // }

  return (
    <>
      {/* <i
        onClick={handleTogglePopup}
        className='fixed bg-[#0000002b] top-0 left-0 w-full h-full'
      ></i> */}
      {children}
    </>
  );
}

export default Popup;
