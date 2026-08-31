// Data Structure
let appData = {
    rooms: [],
    tasks: [],
    currentWeekStart: getMonday(new Date())
};

// Load data from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    initializeApp();
});

// Initialize the application
function initializeApp() {
    setupTabNavigation();
    populateRoomSelects();
    renderDashboard();
    renderTasks();
    renderRooms();
    renderSchedule();
    renderStatistics();
}

// Setup tab navigation
function setupTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            
            // Remove active class from all
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab
            button.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        });
    });
}

// ==================== DASHBOARD ====================
function renderDashboard() {
    const totalTasks = appData.tasks.length;
    const completedTasks = appData.tasks.filter(t => t.status === 'completed').length;
    const pendingTasks = totalTasks - completedTasks;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    document.getElementById('totalTasks').textContent = totalTasks;
    document.getElementById('completedTasks').textContent = completedTasks;
    document.getElementById('pendingTasks').textContent = pendingTasks;
    document.getElementById('completionRate').textContent = completionRate + '%';

    // Recent tasks
    const recentTasks = appData.tasks.slice(-5).reverse();
    const recentList = document.getElementById('recentTasksList');
    
    if (recentTasks.length === 0) {
        recentList.innerHTML = '<p class="empty-state">No tasks yet. Create one to get started!</p>';
    } else {
        recentList.innerHTML = recentTasks.map(task => createTaskElement(task)).join('');
    }
}

// ==================== TASKS ====================
function renderTasks() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const statusFilter = document.getElementById('filterStatus')?.value || '';
    const roomFilter = document.getElementById('filterRoom')?.value || '';

    let filteredTasks = appData.tasks.filter(task => {
        const matchesSearch = task.name.toLowerCase().includes(searchTerm);
        const matchesStatus = !statusFilter || task.status === statusFilter;
        const matchesRoom = !roomFilter || task.roomId === roomFilter;
        return matchesSearch && matchesStatus && matchesRoom;
    });

    const tasksList = document.getElementById('tasksList');
    
    if (filteredTasks.length === 0) {
        tasksList.innerHTML = '<p class="empty-state">No tasks found.</p>';
    } else {
        tasksList.innerHTML = filteredTasks.map(task => createTaskElement(task)).join('');
    }
}

function createTaskElement(task) {
    const room = appData.rooms.find(r => r.id === task.roomId);
    const roomName = room ? room.name : 'Unknown Room';
    const priorityClass = `${task.priority}-priority`;
    const completedClass = task.status === 'completed' ? 'completed' : '';

    return `
        <div class="task-item ${priorityClass} ${completedClass}">
            <div style="display: flex; align-items: center; gap: 15px; flex: 1;">
                <input type="checkbox" class="checkbox" ${task.status === 'completed' ? 'checked' : ''} 
                       onchange="toggleTask('${task.id}')">
                <div class="task-info">
                    <div class="task-name">${task.name}</div>
                    <div class="task-meta">
                        <span class="task-room">🏠 ${roomName}</span>
                        <span class="task-priority">Priority: ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>
                        ${task.dueDate ? `<span>📅 ${new Date(task.dueDate).toLocaleDateString()}</span>` : ''}
                    </div>
                </div>
            </div>
            <div class="task-actions">
                <button class="btn btn-small btn-secondary" onclick="editTask('${task.id}')">Edit</button>
                <button class="btn btn-small btn-danger" onclick="deleteTask('${task.id}')">Delete</button>
            </div>
        </div>
    `;
}

function toggleTask(taskId) {
    const task = appData.tasks.find(t => t.id === taskId);
    if (task) {
        task.status = task.status === 'completed' ? 'pending' : 'completed';
        saveData();
        renderDashboard();
        renderTasks();
    }
}

function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        appData.tasks = appData.tasks.filter(t => t.id !== taskId);
        saveData();
        renderTasks();
        renderDashboard();
        renderSchedule();
    }
}

function editTask(taskId) {
    const task = appData.tasks.find(t => t.id === taskId);
    if (task) {
        document.getElementById('taskName').value = task.name;
        document.getElementById('taskRoom').value = task.roomId;
        document.getElementById('taskPriority').value = task.priority;
        document.getElementById('taskFrequency').value = task.frequency;
        document.getElementById('taskDueDate').value = task.dueDate;
        document.getElementById('taskDescription').value = task.description;
        
        // Store the task ID for updating
        document.getElementById('addTaskForm').dataset.editId = taskId;
        openAddTaskModal();
    }
}

// ==================== MODAL FUNCTIONS ====================
function openAddTaskModal() {
    document.getElementById('addTaskModal').classList.add('active');
}

function closeAddTaskModal() {
    document.getElementById('addTaskModal').classList.remove('active');
    document.getElementById('addTaskForm').reset();
    delete document.getElementById('addTaskForm').dataset.editId;
}

