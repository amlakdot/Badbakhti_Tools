import {
    showResult
} from "../js/app.js";


export default {

    id: "migration",

    icon: "✈️",

    title: "فال مهاجرت",

    description:
    "ببین احتمال فرار کردن از این بدبختی چقدره ",

    buttonText:
    "ببین کی می‌تونی فرار کنی ✈️",



    html: `

    <div class="box">


        <h2>
            ✈️ فال مهاجرت
        </h2>


        <p class="desc">
            چند تا سؤال ازت می‌پرسیم و بعد بهت می‌گم 
            شانس فرار کردنت از این جهنم چقدره.
        </p>


        <div id="migrationArea">


            <button
            class="primary"
            id="startMigration"
            >
                ببین کی می‌تونی فرار کنی ✈️
            </button>


        </div>


    </div>

    `,



    init() {


        const area = document.getElementById("migrationArea");

        let index = 0;
        let totalScore = 0;


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
                q: "سنت چنده‌؟ صادقانه بگو، نه اون چیزی که به بقیه می‌گی.",
                a: [
                    ["زیر ۲۵‌ام هنوز، دارم به خودم دروغ می‌گم که وقت هست", 18],
                    ["بین ۲۵ تا ۳۲، دیگه داره گلوم رو می‌گیره", 11],
                    ["۳۳ تا ۴۰، حس می‌کنم قطار رفته و من رو سکوی خالی موندما", 5],
                    ["بالای ۴۰، فقط خدا می‌دونه چرا هنوز دارم نفس می‌کشم", 1]
                ]
            },

            {
                q: "انگلیسیت در چه حدیه؟ دروغ نگو، می‌فهمم.",
                a: [
                    ["خوبم، آیلتس درست‌حسابی دارم یا می‌تونم بگیرم", 19],
                    ["در حد این که گم نشم و بتونم خودمو معرفی کنم", 10],
                    ["فقط بلدم بگم I am from Iran و بعد سکوت کنم", 4],
                    ["حتی salam رو هم با فاجعه تلفظ می‌کنم", 0]
                ]
            },

            {
                q: "برای مهاجرت واقعاً چقدر پول داری؟ (بدون قرض و رویا)",
                a: [
                    ["پول تمیز و کافی دارم، خدا رو شکر", 18],
                    ["با فروختن نصف زندگیم و قرض از همه ممکنه جور بشه", 8],
                    ["فقط به اندازه یه بلیت یک‌طرفه با گریه", 3],
                    ["حتی برای تمدید پاسپورت هم باید بشینم گدایی کنم", 0]
                ]
            },

            {
                q: "مدرک و مهارت‌ت واقعاً به چه دردی می‌خوره؟",
                a: [
                    ["مدرک خوب + سابقه کار قابل دفاع دارم", 16],
                    ["مدرک دارم ولی هیچ‌کس خارج بهش پشیزی نمی‌ده", 7],
                    ["یه مدرک الکی دارم که خودمم روش حساب نمی‌کنم", 3],
                    ["نه مدرک درست دارم نه مهارت، فقط بلدم زنده بمونم", 0]
                ]
            },

            {
                q: "راستش رو بگو، چقدر دیگه طاقت موندن توی این وضعیت رو داری؟",
                a: [
                    ["به جایی رسیدم که دیگه چیزی برای از دست دادن ندارم", 14],
                    ["دارم از داخل می‌پاشم ولی هنوز یه ذره می‌جنگم", 8],
                    ["انقدر بی‌حس شدم که حتی انرژی ناامیدی هم ندارم", 3],
                    ["دیگه تموم شدم، فقط دارم تظاهر به زنده بودن می‌کنم", 0]
                ]
            },

            {
                q: "خانواده‌ت اگه بفهمن می‌خوای بری چه واکنشی نشون می‌دن؟",
                a: [
                    ["حمایت می‌کنن و حتی ممکنه کمک کنن", 12],
                    ["مخالفن ولی نمی‌تونن جلومو بگیرن", 6],
                    ["اگر برم دیگه اسمم رو هم نمی‌آرن", 2],
                    ["اصلاً جرأت ندارم به زبون بیارم، می‌ترسم بمیرن یا منو بکشن", 0]
                ]
            },

            {
                q: "شغلت الان چیه‌؟ (اون چیزی که باهاش خودتو گول می‌زنی)",
                a: [
                    ["یه کار درست‌حسابی دارم که خارج هم به درد می‌خوره", 13],
                    ["یه شغلم هست ولی فقط برای نمردن خوبه", 7],
                    ["بیکارم یا کارم انقدر بده که ترجیح می‌دم نگم", 2],
                    ["انقدر درگیر زنده موندنمم که شغل معنی نداره برام", 0]
                ]
            },

            {
                q: "چقدر به خودت دروغ می‌گی که «یه روزی می‌رم»؟",
                a: [
                    ["دیگه دروغ نمی‌گم، دارم واقعی کار می‌کنم براش", 15],
                    ["هر شب به خودم می‌گم ماه بعد شروع می‌کنم", 6],
                    ["سال‌هاست دارم این جمله رو تکرار می‌کنم", 2],
                    ["دیگه حتی به خودم هم نمی‌تونم این دروغ رو بگم", 0]
                ]
            },

            {
                q: "مشکل پاسپورت، سربازی یا هر چیزی که جلوتو گرفته چی؟",
                a: [
                    ["هیچ مشکلی ندارم، آماده‌ام که بزنم به چاک", 12],
                    ["یه سری دردسر دارم ولی با رنج و عذاب حل می‌شه", 6],
                    ["مشکل سربازی یا چیزای سنگین‌تر دارم", 1],
                    ["اصلاً پاسپورت ندارم یا نمی‌تونم درستش کنم", 0]
                ]
            },

            {
                q: "آخرین باری که واقعاً برای مهاجرت یه کار عملی کردی (نه حرف) کی بود؟",
                a: [
                    ["دارم فعالانه پیش می‌رم و کار می‌کنم", 16],
                    ["چند ماه پیش یه چیزی فرستادم و بعدش ول کردم", 5],
                    ["سال‌هاست فقط دارم در موردش حرف می‌زنم و رویاپردازی می‌کنم", 1],
                    ["هیچ‌وقت حتی یه ایمیل هم نفرستادم، فقط خیال‌بافی", 0]
                ]
            }

        ];


        const results = [
            {
                min: 0,
                max: 25,
                title: "🪦 محکوم به موندن",
                percent: () => Math.floor(Math.random() * 7) + 1,
                desc: "شانس فرار کردنت از این بدبختی تقریباً برابره با شانس اینکه فردا صبح بیدار شی و ببینی همه چی درست شده. یعنی در حد هیچ. بهتره با این واقعیت تلخ کنار بیای.",
                advice: "حداقل یاد بگیر توی همین جهنم یه گوشه کوچیک برای خودت پیدا کنی که کمتر زجر بکشی."
            },
            {
                min: 26,
                max: 45,
                title: "🌧️ امید واهی",
                percent: () => Math.floor(Math.random() * 11) + 8,
                desc: "یه ذره شانس داری، ولی بیشترش توهم و خودفریبیه. مگر اینکه معجزه‌ای از آسمون بیفته یا یکی از بیرون نجاتت بده.",
                advice: "یا از این به بعد جدی‌تر باش، یا همین حالا امیدت رو بکش تا کمتر اذیت شی."
            },
            {
                min: 46,
                max: 65,
                title: "⚔️ جنگنده خسته",
                percent: () => Math.floor(Math.random() * 14) + 21,
                desc: "شانست صفر نیست، ولی هنوز خیلی کار داری. اگه با همین انرژی نصفه و نیمه ادامه بدی، پنج سال دیگه هم داری همینجا همین حرف‌ها رو می‌زنی.",
                advice: "یا گازشو بگیر، یا قبول کن که شاید این قطار برای تو توقف نمی‌کنه."
            },
            {
                min: 66,
                max: 85,
                title: "🛫 در آستانه پرواز",
                percent: () => Math.floor(Math.random() * 16) + 47,
                desc: "واقعیت اینه که شانس بدی نداری. اگه همین حالا جدی بگیری، ممکنه تا دو سه سال دیگه از این چرخه خارج شی. البته اگه بازم امروز و فردا کنی، همه‌چیز می‌سوزه.",
                advice: "این یکی از آخرین فرصت‌های واقعیته. تلفش نکن."
            },
            {
                min: 86,
                max: 160,
                title: "🚀 فراری بالقوه",
                percent: () => Math.floor(Math.random() * 14) + 71,
                desc: "از نظر آماری شانس خیلی خوبی داری. فقط مواظب باش غرور، تنبلی یا دوباره درگیر شدن توی روزمرگی نابودت نکنه. خیلی‌ها دقیقاً تو همین نقطه بودن و باز هم موندن.",
                advice: "برو جلو. فقط وقتی رفتی یادت باشه اینجا چه جهنمی بود."
            }
        ];


        function renderQuestion() {

            const item = questions[index];
            const shuffled = shuffle(item.a);

            area.innerHTML = `

            <div class="progress-box">
                <p>✈️ مرحله ${index + 1} از ${questions.length}</p>
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

            const result = results.find(r => totalScore >= r.min && totalScore <= r.max);
            const chance = result.percent();

            area.innerHTML = `

            <div class="story-card">

                <h2>✈️ نتیجه فال مهاجرت</h2>

                <h1 style="margin: 14px 0 8px;">${result.title}</h1>

                <div class="big" style="font-size: 2.6rem; margin: 10px 0;">
                    ${chance}٪
                </div>

                <p style="opacity: 0.85; margin-bottom: 6px;">شانس فرار از بدبختی</p>

                <div class="bar" style="margin-bottom: 22px;">
                    <span style="width: ${chance}%"></span>
                </div>

                <p style="line-height: 1.75; margin-bottom: 18px; opacity: 0.95;">
                    ${result.desc}
                </p>

                <div style="background: rgba(255,255,255,0.07); padding: 14px; border-radius: 12px; margin: 18px 0; line-height: 1.6;">
                    💊 نسخه تلخ:<br>
                    <b>${result.advice}</b>
                </div>

                <button class="primary" id="restartMigration" style="margin-bottom: 10px;">
                    دوباره فال بگیر ✈️
                </button>

                <button class="secondary" id="shareMigration" style="width: 100%;">
                    کپی نتیجه برای دوستات 📋
                </button>

            </div>
            `;


            localStorage.setItem("badbakhtiMigration", JSON.stringify({
                score: totalScore,
                chance,
                title: result.title,
                date: new Date().toLocaleDateString("fa-IR")
            }));


            document.getElementById("restartMigration").onclick = () => {
                index = 0;
                totalScore = 0;
                renderQuestion();
            };


            document.getElementById("shareMigration").onclick = () => {
                const text = `✈️ نتیجه فال مهاجرت من:\n\n` +
                    `${result.title}\n` +
                    `شانس فرار از بدبختی: ${chance}٪\n\n` +
                    `${result.desc}\n\n` +
                    `جعبه ابزار بدبختی:\nhttps://amlakdot.github.io/Badbakhti_Tools/`;

                navigator.clipboard.writeText(text).then(() => {
                    const btn = document.getElementById("shareMigration");
                    btn.innerText = "کپی شد! ✅";
                    setTimeout(() => {
                        btn.innerText = "کپی نتیجه برای دوستات 📋";
                    }, 2000);
                });
            };
        }


        document.getElementById("startMigration").onclick = () => {
            area.style.opacity = "0";
            setTimeout(() => {
                area.style.opacity = "1";
                renderQuestion();
            }, 200);
        };

    }

};
