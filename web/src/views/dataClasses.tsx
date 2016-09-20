import * as React from "react";


export enum EmailEkTipi{
    HICBIRI, EXCEL, PDF
}
export enum BildirimYontemi {
    EMAIL, SMS, WATCHER
}
export enum TetikleyiciTipi{
    CRON, SIMPLE
}
/*
export class Alici {
    label:string;
    value:string;

    constructor(name:string,
                val:string) {
        this.label = name;
        this.value = val;

    }
}
*/
export class Receiver {
    label:string;
    value:string;

    constructor(label:string,
                value:string) {
        this.label = label;
        this.value = value;

    }
}

export class NotificationGroup {
    emailText:string;
    smsText:string;
    receiver:Array<Receiver>;
    emailAttachType:EmailEkTipi;
    notificationMethod:Array<BildirimYontemi>;


    constructor(emailText:string, smsText:string, receiver:Array<Receiver>, emailAttachType:EmailEkTipi, notificationMethod:Array<BildirimYontemi>) {
        this.emailText = emailText;
        this.smsText = smsText;
        this.receiver = receiver;
        this.emailAttachType = emailAttachType;
        this.notificationMethod = notificationMethod;
    }
}
/*
export class BildirimGrubu {

    emailMetni:string;
    smsMetni:string;
    alici:Array<Alici>;
    ekTip:EmailEkTipi;
    bildirimYont:BildirimYontemi;
    mesajSayisi:number;
    mesajKarakter:number;

    constructor(emailMetni:string, smsMetni:string, alici:Array<Alici>, ekTip:EmailEkTipi, bildirimYont:BildirimYontemi, mesajSayisi:number,mesajKarakter:number) {
        this.emailMetni = emailMetni;
        this.smsMetni = smsMetni;
        this.alici = alici;
        this.ekTip = ekTip;
        this.bildirimYont = bildirimYont;
        this.mesajSayisi = mesajSayisi;
        this.mesajKarakter = mesajKarakter;
    }
}
*/
export class Tetikleyici {
    tetikleyiciAdi:string;
    aciklama:string;
    tetikleyiciIcerik:TetikleyiciTipi;
    durum:boolean;
    //bildirimGrubu:BildirimGrubu;
    notificationGroup:NotificationGroup;
    tip:TetikleyiciTipi;
    bildirimEkle:boolean;

    constructor(tetikleyiciAdi:string, aciklama:string, tetikleyiciIcerik:TetikleyiciTipi, durum:boolean, notificationGroup:NotificationGroup, tip:TetikleyiciTipi, bildirimEkle:boolean) {
        this.tetikleyiciAdi = tetikleyiciAdi;
        this.aciklama = aciklama;
        this.tetikleyiciIcerik = tetikleyiciIcerik;
        this.durum = durum;
        this.notificationGroup = notificationGroup;
        this.tip = tip;
        this.bildirimEkle = bildirimEkle;
    }
}
export class Sorgu {
    _id:string;
    userName:string;
    anaSorgu:string;
    aciklama:string;
    altSorguList:Array<string>;
    tetikleyici:Tetikleyici;
    sName:string;

    constructor(id:string, username:string, anaSorgu:string, aciklama:string, altSorguList:Array<string>, tetikleyici:Tetikleyici, sName:string) {
        this._id = id;
        this.userName = username;
        this.anaSorgu = anaSorgu;
        this.aciklama = aciklama;
        this.altSorguList = altSorguList;
        this.tetikleyici = tetikleyici;
        this.sName=sName;
    }
}