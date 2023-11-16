import Link from "next/link";
import { FC } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { ImBin } from "react-icons/im";
import { Button } from "../Button";
import { Td } from "./Td";

interface ActionButtonsProps {
    deleteHandler: () => void
    updateUrl: string
    removeButtonDisabed?: boolean
}

export const ActionButtons: FC<ActionButtonsProps> = ({updateUrl, deleteHandler, removeButtonDisabed}) => {
    return (
        <Td className="max-w-[200px]">
            <div className="flex justify-center">
                <Button theme="gray" className="mr-1">
                    <Link href={updateUrl}>
                        <div className="p-1">
                            <BsPencilSquare size={14}/>
                        </div>
                    </Link>
                </Button>
                <Button theme="red" onClick={deleteHandler} disabled={removeButtonDisabed}>
                    <div className="p-1">
                        <ImBin size={14}/>
                    </div>
                </Button>
            </div>
        </Td>
    )
}