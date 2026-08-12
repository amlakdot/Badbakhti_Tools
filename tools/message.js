import {
    showResult
} from "../js/app.js";


export default {

    id:"message",

    icon:"💬",

    title:"بهش پیام بدم؟",

    description:
        "قبل از اینکه دوباره آبروتو ببری، اینجا بررسی کن.",

    buttonText:
        "تحلیل رابطه",


    html:`

        <h2>
            💬 بهش پیام بدم یا نه؟
        </h2>

        <p class="desc">
            قبل از ارسال پیام، یک بار اینجا خودتو متوقف کن.
        </p>


        <div class="question">
            چند وقته باهاش حرف نزدی؟
        </div>

        <input
            id="daysNoTalk"
            type="number"
            min="0"
            placeholder="روز"
        >


        <div class="question">
            آخرین پیام را تو فرستادی؟
        </div>

        <select id="lastSender">

            <option value="yes">
                آره
            </option>

            <option value="no">
                نه
            </option>

        </select>


        <div class="question">
            پیام قبلیت را Seen کرده؟
        </div>

        <select id="seen">

            <option value="yes">
                آره
            </option>

            <option value="no">
                نه
            </option>

            <option value="unknown">
                نمی‌دونم
            </option>

        </select>


        <div class="question">
            چند بار امروز پروفایلش را چک کردی؟
        </div>

        <input
            id="profile"
            type="number"
            min="0"
            placeholder="راستشو بگو 👀"
        >


        <button
            class="primary"
            id="messageBtn"
        >
            نتیجه را بگو
        </button>


        <div
            id="messageResult"
            class="result"
        ></div>

    `,


    init(){

        document
            .getElementById(
                "messageBtn"
            )
            .onclick = () => {


                let days =
                    Number(
                        document
                            .getElementById(
                                "daysNoTalk"
                            )
                            .value
                    ) || 0;


                let last =
                    document
                        .getElementById(
                            "lastSender"
                        )
                        .value;


                let seen =
                    document
                        .getElementById(
                            "seen"
                        )
                        .value;


                let profile =
                    Number(
                        document
                            .getElementById(
                                "profile"
                            )
                            .value
                    ) || 0;


                let risk = 20;


                risk +=
                    Math.min(
                        days * 2,
                        20
                    );


                if(last === "yes")
                    risk += 30;


                if(seen === "yes")
                    risk += 25;


                if(profile >= 5)
                    risk += 15;


                risk =
                    Math.min(
                        risk,
                        100
                    );


                let text;


                if(risk < 35){

                    text =
                        "می‌تونی پیام بدی. هنوز آبروت سر جاشه. 😌";

                }

                else if(risk < 60){

                    text =
                        "یکم صبر کن... عجله نکن.";

                }

                else if(risk < 80){

                    text =
                        "پیام نده. برو آب بخور. 📵";

                }

                else{

                    text =
                        "به هیچ عنوان پیام نده. گوشی رو بده به دوستت. 💀";

                }


                showResult(

                    "messageResult",

                    `

                    <div>
                        ریسک پشیمونی
                    </div>

                    <div class="score">
                        ${risk}%
                    </div>

                    <div class="bar">

                        <span
                            style="width:${risk}%"
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
