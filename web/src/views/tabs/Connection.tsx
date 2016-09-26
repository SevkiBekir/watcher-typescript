import * as React from "react";


export enum EmailEkTipi{
    HICBIRI, EXCEL, PDF
}
export enum BildirimYontemi {
    EMAIL, SMS, WATCHER
}
export enum TetikleyiciTipi{
    CRON, SIMPLE
}
/*
export class Alici {
    label:string;
    value:string;

    constructor(name:string,
                val:string) {
        this.label = name;
        this.value = val;

    }
}
*/
export class PrivateConnection {
    connectionName:string;
    databaseName:string;
    host:string;
    port:string;
    serviceName:string;
    username:string;
    password:string;

    constructor(databseName:string,
                host:string,
                port:string;
                serviceName:string,
                username:string,
                password:string) {
                                    this.database = databaseName;
                                    this.value = value;

    }
}
