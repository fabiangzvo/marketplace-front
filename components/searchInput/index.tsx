import { useCallback, type JSX } from "react";
import { Input, InputProps } from "@heroui/input";
import { SearchIcon } from "lucide-react";

interface SearchInputProps {
  variant?: InputProps["variant"];
  handleSearch: (value: string) => Promise<void> | void;
  placeholder?: string;
}

function SearchInput({
  variant,
  handleSearch,
  placeholder = "Buscar...",
}: SearchInputProps): JSX.Element {
  const handleKeyDown = useCallback(
    async (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== "Enter") return;

      event.preventDefault();
      await handleSearch(event.currentTarget.value);
    },
    [handleSearch],
  );

  return (
    <Input
      isClearable
      aria-label="Search"
      classNames={{
        inputWrapper:
          "dark:bg-opacity-10 hover:bg-opacity-20 dark:group-data-[focus=true]:bg-opacity-10 dark:group-data-[hover=true]:bg-opacity-30 group-data-[focus=true]:border-default-500",
        input: "text-sm",
        clearButton: "text-default-600",
      }}
      labelPlacement="outside"
      placeholder={placeholder}
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      variant={variant}
      onClear={async () => await handleSearch("")}
      onKeyDown={handleKeyDown}
    />
  );
}

export default SearchInput;
