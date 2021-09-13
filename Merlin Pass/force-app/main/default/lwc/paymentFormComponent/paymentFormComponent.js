import { LightningElement, track, api} from 'lwc';
import generatePass from '@salesforce/apex/AttractionsController.generatePass';
import { NavigationMixin } from 'lightning/navigation';
export default class PaymentFormComponent extends NavigationMixin(LightningElement) {
    @api contactId;
    @api grossPrice;
    @api discount;
    @api netPrice;
    @api attractionList=[];
    @track showOTP = false;

    showOTPField() {
        this.showOTP = true;
    }

    handleSuccess(event) {
        let payId = event.detail.id;
        generatePass({conId : this.contactId, paymentId: payId, 
            listOfAttraction : this.attractionList}).then(result => {
                console.log(result);
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: result,
                        objectApiName: 'Pass__c', // objectApiName is optional
                        actionName: 'view'
                    }
                });
            })
            .catch(error => {
                console.log(error);
                this.error = error;
            });
    }
}