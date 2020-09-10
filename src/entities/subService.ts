import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from "typeorm";
import { User } from "./User";
import { Service } from "./service";
import { Order } from "./order";

@Entity()
export class SubService{
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

    @ManyToOne(() => Service, (service :Service) => service.subService)
    service: Service;

    @ManyToMany(() => Order, (order :Order) => order.subService)
    order: Order;


}
