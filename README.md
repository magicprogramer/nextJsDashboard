# Clone the Project
```bash
git clone https://github.com/magicprogramer/nextJsDashboard.git
```

## Backend Setup
```bash
cd nextDashboard/backend
npm install
# Run the JSON server
node app.js
```

## Frontend Setup
```bash
cd dashboard
npm install
# Run the Next.js application
npm run dev
```

## Tech and Tools
- **API:** A mock API using `json-server` + `json-server-auth`  
- **Frontend:** A Next.js application using:
  - Redux Toolkit  
  - Tailwind CSS  
  - DaisyUI components  
  - Recharts (for data visualization)

## URLs
- Register: [http://localhost:3000/register](http://localhost:3000/register)  
  > Note: You must choose the **admin** role to access the dashboard  
- Login: [http://localhost:3000/login](http://localhost:3000/login)  
- Add a post: [http://localhost:3000/posts/create](http://localhost:3000/posts/create)  
- Admin Dashboard: [http://localhost:3000](http://localhost:3000)

## In the Admin Dashboard, You Can:
- View users and posts  
- Delete users or posts  
- Search posts by username  
- View a pie chart showing the number of posts per user  
- View paginated posts  
- Sort users by the number of their posts  

## Brief Explanation
This is a simple admin dashboard built with Next.js and Redux Toolkit. Only admin users can access the dashboard. Admins can view and manage users and posts, search posts by username, sort users based on their number of posts, and visualize user contributions using a pie chart.