function openAddRoomModal() {
    document.getElementById('addRoomModal').classList.add('active');
}

function closeAddRoomModal() {
    document.getElementById('addRoomModal').classList.remove('active');
    document.getElementById('addRoomForm').reset();
}

// Add task form submission
document.addEventListener('DOMContentLoaded', () => {
    const addTaskForm = document.getElementById('addTaskForm');
    if (addTaskForm) {
        addTaskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const editId = addTaskForm.dataset.editId;
            const taskId = editId || generateId();
            
            const task = {
                id: taskId,
                name: document.getElementById('taskName').value,
                roomId: document.getElementById('taskRoom').value,
                priority: document.getElementById('taskPriority').value,
                frequency: document.getElementById('taskFrequency').value,
                dueDate: document.getElementById('taskDueDate').value,
                description: document.getElementById('taskDescription').value,
                status: editId ? appData.tasks.find(t => t.id === editId).status : 'pending',
                createdAt: editId ? appData.tasks.find(t => t.id === editId).createdAt : new Date().toISOString()
            };

            if (editId) {
                const index = appData.tasks.findIndex(t => t.id === editId);
                appData.tasks[index] = task;
            } else {
                appData.tasks.push(task);
            }

            saveData();
            closeAddTaskModal();
            renderDashboard();
            renderTasks();
            renderSchedule();
        });
    }

    const addRoomForm = document.getElementById('addRoomForm');
    if (addRoomForm) {
        addRoomForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const room = {
                id: generateId(),
                name: document.getElementById('roomName').value,
                type: document.getElementById('roomType').value,
                size: document.getElementById('roomSize').value || 0,
                color: document.getElementById('roomColor').value
            };

            appData.rooms.push(room);
            saveData();
            closeAddRoomModal();
            populateRoomSelects();
            renderRooms();
            renderTasks();
        });
    }
});

// Close modals when clicking outside
window.addEventListener('click', (event) => {
    const taskModal = document.getElementById('addTaskModal');
    const roomModal = document.getElementById('addRoomModal');
    
    if (event.target === taskModal) {
        closeAddTaskModal();
    }
    if (event.target === roomModal) {
        closeAddRoomModal();
    }
});

// ==================== ROOMS ====================
function renderRooms() {
    const roomsList = document.getElementById('roomsList');
    
    if (appData.rooms.length === 0) {
        roomsList.innerHTML = '<p class="empty-state">No rooms added yet. Add one to get started!</p>';
    } else {
        roomsList.innerHTML = appData.rooms.map(room => {
            const taskCount = appData.tasks.filter(t => t.roomId === room.id).length;
            return `
                <div class="room-card" style="background: linear-gradient(135deg, ${room.color}aa 0%, ${room.color}dd 100%);">
                    <div class="room-name">🚪 ${room.name}</div>
                    <div class="room-type">${room.type.charAt(0).toUpperCase() + room.type.slice(1)}</div>
                    ${room.size ? `<div class="room-size">📏 ${room.size} sq ft</div>` : ''}
                    <div class="room-tasks">${taskCount} task${taskCount !== 1 ? 's' : ''}</div>
                    <div class="room-actions">
                        <button class="btn btn-small btn-secondary" onclick="editRoom('${room.id}')">Edit</button>
                        <button class="btn btn-small btn-danger" onclick="deleteRoom('${room.id}')">Delete</button>
                    </div>
                </div>
            `;
        }).join('');
    }
}

function deleteRoom(roomId) {
    if (confirm('Are you sure? All tasks in this room will remain.')) {
        appData.rooms = appData.rooms.filter(r => r.id !== roomId);
        saveData();
        renderRooms();
        populateRoomSelects();
        renderTasks();
    }
}

function editRoom(roomId) {
    const room = appData.rooms.find(r => r.id === roomId);
    if (room) {
        document.getElementById('roomName').value = room.name;
        document.getElementById('roomType').value = room.type;
        document.getElementById('roomSize').value = room.size;
        document.getElementById('roomColor').value = room.color;
        document.getElementById('addRoomForm').dataset.editId = roomId;
        openAddRoomModal();
    }
}

// ==================== SCHEDULE ====================
function renderSchedule() {
    const weekStart = appData.currentWeekStart;
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    document.getElementById('weekDisplay').textContent = 
        `${weekStart.toLocaleDateString()} - ${weekEnd.toLocaleDateString()}`;

    const scheduleView = document.getElementById('scheduleView');
    let html = '';

    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(weekStart);
        currentDate.setDate(currentDate.getDate() + i);
        const dateStr = currentDate.toISOString().split('T')[0];
        const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

        const dayTasks = appData.tasks.filter(task => task.dueDate === dateStr);

        html += `
            <div class="schedule-day">
                <div class="day-header">${dayName}</div>
                <div class="day-tasks">
                    ${dayTasks.length > 0 
                        ? dayTasks.map(t => `<div class="day-task">${t.name}</div>`).join('')
                        : '<div class="day-task" style="opacity: 0.5;">No tasks</div>'
                    }
                </div>
            </div>
        `;
    }

    scheduleView.innerHTML = html;
}

