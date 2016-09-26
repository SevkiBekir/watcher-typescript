import * as React from "react";
import {Sorgu} from "./dataClasses.tsx";


export interface SorguProps {
    sorgu:Sorgu;
}
export interface SorguStates {
    sorguList:Array<Sorgu>;
    selectName:string;

}

