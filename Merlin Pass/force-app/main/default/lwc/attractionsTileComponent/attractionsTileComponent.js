import { LightningElement, api, track } from 'lwc';

export default class AttractionsTileComponent extends LightningElement {
    @api attractionObject;
    @track openModal = false;
    handleClick(){
        this.openModal = true;
    }

    handleModalClosed() {
        this.openModal = false;
    }
}