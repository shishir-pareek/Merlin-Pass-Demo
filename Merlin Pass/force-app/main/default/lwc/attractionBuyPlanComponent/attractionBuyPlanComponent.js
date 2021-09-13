import { LightningElement, wire } from 'lwc';
import getAttractions from '@salesforce/apex/AttractionsController.getAttractions';
export default class AttractionBuyPlanComponent extends LightningElement {
    @wire(getAttractions) 
    listOfAttractions;
}