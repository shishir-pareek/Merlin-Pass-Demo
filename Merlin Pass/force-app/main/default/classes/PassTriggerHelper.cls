public with sharing class PassTriggerHelper {
    public static List<Payment__c> updatePayment(List<Pass__c> listOfPasses) {
        Set<Id> setOfIds = new Set<Id>();
        Map<Id,Pass__c> mapOfPaymentIdToPass = new Map<Id,Pass__c>();
        for(Pass__c passObj : listOfPasses) {
            mapOfPaymentIdToPass.put(passObj.Payment__c, passObj);
        }
        List<Payment__c> listOfPayments;
        if(!mapOfPaymentIdToPass.isEmpty()) {
            listOfPayments = [SELECT Id, Pass__c FROM Payment__c WHERE Id =: mapOfPaymentIdToPass.keySet()];
        }
        if(!listOfPayments.isEmpty()) {
            for(Payment__c pay : listOfPayments) {
                pay.Pass__c = mapOfPaymentIdToPass.get(pay.Id).Id;
            }
            update listOfPayments;
        }
        return listOfPayments;
    }
}