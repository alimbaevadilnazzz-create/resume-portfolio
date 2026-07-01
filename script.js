document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. THEME SWITCHER (DARK / LIGHT MODE)
    // ==========================================================================
    const themeToggle = document.getElementById('theme-toggle');
    const toggleIcon = themeToggle.querySelector('.toggle-icon');
    
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.body.setAttribute('data-theme', 'dark');
        toggleIcon.textContent = '🌙';
    } else {
        document.body.removeAttribute('data-theme');
        toggleIcon.textContent = '☀️';
    }
    
    themeToggle.addEventListener('click', () => {
        const isDark = document.body.hasAttribute('data-theme');
        if (isDark) {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            toggleIcon.textContent = '☀️';
            
            // Add click effect animation
            themeToggle.style.transform = 'scale(0.9) rotate(0deg)';
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            toggleIcon.textContent = '🌙';
            
            // Add click effect animation
            themeToggle.style.transform = 'scale(0.9) rotate(360deg)';
        }
        
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 150);
    });

    // ==========================================================================
    // 2. MOBILE MENU NAVIGATION
    // ==========================================================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ==========================================================================
    // 3. EXPERIENCE FILTERING
    // ==========================================================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const toggleExtraJobsBtn = document.getElementById('toggle-extra-jobs');
    let extraJobsExpanded = false;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            timelineItems.forEach(item => {
                const category = item.getAttribute('data-category');
                const isExtra = item.classList.contains('extra-job');
                
                // Determine if we should show this item
                const matchesFilter = (filterValue === 'all' || category === filterValue);
                
                if (matchesFilter) {
                    if (isExtra && !extraJobsExpanded) {
                        item.classList.add('hidden');
                    } else {
                        item.classList.remove('hidden');
                        // Small animation entry
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(15px)';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        }, 50);
                    }
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // ==========================================================================
    // 4. SHOW EXTRA JOBS TOGGLE
    // ==========================================================================
    toggleExtraJobsBtn.addEventListener('click', () => {
        extraJobsExpanded = !extraJobsExpanded;
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        const extraJobs = document.querySelectorAll('.extra-job');
        let currentLang = localStorage.getItem('lang') || 'ru';
        if (currentLang === 'kz') currentLang = 'kk';
        if (!translations[currentLang]) currentLang = 'ru';
        
        if (extraJobsExpanded) {
            toggleExtraJobsBtn.textContent = translations[currentLang].btn_toggle_jobs_hide;
            
            extraJobs.forEach(job => {
                const category = job.getAttribute('data-category');
                if (activeFilter === 'all' || category === activeFilter) {
                    job.classList.remove('hidden');
                    job.style.opacity = '0';
                    job.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        job.style.opacity = '1';
                        job.style.transform = 'translateY(0)';
                        job.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    }, 50);
                }
            });
        } else {
            toggleExtraJobsBtn.textContent = translations[currentLang].btn_toggle_jobs;
            extraJobs.forEach(job => {
                job.classList.add('hidden');
            });
            // Scroll back to experience section header if they closed it
            document.getElementById('experience').scrollIntoView({ behavior: 'smooth' });
        }
    });


    // ==========================================================================
    // 6. WARRIOR PATH TAB SWITCHER (ABOUT ME)
    // ==========================================================================
    const warriorTabs = document.querySelectorAll('.warrior-tab-btn');
    const warriorPanes = document.querySelectorAll('.warrior-pane');
    
    warriorTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            warriorTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const pathValue = tab.getAttribute('data-path');
            
            warriorPanes.forEach(pane => pane.classList.remove('active'));
            const targetPane = document.getElementById(`path-${pathValue}`);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    // ==========================================================================
    // 7. SCROLL REVEAL EFFECT
    // ==========================================================================
    const revealElements = document.querySelectorAll('.timeline-card, .skill-category-card, .edu-card, .hero-showcase-card, .hero-intro-wrapper, .warrior-card');
    
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
    });
    
    // Set initial state and observe
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        revealOnScroll.observe(el);
    });

    // ==========================================================================
    // 8. LOCALIZATION SYSTEM (RU, EN, KK)
    // ==========================================================================
    const langBtns = document.querySelectorAll('.lang-btn');
    
    function updateLanguage(lang) {
        if (lang === 'kz') lang = 'kk';
        if (!lang || !translations[lang]) lang = 'ru';
        localStorage.setItem('lang', lang);
        langBtns.forEach(btn => {
            let btnLang = btn.getAttribute('data-lang');
            if (btnLang === 'kz') btnLang = 'kk';
            if (btnLang === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update document title and meta description
        if (lang === 'ru') {
            document.title = 'Дильназ Алимбаева | Scrum-мастер и Product-менеджер';
        } else if (lang === 'kk') {
            document.title = 'Дильназ Алимбаева | Scrum-мастер және Product-менеджер';
        } else {
            document.title = 'Dilnaz Alimbayeva | Scrum Master & Product Manager';
        }
        
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            if (lang === 'ru') {
                metaDesc.setAttribute('content', 'Резюме Дильназ Алимбаевой - Creative Scrum Master & Product Manager. Опыт работы в Jusan Bank, JaryqLab, Clopos. Управление проектами, UI/UX дизайн, Agile.');
            } else if (lang === 'kk') {
                metaDesc.setAttribute('content', 'Дильназ Алимбаеваның түйіндемесі - Creative Scrum Master & Product Manager. Jusan Bank, JaryqLab, Clopos жұмыс тәжірибесі. Жобаларды басқару, UI/UX дизайн, Agile.');
            } else {
                metaDesc.setAttribute('content', 'Dilnaz Alimbayeva\'s Resume - Creative Scrum Master & Product Manager. Experience at Jusan Bank, JaryqLab, Clopos. Project management, UI/UX design, Agile.');
            }
        }
        
        // Simple translation replacements
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });
        
        // Translate timeline jobs
        const jobElements = document.querySelectorAll('[data-job]');
        jobElements.forEach(el => {
            const jobKey = el.getAttribute('data-job');
            const jobData = jobTranslations[lang][jobKey];
            if (jobData) {
                const roleTitle = el.querySelector('.role-title');
                const companyTitle = el.querySelector('.company-title');
                const jobLoc = el.querySelector('.job-location');
                const timelineDate = el.querySelector('.timeline-date');
                
                if (roleTitle) roleTitle.textContent = jobData.role;
                if (companyTitle) companyTitle.textContent = jobData.comp;
                if (jobLoc) jobLoc.textContent = jobData.loc;
                if (timelineDate) timelineDate.textContent = jobData.date;
                
                const dutiesList = el.querySelector('.job-duties');
                if (dutiesList) {
                    dutiesList.innerHTML = '';
                    jobData.duties.forEach(duty => {
                        const li = document.createElement('li');
                        li.innerHTML = duty;
                        dutiesList.appendChild(li);
                    });
                }
            }
        });
        
        // Translate personal path cards
        const personalElements = document.querySelectorAll('[data-personal]');
        personalElements.forEach(el => {
            const personalKey = el.getAttribute('data-personal');
            const personalData = personalTranslations[lang][personalKey];
            if (personalData) {
                const badge = el.querySelector('.warrior-badge');
                const header = el.querySelector('h3');
                const para = el.querySelector('p');
                
                if (badge) badge.textContent = personalData.badge;
                if (header) header.textContent = personalData.title;
                if (para) para.innerHTML = personalData.desc;
            }
        });
        
        // Translate education cards
        const eduElements = document.querySelectorAll('[data-edu]');
        eduElements.forEach(el => {
            const eduKey = el.getAttribute('data-edu');
            const eduData = eduTranslations[lang][eduKey];
            if (eduData) {
                const date = el.querySelector('.edu-date');
                const inst = el.querySelector('h3');
                const degree = el.querySelector('.edu-degree');
                const desc = el.querySelector('.edu-desc');
                
                if (date) date.textContent = eduData.date;
                if (inst) inst.textContent = eduData.inst;
                if (degree) degree.textContent = eduData.deg;
                if (desc) desc.innerHTML = eduData.desc;
            }
        });

        // Translate certificate cards
        const certElements = document.querySelectorAll('[data-cert]');
        certElements.forEach(el => {
            const certKey = el.getAttribute('data-cert');
            const certData = certTranslations[lang][certKey];
            if (certData) {
                const title = el.querySelector('h3');
                const issuer = el.querySelector('.cert-issuer');
                const desc = el.querySelector('.cert-desc');
                const link = el.querySelector('.cert-link');
                
                if (title) title.textContent = certData.title;
                if (issuer) issuer.textContent = certData.issuer;
                if (desc) desc.innerHTML = certData.desc;
                if (link) link.textContent = certTranslations[lang].view_btn;
            }
        });

        // Update toggle jobs button text dynamically
        if (toggleExtraJobsBtn) {
            toggleExtraJobsBtn.textContent = extraJobsExpanded 
                ? translations[lang].btn_toggle_jobs_hide 
                : translations[lang].btn_toggle_jobs;
        }
    }

    // Initial language load
    const savedLang = localStorage.getItem('lang') || 'ru';
    updateLanguage(savedLang);

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            updateLanguage(btn.getAttribute('data-lang'));
        });
    });
});

