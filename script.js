document.addEventListener('DOMContentLoaded', function() {
    // DOM elementlar
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const themeToggle = document.getElementById('themeToggle');
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    const langBtns = document.querySelectorAll('.lang-btn');
    const markReadBtn = document.querySelector('.mark-read');
    
    // 1. Mobile menu toggle
    if (mobileBtn) {
        mobileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navLinks && navLinks.classList.contains('active') && 
            !event.target.closest('.main-nav')) {
            navLinks.classList.remove('active');
            const icon = mobileBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });

    // 2. Kun/tun rejimi
    function initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.className = savedTheme + '-theme';
    }
    
    initTheme();

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            if (document.body.classList.contains('light-theme')) {
                document.body.classList.remove('light-theme');
                document.body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-theme');
                document.body.classList.add('light-theme');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // 3. Bildirishnomalar
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            notificationDropdown.classList.toggle('active');
        });
    }

    // Close notifications when clicking outside
    document.addEventListener('click', function(event) {
        if (notificationDropdown && notificationDropdown.classList.contains('active') && 
            !event.target.closest('.notifications')) {
            notificationDropdown.classList.remove('active');
        }
    });

    // Mark all notifications as read
    if (markReadBtn) {
        markReadBtn.addEventListener('click', function() {
            const unreadItems = document.querySelectorAll('.notification-item.unread');
            unreadItems.forEach(item => {
                item.classList.remove('unread');
            });
            
            const badge = document.querySelector('.notification-badge');
            if (badge) {
                badge.style.display = 'none';
            }
        });
    }

    // 4. Vaqt va sanani yangilash
    function updateDateTime() {
        const now = new Date();
        
        const dateOptions = { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit',
            weekday: 'long'
        };
        
        const timeOptions = { 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        
        const dateElement = document.getElementById('date');
        const timeElement = document.getElementById('time');
        
        if (dateElement) {
            dateElement.textContent = now.toLocaleDateString('uz-UZ', dateOptions);
        }
        
        if (timeElement) {
            timeElement.textContent = now.toLocaleTimeString('uz-UZ', timeOptions);
        }
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);

    // 5. Til tanlash funksiyasi
    const translations = {
        uz: {
            apply: "ARIZA BERISH",
            about: "BIZ HAQIMIZDA",
            history: "VAZIRLIK",
            leadership: "RAHBARIYAT",
            tasks: "BOG'LANISH",
            symbols: "KO'P BERILADIGAN SAVOLLAR",
            international: "Xalqaro hamkorlik",
            career: "KARYERA",
            militaryService: "HARBIY XIZMATGA QADAM",
            contract: "HARBIY XIZMAT DAVRI",
            academies: "HARBIY XIZMATDAN SO'NG",
            internship: "",
            candidates: "NOMZODLARGA",
            requirements: "SARALASH",
            documents: "KBHX GA",
            exams: "OHTM GA",
            benefits: "HAL GA",
            benefitsT: "HTO'M",
            vacancies: "VAKANSIYA",
            officers: "Ofitserlar",
            sergeants: "Serjantlar",
            specialists: "Mutaxassislar",
            civilians: "Fuqarolik xodimlari",
            news: "YANGILIKLAR",
            latest: "So'nggi yangiliklar",
            official: "Rasmiy bayonotlar",
            photo: "Foto galereya",
            video: "Video materiallar",
            welcomeTitle: "O'zbekiston Respublikasi Mudofaa Vazirligi",
            motto: "Vatan himoyasi - oliy burch!",
            description: "Bugungi kunda Mudofaa Vazirligi tomonidan yoshlarni harbiy-vatanparvarlik ruhida tarbiyalash, mudofaa qobiliyatini mustahkamlash va zamonaviy harbiy texnikalar bilan ta'minlash bo'yicha keng ko'lamli ishlar amalga oshirilmoqda.",
            searchPlaceholder: "Qidirish..."
        },
        ru: {
            apply: "ПОДАТЬ ЗАЯВКУ",
            about: "О НАС",
            history: "История",
            leadership: "Руководство",
            tasks: "Задачи",
            symbols: "Символы",
            international: "Международное сотрудничество",
            career: "КАРЬЕРА",
            militaryService: "Военная служба",
            contract: "По контракту",
            academies: "Высшие военные училища",
            internship: "Стажировка",
            candidates: "КАНДИДАТАМ",
            requirements: "Требования",
            documents: "Список документов",
            exams: "Тестовые испытания",
            benefits: "Льготы",
            vacancies: "ВАКАНСИИ",
            officers: "Офицеры",
            sergeants: "Сержанты",
            specialists: "Специалисты",
            civilians: "Гражданские служащие",
            news: "НОВОСТИ",
            latest: "Последние новости",
            official: "Официальные заявления",
            photo: "Фотогалерея",
            video: "Видеоматериалы",
            welcomeTitle: "Министерство Обороны Республики Узбекистан",
            motto: "Защита Родины - высший долг!",
            description: "В настоящее время Министерством Обороны проводится масштабная работа по военно-патриотическому воспитанию молодежи, укреплению обороноспособности и оснащению современной военной техникой.",
            searchPlaceholder: "Поиск..."
        },
        en: {
            apply: "APPLY NOW",
            about: "ABOUT US",
            history: "History",
            leadership: "Leadership",
            tasks: "Tasks",
            symbols: "Symbols",
            international: "International Cooperation",
            career: "CAREER",
            militaryService: "Military Service",
            contract: "Contract Based",
            academies: "Military Academies",
            internship: "Internship",
            candidates: "CANDIDATES",
            requirements: "Requirements",
            documents: "Documents List",
            exams: "Examinations",
            benefits: "Benefits",
            vacancies: "VACANCIES",
            officers: "Officers",
            sergeants: "Sergeants",
            specialists: "Specialists",
            civilians: "Civilian Employees",
            news: "NEWS",
            latest: "Latest News",
            official: "Official Statements",
            photo: "Photo Gallery",
            video: "Video Materials",
            welcomeTitle: "Ministry of Defense of the Republic of Uzbekistan",
            motto: "Defense of the Motherland is the Supreme Duty!",
            description: "Currently, the Ministry of Defense is carrying out extensive work on military-patriotic education of youth, strengthening defense capabilities and providing modern military equipment.",
            searchPlaceholder: "Search..."
        }
    };

    function changeLanguage(lang) {
        langBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        const searchInput = document.getElementById('searchInput');
        if (searchInput && translations[lang].searchPlaceholder) {
            searchInput.placeholder = translations[lang].searchPlaceholder;
        }

        localStorage.setItem('language', lang);
    }

    langBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            changeLanguage(this.dataset.lang);
        });
    });

    const savedLang = localStorage.getItem('language') || 'uz';
    changeLanguage(savedLang);

    // 6. Qidiruv funksiyasi
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    function performSearch() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm.length > 0) {
            alert(`Qidiruv: "${searchTerm}" - Bu funksiya hozircha demo rejimida`);
        }
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    // 7. Video play button click
    // const playButtons = document.querySelectorAll('.play-button');
    // playButtons.forEach(button => {
    //     button.addEventListener('click', function() {
    //         alert('Video player - Bu funksiya hozircha demo rejimida');
    //     });
    // });

    // 8. Report error functionality (CTRL+Enter)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            const selection = window.getSelection();
            const selectedText = selection.toString().trim();
            
            if (selectedText.length > 0) {
                alert(`Xato belgilandi: "${selectedText}"\nRahmat! Xato haqida xabar berganingiz uchun.`);
                // Bu yerda xatoni serverga yuborish mumkin
            } else {
                alert('Iltimos, avval matnni belgilang!');
            }
        }
    });

    console.log('Navbar muvaffaqiyatli yuklandi!');
});