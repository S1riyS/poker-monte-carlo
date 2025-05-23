import React from "react";
import { CardValue } from "../../types";
import { valueToCharacter } from "../../utils/utils";

interface ValueIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: CardValue;
  underlineAmbigous?: boolean;
  flipped?: boolean;
  textAlign?: "left" | "center" | "right";
  tenAsT?: boolean;
}

const ValueIcon: React.FC<ValueIconProps> = ({
  value,
  underlineAmbigous,
  flipped,
  textAlign,
  tenAsT,
  ...props
}) => {
  return (
    <span
      {...props}
      style={{
        lineHeight: "1",
        textAlign: textAlign || props.style?.textAlign,
        fontFamily: props.style?.fontFamily || "Abril Fatface, cursive",
        textDecorationLine:
          underlineAmbigous &&
          (value === CardValue.SIX || value === CardValue.NINE)
            ? "underline"
            : "none",
        transform: flipped ? "rotate(180deg)" : props.style?.transform,
        ...props.style,
      }}
    >
      {valueToCharacter(value, tenAsT)}
    </span>
  );
};

export default ValueIcon;
