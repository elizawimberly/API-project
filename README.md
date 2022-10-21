# worldBNB

## An airBnB clone by Eliza Wimberly

---

### Live site link :

https://airbnbprojecteliza.herokuapp.com/

---

## Technologies Used:

---

![image](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![image](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![image](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![image](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![image](https://img.shields.io/badge/sequelize-323330?style=for-the-badge&logo=sequelize&logoColor=blue)
![image](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)
![image](https://img.shields.io/badge/react%20os-0088CC?style=for-the-badge&logo=reactos&logoColor=white)
![image](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![image](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![image](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)

---

## Site Features:

A splash page that allows the user to navigate to different spots and a navigation bar that is present throughout the app which allows the user to log in, log out, or create a spot, or navigate back to the splash page by clicking the logo at the top right.

![images](/authenticate-me/images/splashpage.png)

When a user clicks on a specific spot on the splash page, they are shown a spot details page with information about that specific spot, along with the option to delete or edit that spot if the logged in user is also the owner of that spot.

![images](/authenticate-me/images/spotdetails.png)

At the bottom of the spot details page are reviews for that spot, with the option to delete a review if the user is the author of that specific review. If the user has posted a review they are not given the option to add another review. Otherwise the user can post a review if they are not the owner of the spot.

![images](/images/reviews.png)

There are two modals accessible from the navigation bar - log in and sign up - if the user is not currently logged in. Once logged in, the user is show the option to post a spot by clicking 'Become A Host!' which will show the form to post a new spot.

![images](/authenticate-me/images/modal.png)
![images](/authenticate-me/images/form.png)

---

## Future Features:

- Get all reviews of a user
- Edit a review
- Get all user's bookings
- Get all bookings for a spot
- Create a booking
- Edit a booking
- Delete a booking
- Delete a spot image
- Delete a review image
- Post a review image
- Edit a spot image

## Directions for running the app locally:

- clone repo from https://github.com/elizawimberly/API-project
- run <code>npm install</code> from the root of the backend folder and the frontend folder to install the 2 dependancy packages.
- run <code>npx dotenv sequelize db:migrate</code> from the root of the. backend folder to create the database tables
- run <code>npx dotenv sequelize db:seed:all</code> from the root of the backend folder to seed the database.
- run npm start from the root of the backend folder and the root of frontend folder

---

### [Contact Me](elizawimberly@gmail.com)
