import * as React from "react";
import * as ReactDOM from "react-dom";


var divStyle = {
    display: 'none',

};

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




    componentDidMount (){
        $(this.refs.dropSorgu).dropdown();
    }

    render() {
        return (
            <div ClassName="fields">

                <div className="field">
                    <label>Sorgu</label>
                    <div className="ui selection dropdown" ref="dropSorgu">
                        <input type="hidden" name="selSorgu"/>
                        <div className="default text">Seçiniz</div>
                        <i className="dropdown icon"></i>
                            <div className="menu">
                                <div className="item" data-value="sorgu1">

                                    Sorgu 1
                                </div>
                                <div className="item" data-value="sorgu2">

                                    Sorgu 2
                                </div>
                                <div className="item" data-value="sorgu3">

                                    Sorgu 3
                                </div>
                            </div>
                    </div>
                 </div>

                <div className="field">
                    <label>Açıklama</label>
                    <input type="text" placeholder="Açıklama Giriniz"/>
                </div>

                <div className="inline fields">
                    <div className="field">

                        <label>Burak-1 Sorgusu</label>
                        <textarea rows="4">select ID as Dosya_Id from dosya d;</textarea>
                    </div>
                    <div className="inline fields">
                        <div className="field">
                        <button className="ui red circular icon button" data-tooltip="Rename SQL statement">
                            <i className="write  icon"></i>
                        </button> </div>
                        <div className="field">
                        <button className="ui green circular icon button" data-tooltip="Check/Validate SQL statement">
                            <i className="checkmark icon"></i>
                        </button> </div>
                        <div className="field">
                        <button className="ui blue circular icon button" data-tooltip="Save SQL statement">
                            <i className="save icon"></i>
                        </button> </div>
                    </div>

                </div>
                <div className="field">
                    <button className="ui orange  right floated button ">
                        <i className="zoom icon"></i>
                        Alt Sorgu Ekle
                    </button>
                </div>

                <div className="field">
                    <br/>
                    <hr/>
                </div>

            </div>


        );

    }
}

export class AltSorguView extends React.Component<SorguProps,SorguStates> {


    constructor(props: SorguProps, context: any) {
        super(props, context);
    }

    render() {
        return (
            <div ClassName="fields">
                <div className="inline fields">
                    <div className="field">

                        <label>Alt Sorgu -1</label>
                        <textarea rows="4">select id as Dosya_Id from dosya d where u.name="Şevki" join users u on d.userId=u.id;</textarea>
                    </div>
                    <div className="inline fields">
                        <div className="field">
                            <button className="ui red circular icon button" data-tooltip="Rename SQL statement">
                                <i className="write  icon"></i>
                            </button> </div>
                        <div className="field">
                            <button className="ui green circular icon button" data-tooltip="Check/Validate SQL statement">
                                <i className="checkmark icon"></i>
                            </button> </div>
                        <div className="field">
                            <button className="ui blue circular icon button" data-tooltip="Save SQL statement">
                                <i className="save icon"></i>
                            </button> </div>
                    </div>

                </div>

            </div>

        )}
}


export class TetikleyiciView extends React.Component<SorguProps,SorguStates> {


    constructor(props: SorguProps, context: any) {
        super(props, context);
    }

    componentDidMount (){
        $(this.refs.dropTetikleyici).dropdown();
        $('.ui.checkbox')
            .checkbox();
    }

    render() {
        return (
            <div ClassName="fields">
                <div className="field">
                    <label>Tetikleyici Adı:</label>
                    <input type="text" placeholder="Tetikleyici Adı Giriniz"/>
                </div>
                <div className="field">
                    <label>Tetikleyici Tipi</label>
                    <div className="ui selection dropdown" ref="dropTetikleyici">
                        <input type="hidden" name="selTetikleyici"/>
                        <div className="default text">Seçiniz</div>
                        <i className="dropdown icon"></i>
                        <div className="menu">
                            <div className="item" data-value="CRON">
                                CRON
                            </div>
                            <div className="item" data-value="SIMPLE">
                                SIMPLE
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label>CRON/SİMPLE İfadesi:</label>
                    <input type="text" placeholder="CRON/SİMPLE İfadesi Giriniz"/>
                </div>
                <div className="field">
                    <label>Açıklama</label>
                    <input type="text" placeholder="Açıklama Giriniz"/>
                </div>
                <div className="field">
                    <div className="ui vertically divided grid">
                        <div className="two column row">
                            <div className="eight wide column">
                                <div className="fields">
                                    <div className="field">
                                        <label>Durum</label>
                                    </div>
                                    <div className="field">
                                        <div className="ui toggle checkbox">
                                            <input type="checkbox" tabindex="0" className="hidden"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="eight wide column">
                                <div className="ui right floated checkbox ">
                                    <input type="checkbox" tabindex="0" className="hidden"/>
                                    <label>Bildirim Grubuna Ekle</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        )}
}

export class BildirimView extends React.Component<SorguProps,SorguStates> {


    constructor(props: SorguProps, context: any) {
        super(props, context);
    }

