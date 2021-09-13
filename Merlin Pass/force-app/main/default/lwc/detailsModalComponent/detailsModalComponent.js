import { LightningElement,track, api } from 'lwc';

export default class DetailsModalComponent extends LightningElement {
    @api grossTotalPrice;
    @api netTotalPrice;
    @api discountApplied;
    @api listOfAttr = [];
    @track showContactForm;
    @track contactId;
    @track showPaymentForm = false;
    connectedCallback() {
        this.showContactForm = true;
    }
    closeModal() {
        //do modal close stuff
        this.dispatchEvent(new CustomEvent('closemodalwindow'));
    }

    handleMoveToPayment(event) {
        console.log('coming here');
        console.log(event.detail.showcontactform);
        console.log(event.detail.contactid);
        this.showContactForm = event.detail.showcontactform;
        this.contactId = event.detail.contactid;
        this.showPaymentForm = true;
    }
}