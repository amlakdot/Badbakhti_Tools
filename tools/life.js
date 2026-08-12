import {
    showResult
} from "../js/app.js";


export default {

    id:"life",

    icon:"⏳",

    title:"چقدر وقت داری؟",

    description:
        "یک نگاه نسبتاً ترسناک به باقی‌مانده عمرت.",

    buttonText:
        "محاسبه عمر",


    html:`

        <h2>
            ⏳ چقدر وقت داری؟
        </h2>

        <p class="desc">
            فرض می‌کنیم تا ۸۰ سالگی زندگی می‌کنی.
        </p>


        <input
            id="age"
            type="number"
            min="1"
            max="100"
            placeholder="سن شما"
        >


        <button
            class="primary"
            id="lifeBtn"
        >
            حساب کن
        </button>


        <div
            id="lifeResult"
            class="result"
        ></div>

    `,


    init(){

        document
            .getElementById(
                "lifeBtn"
            )
            .onclick = () => {


                let age =
                    Number(
                        document
                            .getElementById(
                                "age"
                            )
                            .value
                    ) || 0;


                if(!age){

                    alert(
                        "سنت رو وارد کن."
                    );

                    return;

                }


                let remaining =
                    Math.max(
                        80 - age,
                        0
                    );


                let months =
                    remaining * 12;


                let weeks =
                    Math.round(
                        remaining *
                        52.14
                    );


                let days =
                    Math.round(
                        remaining *
                        365.25
                    );


                showResult(

                    "lifeResult",

                    `

                    <p>
                        اگر تا ۸۰ سالگی زندگی کنی:
                    </p>


                    <div class="big">
                        ${remaining}
                    </div>


                    <p>
                        سال باقی مانده
                    </p>


                    <p>
                        ${months.toLocaleString("fa-IR")}
                        ماه
                    </p>


                    <p>
                        ${weeks.toLocaleString("fa-IR")}
                        هفته
                    </p>


                    <p>
                        ${days.toLocaleString("fa-IR")}
                        روز
                    </p>


                    <p>
                        حالا برو اون کاری که هی عقب می‌ندازی
                        رو انجام بده. ❤️
                    </p>

                    `

                );

            };

    }

};
