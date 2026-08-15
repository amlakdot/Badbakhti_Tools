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
                ۲۰ سؤال شخصی جواب بده، 
                بعد لینکت برای دوستت بفرست و ببین اون‌چقدر تو رو می‌شناسه.
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
           بانک‌های تصادفی برای گزینه‌ها
        ========================= */

        const banks = {

            colors: [
                "قرمز", "آبی", "سبز", "زرد", 
                "بنفش", "نارنجی", "مشکی", "سفید"
            ],

            numbers: [
                7, 13, 21, 42, 88, 99, 100, 777
            ],

            movies: [
                "شاهزاده‌خان", "درام", "اکشن", "کمدی",
                "علمی‌تخیلی", "رومانتیک", "ترسناک", "انیمیشن"
            ],

            cities: [
                "تهران", "اصفهان", "شیراز", "تبریز",
                "مشهد", "کرج", "قزوین", "رشت"
            ],

            animals: [
                "گربه", "سگ", "اسب", "عقاب",
                "ببر", "گاو", "شیر", "پنگوئن"
            ],

            foods: [
                "پیتزا", "فلافل", "کباب", "پاستا",
                "سوشی", "برگر", "فالوده", "کشری"
            ],

            seasons: [
                "بهار", "تابستان", "پاییز", "زمستان",
                "هر فصل برای من یکی", "فصل کار", "فصل خستگی", "فصل تنهایی"
            ],

            singers: [
                "صدا شریفی", "علیرضا قربانی", "بهناز جعفری", "رضا صادقی",
                "بزرگ‌تر", "ترپ", "راپ", "صدا شکسته"
            ],

            books: [
                "بوی خوش", "خیاطی‌های شاخت", "شلگون", "سالی در کراتچف",
                "مثل باد کشتندشان", "حورا", "دومینو", "قصه‌های خیال‌پردازی"
            ],

            habits: [
                "اسکرول گوشی", "خوردن", "خواب بیش‌ از حد", "فکر کردن",
                "تماشای سریال", "ورزش", "خاموشی", "حرف‌زدن در خلوت"
            ]

        };


        /* =========================
           سؤالات فاز اول (کاربر)
        ========================= */

        const questions = [

            {
                q: "رنگت چیه؟",
                type: "text",
                bank: "colors",
                placeholder: "مثلاً: آبی"
            },

            {
                q: "عدد مورد علاقه‌ت چیه؟",
                type: "number",
                bank: "numbers",
                placeholder: "مثلاً: 7"
            },

            {
                q: "سن‌ت چنده؟",
                type: "number",
                bank: null,
                placeholder: "مثلاً: 25"
            },

            {
                q: "ژانر فیلم مورد علاقه‌ت کدومه؟",
                type: "text",
                bank: "movies",
                placeholder: "مثلاً: اکشن"
            },

            {
                q: "شهر مورد علاقه‌ت چیه؟",
                type: "text",
                bank: "cities",
                placeholder: "مثلاً: اصفهان"
            },

            {
                q: "حیوان مورد علاقه‌ت کدومه؟",
                type: "text",
                bank: "animals",
                placeholder: "مثلاً: گربه"
            },

            {
                q: "غذای مورد علاقه‌ت چیه؟",
                type: "text",
                bank: "foods",
                placeholder: "مثلاً: پیتزا"
            },

            {
                q: "فصل مورد علاقه‌ت کدومه؟",
                type: "text",
                bank: "seasons",
                placeholder: "مثلاً: بهار"
            },

            {
                q: "خواننده/موسیقار مورد علاقه‌ت چیه؟",
                type: "text",
                bank: "singers",
                placeholder: "مثلاً: علیرضا قربانی"
            },

            {
                q: "کتاب یا رمانی که دوست داری؟",
                type: "text",
                bank: "books",
                placeholder: "مثلاً: شلگون"
            },

            {
                q: "بدترین عادتت چیه؟",
                type: "text",
                bank: "habits",
                placeholder: "مثلاً: اسکرول گوشی"
            },

            {
                q: "عدد دوم که دوستش داری؟",
                type: "number",
                bank: "numbers",
                placeholder: "مثلاً: 13"
            },

            {
                q: "رنگ دوم که دوستش داری؟",
                type: "text",
                bank: "colors",
                placeholder: "مثلاً: سبز"
            },

            {
                q: "ساعت مورد علاقه‌ای (نیمه‌شب؟ صبح؟)؟",
                type: "number",
                bank: null,
                placeholder: "مثلاً: 3 (برای ۳ صبح)"
            },

            {
                q: "طول روز چند ساعت گوشی دستت هست؟",
                type: "number",
                bank: null,
                placeholder: "مثلاً: 8"
            },

            {
                q: "افضل جای خلوت شدن تو کدومه؟",
                type: "text",
                bank: "cities",
                placeholder: "مثلاً: خانه"
            },

            {
                q: "بهترین دوست تو چی می‌کنه؟",
                type: "text",
                bank: "habits",
                placeholder: "مثلاً: حرف‌زدن"
            },

            {
                q: "چی می‌خوری وقتی ناراحتی؟",
                type: "text",
                bank: "foods",
                placeholder: "مثلاً: بستنی"
            },

            {
                q: "دیشب چند ساعت خوابیدی؟",
                type: "number",
                bank: null,
                placeholder: "مثلاً: 4"
            },

            {
                q: "اگه می‌تونستی بی‌ای؟",
                type: "text",
                bank: "cities",
                placeholder: "مثلاً: اروپا"
            }

        ];


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
           Encoding / Decoding
        ========================= */

        function encodeAnswers(data) {
            const json = JSON.stringify(data);
            return btoa(unescape(encodeURIComponent(json)));
        }

        function decodeAnswers(str) {
            try {
                const json = decodeURIComponent(escape(atob(str)));
                return JSON.parse(json);
            } catch (e) {
                return null;
            }
        }

        function readOpponentFromURL() {
            const params = new URLSearchParams(location.search);
            const raw = params.get("friend");
            if (!raw) return null;
            return decodeAnswers(raw);
        }

        function buildFriendLink(name, answers) {
            const encoded = encodeAnswers({ n: name, a: answers });
            const url = new URL(location.href);
            url.searchParams.set("friend", encoded);
            return url.toString();
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

            const inputHTML = item.type === "number"
                ? `
                    <input
                        type="number"
                        id="friendNumberInput"
                        placeholder="${item.placeholder}"
                        style="width: 100%; padding: 12px; border-radius: 10px; border: none; margin-top: 16px; font-size: 1rem;"
                    >
                    <button class="primary answer" data-type="number" style="margin-top: 12px; width: 100%;">
                        بعدی
                    </button>
                `
                : `
                    <input
                        type="text"
                        id="friendTextInput"
                        placeholder="${item.placeholder}"
                        style="width: 100%; padding: 12px; border-radius: 10px; border: none; margin-top: 16px; font-size: 1rem;"
                    >
                    <button class="primary answer" data-type="text" style="margin-top: 12px; width: 100%;">
                        بعدی
                    </button>
                `;

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

                ${inputHTML}
            `;

            document.querySelectorAll(".answer").forEach(btn => {
                btn.onclick = () => {

                    let value;

                    if (item.type === "number") {
                        const numberInput = document.getElementById("friendNumberInput");
                        value = Number(numberInput.value) || 0;
                    } else {
                        const textInput = document.getElementById("friendTextInput");
                        value = textInput.value.trim() || "";
                    }

                    userAnswers.push({
                        q: item.q,
                        a: value,
                        bank: item.bank
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
                const correctAnswer = String(item.a).toLowerCase().trim();

                // انتخاب بانک برای گزینه‌های غلط
                const bankName = item.bank;
                let correctDisplay = String(item.a);

                let optionsToChoose = [correctAnswer];

                if (bankName && banks[bankName]) {
                    const bankArray = banks[bankName].map(x => String(x).toLowerCase().trim());
                    const wrongOptions = bankArray.filter(x => x !== correctAnswer);
                    const selectedWrong = shuffle(wrongOptions).slice(0, 3);
                    optionsToChoose = [correctAnswer, ...selectedWrong];
                }

                // اگه کمتر از ۴ گزینه داره
                while (optionsToChoose.length < 4) {
                    optionsToChoose.push(`گزینه ${optionsToChoose.length}`);
                }

                const shuffledOptions = shuffle(optionsToChoose).map(x => String(x));

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

                    <div>
                        ${shuffledOptions.map((opt, i) => `
                            <button class="secondary phase2-answer" data-option="${opt}" style="margin-bottom: 10px; display: block; width: 100%; text-align: right;">
                                ${String.fromCharCode(65 + i)} - ${escapeHTML(opt)}
                            </button>
                        `).join("")}
                    </div>
                `;

                document.querySelectorAll(".phase2-answer").forEach(btn => {
                    btn.onclick = () => {

                        const selectedOption = String(btn.dataset.option).toLowerCase().trim();
                        const isCorrect = selectedOption === correctAnswer;

                        if (isCorrect) {
                            score++;
                            btn.style.background = "linear-gradient(135deg, var(--green), #2ecc71)";
                            btn.style.color = "white";
                        } else {
                            btn.style.background = "linear-gradient(135deg, var(--red), #ff5c70)";
                            btn.style.color = "white";
                        }

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
                        }, 800);

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
                verdictText = `${score}/${totalQuestions} - تو این رفاقتو شایسته‌ی تمام افتخارات دنیا‌یی. ${escapeHTML(opponent.n)} واقعاً دوستت دارن.`;
            } else if (percent >= 80) {
                verdictTitle = "⭐ دوست خوب";
                verdictText = `${score}/${totalQuestions} - تقریباً هر چی درست جواب دادی. احتمالاً برای ${escapeHTML(opponent.n)} مهمی.`;
            } else if (percent >= 60) {
                verdictTitle = "👍 خواب زده";
                verdictText = `${score}/${totalQuestions} - تقریباً می‌شناختی ولی چند تا رو جا گذاشتی. بیشتر وقت بگذار باهاشون.`;
            } else if (percent >= 40) {
                verdictTitle = "😅 دوست قابل‌تردید";
                verdictText = `${score}/${totalQuestions} - سر و سامان ندادی. احتمالاً بیشتر وقت رو توی گوشی بی‌خیال‌اش می‌کنی.`;
            } else {
                verdictTitle = "💀 اصلاً نمی‌شناختیش";
                verdictText = `${score}/${totalQuestions} - این دوستی توی یک نزدیکی و یک دوری بود. کاملاً غریبه‌تر از یک غریب.`;
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
                        (یعنی ${100 - percent}٪ اینجا خیال‌بافی بود و تخمین)
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

        // اگه از URL فاز ۲ اومد، شروع کن
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
