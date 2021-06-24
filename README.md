# GuitAR (Backend)

GuitAR is an web app which projects the chords for any song from our wide selection on to user's guitar on their screen so that all they have to do is press the highlighted strings to play the song.

This is the backend for GuitAR.

## Installation

### Fork

Create your own copy of the project on GitHub. You can do this by clicking the Fork button  on the top right corner of the landing page of the repository.

### Clone

Note: For this you need to install [git](https://git-scm.com/downloads) on your machine

```bash
$ git clone https://github.com/YOUR_GITHUB_USER_NAME/GuitAR-Backend
```
where YOUR_GITHUB_USER_NAME is your GitHub handle.

### Setup .env file
1. Add .env file at ```src/``` using ```mkdir .env```
2. Add your mongoDB Atlas Password below
```
MONGODB_PASSWORD = YOUR_MONGODB_PASSWORD_HERE
```
### Build Database
Build database using scrapping script ![here](https://github.com/prathameshbhalekar/GuitAR-scrapping)
### Run the app

Now you can run GuitAR React application by following the steps below:

1. install dependencies by running the command below

```
$ npm install
```

2. run the app using the command below

```
$ npm start
```
3. go to the browser on http://localhost:9000/
