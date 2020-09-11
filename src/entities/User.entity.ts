import bcrypt from 'bcryptjs';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
import Address from './address.entity';
import { Order } from './order.entity';
import { Payment } from './payment.entity';
import { UpdateDate } from './updateTime.entity';

@Entity()
export class User  extends UpdateDate{
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

    @Column({default:false})
    isRetired: boolean

    @OneToMany(() => Address, (address: Address) => address.user)
    address: Address[];

    @OneToMany(() => Order, (order : Order) => order.user)
    order : Order[];

    @OneToMany(() => Payment, (payment : Payment) => payment.user)
    payment : Payment[];

  

  @BeforeInsert()
  async setPassword() {
    // console.log("password",newPassword,this.password)
   this.password = await bcrypt.hash(this.password,10);
  }

  
}
export default User;

//async setPassword(newPassword: string) {
  //  this.password = await bcrypt.hash(newPassword, 10);


  

