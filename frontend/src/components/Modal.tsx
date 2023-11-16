import clsx from "clsx";
import { FC, PropsWithChildren } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface IModalProps {
    isOpen: boolean
    setIsOpen: (value?: boolean) => void
}

export const Modal: FC<PropsWithChildren<IModalProps>> = ({children, isOpen, setIsOpen}) => {
    return (
        <div 
            className={clsx(
                "absolute bg-gray-300/50 backdrop-blur-md top-0 right-0 left-0 bottom-0 z-50", 
                !isOpen && "hidden"
            )}
            onClick={() => setIsOpen(!isOpen)}
        >
            {/* <div className="max-w-full"> */}
                <div className="my-6 mr-6 justify-end flex cursor-pointer">
                    <AiOutlineClose size={22} onClick={() => setIsOpen(!isOpen)}/>
                </div>
                <div onClick={e => e.stopPropagation()}>
                    {children}
                </div>
            {/* </div> */}
        </div>
    )
}