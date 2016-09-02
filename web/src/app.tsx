import * as React from "react";
import * as ReactDOM from "react-dom";

enum EmailEkTipi{
    HICBIRI, EXCEL, PDF
}
enum BildirimYontemi {
    EMAIL, SMS, HEPSI, HICBIRI
}
enum TetikleyiciTipi{
    CRON, SIMPLE
}
export class Alici {
    label:string;
    value:string;

    constructor(name:string,
                val:string) {
        this.label = name;
        this.value = val;

    }
}
export class BildirimGrubu {
    emailMetni:string;
    smsMetni:string;
    alici:Array<Alici>;
    ekTip:EmailEkTipi;
    bildirimYont:BildirimYontemi;
    mesajSayisi:number;
    mesajKarakter:number;

    constructor(emailMetni:string, smsMetni:string, alici:Array<Alici>, ekTip:EmailEkTipi, bildirimYont:BildirimYontemi, mesajSayisi:number, mesajKarakter:number) {
        this.emailMetni = emailMetni;
        this.smsMetni = smsMetni;
        this.alici = alici;
        this.ekTip = ekTip;
        this.bildirimYont = bildirimYont;
        this.mesajSayisi = mesajSayisi;
        this.mesajKarakter = mesajKarakter;
    }
}

export class Tetikleyici {
    tetikleyiciAdi:string;
    aciklama:string;
    tetikleyiciIcerik:TetikleyiciTipi;
    durum:boolean;
    bildirimGrubu:BildirimGrubu;
    tip:TetikleyiciTipi;
    bildirimEkle:boolean;

    constructor(tetikleyiciAdi:string, aciklama:string, tetikleyiciIcerik:TetikleyiciTipi, durum:boolean, bildirimGrubu:BildirimGrubu, tip:TetikleyiciTipi, bildirimEkle:boolean) {
        this.tetikleyiciAdi = tetikleyiciAdi;
        this.aciklama = aciklama;
        this.tetikleyiciIcerik = tetikleyiciIcerik;
        this.durum = durum;
        this.bildirimGrubu = bildirimGrubu;
        this.tip = tip;
        this.bildirimEkle = bildirimEkle;
    }
}
export class Sorgu {
    _id:string;
    username:string;
    anaSorgu:string;
    aciklama:string;
    altSorguList:Array<string>;
    tetikleyici:Tetikleyici;

    constructor(id:string, username:string, anaSorgu:string, aciklama:string, altSorguList:Array<string>, tetikleyici:Tetikleyici) {
        this._id = id;
        this.username = username;
        this.anaSorgu = anaSorgu;
        this.aciklama = aciklama;
        this.altSorguList = altSorguList;
        this.tetikleyici = tetikleyici;
    }
}

export interface SorguProps {
    sorgu:Sorgu;
}
export interface SorguStates {
    sorguList:Array<Sorgu>;
}
export class SorguView extends React.Component<SorguProps,SorguStates> {


    constructor(props:SorguProps, context:any) {
        super(props, context);
    }


    public handleOnClick(event:any):void {
        this.setState({
            sorguList: [new Sorgu("1", "adi", "sql", "ack", ["sql1", "sql2"], new Tetikleyici("a", "a", TetikleyiciTipi.CRON, true, new BildirimGrubu("a", "a", [], EmailEkTipi.EXCEL, BildirimYontemi.HEPSI, 1, 1), TetikleyiciTipi.CRON, true))],
        }, () =>
            fetch('/SorguService/addSorgu',
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.state.sorguList[0])
                }).then(function (response) {
                var contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json().then(function (json) {
                        // process your JSON further
                    });
                } else {
                    console.log("Oops, we haven't got JSON!");
                }
            }));
    }

    public handleOnClickSorgula(event:any):void {

        fetch('/SorguService/findAllSorgu',
            {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
            var contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json().then(function (json) {
                    // process your JSON further
                    this.setState({
                        sorguList:  json as Array<Sorgu>
                    });
                    console.log(this.state.sorguList);
                });
            } else {
                console.log("Oops, we haven't got JSON!");
            }
        })
    }

    render() {
        return (
            <h1>

                <button className="ui primary button"
                    name="Update"
                    onClick={ e => this.handleOnClick(e) }
                >Update
                </button>
                <button className="ui button"
                    name="Sorgula"
                    onClick={ e => this.handleOnClickSorgula(e) }
                >Sorgula
                </button>
            </h1>
        );

    }
}

export class App extends React.Component {
    render() {
        return (
            <div>
                <SorguView name="aaa" sql="bb" aciklama="cc"/>
            </div>);
    }
}
ReactDOM.render(<App />, document.getElementById("react"));