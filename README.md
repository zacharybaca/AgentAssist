# AgentAssist

**"Answers at the speed of your next call."**

AgentAssist is designed to enhance customer support experiences by providing real-time assistance to agents during calls. By integrating advanced AI capabilities, it aims to streamline interactions, reduce response times, and improve overall customer satisfaction.

## Features

- **Real-Time AI Assistance:** Leverages AI to provide instant suggestions and information to support agents during live calls.
- **User-Friendly Interface:** Built with a modern frontend to ensure ease of use and quick adoption by support teams.
- **Scalable Architecture:** Structured to accommodate growing support needs and integrate with existing systems.

## Technologies Used

- **Frontend**: React.js with Vite for fast development and optimized builds.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB with Mongoose ORM.
- **Authentication**: JWT (JSON Web Tokens).
- **Styling**: CSS.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js**: v14.x or later.
- **npm**: v6.x or later.
- **MongoDB**: A running MongoDB instance, either local or cloud-based (e.g., MongoDB Atlas).
- **Git**: To clone the repository.
- **Vite**: For frontend development.
- **Render**: Hosting for deployment.

### Installation

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
   npm start
   cd ../server
   npm start

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
