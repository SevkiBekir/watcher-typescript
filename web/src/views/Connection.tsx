import * as React from "react";

export class PrivateConnection {
    connectionName:string;
    databaseName:string;
    host:string;
    port:string;
    serviceName:string;
    username:string;
    password:string;

    constructor(connectionName:string,
                databaseName:string,
                host:string,
                port:string,
                serviceName:string,
                username:string,
                password:string) {
        this.connectionName = connectionName;
        this.databaseName = databaseName;
        this.host = host;
        this.port = port;
        this.serviceName = serviceName;
        this.username = username;
        this.password = password;


    }
}
