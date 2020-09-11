import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, OneToMany } from "typeorm";
import User from "./User";
import { ServiceProvider } from "./serviceProvider";
import { OrderStatus } from "./orderStatus";
import { Order } from "./order";
import { UpdateDate } from "./updateTime";

@Entity()
export class Payment extends UpdateDate {
  serviceProvider: any;
  user: any;

    static create(productDetailData: Payment): Payment | PromiseLike<Payment> {
        throw new Error("Method not implemented.");
      }
      save() {
        throw new Error("Method not implemented.");
      }
    

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    orderId: string;

    @Column()
    invoiceId: string;

    @Column()
    cost: string;

    @Column()
    tax: string;

    @Column()
    totalCost: string;

    @Column()
    status: OrderStatus;

    @Column()
    isRetired: boolean = false;

    @ManyToOne(() => User, (user :User) => user.payment)
    paidBy : User ;

    @OneToMany(() => Order, (order :Order) => order.payment)
    order : Order ;

    @ManyToOne(() => ServiceProvider, (serviceProvider :ServiceProvider) => serviceProvider.payment)
    paidTo: ServiceProvider ;


    
/*
    @ManyToMany(() => User, (user :User) => user.order)
    user: User ; 
    */

}