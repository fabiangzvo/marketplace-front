"use client";

import { JSX, useReducer, useCallback } from "react";
import useSWR from "swr";
import { Card, CardHeader, CardBody } from "@heroui/card";

import { ProductTableProps, SearchState } from "./types";
import Table from "./components/table";

import { Product } from "@/types/product";
import { reducer } from "@/utils/reducer";
import SearchInput from "@/components/searchInput";
import { PaginateResult } from "@/types/pagination";

async function fetcher({
  token,
  ...params
}: SearchState & { token: string }): Promise<PaginateResult<Product>> {
  const paramsUrl = new URLSearchParams(params as Record<string, any>);

  const response = await fetch(
    `http://localhost:4000/products?${paramsUrl.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) throw new Error("No se pudo obtener los productos");

  return response.json();
}

export function ProductTable({
  token,
  userRole,
}: ProductTableProps): JSX.Element {
  const [state, dispatch] = useReducer(reducer<SearchState>, {
    page: 1,
    search: "",
  });

  const {
    data: {
      data,
      meta: { totalPages },
    },
    isLoading,
    mutate,
  } = useSWR({ ...state, token }, fetcher, {
    fallbackData: {
      data: [],
      meta: { limit: 0, total: 0, page: 0, totalPages: 0 },
    },
  });

  const handleSubmit = useCallback((value: string) => {
    dispatch({ type: "SET", payload: { key: "search", value } });
    dispatch({ type: "SET", payload: { key: "page", value: 1 } });
  }, []);

  const handlePage = useCallback((value: number) => {
    dispatch({ type: "SET", payload: { key: "page", value } });
  }, []);

  return (
    <Card className="mb-8">
      <CardHeader className="grid grid-cols-2 px-6 pt-6 max-md:grid-cols-1 max-md:gap-y-6">
        <h2 className="text-lg font-semibold max-md:text-center">
          Tus productos
        </h2>
        <SearchInput
          handleSearch={handleSubmit}
          placeholder={
            userRole === "admin"
              ? "Buscar por nombre, sku  ó vendedor"
              : "Buscar por nombre ó sku"
          }
          variant="bordered"
        />
      </CardHeader>
      <CardBody>
        <Table
          handlePage={handlePage}
          isLoading={isLoading}
          page={state.page}
          products={data}
          refreshData={mutate}
          totalPages={totalPages}
          userRole={userRole}
        />
      </CardBody>
    </Card>
  );
}
