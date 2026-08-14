import {
    showResult
} from "../js/app.js";


const TELEGRAM_HANDLE = "@XIXStrawberry";
const TELEGRAM_URL = "https://t.me/XIXStrawberry";


function toPersianDigits(num) {

    return Number(num || 0).toLocaleString("fa-IR");

}


function readFileAsDataURL(file) {

    return new Promise((resolve, reject) => {

        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);

    });

}


function loadImage(src) {

    return new Promise((resolve, reject) => {

        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;

    });

}


function getMiseryLevel(score) {

    if (score <= 25) {

        return {
            level: "سطح یک",
            title: "بدبختی مبتدی",
            note: "هنوز تازه‌کاری، ولی مسیر درستی رو شروع کردی."
        };

    } else if (score <= 50) {

        return {
            level: "سطح دو",
            title: "بدبختی متوسط",
            note: "رسماً وارد مسیر شدی. برگشتی در کار نیست."
        };

    } else if (score <= 75) {

        return {
            level: "سطح سه",
            title: "بدبختی حرفه‌ای",
            note: "این سطح از بدبختی نیاز به سال‌ها تمرین داره. تبریک."
        };

    } else {

        return {
            level: "سطح چهار",
            title: "بدبختی افتخاری",
            note: "بالاترین درجه‌ی ممکن. اسمت رسماً تو تاریخ ثبت شد."
        };

    }

}


function fitFontSize(ctx, text, maxWidth, startSize, weight, family) {

    let size = startSize;
    ctx.font = `${weight} ${size}px ${family}`;

    while (ctx.measureText(text).width > maxWidth && size > 16) {
        size -= 2;
        ctx.font = `${weight} ${size}px ${family}`;
    }

    return size;

}


function drawGuilloche(ctx, width, height) {

    ctx.save();
    ctx.globalAlpha = 0.06;
    ctx.strokeStyle = "#c4b5fd";
    ctx.lineWidth = 1;

    for (let i = 0; i < 26; i++) {

        ctx.beginPath();

        const amplitude = 40 + (i % 5) * 12;
        const frequency = 0.008 + (i % 4) * 0.002;
        const yOffset = (height / 26) * i;

        for (let x = 0; x <= width; x += 4) {

            const y = yOffset + Math.sin(x * frequency + i) * amplitude;

            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);

        }

        ctx.stroke();

    }

    ctx.restore();

}


function drawSealCircle(ctx, cx, cy, radius) {

    ctx.save();

    if (ctx.createConicGradient) {

        const grad = ctx.createConicGradient(0, cx, cy);
        grad.addColorStop(0, "#fbbf24");
        grad.addColorStop(0.33, "#c4b5fd");
        grad.addColorStop(0.66, "#f472b6");
        grad.addColorStop(1, "#fbbf24");
        ctx.strokeStyle = grad;

    } else {

        ctx.strokeStyle = "#fbbf24";

    }

    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = "#fbbf2499";
    ctx.setLineDash([3, 5]);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, radius - 12, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = "#fbbf24";
    ctx.textAlign = "center";
    ctx.font = "bold 20px Tahoma, Arial";
    ctx.fillText("مهر رسمی", cx, cy - 8);
    ctx.font = "16px Tahoma, Arial";
    ctx.fillText("تأیید شده", cx, cy + 16);

    ctx.restore();

}


function drawSignature(ctx, x, y) {

    ctx.save();
    ctx.strokeStyle = "#e5e5f0";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x + 25, y - 22, x + 45, y + 18, x + 75, y - 8);
    ctx.bezierCurveTo(x + 100, y - 26, x + 118, y + 14, x + 150, y - 2);
    ctx.stroke();

    ctx.restore();

}


function drawFakeQR(ctx, x, y, size) {

    ctx.save();

    ctx.fillStyle = "#f4f4f8";
    ctx.fillRect(x, y, size, size);

    const cells = 9;
    const cellSize = size / cells;

    ctx.fillStyle = "#141018";

    for (let row = 0; row < cells; row++) {

        for (let col = 0; col < cells; col++) {

            const isFinderZone =
                (row < 3 && col < 3) ||
                (row < 3 && col > cells - 4) ||
                (row > cells - 4 && col < 3);

            if (isFinderZone) continue;

            if (Math.random() > 0.55) {
                ctx.fillRect(x + col * cellSize, y + row * cellSize, cellSize, cellSize);
            }

        }

    }

    function finder(fx, fy) {

        ctx.fillStyle = "#141018";
        ctx.fillRect(fx, fy, cellSize * 3, cellSize * 3);
        ctx.fillStyle = "#f4f4f8";
        ctx.fillRect(fx + cellSize * 0.6, fy + cellSize * 0.6, cellSize * 1.8, cellSize * 1.8);
        ctx.fillStyle = "#141018";
        ctx.fillRect(fx + cellSize * 1.1, fy + cellSize * 1.1, cellSize * 0.8, cellSize * 0.8);

    }

    finder(x, y);
    finder(x + cellSize * (cells - 3), y);
    finder(x, y + cellSize * (cells - 3));

    ctx.restore();

}


