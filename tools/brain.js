import {
    showResult
} from "../js/app.js";


export default {

    id:"brain",

    icon:"🧠",

    title:"مغزت چه وضعیه؟",

    description:
        "یک تست کوتاه برای تشخیص وضعیت مغز.",

    buttonText:
        "تست مغز",


    html:`

        <h2>
            🧠 مغزت الان چه وضعیه؟
        </h2>

        <p class="desc">
            جواب‌ها را صادقانه بده.
            مغزت می‌فهمد اگر دروغ بگویی.
        </p>


        <div class="question">
            الان چقدر خوابت میاد؟
        </div>

        <input
            id="brainSleep"
            type="range"
            min="0"
            max="10"
            value="5"
        >


        <div class="question">
            چقدر حوصله داری؟
        </div>

        <input
            id="brainMood"
            type="range"
            min="0"
            max="10"
            value="5"
        >


        <div class="question">
            امروز چقدر آب خوردی؟
        </div>

        <input
            id="brainWater"
            type="range"
            min="0"
            max="10"
            value="5"
        >


        <div class="question">
            چقدر دوست داری همه‌چیز را ول کنی؟
        </div>

        <input
            id="brainQuit"
            type="range"
            min="0"
            max="10"
            value="5"
        >


        <button
            class="primary"
            id="brainBtn"
        >
            مغزم را بررسی کن 🧠
        </button>


        <div
            id="brainResult"
            class="result"
        ></div>

    `,


    init(){

        document
            .getElementById(
                "brainBtn"
            )
            .onclick = () => {


                let sleep =
                    Number(
                        document
                            .getElementById(
                                "brainSleep"
                            )
                            .value
                    );


                let mood =
                    Number(
                        document
                            .getElementById(
                                "brainMood"
                            )
                            .value
                    );


                let water =
                    Number(
                        document
                            .getElementById(
                                "brainWater"
                            )
                            .value
                    );


                let quit =
                    Number(
                        document
                            .getElementById(
                                "brainQuit"
                            )
                            .value
                    );


                let tired =

                    sleep * 4 +

                    (10 - mood) * 2 +

                    (10 - water) * 2 +

                    quit * 2;


                tired =
                    Math.min(
                        Math.round(tired),
                        100
                    );


                let title;


                if(tired < 25){

                    title =
                        "🧠 مغزت فعلاً سرحاله";

                }

                else if(tired < 50){

                    title =
                        "🧠 مغزت یکم مرخصی می‌خواد";

                }

                else if(tired < 75){

                    title =
                        "🧠 مغزت رسماً خسته‌ست";

                }

                else{

                    title =
                        "🧠 مغزت استعفا داده";

                }


                showResult(

                    "brainResult",

                    `

                    <div class="big">
                        ${tired}%
                    </div>


                    <div class="bar">

                        <span
                            style="width:${tired}%"
                        ></span>

                    </div>


                    <h3>
                        ${title}
                    </h3>


                    <p>
                        امروز یکم کمتر به خودت فشار بیار.
                    </p>

                    `

                );

            };

    }

};
