import { Container } from '@/components/Container'
import { EmployeeList } from '@/components/EmployeeList'
import { PhotosList } from '@/components/gallery/PhotosList'
import { Layout } from '@/components/Layout'
import { Main } from '@/components/Main'
import { PriceList } from '@/components/PriceList'
import { PromoList } from '@/components/PromoList'
import { Title } from '@/components/Title'
import { IEmployeeDto } from '@/services/employee/employee.interface'
import { EmployeeService } from '@/services/employee/employee.service'
import { IPhoto } from '@/services/gallery/gallery.interface'
import { GalleryService } from '@/services/gallery/gallery.service'
import { PromoService } from '@/services/promo/promo.service'
import { IService } from '@/services/service/service.interface'
import { ServiceService } from '@/services/service/service.service'
import axios, { AxiosError } from 'axios'
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { FaCrown } from 'react-icons/fa'

const Home: NextPage = ({services, photos, employees, promos}: InferGetStaticPropsType<typeof getStaticProps>) => {
	const router = useRouter()

	const serviceHandler = (service: IService) => {
		router.push({pathname: "/appointment", query: {serviceId: service.id, duration: service.duration}})
	}

	const employeeHandler = (employee: IEmployeeDto) => {
		router.push({pathname: "/appointment", query: {employeeId: employee.id}})
	}

	return (
		<Layout title='Home' description="Home">
			<Main/>
			<Container>
				<Title>
					Специальные предложения
				</Title>
				<PromoList promos={promos} />
				<Title>
					Прайс-лист
				</Title>
				<PriceList handler={serviceHandler} services={services}/>
				<Title>
					Мастера салона
				</Title>
				<EmployeeList handler={employeeHandler} employees={employees} wrap="no-wrap"/>
				<Title>
					Галерея работ
				</Title>
				<PhotosList photos={photos} />
			</Container>
		</Layout>
	)
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
    const services = await ServiceService.get()
      	.then(res => res.data)

	const photos = await GalleryService.getFavorites()
		.then(res => res.data)

	const employees = await EmployeeService.get()
		.then(res => res.data)

	const promos = await PromoService.get()
		.then(res => res.data)

	return {
		props: {
			services,
			photos,
			employees,
			promos
		}
	}
}