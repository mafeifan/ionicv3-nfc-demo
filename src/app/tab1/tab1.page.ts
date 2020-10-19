import {Component} from '@angular/core';
import {NFC, Ndef} from '@ionic-native/nfc/ngx';
import { Platform, AlertController, ToastController} from '@ionic/angular';

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
        // Read NFC Tag - Android
        // Once the reader mode is enabled, any tags that are scanned are sent to the subscriber
        // tslint:disable-next-line:no-bitwise
        // const flags = this.nfc.FLAG_READER_NFC_A | this.nfc.FLAG_READER_NFC_V;
        // this.readerMode$ = this.nfc.readerMode(flags).subscribe(
        //     tag => {
        //       console.log(JSON.stringify(tag));
        //       alert(JSON.stringify(tag));
        //     },
        //     err => {
        //       this.errorResult = 'Error reading tag';
        //       console.log('Error reading tag', err);
        //     }
        // );
    }

     addListenNFC() {
        console.log('addListenNFC');

        this.nfc.addNdefListener( () => {
            console.log('successfully attached ndef listener');
        }, async (err) => {
            console.log('error attaching ndef listener', err);

            const toast = await this.toastController.create({
                message: err,
                duration: 1000,
                position: 'bottom'
            });

            toast.present();

        }).subscribe(async (event) => {
            console.log('received ndef message. the tag contains: ', event.tag);
            console.log('decoded tag id', this.nfc.bytesToHexString(event.tag.id));
            this.tagId =  event.tag;
            const toast = await this.toastController.create({
                message: this.nfc.bytesToHexString(event.tag.id),
                duration: 1000,
                position: 'bottom'
            });

            toast.present();
        });
    }
}
