export interface CampoNumeroProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onChangeText?: (s: string) => void;
}

export default function CampoNumero(props: CampoNumeroProps) {
  return (
    <input
      type="text"
      value={props.value}
      onChange={(e) => {
        props.onChange?.(e);
        props.onChangeText?.(e.target.value);
      }}
      placeholder={props.placeholder}
      className="input"
    />
  );
}
