import {
    showResult,
    escapeHTML
} from "../js/app.js";


export default {

    id:"decision",

    icon:"🎰",

    title:"تصمیم‌گیر",

    description:
        "چون خودت توانایی تصمیم‌گیری نداری، ما داریم.",

    buttonText:
        "تصمیم بگیر",


    html:`

        <h2>
            🎰 تصمیم‌گیر
        </h2>

        <p class="desc">
            گزینه‌ها را وارد کن. از این لحظه مسئولیت تصمیم با ما نیست.
        </p>


        <div id="options"></div>


        <button
            class="add"
            id="addOptionBtn"
        >
            + گزینه جدید
        </button>


        <button
            class="primary"
            id="decideBtn"
        >
            تصمیم بگیر 🎰
        </button>


        <div
            id="decisionResult"
            class="result"
        ></div>

    `,


    init(){

        let optionCount = 0;


        const options =
            document.getElementById(
                "options"
            );


        function addOption(
            value=""
        ){

            optionCount++;


            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "option";


            div.innerHTML = `

                <input
                    class="decisionOption"
                    placeholder="گزینه ${optionCount}"
                    value="${escapeHTML(value)}"
                >

            `;


            options.appendChild(
                div
            );

        }


        addOption();

        addOption();


        document
            .getElementById(
                "addOptionBtn"
            )
            .onclick =
                () =>
                    addOption();


        document
            .getElementById(
                "decideBtn"
            )
            .onclick = () => {


                const values = [

                    ...document
                        .querySelectorAll(
                            ".decisionOption"
                        )

                ]

                .map(
                    input =>
                        input.value.trim()
                )

                .filter(Boolean);


                if(
                    values.length < 2
                ){

                    alert(
                        "حداقل دو گزینه وارد کن 😂"
                    );

                    return;

                }


                const winner =
                    values[
                        Math.floor(
                            Math.random() *
                            values.length
                        )
                    ];


                showResult(

                    "decisionResult",

                    `

                    <div>
                        تصمیم گرفته شد:
                    </div>

                    <div class="big">
                        ${escapeHTML(
                            winner
                        )}
                    </div>

                    <p>
                        دیگه بحث نکن.
                        خودت خواستی. 😂
                    </p>

                    `

                );

            };

    }

};
