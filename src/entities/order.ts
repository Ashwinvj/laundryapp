import { Entity, PrimaryColumn, PrimaryGeneratedColumn, ManyToMany, Column } from "typeorm";
import { User } from "./User";
import { SubService } from "./subService";
import { OrderStatus } from "./orderStatus";

@Entity()
export class Order {

    static create(productDetailData: Order): Order | PromiseLike<Order> {
        throw new Error("Method not implemented.");
      }
      save() {
        throw new Error("Method not implemented.");
      }
    

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    unit: string;

    @Column()
     cost: string;

    @Column()
    totalCost: string;

    @Column()
    pickupAddress: string;

    @Column()
    pickupTimeFrom: string;

    @Column()
    pickupTimeTo: string;

    @Column()
    deliveryAddress: string;

    @Column()
    deliveryTimeFrom: string;

    @Column()
    deliveryTimeTo: string;

    @ManyToMany(() => User, (user :User) => user.order)
    user: User ;

    @ManyToMany(() => SubService, (subService :SubService) => subService.order)
    subService: SubService ;

    @ManyToMany(() => Payment, (usere :User) => usere.order)
    payment: User ;

    @ManyToMany(() =>OrderStatus, (orderStatus :OrderStatus) => orderStatus.order)
    orderStatus: OrderStatus;

    //@ManyToMany(() => User, (usere :User) => usere.order)
    //currentStatus: User ;
}