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
            symbols: "KO'P BERILADIGAN SAVOLLAR (FAQ)",
            international: "Xalqaro hamkorlik",
            career: "KARYERA",
            militaryService: "BU NIMA ?",
            contract: "HARBIY XIZMATGA QADAM",
            academies: "HARBIY XIZMAT DAVRI",
            internship: "HARBIY XIZMATDAN SO'NG",
            candidates: "NOMZODLARGA",
            requirements: "SARALASH NIMA",
            documents: "KBHX GA",
            exams: "OHTM GA",
            benefits: "HAL GA",
            benefitsT: "HTO'M",
            vacancies: "VAKANSIYA",
            officers: "OFITSERLIK LAVOZIMLARIGA",
            sergeants: "SERJANTLIK LAVOZIMLARIGA",
            specialists: "Mutaxassislar",
            civilians: "Fuqarolik xodimlari",
            news: "YANGILIKLAR",
            datess: "HUJJATLAR",
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


// ariza
// Agar qo'shimcha funksiyalar kerak bo'lsa
document.addEventListener('DOMContentLoaded', function() {
    // Kartalarni qayta animatsiya qilish (kerak bo'lsa)
    const cards = document.querySelectorAll('.application-card');
    
    // "Ariza berish" tugmalari uchun event listener
    const applyButtons = document.querySelectorAll('.btn-apply');
    applyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.application-card');
            const cardType = card.getAttribute('data-type');
            const cardTitle = card.querySelector('.card-title').textContent;
            
            // Bu yerda o'zingizning logikangizni qo'shing
            console.log('Ariza turi:', cardType);
            console.log('Sarlavha:', cardTitle);
            
            // Misol: alert o'rniga modal oynacha ochish
            // window.location.href = 'ariza-formasi.html?type=' + cardType;
        });
    });
});
// ariza

// faq
// FAQ Accordion funksiyasi
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Agar ochiq bo'lsa yopish
            if (item.classList.contains('active')) {
                item.classList.remove('active');
            } else {
                // Boshqa ochiqlarni yopish (agar faqat bittasi ochiq bo'lishi kerak bo'lsa)
                // faqItems.forEach(i => i.classList.remove('active'));
                
                // Faqat shu elementni ochish (boshqalari ochiq qoladi)
                item.classList.add('active');
            }
        });
    });
    
    // Qo'shimcha: URL dan #faq bo'lsa scroll qilish
    if (window.location.hash === '#faq') {
        const faqSection = document.getElementById('faq');
        if (faqSection) {
            setTimeout(() => {
                faqSection.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }
    
    // Kontakt tugmasi uchun event
    const contactBtn = document.querySelector('.faq-contact-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Bu yerda o'zingizning logikangizni qo'shing
            alert('Tez orada operatorlarimiz siz bilan bog\'lanadi');
            // window.location.href = 'boglanish.html';
        });
    }
});

// Agar sahifa yuklanganda birinchi FAQ ni ochiq qilish kerak bo'lsa
window.addEventListener('load', function() {
    // Birinchi FAQ ni ochish (agar kerak bo'lsa)
    // const firstFaq = document.querySelector('.faq-item');
    // if (firstFaq) {
    //     firstFaq.classList.add('active');
    // }
});
// 


