"use client";

import { JSX, useCallback, useMemo, useReducer } from "react";
import useInfiniteSWR from "swr/infinite";
import { Spinner } from "@heroui/spinner";

import { SearchInfiniteState } from "../productTable/types";

import { ProductCard } from "./components/card";
import { SearchBar } from "./components/searchBar";

import { useIntersection } from "@/hooks/intersectionObserver";
import { PaginateResult } from "@/types/pagination";
import { Product } from "@/types/product";
import { reducer } from "@/utils/reducer";
import axios from "@/lib/axios";

async function fetcher({
  ...params
}: SearchInfiniteState): Promise<PaginateResult<Product>> {
  const paramsUrl = new URLSearchParams(params as Record<string, any>);

  if (params.maxPrice === 0) paramsUrl.delete("maxPrice");
  if (params.minPrice === 0) paramsUrl.delete("minPrice");

  const response = await axios.get(`/products?${paramsUrl.toString()}`);

  if (response.status !== 200)
    throw new Error("No se pudo obtener los productos");

  return response.data;
}

export function ProductList(): JSX.Element {
  const [state, dispatch] = useReducer(reducer<SearchInfiniteState>, {
    page: 1,
    search: "",
  });

  const { data, isLoading, size, setSize, isValidating } = useInfiniteSWR(
    (size: number, previousPageData: PaginateResult<Product>) => {
      if (previousPageData && previousPageData.meta.page < size) return;

      return { ...state, page: size + 1 };
    },
    fetcher,
    {
      fallbackData: [
        {
          data: [],
          meta: { limit: 0, total: 0, page: 0, totalPages: 0 },
        },
      ],
    },
  );

  const { totalPages } = useMemo(
    () => data?.at(-1)?.meta || { totalPages: 1 },
    [data],
  );

  const handleLoadMore = useCallback(() => {
    if (!isLoading && totalPages > size && !isValidating) {
      setSize((prevSize) => prevSize + 1);
    }
  }, [isLoading, size, totalPages, isValidating]);

  const [ref] = useIntersection<HTMLDivElement>(handleLoadMore);

  return (
    <div className="w-full">
      <SearchBar dispatch={dispatch} />
      <div className="grid text-center h-full gap-x-8 gap-y-10 justify-items-center grid-cols-3 max-xl:grid-cols-2 max-sm:grid-cols-1 relative">
        {data
          ?.map((response: PaginateResult<Product>) => response.data)
          ?.flat()
          ?.map((product: Product) => (
            <ProductCard key={product.id} {...product} />
          ))}

        {(isLoading || (!isLoading && size < totalPages)) && (
          <div ref={ref} className="col-span-full">
            <Spinner className="h-full" />
          </div>
        )}

        {size >= totalPages && !isLoading && (
          <div className="col-span-full text-center text-gray-500 text-lg">
            No hay más productos para mostrar
          </div>
        )}
      </div>
    </div>
  );
}
