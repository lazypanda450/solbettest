import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
    onCheckedChange: (checked: boolean) => void;
  }
>(({ className, onCheckedChange, ...props }, ref) => (
  <SwitchPrimitives.Root
    {...props}
    ref={ref}
    onCheckedChange={onCheckedChange}
    className={`peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${
      props.checked ? "bg-primary" : "bg-input"
    } ${className}`}
  >
    <SwitchPrimitives.Thumb className="pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform translate-x-0 peer-checked:translate-x-4" />
  </SwitchPrimitives.Root>
));

Switch.displayName = "Switch";

export { Switch };
