"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Square } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useRouter, useSearchParams } from "next/navigation"

interface ComboboxItem {
    value: string
    label: string
}

interface ComboboxGroup {
    department: string
    concepts: ComboboxItem[]
}

interface ComboboxProps {
    groups: ComboboxGroup[]
    placeholder: string
    emptyMessage: string
    className?: string
    onSelect?: (value: string) => void
}

export function FilterCombobox({
    groups,
    placeholder,
    emptyMessage,
    className,
    onSelect
}: ComboboxProps) {
    const [open, setOpen] = React.useState(false)
    const [selectedValues, setSelectedValues] = React.useState<string[]>([])
    const { replace } = useRouter()
    const searchParams = useSearchParams()

    React.useEffect(() => {
        const params = new URLSearchParams(searchParams)
        const concepts = params.get("concepts")
        if (concepts) {
            setSelectedValues(concepts.split(","))
        }
    }, [searchParams])

    React.useEffect(() => {
        const params = new URLSearchParams(searchParams)

        if (selectedValues.length > 0) {
            params.set("concepts", selectedValues.join(","))
        } else {
            params.delete("concepts");
        }

        replace(`/search?${params.toString()}`, {
            scroll: false
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedValues])

    React.useEffect(() => {
        const params = new URLSearchParams(searchParams)
        const concepts = params.get("concepts")
        if (!concepts) {
            setSelectedValues([])
        }
    }, [searchParams])


    const handleSelect = (currentValue: string) => {
        setSelectedValues(prev =>
            prev.includes(currentValue)
                ? prev.filter(v => v !== currentValue)
                : [...prev, currentValue]
        )
        if (onSelect) {
            onSelect(currentValue)
        }
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild className="w-full">
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn("w-full max-w-full justify-between capitalize", className)}
                >
                    <span className="truncate md:max-w-[180px]">{selectedValues.length > 0
                        ? `${selectedValues[0]}` + (selectedValues.length > 1 ? ` and ${selectedValues.length - 1} more` : "")
                        : placeholder}</span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} />
                    <CommandList>
                        <CommandEmpty>{emptyMessage}</CommandEmpty>
                        {groups.map((group) => (
                            <CommandGroup key={group.department} heading={group.department}>
                                {group.concepts.map((item) => (
                                    <CommandItem
                                        key={item.value}
                                        value={item.value}
                                        onSelect={handleSelect}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4 transition-opacity duration-300",
                                                selectedValues.includes(item.value) ? "opacity-100" : "hidden"
                                            )}
                                        />
                                        <Square
                                            className={cn(
                                                "mr-2 h-4 w-4 transition-opacity duration-300",
                                                selectedValues.includes(item.value) ? "hidden" : "opacity-100"
                                            )}
                                        />
                                        <span className="truncate">{item.label}</span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        ))}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}