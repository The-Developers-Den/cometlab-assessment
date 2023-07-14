# Commetlab Assessment

This repo contains some basic apis which does the following functionalities -

- Role-based authentication system for admin and participants.
- Create a middleware to differentiate admins from participants.
- A set of APIs for the admin to add, edit or delete the question.
- Storing questions in the DB.
- A set of APIs for the admin to add test cases to a question.
- An API that takes the solution from the user for a particular question.

## How to setup

For the backend folder

1. Clone the project by and go to server folder<br>

```
git clone https://github.com/The-Developers-Den/cometlab-assessment.git
cd server
```

2. Make an env file and add your credentials

```
//In .env
PORT = 'Any Port...'
MONGO_ATLAS_PW= 'Your Mongodb Key...'
JWT_KEY = 'Your jwt private key...'
ACCESS_TOKEN = 'Your sphere-engine access token'
ENDPOINT ="Your sphere-engine endpoint token"
```

3. Install packages

```
npm i
```

3. Run server

```
npm run start
```

> Postamn docs can be accessed from [here](https://www.postman.com/navigation-observer-59279834/workspace/public-workspace/collection/23083258-d874e954-2c51-4eff-96e0-b51719d868af?action=share&creator=23083258)

## Functionalities

### 1. Authentication

1.1 Creating new User using bcrpyt <br>

![new-user](assets/signup.png)
![new-user](assets/signup1.png)

1.2 Login with help of bcrpyt & jwt <br>

![login-user](assets/login.png)

> Entering wrong password

![login-user-wrong](assets/login-wrong.png)

### 2. Problems

2.1 Checking middleware for CRUD functionality <br>

![addauth-user](assets/checkauth.png)

2.2 Getting all questions <br>

![addauth-user](assets/get-all-q.png)

2.3 Getting a question with help of id <br>

![addauth-user](assets/get-p-q.png)

2.4 Create a new question <br>

![addauth-user](assets/create-q.png)

2.5 Create a testcase question <br>

![addauth-user](assets/create-test.png)

2.6 Get all testcases for a question <br>

![addauth-user](assets/all-test.png)

2.7 Get particular testcase for a question <br>

![addauth-user](assets/p-testcase.png)

2.8 Edit a testcase <br>

![addauth-user](assets/edit-t.png)

2.9 Edit a question <br>

![addauth-user](assets/edit-q.png)

2.10 Delete a question <br>

![addauth-user](assets/del-q.png)

### 3. Submissions

3.1 Create a submisson <br>

![addauth-user](assets/create-sub.png)

3.2 Get submisson results <br>

![addauth-user](assets/sub-r.png)
