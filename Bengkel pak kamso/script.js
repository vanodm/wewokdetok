document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');
    const loginFormContainer = document.getElementById('login-form');
    const registerFormContainer = document.getElementById('register-form');
    const dashboard = document.getElementById('dashboard');
    const loggedInUser = document.getElementById('logged-in-user');
    const logoutBtn = document.getElementById('logout-btn');
    const dashboardContent = document.getElementById('dashboard-content');
    const mainContent = document.querySelector('main');
    const header = document.querySelector('header');
    const navHome = document.getElementById('nav-home');
    const navAbout = document.getElementById('nav-about');
    const navContact = document.getElementById('nav-contact');

    // Initialize
    checkLoginStatus();
    setupEventListeners();

    function setupEventListeners() {
        // Toggle password visibility
        document.querySelectorAll('.toggle-password').forEach(icon => {
            icon.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                const passwordInput = document.getElementById(targetId);
                const iconElement = this.querySelector('i');
                
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    iconElement.classList.replace('fa-eye', 'fa-eye-slash');
                } else {
                    passwordInput.type = 'password';
                    iconElement.classList.replace('fa-eye-slash', 'fa-eye');
                }
            });
        });

        // Toggle between login and register forms
        showRegister.addEventListener('click', function(e) {
            e.preventDefault();
            loginFormContainer.classList.add('hidden');
            registerFormContainer.classList.remove('hidden');
        });

        showLogin.addEventListener('click', function(e) {
            e.preventDefault();
            registerFormContainer.classList.add('hidden');
            loginFormContainer.classList.remove('hidden');
        });

        // Login form submission
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('login-username').value.trim();
            const password = document.getElementById('login-password').value.trim();
            
            if (!username || !password) {
                alert('Username dan password harus diisi!');
                return;
            }
            
            if (loginUser(username, password)) {
                showDashboard(username);
            } else {
                alert('Username atau password salah!');
            }
        });

        // Register form submission
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('register-username').value.trim();
            const password = document.getElementById('register-password').value.trim();
            const confirmPassword = document.getElementById('confirm-password').value.trim();
            
            if (!username || !password || !confirmPassword) {
                alert('Semua field harus diisi!');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Password tidak cocok!');
                return;
            }
            
            if (registerUser(username, password)) {
                alert('Pendaftaran berhasil! Silakan login.');
                registerForm.reset();
                registerFormContainer.classList.add('hidden');
                loginFormContainer.classList.remove('hidden');
            } else {
                alert('Username sudah terdaftar!');
            }
        });

        // Logout button
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('loggedInUser');
            location.reload();
        });

        // Navigation buttons
        navHome.addEventListener('click', function(e) {
            e.preventDefault();
            if (!dashboard.classList.contains('hidden')) {
                loadDashboardContent('consultation');
            }
        });

        navAbout.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Halaman About akan datang segera!');
        });

        navContact.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Hubungi kami di: bengkel@example.com');
        });

        // Dashboard menu buttons
        document.querySelectorAll('.menu-card').forEach(card => {
            card.addEventListener('click', function() {
                loadDashboardContent(this.id);
            });
        });
    }

    function checkLoginStatus() {
        const user = localStorage.getItem('loggedInUser');
        if (user) {
            showDashboard(user);
        }
    }

    function showDashboard(username) {
        mainContent.classList.add('hidden');
        header.classList.add('hidden');
        dashboard.classList.remove('hidden');
        loggedInUser.textContent = username;
        loadDashboardContent('consultation');
    }

    function loadDashboardContent(menu) {
        let content = '';
        
        switch(menu) {
            case 'consultation':
                content = `
                <div class="consultation-content">
                    <div class="content-header">
                        <h3><i class="fas fa-tools"></i> Konsultasi Kerusakan</h3>
                    </div>
                    <form id="consultationForm">
                        <div class="form-group">
                            <label for="vehicle-type">Jenis Kendaraan</label>
                            <select id="vehicle-type" required>
                                <option value="">Pilih Jenis Kendaraan</option>
                                <option value="motor">Motor</option>
                                <option value="mobil">Mobil</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="issue">Deskripsi Kerusakan</label>
                            <textarea id="issue" placeholder="Jelaskan gejala kerusakan yang Anda alami..." required></textarea>
                        </div>
                        <button type="submit"><i class="fas fa-paper-plane"></i> Kirim Konsultasi</button>
                    </form>
                </div>`;
                break;
                
            case 'booking':
                content = `
                <div class="booking-content">
                    <div class="content-header">
                        <h3><i class="fas fa-calendar-check"></i> Booking Service</h3>
                    </div>
                    <form id="bookingForm">
                        <div class="form-group">
                            <label for="service-type">Jenis Service</label>
                            <select id="service-type" required>
                                <option value="">Pilih Jenis Service</option>
                                <option value="tune-up">Tune Up</option>
                                <option value="ganti-oli">Ganti Oli</option>
                                <option value="rem">Service Rem</option>
                                <option value="full">Service Lengkap</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="booking-date">Tanggal Booking</label>
                            <input type="date" id="booking-date" required>
                        </div>
                        <button type="submit"><i class="fas fa-calendar-plus"></i> Booking Sekarang</button>
                    </form>
                </div>`;
                break;
                
            case 'status':
                content = `
                <div class="status-content">
                    <div class="content-header">
                        <h3><i class="fas fa-clipboard-list"></i> Status Service</h3>
                    </div>
                    <div class="service-list">
                        <div class="service-item">
                            <p><strong>Service Ganti Oli</strong></p>
                            <p>Status: Dalam Antrian</p>
                            <p>Tanggal: 15 Juni 2023</p>
                        </div>
                        <div class="text-center">
                            <p>Fitur ini akan segera diperbarui dengan data real-time</p>
                        </div>
                    </div>
                </div>`;
                break;
                
            case 'payment':
                content = `
                <div class="payment-content">
                    <div class="content-header">
                        <h3><i class="fas fa-credit-card"></i> Pembayaran</h3>
                    </div>
                    <div class="service-list">
                        <div class="service-item">
                            <p><strong>Invoice #12345</strong></p>
                            <p>Jumlah: Rp 350.000</p>
                            <p>Status: Belum Dibayar</p>
                        </div>
                        <div class="text-center">
                            <p>Sistem pembayaran online akan segera tersedia</p>
                        </div>
                    </div>
                </div>`;
                break;
        }
        
        dashboardContent.innerHTML = content;
        
        // Add event listeners for dynamic forms
        if (menu === 'consultation') {
            document.getElementById('consultationForm')?.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Konsultasi Anda telah terkirim! Kami akan menghubungi Anda segera.');
                this.reset();
            });
        }
        
        if (menu === 'booking') {
            document.getElementById('bookingForm')?.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Booking service berhasil! Kami telah mengirimkan konfirmasi via email.');
                this.reset();
            });
        }
    }

    function loginUser(username, password) {
        const users = getUsers();
        return users[username] && users[username] === password;
    }

    function registerUser(username, password) {
        const users = getUsers();
        if (users[username]) return false;
        
        users[username] = password;
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    }

    function getUsers() {
        return JSON.parse(localStorage.getItem('users') || '{}');
    }
});