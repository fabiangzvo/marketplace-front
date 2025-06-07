"use client";

import { Fragment, useCallback, useMemo, type JSX } from "react";
import { NavbarItem } from "@heroui/navbar";
import { useDisclosure } from "@heroui/modal";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@heroui/button";
import Link from "next/link";

import { Cart } from "../cart";

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
        <Fragment>
          <Button
            as={Link}
            className="font-medium text-lg"
            color="primary"
            href="/dashboard"
            variant="light"
          >
            Dashboard
          </Button>
          <NavbarItem>
            <Button
              className="text-lg max-sm:w-full"
              color="primary"
              href="/login"
              variant="flat"
              onPress={logout}
            >
              Cerrar sesión
            </Button>
          </NavbarItem>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <NavbarItem>
          <SignInButton
            isOpen={signInOpen}
            onOpen={signOnOpen}
            onOpenChange={signInOpenChange}
            onSwitchModal={handleSwitchModal}
          />
        </NavbarItem>
        <NavbarItem>
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

  return (
    <Fragment>
      {actions}
      <NavbarItem className="hidden md:flex">
        <Cart />
      </NavbarItem>
    </Fragment>
  );
}
