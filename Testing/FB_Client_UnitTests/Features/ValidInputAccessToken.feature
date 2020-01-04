Feature: Test
    
    @APITest1
  Scenario: Valid access Token & Valid Signed Request
    Given I send a Request With BothValid Input
   Then  I get Response For ValidInput
    #
    #@APITest1
  #Scenario: Invalid access Token & Valid Signed Request
    #Given I send a Request With InvalidAccessToken Input
    #Then  I get Response For InvalidInputs
   #
   #@APITest1
  #Scenario: valid access Token & InValid Signed Request
    #Given I send a Request With InvalidSignedRequest Input
    #Then  I get Response For InvalidInputs
    #
    #@APITest1
  #Scenario: Invalid access Token & InValid Signed Request
    #Given I send a Request With BothInvalid Input
    #Then  I get Response For InvalidInputs
   
   

		
