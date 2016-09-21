import * as React from "react";
import {QueryView} from "./QueryView.tsx";
import {SubQueryView} from "./subQueryView.tsx";
import {TriggerView} from "./triggerView.tsx";
import {NotificationView} from "./notificationView.tsx";



QueryView.propTypes= {
    mainPropsFunc: React.PropTypes.func,
};

export class MainQueryView extends React.Component {

    // we declare text is a string

    constructor(props, context: any) {
        super(props, context);
        this.mainPropsFunc = this.mainPropsFunc.bind(this);
        this.mainClearOK = this.mainClearOK.bind(this);
        this.state={stateSiblingArray:[], stateTrigger:{}, clear:false, createNewSubQuery:false}
    }




    mainPropsFunc = (siblingArray) => {
        console.log("Main Props Func!->",siblingArray);
        this.setState({stateSiblingArray:siblingArray.altSorguList},()=>{console.log("")});
        this.setState({stateTrigger:siblingArray.tetikleyici},()=>{console.log("")});
        console.log("STATESSSS=>>>",this.state);

    }


    mainClearOK = (val) => {
        this.setState({clear:val});
    }

    mainCreateNewSubQuery = (val) =>{
        this.setState({createNewSubQuery:val});
    }

    render() {
        var altSorgu= [];
        if(this.state.clear) {
            var size=0;
        }
        else{
            var size=this.state.stateSiblingArray.length;
        }



        console.log("all data=>",this.state.stateSiblingArray);
        for(var i = 0; i < size; i++)
        {
            altSorgu.push(<SubQueryView key={i} name={this.state.stateSiblingArray[i]} labelName={i+1} clear={this.state.clear}/>);
        }

        if(this.state.createNewSubQuery){
            //size++;
            altSorgu.push(<SubQueryView key={i} name="" labelName={size+1} clear={this.state.clear}/>);

        }

        return (

            <form className="ui form">
                <div className="ui vertically divided grid">
                    <div className="three column row">
                        <div className="seven wide column">
                            <QueryView toMainData={this.mainPropsFunc} toMainClearOK={this.mainClearOK} toMainCreateNewSubQuery={this.mainCreateNewSubQuery}/>
                            {altSorgu}
                        </div>
                        <div className="nine wide column">
                            <TriggerView triggerData={this.state.stateTrigger} clear={this.state.clear}/>
                            <br/>
                            <NotificationView triggerData={this.state.stateTrigger.notificationGroup} clear={this.state.clear}/>
                        </div>
                    </div>
                </div>

            </form>


        )}
}
