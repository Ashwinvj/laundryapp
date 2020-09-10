import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { User } from "./User";


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
  longtitude : number;

  

  @ManyToOne(() => User, (user: User) => user.address,{
  onDelete: "CASCADE"})
  user: User;

}
export default Address;
