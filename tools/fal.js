import {
    showResult
} from "../js/app.js";


export default {

    id:"fal",

    icon:"🔮",

    title:"فال بدبختی",

    description:
        "ببین امروز قراره چه بدبختی‌ای سرت بیاد.",

    buttonText:
        "فال امروز من 🔮",


    html:`

        <div
            class="fortune-container"
            id="fortuneBox"
        >

            <div
                style="
                    font-size:55px;
                    margin-bottom:10px;
                "
            >
                🔮
            </div>


            <h2>
                🔮 فال بدبختی
            </h2>


            <p class="desc">
                آینده‌ات رو نمی‌دونیم؛
                ولی می‌تونیم با اطمینان
                یه چیز بد ازش حدس بزنیم. 😂
            </p>


            <button
                class="primary"
                id="fortuneBtn"
            >
                فال امروز من 🔮
            </button>


            <div
                id="fortuneResult"
                class="result"
            ></div>

        </div>

    `,


    init(){

        const button =
            document.getElementById(
                "fortuneBtn"
            );


        button.onclick = () => {

            generateFortune();

        };

    }

};


/* =========================
   FORTUNE GENERATOR
========================= */


function generateFortune(){

    const result =
        document.getElementById(
            "fortuneResult"
        );


    /*
     * شروع انیمیشن
     */

    result.classList.remove(
        "show"
    );


    result.innerHTML = `

        <div
            style="
                font-size:42px;
                margin:10px 0;
                animation:float 1s infinite;
            "
        >
            🔮
        </div>

        <div class="big">
            در حال بررسی آینده...
        </div>

        <p>
            لطفاً چند لحظه صبر کن.
            بدبختی در حال محاسبه است. 💀
        </p>

    `;


    result.classList.add(
        "show"
    );


    /*
     * کمی تأخیر برای حس فال واقعی
     */

    setTimeout(() => {

        showActualFortune();

    }, 900);

}


/* =========================
   RANDOM
========================= */


function randomItem(array){

    return array[
        Math.floor(
            Math.random() *
            array.length
        )
    ];

}


/* =========================
   FORTUNE DATA
========================= */


const financial = [

    "امروز چیزی می‌خری که اصلاً لازم نداشتی.",

    "امروز پولی خرج می‌کنی و بعداً می‌گی: «واقعاً چرا؟»",

    "یک هزینه غیرمنتظره در راه است. احتمالاً دقیقاً وقتی که پول نداری.",

    "امروز موجودی حسابت را چک نکن؛ برای سلامت روانت بهتر است.",

    "چیزی را با تخفیف می‌خری که بدون تخفیف هم نباید می‌خریدی.",

    "امروز یک خرج کوچک تبدیل به یک خرج خیلی بزرگ خواهد شد.",

    "پول به دستت می‌رسد؛ ولی ظاهراً قرار نیست مدت زیادی پیشت بماند.",

    "امروز جمله «فقط همین یکی رو می‌خرم» برایت گران تمام می‌شود.",

    "یک خرید اینترنتی در کمین توست.",

    "امروز به پولت نگاه می‌کنی و پول هم به تو نگاه می‌کند؛ هر دو ناامید می‌شوید."

];


const relationships = [

    "پیامی دریافت خواهی کرد که ترجیح می‌دادی دریافت نکنی.",

    "کسی که نباید، امروز یادت می‌افتد.",

    "یک نفر آنلاین می‌شود و تو دقیقاً می‌فهمی چه کسی است.",

    "امروز احتمال دارد یک پیام را ده بار بنویسی و پاک کنی.",

    "کسی جواب تو را دیر می‌دهد؛ خیلی دیر.",

    "یک «سلام» ساده ممکن است امروز زندگی احساسی‌ات را پیچیده‌تر کند.",

    "امروز کسی استوری می‌گذارد که نباید ببینی.",

    "یک گفت‌وگوی معمولی ممکن است تبدیل به تحلیل سه‌ساعته مغزت شود.",

    "امروز بهتر است پیام قدیمی‌ها را دوباره نخوانی.",

    "کسی به تو فکر می‌کند؛ متأسفانه احتمالاً نه آن کسی که تو می‌خواهی."

];


const work = [

    "یک نفر خواهد گفت: «فقط ۵ دقیقه وقتت رو می‌گیرم.»",

    "امروز کاری به تو سپرده می‌شود که هیچ‌کس نمی‌داند چرا اصلاً وجود دارد.",

    "یک کار فوری دقیقاً زمانی پیدا می‌شود که می‌خواهی استراحت کنی.",

    "امروز یک نفر اشتباه خودش را به شکلی بسیار حرفه‌ای گردن تو می‌اندازد.",

    "جلسه‌ای در پیش داری که می‌توانست یک پیام باشد.",

    "امروز عبارت «یه تغییر کوچیک» را خواهی شنید.",

    "کاری که فکر می‌کردی ۱۰ دقیقه طول می‌کشد، حداقل یک ساعت زمان می‌برد.",

    "امروز یک فایل با نام FINAL_v2_REAL_FINAL برایت ارسال خواهد شد.",

    "یک نفر خواهد گفت: «این که کاری نداره.» و سپس بدبختی آغاز می‌شود.",

    "امروز احتمالاً کاری را انجام می‌دهی که اصلاً جزو وظایفت نیست."

];


