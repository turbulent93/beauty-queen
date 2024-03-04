import {extendVariants, Button} from "@nextui-org/react";

export const CustomButton = extendVariants(Button, {
    variants: {
        color: {
            red: "text-white bg-red-400",
            gray: "bg-default-100"
        },
        isDisabled: {
            true: "opacity-50",
        },
        size: {
            xl: "rounded-medium px-10 py-1",
            sm: "rounded-small"
        },
    },
    defaultVariants: {
        color: "red",
        size: "xl",
    },
});