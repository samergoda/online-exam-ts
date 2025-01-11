import React from 'react';

interface ButtonProps {
  children: string;
}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return (
    <button className="bg-[#4461F2] text-white p-[8px] shadow-[0px_18px_30px_0px_#2F1C1C1A] w-full rounded-[20px] mt-[30px]">
      {children}
    </button>
  );
};

export default Button;
