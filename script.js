// Default time zones
const defaultTimeZones = [
    { name: 'New York', timezone: 'America/New_York' },
    { name: 'London', timezone: 'Europe/London' },
    { name: 'Tokyo', timezone: 'Asia/Tokyo' },
    { name: 'Sydney', timezone: 'Australia/Sydney' },
    { name: 'Dubai', timezone: 'Asia/Dubai' },
    { name: 'Singapore', timezone: 'Asia/Singapore' }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    loadTimeZones();
    updateAllClocks();
    setInterval(updateAllClocks, 1000); // Update every second
});

// Load time zones from localStorage or use defaults
function loadTimeZones() {
    const stored = localStorage.getItem('timeZones');
    const timeZones = stored ? JSON.parse(stored) : defaultTimeZones;
    renderClocks(timeZones);
}

// Render clock cards for all time zones
function renderClocks(timeZones) {
    const clockGrid = document.getElementById('clockGrid');
    clockGrid.innerHTML = '';

    timeZones.forEach((tz, index) => {
        const clockCard = createClockCard(tz, index);
        clockGrid.appendChild(clockCard);
    });

    // Add the add timezone form
    addTimezoneForm();
}

// Create a clock card element
function createClockCard(tz, index) {
    const card = document.createElement('div');
    card.className = 'clock-card';
    card.id = `clock-${index}`;
    card.innerHTML = `
        <div class="timezone-name">${tz.name}</div>
        <div class="timezone-offset" id="offset-${index}"></div>
        <div class="time-display" id="time-${index}">--:--:--</div>
        <div class="date-display" id="date-${index}">Loading...</div>
        <button class="remove-btn" onclick="removeTimeZone(${index})" style="
            background: rgba(255, 107, 107, 0.8);
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            margin-top: 15px;
            font-size: 0.85rem;
            transition: background 0.2s ease;
        ">Remove</button>
    `;
    
    card.querySelector('.remove-btn').addEventListener('mouseover', (e) => {
        e.target.style.background = 'rgba(255, 107, 107, 1)';
    });
    
    card.querySelector('.remove-btn').addEventListener('mouseout', (e) => {
        e.target.style.background = 'rgba(255, 107, 107, 0.8)';
    });

    return card;
}

// Add the timezone input form
function addTimezoneForm() {
    const container = document.querySelector('.container');
    let formContainer = document.getElementById('addTimezoneForm');
    
    if (!formContainer) {
        formContainer = document.createElement('div');
        formContainer.id = 'addTimezoneForm';
        formContainer.className = 'add-timezone-section';
        container.appendChild(formContainer);
    }

    formContainer.innerHTML = `
        <input 
            type="text" 
            id="timezoneInput" 
            class="timezone-input" 
            placeholder="Enter timezone (e.g., Europe/Paris, America/Los_Angeles)"
        >
        <input 
            type="text" 
            id="timezoneNameInput" 
            class="timezone-input" 
            placeholder="Enter display name (e.g., Paris, Los Angeles)"
            style="min-width: 150px;"
        >
        <button class="add-btn" onclick="addTimeZone()">+ Add Timezone</button>
        <div id="message"></div>
    `;

    // Allow Enter key to add timezone
    document.getElementById('timezoneInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTimeZone();
    });
    
    document.getElementById('timezoneNameInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTimeZone();
    });
}

// Update all clock displays
function updateAllClocks() {
    const stored = localStorage.getItem('timeZones');
    const timeZones = stored ? JSON.parse(stored) : defaultTimeZones;

    timeZones.forEach((tz, index) => {
        updateClock(tz, index);
    });
}

// Update a single clock display
function updateClock(tz, index) {
    try {
        const now = new Date();
        
        // Get time in the specified timezone
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: tz.timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        const dateFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: tz.timezone,
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            weekday: 'short'
        });

        const time = formatter.format(now);
        const date = dateFormatter.format(now);

        // Get timezone offset
        const offsetFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: tz.timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZoneName: 'short'
        });

        const parts = offsetFormatter.formatToParts(now);
        const tzName = parts.find(p => p.type === 'timeZoneName')?.value || '';

        // Update DOM
        const timeElement = document.getElementById(`time-${index}`);
        const dateElement = document.getElementById(`date-${index}`);
        const offsetElement = document.getElementById(`offset-${index}`);

        if (timeElement) timeElement.textContent = time;
        if (dateElement) dateElement.textContent = date;
        if (offsetElement) offsetElement.textContent = tzName;

    } catch (error) {
        console.error(`Error updating clock for ${tz.timezone}:`, error);
    }
}

// Add a new timezone
function addTimeZone() {
    const input = document.getElementById('timezoneInput');
    const nameInput = document.getElementById('timezoneNameInput');
    const messageDiv = document.getElementById('message');
    
    const timezone = input.value.trim();
    const displayName = nameInput.value.trim();

    // Validate inputs
    if (!timezone) {
        showMessage('Please enter a timezone', 'error');
        return;
    }

    if (!displayName) {
        showMessage('Please enter a display name', 'error');
        return;
    }

    // Validate timezone
    if (!isValidTimezone(timezone)) {
        showMessage(`"${timezone}" is not a valid timezone. Use format like "Europe/Paris" or "America/New_York"`, 'error');
        return;
    }

    // Get current timezones
    const stored = localStorage.getItem('timeZones');
    let timeZones = stored ? JSON.parse(stored) : defaultTimeZones;

    // Check if timezone already exists
    if (timeZones.some(tz => tz.timezone === timezone)) {
        showMessage(`"${timezone}" is already added`, 'error');
        return;
    }

    // Add new timezone
    timeZones.push({ name: displayName, timezone: timezone });

    // Save to localStorage
    localStorage.setItem('timeZones', JSON.stringify(timeZones));

    // Clear inputs
    input.value = '';
    nameInput.value = '';

    // Re-render
    loadTimeZones();
    showMessage(`Added ${displayName}!`, 'success');
}

// Remove a timezone
function removeTimeZone(index) {
    const stored = localStorage.getItem('timeZones');
    let timeZones = stored ? JSON.parse(stored) : defaultTimeZones;

    if (index >= 0 && index < timeZones.length) {
        const removed = timeZones.splice(index, 1)[0];
        localStorage.setItem('timeZones', JSON.stringify(timeZones));
        loadTimeZones();
        showMessage(`Removed ${removed.name}`, 'success');
    }
}

// Validate timezone string
function isValidTimezone(tz) {
    try {
        Intl.DateTimeFormat(undefined, { timeZone: tz });
        return true;
    } catch (ex) {
        return false;
    }
}

// Show message
function showMessage(msg, type) {
    const messageDiv = document.getElementById('message');
    if (messageDiv) {
        messageDiv.textContent = msg;
        messageDiv.className = type === 'error' ? 'error-message' : 'success-message';
        
        setTimeout(() => {
            messageDiv.textContent = '';
            messageDiv.className = '';
        }, 3000);
    }
}

// Common timezones reference for users
const COMMON_TIMEZONES = [
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'America/Anchorage',
    'Pacific/Honolulu',
    'Europe/London',
    'Europe/Paris',
    'Europe/Berlin',
    'Europe/Madrid',
    'Europe/Moscow',
    'Asia/Dubai',
    'Asia/Kolkata',
    'Asia/Bangkok',
    'Asia/Hong_Kong',
    'Asia/Shanghai',
    'Asia/Tokyo',
    'Australia/Sydney',
    'Australia/Melbourne',
    'Pacific/Auckland'
];
