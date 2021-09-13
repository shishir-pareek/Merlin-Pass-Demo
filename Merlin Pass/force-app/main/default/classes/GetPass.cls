@RestResource(urlMapping = '/GetPassDetails')
global class GetPass {
    @HttpPost 
    global static Pass__c getPassData(String mailOrPhoneNumber)
    {
        Pass__c passToReturn = [SELECT Id,Name,Order_Date__c, Date_Of_Travel__c, Customer__r.Name,
        Customer__r.Email, Customer__r.Age__c, Customer__r.MobilePhone, Expected_Weather__c 
        FROM Pass__c
        WHERE Customer__r.Email = :mailOrPhoneNumber OR Customer__r.MobilePhone =: mailOrPhoneNumber];
        return passToReturn;
    }
}