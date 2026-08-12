import {
    showResult
} from "../js/app.js";


export default {

    id:"phone",

    icon:"📱",

    title:"اعتیاد به گوشی",

    description:
        "ببین چند روز از عمرت را داری اسکرول می‌کنی.",

    buttonText:
        "محاسبه",


    html:`

        <h2>
            📱 اعتیاد به گوشی
        </h2>

        <p class="desc">
            Screen Time روزانه‌ات را وارد کن.
        </p>


        <input
            id="phoneHours"
            type="number"
            step="0.1"
            placeholder="مثلاً 7.5"
        >


        <button
            class="primary"
            id="phoneBtn"
        >
            حقیقت تلخ را نشان بده 💀
        </button>


        <div
            id="phoneResult"
            class="result"
        ></div>

    `,


    init(){

        document
            .getElementById(
                "phoneBtn"
            )
            .onclick = () => {


                let hours =
                    Number(
                        document
                            .getElementById(
                                "phoneHours"
                            )
                            .value
                    ) || 0;


                let daysYear =
                    (
                        hours * 365
                    ) / 24;


                let yearsTen =
                    (
                        hours * 3650
                    ) / 24;


                showResult(

                    "phoneResult",

                    `

                    <p>
                        اگر روزی
                        ${hours}
                        ساعت
                        گوشی دستت باشد:
                    </p>


                    <div class="big">
                        ${daysYear.toFixed(1)}
                        روز
                    </div>


                    <p>
                        در هر سال پای گوشی می‌گذرانی.
                    </p>


                    <div class="big">
                        ${yearsTen.toFixed(1)}
                        روز
                    </div>


                    <p>
                        در ۱۰ سال آینده.
                    </p>


                    <p>
                        موفق باشی. 📱💀
                    </p>

                    `

                );

            };

    }

};
