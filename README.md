# Incident Reporting System

## Description

The Incident Reporting System is a Node.js application for managing incident reports for insurance clients. It allows users to submit incident reports with details such as description, city, and country, and integrates with an external weather API to fetch weather data for each incident. The system provides endpoints for creating, retrieving, and filtering incident reports.

## Features

- Submit new incident reports
- Retrieve incident reports by country
- Filter incident reports by city, temperature range, and humidity
- ...

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- OpenWeatherMap API
- Mocha and Chai for testing

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Joshua-png/Incident-Reporting.git
   ```

2. **PostgreSQL server:**

   Run or install a local PostgreSQL server to have the ability to run tests on this project.

3. **Install dependencies:**

   ```bash
   cd Incident-Reporting
   npm install
   ```

4. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following variables:

   ```
   PORT = PORT
   NODE_ENV = NODE_ENV
   DB_URL=postgres://username:password@hostname/databaseName
   OPENWEATHERMAP_API_KEY= OPENWEATHERMAP_API_KEY
   ```

   Replace `username`, `password`, and `OPENWEATHERMAP_API_KEY` with your PostgreSQL credentials when deployed on render and OpenWeatherMap API key.

5. **Set up environment variables for test:**

   Create a `.env.test` file in the root directory and add the following variables:

   ```
   PORT = port
   NODE_ENV = test
   OPENWEATHERMAP_API_KEY= OPENWEATHERMAP_API_KEY
   DB_USERNAME_TEST=username
   DB_PASSWORD_TEST=password
   DB_HOST_TEST=host
   DB_PORT_TEST=dbport
   ```

   Replace `username`, `password`,  `OPENWEATHERMAP_API_KEY`,`host`, `dbport` with your PostgreSQL credentials from your local Postgres.

6. **Run tests:**

    Run this command once and then use the other whenever you want to run tests

   ```bash
   npm run test:setup
   ```

   after
   ```bash
   npm run test
   ```

7. **Start the server:**

   ```bash
   npm start / npm run dev
   ```

8. **Access the application:**

   The application will be running at `http://localhost:3000`.

9. **Access the application online:**

   The application will be running at  [https://incident-reporting.onrender.com](https://incident-reporting.onrender.com/)
   

## Usage

1. **Create a new incident report:**

   Send a POST request to `/api/v1/incidents` with the following JSON payload:

   ```json
   {
     "incident_desc": "Description of the incident",
     "city": "City Name",
     "country": "Country Name"
   }
   ```

2. **Retrieve all incident reports by country:**

   Send a POST with a body contain the countryName request to `/api/v1/incidents`.

3. **Filter incident reports:**

   You can filter incident reports by appending query parameters to the endpoint:

   - `/api/v1/incidents?city=CityName`
   - `/api/v1/incidents?temperature_max=temp_max&temperature_min=temp_min`
   - `/api/v1/incidents?humidity=humidity`


