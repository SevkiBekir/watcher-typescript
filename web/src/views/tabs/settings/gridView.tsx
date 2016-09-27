import * as React from "react";
import {PrivateConnection} from "../../Connection.tsx";
import {PrivateConnectionStates} from "../../ConnectionInterfaces.tsx";


var durum = false;


export class GridView extends React.Component {

    constructor(props, context: any) {
        super(props, context);
        this.state = {connectionList:[] } as PrivateConnectionStates;
        //this.state = {saveOK:false};

        this.getAllConnection();

    }







    public getAllConnection():void{
        fetch('/PrivateConnectionService/findAll',
            {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
            var contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json().then( (json) => {
                    // process your JSON further
                    this.setState({
                        connectionList: [...json] as Array<PrivateConnection>
                    } as PrivateConnectionStates);
                    //console.log(this.state.connectionList);

                });
            } else {
                console.log("Oops, we haven't got JSON!");
            }
        })
    }


    render() {


        if(this.props.saveOK === true){
            this.getAllConnection();

        }

        var tableItems = [];
        var size=Object.keys(this.state.connectionList).length;

        for(var i = 0; i < size; i++)
        {
            tableItems.push(<tr key={i+1}><td>{this.state.connectionList[i].connectionName}</td><td>{this.state.connectionList[i].databaseName}</td><td>{this.state.connectionList[i].host}</td><td>{this.state.connectionList[i].port}</td><td>{this.state.connectionList[i].serviceName}</td><td>{this.state.connectionList[i].username}</td><td>{this.state.connectionList[i].password}</td></tr>);
        }

        //console.log("Grid Render starts!");




        return (

            <div>
                <table className="ui selectable teal celled table">
                    <thead>
                        <tr className="center aligned">
                            <th>Bağlantı Adı</th>
                            <th>Veritabanı Adı</th>
                            <th>Host</th>
                            <th>Port</th>
                            <th>Service Adı</th>
                            <th>Kullanıcı Adı</th>
                            <th>Şifre</th>

                        </tr>
                    </thead>
                    <tbody className="center aligned">
                    {tableItems}


                    </tbody>
                </table>
            </div>


        )}
}