// ==========================================================================
// TRANSLATION DICTIONARIES (RU, EN, KK)
// ==========================================================================

const translations = {
    ru: {
        sidebar_title: "Scrum Master | Product & Project Manager",
        sidebar_role_sm: "Sr. Scrum Master",
        sidebar_comp_sm: "Alatau City Bank (Jusan)",
        sidebar_date_sm: "2026 - наст. время",
        sidebar_role_ppm: "Project & Product Manager",
        sidebar_comp_ppm: "JaryqLab (Startup)",
        sidebar_date_ppm: "2025 - 2026",
        sidebar_role_apm: "Associate Product Manager",
        sidebar_comp_apm: "Clopos (SaaS)",
        sidebar_date_apm: "2025",
        sidebar_role_pm: "Project Manager",
        sidebar_comp_pm: "Elefanto (RM & Company)",
        sidebar_date_pm: "2024 - 2025",
        sidebar_role_wt: "Front Desk & Housekeeping",
        sidebar_comp_wt: "Kettle Moraine KOA (США / Америка 🇺🇸)",
        sidebar_date_wt: "2024",
        status_text: "☀️ KZ, Алматы (UTC+5)",
        hero_greeting: "hola!",
        hero_text: "Я — <strong class=\"highlight-text\">Дильназ</strong>, Scrum-мастер с продуктовым подходом и техническим бэкграундом в области информационных систем. Помогаю командам создавать цифровые продукты, объединяя бизнес, разработку и дизайн и выстраивая эффективные процессы. Активно использую AI и инструменты автоматизации в работе.<br><br>Моя суперсила — соединять людей, процессы и технологии. Мне нравится превращать хаос в ясность, а идеи — в продукты, которыми приятно пользоваться. Я верю, что лучшие продукты создаются на стыке технологий, творчества и сплоченных команд.",
        btn_tg: "Перейти в tg",
        btn_about: "Обо мне",
        warrior_title: "Путь воина ⚔️",
        tab_career: "Карьерный путь",
        tab_personal: "Личный путь",
        career_header: "Сражения и победы 💼",
        filter_all: "Все",
        filter_scrum: "Scrum / Agile",
        filter_product: "Product / Project",
        btn_toggle_jobs: "Показать более ранний опыт",
        btn_toggle_jobs_hide: "Скрыть более ранний опыт",
        skills_title: "Стек и Навыки 🛠️",
        edu_title: "Образование 🎓",
        certs_title: "Сертификаты & Профессиональное обучение 🏆",
        footer_text: "&copy; 2026 Dilnaz Alimbayeva. Сделано с любовью 🌸"
    },
    en: {
        sidebar_title: "Scrum Master | Product & Project Manager",
        sidebar_role_sm: "Sr. Scrum Master",
        sidebar_comp_sm: "Alatau City Bank (Jusan)",
        sidebar_date_sm: "2026 - Present",
        sidebar_role_ppm: "Project & Product Manager",
        sidebar_comp_ppm: "JaryqLab (Startup)",
        sidebar_date_ppm: "2025 - 2026",
        sidebar_role_apm: "Associate Product Manager",
        sidebar_comp_apm: "Clopos (SaaS)",
        sidebar_date_apm: "2025",
        sidebar_role_pm: "Project Manager",
        sidebar_comp_pm: "Elefanto (RM & Company)",
        sidebar_date_pm: "2024 - 2025",
        sidebar_role_wt: "Front Desk & Housekeeping",
        sidebar_comp_wt: "Kettle Moraine KOA (Wisconsin, USA 🇺🇸)",
        sidebar_date_wt: "2024",
        status_text: "☀️ KZ, Almaty (UTC+5)",
        hero_greeting: "hello!",
        hero_text: "I’m <strong class=\"highlight-text\">Dilnaz</strong>, a Scrum Master with a product mindset and a technical background in Information Systems. I help teams build digital products by aligning business, engineering, and design, and establishing efficient processes. Actively utilizing AI and automation tools in my daily workflows.<br><br>My superpower is connecting people, processes, and technology. I enjoy turning chaos into clarity and ideas into products people love to use. I believe the best products are built where technology, creativity, and great teams come together.",
        btn_tg: "Go to Telegram",
        btn_about: "About me",
        warrior_title: "Warrior's Path ⚔️",
        tab_career: "Career Path",
        tab_personal: "Personal Path",
        career_header: "Battles & Victories 💼",
        filter_all: "All",
        filter_scrum: "Scrum / Agile",
        filter_product: "Product / Project",
        btn_toggle_jobs: "Show earlier experience",
        btn_toggle_jobs_hide: "Hide earlier experience",
        skills_title: "Skills & Tech Stack 🛠️",
        edu_title: "Education 🎓",
        certs_title: "Certificates & Professional Training 🏆",
        footer_text: "&copy; 2026 Dilnaz Alimbayeva. Made with love 🌸"
    },
    kk: {
        sidebar_title: "Scrum Master | Product & Project Manager",
        sidebar_role_sm: "Аға Scrum-мастер",
        sidebar_comp_sm: "Alatau City Bank (Jusan)",
        sidebar_date_sm: "2026 - қазіргі уақыт",
        sidebar_role_ppm: "Project & Product Manager",
        sidebar_comp_ppm: "JaryqLab (Стартап)",
        sidebar_date_ppm: "2025 - 2026",
        sidebar_role_apm: "Associate Product Manager",
        sidebar_comp_apm: "Clopos (SaaS)",
        sidebar_date_apm: "2025",
        sidebar_role_pm: "Project Manager",
        sidebar_comp_pm: "Elefanto (RM & Company)",
        sidebar_date_pm: "2024 - 2025",
        sidebar_role_wt: "Front Desk & Housekeeping",
        sidebar_comp_wt: "Kettle Moraine KOA (АҚШ / Америка 🇺🇸)",
        sidebar_date_wt: "2024",
        status_text: "☀️ ҚР, Алматы (UTC+5)",
        hero_greeting: "сәлем!",
        hero_text: "Мен — өнімдік және жобалық ойлау қабілеті бар Scrum-мастер <strong class=\"highlight-text\">Дильназбын</strong>. Бизнес, әзірлеу және дизайнды үйлестіре отырып, идеяларды цифрлық өнімдерге айналдыруға көмектесемін. Ақпараттық жүйелер саласындағы мықты техникалық базаға сүйене отырып, мен тиімді процестерді құрамын, кросс-функционалды командаларды басқарамын және өнімді тұжырымдамадан бастап іске қосуға дейін жеткіземін. Жасанды интеллектке, автоматтандыруға және пайдаланушылардың нақты мәселелерін шешетін өнімдер жасауға қызығамын.",
        btn_tg: "Telegram-ға өту",
        btn_about: "Мен туралы",
        warrior_title: "Жауынгер жолы ⚔️",
        tab_career: "Мансап жолы",
        tab_personal: "Жеке жол",
        career_header: "Шайқастар мен жеңістер 💼",
        filter_all: "Барлығы",
        filter_scrum: "Scrum / Agile",
        filter_product: "Product / Project",
        btn_toggle_jobs: "Алдыңғы жұмыс тәжірибесін көрсету",
        btn_toggle_jobs_hide: "Алдыңғы жұмыс тәжірибесін жасыру",
        skills_title: "Стек және Дағдылар 🛠️",
        edu_title: "Білім 🎓",
        certs_title: "Сертификаттар және Кәсіби даярлық 🏆",
        footer_text: "&copy; 2026 Dilnaz Alimbayeva. Махаббатпен жасалған 🌸"
    }
};

