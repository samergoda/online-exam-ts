interface ButtonProps {
  children: string;
  disabled: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, disabled }) => {
  return (
    <button
      disabled={disabled}
      className={`text-white p-[8px] shadow-[0px_18px_30px_0px_#2F1C1C1A] w-full rounded-[20px] mt-[30px] bg-[#4461F2] ${
        disabled && "cursor-not-allowed"
      }`}>
      {children}
    </button>
  );
};

export default Button;
