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
            نمی‌دونی کدوم ابزار رو انتخاب کنی؟
            بذار گردونه به جات تصمیم بگیره. 💀
        </p>


        <div
            id="wheelArea"
            style="
                margin-top:25px;
                text-align:center;
                user-select:none;
            "
        >

            <!--
            =========================
            فلش انتخاب
            =========================
            -->

            <div
                style="
                    position:relative;
                    z-index:50;
                    width:0;
                    height:0;
                    margin:0 auto -4px;

                    border-left:16px solid transparent;
                    border-right:16px solid transparent;
                    border-top:34px solid var(--red);

                    filter:
                        drop-shadow(
                            0 4px 8px #0009
                        );
                "
            ></div>


            <!--
            =========================
            قاب گردونه
            =========================
            -->

            <div
                style="
                    width:min(440px, 94vw);
                    aspect-ratio:1;
                    margin:0 auto;

                    position:relative;

                    border-radius:50%;

                    padding:8px;

                    background:
                        linear-gradient(
                            145deg,
                            #ffffff25,
                            #ffffff08
                        );

                    box-shadow:
                        0 25px 70px #0009,
                        0 0 0 1px #ffffff12;

                    overflow:hidden;
                "
            >

                <svg
                    id="wheelSvg"
                    viewBox="0 0 500 500"
                    style="
                        width:100%;
                        height:100%;
                        display:block;

                        border-radius:50%;

                        transition:
                            transform
                            5.5s
                            cubic-bezier(
                                .12,
                                .72,
                                .16,
                                1
                            );

                        filter:
                            drop-shadow(
                                0 8px 20px #0008
                            );
                    "
                >

                    <g id="wheelGroup">

                    </g>

                </svg>

            </div>


            <!--
            =========================
            دکمه
            =========================
            -->

            <button
                class="primary"
                id="spinWheelBtn"
                style="
                    margin-top:28px;
                "
            >
                بچرخونش 💀
            </button>


            <!--
            =========================
            نتیجه
            =========================
            -->

            <div
                id="wheelResult"
                class="result"
            ></div>

        </div>

    `,


    init(){

        const svg =
            document.getElementById(
                "wheelSvg"
            );


        const group =
            document.getElementById(
                "wheelGroup"
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
        ابزارهای موجود
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
        حذف خود گردونه
        =========================
        */

        const wheelTools =
            toolCards.filter(
                card =>
                    card.dataset.id !== "wheel"
            );


        /*
        =========================
        اگر ابزار وجود نداشت
        =========================
        */

        if(!wheelTools.length){

            group.innerHTML = `

                <text
                    x="250"
                    y="250"
                    text-anchor="middle"
                    fill="white"
                    font-size="22"
                    direction="rtl"
                >
                    ابزار دیگری وجود ندارد 💀
                </text>

            `;

            spinButton.disabled = true;

            return;

        }


        /*
        =========================
        استخراج اطلاعات
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
        تنظیمات گردونه
        =========================
        */

        const size = 500;

        const center = 250;

        const radius = 235;

        const segmentCount =
            tools.length;

        const segmentAngle =
            360 / segmentCount;


        /*
        =========================
        رنگ سگمنت‌ها
        =========================
        */

        const colors = [

            "#243f58",
            "#2b5278",
            "#315d7c",
            "#34495e",
            "#3b5870",
            "#29465f",
            "#365b75",
            "#2f526d"

        ];


        /*
        =========================
        تبدیل درجه به مختصات
        =========================
        */

        function polarToCartesian(
            cx,
            cy,
            r,
            angle
        ){

            const radians =
                (
                    angle - 90
                )
                *
                Math.PI
                /
                180;


            return {

                x:
                    cx +
                    r *
                    Math.cos(
                        radians
                    ),

                y:
                    cy +
                    r *
                    Math.sin(
                        radians
                    )

            };

        }


        /*
        =========================
        ساخت مسیر هر سگمنت
        =========================
        */

        function createSegmentPath(
            startAngle,
            endAngle
        ){

            const start =
                polarToCartesian(
                    center,
                    center,
                    radius,
                    endAngle
                );


            const end =
                polarToCartesian(
                    center,
                    center,
                    radius,
                    startAngle
                );


            const largeArc =
                endAngle -
                startAngle
                <= 180
                ? 0
                : 1;


            return `

                M
                ${center}
                ${center}

                L
                ${start.x}
                ${start.y}

                A
                ${radius}
                ${radius}
                0
                ${largeArc}
                0
                ${end.x}
                ${end.y}

                Z

            `;

        }


        /*
        =========================
        ساخت گردونه
        =========================
        */

        group.innerHTML = "";


        tools.forEach(
            (tool, index) => {

                /*
                زاویه سگمنت
                */

                const startAngle =
                    index *
                    segmentAngle;


                const endAngle =
                    (index + 1) *
                    segmentAngle;


                const middleAngle =
                    (
                        startAngle +
                        endAngle
                    ) / 2;


                /*
                =========================
                سگمنت
                =========================
                */

                const path =
                    document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "path"
                    );


                path.setAttribute(
                    "d",
                    createSegmentPath(
                        startAngle,
                        endAngle
                    )
                );


                path.setAttribute(
                    "fill",
                    colors[
                        index %
                        colors.length
                    ]
                );


                path.setAttribute(
                    "stroke",
                    "#ffffff18"
                );


                path.setAttribute(
                    "stroke-width",
                    "2"
                );


                group.appendChild(
                    path
                );


                /*
                =========================
                خط جداکننده
                =========================
                */

                const separator =
                    document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "line"
                    );


                const separatorEnd =
                    polarToCartesian(
                        center,
                        center,
                        radius,
                        startAngle
                    );


                separator.setAttribute(
                    "x1",
                    center
                );


                separator.setAttribute(
                    "y1",
                    center
                );


                separator.setAttribute(
                    "x2",
                    separatorEnd.x
                );


                separator.setAttribute(
                    "y2",
                    separatorEnd.y
                );


                separator.setAttribute(
                    "stroke",
                    "#ffffff28"
                );


                separator.setAttribute(
                    "stroke-width",
                    "2"
                );


                group.appendChild(
                    separator
                );


                /*
                =========================
                فاصله متن از مرکز
                =========================
                */

                const textRadius =
                    segmentCount > 16
                    ? 158
                    : segmentCount > 12
                    ? 165
                    : 170;


                const textPoint =
                    polarToCartesian(
                        center,
                        center,
                        textRadius,
                        middleAngle
                    );


                /*
                =========================
                گروه متن
                =========================
                */

                const textGroup =
                    document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "g"
                    );


                /*
                =========================
                جهت نوشته
                =========================
                */

                let textRotation =
                    middleAngle;


                /*
                کاری می‌کنیم نوشته
                وارونه نشود
                */

                if(
                    middleAngle > 90 &&
                    middleAngle < 270
                ){

                    textRotation += 180;

                }


                textGroup.setAttribute(
                    "transform",
                    `
                    rotate(
                        ${textRotation}
                        ${textPoint.x}
                        ${textPoint.y}
                    )
                    `
                );


                /*
                =========================
                آیکون
                =========================
                */

                const icon =
                    document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "text"
                    );


                icon.setAttribute(
                    "x",
                    textPoint.x
                );


                icon.setAttribute(
                    "y",
                    textPoint.y - 12
                );


                icon.setAttribute(
                    "text-anchor",
                    "middle"
                );


                icon.setAttribute(
                    "dominant-baseline",
                    "middle"
                );


                icon.setAttribute(
                    "font-size",
                    segmentCount > 16
                    ? "18"
                    : "22"
                );


                icon.textContent =
                    tool.icon;


                textGroup.appendChild(
                    icon
                );


                /*
                =========================
                نام ابزار
                =========================
                */

                const text =
                    document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "text"
                    );


                text.setAttribute(
                    "x",
                    textPoint.x
                );


                text.setAttribute(
                    "y",
                    textPoint.y + 14
                );


                text.setAttribute(
                    "text-anchor",
                    "middle"
                );


                text.setAttribute(
                    "dominant-baseline",
                    "middle"
                );


                text.setAttribute(
                    "fill",
                    "#ffffff"
                );


                text.setAttribute(
                    "font-size",
                    segmentCount > 16
                    ? "10"
                    : segmentCount > 12
                    ? "11"
                    : "12"
                );


                text.setAttribute(
                    "font-weight",
                    "bold"
                );


                text.setAttribute(
                    "direction",
                    "rtl"
                );


                text.setAttribute(
                    "unicode-bidi",
                    "plaintext"
                );


                text.setAttribute(
                    "style",
                    `
                    paint-order:stroke;
                    stroke:#0008;
                    stroke-width:3px;
                    `
                );


                /*
                اگر اسم خیلی طولانی بود
                دو خطش می‌کنیم
                */

                const words =
                    tool.title
                        .split(" ");


                if(
                    tool.title.length > 13 &&
                    words.length > 1
                ){

                    const firstLine =
                        words
                            .slice(
                                0,
                                Math.ceil(
                                    words.length / 2
                                )
                            )
                            .join(" ");


                    const secondLine =
                        words
                            .slice(
                                Math.ceil(
                                    words.length / 2
                                )
                            )
                            .join(" ");


                    const tspan1 =
                        document.createElementNS(
                            "http://www.w3.org/2000/svg",
                            "tspan"
                        );


                    tspan1.setAttribute(
                        "x",
                        textPoint.x
                    );


                    tspan1.setAttribute(
                        "dy",
                        "0"
                    );


                    tspan1.textContent =
                        firstLine;


                    const tspan2 =
                        document.createElementNS(
                            "http://www.w3.org/2000/svg",
                            "tspan"
                        );


                    tspan2.setAttribute(
                        "x",
                        textPoint.x
                    );


                    tspan2.setAttribute(
                        "dy",
                        "14"
                    );


                    tspan2.textContent =
                        secondLine;


                    text.appendChild(
                        tspan1
                    );


                    text.appendChild(
                        tspan2
                    );

                }

                else{

                    text.textContent =
                        tool.title;

                }


                textGroup.appendChild(
                    text
                );


                group.appendChild(
                    textGroup
                );

            }
        );


        /*
        =========================
        حلقه بیرونی
        =========================
        */

        const outerCircle =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "circle"
            );


        outerCircle.setAttribute(
            "cx",
            center
        );


        outerCircle.setAttribute(
            "cy",
            center
        );


        outerCircle.setAttribute(
            "r",
            radius
        );


        outerCircle.setAttribute(
            "fill",
            "none"
        );


        outerCircle.setAttribute(
            "stroke",
            "#ffffff30"
        );


        outerCircle.setAttribute(
            "stroke-width",
            "6"
        );


        group.appendChild(
            outerCircle
        );


        /*
        =========================
        مرکز گردونه
        =========================
        */

        const centerCircle =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "circle"
            );


        centerCircle.setAttribute(
            "cx",
            center
        );


        centerCircle.setAttribute(
            "cy",
            center
        );


        centerCircle.setAttribute(
            "r",
            "39"
        );


        centerCircle.setAttribute(
            "fill",
            "#0e1621"
        );


        centerCircle.setAttribute(
            "stroke",
            "#ffffff30"
        );


        centerCircle.setAttribute(
            "stroke-width",
            "6"
        );


        group.appendChild(
            centerCircle
        );


        /*
        =========================
        💀 وسط گردونه
        =========================
        */

        const skull =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "text"
            );


        skull.setAttribute(
            "x",
            center
        );


        skull.setAttribute(
            "y",
            center
        );


        skull.setAttribute(
            "text-anchor",
            "middle"
        );


        skull.setAttribute(
            "dominant-baseline",
            "central"
        );


        skull.setAttribute(
            "font-size",
            "31"
        );


        skull.textContent =
            "💀";


        group.appendChild(
            skull
        );


        /*
        =========================
        وضعیت چرخش
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


            spinButton.disabled =
                true;


            spinButton.style.opacity =
                "0.5";


            result.classList.remove(
                "show"
            );


            /*
            =========================
            انتخاب تصادفی
            =========================
            */

            const selectedIndex =
                Math.floor(
                    Math.random() *
                    tools.length
                );


            const selectedTool =
                tools[selectedIndex];


            /*
            =========================
            مرکز سگمنت انتخابی
            =========================
            */

            const selectedCenter =
                (
                    selectedIndex *
                    segmentAngle
                )
                +
                segmentAngle / 2;


            /*
            =========================
            دورهای اضافه
            =========================
            */

            const extraRounds =
                5 +
                Math.floor(
                    Math.random() * 3
                );


            /*
            =========================
            چرخش نهایی
            =========================

            فلش همیشه بالاست.

            */

            const rotation =
                (
                    extraRounds * 360
                )
                -
                selectedCenter;


            currentRotation +=
                rotation;


            svg.style.transform =
                `
                rotate(
                    ${currentRotation}deg
                )
                `;


            /*
            =========================
            پایان انیمیشن
            =========================
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
                                font-size:45px;
                                margin-bottom:8px;
                            "
                        >
                            ${selectedTool.icon}
                        </div>


                        <div
                            style="
                                color:var(--muted);
                                font-size:14px;
                            "
                        >
                            گردونه انتخاب کرد:
                        </div>


                        <div
                            style="
                                font-size:25px;
                                font-weight:bold;
                                margin:12px 0;
                            "
                        >
                            ${escapeToolText(
                                selectedTool.title
                            )}
                        </div>


                        <p>
                            خب... ظاهراً امروز
                            قرعه به نام این یکی افتاد. 💀
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
                    باز کردن ابزار
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

                5700

            );

        };

    }

};


/*
=================================
Escape HTML
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
