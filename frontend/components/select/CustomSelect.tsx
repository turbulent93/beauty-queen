import {extendVariants, Select, Selection, SelectItem} from "@nextui-org/react";
import { Controller, useFormContext } from "react-hook-form";

const CustomizedSelect = extendVariants(Select, {
    variants: {
        size: {
            // sm: "rounded-medium px-10 py-1"
            sm: {
                base: "rounded-medium",
            }
        },
    },
    defaultVariants: {
        size: "sm",
    }
});

type ItemType = {
    label: string,
    value: number,
}

type SelectProps = {
    items: ItemType[],
    label?: string,
    placeholder?: string,
    selectionMode?: "multiple" | "single"
    name: string
}

export default function CustomSelect({selectionMode = "single", ...props}: SelectProps) {
    const {control} = useFormContext();

    const onChangeHandler = (value: Selection, onChange: (...event: any) => void) => {
        if(selectionMode === "multiple") {
            onChange(Array.from(value))
        } else {
            onChange((value as Set<number>).values().next().value)
        }
    }

    return (
        <Controller
            control={control}
            name={props.name}
            defaultValue={selectionMode === "multiple" ? [] : undefined}
            render={({field}) => (
                <CustomizedSelect
                    {...props}
                    selectionMode={selectionMode}
                    selectedKeys={field.value}
                    onSelectionChange={(value) => onChangeHandler(value, field.onChange)}
                >
                    {
                        props.items.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                                {item.label}
                            </SelectItem>
                        ))
                    }
                </CustomizedSelect>
            )}
        />
    )
}