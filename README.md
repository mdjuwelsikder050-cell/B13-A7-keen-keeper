KeenKeeper

Keep your friends close. KeenKeeper is your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.

📖 Description

KeenKeeper is a friendship-tracking web app built with React. It helps you remember who you haven't talked to in a while, shows how healthy each friendship is, and lets you log calls, texts, and video chats in a timeline, so no important relationship slips away.

🛠️ Technologies Used
React (with Hooks)
Vite for fast development and build
React Router DOM for page navigation
React Context API for global state
Tailwind CSS v4 for styling
Lucide React for icons
React Hot Toast for notifications
JSON file as the data source (public/friends.json)
✨ Features
Responsive layout that works on mobile, tablet, and desktop
Navbar with active link highlighting (Home, Timeline, Stats)
Hero section with a quick "Add a Friend" call-to-action
Summary cards showing Total Friends, On Track, Need Attention, and Interactions This Month
Friends grid with photo, name, days since last contact, and tags for each friend
Status badges to show friendship health: Overdue, Almost Due, On-Track
Loading animation while friend data is being fetched
Interaction logging: record a Call, Text, or Video with a friend
Timeline page listing all your past interactions with type icons and dates
Stats page to visualize your interactions
Toast notifications to confirm actions
Footer with social media links
Client-side routing with no page reloads
📂 Project Structure
keen-keeper
├── public
│   ├── img            # logos and icons
│   ├── people         # friend photos
│   └── friends.json   # friends data
├── src
│   ├── App.jsx
│   ├── main.jsx
│   ├── components.jsx # Navbar, Footer, StatusBadge
│   ├── pages.jsx      # Home, Timeline, Stats pages
│   ├── data.jsx       # Context provider (friends, timeline)
│   └── index.css
├── index.html
├── package.json
└── vite.config.js