/* ariza oson */
/* ariza oson */
// ========== HARBIY XIZMATCHILAR OYLIGI HISOBI ==========
document.addEventListener('DOMContentLoaded', function() {
    const rankSelect = document.getElementById('rankSelect');
    const positionSelect = document.getElementById('positionSelect');
    const experienceSelect = document.getElementById('experienceSelect');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultBox = document.getElementById('resultBox');
    const salaryAmount = document.getElementById('salaryAmount');

    // Bazaviy oylik miqdori
    const baseSalary = 2500000; // 2.5 million so'm

    calculateBtn.addEventListener('click', function() {
        const rankValue = parseFloat(rankSelect.value) || 1;
        const positionValue = parseFloat(positionSelect.value) || 1;
        const experienceValue = parseFloat(experienceSelect.value) || 1;

        if (rankSelect.value === '0' || positionSelect.value === '0' || experienceSelect.value === '0') {
            alert('Iltimos, barcha maydonlarni to\'ldiring!');
            return;
        }

        // Oylikni hisoblash: bazaviy oylik * unvon koeffitsienti * lavozim koeffitsienti * ish staji koeffitsienti
        const calculatedSalary = Math.round(baseSalary * rankValue * positionValue * experienceValue);
        
        // Sonni formatlash (masalan: 2500000 -> 2 500 000)
        const formattedSalary = calculatedSalary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        
        salaryAmount.textContent = formattedSalary;
        resultBox.style.display = 'block';

        // Rangli natija
        if (calculatedSalary < 4000000) {
            salaryAmount.style.color = '#27ae60';
        } else if (calculatedSalary < 7000000) {
            salaryAmount.style.color = '#f39c12';
        } else {
            salaryAmount.style.color = '#d32f2f';
        }
    });

    // Real vaqtni yangilash (agar mavjud bo'lsa)
    function updateDateTime() {
        const dateElement = document.getElementById('date');
        const timeElement = document.getElementById('time');
        
        if (dateElement && timeElement) {
            const now = new Date();
            const dateStr = now.toLocaleDateString('uz-UZ', { day: '2-digit', month: '2-digit', year: 'numeric' });
            const timeStr = now.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
            
            dateElement.textContent = dateStr;
            timeElement.textContent = timeStr;
        }
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);
});
/* ariza oson */

// <!-- okruglar -->

// ========== HARBIY OKRUGLAR MODAL OYNA ==========
// ========== HARBIY OKRUGLAR MODAL OYNA ==========
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('districtModal');
    const modalBody = document.getElementById('modalBody');
    const closeBtn = document.querySelector('.close-modal');
    const districtCards = document.querySelectorAll('.district-card');

    // Modal oyna mavjudligini tekshirish
    if (!modal || !modalBody) return;

    // Har bir okrug uchun click event
    districtCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Okrug ID sini olish
            const districtId = this.getAttribute('data-district');
            
            // Mos keladigan ma'lumotni olish
            const infoElement = document.getElementById(`info-${districtId}`);
            
            if (infoElement) {
                // Ma'lumotni modal oynaga joylash
                modalBody.innerHTML = infoElement.innerHTML;
                
                // Modalni ko'rsatish
                modal.style.display = 'block';
                
                // Body scrollini to'xtatish
                document.body.style.overflow = 'hidden';
                
                // Mobil uchun modalni yuqoridan ochish
                setTimeout(() => {
                    modal.scrollTop = 0;
                }, 100);
            }
        });
    });

    // Close tugmasi
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        // Touch uchun
        closeBtn.addEventListener('touchstart', function(e) {
            e.preventDefault();
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Modal tashqarisiga bosilganda yopish
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Touch uchun
    window.addEventListener('touchstart', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // ESC tugmasi bilan yopish
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Back button bilan yopish (mobil uchun)
    window.addEventListener('popstate', function() {
        if (modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Orientation change (mobil aylantirilganda)
    window.addEventListener('orientationchange', function() {
        if (modal.style.display === 'block') {
            // Modal oynani markazga qaytarish
            setTimeout(() => {
                modal.scrollTop = 0;
            }, 200);
        }
    });
});
// <!-- okruglar -->

// ========== HARBIY OKRUGLAR MODAL ==========
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('districtModal');
    const modalBody = document.getElementById('modalBody');
    const closeBtn = document.querySelector('.close-modal');
    const districtCards = document.querySelectorAll('.district-card');

    if (!modal || !modalBody) return;

    // Har bir okrug kartasi uchun click event
    districtCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const districtId = this.getAttribute('data-district');
            const infoElement = document.getElementById(`info-${districtId}`);
            
            if (infoElement) {
                modalBody.innerHTML = infoElement.innerHTML;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                
                setTimeout(() => {
                    modal.scrollTop = 0;
                }, 100);
            }
        });
    });

    // Close tugmasi
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Modal tashqarisiga bosilganda yopish
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // ESC tugmasi bilan yopish
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});