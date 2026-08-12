import {
    showResult,
    format
} from "../js/app.js";


export default {

    id:"money",

    icon:"💸",

    title:"پولم چقدر می‌ارزه؟",

    description:
        "درآمدت را به ساعت، روز و سال تبدیل کن.",

    buttonText:
        "محاسبه پول",


    html:`

        <h2>
            💸 پولت واقعاً چقدر می‌ارزه؟
        </h2>

        <p class="desc">
            درآمد ماهانه‌ات را وارد کن تا بفهمیم هر ساعت از زندگی‌ات چند تومان می‌ارزد.
        </p>


        <input
            id="income"
            type="number"
            placeholder="درآمد ماهانه به تومان"
        >


        <input
            id="workDays"
            type="number"
            value="26"
            placeholder="روز کاری"
        >


        <input
            id="workHours"
            type="number"
            value="8"
            placeholder="ساعت کاری روزانه"
        >


        <button
            class="primary"
            id="moneyBtn"
        >
            حساب کن 💸
        </button>


        <div
            id="moneyResult"
            class="result"
        ></div>

    `,


    init(){

        document
            .getElementById(
                "moneyBtn"
            )
            .onclick = () => {


                let income =
                    Number(
                        document
                            .getElementById(
                                "income"
                            )
                            .value
                    ) || 0;


                let days =
                    Number(
                        document
                            .getElementById(
                                "workDays"
                            )
                            .value
                    ) || 26;


                let hours =
                    Number(
                        document
                            .getElementById(
                                "workHours"
                            )
                            .value
                    ) || 8;


                if(!income)
                    return;


                let day =
                    income / days;


                let hour =
                    day / hours;


                let minute =
                    hour / 60;


                showResult(

                    "moneyResult",

                    `

                    <p>
                        درآمد روزانه
                    </p>

                    <div class="big">
                        ${format(day)}
                    </div>


                    <p>
                        درآمد ساعتی
                    </p>

                    <div class="big">
                        ${format(hour)}
                    </div>


                    <p>
                        ارزش هر دقیقه از وقت کاری تو
                    </p>

                    <div class="big">
                        ${format(minute)}
                    </div>


                    <p>
                        حالا هر بار ۲۰ دقیقه الکی اسکرول کردی،
                        خودت حساب کن 😂
                    </p>

                    `

                );

            };

    }

};
