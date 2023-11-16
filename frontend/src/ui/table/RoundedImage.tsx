import { FC } from "react";
import { Td } from "./Td";

interface RoundedImageProps {
    src: string
}

export const RoundedImage: FC<RoundedImageProps> = ({src}) => {
    return (
        <Td className="w-20">
            <div className="w-14">
                <img 
                    className="h-14 w-14 object-cover rounded-full"
                    src={src}/>
            </div>
        </Td>
    )
}