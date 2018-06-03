## Pharmeasy assignment

## Author : Suraj Kumar Jha

This is a small app based on **react** front-end and **nodejs** backend.
The database used is a small json and lodash based transient DB called **lowdb**.

The front-end has a very simple UI and concentration has been given to the _backend_ (as I am primarily a backed engineer)

## There are three types of user

1. **Patient**
    ```Patient can view his/her prescriptions and also approve a prescription if a doctor or pharmacist has requested for the same.```
    ``Patient can also create a new Prescription``
    
2. **Doctor**
    ``Doctor can view the prescriptions which has been granted access by the patient and can request for access to those prescriptions for which he doesn't have access yet``

3. **Pharmacist**
    ``Pharmacist can view the prescriptions which has been granted access by the patient and can request for access to those prescriptions for which he doesn't have access yet``
 
## App Structure
    This is a standard express backend and react front-end web app.
    backend code is present in src/server
    front-end code is present in src/client
    unit tests are present in src/server/modules/__tests__
    (tests are currently written only for backend code)
    
    
## Running the app in development mode
    run the following commands after cloning the repo. app can be accessed at http://localhost:3000
    1. npm install
    2. npm run start:dev
    

## Running the app as a deployment
    please install docker on your machine for this to work (if not already installed)
    run the file named deploy.sh
    **sh deploy.sh**
    this command wil basically do everything. It will create a docker container, 
    install all dependencies and run the app on http://localhost:3000
    to stop the container use the following command :
    **docker stop pharmeasy-test**
    
## Running Tests
    please run the following command (facebook's JEST framework is use for automated testing)
    **npm run test**

## GENERATE DOCUMENTATION
    the docs are already generated in the out folder (using jsdoc) and can be opened by running 
    the file out/index.html in a browser.
    still, to regenerate the docs use the following command
    -- **npm run docs** --
    
## Code Quality and Standards
    eslint with airbnb base is used for maintaining code standard
    
FYI the app is deployment ready using docker. I have concentrated on the backed :). Feel free to contact me if you face any issue    