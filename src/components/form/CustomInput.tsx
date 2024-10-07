import { Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  value?: string;
};

export default function CustomInput({ type, name, label }: TInputProps) {
  return (
    <div style={{ marginBottom: "20px" }}>
      {label ? label : null}
      <Controller
        name={name}
        render={({ field }) => (
          <Input
            style={{ color: "rgba(0,0,0,.25)" }}
            {...field}
            type={type}
            id={name}
          />
        )}
      />
    </div>
  );
}
