import { LightningElement, api, track } from 'lwc';

export default class AttractionDetailComponent extends LightningElement {
    @api attractionObjDetails;
    @track mapMarkers;
    connectedCallback() {
        this.mapMarkers = [{
            location: {
                Latitude: this.attractionObjDetails.attractionObj.Location__c.latitude,
                Longitude: this.attractionObjDetails.attractionObj.Location__c.longitude
            },
            title: this.attractionObjDetails.Address__c
        }];
    }
    closeModal() {
        //do modal close stuff
        this.dispatchEvent(new CustomEvent('close'));
    }
}