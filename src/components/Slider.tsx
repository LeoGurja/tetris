import { PropsWithoutRef } from "react";

interface SliderProps {
  value: number;
  setValue: (value: number) => void;
}

export function Slider({ value, setValue }: PropsWithoutRef<SliderProps>) {
  return (
    <fieldset>
      <input
        className="appearance-none bg-neutral-600 outline-none h-2 rounded-full w-36"
        type="range"
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
        min="0"
        max="100"
        step="1"
      />
      <span className="inline-block ml-2 w-8">{value}%</span>
    </fieldset>
  );
}
