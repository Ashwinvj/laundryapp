import { PrimaryGeneratedColumn, Column, ManyToMany, Entity } from "typeorm";
import { Order } from "./order";
import { UpdateDate } from "./updateTime";

@Entity()
export class OrderStatus extends UpdateDate{
 
    static create(orderStatusData: OrderStatus): OrderStatus | PromiseLike<OrderStatus> {
        throw new Error("Method not implemented.");
  }

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  isRetired: boolean = false;

  @ManyToMany(() => Order, (order :Order) => order.orderStatus)
  order: Order ;

  @Column()
  status: string;

  @Column()
  time : string;
  
}