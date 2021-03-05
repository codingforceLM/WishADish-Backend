import {
    Entity,
    Column,
    PrimaryColumn,
    ManyToOne
} from "typeorm";
import { Group } from "./Group";

@Entity()
export class Invitation {
    @PrimaryColumn()
    id: string;
    @Column("timestamp")
    timestamp: string;
    @Column({type: "varchar", length: 500})
    url: string;
    @ManyToOne(() => Group, group => group.invites)
    group: Group;

    constructor(id: string, timestamp: string, url: string, group: Group) {
        this.id = id;
        this.timestamp = timestamp;
        this.url = url;
        this.group = group;
    }
}