const mental = [

    "از ساعت ۲ بعدازظهر به بعد، سیستم عامل شما پاسخگو نخواهد بود.",

    "امروز مغزت حداقل سه بار درخواست Restart خواهد داد.",

    "احتمال دارد یک اتفاق کوچک را تا شب بیش از حد تحلیل کنی.",

    "امروز انرژی اجتماعی تو قبل از باتری گوشی تمام می‌شود.",

    "یک فکر قدیمی تصمیم می‌گیرد دوباره برگردد.",

    "امروز حوصله هیچ‌کس را نداری؛ حتی خودت را.",

    "مغزت امروز در حالت Battery Saver اجرا خواهد شد.",

    "ممکن است یک جمله ساده را تا سه روز آینده تحلیل کنی.",

    "امروز به استراحت نیاز داری ولی احتمالاً به جایش اسکرول می‌کنی.",

    "سیستم عصبی شما اعلام کرده که امروز شیفت اضافه ندارد."

];


const finalPredictions = [

    "امروز روز خوبی برای تصمیم‌های مهم نیست.",

    "امروز هیچ تصمیم بزرگی نگیر؛ حتی تصمیم برای اینکه چه غذایی بخوری.",

    "بهتر است امروز فقط زنده بمانی و فردا درباره زندگی تصمیم بگیری.",

    "امروز با احتیاط جلو برو؛ جهان ظاهراً برنامه‌هایی برایت دارد.",

    "اگر امروز چیزی خراب شد، تعجب نکن. فال گفته بود.",

    "امروز روزی است که بهتر است کمتر سؤال بپرسی و بیشتر خودت را نجات بدهی.",

    "به اولین حس خودت اعتماد نکن؛ به دومین حس هم خیلی اعتماد نکن.",

    "امروز احتمالاً اتفاق خاصی نمی‌افتد؛ که خودش اتفاق خاصی است.",

    "ستارگان توصیه کرده‌اند امروز از دردسر فاصله بگیری. متأسفانه دردسر تو را پیدا می‌کند.",

    "پیش‌بینی نهایی: فردا هم احتمالاً همین‌قدر بدبخت خواهی بود. 😂"

];


/* =========================
   GENERATE
========================= */


function showActualFortune(){

    const financialText =
        randomItem(
            financial
        );


    const relationshipText =
        randomItem(
            relationships
        );


    const workText =
        randomItem(
            work
        );


    const mentalText =
        randomItem(
            mental
        );


    const finalText =
        randomItem(
            finalPredictions
        );


    /*
     * درصد بدبختی
     */

    const misery =
        Math.floor(
            Math.random() * 51
        ) + 50;


    /*
     * تعداد خانه‌های نوار
     */

    const filled =
        Math.round(
            misery / 10
        );


    const empty =
        10 - filled;


    const bar =
        "█".repeat(
            filled
        ) +
        "░".repeat(
            empty
        );


    /*
     * عنوان وضعیت
     */

    let miseryTitle;


    if(misery < 60){

        miseryTitle =
            "فعلاً قابل کنترل 😌";

    }

    else if(misery < 75){

        miseryTitle =
            "اوضاع یکم مشکوکه 👀";

    }

    else if(misery < 90){

        miseryTitle =
            "بدبختی در محدوده خطر 💀";

    }

    else{

        miseryTitle =
            "فرار کن. همین الان. ☠️";

    }


    showResult(

        "fortuneResult",

        `

        <div
            style="
                font-size:50px;
                margin-bottom:10px;
            "
        >
            🔮
        </div>


        <h2>
            فال امروزت آماده شد
        </h2>


        <div
            style="
                text-align:right;
                margin-top:25px;
            "
        >

            <div
                class="question"
                style="
                    margin-top:0;
                    color:var(--yellow);
                "
            >
                💸 وضعیت مالی
            </div>

            <p>
                ${financialText}
            </p>


            <div
                class="question"
                style="
                    color:#ff7fa5;
                "
            >
                ❤️ روابط
            </div>

            <p>
                ${relationshipText}
            </p>


            <div
                class="question"
                style="
                    color:var(--purple);
                "
            >
                💼 کار
            </div>

            <p>
                ${workText}
            </p>


            <div
                class="question"
                style="
                    color:#6ee7b7;
                "
            >
                🧠 وضعیت روانی
            </div>

            <p>
                ${mentalText}
            </p>

        </div>


        <div
            style="
                margin-top:30px;
                padding:20px;
                background:#ffffff08;
                border-radius:18px;
            "
        >

            <div
                style="
                    font-weight:bold;
                    margin-bottom:10px;
                "
            >
                ☠️ میزان بدبختی امروز
            </div>


            <div
                style="
                    font-family:monospace;
                    font-size:20px;
                    letter-spacing:1px;
                    direction:ltr;
                    margin:10px 0;
                "
            >
                ${bar}
            </div>


            <div
                class="big"
                style="
                    font-size:42px;
                "
            >
                ${misery}%
            </div>


            <div>
                ${miseryTitle}
            </div>

        </div>


        <div
            style="
                margin-top:30px;
                padding:22px;
                border-radius:20px;
                background:
                    linear-gradient(
                        145deg,
                        #ffffff0b,
                        #ffffff04
                    );
                border:
                    1px solid
                    #ffffff0c;
            "
        >

            <div
                style="
                    color:var(--purple);
                    font-size:14px;
                    margin-bottom:10px;
                "
            >
                🔮 پیش‌بینی نهایی
            </div>


            <div
                style="
                    font-size:20px;
                    font-weight:bold;
                    line-height:1.9;
                "
            >
                ${finalText}
            </div>

        </div>


        <button
            class="secondary"
            id="fortuneAgain"
        >
            🔮 دوباره فال بگیر
        </button>


        <p
            style="
                color:#666;
                font-size:11px;
                margin-top:18px;
            "
        >
            این فال کاملاً تصادفی است.
            اگر درست از آب درآمد،
            تقصیر ما نیست. 😂
        </p>

        `

    );


    /*
     * دکمه فال دوباره
     */

    const again =
        document.getElementById(
            "fortuneAgain"
        );


    if(again){

        again.onclick = () => {

            generateFortune();

        };

    }

}
