import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert } from "typeorm";
import bcrypt from 'bcryptjs';
import { Service } from "./service.entity";
import { Payment } from "./payment.entity";
import { UpdateDate } from "./updateTime.entity";
import Address from "./address.entity";

@Entity()
export class ServiceProvider extends UpdateDate{
    static create(serviceProviderdata: ServiceProvider): ServiceProvider | PromiseLike<ServiceProvider> {
        throw new Error("Method not implemented.");
      }
      save() {
        throw new Error("Method not implemented.");
      }
    

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    mobile: number;

    @Column()
    email: string;

    @Column()
    active: true;

    @Column()
    latitude: string;

    @Column()
    longitude: string;

    @Column()
    isRetired: boolean = false;

    @Column()
    password: string;

    @OneToMany(() => Address, (address: Address) => address.serviceProvider)
    address: Address[];

    @OneToMany(() => Service, (service: Service) => service.serviceProvider)
    service: Service[];

    @OneToMany(() => Payment, (payment: Payment) => payment.serviceProvider)
    payment: Payment[];

    @BeforeInsert()
  async setPassword() {
    // console.log("password",newPassword,this.password)
   this.password = await bcrypt.hash(this.password,10);
  }


}


    