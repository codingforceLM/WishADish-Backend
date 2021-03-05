import {
    Entity,
    Column,
    PrimaryColumn,
    ManyToOne, PrimaryGeneratedColumn
} from "typeorm";
import { User } from "./User";
import { Group } from "./group/Group";

@Entity()
export class UserGroup {
    @PrimaryGeneratedColumn()
    id: number;
    @Column("date")
    entrydate: string;
    @Column({type:"varchar", length: 100})
    role: string;
    @ManyToOne(() => User, user => user.userGroups)
    user: User;
    @ManyToOne(() => Group, group => group.userGroups)
    group: Group;

    constructor(id: number, entrydate: string, role: string, user: User, group: Group) {
        this.id = id;
        this.entrydate = entrydate;
        this.role = role;
        this.user = user;
        this.group = group;
    }
}