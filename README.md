# 🏠 Home Cleaning Management Application

A modern, fully-featured web application for organizing and tracking home cleaning tasks, managing rooms, and scheduling cleaning activities.

## ✨ Features

### 📊 Dashboard
- Quick overview of cleaning progress
- Total tasks, completed tasks, and pending tasks count
- Completion rate percentage
- Recent tasks display

### 📝 Task Management
- Create, edit, and delete cleaning tasks
- Set task priority (Low, Medium, High)
- Assign tasks to specific rooms
- Set task frequency (Once, Daily, Weekly, Monthly)
- Add due dates and descriptions
- Filter tasks by status and room
- Search functionality for quick task lookup
- Mark tasks as completed with checkboxes

### 🏡 Room Management
- Add and manage multiple rooms
- Set room types (Bedroom, Bathroom, Kitchen, Living Room, etc.)
- Track room size (in square feet)
- Customize room colors
- View task count per room
- Edit and delete rooms

### 📅 Schedule View
- Weekly cleaning schedule
- Navigate between weeks
- View tasks assigned to each day
- Plan ahead and organize your cleaning routine

### 📈 Statistics & Analytics
- Tasks breakdown by room
- Tasks breakdown by priority
- Overall completion progress with visual progress bar
- Weekly activity tracking
- Data-driven insights for better planning

## 🚀 Getting Started

### Installation
1. Clone or download the repository
2. Open `index.html` in your web browser
3. No installation or dependencies required!

### First Time Setup
The app comes pre-loaded with 3 sample rooms:
- Living Room (300 sq ft)
- Kitchen (200 sq ft)
- Bedroom (250 sq ft)

All data is automatically saved to your browser's local storage.

## 📖 How to Use

### Adding a Task
1. Navigate to the **Tasks** tab
2. Click the **"+ Add Task"** button
3. Fill in the task details:
   - **Task Name**: What needs to be cleaned (e.g., "Vacuum carpets")
   - **Room**: Select the room
   - **Priority**: Choose importance level
   - **Frequency**: How often this task repeats
   - **Due Date**: When the task should be completed
   - **Description**: Additional notes (optional)
4. Click **"Add Task"** to save

### Adding a Room
1. Navigate to the **Rooms** tab
2. Click the **"+ Add Room"** button
3. Enter room details:
   - **Room Name**: Name of the room
   - **Room Type**: Category (Bedroom, Bathroom, Kitchen, etc.)
   - **Room Size**: Square footage (optional)
   - **Color Theme**: Choose a color to personalize
4. Click **"Add Room"** to save

### Marking Tasks as Complete
1. In the **Tasks** tab, find the task
2. Click the checkbox next to the task name
3. The task will be marked as completed
4. Uncheck to mark as pending again

### Viewing Your Schedule
1. Navigate to the **Schedule** tab
2. See tasks organized by day of the week
3. Use **"← Previous"** and **"Next →"** buttons to navigate weeks
4. Plan your cleaning week ahead

### Checking Statistics
1. Go to the **Statistics** tab
2. View:
   - Tasks breakdown by room
   - Tasks by priority level
   - Overall completion progress
   - This week's activity

## 🎨 User Interface

### Tabs
- **Dashboard**: Quick overview and recent tasks
- **Tasks**: Full task management
- **Rooms**: Room management and organization
- **Schedule**: Weekly planning view
- **Statistics**: Analytics and insights

### Color Coding
- 🔴 **Red**: High priority tasks
- 🟠 **Orange**: Medium priority tasks
- 🔵 **Blue**: Low priority tasks
- ✅ **Green**: Completed tasks

## 💾 Data Persistence

All your data is automatically saved to your browser's local storage:
- Tasks are persisted between sessions
- Rooms and their configurations are saved
- Preferences are remembered
- No internet connection needed to use the app

### Clearing Data
To reset the app:
1. Open browser Developer Tools (F12)
2. Go to Console tab
3. Type: `localStorage.clear()`
4. Press Enter
5. Refresh the page

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with gradients and animations
- **Vanilla JavaScript**: No frameworks or dependencies
- **LocalStorage API**: Data persistence

### Browser Compatibility
- ✅ Chrome/Edge (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Mobile browsers

### Responsive Design
- Desktop optimized
- Tablet friendly
- Mobile responsive
- Touch-friendly interface

## 🎯 Features in Detail

### Task Priority System
- **High**: Urgent tasks that need immediate attention
- **Medium**: Regular maintenance tasks
- **Low**: Optional tasks that can wait

### Task Frequency Options
- **Once**: One-time task
- **Daily**: Task repeats every day
- **Weekly**: Task repeats every week
- **Monthly**: Task repeats every month

### Room Types
- Bedroom
- Bathroom
- Kitchen
- Living Room
- Dining Room
- Hallway
- Laundry Room
- Office
- Garage
- Other

## 📱 Mobile Experience

The app is fully responsive and works great on mobile devices:
- Touch-friendly buttons and inputs
- Responsive grid layouts
- Optimized for small screens
- All features accessible on mobile

## 💡 Tips & Best Practices

1. **Plan Ahead**: Use the Schedule tab to plan your week
2. **Set Priorities**: Mark high-priority tasks so they stand out
3. **Use Frequencies**: Recurring tasks save time entering same tasks repeatedly
4. **Room Organization**: Create rooms for better task organization
5. **Regular Review**: Check Statistics tab to track progress
6. **Due Dates**: Set realistic due dates to avoid overwhelming yourself

## 🔄 Workflow Example

1. **Add Rooms**: Create rooms in your home
2. **Create Tasks**: Add cleaning tasks to rooms
3. **Schedule**: Assign due dates to spread tasks throughout the week
4. **Execute**: Work through tasks and mark them complete
5. **Review**: Check Statistics to monitor progress
6. **Plan**: Schedule next week's tasks

## ⚙️ Customization

### Modifying Sample Rooms
Edit the `loadData()` function in `script.js` to change default rooms:

```javascript
appData = {
    rooms: [
        { id: generateId(), name: 'Your Room', type: 'type', size: 0, color: '#667eea' },
        // Add more rooms...
    ],
    tasks: [],
    currentWeekStart: getMonday(new Date())
};
```

### Changing Colors
All colors can be customized through CSS in `styles.css`.

## 🐛 Troubleshooting

### Tasks Not Saving
- Check if localStorage is enabled in browser
- Ensure cookies are enabled
- Clear browser cache and try again

### Modals Not Opening
- Refresh the page
- Check browser console for errors (F12)
- Ensure JavaScript is enabled

### Display Issues
- Try different screen size
- Clear browser cache
- Update your browser

## 🚀 Future Enhancements

Potential features to add:
- 📤 Export/Import data as JSON
- 🔔 Notifications and reminders
- 👥 Multiple user profiles
- 🎨 Theme customization
- 📊 More detailed analytics
- 🔄 Sync across devices
- 📱 Progressive Web App (PWA) support
- ⏰ Time tracking per task

## 📝 Notes

- Data is stored locally in your browser
- No data is sent to any server
- Each browser/device has separate data
- Clearing browser data will delete app data
- Works offline once loaded

## 📄 License

This project is open source and available for personal and commercial use.

## 🎉 Enjoy!

Keep your home clean and organized with this easy-to-use cleaning management app!

For questions or suggestions, feel free to contribute or create issues.

---

**Happy Cleaning! 🧹✨**
