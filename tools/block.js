import {
    showResult
} from "../js/app.js";


export default {

    id: "block",

    icon: "🚫",

    title: "آیا باید بلاکش کنم؟",

    description:
    "قبل از اینکه دوباره به خودت دروغ بگی، اینجا تکلیف رو مشخص کن",

    buttonText:
    "تصمیم نهایی بلاک 🚫",



    html: `

    <div class="box">

        <h2>
            🚫 آیا باید بلاکش کنم؟
        </h2>

        <p class="desc">
            اسم یا لقب طرف رو وارد کن، 
            به ۱۰ تا سؤال جواب بده، 
            بعد  بهت می‌گم بلاک کنی یا هنوز به خودت دروغ بگی.
        </p>

        <div id="blockArea">

            <button class="primary" id="startBlock">
                تصمیم نهایی بلاک 🚫
            </button>

        </div>

    </div>

    `,



    init() {

        const area = document.getElementById("blockArea");

        let index = 0;
        let totalScore = 0;
        let personName = "";


        function shuffle(array) {
            const arr = [...array];
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        }


        const questions = [

            {
                q: "وقتی باهاش حرف می‌زنی یا پیام می‌دی، بیشتر اوقات چه حسی بهت دست می‌ده؟",
                a: [
                    ["آروم و محترم رفتار می‌کنه", 0],
                    ["معمولاً خوبه ولی گاهی تحقیرم می‌کنه", 6],
                    ["مدام حسم رو خراب می‌کنه و منو کوچک می‌کنه", 12],
                    ["بعد از حرف زدن باهاش حس می‌کنم از درون پاشیدم", 18]
                ]
            },

            {
                q: "در مورد مسائل شخصی یا جنسی چطور باهات رفتار می‌کنه؟",
                a: [
                    ["محترمانه و با رضایت طرفین پیش می‌ره", 0],
                    ["گاهی مرزها رو رعایت نمی‌کنه ولی بعد عذرخواهی می‌کنه", 7],
                    ["فشار می‌آره، تحقیر می‌کنه یا بدون رضایت پیش می‌ره", 14],
                    ["کاملاً ازت سوءاستفاده می‌کنه و برات مهم نیستی", 20]
                ]
            },

            {
                q: "اگه بدونه گرایش یا هویت جنسی خاصی داری (یا حتی شک کنه)، واکنشش چیه؟",
                a: [
                    ["کاملاً قبولت می‌کنه و احترام می‌ذاره", 0],
                    ["یه کم عجیب براش هست ولی سعی می‌کنه کنار بیاد", 5],
                    ["مسخره‌ت می‌کنه یا غیرمستقیم تحقیرت می‌کنه", 13],
                    ["هموفوب یا ترنس‌فوبه و آشکارا توهین می‌کنه", 20]
                ]
            },

            {
                q: "وقتی اشتباه می‌کنه یا بهت آسیب می‌زنه، چیکار می‌کنه؟",
                a: [
                    ["مسئولیتشو می‌پذیره و عذرخواهی واقعی می‌کنه", 0],
                    ["عذرخواهی می‌کنه ولی زود دوباره تکرار می‌کنه", 6],
                    ["همه‌چیز رو گردن تو می‌ندازه و گازلایت می‌کنه", 14],
                    ["اصلاً قبول نمی‌کنه اشتباهی کرده و تو رو مقصر می‌دونه", 19]
                ]
            },

            {
                q: "چقدر ازت برای منافع خودش استفاده می‌کنه؟",
                a: [
                    ["اصلاً اهل استفاده کردن نیست", 0],
                    ["گاهی یه سری چیزا می‌خواد ولی زیاد نیست", 7],
                    ["مدام ازت پول، وقت، انرژی یا رابطه می‌خواد بدون پس دادن", 14],
                    ["فقط وقتی بهت نیاز داره پیام می‌ده و بعد ناپدید می‌شه", 20]
                ]
            },

            {
                q: "در جمع یا پیش بقیه چطور در موردت حرف می‌زنه یا رفتار می‌کنه؟",
                a: [
                    ["احترام می‌ذاره و ازت حمایت می‌کنه", 0],
                    ["معمولاً خوبه ولی گاهی شوخی‌های تلخ می‌کنه", 6],
                    ["مسخره‌ت می‌کنه یا غیرمستقیم تحقیرت می‌کنه", 13],
                    ["آشکارا توهین می‌کنه یا بقیه رو علیهت می‌شورونه", 19]
                ]
            },

            {
                q: "وقتی ناراحتی یا ضعف نشون می‌دی، واکنشش چیه؟",
                a: [
                    ["حمایتت می‌کنه و فضات رو درک می‌کنه", 0],
                    ["سعی می‌کنه کمک کنه ولی زیاد حالیت نیست", 5],
                    ["مسخره‌ت می‌کنه یا می‌گه زیادی حساسی", 13],
                    ["از ضعفت علیه خودت استفاده می‌کنه", 20]
                ]
            },

            {
                q: "چقدر دروغ می‌گه یا چیزا رو ازت پنهان می‌کنه؟",
                a: [
                    ["راستگو و شفافه", 0],
                    ["گاهی دروغ‌های کوچیک می‌گه", 6],
                    ["زیاد دروغ می‌گه و وقتی می‌فهمی باز هم توجیه می‌کنه", 13],
                    ["زندگیش پر از دروغه و تو فقط یکی از قصه‌هاشی", 19]
                ]
            },

            {
                q: "بعد از اینکه باهاش وقت می‌گذرونی یا حرف می‌زنی، معمولاً چه حسی داری؟",
                a: [
                    ["حس خوبی دارم و انرژی می‌گیرم", 0],
                    ["معمولیه، نه خوب نه بد", 4],
                    ["خسته‌ام، کوچیک شدم یا اعصابم خرد شده", 12],
                    ["حس می‌کنم دوباره یه تیکه از خودم رو از دست دادم", 20]
                ]
            },

            {
                q: "اگه امروز بلاکش کنی، راستش رو بگو چه حسی بهت دست می‌ده؟",
                a: [
                    ["ناراحت می‌شم چون آدم خوبیه", 0],
                    ["سختیه ولی می‌دونم شاید لازم باشه", 6],
                    ["یه کم می‌ترسم ولی ته دلم می‌دونم باید این کار رو بکنم", 12],
                    ["احساس آزادی و نجات پیدا می‌کنم", 18]
                ]
            }

        ];


        // مرحله ۱: گرفتن اسم
        function askName() {
            area.innerHTML = `
                <div class="question" style="margin-bottom: 18px;">
                    اسم یا لقب کسی که می‌خوای در مورد بلاک کردنش تصمیم بگیری چیه؟
                </div>

                <input 
                    type="text" 
                    id="personNameInput" 
                    placeholder="مثلاً: علی، اون، سمیه، همون‌که می‌دونی..." 
                    style="width: 100%; padding: 12px; border-radius: 10px; border: none; margin-bottom: 16px; font-size: 1rem;"
                />

                <button class="primary" id="confirmName">
                    ادامه بده 🚫
                </button>
            `;

            document.getElementById("confirmName").onclick = () => {
                const input = document.getElementById("personNameInput");
                personName = input.value.trim() || "اون طرف";

                area.style.opacity = "0";
                setTimeout(() => {
                    area.style.opacity = "1";
                    renderQuestion();
                }, 250);
            };
        }


        function renderQuestion() {
            const item = questions[index];
            const shuffled = shuffle(item.a);

            area.innerHTML = `
                <div class="progress-box">
                    <p>🚫 مرحله ${index + 1} از ${questions.length}</p>
                    <div class="bar">
                        <span style="width:${(index / questions.length) * 100}%"></span>
                    </div>
                </div>

                <div class="question">
                    ${item.q}
                </div>

                <div>
                    ${shuffled.map((a, i) => `
                        <button class="secondary answer" data-id="${i}">
                            ${String.fromCharCode(65 + i)} - ${a[0]}
                        </button>
                    `).join("")}
                </div>
            `;

            document.querySelectorAll(".answer").forEach(btn => {
                btn.onclick = () => {
                    const answer = shuffled[Number(btn.dataset.id)];
                    totalScore += answer[1];

                    index++;

                    if (index >= questions.length) {
                        finish();
                    } else {
                        area.style.opacity = "0";
                        area.style.transform = "translateY(8px)";
                        setTimeout(() => {
                            area.style.opacity = "1";
                            area.style.transform = "translateY(0)";
                            renderQuestion();
                        }, 260);
                    }
                };
            });
        }


        function finish() {
            let title = "";
            let decision = "";
            let longText = "";

            if (totalScore <= 35) {
                title = "🌱 فعلاً بلاک نکن";
                decision = "بلاک نکن";
                longText = `از جواب‌هایی که دادی این‌طور برمیاد که ${personName} هنوز به مرحله‌ای نرسیده که لازم باشه کامل حذفش کنی. ممکنه مشکلاتی وجود داشته باشه، ولی به نظر نمی‌رسه رابطه در حد سمّی و مخرب باشه. فعلاً می‌تونی با حد و مرز گذاشتن ادامه بدی. البته مواظب باش خودت رو گول نزنی.`;
            } 
            else if (totalScore <= 70) {
                title = "⚠️ در لبه تیغ";
                decision = "با احتیاط ادامه بده یا فاصله بگیر";
                longText = `${personName} داره وارد فاز خطرناک می‌شه. رفتارهایی که توصیف کردی نشون می‌ده که داره بهت آسیب می‌زنه، ولی هنوز به نقطه‌ای نرسیده که حتماً باید بلاک بشه. پیشنهاد می‌کنم برای یه مدت فاصله بگیری و ببینی بدون حضورش حالت بهتر می‌شه یا نه. اگه باز هم همین حس خراب رو داشتی، بلاک کردن کار درستیه.`;
            } 
            else if (totalScore <= 110) {
                title = "🚫 بهتره بلاک کنی";
                decision = "بلاک کن";
                longText = `از مجموع جواب‌هات کاملاً مشخصه که ${personName} داره برات سمی و فرسایشی می‌شه. تحقیر، استفاده کردن، رعایت نکردن مرزها و حس بدی که بعد از تعامل باهاش داری، همه سیگنال‌های واضحین. ادامه دادن فقط بیشتر ازت انرژی و عزت‌نفس می‌گیره. بلاک کردن در این مرحله نه تنها ضعف نیست، بلکه مراقبت از خودته.`;
            } 
            else {
                title = "☠️ فوری بلاک کن";
                decision = "همین حالا بلاک کن";
                longText = `${personName} دیگه از مرحله سمی بودن گذشته. چیزی که توصیف کردی ترکیبی از تحقیر، سوءاستفاده، گازلایت، بی‌احترامی به مرزهای شخصی و جنسی و آسیب زدن مداوم به روحيه‌ته. موندن در این رابطه یا ارتباط فقط داره بیشتر نابودت می‌کنه. بلاک کردن الان نه یه تصمیم احساسی، بلکه یه ضرورت برای نجات خودته. هر چی بیشتر بذاری بمونه، جدا شدنش سخت‌تر و آسیبش عمیق‌تر می‌شه.`;
            }


            area.innerHTML = `
                <div class="story-card">

                    <h2>🚫 نتیجه نهایی</h2>

                    <h1 style="margin: 14px 0 10px; font-size: 1.5rem;">
                        ${title}
                    </h1>

                    <div style="background: rgba(255,255,255,0.07); padding: 16px; border-radius: 12px; margin: 18px 0; line-height: 1.8; font-size: 1.05rem;">
                        <b>${personName}</b> رو ${decision}.
                        <br><br>
                        ${longText}
                    </div>

                    <button class="primary" id="restartBlock" style="margin-bottom: 10px;">
                        دوباره برای یه نفر دیگه تصمیم بگیر 🚫
                    </button>

                    <button class="secondary" id="shareBlock" style="width: 100%;">
                        کپی نتیجه 📋
                    </button>

                </div>
            `;


            localStorage.setItem("badbakhtiBlock", JSON.stringify({
                name: personName,
                score: totalScore,
                decision,
                date: new Date().toLocaleDateString("fa-IR")
            }));


            document.getElementById("restartBlock").onclick = () => {
                index = 0;
                totalScore = 0;
                personName = "";
                askName();
            };


            document.getElementById("shareBlock").onclick = () => {
                const text = `🚫 نتیجه ابزار «آیا باید بلاکش کنم؟»\n\n` +
                    `در مورد: ${personName}\n` +
                    `نتیجه: ${title}\n\n` +
                    `${longText}\n\n` +
                    `جعبه ابزار بدبختی:\nhttps://xixtelegram.github.io/Badbakhti_Tools/`;

                navigator.clipboard.writeText(text).then(() => {
                    const btn = document.getElementById("shareBlock");
                    btn.innerText = "کپی شد! ✅";
                    setTimeout(() => {
                        btn.innerText = "کپی نتیجه 📋";
                    }, 2000);
                });
            };
        }


        document.getElementById("startBlock").onclick = () => {
            area.style.opacity = "0";
            setTimeout(() => {
                area.style.opacity = "1";
                askName();
            }, 200);
        };

    }

};
