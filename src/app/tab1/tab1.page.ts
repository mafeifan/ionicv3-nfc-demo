import {Component} from '@angular/core';
import {NFC, Ndef} from '@ionic-native/nfc/ngx';
import {Platform, AlertController, ToastController} from '@ionic/angular';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
    readerMode$ = null;
    result = null;
    errorResult = null;
    tagId: any;

    constructor(
        public platform: Platform,
        private nfc: NFC,
        private alertCtrl: AlertController,
        public toastController: ToastController,
    ) {
        this.platform.ready().then(() => {
            this.addListenNFC();
        });
    }

    addListenNFC() {
        console.log('addListenNFC');
        // Read NFC Tag - Android
        // Once the reader mode is enabled, any tags that are scanned are sent to the subscriber
        // tslint:disable-next-line:no-bitwise
        const flags = this.nfc.FLAG_READER_NFC_A | this.nfc.FLAG_READER_NFC_V;
        this.nfc.readerMode(flags).subscribe(
            tag => {
                this.tagId = JSON.stringify(tag);
                console.log('received ndef message. the tag contains: ', tag);
                console.log(JSON.stringify(tag));
            },
            err => console.log('Error reading tag', err)
        );
    }
}
