starting time -> 12:15AM - 09/30/2026

 based on the requirement image it seems a mono repo need to be created but not a monalythic architecture
 in the server file i will create an architecture that includes HEXAGONAL architecture with DDD. I will go with TDD. so that i can test the expected unit test cases after the development.
  in hexagonal architecture it comes with ports and adapters but in this case i will call it interfaces and routes


ok so i created client folder and server folder with read me inside

inside the server folder i will put down DDD + hexagonal + TDD folder structure 
presentation folder(layer) to be a presentater that takes in requests
application layer to tell the use case such as in this case "create a task"
domain layert to tell the business principles here such as "if there is already a task with the same purpose(name) then dont create(return) the same again" 
infrastructure layer to perform the database queries such as "save the task in the database" - by the way i am going to use local mongo db inside the /todos db

the common route has the /api/todos 
and then the and scopes are in application layer


presentation layer -> application layer -> ingrastructure interface <- infrastructure

i am going to use AI to generate test cases for these following conditions. 
1. CRUD operation for TODO
2. can we mark the the TODO as done and back to todo.
3. blank title
 in the domain layer

 going to add small api documentation. used ai for this.

 we are going to now create the front end
 very simple react + TS atimic architecture based redux saga atchitecture

 for the css styling it very tedios used ai tools to get it right

 i could use zod for validation for this one kept it simple

 



