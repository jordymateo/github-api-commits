# Github API Commits

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
This project is simple Github API consumer. The project is separated into two projects, the back-end (NestJs) used to request the Github API and the front-end (ReactJs) used to display the requested information. The information displayed is simple information about the repository and the list of commits made from the beggining using a pagin component.
	
## Technologies
Project is created with:
* React version: 18.2
* NestJs version: 9.0.0
* Typescript version: 4.4.2 (Client) & 4.7.4 (Server)
	
## Setup
To run this project, install it locally using yarn:

> Note: Consider that you have to run two different projects, therefore each project should be run using a different console window and you should start executing the commands from the root folder of the project "_**/github-api-commits**_".

1. Getting started with the back-end (NestJs)
```
$ cd server
$ yarn install
$ yarn start
```

2. Next, the front-end (ReactJs)
```
$ cd client
$ yarn install
$ yarn start
```
