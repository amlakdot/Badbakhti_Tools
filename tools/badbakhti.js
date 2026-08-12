import {
    showResult
} from "../js/app.js";


export default {

    id:"badbakhti",

    icon:"💀",

    title:"چقدر بدبختی؟",

    description:
        "ببین وضعیت زندگیت واقعاً چقدر خرابه.",

    buttonText:
        "بررسی وضعیت",


    html:`

        <h2>
            💀 چقدر بدبختی؟
        </h2>

        <p class="desc">
            چند سؤال کاملاً علمی که احتمالاً زندگی‌ات را زیر سؤال می‌برد.
        </p>


        <div class="question">
            چند ساعت خوابیدی؟
        </div>

        <input
            id="sleep"
            type="number"
            min="0"
            max="24"
            placeholder="مثلاً 5"
        >


        <div class="question">
            چند ساعت امروز توی گوشی بودی؟
        </div>

        <input
            id="screen"
            type="number"
            min="0"
            max="24"
            placeholder="مثلاً 8"
        >


        <div class="question">
            چند کار عقب‌افتاده داری؟
        </div>

        <input
            id="tasks"
            type="number"
            min="0"
            placeholder="مثلاً 12"
        >


        <div class="question">
            چند بار امروز گفتی «از فردا شروع می‌کنم»؟
        </div>

        <input
            id="tomorrow"
            type="number"
            min="0"
            placeholder="مثلاً 4"
        >


        <button
            class="primary"
            id="badbakhtiBtn"
        >
            وضعیت زندگی من را بررسی کن 💀
        </button>


        <div
            id="badResult"
            class="result"
        ></div>

    `,


    init(){

        document
            .getElementById(
                "badbakhtiBtn"
            )
            .onclick = () => {


                let sleep =
                    Number(
                        document
                            .getElementById(
                                "sleep"
                            )
                            .value
                    ) || 0;


                let screen =
                    Number(
                        document
                            .getElementById(
                                "screen"
                            )
                            .value
                    ) || 0;


                let tasks =
                    Number(
                        document
                            .getElementById(
                                "tasks"
                            )
                            .value
                    ) || 0;


                let tomorrow =
                    Number(
                        document
                            .getElementById(
                                "tomorrow"
                            )
                            .value
                    ) || 0;


                let score = 0;


                if(sleep < 6){

                    score += 25;

                }

                else if(sleep < 8){

                    score += 10;

                }


                score +=
                    Math.min(
                        screen * 4,
                        35
                    );


                score +=
                    Math.min(
                        tasks * 2,
                        20
                    );


                score +=
                    Math.min(
                        tomorrow * 4,
                        20
                    );


                score =
                    Math.min(
                        Math.round(score),
                        100
                    );


                let text;


                if(score < 30){

                    text =
                        "فعلاً اوضاع قابل کنترله 😌";

                }

                else if(score < 55){

                    text =
                        "یه کم زندگی‌تو جمع کن. هنوز دیر نشده.";

                }

                else if(score < 75){

                    text =
                        "اوضاع مشکوکه 💀";

                }

                else{

                    text =
                        "برادر... خواهر... ما دیگه وارد مرحله جدیدی شدیم. 💀";

                }


                showResult(

                    "badResult",

                    `

                    <div>
                        شاخص بدبختی
                    </div>

                    <div class="score">
                        ${score}%
                    </div>

                    <div class="bar">

                        <span
                            style="width:${score}%"
                        ></span>

                    </div>

                    <p>
                        ${text}
                    </p>

                    `

                );

            };

    }

};
