// src/games/Limbo/Slider.tsx
/*
 * Author: BankkRoll
 */

import React, { useRef } from "react";

interface SliderProps {
  min: number;
  max: number;
  value: number;
  range: [number, number];
  onChange: (value: number | string) => void;
  disabled?: boolean;
  step?: number;
}

const Slider: React.FC<SliderProps> = ({
  min: minValue,
  max: maxValue,
  value,
  onChange,
  disabled,
  range: [min, max],
  step = 0.01,
}) => {
  const sliderRef = useRef<HTMLInputElement>(null);
  const labels = Array.from({ length: 5 }).map(
    (_, i, arr) => min + Math.floor((i / (arr.length - 1)) * (max - min)),
  );

  const change = (newValue: number) => {
    const fixedValue = Math.max(minValue, Math.min(maxValue, newValue));
    if (fixedValue !== value) onChange(fixedValue);
  };

  return (
    <div className="relative w-full">
      <div className="relative bg-gray-200 rounded-full overflow-hidden h-6">
        <div
          className="absolute bg-[#ffa01e] h-6 rounded-full shadow-inner"
          style={{ width: `calc(${(value / max) * 100}%)` }}
        ></div>
        <input
          ref={sliderRef}
          type="range"
          value={value}
          disabled={disabled}
          step={step}
          min={min}
          max={max}
          onChange={(event) => change(Number(event.target.value))}
          className="absolute left-0 top-0 w-full h-full appearance-none bg-transparent cursor-pointer z-10"
          style={{
            height: "24px",
            margin: 0,
          }}
        />
      </div>

      {labels.map((label, i) => (
        <div
          key={i}
          className={`absolute top-full mt-2 text-xs font-medium py-1 px-2 rounded-md shadow-md transform -translate-x-1/2 ${
            value >= label
              ? "bg-[#ffa01e] text-white"
              : "bg-gray-300 text-gray-800"
          }`}
          style={{ left: `${(label / max) * 100}%` }}
        >
          {label}
        </div>
      ))}
    </div>
  );
};

export default Slider;
