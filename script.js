// 全域變數
let currentUser = null;
let currentPage = 'home';

// DOM 載入完成後初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// 初始化應用程式
function initializeApp() {
    setupNavigation();
    setupEventListeners();
    setupAnimations();
    loadDemoData();
}

// 設置導航功能
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    // 導航連結點擊事件
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            showPage(page);
            
            // 更新導航狀態
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 手機版導航切換
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
}

// 設置事件監聽器
function setupEventListeners() {
    // 後台管理標籤切換
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            switchTab(tab);
            
            // 更新標籤狀態
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 登入表單提交
    const loginForm = document.querySelector('.login-form-content');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }

    // 系統設定表單提交
    const settingsForm = document.querySelector('.settings-form form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSettingsSave();
        });
    }

    // 搜尋功能
    const searchInputs = document.querySelectorAll('.search-box input');
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            handleSearch(this.value, this.closest('.page').id);
        });
    });

    // 日期範圍選擇
    const dateInputs = document.querySelectorAll('.date-range input');
    dateInputs.forEach(input => {
        input.addEventListener('change', function() {
            handleDateRangeChange();
        });
    });

    // 行事曆日期點擊
    const calendarDays = document.querySelectorAll('.calendar-day');
    calendarDays.forEach(day => {
        day.addEventListener('click', function() {
            selectCalendarDay(this);
        });
    });
}

// 設置動畫效果
function setupAnimations() {
    // 統計數字動畫
    animateNumbers();
    
    // 卡片懸停效果
    const cards = document.querySelectorAll('.feature-card, .stat-card, .booking-item, .schedule-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// 載入演示數據
function loadDemoData() {
    // 模擬載入統計數據
    setTimeout(() => {
        updateStats();
    }, 1000);

    // 模擬載入預約數據
    setTimeout(() => {
        updateBookings();
    }, 1500);

    // 模擬載入排程數據
    setTimeout(() => {
        updateSchedules();
    }, 2000);
}

// 頁面切換功能
function showPage(pageId) {
    // 隱藏所有頁面
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // 顯示目標頁面
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageId;
        
        // 頁面特定初始化
        switch(pageId) {
            case 'bookings':
                initializeBookingsPage();
                break;
            case 'schedules':
                initializeSchedulesPage();
                break;
            case 'admin':
                initializeAdminPage();
                break;
            case 'login':
                initializeLoginPage();
                break;
        }
    }
}

// 標籤切換功能
function switchTab(tabId) {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    const targetTab = document.getElementById(tabId);
    if (targetTab) {
        targetTab.classList.add('active');
    }
}

// 登入處理
function handleLogin() {
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;

    // 模擬登入驗證
    if (email && password) {
        // 根據不同帳號設定用戶角色
        let userRole = 'CUSTOMER';
        if (email.includes('admin')) {
            userRole = 'ADMIN';
        } else if (email.includes('staff')) {
            userRole = 'STAFF';
        }

        currentUser = {
            email: email,
            role: userRole,
            name: email.split('@')[0]
        };

        showNotification('登入成功！', 'success');
        
        // 根據角色跳轉到相應頁面
        setTimeout(() => {
            if (userRole === 'ADMIN' || userRole === 'STAFF') {
                showPage('admin');
            } else {
                showPage('bookings');
            }
        }, 1000);
    } else {
        showNotification('請輸入完整的登入資訊', 'error');
    }
}

// 系統設定儲存
function handleSettingsSave() {
    showNotification('設定已儲存！', 'success');
}

// 搜尋處理
function handleSearch(query, pageId) {
    console.log(`在 ${pageId} 頁面搜尋: ${query}`);
    // 這裡可以實現實際的搜尋邏輯
}

// 日期範圍變更處理
function handleDateRangeChange() {
    const startDate = document.querySelector('.date-range input[type="date"]:first-of-type').value;
    const endDate = document.querySelector('.date-range input[type="date"]:last-of-type').value;
    
    if (startDate && endDate) {
        console.log(`日期範圍: ${startDate} 至 ${endDate}`);
        // 這裡可以實現根據日期範圍載入數據的邏輯
    }
}

// 行事曆日期選擇
function selectCalendarDay(dayElement) {
    // 移除其他日期的 active 類別
    const allDays = document.querySelectorAll('.calendar-day');
    allDays.forEach(day => day.classList.remove('active'));
    
    // 為選中的日期添加 active 類別
    dayElement.classList.add('active');
    
    // 這裡可以實現根據選中日期載入相應數據的邏輯
    console.log(`選中日期: ${dayElement.textContent}`);
}

// 數字動畫
function animateNumbers() {
    const numberElements = document.querySelectorAll('.stat-number, .stat-content h3');
    
    numberElements.forEach(element => {
        const finalValue = element.textContent;
        const numericValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));
        
        if (!isNaN(numericValue)) {
            animateNumber(element, 0, numericValue, 2000, finalValue);
        }
    });
}

