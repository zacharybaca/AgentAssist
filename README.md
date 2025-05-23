# <div align="center">AgentAssist</div>

<div align="center">**"Answers at the speed of your next call."**</div>

<br />

AgentAssist is built to enhance the customer support experience by equipping agents with a robust knowledge base of helpful articles. These articles offer clear answers to common customer questions and provide step-by-step guidance for handling processes agents encounter in their daily workflows. The application is currently in development, with additional features planned for future releases.

## Features

- **Real-Time Knowledgebase Articles:** Management-approved articles are instantly accessible to assist agents with accurate,                                          up-to-date information.
- **User-Friendly Interface:** A modern, intuitive design ensures ease of use and encourages quick adoption by support teams.
- **Scalable Architecture:** Built to grow with your organization, supporting increased demand and seamless integration with                                existing systems.

## Technologies Used

- **Frontend**: React.js with Vite for fast development and optimized builds.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB with Mongoose ORM.
- **Authentication**: JWT (JSON Web Tokens).
- **Styling**: CSS.

## Project Structure
  - Structure of How Project File System is Set Up
   ```bash
   software-bug-tracker/
   ├── client/               # Frontend (React with Vite)
      ├── src
         ├── assets          # Images or media files
         ├── components      # Components used in the application
         ├── context         # Used for global state management for components
         ├── hooks           # Custom hooks used for context functionality
         ├── App.css         # Global CSS file
         ├── App.jsx         # Main application file
         ├── index.css       # Main CSS file
         ├── main.jsx        # Main application housing file
      ├── index.html         # HTML file that hosts web application root
      ├── loader.css         # CSS file for the global loader icon
   ├── server/               # Backend (Node.js + Express)
      ├── controllers/       # Database Functions for Agents, Articles, and Categories
         ├── agentController
         ├── articleController
         ├── authController
         ├── categoryController
      ├── middleware/        # Middleware Functions/Helpers
         ├── auth
      ├── models/            # Mongoose schemas for tasks and employees
         ├── Agent
         ├── Article
         ├── Category
      ├── routes/            # API route definitions
         ├── agentRouter
         ├── articleRouter
         ├── authRoutes
         ├── categoryRouter
      ├── server.js          # Main Server Entry File
   └── README.md             # Project documentation
   ```

## Deployment
  1. The application is deployed on Render.
    - Configure the environment variables on Render to match your <code>.env</code> file.
        
## Prerequisites

Ensure you have the following installed on your machine:

- **Node.js**: v14.x or later.
- **npm**: v6.x or later.
- **MongoDB**: A running MongoDB instance, either local or cloud-based (e.g., MongoDB Atlas).
- **Git**: To clone the repository.
- **Vite**: For frontend development.
- **Render**: Hosting for deployment.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/zacharybaca/AgentAssist.git

2. Navigate to the project directory:
   ```bash
   cd AgentAssist

3. Install dependencies for both client and server:
   ```bash
   cd client
   npm install
   cd ../server
   npm install

4. Start the development servers:
   ```bash
   cd client
   npm run dev
   cd ../server
   npm run start

## 📡 API Documentation

### Agent/Employee Management

   1. Get All Agents
      - <code>GET /api/agents</code>
      - Retrieves a list of all agents.
      - Example Response:
         ```bash
         [
            {
               "_id": "agentId123",
               "name": "John Smith",
               "username": "jsmith",
               "email": "jsmith@test.com",
               "phoneNumber": "555-555-5555",
               "password": "testing",
               "role": "agent",
               "favoriteArticles": ["One", "Two"],
               "tasks": ["Task 1", "Task 2"],
               "avatar": "https://www.testurl.com/image/url"
            }
         ]

   2. Get a Specific Agent
      - <code>GET /api/agents/:id</code>
      - Retrieves an agent by their unique ID.
     
   3. Create a New Agent
      - <code>POST /api/agents</code>
      - Requires the agent data in the request body.
      - Example Request Body:
        ```bash
        {
           "_id": "agentId123",
           "name": "John Smith",
           "username": "jsmith",
           "email": "jsmith@test.com",
           "phoneNumber": "555-555-5555",
           "password": "testing",
           "role": "agent",
           "favoriteArticles": ["One", "Two"],
           "tasks": ["Task 1", "Task 2"],
           "avatar": "https://www.testurl.com/image/url"
        }

   4. Update an Existing Agent
      - <code>PUT /api/agents/:id</code>
      - Updates the details of an existing agent.
        
   5. Delete an Agent
      - <code>DELETE /api/agents/:id</code>
      - Deletes an agent by ID.
        
   6. Upload an Agent Avatar
      - <code>POST /api/agents/upload-avatar</code>
      - Uploads an avatar for an agent profile
