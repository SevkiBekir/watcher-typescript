import * as React from "react";
import {SorguProps, SorguStates} from ".././dataInterfaces.tsx";

export class DropdownItem extends React.Component<SorguProps,SorguStates> {


    constructor(props: SorguProps, context: any) {
        super(props, context);
        this.state = {
            selectName: 'no-data'
        } as SorguStates;

        this.calis = this.calis.bind(this);
    }

    calis = () => {
        this.props.myFunc($('.item.active.selected').text());
    }


    render() {
        console.log("states",this.state);
        console.log("props",this.props);
        this.props.myFunc(this.state.selectName);
        return (

            <div className="item" data-value={this.props.id} onClick={this.calis}>

                {this.props.name}

            </div>

        );
    }

}