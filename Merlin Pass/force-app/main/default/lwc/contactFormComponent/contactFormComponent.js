import { LightningElement } from 'lwc';

export default class ContactFormComponent extends LightningElement {
    handleSuccess(event) {
        this.dispatchEvent(new CustomEvent('movetopayments', {
            detail:{showcontactform:false, contactid : event.detail.id}
        }));
    }

    handleSubmit(event) {
        console.log('submitted');
    }
}