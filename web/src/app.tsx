import * as React from "react";
import * as ReactDOM from "react-dom";
import {MainQueryView} from "./views/tabs/query/main.tsx";
import {MainDashboardView} from "./views/tabs/dashboard/main.tsx";
import {MainSettingsView} from "./views/tabs/settings/main.tsx";


var divStyle = {
    display: 'none',

};





export class App extends React.Component {
    componentDidMount(){
        $('.menu>.item').tab();
    }


    render() {
        return (
        <div className="ui  container">
            <div className="ui vertically divided grid">
                <div className="one column row">
                    <div className="column">
                        <div className="ui top attached tabular menu" ref="hi">
                            <div className="active item" data-tab="query">Sorgu</div>
                            <div className=" item" data-tab="dashboard">Dashboard</div>
                            <div className=" item" data-tab="settings">Ayarlar</div>
                        </div>
                        <div className="ui bottom attached active tab segment" data-tab="query">
                            <MainQueryView/>
                        </div>
                        <div className="ui bottom attached tab segment" data-tab="dashboard">
                            <MainDashboardView/>
                        </div>
                        <div className="ui bottom attached tab segment" data-tab="settings">
                            <MainSettingsView/>
                        </div>
                     </div>
                </div>
            </div>
        </div>

        )}
}
ReactDOM.render(<App />, document.getElementById("react"));