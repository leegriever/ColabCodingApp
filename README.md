# ColabCodingApp

This project is a real-time collaborative coding application that allows users to collaborate on coding projects in real-time. The Lobby page consists 4 coding blocks to enter. The first user to enter a code block is the mentor, with a readOnly mode and the second one is a student, sharing his code for the mentor to check out.

# Features

- Users can join a code block by clicking the code block title in the Lobby page.
- Real-time syncing of code changes between users in the same room.
- Provides a "Back To Lobby" button to exit the code block and return to the homepage.
- Code changes can only be made by a "student" type of user.

# Technologies Used

- Frontend: React with axios for the user interface.
- Backend: Node with Express and Socket.io for real-time communication.
- Deployment: The application was deplyed with render and railway.

# Deploy Links

- server: "https://colabcodingapp-server.onrender.com"
- client: "https://colabcodingapp-production-9438.up.railway.app"
