import * as React from "react";
import {PrivateConnection} from "../../Connection.tsx";


var paddingStyle2Left = {
    paddingTop: 0,
    paddingLeft: 0

}

var paddingStyle2Right = {
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight:0

}

var inputUserPass = {
    marginTop: '1.5%'

}

var btnAddNew = false;

export class AddConnectionView extends React.Component {

    constructor(props, context: any) {
        super(props, context);

    }
    componentDidMount(){
        $(this.refs.divNewConnection).hide();
    }

    showNewConnection = () => {
        if(this.props.clickedBtnNewConnection){
            $(this.refs.divNewConnection).show();
            btnAddNew = true;

        }

    }

    hideNewConnection = () => {
        if(btnAddNew){
            $(this.refs.divNewConnection).hide();

        }

    }

    handleSaveNewConnection = () => {

        if($(this.refs.txtNewConnectionName).val() === "" || $(this.refs.txtNewHost).val() === "" || $(this.refs.txtNewServiceName).val() === "" ||  $(this.refs.txtNewDBName).val() === "" || $(this.refs.txtNewPort).val() === "" || $(this.refs.txtNewUsername).val() === "" || $(this.refs.txtNewPassword).val() === ""){



            var errorText = "";

            if($(this.refs.txtNewConnectionName).val() === "")
                errorText = "Bağlantı Adı";
            else if($(this.refs.txtNewDBName).val() === "")
                errorText = "Veritabanı Adı";
            else if($(this.refs.txtNewHost).val() === "")
                errorText = "Host Adresi";
            else if($(this.refs.txtNewPort).val() === "")
                errorText = "Port Numarası";
            else if($(this.refs.txtNewServiceName).val() === "")
                errorText = "Servis Adı";
            else if($(this.refs.txtNewUsername).val() === "")
                errorText = "Kullanıcı Adı";
            else if($(this.refs.txtNewPassword).val() === "")
                errorText = "Kullanıcı Şifresi";



            var $divErrorMessage=$(this.refs.divErrorMessage4Setting);
            if(!$divErrorMessage.find('.negative').length)
                $divErrorMessage.append("<div class=\"ui negative message\"><i class=\"close icon\"></i><div class=\"header\">Hata!</div><p>Lütfen "+ errorText+" giriniz</p></div>");

            var $negMessage=$divErrorMessage.children(".negative");
            $negMessage.show();


            setTimeout(function() {
                $negMessage.hide();
                $negMessage.remove();

            }, 3000);
        }
        else {
            var connection={} as PrivateConnection;
            connection.connectionName = $(this.refs.txtNewConnectionName).val();
            connection.host = $(this.refs.txtNewHost).val();
            connection.serviceName = $(this.refs.txtNewServiceName).val();
            connection.databaseName = $(this.refs.txtNewDBName).val();
            connection.port = $(this.refs.txtNewPort).val();
            connection.username = $(this.refs.txtNewUsername).val();
            connection.password = $(this.refs.txtNewPassword).val();

            //console.log("newConnectioon -> ", connection);

            if(this.saveFetchOperation(connection)){
                $(this.refs.txtNewConnectionName).val("");
                $(this.refs.txtNewHost).val("");
                $(this.refs.txtNewServiceName).val("");
                $(this.refs.txtNewDBName).val("");
                $(this.refs.txtNewPort).val("");
                $(this.refs.txtNewUsername).val("");
                $(this.refs.txtNewPassword).val("");

                $(this.refs.divNewConnection).hide();
                btnAddNew = true;
                this.props.saveOK(true);


            }

        }



    }

    saveFetchOperation = (data) => {
        var ok = true;
        fetch('/PrivateConnectionService/save',
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then((response)=>{
            var contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json().then(function (json) {
                    // process your JSON further
                });

            } else {
                console.log("Oops, we haven't got JSON!");
                ok = false;
            }
        });

        return ok;

    }

    btnSaveNewConnection = () => {
        this.handleSaveNewConnection();
    }

    render() {
        if(btnAddNew){
            this.hideNewConnection();
            btnAddNew = false;
        }
        else{
            this.showNewConnection();

        }


        return (
            <div>
                <div className="ui green segment" ref="divNewConnection">
                    <div className="ui vertically divided grid">
                        <div className="three column row">
                            <div className="eight wide column">
                                <div className="field">
                                    <label>Bağlantı Adı</label>
                                    <input type="text" placeholder="Yeni Bağlantı İsmi Giriniz" ref="txtNewConnectionName"/>
                                </div>
                                <div className="field">
                                    <label>Host</label>
                                    <input type="text" placeholder="Bağlantı Host Adresini Giriniz" ref="txtNewHost"/>
                                </div>
                                <div className="field">
                                    <label>Servis Adı</label>
                                    <input type="text" placeholder="Bağlantı Servis Adı Giriniz" ref="txtNewServiceName"/>
                                </div>
                                <div className="field" ref="divErrorMessage4Setting">

                                </div>
                            </div>
                            <div className="eight wide column">
                                <div className="field">
                                    <label>Veritabanı Adı</label>
                                    <input type="text" placeholder="Bağlantı Veritabanı İsmi Giriniz" ref="txtNewDBName"/>
                                </div>
                                <div className="field">
                                    <label>Port</label>
                                    <input type="text" placeholder="Bağlantı Port Numarası Giriniz" ref="txtNewPort"/>
                                </div>

                                <div className="field ui grid">
                                    <div className="eight wide column" style={paddingStyle2Left}>
                                        <label>Kullanıcı Adı</label>
                                        <input type="text" placeholder="Bağlantı Kullanıcı Adı Giriniz" ref="txtNewUsername" style={inputUserPass}/>
                                    </div>
                                    <div className="eight wide column" style={paddingStyle2Right}>
                                        <label>Şifre</label>
                                        <input type="text" placeholder="Bağlantı Şifre Giriniz" ref="txtNewPassword" style={inputUserPass} />
                                    </div>

                                </div>
                                <div className="field">
                                    <button type="button" className="ui green right floated big button " onClick={this.btnSaveNewConnection}>

                                        <i className="save icon"></i>
                                        Kaydet
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )}
}