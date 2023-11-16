import { useDebounce } from "@/hooks/useDebounce"
import { IOption } from "@/interfaces/option.interface"
import { Button } from "@/ui/Button"
import clsx from "clsx"
import { useState, FC } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { Error } from "../../Error"
import { Loader } from "../../Loader"
import { Search } from "../../Search"
import { Field } from "../Field"

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
    onChange: (value?: number) => void
}

type ISelectProps = {
    label?: string
    placeholder?: string
    onSearch: (search?: string) => {data?: IOption[], isLoading: boolean, isError: boolean}
    disableSearch?: boolean
    className?: string
    error?: boolean
} & (SingleSelectProps | MultipleSelectProps)

export const SearchSelect: FC<ISelectProps> = ({
    label, multiple, value, onSearch, onChange, disableSearch, className, placeholder, error
}) => {
    const [isShow, setIsShow] = useState(false)
    const [search, setSearch] = useState("")
    const debounce = useDebounce(search)
    const {data: options, isLoading, isError} = onSearch(debounce)

    const selectOption = (option: IOption) => {
        if(multiple) {
            if(value.includes(option.value)) {
                onChange(value?.filter(v => v != option.value))
            } else if (value) {
                onChange([...value, option.value])
            } else {
                onChange([])
            }
        } else {
            if (option.value !== value) {
                onChange(option.value)
            } else {
                onChange(undefined)
            }
        }
        if(!multiple) setIsShow(false)
    }

    const clearOptions = (e: any) => {
        if(multiple) {
            onChange([])
        } else {
            onChange(undefined)
        }
        e.stopPropagation()
    }

    const clearOption = (e: any, v: IOption) => {
        selectOption(v)
        e.stopPropagation()        
    }

    const compareOptions = (o: IOption) => {
        if(multiple) {
            return value.includes(o.value)
        }
        return value == o.value
    }

    return (
        <div 
            className={clsx("relative", className)}
            tabIndex={0}
            onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                    setIsShow(false)
                }
            }}
        >
            <Field label={label} error={error}>
                <div className="flex justify-between items-center" onClick={() => setIsShow(!isShow)}>
                    {
                        multiple && value && value?.length > 0 ?
                            options?.filter(option => value.includes(option.value))?.map(v => (
                                <Button 
                                    className="border"
                                    key={v.value}
                                    onClick={e => {
                                        clearOption(e, v)
                                        e?.preventDefault()
                                    }}>
                                    {
                                        v.label
                                    }
                                </Button>
                            )) :
                            !multiple && value ?
                                <span className="truncate">
                                    {
                                        options?.find(option => option.value == value)?.label
                                    }
                                </span> :
                                <span className="text-gray-400">
                                    {placeholder}
                                </span>
                    }
                    <div>
                        <AiOutlineClose onClick={e => clearOptions(e)} className="cursor-pointer text-gray-500" />
                    </div>
                </div>
            </Field>
            <div className={clsx(
                "absolute bg-slate-100 w-full top-[calc(100%+.25em)] rounded-sm z-10 block border",
                !isShow && "hidden"
            )}>
                {
                    !disableSearch && (
                        <Search search={search} setSearch={setSearch} placeholder={placeholder} />
                    )
                }
                {
                    isError ? <Error className="mb-8"/> :
                    isLoading ? <Loader className="mb-8"/> :
                    options?.length == 0 && search.length > 0 ? <div className="p-4">Совпадений нет</div> :
                    options?.length == 0 && search.length == 0 ? <div className="p-4">Нет данных</div> :
                    <ul>
                        {
                            options?.map(o => (
                                <li 
                                    key={o.value}
                                    className={clsx(
                                        "px-3 py-1 text-gray-500 hover:bg-gray-300 cursor-pointer",
                                        compareOptions(o) && "bg-gray-300"
                                    )}
                                    onClick={e => {
                                        selectOption(o)
                                        if(multiple) e.stopPropagation()
                                    }}>
                                    {o.label}
                                </li>
                            )) 
                        }
                    </ul>
                }
            </div>
        </div>
    )
}