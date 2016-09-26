import * as React from "react";
import * as ReactDOM from "react-dom";
import {SorguProps, SorguStates} from "../../dataInterfaces.tsx";
import {NotificationGroup, BildirimYontemi, EmailEkTipi, Receiver} from "../../dataClasses.tsx";

var buttonInlneCss = {marginTop:'3%'};
let durum=true;

export class NotificationView extends React.Component {


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
        this.smsTextControl();
        $(this.refs.divNewReceiver).hide();

        $('.message .close')
            .on('click', function() {
                $(this)
                    .closest('.message')
                    .transition('fade')
                ;
            })
        ;

    }

    smsTextControl = () => {
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

    controlEmailAttachedType = () => {

        if(this.props.triggerData !==undefined)
        {
            $(this.refs.chbExcel).checkbox('uncheck');
            $(this.refs.chbPDF).checkbox('uncheck');
            $(this.refs.chbNone).checkbox('uncheck');

            if(this.props.triggerData.emailAttachType === "EXCEL")
                $(this.refs.chbExcel).checkbox('check');
            else if(this.props.triggerData.emailAttachType === "PDF")
                $(this.refs.chbPDF).checkbox('check');
            else if(this.props.triggerData.emailAttachType === "HICBIRI")
                $(this.refs.chbNone).checkbox('check');

        }



    }

    countLetter = () => {

        var maxLength = 160;
        var length = $(this.refs.txtSMS).val().length;
        if (length >= maxLength) {
        $(this.refs.txtSMS).val($(this.refs.txtSMS).val().substring(0,maxLength));
        $("#lRemain").text("Mesaj limiti doldu!");
        $("#lRemain").addClass("red");
        $("#lRemain").removeClass("orange");

        }
        else {
            $("#lRemain").text(maxLength - length);
        }

    }

    controlSMSText = () => {
      if(this.props.triggerData !==undefined) {
          if(this.props.triggerData.smsText !== null) {
              $(this.refs.txtSMS).val(this.props.triggerData.smsText);

              this.countLetter();
          }

      }
    }

    controlEmailText = () => {
        if(this.props.triggerData !==undefined)
        {
            if(this.props.triggerData.emailText !== null){
                $(this.refs.txtEmail).val(this.props.triggerData.emailText);

            }


        }
    }

    controlNotificationMethod = () => {
        if(this.props.triggerData !==undefined)
        {
            if(this.props.triggerData.notificationMethod !== null){
                var size=this.props.triggerData.notificationMethod.length;
                $(this.refs.chbWatcher).checkbox('uncheck');
                $(this.refs.chbSMS).checkbox('uncheck');
                $(this.refs.chbEmail).checkbox('uncheck');
                for (var i = 0; i<size; i++){
                    if(this.props.triggerData.notificationMethod[i] === "WATCHER")
                        $(this.refs.chbWatcher).checkbox('check');
                    else if(this.props.triggerData.notificationMethod[i] === "SMS")
                        $(this.refs.chbSMS).checkbox('check');
                    else if(this.props.triggerData.notificationMethod[i] === "EMAIL")
                        $(this.refs.chbEmail).checkbox('check');
                }

            }


        }
    }

    clearAllData = () => {
        if(this.props.clear && !this.props.btnSave) {
            $(this.refs.chbWatcher).checkbox('uncheck');
            $(this.refs.chbSMS).checkbox('uncheck');
            $(this.refs.chbEmail).checkbox('uncheck');

            $(this.refs.chbExcel).checkbox('uncheck');
            $(this.refs.chbPDF).checkbox('uncheck');
            $(this.refs.chbNone).checkbox('uncheck');


            $(this.refs.txtEmail).val("");
            $(this.refs.txtSMS).val("");
            this.countLetter();
            $(this.refs.search).dropdown('clear');
        }


    }

    clickedBtnSave = () => {
        this.props.toMainClickedBtnSave(true);
        durum=true;

    }

    getDataFromNotificationView = () => {
        if(durum){
            var data={} as NotificationGroup;


            if($(this.refs.chbExcel).checkbox('is checked'))
                data.emailAttachType="EXCEL";
            else if($(this.refs.chbPDF).checkbox('is checked'))
                data.emailAttachType="PDF";
            else if($(this.refs.chbNone).checkbox('is checked'))
                data.emailAttachType="HICBIRI";


            data.notificationMethod=[];
            if($(this.refs.chbWatcher).checkbox('is checked'))
                data.notificationMethod.push("WATCHER");
            if($(this.refs.chbSMS).checkbox('is checked'))
                data.notificationMethod.push("SMS");
            if($(this.refs.chbEmail).checkbox('is checked'))
                data.notificationMethod.push("EMAIL");

            data.smsText=$(this.refs.txtSMS).val();
            data.emailText=$(this.refs.txtEmail).val();

            data.receiver=[];
            var $itemDetail;
            $itemDetail = $(this.refs.search).dropdown("get item");

            for(var i = 0; i<$itemDetail.length;i++){
                var $item = $itemDetail[0][i];
                if($item !== undefined){
                    var $value = $item.attributes[1].nodeValue;
                    var $name = $itemDetail[0][i].innerHTML;
                    console.log("name ->",$name,"-> value -> ",$value);
                    data.receiver.push(new Receiver($name,$value));
                }

            }



            this.props.getData(data);
            console.log("gönderilen datalar from notification view-> ",data);
            durum=false;
            this.props.toMainAllDataSent(true);
            this.props.toMainClickedBtnSave(false);
        }


    }

    newReceiver = () => {
        $(this.refs.divNewReceiver).show();
    }

    validateEmail = (email) => {
        var emailReg = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return emailReg.test( email );
    }


    addNewReceiver = () => {
        var email=$(this.refs.txtNewReceiverEmail).val();
        if(this.validateEmail(email)){
            var $dropdown=$(this.refs.search);
            $dropdown.append($("<option></option>")
                .attr("value",$(this.refs.txtNewReceiverEmail).val())
                .text($(this.refs.txtNewReceiverName).val()));
            console.log("Email Validate :)");

            var $divErrorMessage=$(this.refs.divErrorMessage);
            if(!$divErrorMessage.find('.positive').length)
                $divErrorMessage.append("<div class=\"ui positive message\"><i class=\"close icon\"></i><div class=\"header\">Kişi Eklendi!</div></div>");
            var $posMessage=$divErrorMessage.children(".positive");
            $posMessage.show();

            setTimeout(function() {
                $dropdown.dropdown("refresh");
                $dropdown.dropdown("set selected", email);
                $posMessage.hide();

            }, 1000);

            $(this.refs.txtNewReceiverEmail).val("");
            $(this.refs.txtNewReceiverName).val("");



        }
        else{
            var $divErrorMessage=$(this.refs.divErrorMessage);
            if(!$divErrorMessage.find('.negative').length)
                $divErrorMessage.append("<div class=\"ui negative message\"><i class=\"close icon\"></i><div class=\"header\">Hatalı Email!</div><p>Lütfen email standartlarına göre email adresi giriniz</p></div>");

            var $negMessage=$divErrorMessage.children(".negative");
            $negMessage.show();
            console.log("Email Not Validate!");

            setTimeout(function() {
                $negMessage.hide();

            }, 3000);
        }




    }

    render() {
        if(this.props.btnSave){
            this.getDataFromNotificationView();
        }
        else{
            this.controlEmailAttachedType();
            this.controlEmailText();
            this.controlSMSText();
            this.controlNotificationMethod();
        }


        this.clearAllData();

        if(this.props.triggerData !==undefined)
        {
            var receiverItems= [];
            var size=Object.keys(this.props.triggerData.receiver).length;
            for(var i = 0; i < size; i++)
            {
                receiverItems.push( <option key={i} value={this.props.triggerData.receiver[i].value}>{this.props.triggerData.receiver[i].label}</option>);
            }
        }


        return (
            <div>
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
                                                    <div className="ui checkbox" ref="chbWatcher">
                                                        <input type="checkbox" tabIndex="0" className="hidden"/>
                                                        <label>Watcher</label>
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <div className="ui checkbox" ref="chbEmail">
                                                        <input type="checkbox" tabIndex="0" className="hidden"/>
                                                        <label>Email</label>
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <div className="ui  checkbox " ref="chbSMS">
                                                        <input type="checkbox" tabIndex="0" className="hidden"/>
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
                                                    <div className="ui radio checkbox" ref="chbExcel">
                                                        <input type="radio" name="frequency"/>
                                                        <label>Excell</label>
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <div className="ui radio checkbox" ref="chbPDF">
                                                        <input type="radio" name="frequency"/>
                                                        <label>PDF</label>
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <div className="ui radio checkbox" ref="chbNone">
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
                <div className="field">
                    <div>

                        <div>
                            <label>Alıcılar</label>
                            <select multiple="" ref="search" id="search">
                                <option value="">Kişi Ekle</option>
                                {receiverItems}
                            </select>

                        </div>
                        <div>
                            <button type="button" className="ui green right floated button " onClick={this.newReceiver}>

                                <i className="plus icon"></i>
                                Yeni Alıcı Ekle
                            </button>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="field ui grid" ref="divNewReceiver">
                    <div className="  seven wide column">
                        <label>Alıcı İsim Soyisim</label>
                        <input type="text" placeholder="İsim Soyisim Giriniz" ref="txtNewReceiverName"/>
                    </div>
                    <div className="  seven wide column">
                        <label>Alıcı Email</label>
                        <input type="text" placeholder="Email Giriniz" ref="txtNewReceiverEmail"/>
                    </div>
                    <div className=" two wide column" style={buttonInlneCss}>
                        <button type="button" className="ui green circular icon button" data-tooltip="Ekle" onClick={this.addNewReceiver}>
                            <i className="checkmark icon"></i>
                        </button>
                    </div>

                </div>
                <div className="field" ref="divErrorMessage" id="divErrorMessage">

                </div>
                <div className="field">
                    <label>Email Metni</label>
                    <textarea rows="4" ref="txtEmail" placeholder="Email metni giriniz"></textarea>
                </div>
                <div>
                    <label>SMS Metni</label>
                    <textarea rows="2" placeholder="SMS metni giriniz" ref="txtSMS"></textarea>
                </div>
                <br/>
                <div>
                    <div>
                        <div>
                            <label className="ui horizontal label">Tahmini Mesaj Sayısı:</label>
                            <label className="ui horizontal circular blue label">1</label>
                        </div>
                        <div>
                            <label className="ui horizontal label">Kalan Karakter Sayısı:</label>
                            <label id="lRemain" className="ui horizontal orange circular label">160</label>

                        </div>
                        <div>
                            <button type="button" className="ui green  right floated button " onClick={this.clickedBtnSave}>
                                <i className="save icon"></i>
                                Kaydet
                            </button>
                        </div>
                    </div>
                </div>

            </div>


        )}
}

