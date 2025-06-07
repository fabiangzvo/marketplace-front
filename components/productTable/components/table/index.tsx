"use client";

import { JSX, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@heroui/table";
import { Spinner } from "@heroui/spinner";
import { Pagination } from "@heroui/pagination";

import EmptyContent from "../emptyContent";
import Actions from "../actions";

interface TableComponentProps {
  products: any[];
  hideOptions?: boolean;
  isLoading: boolean;
  totalPages: number;
  page: number;
  handlePage: (page: number) => void;
  refreshData: () => void;
  userRole: string;
}

function TableComponent(props: TableComponentProps): JSX.Element {
  const {
    products,
    isLoading,
    handlePage,
    page,
    totalPages,
    refreshData,
    userRole,
  } = props;

  const renderCell = useCallback(
    (product: any, columnKey: string | number) => {
      const cellValue = getKeyValue(product, columnKey);

      switch (columnKey) {
        case "actions":
          return (
            <Actions
              name={product.name}
              productId={product.id}
              refreshData={refreshData}
            />
          );
        case "seller":
          return cellValue.name ?? cellValue.email;
        case "price":
          const price = new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
          }).format(cellValue);

          return price;
        default:
          return cellValue;
      }
    },
    [refreshData],
  );

  return (
    <Table
      bottomContent={
        !isLoading &&
        products.length > 0 && (
          <div className="flex w-full justify-center">
            <Pagination
              showControls
              classNames={{
                item: "dark:bg-opacity-20 dark:[&[data-hover=true]]:bg-opacity-10",
                next: "dark:bg-opacity-20 dark:[&[data-hover=true]]:bg-opacity-10 dark:data-[disabled=true]:bg-opacity-60",
                prev: "dark:bg-opacity-20 dark:[&[data-hover=true]]:bg-opacity-10 dark:data-[disabled=true]:bg-opacity-60",
              }}
              page={page}
              total={totalPages}
              onChange={handlePage}
            />
          </div>
        )
      }
      classNames={{
        th: "bg-transparent text-foreground font-bold text-base",
      }}
      hideHeader={products.length <= 0}
      shadow="none"
    >
      <TableHeader
        columns={[
          { key: "name", label: "Nombre" },
          { key: "sku", label: "SKU" },
          { key: "price", label: "Precio (COP)" },
          { key: "quantity", label: "Cantidad" },
          userRole === "admin"
            ? { key: "seller", label: "Vendedor" }
            : { key: "actions", label: "Acciones" },
        ]}
      >
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        emptyContent={<EmptyContent />}
        isLoading={isLoading}
        items={products ?? []}
        loadingContent={<Spinner label="Cargando..." />}
      >
        {(item: any) => (
          <TableRow key={item?._id}>
            {(columnKey) => (
              <TableCell className="border-b dark:border-neutral-700">
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default TableComponent;
