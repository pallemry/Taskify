# Taskify
A website were you can write code, run it and test it!
It's essentialy a sandbox and.
It also offers log in so you can save your work and come back to edit it again!

# Client
## Installation
Run the following commands: 
```zsh
cd client/
npm i -f
```

## Running - Client
On .../client run:
```zsh
npm run vite
```

# Server
## Installation & Setup
Run the following commands: 
```zsh
cd server/
npm i -f
```
Afterwards, in order to connect to a database you'll have to set up one of your own. To do so you'll have to replace the contents of the [config file](https://github.com/pallemry/Taskify/blob/master/server/firebaseConfig.ts) with your own configuration. On information about how to obtain this configuration please check: https://firebase.google.com/docs/web/learn-more#config-object, and follow its steps.

## Running
On .../server run:
```zsh
npm run dev
```
