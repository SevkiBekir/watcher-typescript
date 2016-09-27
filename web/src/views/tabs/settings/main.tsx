import * as React from "react";
import {GridView} from "./gridView.tsx";
import {AddConnectionView} from "./addConnectionView.tsx";


export class MainSettingsView extends React.Component {

    constructor(props, context: any) {
        super(props, context);
        this.state = {clickedbtnNewConnection:false, saveOK:false}
    }


    btnNewConnection = () => {
        this.setState({clickedbtnNewConnection:true});
    }

    saveOK = (val) => {
        this.setState({saveOK:val});
    }



    render() {
        return (

            <form className="ui form">
                <div className="field">
                    <button type="button" className="ui orange button " onClick={this.btnNewConnection}>

                        <i className="plus icon"></i>
                        Yeni Bağlantı Ekle
                    </button>
                </div>
                <div className="field">
                    <GridView saveOK={this.state.saveOK}/>
                </div>
                <div className="field">
                    <AddConnectionView clickedBtnNewConnection={this.state.clickedbtnNewConnection} saveOK={this.saveOK}/>
                </div>
            </form>


        )}
}