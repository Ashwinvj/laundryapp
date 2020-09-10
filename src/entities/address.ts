<<<<<<< HEAD
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany, ManyToOne } from "typeorm";
=======
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne } from "typeorm";
>>>>>>> 274f3bf3821de637508242cd8b20f31b1a2f2f1d
import { User } from "./User";
import { Seller } from "./seller";

@Entity()
export class Address {
  static create(addressData: Address): Address | PromiseLike<Address> {
    throw new Error("Method not implemented.");
  }
  save() {
    throw new Error("Method not implemented.");
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  address_line_1: string;

  @Column()
  address_line_2: string;
 
  @Column()
  city: string;
 
  @Column()
  state: string;

  @Column()
  country : string;

  @Column()
  pinCode : number;

  @Column()
  latitude : number;

  @Column()
<<<<<<< HEAD
  longtitude : number;

  

  @ManyToOne(() => User, (user: User) => user.address,{
  onDelete: "CASCADE"})
  user: User;

  //@ManyToMany(() => Seller, (seller: Seller) => seller.address,{
   // onDelete: "CASCADE"})
  //  seller: Seller;
=======
  city : string;

  @Column()
  pinCode : number;

  @ManyToOne(() => User, (user: User) => user.address,{
  onDelete: "CASCADE"})
  user: User;

  @ManyToOne(() => Seller, (seller: Seller) => seller.address,{
  onDelete: "CASCADE"})
  seller: Seller;
>>>>>>> 274f3bf3821de637508242cd8b20f31b1a2f2f1d
}
export default Address;
