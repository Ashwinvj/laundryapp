import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";
import User from "./User";
import { ServiceProvider } from "./serviceProvider";
import { OrderStatus } from "./orderStatus";

@Entity()
export class Payment {
  serviceProvider: any;
  user: any;
  order: any;

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

    @ManyToOne(() => User, (user :User) => user.payment)
    paidBy : User ;

    @ManyToOne(() => ServiceProvider, (serviceProvider :ServiceProvider) => serviceProvider.payment)
    paidTo: ServiceProvider ;


    
/*
    @ManyToMany(() => User, (user :User) => user.order)
    user: User ; 
    */

}