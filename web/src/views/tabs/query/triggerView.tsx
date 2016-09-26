import * as React from "react";
import {SorguProps, SorguStates} from "../../dataInterfaces.tsx";
import * as ReactDOM from "react-dom";
import { Tetikleyici} from "../../dataClasses";



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

    fillAllTextbox = () => {
        if(this.props.triggerData !== undefined)
        {
            $(this.refs.txtTriggerName).val(this.props.triggerData.tetikleyiciAdi);
            $(this.refs.txtCronSimple).val(this.props.triggerData.tetikleyiciIcerik);
            $(this.refs.txtTriggerExplanation).val(this.props.triggerData.aciklama);
        }

    }

    clearAllData = () => {
        if(this.props.clear && !this.props.btnSave){
            $(this.refs.txtTriggerName).val("");
            $(this.refs.dropTetikleyici).dropdown('clear');
            $(this.refs.txtCronSimple).val("");
            $(this.refs.txtTriggerExplanation).val("");
            $(this.refs.chbBildirimEkle).checkbox('uncheck');
            $(this.refs.chbDurum).checkbox('uncheck');
        }
    }

    getDataFromTriggerView = () => {
        var data={} as Tetikleyici;
        data.tetikleyiciAdi=$(this.refs.txtTriggerName).val();
        data.tetikleyiciIcerik=$(this.refs.txtCronSimple).val();
        data.aciklama=$(this.refs.txtTriggerExplanation).val();
        data.durum=$(this.refs.chbDurum).checkbox('is checked');
        data.bildirimEkle=$(this.refs.chbBildirimEkle).checkbox('is checked');
        data.tip=$(this.refs.dropTetikleyici).dropdown('get value');
        this.props.getData(data);
        console.log("gönderilen datalar from trigger view-> ",data)

    }
    render() {
        if(this.props.btnSave){
            this.getDataFromTriggerView();
        }
        else{
            this.fillAllTextbox();
            this.checkDurum();
            this.checkBildirimEkle();
            this.selectTetikleyiciTipi();
        }




        this.clearAllData();



        return (
            <div>
                <div className="field">
                    <label>Tetikleyici Adı:</label>
                    <input type="text" placeholder="Tetikleyici Adı Giriniz" ref="txtTriggerName"/>
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
                    <input type="text" placeholder="CRON/SİMPLE İfadesi Giriniz" ref="txtCronSimple" />
                </div>
                <div className="field">
                    <label>Açıklama</label>
                    <input type="text" placeholder="Açıklama Giriniz" ref="txtTriggerExplanation"/>
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
