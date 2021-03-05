import {
    Entity,
    Column,
    PrimaryColumn,
    OneToMany
} from "typeorm";
import { UserGroup } from "../UserGroup";
import { Invitation } from "./Invitation";

@Entity()
export class Group {
    @PrimaryColumn()
    id: string;
    @Column({type: "varchar", length: 100})
    title: string;
    @Column("date")
    creation: string;
    @OneToMany(() => UserGroup, userGroup => userGroup.group)
    userGroups: UserGroup[];
    @OneToMany(() => Invitation, invitation => invitation.group)
    invites: Invitation[];

    constructor(id: string, title: string, creation: string, userGroups: UserGroup[], invites: Invitation[]) {
        this.id = id;
        this.title = title;
        this.creation = creation;
        this.userGroups = userGroups;
        this.invites = invites;
    }
}