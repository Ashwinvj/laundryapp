import { Column, CreateDateColumn, UpdateDateColumn, Entity, Timestamp, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export  class  UpdateDate{

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @CreateDateColumn({ update: false })
  createdAt: string;

  @UpdateDateColumn({ type : "timestamp" })
  updatedAt: number;
}