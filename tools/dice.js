import {
    showResult
} from "../js/app.js";


export default {

    id:"dice",

    icon:"🎲",

    title:"تاس بدبختی",

    description:
        "عددهایی که می‌خوای با اومدنشون کار انجام بشه رو انتخاب کن.",

    buttonText:
        "تاس بنداز 🎲",


    html:`

        <h2>
            🎲 تاس بدبختی
        </h2>


        <p class="desc">

            عددهایی که می‌خوای با اومدنشون
            کار انجام بشه رو انتخاب کن.

            مثلاً اگر
            ۱، ۳ و ۶
            رو انتخاب کنی،
            فقط با آمدن یکی از این سه عدد،
            کار انجام می‌شود.

        </p>


        <div class="question">
            کدوم عددها باعث انجام کار بشن؟
        </div>


        <div class="dice-options">

            ${[1,2,3,4,5,6].map(

                n => `

                <div class="dice-option">

                    <input
                        type="checkbox"
                        id="dice${n}"
                        value="${n}"
                    >

                    <label
                        for="dice${n}"
                    >
                        ${n.toLocaleString("fa-IR")}
                    </label>

                </div>

                `

            ).join("")}

        </div>


        <button
            class="primary"
            id="diceBtn"
        >
            🎲 تاس بنداز
        </button>


        <div
            id="diceResult"
            class="result"
        ></div>

    `,


    init(){

        document
            .getElementById(
                "diceBtn"
            )
            .onclick = () => {


                const selected = [

                    ...document
                        .querySelectorAll(
                            ".dice-option input:checked"
                        )

                ];


                if(
                    !selected.length
                ){

                    alert(
                        "حداقل یک عدد انتخاب کن 🎲"
                    );

                    return;

                }


                const selectedNumbers =
                    selected.map(
                        input =>
                            Number(
                                input.value
                            )
                    );


                const dice =
                    Math.floor(
                        Math.random() * 6
                    ) + 1;


                const faces = {

                    1:"⚀",

                    2:"⚁",

                    3:"⚂",

                    4:"⚃",

                    5:"⚄",

                    6:"⚅"

                };


                const success =
                    selectedNumbers.includes(
                        dice
                    );


                const message =

                    success

                    ?

                    `

                    <div
                        class="dice-result-success"
                    >
                        ✅ انجامش بده!
                    </div>

                    <p>
                        عدد
                        ${dice.toLocaleString("fa-IR")}
                        اومد و جزو عددهای انتخابی تو بود.
                    </p>

                    `

                    :

                    `

                    <div
                        class="dice-result-fail"
                    >
                        ❌ انجامش نده!
                    </div>

                    <p>
                        عدد
                        ${dice.toLocaleString("fa-IR")}
                        اومد و جزو عددهای انتخابی تو نبود.
                    </p>

                    `;


                showResult(

                    "diceResult",

                    `

                    <div class="dice roll">
                        ${faces[dice]}
                    </div>


                    <div>
                        عدد تاس:
                    </div>


                    <div class="score">
                        ${dice.toLocaleString("fa-IR")}
                    </div>


                    ${message}

                    `

                );

            };

    }

};