    componentDidMount (){
        $(this.refs.dropBildirim).dropdown();
        $('.ui.checkbox').checkbox();
        $('.checked').checkbox("check");
        $(this.refs.search).attr("multiple"," ");
        $(this.refs.search).addClass("ui fluid search dropdown multiple");
        $(this.refs.search).dropdown();
        var maxLength = 160;
        $(this.refs.txtSMS).keyup(function(event) {

            var length = $(this).val().length;
            if (length >= maxLength) {
                $(this).val($(this).val().substring(0,maxLength));
                $("#lRemain").text("Mesaj limiti doldu!");
                $("#lRemain").addClass("red");
                $("#lRemain").removeClass("orange");

            }
            else {
                $("#lRemain").text(maxLength - length);
            }



        });
    }

    render() {
        return (
            <div ClassName="fields">

                <div className="field">
                    <label>Bİldirim Grubu</label>
                    <div className="ui selection dropdown" ref="dropBildirim">
                        <input type="hidden" name="selBildirim"/>
                        <div className="default text">Seçiniz</div>
                        <i className="dropdown icon"></i>
                        <div className="menu">
                            <div className="item" data-value="Sec1">
                                Seç-1
                            </div>
                            <div className="item" data-value="Sec2">
                                Seç-2
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <div className="ui vertically divided grid">
                        <div className="two column row">
                            <div className="eight wide column">
                                <div className="inline fields">
                                   <div className="field">
                                        <label>Bildirim Yöntemi</label>
                                   </div>
                                    <div className=" field">
                                        <div className="field">
                                            <div className="ui red segment">
                                                <div className="field">
                                                    <div className="ui disabled checkbox checked">
                                                        <input type="checkbox" tabindex="0" className="hidden"/>
                                                        <label>Watcher</label>
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <div className="ui checkbox checked">
                                                        <input type="checkbox" tabindex="0" className="hidden" checked=""/>
                                                        <label>Email</label>
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <div className="ui  checkbox ">
                                                        <input type="checkbox" tabindex="0" className="hidden"/>
                                                        <label>SMS</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="eight wide column">
                                <div className="inline fields">
                                    <div className="field">
                                        <label>Email Ek Tipi </label>
                                    </div>
                                    <div className="field">
                                        <div className="fields">
                                            <div className="ui blue segment">
                                                <div className="field">
                                                    <div className="ui radio checkbox">
                                                        <input type="radio" name="frequency" checked="checked"/>
                                                            <label>Excell</label>
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <div className="ui radio checkbox">
                                                        <input type="radio" name="frequency"/>
                                                        <label>PDF</label>
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <div className="ui radio checkbox">
                                                        <input type="radio" name="frequency"/>
                                                        <label>Hiçbiri</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div ClassName="field">

                    <div ClassName="inline fields">

                        <div ClassName="field">
                            <label>Alıcılar</label>
                            <select multiple="" ref="search">
                                <option value="">Kişi Ekle</option>
                                <option value="bkocadag">Şevki KOCADAĞ</option>
                                <option value="gcan">Göksel CAN</option>
                                <option value="hsarioglu">Hatice SARIOĞLU</option>
                                <option value="innova-musd">Innova-MUSD</option>
                            </select>

                        </div>
                    </div>
                </div>
                <div ClassName="field">
                    <label>Email Metni</label>
                    <textarea rows="4">Sayın Kullanıcı Burak-1 sonucunda ekteki sonuç alınmıştır.</textarea>
                </div>
                <div ClassName="field">
                    <label>SMS Metni</label>
                    <textarea rows="2" placeholder="SMS metni giriniz" ref="txtSMS"></textarea>
                </div>
                <br/>
                <div ClassName="field">
                    <div ClassName="fields">
                        <div ClassName="field">
                            <label className="ui horizontal label">Tahmini Mesaj Sayısı:</label>
                            <label className="ui horizontal circular blue label">1</label>
                        </div>
                        <div ClassName="inline fields">
                            <label className="ui horizontal label">Kalan Karakter Sayısı:</label>
                            <label id="lRemain" className="ui horizontal orange circular label">160</label>

                        </div>
                        <div ClassName="field">
                            <button className="ui green  right floated button ">
                                <i className="save icon"></i>
                                Kaydet
                            </button>
                        </div>
                    </div>
                </div>

            </div>


        )}
}

export class App extends React.Component {
    render() {
        return (
        <div className="ui  container">
            <div className="ui vertically divided grid">
                <div className="one column row">
                    <div className="column">
                        <div className="ui top attached tabular menu">
                            <div className="active item">Tab</div>
                        </div>
                        <div className="ui bottom attached active tab segment">
                            <form className="ui form">
                                <div className="ui vertically divided grid">
                                    <div className="three column row">
                                        <div className="seven wide column">
                                            <SorguView name="aaa" sql="bb" aciklama="cc"/>
                                            <AltSorguView />
                                            <AltSorguView />


                                        </div>
                                        <div className="nine wide column">
                                            <TetikleyiciView/>
                                            <br/>
                                            <BildirimView/>
                                        </div>
                                    </div>
                                </div>

                            </form>
                        </div>
                     </div>
                </div>
            </div>
        </div>

        )}
}
ReactDOM.render(<App />, document.getElementById("react"));