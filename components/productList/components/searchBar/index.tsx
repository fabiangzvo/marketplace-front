import {
  ActionDispatch,
  FormEvent,
  JSX,
  useCallback,
  useRef,
  useState,
} from "react";
import { FunnelX, ListFilterPlus } from "lucide-react";
import { Button } from "@heroui/button";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Input } from "@heroui/input";
import { Form } from "@heroui/form";
import { addToast } from "@heroui/toast";
import { Card, CardBody } from "@heroui/card";

import SearchInput from "@/components/searchInput";
import { SearchInfiniteState } from "@/components/productTable/types";
import { Action } from "@/utils/reducer";

export interface SearchBarProps {
  dispatch: ActionDispatch<[action: Action<SearchInfiniteState>]>;
}

export function SearchBar({ dispatch }: SearchBarProps): JSX.Element {
  const [showFilters, setShowFilters] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleReset = useCallback(() => {
    if (formRef.current) {
      formRef.current.reset();
      dispatch({
        type: "SET",
        payload: {
          key: "minPrice",
          value: 0,
        },
      });

      dispatch({
        type: "SET",
        payload: {
          key: "maxPrice",
          value: 0,
        },
      });
    }
  }, []);

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const minPrice = Number(formData.get("minPrice"));
      const maxPrice = Number(formData.get("maxPrice"));

      if (maxPrice > 0 && minPrice > maxPrice) {
        addToast({
          title: "Filtro mal aplicado",
          description: "El precio mínimo no puede ser mayor al precio máximo",
          variant: "bordered",
          color: "warning",
        });

        return;
      }

      dispatch({
        type: "SET",
        payload: {
          key: "minPrice",
          value: minPrice || 0,
        },
      });

      dispatch({
        type: "SET",
        payload: {
          key: "maxPrice",
          value: maxPrice || 0,
        },
      });
    },
    [dispatch]
  );

  return (
    <div className="mb-8 flex flex-col">
      <div className="flex gap-2 w-full">
        <SearchInput
          handleSearch={(value) =>
            dispatch({ type: "SET", payload: { key: "search", value } })
          }
          variant="bordered"
        />
        <Button
          isIconOnly
          color="primary"
          variant="solid"
          onPress={() =>
            setShowFilters((prev) => (prev === "filters" ? "" : "filters"))
          }
        >
          <ListFilterPlus />
        </Button>
      </div>
      <Accordion selectedKeys={[showFilters]}>
        <AccordionItem
          key="filters"
          classNames={{
            trigger: "hidden",
            base: "mt-4",
            content: "flex flex-col gap-5",
          }}
        >
          <Card shadow="sm">
            <CardBody>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Filtros de Búsqueda</h3>
                <Button
                  isIconOnly
                  color="danger"
                  variant="light"
                  onPress={handleReset}
                >
                  <FunnelX />
                </Button>
              </div>
              <Form
                ref={formRef}
                className="flex flex-col w-full"
                onSubmit={onSubmit}
              >
                <span className="mb-2">Rango de precio</span>
                <div className="flex gap-6 w-full max-md:flex-col max-md:gap-4">
                  <Input
                    name="minPrice"
                    placeholder="Precio mínimo"
                    type="number"
                    variant="bordered"
                  />
                  <Input
                    name="maxPrice"
                    placeholder="Precio máximo"
                    type="number"
                    variant="bordered"
                  />
                </div>
                <div className="flex mt-4 items-center justify-evenly w-full">
                  <Button
                    className="w-1/5 max-md:w-full"
                    color="primary"
                    type="submit"
                    variant="solid"
                  >
                    Aplicar filtros
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
