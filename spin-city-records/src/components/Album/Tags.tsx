interface TagProps {
  variant: string;
  value: string;
}
export default function Tag({ variant, value }: TagProps) {
  let category = "";
  if (variant === "weight") {
    category = value === "standard" ? "SD" : "OW";
  } else if (variant === "speed") {
    category = value === "33RPM" ? "33" : value === "45RPM" ? "45" : "78";
  } else if (variant === "format") {
    category = value === "7" ? '7"' : value === "10" ? '10"' : '12"';
  }
  return <div className="tag">{category}</div>;
}
