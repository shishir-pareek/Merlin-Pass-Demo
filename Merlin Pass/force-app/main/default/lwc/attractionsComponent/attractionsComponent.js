import { LightningElement, wire } from 'lwc';
import getAttractions from '@salesforce/apex/AttractionsController.getAttractions';
export default class AttarctionsComponent extends LightningElement {
    @wire(getAttractions) 
    listOfAttractions;
}