"use client";

import { type JSX } from "react";
import Image from "next/image";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenu,
} from "@heroui/navbar";
import NextLink from "next/link";

import { NavbarActions } from "./components/actions";
import { Cart } from "./components/cart";

import { ThemeSwitch } from "@/components/themeSwitch";

export function Navbar(): JSX.Element {
  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image alt="Logo" height={60} src="/logo.png" width={60} />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarActions />
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <Cart />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarActions />
      </NavbarMenu>
    </HeroUINavbar>
  );
}