function previousWeek() {
    appData.currentWeekStart.setDate(appData.currentWeekStart.getDate() - 7);
    renderSchedule();
}

function nextWeek() {
    appData.currentWeekStart.setDate(appData.currentWeekStart.getDate() + 7);
    renderSchedule();
}

// ==================== STATISTICS ====================
function renderStatistics() {
    // Tasks by room
    const tasksByRoom = {};
    appData.tasks.forEach(task => {
        const room = appData.rooms.find(r => r.id === task.roomId);
        const roomName = room ? room.name : 'Unknown';
        tasksByRoom[roomName] = (tasksByRoom[roomName] || 0) + 1;
    });

    const tasksByRoomHtml = Object.entries(tasksByRoom)
        .map(([room, count]) => `<div style="padding: 5px 0;">🏠 ${room}: <strong>${count}</strong></div>`)
        .join('');
    
    document.getElementById('tasksByRoom').innerHTML = tasksByRoomHtml || '<p>No data yet</p>';

    // Tasks by priority
    const byPriority = {
        high: appData.tasks.filter(t => t.priority === 'high').length,
        medium: appData.tasks.filter(t => t.priority === 'medium').length,
        low: appData.tasks.filter(t => t.priority === 'low').length
    };

    const priorityHtml = `
        <div style="padding: 5px 0;">🔴 High: <strong>${byPriority.high}</strong></div>
        <div style="padding: 5px 0;">🟠 Medium: <strong>${byPriority.medium}</strong></div>
        <div style="padding: 5px 0;">🔵 Low: <strong>${byPriority.low}</strong></div>
    `;
    document.getElementById('tasksByPriority').innerHTML = priorityHtml;

    // Task progress
    const total = appData.tasks.length;
    const completed = appData.tasks.filter(t => t.status === 'completed').length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    const progressHtml = `
        <div style="margin-bottom: 10px;">
            <div style="background: #e9ecef; height: 20px; border-radius: 10px; overflow: hidden;">
                <div style="background: #51cf66; height: 100%; width: ${percentage}%; transition: width 0.3s;"></div>
            </div>
        </div>
        <div>${completed} of ${total} tasks completed (${percentage}%)</div>
    `;
    document.getElementById('taskProgress').innerHTML = progressHtml;

    // Weekly activity
    const thisWeek = appData.tasks.filter(t => {
        const taskDate = new Date(t.dueDate);
        const weekStart = getMonday(new Date());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        return taskDate >= weekStart && taskDate <= weekEnd;
    }).length;

    const weeklyHtml = `<div style="padding: 5px 0;">📋 Tasks this week: <strong>${thisWeek}</strong></div>`;
    document.getElementById('weeklyActivity').innerHTML = weeklyHtml;
}

// ==================== UTILITY FUNCTIONS ====================
function populateRoomSelects() {
    const selects = [document.getElementById('taskRoom'), document.getElementById('filterRoom')];
    
    selects.forEach(select => {
        if (!select) return;
        
        const currentValue = select.value;
        select.innerHTML = '<option value="">Select a room</option>';
        
        appData.rooms.forEach(room => {
            const option = document.createElement('option');
            option.value = room.id;
            option.textContent = room.name;
            select.appendChild(option);
        });
        
        select.value = currentValue;
    });
}

function generateId() {
    return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function getMonday(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
}

// ==================== LOCAL STORAGE ====================
function saveData() {
    localStorage.setItem('cleaningAppData', JSON.stringify(appData));
}

function loadData() {
    const stored = localStorage.getItem('cleaningAppData');
    if (stored) {
        appData = JSON.parse(stored);
        appData.currentWeekStart = getMonday(new Date());
    } else {
        // Initialize with sample data
        appData = {
            rooms: [
                { id: generateId(), name: 'Living Room', type: 'living-room', size: 300, color: '#667eea' },
                { id: generateId(), name: 'Kitchen', type: 'kitchen', size: 200, color: '#f93c1d' },
                { id: generateId(), name: 'Bedroom', type: 'bedroom', size: 250, color: '#9c36b5' }
            ],
            tasks: [],
            currentWeekStart: getMonday(new Date())
        };
    }
}

// Setup search and filter event listeners
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const filterStatus = document.getElementById('filterStatus');
    const filterRoom = document.getElementById('filterRoom');

    if (searchInput) searchInput.addEventListener('input', renderTasks);
    if (filterStatus) filterStatus.addEventListener('change', renderTasks);
    if (filterRoom) filterRoom.addEventListener('change', renderTasks);
});
