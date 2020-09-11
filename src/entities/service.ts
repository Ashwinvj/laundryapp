import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { SubService } from "./subService";
import { ServiceProvider } from "./serviceProvider";
import { UpdateDate } from "./updateTime";



@Entity()
export class Service  extends UpdateDate{

    static create(serviceData: Service): Service | PromiseLike<Service> {
        throw new Error("Method not implemented.");
      }
      save() {
        throw new Error("Method not implemented.");
      }
    

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: number;

    @Column()
    iconName: string;

    @Column()
    description: string;

    @Column()
    active: true;

    @Column()
    isRetired: boolean = false;

    @OneToMany(() => SubService, (subService :SubService) => subService.service)
    subService: SubService ;

    @ManyToOne(() => ServiceProvider, (serviceProvider: ServiceProvider) => serviceProvider.service)
    serviceProvider: ServiceProvider;

}
