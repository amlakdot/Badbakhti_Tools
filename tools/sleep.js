registerTool({
    id: "sleep",
    icon: "😴",
    title: "الان واقعاً باید بخوابم؟",
    description: "ببین امشب واقعاً باید بخوابی یا هنوز می‌تونی به بدبختی ادامه بدی.",

    render: function(container) {

        container.innerHTML = `

            <div class="box">

                <h2>
                    😴 الان واقعاً باید بخوابم؟
                </h2>

                <p class="desc">
                    چندتا سؤال جواب بده تا بفهمیم مغزت هنوز زنده‌ست یا رسماً درخواست استعفا داده.
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

                <p style="
                    text-align:center;
                    color:var(--muted);
                    margin-top:-5px;
                ">
                    ۰ = اصلاً خوابم نمیاد
                    <br>
                    ۱۰ = همین الان می‌میرم
                </p>


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
                    الان واقعاً چرا هنوز بیداری؟
                </div>

                <select id="reason">

                    <option value="nothing">
                        هیچ دلیلی ندارم 💀
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

                    <option value="sleep">
                        خوابم نمی‌برد 😐
                    </option>

                </select>


                <button
                    class="primary"
                    id="sleepCheckButton"
                >
                    وضعیت خوابم رو بررسی کن 😴
                </button>


                <div
                    id="sleepResult"
                    class="result"
                ></div>

            </div>
        `;


        const button =
            container.querySelector(
                "#sleepCheckButton"
            );


        button.addEventListener(
            "click",
            function(){

                calculateSleep(container);

            }
        );

    }
});



function calculateSleep(container){

    const sleepHours =
        Number(
            container.querySelector(
                "#sleepHours"
            ).value
        ) || 0;


    const sleepiness =
        Number(
            container.querySelector(
                "#sleepiness"
            ).value
        );


    const earlyWake =
        container.querySelector(
            "#earlyWake"
        ).value;


    const phoneTime =
        Number(
            container.querySelector(
                "#phoneTime"
            ).value
        ) || 0;


    const reason =
        container.querySelector(
            "#reason"
        ).value;


    let score = 0;


    /*
        خواب کم
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
        فردا صبح زود بیدار شدن
    */

    if(earlyWake === "yes"){

        score += 15;

    }


    /*
        استفاده زیاد از گوشی
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
            "مغزت دیگه باهات حرف نمی‌زنه. گوشی رو بذار کنار، چراغ رو خاموش کن و برو تخت.";


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


    const result =
        container.querySelector(
            "#sleepResult"
        );


    result.innerHTML = `

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

    `;


    result.classList.add("show");


    result.scrollIntoView({

        behavior:"smooth",

        block:"nearest"

    });

}
