///<reference path="../../dataClasses.tsx"/>
import * as React from "react";
import {SorguProps, SorguStates} from "../../dataInterfaces.tsx";
import {DropdownItem} from "../../components/DropDownItem.tsx";
import {Sorgu,Tetikleyici,NotificationGroup,Receiver,TetikleyiciTipi,EmailEkTipi,BildirimYontemi} from "../../dataClasses.tsx";


let dropSelected={selected:[{anasorgu: '',aciklama:'',sorguName:''}]};


DropdownItem.propTypes= {
    hello: React.PropTypes.func,
};




export class QueryView extends React.Component<SorguProps,SorguStates> {


    constructor(props: SorguProps, context: any) {
        super(props, context);
        this.state = {
            sorguList: [],
            selectName:''
        } as SorguStates;

        this.handleAllSorguOnDropdown();
        this.hello=this.hello.bind(this);



    }



    public handleOnClick(event:any):void {
        //noinspection TypeScriptValidateTypes
        this.setState({
            sorguList: [new Sorgu("1","Hi","select","select sorgusu",["hi","hoy"],new Tetikleyici("tetikle", "hello", TetikleyiciTipi.CRON, true, new NotificationGroup("hhhhhhhhhsds", "smsmsmsmsms", [new Receiver("Şevki KOCADAĞ","bkocadag@innova.com.tr"),new Receiver("Göksel CAN","gcan@innova.com.tr"),new Receiver("Hatice SARIOĞLU","hsarioglu@innova.com.tr"),new Receiver("Innova-MUSD","innova-musd@innova.com.tr")], EmailEkTipi.EXCEL, [BildirimYontemi.WATCHER,BildirimYontemi.SMS]), TetikleyiciTipi.CRON, true),"sorgu_8")],
        }, () =>
            fetch('/SorguService/saveSorgu',
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.state.sorguList[0])
                }).then((response)=>{
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

    public handleAllSorguOnDropdown(event:any):void {

        fetch('/SorguService/findAllSorgu',
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
                        sorguList: [...json] as Array<Sorgu>
                    } as SorguStates);
                    console.log(this.state.sorguList);


                    //$('#deneme').text(this.state.sorguList[0].sName);

                });
            } else {
                console.log("Oops, we haven't got JSON!");
            }
        })
    }

    trimString(s) {
        var l=0, r=s.length -1;
        while(l < s.length && s[l] == ' ') l++;
        while(r > l && s[r] == ' ') r-=1;
        return s.substring(l, r+1);
    }


    compareObjects(o1, o2) {
        var k = '';
        for(k in o1) if(o1[k] != o2[k]) return false;
        for(k in o2) if(o1[k] != o2[k]) return false;
        return true;
    }

    itemExists(haystack, needle) {
        for(var i=0; i<haystack.length; i++) if(this.compareObjects(haystack[i], needle)) return true;
        return false;
    }

    searchFor(toSearch,objects) {
        var results = [];
        if(toSearch==="no-data")
            return results;
        toSearch = this.trimString(toSearch); // trim it
        for(var i=0; i<objects.length; i++) {
            for(var key in objects[i]) {
                if(key!=="sName") continue;
                if(objects[i][key].indexOf(toSearch)!=-1) {
                    if(!this.itemExists(results, objects[i]))
                    {
                        //results.push(objects[i]);
                        results.push(i);
                    }
                }
            }
        }
        return results;
    }


    componentDidMount (){
        $(this.refs.dropSorgu).dropdown();
    }



    hello(data){
        // Look at again...
        dropSelected['selected']=this.searchFor(data,this.state.sorguList);
        console.log("droop noooo->",dropSelected['selected'][0]);
        //dropSelected=dropSelected['selected'][0];

        console.log("drop sorgular->",this.state.sorguList[dropSelected['selected'][0]]);
        if(this.state.sorguList[dropSelected['selected'][0]]!==undefined){
            $(this.refs.lSorguName).text(this.state.sorguList[dropSelected['selected'][0]].sName+" Sorgusu");
            $(this.refs.txtAciklama).val(this.state.sorguList[dropSelected['selected'][0]].aciklama);
            $(this.refs.txtSorgu).val(this.state.sorguList[dropSelected['selected'][0]].anaSorgu);
            this.props.toMainData(this.state.sorguList[dropSelected['selected'][0]]);

        }

    }

    gonder(){

        return {state: this.state.sorguList, selected:dropSelected['selected'][0]}

    }



    render() {



        var items= [];
        var size=Object.keys(this.state.sorguList).length;
        for(var i = 0; i < size; i++)
        {
            items.push(<DropdownItem name={this.state.sorguList[i].sName} id={this.state.sorguList[i].sName} myFunc={this.hello} />);
        }







        return (
            <div>

                <div className="field">
                    <label>Sorgu</label>
                    <div className="ui selection dropdown" ref="dropSorgu">
                        <input type="hidden" name="selSorgu"/>
                        <div className="default text">Seçiniz</div>
                        <i className="dropdown icon"></i>
                        <div className="menu">

                            {items}

                        </div>
                    </div>
                </div>

                <div className="field">
                    <label>Açıklama</label>
                    <input type="text" placeholder="Açıklama Giriniz" ref="txtAciklama"/>
                </div>

                <div className="inline fields">
                    <div className="field">

                        <label ref="lSorguName"> Sorgusu</label>
                        <textarea rows="4" ref="txtSorgu"></textarea>
                    </div>
                    <div className="inline fields">
                        <div className="field">
                            <button type="button" className="ui red circular icon button" data-tooltip="Rename SQL statement" onClick={e=> this.handleOnClick(e)}>
                                <i className="write  icon"></i>
                            </button> </div>
                        <div className="field">
                            <button type="button" className="ui green circular icon button" data-tooltip="Check/Validate SQL statement">
                                <i className="checkmark icon"></i>
                            </button> </div>
                        <div className="field">
                            <button className="ui blue circular icon button" data-tooltip="Save SQL statement">
                                <i className="save icon"></i>
                            </button> </div>

                    </div>

                </div>
                <div className="field">
                    <button type="button" className="ui orange  right floated button " >
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




