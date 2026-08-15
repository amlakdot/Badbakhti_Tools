import {
    showResult,
    escapeHTML
} from "../js/app.js";


export default {

    id: "friend",

    icon: "👯",

    title: "رفیقم چقدر می‌شناسه؟",

    description:
        "۲۰ سؤال شخصی جواب بده و لینک برای دوستت بفرست تا ببینیم واقعاً چقدر می‌شناسه.",

    buttonText:
        "شروع تست دوستی 👯",


    html: `

        <div class="box">

            <h2>
                👯 رفیقم من بدبخت چقدر می‌شناسه؟
            </h2>

            <p class="desc">
                ۲۰ تا سؤال شخصی جواب بده،  
                بعد لینکت رو برای دوستت بفرست و ببین واقعاً چقدر تو رو می‌شناسه.
            </p>

            <div id="friendArea">

                <button class="primary" id="startFriendTest">
                    شروع تست دوستی 👯
                </button>

            </div>

        </div>

    `,


    init() {

        const area = document.getElementById("friendArea");

        let index = 0;
        let personName = "";
        let userAnswers = [];
        let opponentAnswers = null;
        let score = 0;


        /* =========================
           سؤالات (۲۰ تا با ۸ گزینه)
        ========================= */

        const questions = [

            {
                q: "وقتی با دوستات بیرون می‌ری، بیشتر چی حال می‌ده؟",
                options: [
                    "کافه شلوغ با حرف زدن بی‌وقفه",
                    "قدم زدن طولانی تو خیابون",
                    "خونه یکی از بچه‌ها با چای و گپ",
                    "سینما یا کنسرت",
                    "رانندگی شبانه بدون مقصد",
                    "جمع کوچیک و آروم",
                    "هر جا که غذا خوب باشه",
                    "اصلاً بیرون رفتن حال نمی‌ده، ترجیح می‌دم آنلاین بمونم"
                ]
            },

            {
                q: "تو گروه دوستی بیشتر چه نقشی داری؟",
                options: [
                    "کسی که همه بهش پناه می‌برن",
                    "کسی که جوک می‌گه و حال همه رو خوب می‌کنه",
                    "کسی که برنامه‌ریزی می‌کنه",
                    "کسی که ساکت می‌شینه و گوش می‌ده",
                    "کسی که همیشه دیر می‌رسه",
                    "کسی که بحث‌های سنگین راه می‌ندازه",
                    "کسی که همه رو به هم وصل می‌کنه",
                    "کسی که بیشتر وقت‌ها غایبه ولی وقتی هست تأثیر داره"
                ]
            },

            {
                q: "وقتی یکی از دوستات ناراحته، اولین واکنش‌ات چیه؟",
                options: [
                    "می‌پرسم چی شده و کامل گوش می‌دم",
                    "سعی می‌کنم با شوخی حالشو عوض کنم",
                    "می‌گم «درکم می‌کنم» و کنارش می‌مونم",
                    "راه‌حل عملی پیشنهاد می‌دم",
                    "فضای تنهایی بهش می‌دم",
                    "براش یه چیزی می‌خرم یا کادو می‌دم",
                    "مستقیم می‌گم چیکار کنه",
                    "خودم هم ناراحت می‌شم و باهاش غرق می‌شم"
                ]
            },

            {
                q: "بزرگ‌ترین نقطه ضعف‌ات تو دوستی چیه؟",
                options: [
                    "دیر جواب دادن پیام",
                    "خیلی زود دلخور شدن",
                    "زیاد حرف زدن از خودم",
                    "کم حرف زدن و بسته بودن",
                    "مقایسه کردن دوستان با هم",
                    "فراموش کردن مناسبت‌ها",
                    "خیلی زود خسته شدن از رابطه",
                    "سخت اعتماد کردن"
                ]
            },

            {
                q: "تو جمع دوستانه بیشتر از چی عصبانی می‌شی؟",
                options: [
                    "وقتی یکی پشت سر بقیه حرف می‌زنه",
                    "وقتی قول می‌دن و عمل نمی‌کنن",
                    "وقتی بحث سیاسی یا مذهبی بی‌جهت داغ می‌شه",
                    "وقتی یکی همیشه مرکز توجه می‌خواد باشه",
                    "وقتی حس می‌کنم نادیده گرفته شدم",
                    "وقتی یکی خیلی منفی‌بافه",
                    "وقتی برنامه‌ها لحظه آخری کنسل می‌شه",
                    "تقریباً هیچ‌چیز، آرومم"
                ]
            },

            {
                q: "اگه بتونی فقط یکی از این عادت‌ها رو تو دوستات ببینی، کدوم رو انتخاب می‌کنی؟",
                options: [
                    "همیشه صادق بودن حتی اگه دردناک باشه",
                    "همیشه در دسترس بودن",
                    "داشتن حس شوخ‌طبعی قوی",
                    "حمایت مالی وقتی لازم باشه",
                    "احترام به حریم شخصی",
                    "جاه‌طلبی و انگیزه دادن",
                    "وفاداری مطلق",
                    "فهمیدن بدون نیاز به توضیح زیاد"
                ]
            },

            {
                q: "بیشترین وقت آزادت رو چطور می‌گذرونی؟",
                options: [
                    "اسکرول اینستا و توییتر",
                    "فیلم و سریال",
                    "کتاب یا پادکست",
                    "ورزش یا پیاده‌روی",
                    "گپ زدن با یکی دو تا دوست نزدیک",
                    "کار کردن روی پروژه شخصی",
                    "خوابیدن و ریکاور شدن",
                    "هیچ‌کار خاصی، فقط بودن"
                ]
            },

            {
                q: "تو مسائل مالی با دوستات چطور هستی؟",
                options: [
                    "خیلی راحت پول قرض می‌دم و می‌گیرم",
                    "ترجیح می‌دم حساب‌ها جدا باشه",
                    "گاهی خسیس می‌شم",
                    "همیشه من بیشتر خرج می‌کنم",
                    "حساسم روی اینکه کی چقدر داده",
                    "اصلاً راجع به پول حرف نمی‌زنم",
                    "اگه لازم باشه بدون منت کمک می‌کنم",
                    "ترجیح می‌دم هیچ‌وقت پول وسط نباشه"
                ]
            },

            {
                q: "کدوم موضوع بیشتر تو جمع دوستات بحث می‌شه؟",
                options: [
                    "مهاجرت و آینده",
                    "رابطه‌های عاطفی",
                    "کار و پول",
                    "خانواده و فشارهاش",
                    "سیاست و اوضاع کشور",
                    "فیلم، موسیقی و مم",
                    "برنامه‌های سفر و خوش‌گذرونی",
                    "حرفای بی‌خود و روزمره"
                ]
            },

            {
                q: "وقتی حس می‌کنی یکی از دوستات داره ازت دور می‌شه، چیکار می‌کنی؟",
                options: [
                    "مستقیم می‌پرسم چی شده",
                    "خودم فاصله می‌گیرم",
                    "بیشتر پیام می‌دم و تلاش می‌کنم",
                    "صبر می‌کنم ببینم خودش برمی‌گرده",
                    "از بقیه می‌پرسم خبری هست یا نه",
                    "عصبانی می‌شم و کات می‌کنم",
                    "سعی می‌کنم بفهمم مشکل از منه یا نه",
                    "قبول می‌کنم که روابط تغییر می‌کنن"
                ]
            },

            {
                q: "بیشترین چیزی که تو دوستی بهت انرژی می‌ده چیه؟",
                options: [
                    "حرف زدن تا دیروقت",
                    "سکوت راحت کنار هم",
                    "تجربه‌های جدید با هم",
                    "حمایت تو لحظه‌های سخت",
                    "خندیدن بی‌وقفه",
                    "رشد کردن با هم",
                    "حس امنیت و پذیرفته شدن",
                    "رقابت سالم و انگیزه"
                ]
            },

            {
                q: "تو کدوم موقعیت بیشتر احساس تنهایی می‌کنی حتی اگه دوست داشته باشی؟",
                options: [
                    "وقتی همه مشغول زندگی خودشونن",
                    "تو جمع‌های شلوغ",
                    "وقتی کسی حرف دلت رو نمی‌فهمه",
                    "بعد از یه دعوا یا سوءتفاهم",
                    "وقتی موفقیت یا شکست بزرگی داری",
                    "شب‌های طولانی",
                    "وقتی حس می‌کنی باید نقش بازی کنی",
                    "تقریباً هیچ‌وقت"
                ]
            },

            {
                q: "اگه یکی از دوستات راز مهمی بهت بگه، چیکار می‌کنی؟",
                options: [
                    "تا ابد نگه می‌دارم",
                    "فقط به یکی دو تا آدم خیلی نزدیک ممکنه بگم",
                    "اگه به نفعش باشه ممکنه دخالت کنم",
                    "سنگین می‌شه برام و اذیت می‌شم",
                    "سعی می‌کنم فراموش کنم",
                    "اگه خطرناک باشه بهش می‌گم باید به کس دیگه‌ای بگه",
                    "کاملاً محرمانه می‌مونه",
                    "بستگی به راز داره"
                ]
            },

            {
                q: "کدوم نوع طنز بیشتر بهت می‌چسبه تو دوستات؟",
                options: [
                    "طنز سیاه و تلخ",
                    "شوخی‌های شخصی و خودمونی",
                    "مم و رفرنس‌های اینترنتی",
                    "طنز موقعیتی و لحظه‌ای",
                    "شوخی‌های رک و بی‌پرده",
                    "طنز ملایم و خانوادگی",
                    "خودتحقیری",
                    "تقریباً هر شوخی‌ای"
                ]
            },

            {
                q: "وقتی با دوستات برنامه‌ای می‌ریزید، معمولاً چی پیش میاد؟",
                options: [
                    "من برنامه‌ریزم و همه چیز مرتب پیش می‌ره",
                    "همه چیز لحظه آخری مشخص می‌شه",
                    "یکی دو نفر همیشه غایب می‌شن",
                    "برنامه‌ها خیلی سریع کنسل می‌شن",
                    "معمولاً بهتر از انتظار پیش می‌ره",
                    "بحث سر جزئیات زیاد پیش میاد",
                    "من دیر می‌رسم و بقیه شاکی می‌شن",
                    "اصلاً برنامه نمی‌ریزیم، خودبه‌خود پیش میاد"
                ]
            },

            {
                q: "بیشترین چیزی که از یه دوست نزدیک انتظار داری چیه؟",
                options: [
                    "اینکه بدون قضاوت گوش بده",
                    "اینکه تو سختی‌ها باشه",
                    "اینکه صادق باشه",
                    "اینکه حالم رو بفهمه بدون توضیح",
                    "اینکه رشد کنه و منم باهاش",
                    "اینکه وقت بذاره",
                    "اینکه ازم دفاع کنه",
                    "اینکه فقط باشه، بدون انتظار زیاد"
                ]
            },

            {
                q: "تو روابط دوستی چقدر زود دل می‌بندی؟",
                options: [
                    "خیلی سریع و عمیق",
                    "آروم و محتاط",
                    "اول خوب چک می‌کنم بعد نزدیک می‌شم",
                    "تقریباً به سختی",
                    "بستگی به طرف مقابل داره",
                    "اول عاشق می‌شم بعد پشیمون",
                    "سعی می‌کنم سطحی نگه دارم",
                    "اصلاً نمی‌تونم کنترل کنم"
                ]
            },

            {
                q: "کدوم موقعیت بیشتر باعث می‌شه از یه دوست فاصله بگیری؟",
                options: [
                    "دروغ گفتن",
                    "حسادت یا رقابت ناسالم",
                    "تغییر ارزش‌ها",
                    "بی‌توجهی مداوم",
                    "دخالت تو زندگی شخصی",
                    "منفی‌بافی دائمی",
                    "وقتی حس کنم دیگه چیزی برای گفتن نداریم",
                    "تقریباً هیچ‌چیز، سخت قطع می‌کنم"
                ]
            },

            {
                q: "اگه قرار باشه یکی از این‌ها رو با دوستات تجربه کنی، کدوم هیجان‌انگیزتره؟",
                options: [
                    "یه سفر جاده‌ای طولانی",
                    "یه پروژه مشترک (کسب‌وکار یا هنری)",
                    "یه شب‌نشینی طولانی با حرفای عمیق",
                    "کمک کردن به هم تو یه بحران",
                    "کشف یه جای جدید تو شهر",
                    "یه چالش فیزیکی یا ورزشی",
                    "ساختن یه خاطره احمقانه با هم",
                    "فقط بودن بدون هیچ برنامه‌ای"
                ]
            },

            {
                q: "اگه بهترین دوستت بخواد یه جمله واقعی در موردت بنویسه، کدوم به واقعیت نزدیک‌تره؟",
                options: [
                    "«همیشه می‌تونم روش حساب کنم»",
                    "«باهاش می‌تونم خودم باشم»",
                    "«گاهی سنگین می‌شه ولی ارزشش رو داره»",
                    "«بیشتر از چیزی که نشون می‌ده حس داره»",
                    "«باهاش خندیدن راحت‌ترین کار دنیاست»",
                    "«وقتی هست آروم می‌شم»",
                    "«گاهی دور می‌شه ولی برمی‌گرده»",
                    "«هیچ‌کدوم از اینا کامل نیست»"
                ]
            }

        ];


        /* =========================
           سیستم شناسه 8 تایی
        ========================= */

        function generateId() {
            const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
            let id = "";
            for (let i = 0; i < 8; i++) {
                id += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return id;
        }

        function saveAnswers(data) {
            const id = generateId();
            localStorage.setItem(`friend_${id}`, JSON.stringify(data));
            return id;
        }

        function loadAnswers(id) {
            try {
                const data = localStorage.getItem(`friend_${id}`);
                return data ? JSON.parse(data) : null;
            } catch (e) {
                return null;
            }
        }

        function readOpponentFromURL() {
            const params = new URLSearchParams(location.search);
            const id = params.get("friend");
            if (!id) return null;
            return loadAnswers(id);
        }

        function buildFriendLink(name, answers) {
            const id = saveAnswers({ n: name, a: answers });
            const url = new URL(location.href);
            url.searchParams.set("friend", id);
            return url.toString();
        }


        /* =========================
           تابع shuffle
        ========================= */

        function shuffle(array) {
            const arr = [...array];
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        }


        /* =========================
           مرحله اول - نام
        ========================= */

        function askName() {

            opponentAnswers = readOpponentFromURL();

            const banner = opponentAnswers
                ? `
                    <div style="background: rgba(255,255,255,0.07); padding: 14px; border-radius: 12px; margin-bottom: 20px; line-height: 1.8;">
                        👯 <b>${escapeHTML(opponentAnswers.n)}</b> فکر می‌کنه دوست خوبشه!
                        <br>
                        حالا نوبت توئه که ببینیم واقعاً چقدر می‌شناسه.
                    </div>
                `
                : "";

            area.innerHTML = `
                ${banner}

                <div class="question" style="margin-bottom: 18px;">
                    اسمت چیه؟
                </div>

                <input
                    type="text"
                    id="friendNameInput"
                    placeholder="مثلاً: علی، سارا..."
                    style="width: 100%; padding: 12px; border-radius: 10px; border: none; margin-bottom: 16px; font-size: 1rem;"
                >

                <button class="primary" id="confirmFriendName">
                    شروع سؤال‌ها 👯
                </button>
            `;

            document.getElementById("confirmFriendName").onclick = () => {
                const input = document.getElementById("friendNameInput");
                personName = input.value.trim() || "بدبخت بی‌نام";
                index = 0;
                userAnswers = [];
                renderQuestion();
            };

        }


        /* =========================
           رندر سؤالات فاز اول
        ========================= */

        function renderQuestion() {

            const item = questions[index];
            const shuffledOptions = shuffle([...item.options]);

            area.innerHTML = `
                <div class="progress-box">
                    <p>👯 سؤال ${index + 1} از ${questions.length}</p>
                    <div class="bar">
                        <span style="width:${(index / questions.length) * 100}%"></span>
                    </div>
                </div>

                <div class="question">
                    ${item.q}
                </div>

                <div style="margin-top: 18px;">
                    ${shuffledOptions.map((opt, i) => `
                        <button class="secondary answer-btn" data-option="${escapeHTML(opt)}" style="margin-bottom: 10px; display: block; width: 100%; text-align: right;">
                            ${String.fromCharCode(65 + i)} - ${escapeHTML(opt)}
                        </button>
                    `).join("")}
                </div>
            `;

            document.querySelectorAll(".answer-btn").forEach(btn => {
                btn.onclick = () => {

                    const value = btn.dataset.option;

                    userAnswers.push({
                        q: item.q,
                        a: value,
                        options: item.options
                    });

                    index++;

                    if (index >= questions.length) {
                        finishPhase1();
                    } else {
                        area.style.opacity = "0";
                        area.style.transform = "translateY(8px)";
                        setTimeout(() => {
                            area.style.opacity = "1";
                            area.style.transform = "translateY(0)";
                            renderQuestion();
                        }, 240);
                    }

                };
            });

        }


        /* =========================
           پایان فاز اول - نمایش لینک
        ========================= */

        function finishPhase1() {

            const friendLink = buildFriendLink(personName, userAnswers);

            const shareText = `👯 من ${personName} هستم و فکر می‌کنم دوستام واقعاً خوب می‌شناسنم.\n\nتو رو چقدر می‌شناسی ببینیم:\n${friendLink}`;

            area.innerHTML = `
                <div class="story-card">

                    <h2>👯 عالیه!</h2>

                    <p style="line-height: 1.8; margin: 16px 0;">
                        سؤالات‌ت رو تموم کردی ${escapeHTML(personName)} عزیز.
                        <br><br>
                        حالا لینکت رو برای یه دوست بفرست تا ببینیم اون‌چقدر تو رو می‌شناسه.
                    </p>

                    <button class="primary" id="copyFriendLink" style="margin-bottom: 10px; width: 100%;">
                        📋 کپی لینک برای دوست
                    </button>

                    <button class="secondary" id="restartFriend" style="width: 100%;">
                        دوباره شروع کن 👯
                    </button>

                </div>
            `;

            document.getElementById("copyFriendLink").onclick = () => {
                navigator.clipboard.writeText(shareText).then(() => {
                    const btn = document.getElementById("copyFriendLink");
                    btn.innerText = "کپی شد! ✅";
                    setTimeout(() => {
                        btn.innerText = "📋 کپی لینک برای دوست";
                    }, 2000);
                });
            };

            document.getElementById("restartFriend").onclick = () => {
                const url = new URL(location.href);
                url.searchParams.delete("friend");
                history.replaceState(null, "", url.toString());
                index = 0;
                personName = "";
                userAnswers = [];
                opponentAnswers = null;
                askName();
            };

        }


        /* =========================
           فاز دوم - جواب دادن دوست
        ========================= */

        function startPhase2() {

            const opponent = opponentAnswers;

            index = 0;
            score = 0;

            function renderPhase2Question() {

                const item = opponent.a[index];
                const correctAnswer = String(item.a).trim();

                let options = item.options || questions.find(q => q.q === item.q)?.options || [];

                const shuffledOptions = shuffle([...options]);

                area.innerHTML = `
                    <div class="progress-box">
                        <p>👯 سؤال ${index + 1} از ${opponent.a.length}</p>
                        <div class="bar">
                            <span style="width:${(index / opponent.a.length) * 100}%"></span>
                        </div>
                    </div>

                    <div style="background: rgba(255,255,255,0.07); padding: 12px; border-radius: 10px; margin-bottom: 20px; font-size: 13px;">
                        سؤال برای: <b>${escapeHTML(opponent.n)}</b>
                    </div>

                    <div class="question">
                        ${item.q}
                    </div>

                    <div style="margin-top: 18px;">
                        ${shuffledOptions.map((opt, i) => `
                            <button class="secondary phase2-answer" data-option="${escapeHTML(opt)}" style="margin-bottom: 10px; display: block; width: 100%; text-align: right;">
                                ${String.fromCharCode(65 + i)} - ${escapeHTML(opt)}
                            </button>
                        `).join("")}
                    </div>
                `;

                document.querySelectorAll(".phase2-answer").forEach(btn => {
                    btn.onclick = () => {

                        const selectedOption = String(btn.dataset.option).trim();
                        const isCorrect = selectedOption === correctAnswer;

                        if (isCorrect) {
                            score++;
                            btn.style.background = "linear-gradient(135deg, var(--green), #2ecc71)";
                            btn.style.color = "white";
                        } else {
                            btn.style.background = "linear-gradient(135deg, var(--red), #ff5c70)";
                            btn.style.color = "white";
                        }

                        document.querySelectorAll(".phase2-answer").forEach(b => {
                            b.disabled = true;
                            b.style.opacity = "0.7";
                        });

                        setTimeout(() => {
                            index++;

                            if (index >= opponent.a.length) {
                                finishPhase2();
                            } else {
                                area.style.opacity = "0";
                                area.style.transform = "translateY(8px)";
                                setTimeout(() => {
                                    area.style.opacity = "1";
                                    area.style.transform = "translateY(0)";
                                    renderPhase2Question();
                                }, 260);
                            }
                        }, 850);

                    };
                });

            }

            renderPhase2Question();

        }


        /* =========================
           پایان فاز دوم
        ========================= */

        function finishPhase2() {

            const opponent = opponentAnswers;
            const totalQuestions = opponent.a.length;
            const percent = Math.round((score / totalQuestions) * 100);

            let verdictTitle = "";
            let verdictText = "";

            if (percent === 100) {
                verdictTitle = "🏆 دوست شاخ‌دار";
                verdictText = `${score}/${totalQuestions} - تو این رفاقتو شایسته‌ی تمام افتخارات دنیا. ${escapeHTML(opponent.n)} واقعاً دوستت داره.`;
            } else if (percent >= 80) {
                verdictTitle = "⭐ دوست خوب";
                verdictText = `${score}/${totalQuestions} - تقریباً همه چیز رو درست گفتی. احتمالاً برای ${escapeHTML(opponent.n)} مهمی.`;
            } else if (percent >= 60) {
                verdictTitle = "👍 خواب‌زده";
                verdictText = `${score}/${totalQuestions} - تقریباً می‌شناختی ولی چند تا رو جا گذاشتی. بیشتر وقت بذار باهاش.`;
            } else if (percent >= 40) {
                verdictTitle = "😅 دوست قابل‌تردید";
                verdictText = `${score}/${totalQuestions} - سر و سامان ندادی. احتمالاً بیشتر وقت رو توی گوشی بی‌خیالش می‌کنی.`;
            } else {
                verdictTitle = "💀 اصلاً نمی‌شناختیش";
                verdictText = `${score}/${totalQuestions} - این دوستی بیشتر توی یه نزدیکی و یه دوری بود. کاملاً غریبه‌تر از یه غریبه.`;
            }

            area.innerHTML = `
                <div class="story-card">

                    <h2>👯 نتیجه</h2>

                    <h1 style="margin: 14px 0 8px;">${verdictTitle}</h1>

                    <div class="big" style="font-size: 2.6rem; margin: 10px 0;">
                        ${percent}٪
                    </div>

                    <p style="opacity: 0.85; margin-bottom: 6px;">درصد رفاقت خوب</p>

                    <div class="bar" style="margin-bottom: 22px;">
                        <span style="width: ${percent}%"></span>
                    </div>

                    <p style="line-height: 1.75; margin-bottom: 18px; opacity: 0.95;">
                        ${verdictText}
                    </p>

                    <div style="background: rgba(255,255,255,0.07); padding: 14px; border-radius: 12px; margin: 18px 0; line-height: 1.8;">
                        📊 درصد بوی به درد نخوری: <b>${100 - percent}٪</b>
                        <br>
                        (یعنی ${100 - percent}٪ اینجا خیال‌بافی بود)
                    </div>

                    <button class="primary" id="restartPhase2" style="width: 100%;">
                        دوباره تست کن 👯
                    </button>

                </div>
            `;

            document.getElementById("restartPhase2").onclick = () => {
                const url = new URL(location.href);
                url.searchParams.delete("friend");
                history.replaceState(null, "", url.toString());
                index = 0;
                personName = "";
                userAnswers = [];
                opponentAnswers = null;
                score = 0;
                askName();
            };

        }


        /* =========================
           شروع
        ========================= */

        document.getElementById("startFriendTest").onclick = () => {
            area.style.opacity = "0";
            setTimeout(() => {
                area.style.opacity = "1";
                askName();
            }, 200);
        };

        if (readOpponentFromURL()) {
            opponentAnswers = readOpponentFromURL();
            if (opponentAnswers) {
                document.getElementById("startFriendTest").onclick = () => {
                    area.style.opacity = "0";
                    setTimeout(() => {
                        area.style.opacity = "1";
                        startPhase2();
                    }, 200);
                };
            }
        }

    }

};
