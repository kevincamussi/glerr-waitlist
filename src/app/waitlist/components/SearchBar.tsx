interface Props {
  value: string;
  onChange: (v: string) => void;
}
export default function SearchBar({ value, onChange }: Props) {
  return (
    <input
      placeholder="Search User"
      value={value}
      onChange={(e) => onChange(e.target.value.trimStart())}
      onKeyDown={(e) => {
        if (e.key === "Enter")
          onChange((e.target as HTMLInputElement).value.trim());
      }}
      className="h-10 px-4 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}
