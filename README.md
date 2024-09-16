This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


# Netflix

This is a fully responsive full-stack Netflix application built using **Next.js** for the frontend and **NestJS** for the backend. The app mimics Netflix's core features like user authentication, movie listings, favorites, and more.

## Features

### Frontend
- **Home Page**:
  - Displays a list of movies and series.
  - Each movie card shows a blurred effect on hover with visible movie info and action buttons.
- **Authentication**:
  - **Login/Signup Page** located at `/auth`. 
  - User registration and login with backend auth services
- **Favorites**:
  - Authenticated users can add movies to their favorites.
  - A **My List** page shows all the user's favorite movies with a minus icon to remove from the list.
- **Responsive Design**:
  - Includes a mobile menu with navigation links to Home, Series, Movies, New & Popular, and My List.
  - Responsive footer with a link to the developer's GitHub.
  
### Backend
- **Authentication**:
  - Built with NestJS, allowing users to register and login.
  - Passwords are hashed for security.
  - JSON Web Token (JWT) used for authorization and stored in localStorage on successful login.
- **MongoDB Integration**:
  - MongoDB Atlas is used as the database for managing users and their favorite movies.
  - The Mongoose ODM (Object Data Modeling) library is used for defining schemas and interacting with MongoDB.
  
### Third-Party API
- **OMDb API**:
  - Fetches movie and series data based on user input or hardcoded requests.

## Deployment Links (Frontend)
- https://netflix-rust-kappa.vercel.app/
- https://netflix-parvsharmaas-projects.vercel.app/
- https://netflix-git-main-parvsharmaas-projects.vercel.app/ 

## Setup Instructions

### Installation

1. **Clone the repository**

2. **Frontend Setup**:
   1. Navigate to the frontend directory, install dependencies then run it locally.
   2. Access via deployed links.

3. **Backend Setup**:
   1. Navigate to the backend directory:
   2. Install dependencies
   4. Run the backend server

### MongoDB Atlas Connection
This project uses MongoDB Atlas as the Database.

### Running the Project

1. Ensure that both the **frontend** and **backend** are running.
2. Open the frontend at `http://localhost:3000`.
3. The backend runs at `http://localhost:8080`.

### Authentication

- **POST** \`/api/auth/register\`: Register a new user.
- **POST** \`/api/auth/login\`: Login and receive a JWT token and user details.

## Future Improvements

- **Search functionality** for movies and series.
- **Improved error handling** on the backend.
- **Profile management** for users.

## Author
Developed by [Parv Sharma](https://github.com/parvsharmaa) 🚀


## Screenshots

### Home with dynamic Billboard
<img width="1679" alt="Screenshot 2024-09-16 at 7 48 59 PM" src="https://github.com/user-attachments/assets/1fd9472d-1336-4ba8-9a29-5172e84a67c6">

### Customize your List (Favourites)
<img width="1679" alt="Screenshot 2024-09-16 at 8 03 52 PM" src="https://github.com/user-attachments/assets/96feac12-820d-414c-acab-d58f35e4bbf2">

### Browse from different Genres
<img width="1679" alt="Screenshot 2024-09-16 at 8 04 04 PM" src="https://github.com/user-attachments/assets/e68902c2-9e8a-4669-b983-b21a0e3f05f8">
