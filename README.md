# Project_Cats
집사님들을 위한 킹냥이 웹앱 😺

# Catchoo (In Progress)
Web App for Cat Lovers.

[catchoo.netlify.app](catchoo.netlify.app)

<br />

## Team Members
- This project is being developed by (2) Front-end engineers and (2) Back-end engineers, gathered via Korean developers' online community - OKKY.kr.
- Project started on 03/30/21.
- Tool decision, task distribution, debugging, etc. discussed every day via Slack. Weekly zoom meetings held for deeper discussion and catch-up.
- **Front-end**: HS, HR
- **Back-end**: HY, SH <br />

## Functionalities
1. Track Weight of Your Cats
- Set your cat's goal weight!
- Measure and record your cat's weight every day to track it in graphs or tables.
- Your cat's age is automatically calculated with its birthdate.

2. Registration Made Easy
- Register as a user using a regular or social login (Kakao, Naver) option!

3. Share Your Stories with Other Cat Lovers
- Post any stories and photos you want to share with other users.
- Whether it be to show off your cat's beauty or to ask questions, this app is here for you! <br />

## Tech Stack
- Front-end: React + Redux (State Management) + Redux-Saga (Async Actions Management)
- Back-end: SpringBoot + MariaDB

#### General
- Implemented RESTful Routes <br/>

#### Front-end
- **React** used to optimize rerendering and app performance.
- **React-Hooks** used to implement states and life cycle methods while using functional components for reusable and simple codes.
- **React-Router** used to manage routes and links.
- **Redux** used to centralize the states and logics of the app and to manage them easily.
- **Redux-Saga** used to manage asynchronous action flows.
- **JWT** used to ensure scalability with a potential increase in the number of users.
- Other Settings
  * _immer_ to ensure immutability of states.
  * _Axios_ to handle HTTP requests based on promises.
  * _qs_ to parse query strings.
  * _Styled-component_ to style components without triggering unnecessary rerenders.
  * _React-Slick_ to create image carousels.
  * _Recharts_ to create charts.
  * _Font-Awesome_  to use various icons.

#### Back-End
- Spring Boot + Gradle + Java + MariaDB
- Swagger UI is implemented for better communication using APIs with Front-end team.

#### Deployment
- Front-end server *temporarily* deployed on Netlify.
- Back-end server *to be* deployed on AWS
