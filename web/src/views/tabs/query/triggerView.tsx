import * as React from "react";
import {SorguProps, SorguStates} from "../../dataInterfaces.tsx";
import * as ReactDOM from "react-dom";



export class TriggerView extends React.Component<SorguProps,SorguStates> {


    constructor(props: SorguProps, context: any) {
        super(props, context);
    }

    componentDidMount (){
        $(this.refs.dropTetikleyici).dropdown();
        $('.ui.checkbox')
            .checkbox();


    }



    checkDurum=()=>{
        if(this.props.triggerData.durum)
            $(this.refs.chbDurum).checkbox('check');
        else
            $(this.refs.chbDurum).checkbox('uncheck');
    }

    checkBildirimEkle=()=>{
        if(this.props.triggerData.bildirimEkle)
            $(this.refs.chbBildirimEkle).checkbox('check');
        else
            $(this.refs.chbBildirimEkle).checkbox('uncheck');
    }

    selectTetikleyiciTipi = () => {
        var tip=this.props.triggerData.tip;

        $('#dropTetikleyiciId>div.text').text(tip);
        $('#dropTetikleyiciId>div.text').removeClass("default");
        $('#dropTetikleyiciId>input').val(tip);
        /*
        if(tip==="CRON")
        {
            console.log("CRONNN");
            $('#dropTetikleyiciId>div.menu>div.item[data-value="CRON"]').addClass("active selected");
            $('#dropTetikleyiciId>div.menu>div.item[data-value="SIMPLE"]').removeClass("active selected");

        }
        else if (tip==="SIMPLE")
        {
            console.log("SIMPLE");
            $('#dropTetikleyiciId>div.menu>div.item[data-value="SIMPLE"]').addClass("active selected");
            $('#dropTetikleyiciId>div.menu>div.item[data-value="CRON"]').removeClass("active selected");

        }
        */

    }

    render() {
        console.log(this.props);
        this.checkDurum();
        this.checkBildirimEkle();
        this.selectTetikleyiciTipi();

        return (
            <div>
                <div className="field">
                    <label>Tetikleyici Adı:</label>
                    <input type="text" placeholder="Tetikleyici Adı Giriniz" value={this.props.triggerData.tetikleyiciAdi}/>
                </div>
                <div className="field">
                    <label>Tetikleyici Tipi</label>
                    <div className="ui selection dropdown" ref="dropTetikleyici" id="dropTetikleyiciId">
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
                    <input type="text" placeholder="CRON/SİMPLE İfadesi Giriniz" value={this.props.triggerData.tetikleyiciIcerik}/>
                </div>
                <div className="field">
                    <label>Açıklama</label>
                    <input type="text" placeholder="Açıklama Giriniz" value={this.props.triggerData.aciklama}/>
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
                                        <div className="ui toggle checkbox" ref="chbDurum">
                                            <input type="checkbox" tabIndex="0" className="hidden"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="eight wide column">
                                <div className="ui right floated checkbox " ref="chbBildirimEkle">
                                    <input type="checkbox" tabIndex="0" className="hidden"/>
                                    <label>Bildirim Grubuna Ekle</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        )}
}
