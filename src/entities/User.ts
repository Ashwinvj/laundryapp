import bcrypt from 'bcryptjs';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
import Address from './address';
import { Order } from './order';
import { Payment } from './payment';

@Entity()
export class User {
    [x: string]: any;
    static findOne(arg0: { where: { userId: any; }; relations: string[]; }) {
        throw new Error("Method not implemented.");
    }
    static create(userData: User) {
        throw new Error("Method not implemented.");
      }

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column()
     mobile: string;

    @Column()
    password: string;

    @OneToMany(() => Address, (address: Address) => address.user)
    address: Address[];

    @ManyToMany(() => Order, (order : Order) => order.user)
    order : Order;

    @OneToMany(() => Payment, (payment : Payment) => payment.user)
    payment : Payment;

  

  @BeforeInsert()
  async setPassword() {
    // console.log("password",newPassword,this.password)
   this.password = await bcrypt.hash(this.password,10);
  }

  
}
export default User;

//async setPassword(newPassword: string) {
  //  this.password = await bcrypt.hash(newPassword, 10);


  

