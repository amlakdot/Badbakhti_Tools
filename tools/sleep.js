import {
    showResult
} from "../js/app.js";


export default {

    id:"sleep",

    icon:"😴",

    title:"الان واقعاً باید بخوابم؟",

    description:
        "ببین امشب واقعاً باید بخوابی یا هنوز می‌تونی به بدبختی ادامه بدی.",

    buttonText:
        "بررسی وضعیت خواب",


    html:`

        <h2>
            😴 الان واقعاً باید بخوابم؟
        </h2>

        <p class="desc">
            چندتا سؤال جواب بده تا ببینیم
            واقعاً وقت خوابه یا هنوز می‌تونی
            به بدبختی ادامه بدی.
        </p>


        <div class="question">
            دیشب چند ساعت خوابیدی؟
        </div>

        <input
            id="sleepHours"
            type="number"
            min="0"
            max="24"
            step="0.5"
            placeholder="مثلاً 5"
        >


        <div class="question">
            الان چقدر خوابت میاد؟
        </div>

        <input
            id="sleepiness"
            type="range"
            min="0"
            max="10"
            value="5"
        >


        <div class="question">
            فردا باید زود بیدار شی؟
        </div>

        <select id="earlyWake">

            <option value="yes">
                آره 😭
            </option>

            <option value="no">
                نه
            </option>

        </select>


        <div class="question">
            امروز چند ساعت با گوشی بودی؟
        </div>

        <input
            id="phoneTime"
            type="number"
            min="0"
            max="24"
            step="0.5"
            placeholder="مثلاً 7"
        >


        <div class="question">
            الان چرا هنوز بیداری؟
        </div>

        <select id="sleepReason">

            <option value="nothing">
                خودمم نمی‌دونم 💀
            </option>

            <option value="phone">
                داشتم با گوشی کار می‌کردم 📱
            </option>

            <option value="work">
                کار داشتم 💼
            </option>

            <option value="thinking">
                داشتم به زندگی فکر می‌کردم 🫠
            </option>

            <option value="insomnia">
                خوابم نمی‌برد 😐
            </option>

        </select>


        <button
            class="primary"
            id="sleepBtn"
        >
            ببینم باید بخوابم یا نه 😴
        </button>


        <div
            id="sleepResult"
            class="result"
        ></div>

    `,


    init(){

        document
            .getElementById(
                "sleepBtn"
            )
            .onclick = () => {


                let sleepHours =
                    Number(
                        document
                            .getElementById(
                                "sleepHours"
                            )
                            .value
                    ) || 0;


                let sleepiness =
                    Number(
                        document
                            .getElementById(
                                "sleepiness"
                            )
                            .value
                    );


                let earlyWake =
                    document
                        .getElementById(
                            "earlyWake"
                        )
                        .value;


                let phoneTime =
                    Number(
                        document
                            .getElementById(
                                "phoneTime"
                            )
                            .value
                    ) || 0;


                let reason =
                    document
                        .getElementById(
                            "sleepReason"
                        )
                        .value;


                let score = 0;


                /*
                    مقدار خواب دیشب
                */

                if(sleepHours < 4){

                    score += 35;

                }

                else if(sleepHours < 6){

                    score += 25;

                }

                else if(sleepHours < 7){

                    score += 15;

                }


                /*
                    میزان خواب‌آلودگی
                */

                score +=
                    sleepiness * 5;


                /*
                    فردا باید زود بیدار شود
                */

                if(earlyWake === "yes"){

                    score += 15;

                }


                /*
                    زمان استفاده از گوشی
                */

                if(phoneTime >= 8){

                    score += 15;

                }

                else if(phoneTime >= 5){

                    score += 8;

                }


                /*
                    دلیل بیدار ماندن
                */

                if(reason === "nothing"){

                    score += 10;

                }

                else if(reason === "phone"){

                    score += 8;

                }

                else if(reason === "thinking"){

                    score += 5;

                }


                score =
                    Math.min(
                        Math.round(score),
                        100
                    );


                let title;
                let text;
                let emoji;


                if(score >= 80){

                    emoji = "💀";

                    title =
                        "برو بخواب. همین الان.";

                    text =
                        "مغزت دیگه باهات همکاری نمی‌کنه. گوشی رو بذار کنار، چراغ رو خاموش کن و برو تخت.";

                }

                else if(score >= 60){

                    emoji = "😴";

                    title =
                        "آره... بهتره بخوابی.";

                    text =
                        "هنوز می‌تونی بیدار بمونی، ولی فردای بدبختی در راهه.";

                }

                else if(score >= 40){

                    emoji = "🫠";

                    title =
                        "یکم دیگه بیدار بمون، ولی نه زیاد.";

                    text =
                        "بدنت هنوز شکایت رسمی نکرده، ولی داره فرم شکایت رو پر می‌کنه.";

                }

                else{

                    emoji = "🌙";

                    title =
                        "فعلاً لازم نیست بخوابی.";

                    text =
                        "اوضاعت فعلاً بد نیست. ولی لطفاً ساعت ۴ صبح نیا بگی چرا خوابم نمی‌بره. 😂";

                }


                showResult(

                    "sleepResult",

                    `

                    <div>
                        میزان نیاز به خواب
                    </div>


                    <div class="score">
                        ${score}%
                    </div>


                    <div class="bar">

                        <span
                            style="width:${score}%"
                        ></span>

                    </div>


                    <div
                        style="
                            font-size:45px;
                            margin:15px 0;
                        "
                    >
                        ${emoji}
                    </div>


                    <h3>
                        ${title}
                    </h3>


                    <p>
                        ${text}
                    </p>


                    ${
                        earlyWake === "yes"
                        ?
                        `
                        <p>
                            ⏰ فردا هم باید زود بیدار شی؛
                            پس واقعاً دلیلی برای ادامه دادن این فاجعه وجود نداره.
                        </p>
                        `
                        :
                        ""
                    }


                    <p
                        style="
                            color:var(--muted);
                            margin-top:20px;
                        "
                    >
                        نتیجه کاملاً علمی نیست؛
                        ولی احتمالاً از تصمیمات خودت منطقی‌تره. 😂
                    </p>

                    `

                );

            };

    }

};