const jobTranslations = {
    ru: {
        jusan: {
            role: "Scrum Master",
            comp: "Alatau City Bank (Jusan Bank)",
            loc: "Алматы, Казахстан",
            date: "Январь 2026 - Наст. время",
            duties: [
                "Лидирую 3 кросс-функциональные Scrum-команды в розничном CVM, бизнес CVM и ПостКредит стримах, обеспечивая доставку продуктов.",
                "Фасилитирую все Scrum-события, устраняю блокеры и повышаю перформанс команд по метрикам.",
                "Разработала и оптимизировала процессы Scrum в командах, повысив стабильность и скорость поставок релизов.",
                "Стандартизировала и объединила Jira-процессы в департаменте, повысив прозрачность.",
                "Внедрила систему метрик для отслеживания эффективности (cycle time, lead time).",
                "Разработала и запустила двух Telegram-ботов (<a href=\"https://t.me/feedback_planning_bot\" target=\"_blank\" class=\"job-link\">@feedback_planning_bot</a> и <a href=\"https://t.me/scrum_masters_assistant_bot\" target=\"_blank\" class=\"job-link\">@scrum_masters_assistant_bot</a>), автоматизировав процессы сбора обратной связи, проведение Health Check команд и создав интерактивного ассистента Scrum-мастера."
            ]
        },
        jaryqlab: {
            role: "Project / Product Manager",
            comp: "JaryqLab (Outsourcing Startup)",
            loc: "Алматы, Казахстан",
            date: "Сентябрь 2025 - Январь 2026",
            duties: [
                "Выстроила процессы доставки и коммуникации с нуля, внедрила ClickUp и координировала коммуникации со стейкхолдерами.",
                "Закрыла 3 долгосрочных зависших проекта и ускорила общую скорость разработки на 50%.",
                "Проводила CustDev-интервью и исследования рынка, валидировала продуктовые гипотезы и запускала фичи (GTM)."
            ]
        },
        clopos: {
            role: "Associate Product Manager",
            comp: "Clopos (SaaS)",
            loc: "Алматы, Казахстан",
            date: "Июнь 2025 - Октябрь 2025",
            duties: [
                "Проводила CustDev-исследования рынка и интервью с пользователями, проверяя гипотезы и находя точки роста.",
                "Превращала обратную связь от клиентов в функциональные требования (PRD) для продуктового бэклога.",
                "Оптимизировала онбординг клиентов, повысив уровень удовлетворенности и удержания."
            ]
        },
        elefanto: {
            role: "Project Manager",
            comp: "Elefanto (RM & Company LLP)",
            loc: "Алматы, Казахстан",
            date: "Сентябрь 2024 - Апрель 2025",
            duties: [
                "Руководила разработкой мобильного приложения HFT для охоты и рыбалки, используя Capacitor под iOS и Android.",
                "Разработала интуитивный UI/UX дизайн приложения в Figma на основе опросов пользователей.",
                "Управляла бэклогом продукта в Jira и координировала выпуски через TestFlight и AppStoreConnect."
            ]
        },
        wt: {
            role: "Assistant on Front Desk & Housekeeping",
            comp: "Kettle Moraine KOA Holiday (Work & Travel USA)",
            loc: "Висконсин, США",
            date: "Июнь 2024 - Сентябрь 2024",
            duties: [
                "Управляла обслуживанием клиентов на стойке регистрации (Front Desk): отвечала на звонки, регистрировала бронирования и консультировала гостей о доступных услугах.",
                "Помогала в организации специальных мероприятий, таких как мероприятия ко Дню отца и игра Бинго, создавая праздничную атмосферу.",
                "Работала в сфере Housekeeping: оптимизировала организацию процессов уборки на 80% для обеспечения чистоты и порядка, а также обучала новых сотрудников.",
                "На основе отзывов клиентов демонстрировала высокий уровень сервиса и заботу о потребностях гостей."
            ]
        },
        sdu: {
            role: "Project Manager",
            comp: "SDU Technopark",
            loc: "Алматы, Казахстан",
            date: "Апрель 2024 - Май 2024",
            duties: [
                "Управляла разработкой веб-системы управления общежитием SDU от идеи до сдачи.",
                "Спроектировала структуру базы данных и подготовила технические спецификации."
            ]
        },
        intern: {
            role: "Project Management Intern",
            comp: "Elefanto (RM & Company LLP)",
            loc: "Алматы, Казахстан",
            date: "Январь 2024 - Февраль 2024",
            duties: [
                "Разработала полный User Flow для логистического проекта доставки, повысив понимание разработчиков на 80%."
            ]
        }
    },
    en: {
        jusan: {
            role: "Scrum Master",
            comp: "Alatau City Bank (Jusan Bank)",
            loc: "Almaty, Kazakhstan",
            date: "January 2026 - Present",
            duties: [
                "Lead 3 cross-functional Scrum teams in Retail CVM, Business CVM, and Post-Credit streams, ensuring product delivery.",
                "Facilitate all Scrum events, resolve impediments, and improve team performance metrics.",
                "Developed and optimized Scrum processes within teams, increasing stability and release delivery speed.",
                "Standardized and unified Jira workflows in the department, improving transparency.",
                "Implemented a metrics system to track efficiency (cycle time, lead time).",
                "Developed and launched two Telegram bots (<a href=\"https://t.me/feedback_planning_bot\" target=\"_blank\" class=\"job-link\">@feedback_planning_bot</a> and <a href=\"https://t.me/scrum_masters_assistant_bot\" target=\"_blank\" class=\"job-link\">@scrum_masters_assistant_bot</a>), automating team feedback collection, health checks, and creating a Scrum Master virtual assistant."
            ]
        },
        jaryqlab: {
            role: "Project / Product Manager",
            comp: "JaryqLab (Outsourcing Startup)",
            loc: "Almaty, Kazakhstan",
            date: "September 2025 - January 2026",
            duties: [
                "Built delivery and communication processes from scratch, implemented ClickUp, and coordinated stakeholder communications.",
                "Closed 3 long-overdue stuck projects and accelerated overall development speed by 50%.",
                "Conducted CustDev interviews and market research, validated product hypotheses, and launched features (GTM)."
            ]
        },
        clopos: {
            role: "Associate Product Manager",
            comp: "Clopos (SaaS)",
            loc: "Almaty, Kazakhstan",
            date: "June 2025 - October 2025",
            duties: [
                "Conducted CustDev market research and user interviews, validating hypotheses and identifying growth opportunities.",
                "Translated customer feedback into functional requirements (PRD) for the product backlog.",
                "Optimized customer onboarding, increasing satisfaction and retention rates."
            ]
        },
        elefanto: {
            role: "Project Manager",
            comp: "Elefanto (RM & Company LLP)",
            loc: "Almaty, Kazakhstan",
            date: "September 2024 - April 2025",
            duties: [
                "Managed the development of the HFT mobile app for hunting & fishing, using Capacitor for iOS and Android.",
                "Designed an intuitive UI/UX for the app in Figma based on user surveys.",
                "Managed the product backlog in Jira and coordinated releases via TestFlight and AppStoreConnect."
            ]
        },
        wt: {
            role: "Assistant on Front Desk & Housekeeping",
            comp: "Kettle Moraine KOA Holiday (Work & Travel USA)",
            loc: "Wisconsin, USA",
            date: "June 2024 - September 2024",
            duties: [
                "Managed customer service at the front desk, answering calls, taking reservations, and explaining available services to guests.",
                "Assisted with organizing special events such as Father's Day activities and the Bingo game, contributing to a festive atmosphere during holiday periods.",
                "Worked in housekeeping, improving organization by 80% to ensure cleanliness and order, while training and managing new staff to maintain smooth operations.",
                "Based on client feedback, demonstrating a high level of service and attention to guest needs."
            ]
        },
        sdu: {
            role: "Project Manager",
            comp: "SDU Technopark",
            loc: "Almaty, Kazakhstan",
            date: "April 2024 - May 2024",
            duties: [
                "Managed the development of the SDU dormitory management web system from concept to delivery.",
                "Designed database structure and prepared technical specifications."
            ]
        },
        intern: {
            role: "Project Management Intern",
            comp: "Elefanto (RM & Company LLP)",
            loc: "Almaty, Kazakhstan",
            date: "January 2024 - February 2024",
            duties: [
                "Developed a complete User Flow for a logistics delivery project, increasing developer understanding by 80%."
            ]
        }
    },
    kk: {
        jusan: {
            role: "Scrum Master",
            comp: "Alatau City Bank (Jusan Bank)",
            loc: "Алматы, Қазақстан",
            date: "Қаңтар 2026 - қазіргі уақыт",
            duties: [
                "Өнімді жеткізуді қамтамасыз ете отырып, бөлшек CVM, бизнес CVM және ПостКредит стримдеріндегі 3 кросс-функционалды Scrum командасын басқарамын.",
                "Барлық Scrum оқиғаларын фасилитациялаймын, кедергілерді жоямын және командалардың тиімділіген метрикалар бойынша арттырамын.",
                "Релиздерді жеткізудің тұрақтылығы мен жылдамдығын арттыра отырып, командалардағы Scrum процестерін әзірледім және оңтайландырдым.",
                "Департаменттегі Jira процестерін стандарттадым және біріктірдім, бұл ашықтықты арттырды.",
                "Тиімділікті бақылауға арналған метрикалар жүйесін (cycle time, lead time) енгіздім.",
                "Командалардан кері байланыс жинау, Health Check жүргізу процестерін автоматтандыру және Scrum-мастердің интерактивті ассистентін жасау үшін екі Telegram-бот (<a href=\"https://t.me/feedback_planning_bot\" target=\"_blank\" class=\"job-link\">@feedback_planning_bot</a> және <a href=\"https://t.me/scrum_masters_assistant_bot\" target=\"_blank\" class=\"job-link\">@scrum_masters_assistant_bot</a>) әзірлеп, іске қостым."
            ]
        },
        jaryqlab: {
            role: "Project / Product Manager",
            comp: "JaryqLab (Outsourcing Startup)",
            loc: "Алматы, Қазақстан",
            date: "Қыркүйек 2025 - Қаңтар 2026",
            duties: [
                "Жеткізу және коммуникация процестерін нөлден бастап құрдым, ClickUp жүйесін енгіздім және мүдделі тараптармен (стейкхолдерлер) байланысты үйлестірдім.",
                "3 ұзақ мерзімді тоқтап қалған жобаны жауып, әзірлеудің жалпы жылдамдығын 50%-ға арттырдым.",
                "CustDev сұхбаттарын және нарықты зерттеуді жүргіздім, өнімдік гипотезаларды тексердім және жаңа функцияларды іске қостым (GTM)."
            ]
        }
    }
};

