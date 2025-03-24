import React, { ChangeEvent } from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ name, value, onChange, ...rest }) => {
  return <input name={name} value={value} onChange={onChange} {...rest} />;
};

export default InputField;
