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


// yangiliklar
// Galereya tablarini boshqarish
document.addEventListener('DOMContentLoaded', function() {
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    const galleryContents = document.querySelectorAll('.gallery-content');
    
    if (galleryTabs.length > 0) {
        galleryTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Active tab ni o'zgartirish
                galleryTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Active content ni o'zgartirish
                const tabId = this.dataset.tab;
                galleryContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === tabId + '-gallery') {
                        content.classList.add('active');
                    }
                });
            });
        });
    }
});

// yangiliklar

// kabinet1
// FAQ Accordion
// document.addEventListener('DOMContentLoaded', function() {
//     const faqItems = document.querySelectorAll('.faq-item');
    
//     if (faqItems.length > 0) {
//         faqItems.forEach(item => {
//             const question = item.querySelector('.faq-question');
            
//             question.addEventListener('click', function() {
//                 // Active classni o'zgartirish
//                 item.classList.toggle('active');
                
//                 // Boshqa ochiq FAQ larni yopish
//                 faqItems.forEach(otherItem => {
//                     if (otherItem !== item && otherItem.classList.contains('active')) {
//                         otherItem.classList.remove('active');
//                     }
//                 });
//             });
//         });
//     }
// });

// kabinet1

// Region tabs bo'yicha vakansiyalarni filtrlash
// document.addEventListener('DOMContentLoaded', function() {
//     const regionTabs = document.querySelectorAll('.region-tab');
//     const vacancyCards = document.querySelectorAll('.vacancy-card');
    
//     if (regionTabs.length > 0) {
//         regionTabs.forEach(tab => {
//             tab.addEventListener('click', function() {
//                 // Active tabni o'zgartirish
//                 regionTabs.forEach(t => t.classList.remove('active'));
//                 this.classList.add('active');
                
//                 const selectedRegion = this.dataset.region;
                
//                 // Vakansiyalarni filtrlash
//                 vacancyCards.forEach(card => {
//                     if (selectedRegion === 'all') {
//                         card.style.display = 'block';
//                     } else {
//                         if (card.dataset.region === selectedRegion) {
//                             card.style.display = 'block';
//                         } else {
//                             card.style.display = 'none';
//                         }
//                     }
//                 });
//             });
//         });
//     }
    
    // Vakansiya ariza tugmalari
    
    /* oson ariza */
    // Ariza bosqichlarini boshqarish
document.addEventListener('DOMContentLoaded', function() {
    // Bosqichlar ma'lumotlari
    const steps = document.querySelectorAll('.timeline-step');
    const stepStatuses = [
        document.getElementById('status-step1'),
        document.getElementById('status-step2'),
        document.getElementById('status-step3'),
        document.getElementById('status-step4'),
        document.getElementById('status-step5'),
        document.getElementById('status-step6'),
        document.getElementById('status-step7')
    ];
    
    const progressBar = document.getElementById('progressBar');
    const progressPercent = document.getElementById('progressPercent');
    const currentStepText = document.getElementById('currentStepText');
    
    const stepNames = [
        'Ro\'yxatdan o\'tish',
        'Hujjat topshirish',
        'Hujjatlarni tekshirish',
        'Tibbiy ko\'rik',
        'Jismoniy tayyorgarlik',
        'Suhbat',
        'Harbiy qasamyod'
    ];
    
    let currentStep = 1; // 1-bosqichdan boshlanadi
    
    // Bosqichni yangilash
    function updateStep(stepNumber) {
        // Avvalgi aktiv va completed larni tozalash
        steps.forEach(step => {
            step.classList.remove('active', 'completed');
        });
        
        // Bosqichlarni yangilash
        for (let i = 0; i < steps.length; i++) {
            if (i + 1 < stepNumber) {
                // Tugallangan bosqichlar
                steps[i].classList.add('completed');
                if (stepStatuses[i]) {
                    stepStatuses[i].innerHTML = '<span class="status-badge completed">Bajarildi</span>';
                }
            } else if (i + 1 === stepNumber) {
                // Joriy bosqich
                steps[i].classList.add('active');
                if (stepStatuses[i]) {
                    stepStatuses[i].innerHTML = '<span class="status-badge processing">Jarayonda</span>';
                }
            } else {
                // Kelgusi bosqichlar
                if (stepStatuses[i]) {
                    stepStatuses[i].innerHTML = '<span class="status-badge pending">Kutilmoqda</span>';
                }
            }
        }
        
        // Progress barni yangilash
        const progress = Math.round((stepNumber / steps.length) * 100);
        progressBar.style.width = progress + '%';
        progressPercent.textContent = progress + '%';
        
        // Joriy bosqich matnini yangilash
        currentStepText.innerHTML = `<i class="fas fa-arrow-right"></i> Hozirgi bosqich: ${stepNames[stepNumber - 1]}`;
    }
    
    // Bosqichga o'tish (control tugmalari uchun)
    function goToStep(stepNumber) {
        if (stepNumber >= 1 && stepNumber <= steps.length) {
            currentStep = stepNumber;
            updateStep(currentStep);
        }
    }
    
    // Bosqichni qayta boshlash
    function resetSteps() {
        currentStep = 1;
        updateStep(currentStep);
    }
    
    // Control tugmalari
    const controlButtons = document.querySelectorAll('.control-btn[data-step]');
    const resetButton = document.getElementById('resetSteps');
    
    controlButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const step = parseInt(this.dataset.step);
            if (!isNaN(step)) {
                goToStep(step);
            }
        });
    });
    
    if (resetButton) {
        resetButton.addEventListener('click', resetSteps);
    }
    
    // Timeline step'larga click (tez o'tish uchun)
    steps.forEach((step, index) => {
        step.addEventListener('click', function() {
            goToStep(index + 1);
        });
    });
    
    // Boshlang'ich holat
    updateStep(currentStep);
    
    // Real tizim simulyatsiyasi (har 5 sekundda bosqich o'zgaradi)
    // Bu faqat demo uchun
    let autoProgress = true;
    if (autoProgress) {
        let interval = setInterval(() => {
            if (currentStep < steps.length) {
                currentStep++;
                updateStep(currentStep);
            } else {
                clearInterval(interval);
            }
        }, 5000); // Har 5 sekundda bosqich o'zgaradi
    }
});
    /* oson ariza */

    
