import { JSX } from "react";
import { Link } from "@heroui/link";

function EmptyContent(): JSX.Element {
  return (
    <p className="text-gray-500">
      No hay sopas de letras creadas por ti, puedes crear una ó&nbsp;
      <Link href="/explore">explorar</Link> las que la comunidad ha compartido.
    </p>
  );
}

export default EmptyContent;
