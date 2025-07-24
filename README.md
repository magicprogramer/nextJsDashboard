# Clone the Project
git clone https://github.com/magicprogramer/nextJsDashboard.git

# Backend Setup
cd nextDashboard/backend && npm install
# Run the JSON server
node app.js

# Frontend Setup
cd dashboard && npm install
# Run the Next.js application
npm run dev

# Project Structure
api : a mock api "json server + json server auth"  
frontend : nextjs application with redux  

# URLs
to register: http://localhost:3000/register  
note : you should choose role as an admin to access the dashboard  
to login : http://localhost:3000/login  
to add a post : http://localhost:3000/posts/create  
to access admin dashboard : http://localhost:3000  

# In Admin Dashboard You:
- show users and posts  
- delete users or posts  
- search posts by user names  
- show a pie chart that reflect number of posts per user  
- posts are paginated  
- sorting users by number of their posts
