public with sharing class AttractionsController {
    @AuraEnabled(Cacheable=true)
    public static List<AttractionsWrapper> getAttractions(){
        List<AttractionsWrapper> listOfAttractionsWrapper = new List<AttractionsWrapper>();
        AttractionsWrapper attrWrapperObj;
        try {
            List<Attraction__c> listOfAttractions = [SELECT Id, Name, Description__c,Address__c, 
            Location_Image__c, Location__c, Price__c,Short_Description__c FROM Attraction__c];
            for(Attraction__c attr : listOfAttractions) {
                attrWrapperObj = new AttractionsWrapper();
                attrWrapperObj.attractionObj = attr;
                attrWrapperObj.isSelected = false;
                listOfAttractionsWrapper.add(attrWrapperObj);
            }
            return listOfAttractionsWrapper;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Id generatePass(Id conId, Id paymentId, List<Attraction__c> listOfAttraction){
        try {
            AttractionPass__c junctionAttrPass;
            List<Pass__c> listOfPassToInsert = new List<Pass__c>();
            List<AttractionPass__c> listOfAttractionPass = new List<AttractionPass__c>();
            Pass__c passToInsert = new Pass__c();
            passToInsert.Customer__c = conId;
            passToInsert.Payment__c = paymentId;
            listOfPassToInsert.add(passToInsert);
            if(!listOfPassToInsert.isEmpty()){
                insert listOfPassToInsert;
            }
            
            if(!listOfAttraction.isEmpty()) {
                for(Attraction__c attr : listOfAttraction) {
                    junctionAttrPass = new AttractionPass__c();
                    junctionAttrPass.Attraction__c = attr.Id;
                    junctionAttrPass.Pass__c = passToInsert.Id;
                    listOfAttractionPass.add(junctionAttrPass);
                }
            }
            if(!listOfAttractionPass.isEmpty()) {
                insert listOfAttractionPass;
            }
            return passToInsert.Id;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    class AttractionsWrapper {
        @AuraEnabled
        public Attraction__c attractionObj{get;set;}
        @AuraEnabled
        public Boolean isSelected{get;set;}
    }
}