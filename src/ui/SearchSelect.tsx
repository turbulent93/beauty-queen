import { useDebounce } from "@/hooks/useDebounce"
import { IOption } from "@/interfaces/option.interface"
import clsx from "clsx"
import { useState, FC, useEffect } from "react"
import { Control } from "react-hook-form"
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai"
import Placeholder from "react-select/dist/declarations/src/components/Placeholder"
import { Error } from "./Error"
import { Label } from "./Label"
import { Loader } from "./Loader"
import { Search } from "./Search"

type MultipleSelectProps = {
    multiple: true
    value: number[]
    defaultValue?: number[]
    onChange: (value: number[]) => void
}

type SingleSelectProps = {
    multiple?: false
    value?: number
    defaultValue?: number
    onChange: (value: number | undefined) => void
}

type ISelectProps = {
    label?: string
    placeholder?: string
    onSearch: (search?: string) => {data?: IOption[], isLoading: boolean, isError: boolean}
    disableSearch?: boolean
    className?: string
} & (SingleSelectProps | MultipleSelectProps)

export const SearchSelect: FC<ISelectProps> = ({label, multiple, value, onSearch, onChange, disableSearch, className, placeholder}) => {
    const [isShow, setIsShow] = useState(false)
    const [search, setSearch] = useState("")
    const debounce = useDebounce(search)
    const {data: options, isLoading, isError} = onSearch(debounce)
    const [result, setResult] = useState<IOption | undefined | IOption[]>(
        multiple ? 
            value && options ? 
            [...(options?.filter(x => value.includes(x.value)))] : 
                [] as IOption[] : 
                value ? options?.find(x => x.value == value) : undefined
        ) 


    useEffect(() => {
        if(value != undefined && !multiple) {
            setResult(options?.find(x => x.value == value))
        } else if(multiple && value?.length) {
            setResult([...(options?.filter(x => value.includes(x.value)) || [])])
        } else if(multiple) {
            onChange([])
        }
    }, [options])

    const selectOption = (option: IOption) => {
        if(multiple) {
            if((result as IOption[]).includes(option)) {
                setResult((result as IOption[]).filter(v => v.value != option.value))
                onChange((value as number[])?.filter(v => v != option.value))
            } else if (value) {
                setResult([...(result as IOption[]), option])
                onChange([...(value as number[]), option.value])
            } else {
                onChange([])
            }
        } else if (option !== result) {
            onChange(option.value)
            setResult(option) 
        }
        if(!multiple) setIsShow(false)
    }

    const clearOptions = (e: any) => {
        if(multiple) {
            onChange([])
            setResult([])
        } else {
            onChange(undefined)
            setResult(undefined)
        }
        e.stopPropagation()
    }

    const clearOption = (e: any, v: IOption) => {
        selectOption(v)
        e.stopPropagation()        
    }

    const compareOptions = (o: IOption) => {
        if(multiple) {
            return (result as IOption[])?.find(x => x.label == o.label && x.value == o.value)
        }
        return (result as IOption)?.label == o.label && (result as IOption).value == o.value
    }

    return (
        <div 
            className={clsx("relative", label && "mb-2", className)}
            tabIndex={0}
            onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                    setIsShow(false)
                }
              }}>
            {
                label && (
                    <Label className="mb-2">
                        {label}
                    </Label>
                )
            }
            <div 
                onClick={() => setIsShow(!isShow)}
                className={"bg-slate-100 py-1 px-3 rounded-sm select-none border flex justify-between items-center min-h-[2em]"}>
                <span className="flex gap-2 flex-wrap">
                    {
                        (result as IOption[])?.length || (result as IOption)?.label ?
                        multiple ?
                        (result as IOption[])?.map(v => (
                                <button 
                                    key={v.value}
                                    className="flex gap-1 bg-gray-500 rounded-sm items-center px-2 py-1 text-white hover:bg-red-400"
                                    onClick={e => {
                                        clearOption(e, v)
                                        e.preventDefault()
                                    }}>
                                    {v.label}
                                    <AiOutlineClose className="text-[12px]"/>
                                </button>
                            ))
                        :
                        (result as IOption)?.label :
                        <span className="text-gray-500">
                            {placeholder}
                        </span>
                    }
                </span>
                <div>
                    <AiOutlineClose onClick={e => clearOptions(e)} className="cursor-pointer text-[20px] w-[30px]" />
                </div>
            </div>
            <ul className={clsx(
                "absolute bg-slate-100 w-full top-[calc(100%+.25em)] rounded-sm z-10 block",
                { "hidden": !isShow }
            )}>
                {
                    !disableSearch && (
                        <Search search={search} setSearch={setSearch} placeholder={placeholder}/>
                    )
                }
                {
                    isError ? <Error className="mt-3"/> :
                    isLoading ? <Loader className="justify-center m-4"/> :
                    <div className="px-4 py-2">Совпадений нет</div> &&
                        options?.map(o => (
                        <li 
                            key={o.value}
                            className={clsx("px-3 py-1 hover:bg-red-400 hover:text-white cursor-pointer",
                            {
                                "bg-red-500 text-white": compareOptions(o)
                            })}
                            onClick={e => {
                                selectOption(o)
                                if(multiple) e.stopPropagation()
                            }}>
                            {o.label}
                        </li>
                    )) 
                }
            </ul>
        </div>
    )
}