import { JSX } from "react";
import { Button } from "@heroui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/session";

export default async function DashboardPage(): Promise<JSX.Element> {
  const session = await getSession();

  if (!session) redirect("/");

  return (
    <div className="min-h-[70vh]">
      <div className="flex justify-between">
        <h1 className="text-lg font-bold mb-6">
          Hola {session?.user.name ?? session?.user?.email ?? "👋"}
        </h1>
        <Button as={Link} color="primary" href="/product/create">
          Crear Producto
        </Button>
      </div>
    </div>
  );
}
