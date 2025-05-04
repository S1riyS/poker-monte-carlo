import React from "react";
import { CardValue } from "../../types";
import { valueToCharacter } from "../../utils/utils";

interface ValueIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: CardValue;
  underlineAmbigous?: boolean;
  flipped?: boolean;
  textAlign?: "left" | "center" | "right";
}

const ValueIcon: React.FC<ValueIconProps> = ({
  value,
  underlineAmbigous,
  flipped,
  textAlign,
  ...props
}) => {
  return (
    <span
      {...props}
      style={{
        lineHeight: "1",
        textAlign: textAlign || props.style?.textAlign,
        textDecorationLine:
          underlineAmbigous &&
          (value === CardValue.SIX || value === CardValue.NINE)
            ? "underline"
            : "none",
        transform: flipped ? "rotate(180deg)" : props.style?.transform,
        ...props.style,
      }}
    >
      {valueToCharacter(value)}
    </span>
  );
};

export default ValueIcon;
