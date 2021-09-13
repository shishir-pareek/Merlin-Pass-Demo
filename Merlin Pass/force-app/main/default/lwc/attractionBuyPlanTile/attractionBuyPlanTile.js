import { LightningElement, api, track, wire } from 'lwc';
import { publish, MessageContext } from "lightning/messageService";
import BASKET_CHANNEL from "@salesforce/messageChannel/AddToBasketMessageChannel__c";
export default class AttractionBuyPlanTile extends LightningElement {
    @wire(MessageContext)
    messageContext;
    @api attractionDetails;
    @track openModal = false;
    @track listOfAttractionsAdded = [];
    handleClick(){
        this.openModal = true;
    }

    handleModalClosed() {
        this.openModal = false;
    }

    addAttractionToPass() {
        let message = {
            record : this.attractionDetails
        };
        publish(this.messageContext, BASKET_CHANNEL, message);    
    }
}