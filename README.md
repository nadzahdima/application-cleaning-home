# World Clock - Digital Clock Application

A beautiful, responsive web application that displays the current time in multiple time zones around the world.

## Features

✨ **Key Features:**
- 📍 Display current time in multiple time zones simultaneously
- 🎨 Modern, glassmorphic design with gradient background
- 🌍 6 pre-configured time zones (easily customizable)
- ➕ Add custom time zones with timezone names
- ❌ Remove time zones as needed
- 💾 Persistent storage using localStorage
- ⏰ Real-time updates every second
- 📱 Fully responsive design (desktop, tablet, mobile)
- 🌙 Dark theme with green accent colors

## Included Time Zones (Default)

- **New York** - America/New_York (EST/EDT)
- **London** - Europe/London (GMT/BST)
- **Tokyo** - Asia/Tokyo (JST)
- **Sydney** - Australia/Sydney (AEDT/AEST)
- **Dubai** - Asia/Dubai (GST)
- **Singapore** - Asia/Singapore (SGT)

## How to Use

### Display Information
Each clock card shows:
- 🏙️ **City/Region Name** - The display name of the location
- 🕐 **Time** - Current time in HH:MM:SS format
- 📅 **Date** - Full date with day of week
- 🌐 **Timezone Offset** - Timezone abbreviation

### Add a New Timezone

1. Enter the timezone identifier in the first input field
   - Examples: `Europe/Paris`, `America/Los_Angeles`, `Asia/Bangkok`
2. Enter a display name in the second input field
   - Example: `Paris`, `Los Angeles`, `Bangkok`
3. Click the **"+ Add Timezone"** button or press Enter

### Remove a Timezone

- Click the **"Remove"** button on any clock card to delete it

### Common Timezones

- **Americas**: America/New_York, America/Chicago, America/Denver, America/Los_Angeles
- **Europe**: Europe/London, Europe/Paris, Europe/Berlin, Europe/Moscow
- **Asia**: Asia/Dubai, Asia/Kolkata, Asia/Bangkok, Asia/Hong_Kong, Asia/Tokyo, Asia/Shanghai
- **Pacific**: Australia/Sydney, Australia/Melbourne, Pacific/Auckland, Pacific/Honolulu

## Technical Details

### Technologies Used
- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with:
  - Gradient backgrounds
  - Backdrop filters (glassmorphic effect)
  - CSS Grid for responsive layout
  - Smooth transitions and hover effects
  - Mobile-first responsive design
- **Vanilla JavaScript** - No dependencies required
  - Intl API for timezone handling
  - LocalStorage for data persistence
  - DOM manipulation

### Browser Compatibility
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- IE11: ⚠️ Limited support (no backdrop filter)

## How It Works

### Time Display
The application uses the `Intl.DateTimeFormat` API with the `timeZone` option to:
1. Get the current time in each specified timezone
2. Format it according to the user's locale
3. Extract timezone offset information

### Data Persistence
- Timezones are stored in browser's localStorage
- Your custom selections persist across browser sessions
- Default timezones load if no saved data exists

### Auto-Update
- Clock updates every second using `setInterval()`
- Ensures accurate, real-time display

## File Structure

```
application-cleaning-home/
├── index.html      # HTML structure
├── styles.css      # Styling and responsive design
├── script.js       # JavaScript functionality
└── README.md       # Documentation
```

## Installation & Running

1. Clone or download the repository
2. Open `index.html` in your web browser
3. No installation or dependencies required!

### Alternative: Local Server
For better performance with CORS and caching:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000`

## Customization

### Modify Default Timezones
Edit the `defaultTimeZones` array in `script.js`:

```javascript
const defaultTimeZones = [
    { name: 'Your City', timezone: 'Continent/City' },
    // Add more...
];
```

### Change Color Scheme
Update the gradient and accent colors in `styles.css`:

```css
body {
    background: linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%);
}

.time-display {
    color: #YOUR_ACCENT_COLOR;
}
```

### Adjust Update Frequency
Modify the interval in `script.js`:

```javascript
setInterval(updateAllClocks, 500); // Update every 500ms instead of 1000ms
```

## Troubleshooting

### Invalid Timezone Error
- Ensure you're using the correct IANA timezone identifier
- Format: `Continent/City` (e.g., `Europe/Paris`, not `GMT+1`)
- Refer to the [IANA Timezone Database](https://www.iana.org/time-zones)

### Clocks Not Updating
- Check browser console for errors (F12)
- Ensure JavaScript is enabled
- Try clearing localStorage: `localStorage.clear()` in console

### Display Issues on Mobile
- The app is fully responsive
- Try rotating your device or resizing the browser window
- Ensure you're using a modern browser

## Future Enhancements

Potential features to add:
- 🎯 Analog clock display option
- 🔊 Alarm functionality for specific timezones
- 🌓 Light/Dark theme toggle
- 📊 Time zone differences calculator
- 🔍 Timezone search functionality
- 🎨 Custom color themes
- 📍 Geolocation-based timezone detection

## License

This project is open source and available for personal and commercial use.

## Credits

Created with ❤️ for global teams and world travelers!

---

**Enjoy keeping track of time across the globe!** 🌍⏰