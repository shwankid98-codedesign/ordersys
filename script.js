// 記帳系統 DEMO JavaScript

// 全局變量
let currentSection = 'dashboard';
let demoData = {
    transactions: [
        {
            id: 1,
            type: 'income',
            description: '薪資收入',
            amount: 45000,
            account: '銀行帳戶',
            category: '薪資',
            date: '2025-01-15T09:30:00',
            time: '09:30'
        },
        {
            id: 2,
            type: 'expense',
            description: '超市購物',
            amount: 2350,
            account: '信用卡',
            category: '生活用品',
            date: '2025-01-14T18:45:00',
            time: '18:45'
        },
        {
            id: 3,
            type: 'expense',
            description: '房租',
            amount: 15000,
            account: '銀行帳戶',
            category: '居住',
            date: '2025-01-10T10:00:00',
            time: '10:00'
        },
        {
            id: 4,
            type: 'transfer',
            description: '轉帳到儲蓄帳戶',
            amount: 10000,
            account: '銀行帳戶',
            category: '轉帳',
            date: '2025-01-08T14:20:00',
            time: '14:20'
        }
    ],
    accounts: [
        {
            id: 1,
            name: '銀行帳戶',
            type: 'bank',
            balance: 125000,
            description: '主要銀行帳戶'
        },
        {
            id: 2,
            name: '信用卡',
            type: 'credit',
            balance: 45000,
            description: '主要信用卡'
        },
        {
            id: 3,
            name: '儲蓄帳戶',
            type: 'savings',
            balance: 50000,
            description: '定期儲蓄'
        },
        {
            id: 4,
            name: '現金',
            type: 'cash',
            balance: 5000,
            description: '日常現金'
        }
    ],
    categories: [
        { id: 1, name: '薪資', type: 'income', color: '#4CAF50' },
        { id: 2, name: '獎金', type: 'income', color: '#4CAF50' },
        { id: 3, name: '居住', type: 'expense', color: '#f44336' },
        { id: 4, name: '餐飲', type: 'expense', color: '#f44336' },
        { id: 5, name: '生活用品', type: 'expense', color: '#f44336' },
        { id: 6, name: '交通', type: 'expense', color: '#f44336' }
    ],
    budgets: [
        {
            id: 1,
            name: '餐飲預算',
            category: '餐飲',
            total: 10000,
            spent: 7500,
            period: 'monthly'
        },
        {
            id: 2,
            name: '生活用品預算',
            category: '生活用品',
            total: 4000,
            spent: 1800,
            period: 'monthly'
        },
        {
            id: 3,
            name: '交通預算',
            category: '交通',
            total: 3000,
            spent: 2700,
            period: 'monthly'
        }
    ]
};

// 頁面導航功能
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            showSection(section);
        });
    });
}

function showSection(sectionName) {
    // 隱藏所有頁面
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // 移除所有導航鏈接的活動狀態
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // 顯示選中的頁面
    const targetPage = document.getElementById(sectionName);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // 設置對應導航鏈接為活動狀態
    const targetLink = document.querySelector(`[data-section="${sectionName}"]`);
    if (targetLink) {
        targetLink.classList.add('active');
    }

    currentSection = sectionName;
}

// 模態框功能
function showModal(type) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalForm = document.getElementById('modal-form');

    // 根據類型設置標題和表單
    switch (type) {
        case 'addTransaction':
            modalTitle.textContent = '新增交易';
            modalForm.innerHTML = generateTransactionForm();
            break;
        case 'addAccount':
            modalTitle.textContent = '新增帳戶';
            modalForm.innerHTML = generateAccountForm();
            break;
        case 'addCategory':
            modalTitle.textContent = '新增分類';
            modalForm.innerHTML = generateCategoryForm();
            break;
        case 'addBudget':
            modalTitle.textContent = '新增預算';
            modalForm.innerHTML = generateBudgetForm();
            break;
    }

    modal.classList.add('show');
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// 表單生成函數
function generateTransactionForm() {
    return `
        <form id="transactionForm">
            <div class="form-group">
                <label for="transactionType">交易類型 *</label>
                <select id="transactionType" name="type" required>
                    <option value="expense">支出</option>
                    <option value="income">收入</option>
                    <option value="transfer">轉帳</option>
                </select>
            </div>
            <div class="form-group">
                <label for="transactionAmount">金額 *</label>
                <input type="number" id="transactionAmount" name="amount" step="0.01" min="0" required>
            </div>
            <div class="form-group">
                <label for="transactionDescription">描述 *</label>
                <input type="text" id="transactionDescription" name="description" required>
            </div>
            <div class="form-group">
                <label for="transactionDate">日期時間 *</label>
                <input type="datetime-local" id="transactionDate" name="date" required>
            </div>
            <div class="form-group">
                <label for="transactionAccount">帳戶 *</label>
                <select id="transactionAccount" name="account" required>
                    <option value="">選擇帳戶</option>
                    <option value="銀行帳戶">銀行帳戶</option>
                    <option value="信用卡">信用卡</option>
                    <option value="儲蓄帳戶">儲蓄帳戶</option>
                    <option value="現金">現金</option>
                </select>
            </div>
            <div class="form-group">
                <label for="transactionCategory">分類</label>
                <select id="transactionCategory" name="category">
                    <option value="">選擇分類（可選）</option>
                    <option value="薪資">薪資</option>
                    <option value="獎金">獎金</option>
                    <option value="居住">居住</option>
                    <option value="餐飲">餐飲</option>
                    <option value="生活用品">生活用品</option>
                    <option value="交通">交通</option>
                </select>
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">取消</button>
                <button type="submit" class="btn btn-primary">新增交易</button>
            </div>
        </form>
    `;
}

