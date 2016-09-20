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
        this.state={stateSiblingArray:[], stateTrigger:{}}
    }




    mainPropsFunc = (siblingArray) => {
        console.log("Main Props Func!->",siblingArray);
        this.setState({stateSiblingArray:siblingArray.altSorguList},()=>{console.log("")});
        this.setState({stateTrigger:siblingArray.tetikleyici},()=>{console.log("")});
        console.log("STATESSSS=>>>",this.state);

    }



    render() {
        var altSorgu= [];
        var size=this.state.stateSiblingArray.length;
        console.log("all data=>",this.state.stateSiblingArray);
        for(var i = 0; i < size; i++)
        {
            altSorgu.push(<SubQueryView name={this.state.stateSiblingArray[i]} labelName={i+1}/>);
        }

        return (

            <form className="ui form">
                <div className="ui vertically divided grid">
                    <div className="three column row">
                        <div className="seven wide column">
                            <QueryView toMainData={this.mainPropsFunc}/>
                            {altSorgu}
                        </div>
                        <div className="nine wide column">
                            <TriggerView triggerData={this.state.stateTrigger}/>
                            <br/>
                            <NotificationView triggerData={this.state.stateTrigger.notificationGroup}/>
                        </div>
                    </div>
                </div>

            </form>


        )}
}
