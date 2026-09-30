import type { ChangeEvent } from "react";

type Props = {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  id?: string;
};

export function TextField({ value, placeholder, onChange, id }: Props) {
  return (
    <input
      id={id}
      type="text"
      className="text-field"
      autoComplete="off"
      value={value}
      placeholder={placeholder}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
    />
  );
}