const personalTranslations = {
    ru: {
        para: {
            badge: "Высота & Экстрим",
            title: "Параглайдинг, Скайдайвинг & Свобода",
            desc: "Интересуюсь параглайдингом и скайдайвингом — это лучшая метафора управления проектами в условиях неопределенности. Совершила прыжок с парашютом (скайдайвинг) в Чикаго и летала на параплане в Фетхие. На высоте, как и в IT-проекте, необходимо ловить правильные потоки, мгновенно оценивать риски, сохранять хладнокровие в турбулентности и полностью доверять процессам. Следующий шаг — скайдайв в Алматы!"
        },
        mentor: {
            badge: "Служение обществу",
            title: "Mentorship @ Technovation Girls",
            desc: "В качестве ментора помогала школьным командам спроектировать и разработать iOS-приложение **Inclusivevents** (доступность мероприятий). Я верю в философию <em>Servant Leadership</em> (лидерство служения) — развивая других, ты растёшь сам."
        },
        edu: {
            badge: "Инженерный щит",
            title: "Образование и База (SDU)",
            desc: "Окончила Suleyman Demirel University по специальности «Информационные системы» (GPA 3.56). Это дало мне крепкий технический фундамент: понимание структуры баз данных, системной архитектуры и QA, что помогает общаться с разработчиками на одном языке."
        },
        ugc: {
            badge: "Контент & Личный бренд",
            title: "UGC Creator & Личный бренд",
            desc: "Активно развиваю профессиональные блоги: веду аккаунт в Instagram (более **4.4 млн просмотров** контента, вирусные Reels с **2.4 млн** и **1.6 млн** просмотров) и LinkedIn. Сотрудничаю с брендами по модели UGC (User Generated Content), получая коммерческие предложения на рекламу и бартер."
        },
        offers: {
            badge: "Глобальное образование",
            title: "Академические офферы & Boston University",
            desc: "Поступила в престижный **Boston University (США) с получением 85% гранта (скидки на обучение)**. Также получила академические офферы (предложения о зачислении) из Великобритании: **Sussex University**, **University of East Anglia (UEA)** и **Bradford University**."
        },
        travel: {
            badge: "Путешествия & Мир",
            title: "Work & Travel USA & Жажда открытий",
            desc: "Участница программы Work & Travel в США (Висконсин) — работала администратором (Front Desk) и напрямую с клиентами, что укрепило навыки кросс-культурной коммуникации и английского языка. Обожаю исследовать мир, следующая большая цель — Япония 🇯🇵."
        }
    },
    en: {
        para: {
            badge: "Altitude & Extreme",
            title: "Paragliding, Skydiving & Freedom",
            desc: "Passionate about paragliding and skydiving—the perfect metaphor for project management under uncertainty. Experienced skydiving in Chicago and paragliding in Fethiye. At high altitudes, just like in an IT project, you must catch the right thermal currents, instantly assess risks, stay calm in turbulence, and fully trust the processes. Next stop: skydiving in Almaty!"
        },
        mentor: {
            badge: "Community Service",
            title: "Mentorship @ Technovation Girls",
            desc: "As a mentor, I helped high school teams design and develop the **Inclusivevents** iOS app (event accessibility). I believe in the philosophy of <em>Servant Leadership</em> — by developing others, you grow yourself."
        },
        edu: {
            badge: "Engineering Shield",
            title: "Education & Foundation (SDU)",
            desc: "Graduated from Suleyman Demirel University with a major in Information Systems (GPA 3.56). This gave me a strong technical foundation: understanding database structures, system architecture, and QA, which helps me speak the same language as developers."
        },
        ugc: {
            badge: "Content & Digital Brand",
            title: "UGC Creator & Personal Brand",
            desc: "Actively growing professional blogs: running an Instagram account with over **4.4M views** (viral Reels with **2.4M** and **1.6M** views) and LinkedIn. Collaborating with brands as a UGC (User Generated Content) Creator for advertising and barter campaigns."
        },
        offers: {
            badge: "Global Education",
            title: "Academic Offers & Boston University",
            desc: "Admitted to the prestigious **Boston University (USA) with an 85% scholarship** (tuition discount). Additionally received academic offers from top UK universities: **Sussex University**, **University of East Anglia (UEA)**, and **Bradford University**."
        },
        travel: {
            badge: "Travel & Exploration",
            title: "Work & Travel USA & Passion for Discovery",
            desc: "Participated in the Work & Travel USA program (Wisconsin), working in customer service and administration (Front Desk). This significantly enhanced my cross-cultural communication and English skills. Love exploring the world; my next dream destination is Japan 🇯🇵."
        }
    },
    kk: {
        para: {
            badge: "Биіктік пен Экстрим",
            title: "Параглайдинг, Скайдайвинг және Еркіндік",
            desc: "Параглайдинг пен скайдайвингке қызығамын — бұл белгісіздік жағдайында жобаны басқарудың тамаша метафорасы. Чикагода парашютпен секірдім (скайдайвинг) және Фетхиеде парапланмен ұштым. Биіктікте, IT-жобасындағыдай, дұрыс ағындарді ұстап, қауіп-қатерді лезде бағалау, турбуленттілікте сабырлық сақтау және процестерге толық сену қажет. Келесі мақсат — Алматыда скайдайв жасау!"
        },
        mentor: {
            badge: "Қоғамға қызмет ету",
            title: "Mentorship @ Technovation Girls",
            desc: "Ментор реден мектеп командаларына **Inclusivevents** (іс-шаралардың қолжетімділігі) iOS қосымшасын жобалауға және әзірлеуге көмектестім. Мен <em>Servant Leadership</em> (қызмет ету көшбасшылығы) философиясына сенемін — басқаларды дамыта отырып, өзің де өсесің."
        },
        edu: {
            badge: "Инженерлік қалқан",
            title: "Білім және База (SDU)",
            desc: "Сүлеймен Демирел атындағы университетті «Ақпараттық жүйелер» мамандығы бойынша бітірдім (GPA 3.56). Бұл маған мықты техникалық негіз берді: деректер базасының құрылымын, жүйелік архитектураны және QA-ны түсіну әзірлеушілермен бір тілде сөйлесуге көмектеседі."
        },
        ugc: {
            badge: "Контент және Жеке бренд",
            title: "UGC Creator және Жеке бренд",
            desc: "Кәсіби блогтарды белсенді дамытудамын: Instagram аккаунтын (контенттің **4.4 млн-нан астам қаралымы**, **2.4 млн** және **1.6 млн** қаралымы бар вирустық Reels) және LinkedIn желісін жүргіземін. Брендтермен UGC (User Generated Content) моделі бойынша серіктес болып, жарнама мен бартерге коммерциялық ұсыныстар аламын."
        },
        offers: {
            badge: "Жаһандық білім",
            title: "Академиялық офферлер және Boston University",
            desc: "Американың беделді **Boston University (АҚШ) оқу орнына 85% жеңілдікпен (грант)** оқуға түстім. Сонымен қатар Ұлыбританияның жетекші университеттерінен шақыртулар (офферлер) алдым: **Sussex University**, **University of East Anglia (UEA)** және **Bradford University**."
        },
        travel: {
            badge: "Саяхат және Әлем",
            title: "Work & Travel USA және Жаңа белестер",
            desc: "АҚШ-тағы (Висконсин) Work & Travel бағдарламасының қатысушысы — әкімші (Front Desk) және клиенттермен тікелей жұмыс істедім, бұл кросс-мәдени коммуникация мен ағылшын тілі дағдыларын шыңдады. Әлемді зерттегенді ұнатамын, келесі үлкен мақсатым — Жапония 🇯🇵."
        }
    }
};

