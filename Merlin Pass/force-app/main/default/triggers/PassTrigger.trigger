trigger PassTrigger on Pass__c (after Insert) {
    if(Trigger.isAfter && Trigger.isInsert) {
        PassTriggerHandler.afterInsert(Trigger.New);
    }
}