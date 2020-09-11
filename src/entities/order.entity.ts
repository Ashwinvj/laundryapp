import { Entity, PrimaryGeneratedColumn, ManyToMany, Column, ManyToOne } from "typeorm";
import { User } from "./User.entity";
import { SubService } from "./subService.entity";
import { OrderStatus } from "./orderStatus.entity";
import { Payment } from "./payment.entity";
import { UpdateDate } from "./updateTime.entity";

@Entity()
export class Order extends UpdateDate {

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

    @Column()
    isRetired: boolean = false;

    @ManyToOne(() => User, (user :User) => user.order)
    user: User[] ;

    @ManyToOne(() => SubService, (subService :SubService) => subService.order)
    subService: SubService[];

    @ManyToOne(() => Payment, (payment :Payment) => payment.order)
    payment: Payment[] ;

    @ManyToMany(() =>OrderStatus, (orderStatus :OrderStatus) => orderStatus.order)
    orderStatus: OrderStatus[];

    //@ManyToMany(() => User, (usere :User) => usere.order)
    //currentStatus: User ;
}