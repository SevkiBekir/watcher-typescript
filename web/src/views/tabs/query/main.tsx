import * as React from "react";
import {QueryView} from "./QueryView.tsx";
import {SubQueryView} from "./subQueryView.tsx";
import {TriggerView} from "./triggerView.tsx";
import {NotificationView} from "./notificationView.tsx";
import {Sorgu} from "../../dataClasses.tsx";
import {SorguStates} from "../../dataInterfaces.tsx";



QueryView.propTypes= {
    mainPropsFunc: React.PropTypes.func,
};
let temp={} as Sorgu;
let durum=true;

export class MainQueryView extends React.Component {

    // we declare text is a string

    constructor(props, context: any) {
        super(props, context);
        this.mainPropsFunc = this.mainPropsFunc.bind(this);
        this.mainClearOK = this.mainClearOK.bind(this);
        this.state={stateSiblingArray:[], stateTrigger:{}, clear:false, createNewSubQuery:false, btnSave:false, newSorgu:{} as Sorgu,allDataSent:false, sorguList: [] as Sorgu}
    }





    mainPropsFunc = (siblingArray) => {
        console.log("Main Props Func!->",siblingArray);
        this.setState({stateSiblingArray:siblingArray.altSorguList,stateTrigger:siblingArray.tetikleyici,newData:{} as Sorgu},()=>{console.log("")});
        console.log("STATESSSS=>>>",this.state);

    }


    mainClearOK = (val) => {
        this.setState({clear:val});
    }

    mainCreateNewSubQuery = (val) =>{
        this.setState({createNewSubQuery:val});
    }

    mainClickedBtnSave = (val) => {
        this.setState({btnSave:val});

    }

    mainAllDataSent = (val) => {
        this.setState({allDataSent:val});
    }


    getDataFromQueryView = (data) => {
        console.log("Datalar geldi", data);
        temp=data;
        console.log("temp->", temp);
    }

    getDataFromSubQueryView = (data) => {

        console.log("Datalar geldi from Sub Query view", data);
        temp.altSorguList=data.altSorguList;
        console.log("temp->", temp);
    }
    getDataFromTriggerView = (data) => {

        console.log("Datalar geldi from Trigger view", data);
        temp.tetikleyici=data;
        console.log("temp->", temp);
    }

    getDataFromNotificationView = (data) => {
        console.log("Datalar geldi from Notification view", data);
        temp.tetikleyici.notificationGroup=data;
        console.log("temp->", temp);
    }

    handleSaveDB = () => {
        if(this.state.allDataSent){

            fetch('/SorguService/saveSorgu',
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(temp)
                }).then((response)=>{
                var contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json().then(function (json) {
                        // process your JSON further
                    });

                } else {
                    console.log("Oops, we haven't got JSON!");
                }
            });



        }
    }



    render() {


        var altSorgu= [];
        if(this.state.clear) {
            var size=0;
        }
        else{
            var size=this.state.stateSiblingArray.length;
        }




        for(var i = 0; i < size; i++)
        {
            altSorgu.push(<SubQueryView key={i} name={this.state.stateSiblingArray[i]} labelName={i+1} clear={this.state.clear}/>);
        }

        if(this.state.createNewSubQuery){
            //size++;
            altSorgu.push(<SubQueryView key={size+1} name="" labelName={size+1} clear={this.state.clear} getData={this.getDataFromSubQueryView} btnSave={this.state.btnSave}/>);

        }

        if(this.state.allDataSent && durum === true){
            this.handleSaveDB();
            durum=false;
        }



        return (

            <form className="ui form">
                <div className="ui vertically divided grid">
                    <div className="three column row">
                        <div className="seven wide column">
                            <QueryView toMainData={this.mainPropsFunc} toMainClearOK={this.mainClearOK} toMainCreateNewSubQuery={this.mainCreateNewSubQuery}  getData={this.getDataFromQueryView} btnSave={this.state.btnSave}/>
                            {altSorgu}
                        </div>
                        <div className="nine wide column">
                            <TriggerView triggerData={this.state.stateTrigger} clear={this.state.clear} getData={this.getDataFromTriggerView} btnSave={this.state.btnSave}/>
                            <br/>
                            <NotificationView triggerData={this.state.stateTrigger.notificationGroup} clear={this.state.clear} toMainClickedBtnSave={this.mainClickedBtnSave} getData={this.getDataFromNotificationView} btnSave={this.state.btnSave} toMainAllDataSent={this.mainAllDataSent}/>
                        </div>
                    </div>
                </div>

            </form>


        )}
}
