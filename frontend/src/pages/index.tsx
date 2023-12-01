import { Container } from '@/components/Container'
import { EmployeeList } from '@/components/lists/EmployeeList'
import { Layout } from '@/components/Layout'
import { Main } from '@/components/Main'
import { PriceList } from '@/components/lists/PriceList'
import { PromoList } from '@/components/lists/PromoList'
import { Title } from '@/components/Title'
import { IEmployee } from '@/services/employee/employee.interface'
import { EmployeeService } from '@/services/employee/employee.service'
import { PromoService } from '@/services/promo/promo.service'
import { IService } from '@/services/service/service.interface'
import { ServiceService } from '@/services/service/service.service'
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { useRouter } from 'next/router'
import { SettingsService } from '@/services/settings/settings.service'
import { MetaService } from '@/services/meta/meta.service'

// const Home: NextPage = (
// 	{services, employees, promos, settings, meta
// }: InferGetStaticPropsType<typeof getStaticProps>) => {
const Home: NextPage = () => {
	const router = useRouter()

	const serviceHandler = (service: IService) => {
		router.push({pathname: "/appointment", query: {serviceId: service.id, duration: service.duration}})
	}

	const employeeHandler = (employee: IEmployee) => {
		router.push({pathname: "/appointment", query: {employeeId: employee.id}})
	}

	return (
		<Layout 
			title='Главная'
			// title={meta?.title || "No title"} 
			// description={meta?.description || "No description"}
			// favicon={settings?.favicon || "favicon"}
			// contactSettings={{
			// 	address: settings.address, 
			// 	mail: settings.male,
			// 	phone: settings.phone,
			// 	vk: settings.vk
			// }}
		>
			{/* <Main settings={{
				mainDescription: settings.mainDescription,
				mainPhoto: settings.mainPhoto,
				mainTitle: settings.mainTitle
			}}/> */}
			{/* <Container>
				{
					promos.length > 1 && (
						<>
							<Title>
								Специальные предложения
							</Title>
							<PromoList promos={promos} />
						</>
					)
				}
				{
					employees.length > 0 && (
						<>
							<Title>
								Мастера салона
							</Title>
							<EmployeeList 
								handler={employeeHandler} 
								employees={employees} 
								wrap="no-wrap" />
						</>
					)
				}
				{
					services.length > 0 && (
						<>
							<Title>
								Прайс-лист
							</Title>
							<PriceList handler={serviceHandler} services={services}/>
						</>
					)
				} */}
				{/* <Title>
					Галерея работ
				</Title>
				<PhotosList photos={photos} /> */}
			{/* </Container> */}
		</Layout>
	)
}

export default Home

// export const getStaticProps: GetStaticProps = async () => {
//     const services = await ServiceService.get()
//       	.then(res => res.data)

// 	// const photos = await GalleryService.getFavorites()
// 	// 	.then(res => res.data)

// 	const employees = await EmployeeService.get()
// 		.then(res => res.data)

// 	const promos = await PromoService.get()
// 		.then(res => res.data)

// 	const settings = await SettingsService.get()
// 		.then(res => res.data)

// 	const meta = await MetaService.get()
// 		.then(res => res.data)

// 	return {
// 		props: {
// 			services,
// 			// photos,
// 			employees,
// 			promos,
// 			settings,
// 			meta
// 		}
// 	}
// }