// 數字動畫函數
function animateNumber(element, start, end, duration, originalText) {
    const startTime = performance.now();
    const isCurrency = originalText.includes('$');
    const isPercentage = originalText.includes('%');
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = start + (end - start) * progress;
        let displayValue;
        
        if (isCurrency) {
            displayValue = `$${Math.floor(current).toLocaleString()}`;
        } else if (isPercentage) {
            displayValue = `${current.toFixed(1)}%`;
        } else {
            displayValue = Math.floor(current).toLocaleString();
        }
        
        element.textContent = displayValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// 更新統計數據
function updateStats() {
    // 模擬數據更新
    const stats = {
        totalUsers: Math.floor(Math.random() * 200) + 100,
        totalBookings: Math.floor(Math.random() * 2000) + 1000,
        todayBookings: Math.floor(Math.random() * 50) + 20,
        totalRevenue: Math.floor(Math.random() * 100000) + 30000
    };

    // 更新首頁統計
    const totalUsersEl = document.getElementById('totalUsers');
    const totalBookingsEl = document.getElementById('totalBookings');
    const todayBookingsEl = document.getElementById('todayBookings');
    const totalRevenueEl = document.getElementById('totalRevenue');

    if (totalUsersEl) totalUsersEl.textContent = stats.totalUsers;
    if (totalBookingsEl) totalBookingsEl.textContent = stats.totalBookings;
    if (todayBookingsEl) todayBookingsEl.textContent = stats.todayBookings;
    if (totalRevenueEl) totalRevenueEl.textContent = `$${stats.totalRevenue.toLocaleString()}`;
}

// 更新預約數據
function updateBookings() {
    // 模擬預約狀態更新
    const bookingItems = document.querySelectorAll('.booking-item');
    bookingItems.forEach((item, index) => {
        // 隨機更新一些預約狀態
        if (Math.random() > 0.7) {
            const statusElement = item.querySelector('.booking-status');
            const actions = item.querySelector('.booking-actions');
            
            if (statusElement && actions) {
                // 模擬狀態變更
                const statuses = ['status-pending', 'status-confirmed', 'status-completed'];
                const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
                
                statusElement.className = `booking-status ${randomStatus}`;
                statusElement.textContent = getStatusText(randomStatus);
            }
        }
    });
}

// 更新排程數據
function updateSchedules() {
    // 模擬排程更新
    const scheduleItems = document.querySelectorAll('.schedule-item');
    scheduleItems.forEach((item, index) => {
        // 隨機更新一些時段狀態
        const timeSlots = item.querySelectorAll('.time-slot .status');
        timeSlots.forEach(slot => {
            if (Math.random() > 0.8) {
                const statuses = ['available', 'unavailable', 'break'];
                const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
                
                slot.className = `status ${randomStatus}`;
                slot.textContent = getScheduleStatusText(randomStatus);
            }
        });
    });
}

// 獲取狀態文字
function getStatusText(statusClass) {
    const statusMap = {
        'status-pending': '待確認',
        'status-confirmed': '已確認',
        'status-completed': '已完成',
        'status-cancelled': '已取消'
    };
    return statusMap[statusClass] || '未知狀態';
}

// 獲取排程狀態文字
function getScheduleStatusText(status) {
    const statusMap = {
        'available': '可預約',
        'unavailable': '不可預約',
        'break': '休息時間'
    };
    return statusMap[status] || '未知狀態';
}

// 顯示通知
function showNotification(message, type = 'info') {
    // 創建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;

    // 添加樣式
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

    // 添加到頁面
    document.body.appendChild(notification);

    // 顯示動畫
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // 自動隱藏
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 獲取通知圖標
function getNotificationIcon(type) {
    const iconMap = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return iconMap[type] || 'info-circle';
}

// 獲取通知顏色
function getNotificationColor(type) {
    const colorMap = {
        'success': '#28a745',
        'error': '#dc3545',
        'warning': '#ffc107',
        'info': '#17a2b8'
    };
    return colorMap[type] || '#17a2b8';
}

// 頁面特定初始化函數
function initializeBookingsPage() {
    console.log('初始化預約管理頁面');
    // 這裡可以添加預約頁面特定的初始化邏輯
}

function initializeSchedulesPage() {
    console.log('初始化排程管理頁面');
    // 這裡可以添加排程頁面特定的初始化邏輯
}

function initializeAdminPage() {
    console.log('初始化後台管理頁面');
    // 這裡可以添加後台管理頁面特定的初始化邏輯
}

function initializeLoginPage() {
    console.log('初始化登入頁面');
    // 這裡可以添加登入頁面特定的初始化邏輯
}

// 工具函數：格式化日期
function formatDate(date) {
    return new Date(date).toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

// 工具函數：格式化時間
function formatTime(time) {
    return new Date(time).toLocaleTimeString('zh-TW', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

// 工具函數：防抖函數
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 工具函數：節流函數
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 模擬 API 調用
function mockApiCall(endpoint, data = {}) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // 模擬不同的 API 回應
            let response;
            switch(endpoint) {
                case '/api/bookings':
                    response = { bookings: [], total: 0 };
                    break;
                case '/api/schedules':
                    response = { schedules: [], total: 0 };
                    break;
                case '/api/users':
                    response = { users: [], total: 0 };
                    break;
                default:
                    response = { success: true };
            }
            resolve(response);
        }, Math.random() * 1000 + 500); // 模擬網路延遲
    });
}

// 錯誤處理
function handleError(error, context = '') {
    console.error(`錯誤 ${context}:`, error);
    showNotification(`發生錯誤: ${error.message}`, 'error');
}

// 導出函數供全域使用
window.showPage = showPage;
window.switchTab = switchTab;
window.showNotification = showNotification;
