import { Column, CreateDateColumn, UpdateDateColumn, Entity } from "typeorm";

@Entity()
export  class  UpdateDate{


  // https://github.com/typeorm/typeorm/issues/2651
  @CreateDateColumn({ update: false })
  createdAt: Date;

  @UpdateDateColumn({ update: false })
  updatedAt: Date;
}