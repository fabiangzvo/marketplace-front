"use client";

import { Fragment, useCallback, useMemo, type JSX } from "react";
import { NavbarItem } from "@heroui/navbar";
import { useDisclosure } from "@heroui/modal";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@heroui/button";

import { SignUpButton } from "@/components/signUpModal";
import { SignInButton } from "@/components/signInModal";

export function NavbarActions(): JSX.Element {
  const { data: session } = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: signInOpen,
    onOpen: signOnOpen,
    onOpenChange: signInOpenChange,
  } = useDisclosure();

  const logout = useCallback(async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  }, []);

  const handleSwitchModal = useCallback(() => {
    onOpenChange();
    signInOpenChange();
  }, [onOpenChange, signInOpenChange]);

  const actions = useMemo(() => {
    if (session?.user) {
      return (
        <NavbarItem className="hidden md:flex">
          <Button color="primary" href="/login" variant="flat" onPress={logout}>
            Cerrar sesión
          </Button>
        </NavbarItem>
      );
    }

    return (
      <Fragment>
        <NavbarItem className="hidden md:flex">
          <SignInButton
            isOpen={signInOpen}
            onOpen={signOnOpen}
            onOpenChange={signInOpenChange}
            onSwitchModal={handleSwitchModal}
          />
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <SignUpButton
            isOpen={isOpen}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
            onSwitchModal={handleSwitchModal}
          />
        </NavbarItem>
      </Fragment>
    );
  }, [
    session?.user,
    isOpen,
    onOpen,
    onOpenChange,
    signInOpen,
    signOnOpen,
    signInOpenChange,
    handleSwitchModal,
    logout,
  ]);

  return actions;
}