// profil uchun bosh
// Shaxsiy kabinet funksiyalari
document.addEventListener('DOMContentLoaded', function() {
    // Profilni tahrirlash
    const editProfileBtn = document.getElementById('editProfileBtn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            alert('Profilni tahrirlash oynasi ochiladi');
            // Bu yerda modal oyna ochish mumkin
        });
    }
    
    // Chiqish
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('Tizimdan chiqishni xohlaysizmi?')) {
                window.location.href = 'index.html';
            }
        });
    }
    
    // Hujjat yuklash
    const uploadDocBtn = document.getElementById('uploadDocBtn');
    if (uploadDocBtn) {
        uploadDocBtn.addEventListener('click', function() {
            alert('Hujjat yuklash oynasi ochiladi');
        });
    }
    
    // Kichik yuklash tugmalari
    const uploadSmallBtns = document.querySelectorAll('.btn-upload-small');
    uploadSmallBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            alert('Hujjat yuklash oynasi');
        });
    });
    
    // Hujjatlarni ko'rish
    const viewButtons = document.querySelectorAll('.doc-actions button:first-child');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const docName = this.closest('.document-item').querySelector('.doc-info h4').textContent;
            alert(`${docName} - hujjatni ko'rish`);
        });
    });
    
    // Hujjatlarni yuklash
    const downloadButtons = document.querySelectorAll('.doc-actions button:nth-child(2)');
    downloadButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const docName = this.closest('.document-item').querySelector('.doc-info h4').textContent;
            alert(`${docName} - yuklanmoqda...`);
        });
    });
    
    // Bildirishnomalarni bosish
    const notificationItems = document.querySelectorAll('.notification-item');
    notificationItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.remove('unread');
        });
    });
    
    // Avatar tahrirlash
    const avatarEdit = document.querySelector('.avatar-edit');
    if (avatarEdit) {
        avatarEdit.addEventListener('click', function() {
            alert('Rasmni o\'zgartirish oynasi');
        });
    }
    
    // Real vaqtni yangilash (simulyatsiya)
    function updateStatusDate() {
        const statusDate = document.querySelector('.status-date');
        if (statusDate) {
            const now = new Date();
            const formatted = now.toLocaleDateString('uz-UZ', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }) + ' ' + now.toLocaleTimeString('uz-UZ', {
                hour: '2-digit',
                minute: '2-digit'
            });
            statusDate.textContent = `Oxirgi yangilanish: ${formatted}`;
        }
    }
    
    // Har daqiqada yangilash
    setInterval(updateStatusDate, 60000);
    
    // Progress barni animatsiya bilan yangilash
    let progress = 43;
    setInterval(() => {
        if (progress < 100) {
            progress += 1;
            const progressFill = document.querySelector('.progress-fill');
            const progressValue = document.querySelector('.progress-value');
            if (progressFill && progressValue) {
                progressFill.style.width = progress + '%';
                progressValue.textContent = progress + '%';
            }
        }
    }, 300000); // Har 5 daqiqada 1% oshadi (simulyatsiya)
});
// profil uchun oxir