import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { Service } from "./service";
import { Order } from "./order";
import { UpdateDate } from "./updateTime";

@Entity()
export class SubService extends UpdateDate{
    static create(productData: SubService): SubService | PromiseLike<SubService> {
        throw new Error("Method not implemented.");
      }
      save() {
        throw new Error("Method not implemented.");
      }
    

    @PrimaryGeneratedColumn('uuid')
    id : number;

    @Column()
    title : string;

    @Column()
    description : string;

    @Column()
    cost : number;

    @Column()
    imageURL : URL;

    @Column()
    active : true;

    @Column()
    isRetired: boolean = false;

    @ManyToOne(() => Service, (service :Service) => service.subService)
    service: Service;

    @OneToMany(() => Order, (order :Order) => order.subService)
    order: Order;


}
