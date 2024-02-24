# Social Medical Center
---

This project is a group of tools forming the digital infrastrcure of a medical center, along with a user-friendly web portal for patients, doctors and admin, following best practices in security and scalability.

This projet heavily utilises Firebase. The different backend modules include:

- Pharmacy management
- Appointments management
- Email notification scheduling
- Docker control managment API
- Authentication module (extending the basic firebase functionality)


As well as a SPA to seamlessly integrate the different module with customized views for each user role.


![signup page](docs/signup.png)

## General building blocks


![building blocks](docs/diagram.png)

The diagram above shows the general structure. There are three high level layers:
- The frontend
- The gateway
- The backend

The front-end is the user interface. It takes its credentials from the cloud provider and utilizes cloud services for storage of some user data and blob storage. References of this remote data and the rest of the services are in the backend. The backend is reachable through the gateway, as the backend has no knowledge or decisions in authentication or role-based authorization and redirections. These are done on the level of the gateway.
It checks the validity of the request credentials and role and redirects it to the appropriate backend module.
Each backend module has its own independent database schema, providing solid grouds for scalability in the future if a full microservices architecture was applied. 

This approach: 
- Isolates the different services, reducing single point failures, so any issues that
happen can be more easily located without affecting the rest of the system. 
- Offers scalability, so if there is more demand for one service multiple instances
of it can be run to satisfy the demand without having to waste resources on the
rest. Each service can also be modified independently.
- Aids continuous integration: as isolation and scalability are ensured, the deployment
process is also streamlined for each service. Updates can be pushed faster, and
new features done without messing with unrelated code.
- Is technology agnostic, as different features have unique needs, which was reflected in the technology choice shown below.

### Tools and technologies

<table>
    <caption>Table 1</caption>
    <thead>
        <tr>
            <th>Module</th>
            <th>Purpose</th>
            <th>Tool</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan=2>Database</td>
            <td>Storing generated user data</td>
            <td>Postgres</td>
        </tr>
        <tr>
            <td>Storing sensitive user data</td>
            <td>Firestore</td>
        </tr>
        <tr>
            <td>Authentication service</td>
            <td>Authenticating users and admins and supported
extension for role-based access control</td>
            <td>Firebase Auth</td>
        </tr>
        <tr>
            <td>File Storage service</td>
            <td>Stpring static images from users</td>
            <td>Firebase Cloud Storage</td>
        </tr>
        <tr>
            <td>API Gateway</td>
            <td>Reverse proxy to handle requests to multiple backends </td>
            <td>Nginx</td>
        </tr>
        <tr>
            <td>Deployment</td>
            <td>Containerization tool to handle local and future remote deployments </td>
            <td>Docker</td>
        </tr>
        <tr>
            <td>Front-end framework</td>
            <td>Enterprise level, easy to use user interface with rich components</td>
            <td>Angular</td>
        </tr>
        <tr>
            <td rowspan=3>Backend frameworks</td>
            <td>User related business logic</td>
            <td>Java Spring Boot</td>
        </tr>
        <tr>
            <td>Internal tooling logic</td>
            <td>Python with FastAPI</td>
        </tr>
        <tr>
            <td>Firebase admin tooling extension and wrapper</td>
            <td>Python with FastAPI</td>
        </tr>
    </tbody>
</table>

## Pre-requisites for deployment
- Docker
- A firebase project including
    - Firebase auth for identity management
    - Firestore for sensitive
    - Firebase storage 



## About deployment

If you are willing to use your own server, you will need to install docker on that server to run the built containers. The available configuration works out of the box for development environment.

The docker compose file has all the images configuration. For the port mappings make sure to change the running port of each corresponding service, in `application.properties` for the Spring boot module and uvicorn command for the Python modules. The Postgres database has default user and password too that have to be updated accordingly
 It is important however to change the database user, password and DB present under postgres-fyp service, you need to then update it in the source code of the four modules -Appointment Pharmacy SQLDatabasePersistence User- change in the src/main/resources/application.properties the spring.datasource.username, spring.datasource.password and spring.datasource.url (the same file for all the modules) and add your password, username and db. 
The schemas needed are not automatically created. They should be manually added.


### Firebase project 

All used services are part of the free plan.

Excluded from this repository are the Firebase setup processes.

Setup for auth:
- Password authentication and Google authenticaition.
- Password verfication.
- Password change.

Setup for Firestore:
- Store protection based on auth status and roles 
- Schema initialization
