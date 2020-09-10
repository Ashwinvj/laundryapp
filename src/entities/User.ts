<<<<<<< HEAD
import bcrypt from 'bcryptjs';
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn, OneToOne, OneToMany, ManyToMany } from 'typeorm';
import Address from './address';
import { Order } from './order';
=======
import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany} from "typeorm";
import { Address } from "./Address";
import { Product } from "./product";
>>>>>>> 274f3bf3821de637508242cd8b20f31b1a2f2f1d

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

<<<<<<< HEAD
  @Column()
  mobile: string;

  @Column()
  password: string;

  @OneToMany(() => Address, (address: Address) => address.user)
  address: Address[];

  @ManyToMany(() => Order, (order : Order) => order.user)
  order : Order;
=======
    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    phoneNumber: number;
>>>>>>> 274f3bf3821de637508242cd8b20f31b1a2f2f1d

    @OneToMany(() => Address, (address: Address) => address.user)
    address: Address[];

<<<<<<< HEAD
  @BeforeInsert()
  async setPassword() {
    // console.log("password",newPassword,this.password)
   this.password = await bcrypt.hash(this.password,10);
  }
=======
    @ManyToMany(() => Product, (product : Product) => product.user)
    product : Product;
>>>>>>> 274f3bf3821de637508242cd8b20f31b1a2f2f1d

  
}
export default User;

//async setPassword(newPassword: string) {
  //  this.password = await bcrypt.hash(newPassword, 10);


  

