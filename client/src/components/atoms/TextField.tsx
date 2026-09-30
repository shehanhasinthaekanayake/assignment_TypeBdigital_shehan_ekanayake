import type { ChangeEvent } from "react";

type Props = {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  id?: string;
  disabled?: boolean;
};

export function TextField({
  value,
  placeholder,
  onChange,
  id,
  disabled = false,
}: Props) {
  return (
    <input
      id={id}
      type="text"
      className="text-field"
      autoComplete="off"
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
    />
  );
}
