import {
    showResult
} from "../js/app.js";


export default {

    id: "situationship",

    icon: "🕳️",

    title: "این situationshipه یا دارم خودمو گول می‌زنم؟",

    description:
    "در مورد اون آدمی که نه تیته نه بیته، تکلیفت رو یک‌بار برای همیشه روشن کن",

    buttonText:
    "تکلیفمو روشن کن 🕳️",



    html: `

    <div class="box">

        <h2>
            🕳️ این situationshipه یا دارم خودمو گول می‌زنم؟
        </h2>

        <p class="desc">
            اسم یا لقب طرف رو بنویس، 
            به سؤال‌ها جواب بده، 
            بعد بهت می‌گم داری خودتو گول می‌زنی یا نه.
        </p>

        <div id="situationshipArea">

            <button class="primary" id="startSituationship">
                تکلیفمو روشن کن 🕳️
            </button>

        </div>

    </div>

    `,



    init() {

        const area = document.getElementById("situationshipArea");

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
                q: "وقتی بهش پیام می‌دی معمولاً چقدر طول می‌کشه جواب بده؟",
                a: [
                    ["زود جواب می‌ده و خودش هم پیگیره", 0],
                    ["چند ساعتی طول می‌کشه ولی بالاخره جواب می‌ده", 5],
                    ["گاهی ساعت‌ها، گاهی روزها، هر وقت حالشو داشته باشه", 11],
                    ["انقدر دیر جواب می‌ده که من دیگه حس نذارم براش", 17]
                ]
            },

            {
                q: "آیا تا حالا پیش اومده که چند روز کامل غیبش بزنه و بعد مثل هیچی برگرده؟",
                a: [
                    ["نه، همیشه در دسترسه", 0],
                    ["گاهی شلوغه ولی خبر می‌ده", 4],
                    ["آره، غیب می‌شه و وقتی برمی‌گرده انگار هیچی نشده", 12],
                    ["این کارش شده، غیب می‌شه و منم مثل احمق منتظر می‌مونم", 18]
                ]
            },

            {
                q: "وقتی ازش در مورد «ما» یا آینده حرف می‌زنی، واکنشش چیه؟",
                a: [
                    ["روشن و مشخص حرف می‌زنه", 0],
                    ["یه کم طفره می‌ره ولی ناامیدم نمی‌کنه", 6],
                    ["موضوع رو عوض می‌کنه یا می‌گه فعلاً زوده", 13],
                    ["کامل در می‌ره یا منو مسخره می‌کنه که زیاد جدی گرفتم", 19]
                ]
            },

            {
                q: "حست نسبت بهش بیشتر شبیه کدومه؟",
                a: [
                    ["آروم و مطمئنم", 0],
                    ["دوستش دارم ولی گاهی شک می‌کنم", 5],
                    ["مدام دارم خودمو قانع می‌کنم که هنوز امید هست", 12],
                    ["مثل معتادم، می‌دونم بده ولی نمی‌تونم ولش کنم", 18]
                ]
            },

            {
                q: "آیا فقط وقتی حالش خوبه یا نیاز داره سراغت رو می‌گیره؟",
                a: [
                    ["نه، تو خوب و بد کنارمه", 0],
                    ["معمولاً هست ولی نه همیشه", 5],
                    ["بیشتر وقتا وقتی حوصله‌ش سر می‌ره یا تنهاست پیام می‌ده", 13],
                    ["فقط وقتی حال نداره یا کسی رو نداره یادش می‌افته منم وجود دارم", 19]
                ]
            },

            {
                q: "تا حالا پیش اومده که حس کنی داری نقش «گزینه رزرو» رو بازی می‌کنی؟",
                a: [
                    ["اصلاً چنین حسی ندارم", 0],
                    ["گاهی این فکرم می‌رسه ولی ردش می‌کنم", 6],
                    ["زیاد این حس رو دارم ولی خودمو گول می‌زنم", 13],
                    ["کاملاً مطمئنم گزینه دوم یا سومم", 19]
                ]
            },

            {
                q: "وقتی می‌بینی با بقیه چطور رفتار می‌کنه (استوری، لایک، توجه)، چه حسی بهت دست می‌ده؟",
                a: [
                    ["خیالم راحته", 0],
                    ["یه کم حسودیم می‌شه ولی کنترل می‌کنم", 5],
                    ["داخل می‌سوزم ولی چیزی نمی‌گم", 12],
                    ["دیوونه می‌شم و بعد خودمو سرزنش می‌کنم که چرا هنوز اینجام", 18]
                ]
            },

            {
                q: "اگه امروز کامل قطعش کنی، راستش رو بگو چه اتفاقی برات می‌افته؟",
                a: [
                    ["ناراحت می‌شم ولی زندگیم نمی‌پاشه", 0],
                    ["چند روزی حالم بده بعد عادت می‌کنم", 5],
                    ["احساس می‌کنم یه چیزی ازم گرفته می‌شه", 11],
                    ["مثل اینه که دارم مواد رو ترک می‌کنم", 17]
                ]
            },

            {
                q: "چند بار تا حالا به خودت گفتی «این بار دیگه آخرین باره» ولی برگشتی؟",
                a: [
                    ["هیچ‌وقت این حرف رو نزدم", 0],
                    ["یکی دو بار", 4],
                    ["چندین بار، دیگه خودمم خنده‌م می‌گیره", 12],
                    ["آنقدر گفتم که دیگه معنی خودش رو از دست داده", 18]
                ]
            },

            {
                q: "اگه یکی از دوستات دقیقاً تو موقعیت تو بود، بهش چی می‌گفتی؟",
                a: [
                    ["ادامه بده، امید هست", 0],
                    ["مراقب باش، یه کم مشکوکه", 5],
                    ["داره پلی‌ت می‌کنه، فاصله بگیر", 13],
                    ["بیدار شو، داری به خودت توهین می‌کنی", 19]
                ]
            }

        ];


        function askName() {
            area.innerHTML = `
                <div class="question" style="margin-bottom: 18px;">
                    اسم یا لقب اون کسی که نه تیته نه بیته چیه؟
                </div>

                <input 
                    type="text" 
                    id="personNameInput" 
                    placeholder="مثلاً: اون، همون، علی، سمیه، اکس‌قبلی..." 
                    style="width: 100%; padding: 12px; border-radius: 10px; border: none; margin-bottom: 16px; font-size: 1rem;"
                />

                <button class="primary" id="confirmName">
                    بریم سراغ سؤال‌ها 🕳️
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
                    <p>🕳️ مرحله ${index + 1} از ${questions.length}</p>
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
            let verdict = "";
            let longText = "";

            if (totalScore <= 40) {
                title = "🌱 فعلاً امید هست";
                verdict = "هنوز situationship کامل نیست";
                longText = `از جواب‌هات این‌طور برمیاد که ${personName} هنوز به مرحله‌ی «داره پلی‌ت می‌کنه» نرسیده. ممکنه یه سری سردرگمی وجود داشته باشه، ولی فعلاً داری بیش از حد Negativity پخش می‌کنی. یه کم صبور باش و ببین رفتارش پایدار می‌مونه یا نه.`;
            } 
            else if (totalScore <= 75) {
                title = "⚠️ داره مشکوک می‌شه";
                verdict = "داری وارد فاز خودگول‌زنی می‌شی";
                longText = `${personName} داره کم‌کم می‌ره تو فاز situationship کلاسیک. گاهی هست، گاهی نیست، حرف جدی نمی‌زنه و تو داری با باقی‌مانده‌ی امیدت زنده‌اش نگه می‌داری. اگه همین‌طور ادامه پیدا کنه، تا چند وقت دیگه خودت هم دیگه باور نمی‌کنی که داری به خودت دروغ می‌گی.`;
            } 
            else if (totalScore <= 120) {
                title = "🕳️ situationship تأیید شد";
                verdict = "داری با تمام قوا خودتو گول می‌زنی";
                longText = `ببین، ${personName} داره باهات بازی می‌کنه (خواسته یا ناخواسته). نه کامل می‌گیرت، نه ول می‌کنه. تو هم هر بار که می‌خوای قطع کنی، یه پیام یا یه توجه کوچیک می‌اد و دوباره می‌کشدت تو. این دقیقاً تعریف situationshipه. هر چی بیشتر بمونی، جدا شدنش سخت‌تر و تحقیرش عمیق‌تر می‌شه.`;
            } 
            else {
                title = "☠️ بیدار شو";
                verdict = "دیگه خودگول‌زنی نیست، خودآزاریه";
                longText = `${personName} مدتهاست که تکلیفش با تو روشنه، فقط تو نمی‌خوای ببینی. غیب شدن‌ها، جواب دیر دادن‌ها، طفره رفتن از حرف جدی، و این که فقط وقتی حالشو داره سراغت رو می‌گیره، همه داره فریاد می‌زنه که تو گزینه اصلی نیستی. ادامه دادن از این نقطه به بعد دیگه اسمش امید نیست، اسمش خودآزاریه. قطع کن، بلاک کن، هر کاری می‌کنی فقط دیگه به این چرخه برنگرد.`;
            }


            area.innerHTML = `
                <div class="story-card">

                    <h2>🕳️ نتیجه نهایی</h2>

                    <h1 style="margin: 14px 0 10px; font-size: 1.45rem;">
                        ${title}
                    </h1>

                    <div style="background: rgba(255,255,255,0.07); padding: 16px; border-radius: 12px; margin: 18px 0; line-height: 1.85; font-size: 1.05rem;">
                        <b>در مورد ${personName}:</b><br><br>
                        ${verdict}.
                        <br><br>
                        ${longText}
                    </div>

                    <button class="primary" id="restartSituationship" style="margin-bottom: 10px;">
                        برای یه نفر دیگه تکلیف روشن کن 🕳️
                    </button>

                    <button class="secondary" id="shareSituationship" style="width: 100%;">
                        کپی نتیجه 📋
                    </button>

                </div>
            `;


            localStorage.setItem("badbakhtiSituationship", JSON.stringify({
                name: personName,
                score: totalScore,
                title,
                date: new Date().toLocaleDateString("fa-IR")
            }));


            document.getElementById("restartSituationship").onclick = () => {
                index = 0;
                totalScore = 0;
                personName = "";
                askName();
            };


            document.getElementById("shareSituationship").onclick = () => {
                const text = `🕳️ نتیجه تست situationship\n\n` +
                    `در مورد: ${personName}\n` +
                    `${title}\n\n` +
                    `${verdict}\n\n` +
                    `${longText}\n\n` +
                    `جعبه ابزار بدبختی:\nhttps://xixtelegram.github.io/Badbakhti_Tools/`;

                navigator.clipboard.writeText(text).then(() => {
                    const btn = document.getElementById("shareSituationship");
                    btn.innerText = "کپی شد! ✅";
                    setTimeout(() => {
                        btn.innerText = "کپی نتیجه 📋";
                    }, 2000);
                });
            };
        }


        document.getElementById("startSituationship").onclick = () => {
            area.style.opacity = "0";
            setTimeout(() => {
                area.style.opacity = "1";
                askName();
            }, 200);
        };

    }

};
