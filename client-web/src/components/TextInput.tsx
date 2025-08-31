import React from "react";

interface IProps {
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  placeHolder: string;
  value: string;
  onChangevalue: (value: string) => void;
  hasError?: boolean;
  errorMessage?: string;
}

export const TextInput = (props: IProps) => {
  const {
    label,
    type = "text",
    placeHolder,
    value,
    hasError,
    errorMessage,
    onChangevalue,
  } = props;

  const errorClass = hasError ? "input-error" : "";
  return (
    <fieldset className="fieldset">
      {label && <label className="label">{label}</label>}
      <input
        type={type}
        className={`input ${errorClass}`}
        placeholder={placeHolder}
        value={value}
        onChange={(e) => onChangevalue(e.target.value)}
      />
      {hasError && errorMessage?.length && (
        <label className="label text-red-500">{errorMessage}</label>
      )}
    </fieldset>
  );
};
