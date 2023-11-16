import { IMainScreenSettings } from "@/services/settings/settings.interface";
import { FC } from "react";
import { Container } from "./Container";

interface IMainProps {
	settings: IMainScreenSettings
}

export const Main: FC<IMainProps> = ({settings: {mainPhoto, mainTitle, mainDescription}}) => {

	if(!mainTitle && !mainDescription && !mainPhoto) {
		return null
	}

    return (
        <div className="h-80 w-full md:h-[480px] lg:h-[calc(100vh-64px)] bg-cover bg-center" style={{backgroundImage: `url('${mainPhoto}`}}>
			<div className='bg-black/50 h-full pt-28 md:pt-40 lg:pt-52'>
				<Container>
					<div className='text-white text-center opacity-95'>
						<h1 className="text-[28px] md:text-[42px] lg:text-[64px]">
							{
								mainTitle
							}
						</h1>
						<span className="text-[16px] md:text-[20px] lg:text-[32px]">
							{
								mainDescription
							}
						</span>
					</div>
				</Container>
			</div>
		</div>
    )
}