function generateAccountForm() {
    return `
        <form id="accountForm">
            <div class="form-group">
                <label for="accountName">帳戶名稱 *</label>
                <input type="text" id="accountName" name="name" required>
            </div>
            <div class="form-group">
                <label for="accountType">帳戶類型 *</label>
                <select id="accountType" name="type" required>
                    <option value="bank">銀行帳戶</option>
                    <option value="credit">信用卡</option>
                    <option value="savings">儲蓄帳戶</option>
                    <option value="cash">現金</option>
                </select>
            </div>
            <div class="form-group">
                <label for="accountBalance">初始餘額</label>
                <input type="number" id="accountBalance" name="balance" step="0.01" value="0">
            </div>
            <div class="form-group">
                <label for="accountDescription">描述</label>
                <textarea id="accountDescription" name="description" rows="3"></textarea>
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">取消</button>
                <button type="submit" class="btn btn-primary">新增帳戶</button>
            </div>
        </form>
    `;
}

function generateCategoryForm() {
    return `
        <form id="categoryForm">
            <div class="form-group">
                <label for="categoryName">分類名稱 *</label>
                <input type="text" id="categoryName" name="name" required>
            </div>
            <div class="form-group">
                <label for="categoryType">分類類型 *</label>
                <select id="categoryType" name="type" required>
                    <option value="income">收入</option>
                    <option value="expense">支出</option>
                </select>
            </div>
            <div class="form-group">
                <label for="categoryColor">顏色</label>
                <input type="color" id="categoryColor" name="color" value="#667eea">
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">取消</button>
                <button type="submit" class="btn btn-primary">新增分類</button>
            </div>
        </form>
    `;
}

function generateBudgetForm() {
    return `
        <form id="budgetForm">
            <div class="form-group">
                <label for="budgetName">預算名稱 *</label>
                <input type="text" id="budgetName" name="name" required>
            </div>
            <div class="form-group">
                <label for="budgetCategory">分類 *</label>
                <select id="budgetCategory" name="category" required>
                    <option value="">選擇分類</option>
                    <option value="餐飲">餐飲</option>
                    <option value="生活用品">生活用品</option>
                    <option value="交通">交通</option>
                    <option value="居住">居住</option>
                </select>
            </div>
            <div class="form-group">
                <label for="budgetAmount">預算金額 *</label>
                <input type="number" id="budgetAmount" name="amount" step="0.01" min="0" required>
            </div>
            <div class="form-group">
                <label for="budgetPeriod">預算週期 *</label>
                <select id="budgetPeriod" name="period" required>
                    <option value="monthly">每月</option>
                    <option value="quarterly">每季</option>
                    <option value="yearly">每年</option>
                </select>
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">取消</button>
                <button type="submit" class="btn btn-primary">新增預算</button>
            </div>
        </form>
    `;
}

// 表單提交處理
function initFormHandlers() {
    // 模態框點擊外部關閉
    document.getElementById('modal').addEventListener('click', (e) => {
        if (e.target.id === 'modal') {
            closeModal();
        }
    });

    // 表單提交事件委託
    document.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (e.target.id === 'transactionForm') {
            handleTransactionSubmit(e.target);
        } else if (e.target.id === 'accountForm') {
            handleAccountSubmit(e.target);
        } else if (e.target.id === 'categoryForm') {
            handleCategorySubmit(e.target);
        } else if (e.target.id === 'budgetForm') {
            handleBudgetSubmit(e.target);
        }
    });
}

