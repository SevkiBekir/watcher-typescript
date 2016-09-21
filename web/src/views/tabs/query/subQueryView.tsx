import * as React from "react";
import * as ReactDOM from "react-dom";
import {SorguProps, SorguStates} from "../../dataInterfaces.tsx";



export class SubQueryView extends React.Component<SorguProps,SorguStates> {


    constructor(props: SorguProps, context: any) {
        super(props, context);
    }

    componentDidMount(){
        $(this.refs.txtArea).val(this.props.name);

    }

    fClearAllData = () => {
        if(this.props.clear){
            $(this.refs.txtArea).val("");
        }
    }

    render() {

        $(this.refs.txtArea).val(this.props.name);
        this.fClearAllData();

        return (
            <div>
                <div className="inline fields">
                    <div className="field">

                        <label>Alt Sorgu {this.props.labelName}</label>
                        <textarea rows="4" ref="txtArea"></textarea>
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
