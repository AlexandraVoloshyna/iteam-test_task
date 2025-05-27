# JobSearch Application

A modern job search application built with Next.js 14, Tailwind CSS, and Express.js. Search for jobs, save favorites, and receive personalized job recommendations based on your profile.

## Features

- Search for jobs by title, company, or keywords
- View detailed job descriptions
- Save favorite jobs for later review
- Create a profile to receive personalized job recommendations
- User authentication with email and password

## Tech Stack

### Frontend
- Next.js 14 with TypeScript
- Tailwind CSS for styling
- Formik and Yup for form handling and validation
- Axios for API requests
- SWR for data fetching and caching

### Backend
- Express.js for the API server
- MongoDB for database storage
- JWT for authentication
- Mongoose for database modeling


## Getting Started

### Prerequisites

- Node.js 18 or later
- MongoDB 
- RapidAPI key for JSearch API

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AlexandraVoloshyna/iteam-test_task.git
   ```

2. Install dependencies:
   ```bash
   npm install:all
   ```

3. Create a `.env` file in the clint directory:
   

4. Create a `.env` file in the server directory:
  

### Running the Application



1. Run the following command from the root of the project:
   ```bash
   npm run dev 
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

