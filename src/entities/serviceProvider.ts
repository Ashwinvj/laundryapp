import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import {Address } from "./address";
import { User } from "./User";
import { Service } from "./service";

@Entity()
export class ServiceProvider {
    static create(serviceProviderdata: ServiceProvider): ServiceProvider | PromiseLike<ServiceProvider> {
        throw new Error("Method not implemented.");
      }
      save() {
        throw new Error("Method not implemented.");
      }
    

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    Name: string;

    @Column()
    description: string;

    @Column()
    mobile: number;

    @Column()
    email: string;

    @Column()
    active: true;

    @Column()
    address_line_1: string;

    @Column()
    address_line_2: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    pincode: number;

    @Column()
    country: string;

    @Column()
    latitude: string;

    @Column()
    longitude: string;

    

    @OneToMany(() => Service, (service: Service) => service.serviceProvider)
    service: Service;

    //@OneToMany(() => ProductDetail, (productDetail: ProductDetail) => productDetail.seller)
    //productDetail: ProductDetail[];

}


    