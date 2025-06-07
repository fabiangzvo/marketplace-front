import { JSX } from "react";
import { Button } from "@heroui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/session";
import { ProductTable } from "@/components/productTable";

export default async function DashboardPage(): Promise<JSX.Element> {
  const session = await getSession();

  if (!session) redirect("/");

  return (
    <div className="min-h-[70vh]">
      <div className="flex justify-between max-md:flex-col max-md:mb-6">
        <h1 className="text-lg font-bold mb-6 max-md:text-center">
          Hola {session?.user.name ?? session?.user?.email ?? "👋"}
        </h1>
        {session?.user.role === "seller" && (
          <Button as={Link} color="primary" href="/products/create">
            Crear Producto
          </Button>
        )}
      </div>
      <ProductTable
        token={session?.user?.token!}
        userRole={session?.user.role!}
      />
    </div>
  );
}
