import { observer } from "mobx-react-lite";
import { Button } from "@heroui/react";
import { api } from "@/lib/trpc";
import { PromiseCall } from "@/store/standard/PromiseState";

const colors = [
  { name: 'default', background: '', foreground: '' },
  { name: 'rose', background: '#e11d48', foreground: '#ffffff' },
  { name: 'orange', background: '#ea580c', foreground: '#ffffff' },
  { name: 'lime', background: '#65a30d', foreground: '#ffffff' },
  { name: 'green', background: '#16a34a', foreground: '#ffffff' },
  { name: 'teal', background: '#0d9488', foreground: '#ffffff' },
  { name: 'cyan', background: '#0891b2', foreground: '#ffffff' },
  { name: 'blue', background: '#2563eb', foreground: '#ffffff' },
  { name: 'violet', background: '#7c3aed', foreground: '#ffffff' },
  { name: 'purple', background: '#9333ea', foreground: '#ffffff' }
];

interface Props {
  onChange?: (background: string, foreground: string) => Promise<any>;
  value?: string;
}

export const ThemeColor = observer(({ onChange, value = colors[0]?.background }: Props) => {
  return (
    <div className="flex gap-1 flex-wrap w-[250px] md:w-auto">
      {colors.map((color) => (
        <Button
          key={color.name}
          isIconOnly
          className={`w-8 h-8 min-w-8 rounded-full border-2 border-foreground`}
          style={{
            background: color.background || 'gray',
            backgroundImage: color.background.includes('gradient') ? color.background : 'none',
            border: value === color.background ? '2px solid var(--foreground)' : 'none'
          }}
          onPress={() => onChange?.(color.background, color.foreground)}
        />
      ))}
    </div>
  );
});
