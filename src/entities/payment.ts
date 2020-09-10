import { PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Payment {

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
    status: string;

    @ManyToMany(() => User, (user :User) => user.order)
    Paidby: User ;

    @ManyToMany(() => User, (user :User) => user.order)
    user: User ;

}