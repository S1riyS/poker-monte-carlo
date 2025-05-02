import React from "react";
import { Button, ButtonProps, Spinner } from "react-bootstrap";

interface LoadingButtonProps extends ButtonProps {
  isLoading: boolean;
  icon?: React.ReactNode;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  icon,
  ...props
}) => {
  return (
    <Button disabled={isLoading} {...props}>
      <>
        {!!icon && !isLoading && icon}
        {isLoading && <Spinner animation="border" size="sm" />} {props.children}
      </>
    </Button>
  );
};

export default LoadingButton;