const eduTranslations = {
    ru: {
        sdu: {
            date: "2021 - 2025",
            inst: "Университет им. Сулеймана Демиреля (SDU)",
            deg: "Бакалавр информационных систем",
            desc: "<strong>Профильные модули:</strong> Разработка ПО, Проектирование БД, Системный анализ и проектирование, Управление IT-проектами."
        }
    },
    en: {
        sdu: {
            date: "2021 - 2025",
            inst: "Suleyman Demirel University (SDU)",
            deg: "Bachelor of Information Systems",
            desc: "<strong>Core Modules:</strong> Software Development, Database Design, System Analysis and Design, IT Project Management."
        }
    },
    kk: {
        sdu: {
            date: "2021 - 2025",
            inst: "Сүлеймен Демирел атындағы Университет (SDU)",
            deg: "Ақпараттық жүйелер бакалавры",
            desc: "<strong>Бейіндік модульдер:</strong> Бағдарламалық жасақтаманы әзірлеу, ДБ жобалау, Жүйелік талдау және жобалау, IT-жобаларды басқару."
        }
    }
};

const certTranslations = {
    ru: {
        view_btn: "Посмотреть сертификат ↗",
        alphatech: {
            title: "Системный и бизнес-анализ: Agile-подход",
            issuer: "Alpha.Tech.Edu",
            desc: "26-недельный онлайн-курс. Изучила SDLC, сбор требований (Use Case, User Stories), UML, BPMN, Camunda, SRS-спецификации, API (REST/SOAP), RabbitMQ, Kafka, SQL. Средняя оценка: 71/100."
        },
        dataart: {
            title: "Основы тестирования ПО",
            issuer: "DataArt",
            desc: "Успешно окончила практический курс по основам тестирования программного обеспечения (Software Testing Foundations) объемом 150 часов."
        },
        wspark: {
            title: "WSpark Women in Tech",
            issuer: "USAID Future Growth Initiative",
            desc: "Прошла бизнес-инкубатор и образовательную программу для женщин в сфере ИКТ (информационно-коммуникационных технологий) в Центральной Азии."
        },
        amantay: {
            title: "Курс продакт-менеджмента",
            issuer: "Amantay (PM Course)",
            desc: "15-часовой практический курс: жизненный цикл продукта, CustDev, CJM, юнит-экономика, управление бэклогом в Jira/Miro/draw.io, подготовка релизов для App Store и Google Play."
        },
        technovation_cert: {
            title: "Mentor @ Technovation Girls",
            issuer: "Technovation Girls (Leadership & Mentoring)",
            desc: "Сертификат признания за наставничество школьных команд в сезоне 2024. Руководила разработкой мобильного приложения <strong>Inclusivevents</strong> (доступность мероприятий для лиц с инвалидностью), обучала программированию, дизайну интерфейсов (UI/UX) и питчингу."
        }
    },
    en: {
        view_btn: "View certificate ↗",
        alphatech: {
            title: "System & Business Analysis: Agile Approach",
            issuer: "Alpha.Tech.Edu",
            desc: "26-week online course. Covered SDLC, requirements elicitation (Use Case, User Stories), UML, BPMN, Camunda, SRS specifications, API (REST/SOAP), RabbitMQ, Kafka, SQL. Avg grade: 71/100."
        },
        dataart: {
            title: "Software Testing Foundations",
            issuer: "DataArt",
            desc: "Successfully completed a practical 150-hour course on Software Testing Foundations."
        },
        wspark: {
            title: "WSpark Women in Tech",
            issuer: "USAID Future Growth Initiative",
            desc: "Completed a women's business incubator and educational program for women in ICT in Central Asia."
        },
        amantay: {
            title: "Product Management Course",
            issuer: "Amantay (PM Course)",
            desc: "15-hour practical course: product lifecycle, CustDev, CJM, unit economics, backlog management in Jira/Miro/draw.io, release prep for App Store & Google Play."
        },
        technovation_cert: {
            title: "Mentor @ Technovation Girls",
            issuer: "Technovation Girls (Leadership & Mentoring)",
            desc: "Certificate of Recognition for mentoring high school teams in the 2024 season. Guided the development of the <strong>Inclusivevents</strong> iOS app (event accessibility for people with disabilities), teaching coding, UI/UX design, and pitching."
        }
    },
    kk: {
        view_btn: "Сертификатты көру ↗",
        alphatech: {
            title: "Жүйелік және бизнес-талдау: Agile тәсілі",
            issuer: "Alpha.Tech.Edu",
            desc: "26 апталық онлайн-курс. SDLC, талаптарды жинау (Use Case, User Stories), UML, BPMN, Camunda, SRS спецификациялары, API (REST/SOAP), RabbitMQ, Kafka, SQL зерделенді. Орташа баға: 71/100."
        },
        dataart: {
            title: "Бағдарламалық жасақтаманы тестілеу негіздері",
            issuer: "DataArt",
            desc: "Бағдарламалық жасақтаманы тестілеу негіздері (Software Testing Foundations) бойынша 150 сағаттық практикалық курсты сәтті аяқтадым."
        },
        wspark: {
            title: "WSpark Women in Tech",
            issuer: "USAID Future Growth Initiative",
            desc: "Орталық Азиядағы АКТ (ақпараттық-коммуникациялық технологиялар) саласындағы әйелдерге арналған бизнес-инкубатор мен білім беру бағдарламасынан өттім."
        },
        amantay: {
            title: "Өнімді басқару (Product Management)",
            issuer: "Amantay (PM Course)",
            desc: "15 сағаттық практикалық курс: өнімнің өмірлік циклі, CustDev, CJM, юнит-экономика, Jira/Miro/draw.io-да бэклогты басқару, App Store және Google Play үшін релиздер дайындау."
        },
        technovation_cert: {
            title: "Mentor @ Technovation Girls",
            issuer: "Technovation Girls (Leadership & Mentoring)",
            desc: "Мектеп командаларына тәлімгерлік жасағаны үшін берілген тану сертификаты. 2024 маусымында мүгедектігі бар адамдарға арналған іс-шаралардың қолжетімділігін қамтамасыз ететін <strong>Inclusivevents</strong> iOS қосымшасын әзірлеуді басқардым, бағдарламалауды, интерфейстер дизайнын (UI/UX) және питчингті үйреттім."
        }
    }
};
