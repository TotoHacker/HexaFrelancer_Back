import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    FREELANCER = "freelancer",
    CLIENTE = "cliente"
}

@Entity({ name: 'user' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 255, nullable: false })

    password: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.CLIENTE, nullable: false })
    role: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
    projects: any;
}
