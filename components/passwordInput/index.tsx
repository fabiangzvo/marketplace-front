"use client";

import { useState, useCallback, useMemo, type JSX } from "react";
import { Input, InputProps } from "@heroui/input";
import { Tooltip } from "@heroui/tooltip";
import { EyeIcon, EyeClosedIcon } from "lucide-react";

export function PasswordInput(props: Omit<InputProps, "type">): JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = useCallback(() => {
    setIsVisible(!isVisible);
  }, [isVisible]);

  const { icon, type, tooltip } = useMemo(() => {
    if (isVisible) {
      return {
        tooltip: "Ocultar contraseña",
        type: "text",
        icon: (
          <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
        ),
      };
    }

    return {
      tooltip: "Ver contraseña",
      type: "password",
      icon: (
        <EyeClosedIcon className="text-2xl text-default-400 pointer-events-none" />
      ),
    };
  }, [isVisible]);

  return (
    <Input
      isRequired
      classNames={{ inputWrapper: "dark:border-default-500" }}
      endContent={
        <Tooltip content={tooltip}>
          <button
            aria-label="toggle password visibility"
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {icon}
          </button>
        </Tooltip>
      }
      errorMessage="Completa este campo"
      label="Contraseña"
      labelPlacement="outside"
      name="password"
      placeholder="tu contraseña"
      type={type}
      variant="bordered"
      {...props}
    />
  );
}
