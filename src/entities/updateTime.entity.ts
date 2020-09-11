import { Column, CreateDateColumn, UpdateDateColumn, Entity, Timestamp } from "typeorm";

@Entity()
export  class  UpdateDate{

  @CreateDateColumn({ update: false })
  createdAt: string;

  @UpdateDateColumn({ type : "timestamp" })
  updatedAt: number;
}