function handleTransactionSubmit(form) {
    const formData = new FormData(form);
    const transaction = {
        id: Date.now(),
        type: formData.get('type'),
        amount: parseFloat(formData.get('amount')),
        description: formData.get('description'),
        date: formData.get('date'),
        account: formData.get('account'),
        category: formData.get('category') || '未分類'
    };

    demoData.transactions.unshift(transaction);
    showNotification('交易新增成功！', 'success');
    closeModal();
    form.reset();
}

function handleAccountSubmit(form) {
    const formData = new FormData(form);
    const account = {
        id: Date.now(),
        name: formData.get('name'),
        type: formData.get('type'),
        balance: parseFloat(formData.get('balance')) || 0,
        description: formData.get('description') || ''
    };

    demoData.accounts.push(account);
    showNotification('帳戶新增成功！', 'success');
    closeModal();
    form.reset();
}

function handleCategorySubmit(form) {
    const formData = new FormData(form);
    const category = {
        id: Date.now(),
        name: formData.get('name'),
        type: formData.get('type'),
        color: formData.get('color')
    };

    demoData.categories.push(category);
    showNotification('分類新增成功！', 'success');
    closeModal();
    form.reset();
}

function handleBudgetSubmit(form) {
    const formData = new FormData(form);
    const budget = {
        id: Date.now(),
        name: formData.get('name'),
        category: formData.get('category'),
        total: parseFloat(formData.get('amount')),
        spent: 0,
        period: formData.get('period')
    };

    demoData.budgets.push(budget);
    showNotification('預算新增成功！', 'success');
    closeModal();
    form.reset();
}

// 通知系統
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // 添加通知樣式
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;

    document.body.appendChild(notification);

    // 3秒後自動移除
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// 篩選功能
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-select, .filter-input');
    filterButtons.forEach(input => {
        input.addEventListener('change', applyFilters);
    });
}

function applyFilters() {
    // 這裡可以實現篩選邏輯
    console.log('應用篩選器');
}

// 動畫效果
function initAnimations() {
    // 添加 CSS 動畫
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
    `;
    document.head.appendChild(style);
}

// 數據統計計算
function calculateStats() {
    const transactions = demoData.transactions;
    let totalIncome = 0;
    let totalExpense = 0;
    let totalTransfer = 0;

    transactions.forEach(transaction => {
        if (transaction.type === 'income') {
            totalIncome += transaction.amount;
        } else if (transaction.type === 'expense') {
            totalExpense += transaction.amount;
        } else if (transaction.type === 'transfer') {
            totalTransfer += transaction.amount;
        }
    });

    return {
        totalIncome,
        totalExpense,
        totalTransfer,
        netIncome: totalIncome - totalExpense,
        transactionCount: transactions.length
    };
}

// 更新統計數據顯示
function updateStatsDisplay() {
    const stats = calculateStats();
    
    // 更新統計卡片
    const statCards = document.querySelectorAll('.stat-value');
    if (statCards.length >= 4) {
        statCards[0].textContent = `NT$ ${stats.totalIncome.toLocaleString()}`;
        statCards[1].textContent = `NT$ ${stats.totalExpense.toLocaleString()}`;
        statCards[2].textContent = `NT$ ${stats.netIncome.toLocaleString()}`;
        statCards[3].textContent = stats.transactionCount.toString();
    }
}

// 模擬數據加載
function loadDemoData() {
    // 設置當前日期時間為默認值
    const now = new Date();
    const dateTimeInput = document.getElementById('transactionDate');
    if (dateTimeInput) {
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        dateTimeInput.value = `${year}-${month}-${day}T${hours}:${minutes}`;
    }
}

// 頁面初始化
function init() {
    console.log('記帳系統 DEMO 初始化中...');
    
    // 初始化各個功能模塊
    initNavigation();
    initFormHandlers();
    initFilters();
    initAnimations();
    
    // 更新統計數據
    updateStatsDisplay();
    
    // 設置默認日期時間
    setTimeout(loadDemoData, 100);
    
    console.log('記帳系統 DEMO 初始化完成！');
    showNotification('歡迎使用記帳系統 DEMO！', 'success');
}

// 頁面加載完成後初始化
document.addEventListener('DOMContentLoaded', init);

// 導出全局函數供 HTML 調用
window.showModal = showModal;
window.closeModal = closeModal;
window.showSection = showSection;
