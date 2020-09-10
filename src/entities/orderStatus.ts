import { PrimaryGeneratedColumn, Column, ManyToMany, Entity } from "typeorm";
import { Order } from "./order";

@Entity()
export class OrderStatus {
 
    static create(orderStatusData: OrderStatus): OrderStatus | PromiseLike<OrderStatus> {
        throw new Error("Method not implemented.");
  }

  @PrimaryGeneratedColumn('uuid')
  id: number;



  @ManyToMany(() => Order, (order :Order) => order.orderStatus)
  order: Order ;

  //@ManyToMany(() => Order, (order :Order) => order.currentStatus)
  //order: Order ;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
  
}