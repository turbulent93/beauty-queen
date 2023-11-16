import { IService } from "@/services/service/service.interface";
import { Button } from "@/ui/Button";
import { FC } from "react";

interface ServiceSelectProps {
    services?: IService[]
    setSelectedService: (value: number) => void
    selectedService?: number
}

export const ServiceSelect: FC<ServiceSelectProps> = ({services, setSelectedService, selectedService}) => {
    return (
        <div className="flex gap-3 flex-wrap">
            {
                services?.map(service => (
                    <Button 
                        onClick={() => setSelectedService(service.id)}
                        theme={service.id == selectedService ? "gray" : "light-gray"}
                        key={service.id}
                    >
                        {service.name}
                    </Button>
                ))  
            }
        </div>
    )
}