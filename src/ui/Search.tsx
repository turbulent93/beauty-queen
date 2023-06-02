import clsx from "clsx";
import { FC } from "react";
import { AiOutlineSearch } from "react-icons/ai";

interface ISearchProps {
    search: string
    setSearch: (search: string) => void
    className?: string
    placeholder?: string
}

export const Search: FC<ISearchProps> = ({search, setSearch, className, placeholder}) => {
    return (
        <div className={clsx("flex items-center cursor-pointer mx-3 my-2", className)}
                onClick={e => e.stopPropagation()}>
            <AiOutlineSearch className="mr-2 text-gray-400 text-[20px]"/>
            <input 
                className="w-full bg-inherit outline-none border-gray-300 border-b py-1"
                placeholder={placeholder}
                value={search}
                onChange={e => setSearch(e.target.value)} />
        </div>
    )
}