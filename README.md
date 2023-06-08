# Talker - A MERN and Socket IO Chatting Web App (in Progress)

Demo :- https://talker-chat-app.netlify.app/

Talker is a web application built with the MERN stack (MongoDB, Express, React, Node.js) and used Socket-IO that allows users to chat with each other in real-time. This repository contains the source code for both the frontend and the backend of the application.

![Screenshot 2023-03-02 154607](https://user-images.githubusercontent.com/98007961/222409827-a4ea90e4-041f-4eb9-bb7e-91901283e8c6.png)

![Screenshot 2023-03-02 154518](https://user-images.githubusercontent.com/98007961/222409998-162d084e-5e0c-44d3-b3ca-46b15c404aca.png)

![Screenshot 2023-03-02 154627](https://user-images.githubusercontent.com/98007961/222410201-5a4ceb5b-26f8-4a9e-b4d3-0927b2a97fdf.png)



## Current Active Features

* Users can create an account, login, and logout.
* Users can join and leave chat rooms.
* Users can send messages to chats and receive messages in real-time.
* Users can view the list of online friends.
* Users can view their chat history.
* A clean UI of the app.



## Installation

1. Fork the repo and then clone the repo from github (Note main branch is frontend and server branch is the backend)

```bash
git clone https://github.com/yourusername/talker.git
```

2. Install the npm packages in both the frontend and backend root folders

```bash
npm i
```

3. Create a .env file in the backend folder and add the following variables:

```makefile
DB_URL = <LOCAL DATABASE OR YOUR CLUSTER ADDRESS>

CLIENT_URL = <YOUR CLIENT RUNNING ADDRESS>
```

4. Create a config.js file in src/config in fronted folder and add the following code:

```javascript
export const host = "<YOUR SERVER RUNNING ADDRESS>"
```

5. Start the server in the root backend folder

```bash
node index.js
```

6. Start the client in root frontend folder:

```bash
npm run start
```


## Advices or Helps in the project

You are free to advice any better changes or new features in the web app. Since it is not completely built and is in progress and hence many of its features would be live once its completed.

