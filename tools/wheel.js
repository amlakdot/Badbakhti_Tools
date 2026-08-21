import {
    showResult
} from "../js/app.js";


export default {

    id:"wheel",

    icon:"🎡",

    title:"گردونه بدبختی",

    description:
        "بذار شانس تصمیم بگیره امروز کدوم ابزار قراره بدبختت کنه.",

    buttonText:
        "بچرخونش 🎡",


    html:`

        <h2>
            🎡 گردونه بدبختی
        </h2>


        <p class="desc">
            حوصله نداری خودت انتخاب کنی؟
            بذار گردونه به جات تصمیم بگیره. 💀
        </p>


        <div
            id="wheelArea"
            style="
                margin-top:25px;
                text-align:center;
            "
        >

            <div
                id="wheelPointer"
                style="
                    position:relative;
                    z-index:10;
                    width:0;
                    height:0;
                    margin:0 auto -10px;
                    border-left:14px solid transparent;
                    border-right:14px solid transparent;
                    border-top:30px solid var(--red);
                    filter:drop-shadow(0 5px 8px #0008);
                "
            ></div>


            <div
                id="wheel"
                style="
                    width:min(360px, 82vw);
                    height:min(360px, 82vw);
                    margin:0 auto;
                    border-radius:50%;
                    position:relative;
                    overflow:hidden;
                    border:8px solid #ffffff18;
                    box-shadow:
                        0 20px 60px #0008,
                        inset 0 0 0 2px #ffffff12;
                    transition:
                        transform 5s cubic-bezier(.12,.72,.18,1);
                    background:#182b3d;
                "
            ></div>


            <div
                id="wheelCenter"
                style="
                    position:relative;
                    width:72px;
                    height:72px;
                    margin:-36px auto 0;
                    border-radius:50%;
                    background:#0e1621;
                    border:6px solid #ffffff18;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    font-size:28px;
                    z-index:5;
                    box-shadow:0 5px 20px #0008;
                "
            >
                💀
            </div>


            <button
                class="primary"
                id="spinWheelBtn"
                style="
                    margin-top:25px;
                "
            >
                بچرخونش 💀
            </button>


            <div
                id="wheelResult"
                class="result"
            ></div>

        </div>

    `,


    init(){

        const wheel =
            document.getElementById(
                "wheel"
            );


        const spinButton =
            document.getElementById(
                "spinWheelBtn"
            );


        const result =
            document.getElementById(
                "wheelResult"
            );


        /*
        =========================
        دریافت ابزارها
        =========================
        */

        const toolCards =
            Array.from(
                document.querySelectorAll(
                    ".tool[data-id]"
                )
            );


        /*
        =========================
        حذف گردونه از گزینه‌ها
        =========================
        */

        const wheelTools =
            toolCards.filter(
                card =>
                    card.dataset.id !== "wheel"
            );


        /*
        =========================
        اگر ابزاری وجود نداشت
        =========================
        */

        if(!wheelTools.length){

            wheel.innerHTML = `
                <div
                    style="
                        height:100%;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        padding:30px;
                        text-align:center;
                        color:var(--muted);
                    "
                >
                    هنوز ابزار دیگری برای چرخاندن وجود ندارد. 💀
                </div>
            `;

            spinButton.disabled = true;

            return;

        }


        /*
        =========================
        اطلاعات ابزارها
        =========================
        */

        const tools =
            wheelTools.map(
                card => {

                    const title =
                        card.querySelector(
                            "h2"
                        );

                    const emoji =
                        card.querySelector(
                            ".emoji"
                        );

                    return {

                        id:
                            card.dataset.id,

                        title:
                            title
                            ? title.textContent.trim()
                            : "ابزار بدبختی",

                        icon:
                            emoji
                            ? emoji.textContent.trim()
                            : "💀"

                    };

                }
            );


        /*
        =========================
        ساخت گردونه
        =========================
        */

        const segmentCount =
            tools.length;


        const segmentSize =
            360 / segmentCount;


        const segmentColors = [

            "#2b5278",
            "#34495e",
            "#3d566e",
            "#264653",
            "#315f72",
            "#40566d",
            "#355070",
            "#2f4858"

        ];


        const gradientParts =
            tools.map(
                (tool, index) => {

                    const start =
                        index *
                        segmentSize;

                    const end =
                        (index + 1) *
                        segmentSize;

                    const color =
                        segmentColors[
                            index %
                            segmentColors.length
                        ];

                    return `
                        ${color}
                        ${start}deg
                        ${end}deg
                    `;

                }
            );


        wheel.style.background =
            `
            conic-gradient(
                from -90deg,
                ${gradientParts.join(",")}
            )
            `;


        /*
        =========================
        نام ابزارها روی گردونه
        =========================
        */

        tools.forEach(
            (tool, index) => {

                const label =
                    document.createElement(
                        "div"
                    );


                const angle =
                    index *
                    segmentSize +
                    segmentSize / 2;


                label.style.cssText = `

                    position:absolute;

                    top:50%;
                    left:50%;

                    width:42%;

                    transform:
                        translate(-50%, -50%)
                        rotate(${angle}deg)
                        translateY(-${Math.min(
                            115,
                            145 - segmentCount * 2
                        )}px)
                        rotate(${-angle}deg);

                    transform-origin:center;

                    text-align:center;

                    color:white;

                    font-size:${segmentCount > 12 ? "9px" : "11px"};

                    font-weight:bold;

                    line-height:1.5;

                    text-shadow:
                        0 2px 5px #000b;

                    pointer-events:none;

                `;


                label.innerHTML = `
                    <div
                        style="
                            font-size:${
                                segmentCount > 12
                                ? "17px"
                                : "21px"
                            };
                            margin-bottom:3px;
                        "
                    >
                        ${tool.icon}
                    </div>

                    <div>
                        ${escapeToolText(tool.title)}
                    </div>
                `;


                wheel.appendChild(
                    label
                );

            }
        );


        /*
        =========================
        وضعیت گردونه
        =========================
        */

        let currentRotation = 0;

        let spinning = false;


        /*
        =========================
        چرخاندن
        =========================
        */

        spinButton.onclick = () => {

            if(spinning){
                return;
            }


            spinning = true;

            spinButton.disabled = true;

            spinButton.style.opacity =
                "0.5";

            result.classList.remove(
                "show"
            );


            /*
            انتخاب تصادفی ابزار
            */

            const selectedIndex =
                Math.floor(
                    Math.random() *
                    tools.length
                );


            const selectedTool =
                tools[selectedIndex];


            /*
            مرکز قطعه انتخاب‌شده
            */

            const selectedCenter =
                selectedIndex *
                segmentSize +
                segmentSize / 2;


            /*
            مقدار چرخش جدید
            */

            const extraRounds =
                5 +
                Math.floor(
                    Math.random() * 3
                );


            const targetRotation =
                extraRounds * 360
                +
                (360 - selectedCenter);


            currentRotation +=
                targetRotation;


            wheel.style.transform =
                `rotate(${currentRotation}deg)`;


            /*
            بعد از پایان انیمیشن
            */

            setTimeout(
                () => {

                    spinning = false;

                    spinButton.disabled =
                        false;

                    spinButton.style.opacity =
                        "1";


                    showResult(

                        "wheelResult",

                        `

                        <div
                            style="
                                font-size:42px;
                                margin-bottom:10px;
                            "
                        >
                            ${selectedTool.icon}
                        </div>


                        <div
                            style="
                                font-size:14px;
                                color:var(--muted);
                            "
                        >
                            گردونه تصمیمش رو گرفت...
                        </div>


                        <div
                            style="
                                font-size:24px;
                                font-weight:bold;
                                margin:12px 0;
                            "
                        >
                            ${escapeToolText(
                                selectedTool.title
                            )}
                        </div>


                        <p
                            style="
                                margin-bottom:18px;
                            "
                        >
                            امروز این ابزار قراره
                            بدبختت کنه. 💀
                        </p>


                        <button
                            class="primary"
                            id="openSelectedTool"
                        >
                            بریم سراغش 💀
                        </button>

                        `

                    );


                    /*
                    =========================
                    باز کردن ابزار انتخاب‌شده
                    =========================
                    */

                    const openButton =
                        document.getElementById(
                            "openSelectedTool"
                        );


                    if(openButton){

                        openButton.onclick =
                            () => {

                                const originalButton =
                                    document.querySelector(
                                        `[data-tool="${selectedTool.id}"]`
                                    );


                                if(
                                    originalButton
                                ){

                                    originalButton.click();

                                }

                            };

                    }

                },

                5100

            );

        };

    }

};


/*
=================================
محافظت ساده از متن
=================================
*/

function escapeToolText(
    text
){

    return String(text)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}
