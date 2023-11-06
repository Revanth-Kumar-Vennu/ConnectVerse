# ConnectVerse
Sure, I can help you improve the installation guide in a more structured and detailed manner. Here's a revised version:

# Installation Guide for Chat App (React & Node.js)

## Requirements

Before you start, make sure you have the following software and services installed and running:

1. **Node.js**: You need Node.js to run both the server and the client. You can download and install it from [https://nodejs.org/](https://nodejs.org/).

2. **MongoDB**: MongoDB is used as the database for this application. Ensure that MongoDB is installed and running on your system. You can download MongoDB from [https://www.mongodb.com/](https://www.mongodb.com/).

## Installation Steps

Follow these steps to set up and run the Chat App project:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Revanth-Kumar-Vennu/ConnectVerse
   cd connectVerse
   ```

2. **Rename Environment Files**:

   You need to set up environment variables for the project. Rename the example `.env` files in both the `public` and `server` directories.

   In the `public` directory:

   ```bash
   cd public
   mv .env.example .env
   cd ..
   ```

   In the `server` directory:

   ```bash
   cd server
   mv .env.example .env
   cd ..
   ```

3. **Install Dependencies**:

   Install the required project dependencies for both the client and server.

   In the `server` directory:

   ```bash
   cd server
   yarn
   cd ..
   ```

   In the `public` directory:

   ```bash
   cd public
   yarn
   ```

4. **Start the Development Server**:

   You will need to start both the frontend and backend servers.

   - For the Frontend:

     In the `public` directory:

     ```bash
     cd public
     yarn start
     ```

   - For the Backend:

     Open another terminal in the project folder, and make sure MongoDB is running in the background.

     In the `server` directory:

     ```bash
     cd server
     yarn start
     ```

5. **Access the Chat App**:

   Once both the frontend and backend servers are running, you can access the Chat App in your browser by opening [http://localhost:3000](http://localhost:3000).

That's it! You should now have the Chat App up and running on your local system. If you encounter any issues or have questions, please refer to the project's documentation or seek assistance from the project's maintainers.
