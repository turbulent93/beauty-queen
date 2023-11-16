import { Modal } from "@/components/Modal";
import { FC, PropsWithChildren } from "react";
import { Button } from "../Button";
import { Error } from "../Error";
import { Loader } from "../Loader";
import { Th } from "./Th";

interface TableProps {
    isLoading?: boolean
    isError?: boolean
    colNames?: string[]
    selectedId?: number
    setSelectedId?: (id?: number) => void
    modalHandler?: (id: number) => void
}

export const Table: FC<PropsWithChildren<TableProps>> = ({children, isLoading, isError, colNames, selectedId, setSelectedId, modalHandler}) => {
    if(isLoading) {
        return <Loader />
    }

    if(isError) {
        return <Error />
    }

    return (
        <>
            <div className="overflow-auto scrollbar scrollbar-gray pb-1 mx-4">
                <table 
                    className="whitespace-nowrap border rounded-md mx-auto w-full"
                >
                    {
                        colNames && (
                            <thead className="bg-gray-100">
                                <tr>
                                    {
                                        colNames.map(name => (
                                            <Th key={name}>
                                                {name}
                                            </Th>
                                        ))                            
                                    }
                                </tr>
                            </thead>
                        )
                    }
                    <tbody className="divide-y">
                        {children}
                    </tbody>
                </table>
                
            </div>
            {
                (!children || (children as React.ReactNode[]).length == 0) && (
                    <div className="text-center mt-4">Нет данных</div>
                )
            }
            <Modal 
                isOpen={!!selectedId} 
                setIsOpen={() => setSelectedId && setSelectedId(undefined)}
            >
                <div className="w-[400px] mx-auto">
                    <p className="text-gray-600 text-center">
                        Удалить?
                    </p>
                    <div className="mt-6 flex">
                        <Button 
                            className="mr-3 w-full"
                            theme="red"
                            onClick={() => {
                                modalHandler && selectedId && modalHandler(selectedId)
                                setSelectedId && setSelectedId(undefined)
                            }}
                        >
                            Удалить
                        </Button>
                        <Button className="w-full" onClick={() => setSelectedId && setSelectedId(undefined)}>
                            Отмена
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}