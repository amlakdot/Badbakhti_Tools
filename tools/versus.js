import {
    showResult,
    escapeHTML
} from "../js/app.js";


export default {

    id: "versus",

    icon: "⚔️",

    title: "کی بدبخت‌تره؟",

    description:
        "لینک رو برای یه دوست بفرست و ببین کدومتون واقعاً بدبخت‌ترید.",

    buttonText:
        "شروع رقابت ⚔️",


    html: `

        <div class="box">

            <h2>
                ⚔️ کی بدبخت‌تره؟
            </h2>

            <p class="desc">
                اسمت رو بنویس، صادقانه به ۲۰ تا سؤال جواب بده،
                بعد لینک رو بفرست برای یه دوست تا رقابت شکل بگیره.
            </p>

            <div id="versusArea">

                <button class="primary" id="startVersus">
                    شروع رقابت ⚔️
                </button>

            </div>

        </div>

    `,


    init() {

        const area = document.getElementById("versusArea");

        let index = 0;
        let personName = "";
        let totalScore = 0;
        let totalMax = 0;
        let opponent = null;


        /* =========================
           سؤالات
           هر سؤال: q, type (bool/number), placeholder (برای number),
           max (بیشترین امتیاز ممکن), score (تابع تبدیل جواب به امتیاز)
        ========================= */

        const questions = [

            {
                q: "تا حالا چند تا رابطه عاشقانه داشتی؟",
                type: "number",
                placeholder: "عدد",
                max: 4,
                score: v => v === 0 ? 3 : v <= 2 ? 0 : v <= 5 ? 2 : 4
            },
            {
                q: "موجودی کارتت الان چقدره؟ (تومان)",
                type: "number",
                placeholder: "مثلاً 500000",
                max: 5,
                score: v => v <= 0 ? 5 : v < 50000 ? 4 : v < 500000 ? 2 : v < 5000000 ? 1 : 0
            },
            {
                q: "تا حالا سیگار کشیدی؟",
                type: "bool",
                max: 3,
                score: v => v ? 3 : 0
            },
            {
                q: "تا حالا گل یا مواد کشیدی؟",
                type: "bool",
                max: 4,
                score: v => v ? 4 : 0
            },
            {
                q: "تا حالا مشروب خوردی؟",
                type: "bool",
                max: 2,
                score: v => v ? 2 : 0
            },
            {
                q: "تا حالا با آدمی که لیاقتش رو نداشت رابطه داشتی؟",
                type: "bool",
                max: 4,
                score: v => v ? 4 : 0
            },
            {
                q: "گوشیت الان چند درصد شارژ داره؟",
                type: "number",
                placeholder: "0 تا 100",
                max: 5,
                score: v => v <= 10 ? 5 : v <= 30 ? 3 : v <= 60 ? 1 : 0
            },
            {
                q: "تا حالا بدون خانواده‌ت سفر رفتی؟",
                type: "bool",
                max: 2,
                score: v => v ? 0 : 2
            },
            {
                q: "الان چند تا کار عقب‌افتاده روی سرته؟",
                type: "number",
                placeholder: "عدد",
                max: 5,
                score: v => Math.min(v, 5)
            },
            {
                q: "دیشب چند ساعت خوابیدی؟",
                type: "number",
                placeholder: "مثلاً 5",
                max: 5,
                score: v => v < 4 ? 5 : v < 6 ? 3 : v < 7 ? 1 : 0
            },
            {
                q: "امروز چند بار گفتی «از فردا شروع می‌کنم»؟",
                type: "number",
                placeholder: "عدد",
                max: 5,
                score: v => Math.min(v, 5)
            },
            {
                q: "تا حالا با کسی که هنوزم دوستش داری قطع رابطه کردی؟",
                type: "bool",
                max: 4,
                score: v => v ? 4 : 0
            },
            {
                q: "الان زیر بار قرضی؟",
                type: "bool",
                max: 4,
                score: v => v ? 4 : 0
            },
            {
                q: "چند ماه پیش آخرین بار مسافرت رفتی؟",
                type: "number",
                placeholder: "ماه",
                max: 5,
                score: v => v >= 12 ? 5 : v >= 6 ? 3 : v >= 2 ? 1 : 0
            },
            {
                q: "چند تا اپ دیتینگ رو گوشیت نصبه؟",
                type: "number",
                placeholder: "عدد",
                max: 4,
                score: v => Math.min(v, 4)
            },
            {
                q: "تا حالا شغلتو بدون داشتن شغل بعدی ول کردی؟",
                type: "bool",
                max: 3,
                score: v => v ? 3 : 0
            },
            {
                q: "امروز چند ساعت گوشی دستت بوده؟",
                type: "number",
                placeholder: "مثلاً 6",
                max: 5,
                score: v => v >= 10 ? 5 : v >= 6 ? 3 : v >= 3 ? 1 : 0
            },
            {
                q: "تا حالا جلوی یه غریبه گریه کردی؟",
                type: "bool",
                max: 3,
                score: v => v ? 3 : 0
            },
            {
                q: "الان چند نفر باهات قهرن؟",
                type: "number",
                placeholder: "عدد",
                max: 5,
                score: v => Math.min(v, 5)
            },
            {
                q: "تا حالا رفتی جلسه روان‌شناسی؟",
                type: "bool",
                max: 2,
                score: v => v ? 0 : 2
            }

        ];


        totalMax = questions.reduce((sum, item) => sum + item.max, 0);


        /* =========================
           رمزگذاری / رمزگشایی نتیجه در لینک
        ========================= */

        function encodeChallenge(data) {

            const json = JSON.stringify(data);

            return btoa(
                unescape(encodeURIComponent(json))
            );

        }


        function decodeChallenge(str) {

            try {

                const json = decodeURIComponent(
                    escape(atob(str))
                );

                return JSON.parse(json);

            } catch (e) {

                return null;

            }

        }


        function readOpponentFromURL() {

            const params = new URLSearchParams(location.search);
            const raw = params.get("vs");

            if (!raw) return null;

            return decodeChallenge(raw);

        }


        function buildChallengeLink(name, score) {

            const encoded = encodeChallenge({
                n: name,
                s: score
            });

            const url = new URL(location.href);
            url.searchParams.set("vs", encoded);

            return url.toString();

        }


        /* =========================
           مرحله‌ی اسم
        ========================= */

        function askName() {

            opponent = readOpponentFromURL();

            const opponentBanner = opponent
                ? `
                    <div style="background: rgba(255,255,255,0.07); padding: 14px; border-radius: 12px; margin-bottom: 20px; line-height: 1.8;">
                        ⚔️ <b>${escapeHTML(opponent.n)}</b> به چالشت دعوت کرده.
                        <br>
                        امتیاز بدبختیش: <b>${opponent.s}%</b>
                        <br>
                        حالا نوبت توئه که ببینیم کی واقعاً بدبخت‌تره.
                    </div>
                `
                : "";

            area.innerHTML = `
                ${opponentBanner}

                <div class="question" style="margin-bottom: 18px;">
                    اسمت چیه؟
                </div>

                <input
                    type="text"
                    id="versusNameInput"
                    placeholder="مثلاً: علی، سارا..."
                    style="width: 100%; padding: 12px; border-radius: 10px; border: none; margin-bottom: 16px; font-size: 1rem;"
                >

                <button class="primary" id="confirmVersusName">
                    شروع سؤال‌ها ⚔️
                </button>
            `;

            document.getElementById("confirmVersusName").onclick = () => {

                const input = document.getElementById("versusNameInput");
                personName = input.value.trim() || "بدبخت بی‌نام";

                index = 0;
                totalScore = 0;

                renderQuestion();

            };

        }


        /* =========================
           رندر سؤال
        ========================= */

        function renderQuestion() {

            const item = questions[index];

            const inputHTML = item.type === "bool"
                ? `
                    <div style="display: flex; gap: 10px; margin-top: 16px;">
                        <button class="secondary answer" data-value="true" style="flex: 1;">
                            بله
                        </button>
                        <button class="secondary answer" data-value="false" style="flex: 1;">
                            خیر
                        </button>
                    </div>
                `
                : `
                    <input
                        type="number"
                        id="versusNumberInput"
                        placeholder="${item.placeholder}"
                        style="width: 100%; padding: 12px; border-radius: 10px; border: none; margin-top: 16px; font-size: 1rem;"
                    >
                    <button class="primary answer" data-value="number" style="margin-top: 12px; width: 100%;">
                        بعدی
                    </button>
                `;

            area.innerHTML = `
                <div class="progress-box">
                    <p>⚔️ سؤال ${index + 1} از ${questions.length}</p>
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

                    let rawValue;

                    if (item.type === "bool") {

                        rawValue = btn.dataset.value === "true";

                    } else {

                        const numberInput = document.getElementById("versusNumberInput");
                        rawValue = Number(numberInput.value) || 0;

                    }

                    totalScore += item.score(rawValue);

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
                        }, 240);

                    }

                };

            });

        }


        /* =========================
           نتیجه‌ی نهایی
        ========================= */

        function getTier(score) {

            if (score <= 25) {

                return {
                    title: "🌱 نسبتاً آروم",
                    text: "زندگیت در مقایسه با بقیه بدبخت‌ها نسبتاً قابل‌تحمله. لذت ببر، زیاد طول نمی‌کشه."
                };

            } else if (score <= 50) {

                return {
                    title: "🙂 بدبختی متوسط",
                    text: "یه مقدار بدبختی داری، ولی هنوز از خط قرمز رد نشدی. عادیه، خیلیا همین حالن."
                };

            } else if (score <= 75) {

                return {
                    title: "💀 رسماً وارد فاز بدبختی شدی",
                    text: "چندتا از جواب‌هات نشون‌دهنده‌ی یه زندگی به‌هم‌ریخته‌ست. شاید وقتشه یه فکری به حالش کنی."
                };

            } else {

                return {
                    title: "☠️ بدبختی درجه یک",
                    text: "هر چی می‌خواستی بدونی از جواب‌هات معلومه. افتخار می‌کنیم بهت، رسماً قهرمان بدبختی این دوره‌ای."
                };

            }

        }


        /* =========================
           ساخت مدرک رسمی بدبختی (Canvas → PNG)
        ========================= */

        function fitFontSize(ctx, text, maxWidth, startSize, weight, family) {

            let size = startSize;
            ctx.font = `${weight} ${size}px ${family}`;

            while (ctx.measureText(text).width > maxWidth && size > 22) {
                size -= 2;
                ctx.font = `${weight} ${size}px ${family}`;
            }

            return size;

        }


        function drawStampCircle(ctx, cx, cy, radius) {

            ctx.save();

            ctx.strokeStyle = "#fbbf2499";
            ctx.lineWidth = 3;
            ctx.setLineDash([6, 6]);
            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.stroke();

            ctx.setLineDash([]);
            ctx.strokeStyle = "#fbbf24";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(cx, cy, radius - 10, 0, Math.PI * 2);
            ctx.stroke();

            ctx.fillStyle = "#fbbf24";
            ctx.textAlign = "center";
            ctx.font = "bold 22px Tahoma, Arial";
            ctx.fillText("مهر رسمی", cx, cy - 6);
            ctx.font = "18px Tahoma, Arial";
            ctx.fillText("اداره ملی بدبختی", cx, cy + 20);

            ctx.restore();

        }


        function drawSignature(ctx, x, y) {

            ctx.save();

            ctx.strokeStyle = "#e5e5f0";
            ctx.lineWidth = 2.5;
            ctx.lineCap = "round";

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.bezierCurveTo(x + 30, y - 25, x + 50, y + 20, x + 85, y - 10);
            ctx.bezierCurveTo(x + 110, y - 30, x + 130, y + 15, x + 165, y);
            ctx.bezierCurveTo(x + 185, y - 10, x + 195, y + 5, x + 215, y - 5);
            ctx.stroke();

            ctx.restore();

        }


        function buildCertificateCanvas({ name, score, tierTitle, opponentData, verdictType }) {

            const canvas = document.createElement("canvas");
            canvas.width = 1200;
            canvas.height = 850;

            const ctx = canvas.getContext("2d");
            const family = "Tahoma, Arial, sans-serif";

            ctx.direction = "rtl";

            /* پس‌زمینه */
            const bg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            bg.addColorStop(0, "#141018");
            bg.addColorStop(1, "#1c1424");
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            /* کادر تزئینی */
            ctx.strokeStyle = "#c4b5fd";
            ctx.lineWidth = 6;
            ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

            ctx.strokeStyle = "#c4b5fd66";
            ctx.lineWidth = 2;
            ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

            ctx.textAlign = "center";

            /* آرم و عنوان */
            ctx.font = "64px Tahoma, Arial";
            ctx.fillText("💀", canvas.width / 2, 155);

            ctx.fillStyle = "#f4f4f8";
            ctx.font = `bold 54px ${family}`;
            ctx.fillText("مدرک رسمی بدبختی", canvas.width / 2, 230);

            ctx.fillStyle = "#a78bfa";
            ctx.font = `26px ${family}`;
            ctx.fillText("صادره از اداره ملی بدبختی — واحد صدور مدارک", canvas.width / 2, 272);

            ctx.strokeStyle = "#ffffff22";
            ctx.beginPath();
            ctx.moveTo(150, 305);
            ctx.lineTo(canvas.width - 150, 305);
            ctx.stroke();

            /* متن اصلی */
            ctx.fillStyle = "#d8d8e4";
            ctx.font = `28px ${family}`;

            let cursorY = 370;

            if (verdictType === "solo") {

                ctx.fillText("بدین‌وسیله گواهی می‌شود که", canvas.width / 2, cursorY);
                cursorY += 75;

                const nameSize = fitFontSize(ctx, name, 900, 60, "bold", family);
                ctx.fillStyle = "#fbbf24";
                ctx.font = `bold ${nameSize}px ${family}`;
                ctx.fillText(name, canvas.width / 2, cursorY);
                cursorY += 70;

                ctx.fillStyle = "#d8d8e4";
                ctx.font = `28px ${family}`;
                ctx.fillText(`با کسب ${score}% امتیاز بدبختی،`, canvas.width / 2, cursorY);
                cursorY += 45;
                ctx.fillText(`در رده «${tierTitle}» طبقه‌بندی می‌گردد.`, canvas.width / 2, cursorY);

            } else {

                const winnerName = verdictType === "win" ? name : opponentData.n;
                const winnerScore = verdictType === "win" ? score : opponentData.s;
                const loserName = verdictType === "win" ? opponentData.n : name;
                const loserScore = verdictType === "win" ? opponentData.s : score;

                ctx.fillText("بدین‌وسیله گواهی می‌شود که در رقابت میان", canvas.width / 2, cursorY);
                cursorY += 55;

                const vsLine = `${name}  در مقابل  ${opponentData.n}`;
                const vsSize = fitFontSize(ctx, vsLine, 950, 36, "bold", family);
                ctx.fillStyle = "#e5e5f0";
                ctx.font = `bold ${vsSize}px ${family}`;
                ctx.fillText(vsLine, canvas.width / 2, cursorY);
                cursorY += 80;

                if (verdictType === "tie") {

                    ctx.fillStyle = "#d8d8e4";
                    ctx.font = `28px ${family}`;
                    ctx.fillText(`هر دو نفر با امتیاز مساوی (${score}%)`, canvas.width / 2, cursorY);
                    cursorY += 45;
                    ctx.fillText("بدبخت‌ترین‌های این دوره شناخته شدند.", canvas.width / 2, cursorY);

                } else {

                    const nameSize = fitFontSize(ctx, winnerName, 900, 52, "bold", family);
                    ctx.fillStyle = "#fbbf24";
                    ctx.font = `bold ${nameSize}px ${family}`;
                    ctx.fillText(winnerName, canvas.width / 2, cursorY);
                    cursorY += 62;

                    ctx.fillStyle = "#d8d8e4";
                    ctx.font = `28px ${family}`;
                    ctx.fillText(`با امتیاز ${winnerScore}% رسماً بدبخت‌تر شناخته شد.`, canvas.width / 2, cursorY);
                    cursorY += 45;

                    ctx.fillStyle = "#9a9aa8";
                    ctx.font = `22px ${family}`;
                    ctx.fillText(`(${loserName} با ${loserScore}% در رده دوم قرار گرفت)`, canvas.width / 2, cursorY);

                }

            }

            /* امضا */
            drawSignature(ctx, canvas.width / 2 - 110, 660);

            ctx.fillStyle = "#9a9aa8";
            ctx.font = `20px ${family}`;
            ctx.fillText("امضای رئیس اداره ملی بدبختی", canvas.width / 2, 690);

            /* مهر */
            drawStampCircle(ctx, canvas.width - 220, 740, 85);

            /* پایین: تاریخ و شماره پرونده */
            const issueDate = new Date().toLocaleDateString("fa-IR");
            const caseNumber = Math.floor(100000 + Math.random() * 899999);

            ctx.textAlign = "center";

            ctx.fillStyle = "#9a9aa8";
            ctx.font = `18px ${family}`;
            ctx.fillText("تاریخ صدور", 230, 725);

            ctx.fillStyle = "#e5e5f0";
            ctx.font = `bold 22px ${family}`;
            ctx.fillText(issueDate, 230, 755);

            ctx.fillStyle = "#9a9aa8";
            ctx.font = `18px ${family}`;
            ctx.fillText("شماره پرونده", 460, 725);

            ctx.fillStyle = "#e5e5f0";
            ctx.font = `bold 22px ${family}`;
            ctx.fillText(`#${caseNumber}`, 460, 755);

            return canvas;

        }


        function downloadCertificate(canvas, name) {

            canvas.toBlob(blob => {

                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");

                a.href = url;
                a.download = `مدرک-بدبختی-${name}.png`;
                a.click();

                URL.revokeObjectURL(url);

            });

        }


        function finish() {

            const score = Math.min(
                Math.round((totalScore / totalMax) * 100),
                100
            );

            const tier = getTier(score);

            const challengeLink = buildChallengeLink(personName, score);


            let comparisonHTML = "";
            let verdictType = "solo";

            if (opponent) {

                const iWin = score > opponent.s;
                const tie = score === opponent.s;

                verdictType = tie ? "tie" : iWin ? "win" : "lose";

                const verdict = tie
                    ? "🤝 مساوی شدید. هر دوتون به یه اندازه بدبختید."
                    : iWin
                    ? `🏆 ${escapeHTML(personName)} برنده‌ی این دوره‌ست. بدبخت‌تر بودن هم افتخاره.`
                    : `🏆 ${escapeHTML(opponent.n)} برنده‌ی این دوره‌ست.`;

                comparisonHTML = `
                    <div style="background: rgba(255,255,255,0.07); padding: 16px; border-radius: 12px; margin: 20px 0; line-height: 1.9;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <span><b>${escapeHTML(personName)}</b></span>
                            <span>${score}%</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 14px;">
                            <span><b>${escapeHTML(opponent.n)}</b></span>
                            <span>${opponent.s}%</span>
                        </div>
                        ${verdict}
                    </div>
                `;

            }


            area.innerHTML = `
                <div class="story-card">

                    <h2>⚔️ نتیجه</h2>

                    <h1 style="margin: 14px 0 10px; font-size: 1.5rem;">
                        ${tier.title}
                    </h1>

                    <div class="big" style="font-size: 2.6rem; margin: 10px 0;">
                        ${score}%
                    </div>

                    <div class="bar" style="margin-bottom: 20px;">
                        <span style="width: ${score}%"></span>
                    </div>

                    <p style="line-height: 1.8; margin-bottom: 18px;">
                        ${tier.text}
                    </p>

                    ${comparisonHTML}

                    <button class="primary" id="downloadCertificate" style="margin-bottom: 10px; width: 100%;">
                        🏆 دانلود مدرک رسمی بدبختی
                    </button>

                    <button class="secondary" id="copyVersusLink" style="margin-bottom: 10px; width: 100%;">
                        📋 کپی لینک چالش برای یه دوست
                    </button>

                    <button class="secondary" id="restartVersus" style="width: 100%;">
                        دوباره شروع کن ⚔️
                    </button>

                </div>
            `;


            localStorage.setItem("badbakhtiVersus", JSON.stringify({
                name: personName,
                score,
                date: new Date().toLocaleDateString("fa-IR")
            }));


            document.getElementById("downloadCertificate").onclick = () => {

                const canvas = buildCertificateCanvas({
                    name: personName,
                    score,
                    tierTitle: tier.title,
                    opponentData: opponent,
                    verdictType
                });

                downloadCertificate(canvas, personName);

            };


            document.getElementById("copyVersusLink").onclick = () => {

                const text =
                    `⚔️ ${personName} تو تست «کی بدبخت‌تره؟» امتیاز ${score}% گرفت.\n\n` +
                    `فکر می‌کنی بدبخت‌تر از این هستی؟ بزن ببینم:\n${challengeLink}`;

                navigator.clipboard.writeText(text).then(() => {

                    const btn = document.getElementById("copyVersusLink");
                    btn.innerText = "کپی شد! ✅";

                    setTimeout(() => {
                        btn.innerText = "📋 کپی لینک چالش برای یه دوست";
                    }, 2000);

                });

            };


            document.getElementById("restartVersus").onclick = () => {

                const url = new URL(location.href);
                url.searchParams.delete("vs");
                history.replaceState(null, "", url.toString());

                opponent = null;
                askName();

            };

        }


        document.getElementById("startVersus").onclick = () => {

            area.style.opacity = "0";

            setTimeout(() => {
                area.style.opacity = "1";
                askName();
            }, 200);

        };

    }

};
