public with sharing class PassTriggerHandler {
    public static void afterInsert(List<Pass__c> listOfNewPassObject) {
        List<Pass__c> listOfPassToProcess = new List<Pass__c>();
        for(Pass__c passObj : listOfNewPassObject) {
            if(passObj.Payment__c != null) {
                listOfPassToProcess.add(passObj);
            }
        }
        PassTriggerHelper.updatePayment(listOfPassToProcess);
    }
}