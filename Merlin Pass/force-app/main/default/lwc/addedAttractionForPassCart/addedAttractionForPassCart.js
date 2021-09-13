import { LightningElement, wire, track } from 'lwc';
import {subscribe,unsubscribe,MessageContext} from "lightning/messageService";
import BASKET_CHANNEL from "@salesforce/messageChannel/AddToBasketMessageChannel__c";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const actions = [
    { label: 'Delete', name: 'delete' },
];
export default class AddedAttractionForPassCart extends LightningElement {
    @track listOfAttractionAdded=[];
    @track openModal = false;
    @track showBuyNow = false;
    @wire(MessageContext)
    messageContext;
    @track totalPrice = 0;
    @track discount = 0;
    @track netPrice = 0;
    subscription = null;
    columns = [
        { label: 'Name', fieldName: 'Name', type: 'text'},
        { label: 'Price', fieldName: 'Price__c', type: 'currency'},
        {
            type: 'action',
            typeAttributes: { rowActions: actions },
        },
    ];

    connectedCallback(){
        console.log("in handle subscribe");
        this.subscribeToMessageChannel();
    }

    disconnectedCallback() {
        handleUnsubscribe();
    }

    subscribeToMessageChannel() {
        console.log("in handle subscribe");
        if (this.subscription) {
            return;
        }

        this.subscription = subscribe(
        this.messageContext,
        BASKET_CHANNEL,
        (message) => {
            this.handleMessage(message);
        });
    }

    handleMessage(message) {
        if(message.record.attractionObj != null && message.record.attractionObj != undefined) {
            if(this.listOfAttractionAdded.find(element=>element.Id === message.record.attractionObj.Id) === undefined) {
                if(this.listOfAttractionAdded.length === 5) {
                    const evt = new ShowToastEvent({
                        title: 'Error',
                        message: 'Cannot add more than 5 attractions. Please remove any one then try to add',
                        variant: 'error',
                        mode: 'dismissable'
                    });
                    this.dispatchEvent(evt);
                } else {
                    this.listOfAttractionAdded = [...this.listOfAttractionAdded, message.record.attractionObj];
                    this.totalPrice += message.record.attractionObj.Price__c;
                    if(this.listOfAttractionAdded.length > 0) {
                        this.showBuyNow = true;
                    }
                    if(this.listOfAttractionAdded.length == 2) {
                        this.discount = this.totalPrice*(3/100);
                        this.netPrice = this.totalPrice*(1-(3/100));
                    } else if(this.listOfAttractionAdded.length == 3) {
                        this.discount = this.totalPrice*(5/100);
                        this.netPrice = this.totalPrice*(1-(5/100));
                    } else if(this.listOfAttractionAdded.length == 4){
                        this.discount = this.totalPrice*(7.5/100);
                        this.netPrice = this.totalPrice*(1-(7.5/100));
                    } else if(this.listOfAttractionAdded.length == 5){
                        this.discount = this.totalPrice*(10/100);
                        this.netPrice = this.totalPrice*(1-(10/100));
                    } 
                }
            } else {
                const evt = new ShowToastEvent({
                    title: 'Error',
                    message: 'Element Already Present',
                    variant: 'error',
                    mode: 'dismissable'
                });
                this.dispatchEvent(evt);
            }
        }
    }

    handleUnsubscribe() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch (actionName) {
            case 'delete':
                this.deleteRow(row);
                break;
            default:
        }
    }

    deleteRow(row) {
        const { id } = row;
        const index = this.findRowIndexById(id);
        if (index !== -1) {
            this.listOfAttractionAdded = this.listOfAttractionAdded
                .slice(0, index)
                .concat(this.listOfAttractionAdded.slice(index + 1));
            this.totalPrice = 0;
            this.listOfAttractionAdded.forEach(element => this.totalPrice += element.Price__c);
            if(this.listOfAttractionAdded.length == 0) {
                this.showBuyNow = false;
            }
            if(this.listOfAttractionAdded.length == 2) {
                this.discount = this.totalPrice*(3/100);
                this.netPrice = this.totalPrice*(1-(3/100));
            } else if(this.listOfAttractionAdded.length == 3) {
                this.discount = this.totalPrice*(5/100);
                this.netPrice = this.totalPrice*(1-(5/100));
            } else if(this.listOfAttractionAdded.length == 4){
                this.discount = this.totalPrice*(7.5/100);
                this.netPrice = this.totalPrice*(1-(7.5/100));
            } else if(this.listOfAttractionAdded.length == 5){
                this.discount = this.totalPrice*(10/100);
                this.netPrice = this.totalPrice*(1-(10/100));
            } 
        }
    }

    findRowIndexById(id) {
        let ret = -1;
        this.listOfAttractionAdded.some((row, index) => {
            if (row.id === id) {
                ret = index;
                return true;
            }
            return false;
        });
        return ret;
    }

    handleClick(){
        this.openModal = true;
    }

    handleCloseModal() {
        console.log('coming in handle Modal Closed');
        this.openModal = false;
    }
}