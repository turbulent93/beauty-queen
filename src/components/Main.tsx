import { FC } from "react";
import { Container } from "./Container";

export const Main: FC = () => {
    return (
        <div className="w-full h-[calc(100vh-64px)] bg-cover bg-[url('/main-photo.jpg')]">
				<div className='bg-black/50 h-full pt-64'>
				<Container>
					<div className='text-white text-center opacity-95'>
						<h1 className="text-[96px]">
							Королева красоты
						</h1>
						<span className="text-[40px]">
							Лучший салон в мире 
						</span>
					</div>
				</Container>
				</div>
			</div>
    )
}