function drawPhotoBox(ctx, img, x, y, w, h) {

    ctx.save();

    ctx.strokeStyle = "#fbbf24";
    ctx.lineWidth = 4;
    ctx.strokeRect(x - 8, y - 8, w + 16, h + 16);

    ctx.strokeStyle = "#fbbf2455";
    ctx.lineWidth = 1;
    ctx.strokeRect(x - 14, y - 14, w + 28, h + 28);

    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.clip();

    const imgRatio = img.width / img.height;
    const boxRatio = w / h;

    let drawW, drawH, dx, dy;

    if (imgRatio > boxRatio) {
        drawH = h;
        drawW = h * imgRatio;
        dx = x - (drawW - w) / 2;
        dy = y;
    } else {
        drawW = w;
        drawH = w / imgRatio;
        dx = x;
        dy = y - (drawH - h) / 2;
    }

    ctx.drawImage(img, dx, dy, drawW, drawH);

    ctx.restore();

}


export default {

    id: "certificate",

    icon: "🏅",

    title: "مدرک معتبر بدبختی🏅",

    description:
        "عکس، اسم و سنت رو بده تا مدرک رسمی بدبختیت صادر بشه.",

    buttonText:
        "🏅دریافت مدرک ",


    html: `

        <div class="box">

            <h2>
                 مدرک معتبر بدبختی
            </h2>

            <p class="desc">
                این مدرک رسماً بدبختیت رو تأیید می‌کنه.
                عکس، اسم و سنت رو وارد کن.
                درصد بدبختی به‌صورت خودکار از آزمون «کی بدبخت‌تره؟» دریافت می‌شه.
            </p>

            <div id="certificateArea">

                <div class="question">
                    عکس مدرک
                </div>

                <input type="file" id="certPhoto" accept="image/*">

                <div class="question">
                    اسم یا لقبت
                </div>

                <input type="text" id="certName" placeholder="مثلاً: علی">

                <div class="question">
                    سنت
                </div>

                <input type="number" id="certAge" min="1" max="120" placeholder="مثلاً 25">

                <div id="certScoreContainer">
                    <div class="question">
                        درصد بدبختی
                    </div>
                    <div id="certScoreDisplay" style="font-size:20px; font-weight:bold; color:var(--gold);"></div>
                    <p id="certScoreHint" style="color:var(--muted); font-size:13px; margin-top:6px;"></p>
                </div>

                <button class="primary" id="certGenerateBtn" style="margin-top:16px;">
                    صدور مدرک 🏅
                </button>

            </div>

            <div id="certificateResult" class="result"></div>

        </div>

    `,


    init() {

        const scoreDisplay = document.getElementById("certScoreDisplay");
        const hint = document.getElementById("certScoreHint");
        let savedScore = null;
        let hasVersusTest = false;

        try {

            const saved = JSON.parse(localStorage.getItem("badbakhtiVersus"));

            if (saved && typeof saved.score === "number") {

                savedScore = saved.score;
                hasVersusTest = true;
                scoreDisplay.innerText = `${savedScore}%`;
                hint.innerText = `✅ این درصد از آزمون «کی بدبخت‌تره؟» در تاریخ ${saved.date} ثبت شده است.`;
                hint.style.color = "var(--gold)";

            } else {

                scoreDisplay.innerText = "❌ ثبت نشده";
                hint.innerText = "❗ برای دریافت مدرک، ابتدا باید در آزمون «کی بدبخت‌تره؟» شرکت کنی.";
                hint.style.color = "var(--danger)";

            }

        } catch (e) {

            scoreDisplay.innerText = "❌ ثبت نشده";
            hint.innerText = "❗ برای دریافت مدرک، ابتدا باید در آزمون «کی بدبخت‌تره؟» شرکت کنی.";
            hint.style.color = "var(--danger)";

        }


        function buildCertificateCanvas({ img, name, age, score }) {

            const width = 1400;
            const height = 950;

            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext("2d");
            const family = "Tahoma, Arial, sans-serif";

            ctx.direction = "rtl";

            // پس‌زمینه گرادینت تیره
            const bg = ctx.createLinearGradient(0, 0, width, height);
            bg.addColorStop(0, "#0d0a12");
            bg.addColorStop(0.5, "#181020");
            bg.addColorStop(1, "#0d0a12");
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, width, height);

            // الگوی گیلوش (خطوط منحنی)
            drawGuilloche(ctx, width, height);

            // کادر اصلی طلایی
            ctx.strokeStyle = "#fbbf24";
            ctx.lineWidth = 6;
            ctx.strokeRect(28, 28, width - 56, height - 56);

            // کادر داخلی بنفش
            ctx.strokeStyle = "#c4b5fd66";
            ctx.lineWidth = 2;
            ctx.strokeRect(46, 46, width - 92, height - 92);

            // کادر سوم طلایی نازک
            ctx.strokeStyle = "#fbbf2433";
            ctx.lineWidth = 1;
            ctx.strokeRect(64, 64, width - 128, height - 128);

            // عنوان اصلی
            ctx.textAlign = "center";
            ctx.fillStyle = "#fbbf24";
            ctx.font = `bold 52px ${family}`;
            ctx.fillText("مدرک رسمی بدبختی", width / 2, 120);

            ctx.fillStyle = "#c4b5fd";
            ctx.font = `24px ${family}`;
            ctx.fillText("اداره ملی بدبختی — واحد صدور مدارک معتبر", width / 2, 162);

            ctx.fillStyle = "#6b6b78";
            ctx.font = `16px ${family}`;
            ctx.fillText("معتبر در ۱۹۵ کشور جهان و کهکشان راه شیری", width / 2, 190);

            // خط جداکننده
            ctx.strokeStyle = "#fbbf2433";
            ctx.beginPath();
            ctx.moveTo(80, 215);
            ctx.lineTo(width - 80, 215);
            ctx.stroke();

            // ===== بخش عکس =====
            const photoX = width - 380;
            const photoY = 250;
            const photoW = 300;
            const photoH = 380;

            drawPhotoBox(ctx, img, photoX, photoY, photoW, photoH);

            ctx.fillStyle = "#9a9aa8";
            ctx.font = `18px ${family}`;
            ctx.textAlign = "center";
            ctx.fillText("عکس دارنده مدرک", photoX + photoW / 2, photoY + photoH + 40);

            // ===== اطلاعات سمت چپ =====
            const infoRight = photoX - 60;
            const infoLeft = 90;

            ctx.textAlign = "right";
            ctx.fillStyle = "#d8d8e4";
            ctx.font = `26px ${family}`;
            ctx.fillText("این مدرک تأیید می‌کند که", infoRight, 265);

            // نام
            const nameSize = fitFontSize(ctx, name, infoRight - infoLeft, 54, "bold", family);
            ctx.fillStyle = "#fbbf24";
            ctx.font = `bold ${nameSize}px ${family}`;
            ctx.fillText(name, infoRight, 340);

            // سن
            ctx.fillStyle = "#d8d8e4";
            ctx.font = `26px ${family}`;
            ctx.fillText(`با سن ${toPersianDigits(age)} سال،`, infoRight, 385);

            ctx.fillText("رسماً در آزمون سنجش بدبختی شرکت کرده", infoRight, 420);
            ctx.fillText("و نتیجه زیر برایش صادر شده است:", infoRight, 455);

            // درصد
            ctx.fillStyle = "#fbbf24";
            ctx.font = `bold 60px ${family}`;
            ctx.fillText(`${toPersianDigits(score)}%`, infoRight, 540);

            // نوار پیشرفت
            const barWidth = infoRight - infoLeft;
            const barX = infoLeft;
            const barY = 565;

            ctx.fillStyle = "#ffffff15";
            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(barX, barY, barWidth, 16, 8);
            else ctx.rect(barX, barY, barWidth, 16);
            ctx.fill();

            ctx.fillStyle = "#fbbf24";
            const filledWidth = (barWidth * score) / 100;
            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(barX + barWidth - filledWidth, barY, filledWidth, 16, 8);
            else ctx.rect(barX + barWidth - filledWidth, barY, filledWidth, 16);
            ctx.fill();

            // سطح بدبختی
            const misery = getMiseryLevel(score);

            ctx.fillStyle = "#e5e5f0";
            ctx.font = `bold 26px ${family}`;
            ctx.fillText(`${misery.level} — ${misery.title}`, infoRight, 615);

            ctx.fillStyle = "#9a9aa8";
            const noteSize = fitFontSize(ctx, misery.note, barWidth, 20, "normal", family);
            ctx.font = `${noteSize}px ${family}`;
            ctx.fillText(misery.note, infoRight, 648);

            ctx.fillStyle = "#6b6b78";
            ctx.font = `16px ${family}`;
            ctx.fillText("تاریخ انقضا: هرگز (بدبختی مادام‌العمره است)", infoRight, 680);

            // خط جداکننده پایین
            ctx.strokeStyle = "#fbbf2433";
            ctx.beginPath();
            ctx.moveTo(80, 700);
            ctx.lineTo(width - 80, 700);
            ctx.stroke();

            // ===== بخش پایین مدرک =====
            const issueDate = new Date().toLocaleDateString("fa-IR");
            const caseNumber = Math.floor(100000 + Math.random() * 899999);

            // QR Code
            drawFakeQR(ctx, 90, 710, 80);
            ctx.textAlign = "center";
            ctx.fillStyle = "#9a9aa8";
            ctx.font = `16px ${family}`;
            ctx.fillText("اسکن برای تأیید اعتبار", 130, 815);

            // امضا
            drawSignature(ctx, 330, 755);
            ctx.fillStyle = "#9a9aa8";
            ctx.font = `16px ${family}`;
            ctx.fillText("امضای رئیس اداره ملی بدبختی", 400, 810);

            // مهر رسمی
            drawSealCircle(ctx, 630, 770, 70);

            // تاریخ و شماره
            ctx.textAlign = "right";
            ctx.fillStyle = "#9a9aa8";
            ctx.font = `18px ${family}`;
            ctx.fillText("تاریخ صدور", width - 320, 730);
            ctx.fillStyle = "#fbbf24";
            ctx.font = `bold 22px ${family}`;
            ctx.fillText(issueDate, width - 320, 760);

            ctx.fillStyle = "#9a9aa8";
            ctx.font = `18px ${family}`;
            ctx.fillText("شماره مدرک", width - 90, 730);
            ctx.fillStyle = "#fbbf24";
            ctx.font = `bold 22px ${family}`;
            ctx.fillText(`#${caseNumber}`, width - 90, 760);

            // متن تأیید نهایی
            ctx.textAlign = "center";
            ctx.fillStyle = "#c4b5fd";
            ctx.font = `bold 22px ${family}`;
            ctx.fillText("✅ این مدرک معتبر است و دارنده آن رسماً در بدبختی تأیید شده است", width / 2, 835);

            // هشدار تلگرام
            ctx.fillStyle = "#fbbf24";
            ctx.font = `bold 24px ${family}`;
            ctx.fillText(`📣 صادر شده در تلگرام: ${TELEGRAM_HANDLE}`, width / 2, 870);

            return canvas;

        }


        document.getElementById("certGenerateBtn").onclick = async () => {

            const photoInput = document.getElementById("certPhoto");
            const name = document.getElementById("certName").value.trim();
            const age = Number(document.getElementById("certAge").value) || 0;

            const result = document.getElementById("certificateResult");

            // ===== بررسی وجود آزمون =====
            if (!hasVersusTest || savedScore === null) {

                alert("❗ ابتدا باید در آزمون «کی بدبخت‌تره؟» شرکت کنی تا درصد بدبختی‌ات ثبت شود.");
                return;

            }

            if (!photoInput.files[0]) {
                alert("یه عکس انتخاب کن بدبخت.");
                return;
            }

            if (!name) {
                alert("اسمت رو بنویس.");
                return;
            }

            if (!age || age < 1) {
                alert("سنت رو وارد کن.");
                return;
            }

            result.classList.add("show");
            result.innerHTML = `
                <div class="big">در حال صدور مدرک...</div>
                <p>اداره ملی بدبختی داره پرونده‌ت رو بررسی می‌کنه. 💀</p>
            `;

            try {

                const dataUrl = await readFileAsDataURL(photoInput.files[0]);
                const img = await loadImage(dataUrl);

                const canvas = buildCertificateCanvas({ img, name, age, score: savedScore });
                const pngUrl = canvas.toDataURL("image/png");

                result.innerHTML = `

                    <img src="${pngUrl}" style="width:100%; border-radius:14px; margin-bottom:16px;">

                    <button class="primary" id="certDownloadBtn" style="width:100%; margin-bottom:10px;">
                        📥 دانلود مدرک
                    </button>

                    <a
                        href="${TELEGRAM_URL}"
                        target="_blank"
                        class="secondary"
                        style="display:block; text-align:center; text-decoration:none; padding:12px; border-radius:10px;"
                    >
                        📣 عضویت در کانال تلگرام
                    </a>

                `;

                document.getElementById("certDownloadBtn").onclick = () => {

                    const a = document.createElement("a");
                    a.href = pngUrl;
                    a.download = `مدرک-بدبختی-${name}.png`;
                    a.click();

                };

            } catch (e) {

                result.innerHTML = `
                    <div class="big">❌</div>
                    <p>یه مشکلی پیش اومد، دوباره امتحان کن (شاید فایل عکس مشکل داشت).</p>
                `;

            }

        };

    }

};
