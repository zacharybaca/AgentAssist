# AgentAssist

AgentAssist is a comprehensive web application designed to help customer service agents access information quickly and efficiently. The platform provides a centralized knowledge base with articles, resources, and tools to assist agents in resolving customer inquiries at the speed of their next call.

## Features

- **Article Management**: Create, edit, and organize knowledge base articles
- **Admin Panel**: Manage articles, categories, and user permissions
- **User Authentication**: Secure login and role-based access control
- **Favorites System**: Save frequently used articles for quick access
- **Rich Text Editor**: Format articles with images, lists, and other formatting
- **Responsive Design**: Works across desktop and mobile devices
- **Customizable UI**: Reorder sidebar items and toggle dark mode

## Technology Stack

### Frontend

- **React**: UI library for building the user interface
- **React Router**: For navigation and routing
- **Framer Motion**: For animations and transitions
- **React Quill**: Rich text editor for article creation
- **Bootstrap**: For styling and responsive design
- **Lucide React**: For icons
- **React Hot Toast**: For notifications
- **Cloudinary**: For image uploads and storage

### Backend

- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **Bcrypt**: For password hashing
- **Multer**: For file uploads
- **Validator**: For data validation

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/zacharybaca/AgentAssist.git
   cd AgentAssist
   ```

2. **Install dependencies for both frontend and backend**

   ```bash
   npm install
   ```

   <!-- Install backend dependencies -->

   ```bash
   cd server
   npm install
   ```

3. **Environment Variables**

   - Create a `.env` file in the root directory with the following variables:

   ```bash
   VITE_CLOUD_NAME=your_cloudinary_cloud_name
   VITE_PRESET_NAME=your_cloudinary_preset_name
   ```

   - Create a `.env` file in the server directory with the following variables:

   ```bash
   PORT=9000
   MONGO_URI=your_mongodb_connection_string
   SECRET=your_jwt_secret_key
   ```

4. **Start the development servers**

   Start the backend server (from the `server` directory):

   ```bash
   npm start
   ```

   Start the frontend development server (from the root directory):

   ```bash
   npm run dev
   ```

5. **Access the application**
   The application will be available at [http://localhost:5173](http://localhost:5173) (or the port specified by Vite)

## 📡 API Documentation

### Agent/Employee Management

1. Get All Agents

   - `GET /api/agents`
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
     ```

2. Get a Specific Agent

   - `GET /api/agents/:id`
   - Retrieves an agent by their unique ID.

3. Create a New Agent

   - `POST /api/agents`
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
     }
     ```

4. Update an Existing Agent

   - `PUT /api/agents/:id`
   - Updates the details of an existing agent.

5. Delete an Agent

   - `DELETE /api/agents/:id`
   - Deletes an agent by ID.

6. Upload an Agent Avatar
   - `POST /api/agents/upload-avatar`
   - Uploads an avatar for an agent profile
