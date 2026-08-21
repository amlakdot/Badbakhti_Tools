export default {

    id: "wheel",

    icon: "🎡",

    title: "گردونه بدبختی",

    description:
        "بچرخون ببین امروز کدوم ابزار بدبختی قراره سراغت بیاد.",

    buttonText:
        "بچرخون گردونه 🎡",


    html: `

        <style>

            .wheel-wrapper {

                width: 100%;

                display: flex;

                flex-direction: column;

                align-items: center;

                justify-content: center;

                margin-top: 10px;

                overflow: hidden;

            }


            .wheel-title {

                text-align: center;

                margin-bottom: 25px;

            }


            .wheel-title h3 {

                margin: 0 0 8px;

                font-size: 24px;

            }


            .wheel-title p {

                margin: 0;

                color: var(--muted);

                line-height: 1.8;

                font-size: 14px;

            }


            /*
            =========================
            WHEEL CONTAINER
            =========================
            */

            .wheel-container {

                position: relative;

                width: min(
                    560px,
                    calc(100vw - 50px)
                );

                aspect-ratio: 1 / 1;

                margin:
                    15px auto
                    28px;

                flex-shrink: 0;

            }


            /*
            =========================
            POINTER
            =========================
            */

            .wheel-pointer {

                position: absolute;

                z-index: 30;

                top: -2px;

                left: 50%;

                transform:
                    translateX(-50%);

                width: 0;

                height: 0;

                border-left:
                    17px solid transparent;

                border-right:
                    17px solid transparent;

                border-top:
                    38px solid var(--red);

                filter:
                    drop-shadow(
                        0 5px 8px
                        rgba(0,0,0,.45)
                    );

            }


            .wheel-pointer::after {

                content: "";

                position: absolute;

                top: -38px;

                left: -8px;

                width: 16px;

                height: 16px;

                background:
                    var(--red);

                border-radius: 50%;

            }


            /*
            =========================
            WHEEL
            =========================
            */

            .wheel {

                position: absolute;

                inset: 4px;

                border-radius: 50%;

                overflow: hidden;

                border:
                    6px solid
                    rgba(255,255,255,.14);

                box-shadow:

                    0 18px 50px
                    rgba(0,0,0,.45),

                    inset 0 0 0 2px
                    rgba(255,255,255,.08);

                transform:
                    rotate(0deg);

                transition:
                    transform
                    5.8s
                    cubic-bezier(
                        .12,
                        .72,
                        .08,
                        1
                    );

                background:
                    #182b3d;

            }


            .wheel svg {

                width: 100%;

                height: 100%;

                display: block;

                overflow: visible;

            }


            /*
            =========================
            SEGMENTS
            =========================
            */

            .wheel-segment {

                stroke:
                    rgba(
                        255,
                        255,
                        255,
                        .25
                    );

                stroke-width: 2;

            }


            /*
            =========================
            TEXT
            =========================
            */

            .wheel-label {

                fill: white;

                font-family:
                    Tahoma,
                    Arial,
                    sans-serif;

                font-weight: bold;

                font-size: 21px;

                text-anchor: middle;

                dominant-baseline: middle;

                pointer-events: none;

                paint-order: stroke;

                stroke:
                    rgba(0,0,0,.45);

                stroke-width: 3px;

                stroke-linejoin: round;

            }


            .wheel-icon {

                font-size: 29px;

            }


            /*
            =========================
            CENTER
            =========================
            */

            .wheel-center {

                position: absolute;

                z-index: 20;

                top: 50%;

                left: 50%;

                width: 78px;

                height: 78px;

                transform:
                    translate(
                        -50%,
                        -50%
                    );

                border-radius: 50%;

                display: flex;

                align-items: center;

                justify-content: center;

                background:

                    radial-gradient(
                        circle at 35% 30%,
                        #304b63,
                        #142434 70%
                    );

                border:
                    5px solid
                    rgba(
                        255,
                        255,
                        255,
                        .18
                    );

                box-shadow:

                    0 8px 25px
                    rgba(0,0,0,.5),

                    inset 0 0 20px
                    rgba(
                        255,
                        255,
                        255,
                        .08
                    );

                font-size: 38px;

                user-select: none;

            }


            .wheel-center::after {

                content: "";

                position: absolute;

                inset: -8px;

                border-radius: 50%;

                border:
                    2px solid
                    rgba(
                        255,
                        255,
                        255,
                        .08
                    );

            }


            /*
            =========================
            SPIN BUTTON
            =========================
            */

            .wheel-spin {

                width: 100%;

                padding: 16px;

                border-radius: 17px;

                background:

                    linear-gradient(
                        135deg,
                        var(--pink),
                        #386c9d
                    );

                color: white;

                font-size: 18px;

                font-weight: bold;

                box-shadow:

                    0 10px 30px
                    rgba(
                        43,
                        82,
                        120,
                        .3
                    );

                transition: .2s;

            }


            .wheel-spin:hover {

                transform:
                    translateY(-2px);

                box-shadow:

                    0 14px 35px
                    rgba(
                        43,
                        82,
                        120,
                        .4
                    );

            }


            .wheel-spin:active {

                transform:
                    scale(.98);

            }


            .wheel-spin:disabled {

                opacity: .55;

                cursor:
                    not-allowed;

                transform: none;

            }


            /*
            =========================
            RESULT
            =========================
            */

            .wheel-result {

                width: 100%;

                margin-top: 22px;

                padding: 22px;

                border-radius: 22px;

                background:
                    #ffffff08;

                border:
                    1px solid
                    #ffffff0d;

                text-align: center;

                display: none;

            }


            .wheel-result.show {

                display: block;

                animation:
                    wheelResultAppear
                    .4s
                    ease;

            }


            @keyframes wheelResultAppear {

                from {

                    opacity: 0;

                    transform:
                        translateY(10px)
                        scale(.97);

                }

                to {

                    opacity: 1;

                    transform:
                        translateY(0)
                        scale(1);

                }

            }


            .wheel-result-icon {

                font-size: 48px;

                margin-bottom: 8px;

            }


            .wheel-result-title {

                font-size: 24px;

                font-weight: bold;

                margin-bottom: 8px;

            }


            .wheel-result-text {

                color: var(--muted);

                font-size: 14px;

                line-height: 1.9;

                margin-bottom: 18px;

            }


            .wheel-open {

                width: 100%;

                padding: 14px;

                border-radius: 15px;

                background:
                    var(--pink);

                color: white;

                font-weight: bold;

                font-size: 16px;

            }


            /*
            =========================
            MOBILE
            =========================
            */

            @media(max-width:600px) {

                .wheel-wrapper {

                    width: 100%;

                }


                .wheel-container {

                    width:
                        min(
                            390px,
                            calc(100vw - 44px)
                        );

                    margin-top: 10px;

                    margin-bottom: 24px;

                }


                .wheel {

                    inset: 3px;

                    border-width: 4px;

                }


                .wheel-pointer {

                    border-left-width: 13px;

                    border-right-width: 13px;

                    border-top-width: 31px;

                }


                .wheel-pointer::after {

                    top: -31px;

                    left: -6px;

                    width: 12px;

                    height: 12px;

                }


                .wheel-center {

                    width: 62px;

                    height: 62px;

                    font-size: 30px;

                    border-width: 4px;

                }


                .wheel-label {

                    font-size: 15px;

                    stroke-width: 2.5px;

                }


                .wheel-icon {

                    font-size: 23px;

                }

            }


            @media(max-width:380px) {

                .wheel-container {

                    width:
                        calc(100vw - 34px);

                }


                .wheel-label {

                    font-size: 13px;

                }


                .wheel-icon {

                    font-size: 20px;

                }


                .wheel-center {

                    width: 56px;

                    height: 56px;

                    font-size: 27px;

                }

            }

        </style>


        <h2>
            🎡 گردونه بدبختی
        </h2>


        <p class="desc">
            نمی‌دونی با کدوم ابزار شروع کنی؟
            بذار خود بدبختی برات تصمیم بگیره. 💀
        </p>


        <div class="wheel-wrapper">


            <div class="wheel-title">

                <h3>
                    🎯 شانست رو امتحان کن
                </h3>

                <p>
                    گردونه یکی از ابزارها رو تصادفی برات انتخاب می‌کنه.
                </p>

            </div>


            <div class="wheel-container">

                <div class="wheel-pointer"></div>


                <div
                    class="wheel"
                    id="badbakhtiWheel"
                ></div>


                <div class="wheel-center">
                    💀
                </div>

            </div>


            <button
                class="wheel-spin"
                id="wheelSpinBtn"
            >
                🎡 بچرخون!
            </button>


            <div
                class="wheel-result"
                id="wheelResult"
            ></div>


        </div>

    `,


    init() {

        const wheel =
            document.getElementById(
                "badbakhtiWheel"
            );


        const spinButton =
            document.getElementById(
                "wheelSpinBtn"
            );


        const result =
            document.getElementById(
                "wheelResult"
            );


        if (
            !wheel ||
            !spinButton ||
            !result
        ) {

            return;

        }


        /*
        =========================
        ابزارهای گردونه
        =========================
        */

        const wheelTools = [

            {
                id: "age",
                title: "سن یک بدبخت",
                icon: "🎂"
            },

            {
                id: "badbakhti",
                title: "چقدر بدبختی؟",
                icon: "💀"
            },

            {
                id: "block",
                title: "بلاک شده‌ای؟",
                icon: "🚫"
            },

            {
                id: "brain",
                title: "مغزت چه وضعیه؟",
                icon: "🧠"
            },

            {
                id: "decision",
                title: "تصمیم‌گیر",
                icon: "🤔"
            },

            {
                id: "dice",
                title: "تاس بدبختی",
                icon: "🎲"
            },

            {
                id: "fal",
                title: "فال بدبختی",
                icon: "🔮"
            },

            {
                id: "friend",
                title: "دوست خوب یا بد؟",
                icon: "👥"
            },

            {
                id: "life",
                title: "چقدر وقت داری؟",
                icon: "⏳"
            },

            {
                id: "madrak",
                title: "مدرک بدبختی",
                icon: "📜"
            },

            {
                id: "message",
                title: "بهش پیام بدم؟",
                icon: "💬"
            },

            {
                id: "migration",
                title: "مهاجرت",
                icon: "✈️"
            },

            {
                id: "money",
                title: "پولم چقدر می‌ارزه؟",
                icon: "💸"
            },

            {
                id: "personality",
                title: "شخصیتت چیه؟",
                icon: "🧩"
            },

            {
                id: "phone",
                title: "اعتیاد به گوشی",
                icon: "📱"
            },

            {
                id: "situationship",
                title: "رابطه‌تون چیه؟",
                icon: "❤️"
            },

            {
                id: "sleep",
                title: "الان باید بخوابم؟",
                icon: "😴"
            },

            {
                id: "versus",
                title: "کدومتون بدبخت‌ترید؟",
                icon: "⚔️"
            },

            {
                id: "why-single",
                title: "چرا سینگلی؟",
                icon: "💔"
            }

        ];


        /*
        =========================
        SVG
        =========================
        */

        const size = 1000;

        const center = size / 2;

        const radius = 470;

        const count =
            wheelTools.length;

        const angle =
            360 / count;


        let svg = `

            <svg
                viewBox="
                    0 0
                    ${size}
                    ${size}
                "
                xmlns="
                    http://www.w3.org/2000/svg
                "
            >

                <g>

        `;


        /*
        =========================
        COLORS
        =========================
        */

        const segmentColors = [

            "#2b5278",
            "#23496d",
            "#315f87",
            "#1f405f",
            "#396d96",
            "#274f72"

        ];


        /*
        =========================
        POLAR
        =========================
        */

        function polarToCartesian(
            cx,
            cy,
            r,
            degrees
        ) {

            const radians =
                degrees *
                Math.PI /
                180;


            return {

                x:
                    cx +
                    r *
                    Math.cos(radians),

                y:
                    cy +
                    r *
                    Math.sin(radians)

            };

        }


        /*
        =========================
        ARC
        =========================
        */

        function createArc(
            startAngle,
            endAngle
        ) {

            const start =
                polarToCartesian(
                    center,
                    center,
                    radius,
                    startAngle
                );


            const end =
                polarToCartesian(
                    center,
                    center,
                    radius,
                    endAngle
                );


            const largeArc =
                endAngle - startAngle
                > 180
                ? 1
                : 0;


            return `

                M ${center} ${center}

                L ${start.x} ${start.y}

                A ${radius} ${radius}

                0
                ${largeArc}
                1

                ${end.x}
                ${end.y}

                Z

            `;

        }


        /*
        =========================
        SEGMENTS
        =========================
        */

        wheelTools.forEach(
            (tool, index) => {

                const start =
                    index * angle;


                const end =
                    start + angle;


                /*
                مرکز قطاع
                */

                const middle =
                    start +
                    angle / 2;


                const color =
                    segmentColors[
                        index %
                        segmentColors.length
                    ];


                svg += `

                    <path

                        class="wheel-segment"

                        d="
                            ${createArc(
                                start,
                                end
                            )}
                        "

                        fill="${color}"

                    />

                `;


                /*
                =========================
                متن
                =========================
                */

                const textRadius =
                    radius * .64;


                const textPoint =
                    polarToCartesian(
                        center,
                        center,
                        textRadius,
                        middle
                    );


                /*
                متن در جهت قطاع
                */

                let textRotation =
                    middle;


                /*
                جلوگیری از وارونه شدن متن
                */

                if(
                    textRotation > 90 &&
                    textRotation < 270
                ){

                    textRotation += 180;

                }


                /*
                =========================
                اندازه متن
                =========================

                اندازه بر اساس طول
                عنوان تنظیم می‌شود.

                عنوان کوتاه:
                بزرگ‌تر

                عنوان متوسط:
                متوسط

                عنوان بلند:
                کوچک‌تر
                */

                let title =
                    tool.title;


                let fontSize =
                    21;


                if(
                    title.length >= 18
                ){

                    fontSize =
                        14;

                }

                else if(
                    title.length >= 15
                ){

                    fontSize =
                        15;

                }

                else if(
                    title.length >= 12
                ){

                    fontSize =
                        17;

                }

                else if(
                    title.length >= 9
                ){

                    fontSize =
                        19;

                }


                /*
                =========================
                اندازه ایموجی
                =========================
                */

                const iconSize =
                    Math.max(
                        21,
                        fontSize + 8
                    );


                /*
                =========================
                موقعیت متن
                =========================
                */

                const iconY =
                    -(fontSize * .95);


                const titleY =
                    fontSize * .95;


                /*
                =========================
                ساخت متن
                =========================
                */

                svg += `

                    <g

                        transform="
                            translate(
                                ${textPoint.x},
                                ${textPoint.y}
                            )
                            rotate(
                                ${textRotation}
                            )
                        "

                    >

                        <text

                            class="
                                wheel-label
                                wheel-icon
                            "

                            x="0"

                            y="${iconY}"

                            style="
                                font-size:
                                ${iconSize}px;
                            "

                        >

                            ${tool.icon}

                        </text>


                        <text

                            class="wheel-label"

                            x="0"

                            y="${titleY}"

                            style="
                                font-size:
                                ${fontSize}px;
                            "

                        >

                            ${title}

                        </text>

                    </g>

                `;

            }
        );


        svg += `

                </g>


                <circle

                    cx="${center}"

                    cy="${center}"

                    r="${radius}"

                    fill="none"

                    stroke="
                        rgba(
                            255,
                            255,
                            255,
                            .22
                        )
                    "

                    stroke-width="5"

                />


            </svg>

        `;


        wheel.innerHTML =
            svg;


        /*
        =========================
        ROTATION STATE
        =========================
        */

        let currentRotation = 0;

        let spinning = false;

        let selectedTool = null;


        /*
        =========================
        SPIN
        =========================
        */

        spinButton.onclick = () => {

            if(spinning){

                return;

            }


            spinning = true;

            selectedTool = null;


            result.classList.remove(
                "show"
            );


            spinButton.disabled =
                true;


            spinButton.textContent =
                "💀 داره تصمیم می‌گیره...";


            /*
            =========================
            انتخاب تصادفی
            =========================
            */

            const randomIndex =
                Math.floor(
                    Math.random() *
                    count
                );


            /*
            =========================
            مرکز قطاع انتخاب‌شده
            =========================
            */

            const segmentCenter =
                randomIndex *
                angle +
                angle / 2;


            const pointerAngle =
                -90;


            let requiredRotation =
                pointerAngle -
                segmentCenter;


            /*
            نرمال کردن زاویه
            */

            requiredRotation =
                (
                    requiredRotation
                    % 360
                    + 360
                )
                % 360;


            /*
            =========================
            دورهای اضافه
            =========================
            */

            const extraTurns =
                5 +
                Math.floor(
                    Math.random() * 3
                );


            const finalRotation =

                currentRotation +

                extraTurns * 360 +

                requiredRotation;


            currentRotation =
                finalRotation;


            /*
            =========================
            اجرای چرخش
            =========================
            */

            wheel.style.transform =
                `
                    rotate(
                        ${finalRotation}deg
                    )
                `;


            /*
            =========================
            پایان انیمیشن
            =========================
            */

            setTimeout(() => {

                spinning = false;


                spinButton.disabled =
                    false;


                spinButton.textContent =
                    "🎡 دوباره بچرخون";


                /*
                ابزار واقعی همان قطاع
                */

                selectedTool =
                    wheelTools[
                        randomIndex
                    ];


                /*
                =========================
                نمایش نتیجه
                =========================
                */

                result.innerHTML = `

                    <div
                        class="
                            wheel-result-icon
                        "
                    >

                        ${selectedTool.icon}

                    </div>


                    <div
                        class="
                            wheel-result-title
                        "
                    >

                        ${selectedTool.title}

                    </div>


                    <div
                        class="
                            wheel-result-text
                        "
                    >

                        گردونه تصمیمش رو گرفته! 🎯

                        <br>

                        این ابزار امروز مال توئه.
                        💀

                    </div>


                    <button

                        class="wheel-open"

                        id="
                            wheelOpenTool
                        "

                    >

                        باز کردن ابزار

                        ${selectedTool.icon}

                    </button>

                `;


                result.classList.add(
                    "show"
                );


                /*
                =========================
                OPEN TOOL
                =========================
                */

                const openButton =
                    document.getElementById(
                        "wheelOpenTool"
                    );


                openButton.onclick = () => {

                    const targetButton =
                        document.querySelector(
                            `[data-tool="${selectedTool.id}"]`
                        );


                    if(targetButton){

                        targetButton.click();

                        return;

                    }


                    /*
                    fallback
                    */

                    if(
                        typeof window.openApp ===
                        "function"
                    ){

                        window.openApp(
                            selectedTool.id
                        );

                    }

                };


            }, 5900);

        };

    }

};
