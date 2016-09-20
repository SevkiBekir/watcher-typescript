import * as React from "react";
import * as ReactDOM from "react-dom";
import {SorguProps, SorguStates} from "../../dataInterfaces.tsx";

export class NotificationView extends React.Component<SorguProps,SorguStates> {


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

    controlSMSText = () => {
      if(this.props.triggerData !==undefined)
      {
          if(this.props.triggerData.smsText !== null)
          {
              $(this.refs.txtSMS).val(this.props.triggerData.smsText);

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

    render() {
        console.log("EMAIL - RENDER->",this.props.triggerData);
        this.controlEmailAttachedType();
        this.controlEmailText();
        this.controlSMSText();
        this.controlNotificationMethod();

        if(this.props.triggerData !==undefined)
        {
            var receiverItems= [];
            var size=Object.keys(this.props.triggerData.receiver).length;
            for(var i = 0; i < size; i++)
            {
                receiverItems.push( <option value={this.props.triggerData.receiver[i].value}>{this.props.triggerData.receiver[i].label}</option>);
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
                <div>
                    <div>

                        <div>
                            <label>Alıcılar</label>
                            <select multiple="" ref="search">
                                <option value="">Kişi Ekle</option>
                                {receiverItems}
                            </select>

                        </div>
                    </div>
                </div>
                <div >
                    <label>Email Metni</label>
                    <textarea rows="4" ref="txtEmail"></textarea>
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

