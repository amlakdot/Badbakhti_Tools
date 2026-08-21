import {
    escapeHTML
} from "../js/app.js";


/*
==================================================
   گردونه بدبختی
==================================================
*/


export default {

    id: "wheel",

    icon: "🎡",

    title: "گردونه بدبختی",

    description:
        "نمی‌دونی با کدوم ابزار ور بری؟ بذار گردونه برات تصمیم بگیره.",

    buttonText:
        "بچرخون 🎡",


    html: `

        <div
            id="badbakhtiWheel"
            style="
                width:100%;
                max-width:700px;
                margin:0 auto;
            "
        >

            <h2
                style="
                    text-align:center;
                    margin-top:0;
                "
            >
                🎡 گردونه بدبختی
            </h2>


            <p
                class="desc"
                style="
                    text-align:center;
                "
            >
                بذار شانس تصمیم بگیره امروز با کدوم ابزار بدبخت بشی.
            </p>


            <!--
            ==========================================
                WHEEL AREA
            ==========================================
            -->

            <div
                id="wheelArea"
                style="
                    position:relative;
                    width:min(92vw,620px);
                    aspect-ratio:1;
                    margin:30px auto;
                "
            >

                <!-- گردونه -->

                <canvas
                    id="wheelCanvas"
                    style="
                        display:block;
                        width:100%;
                        height:100%;
                    "
                ></canvas>


                <!-- نشانگر -->

                <div
                    style="
                        position:absolute;
                        z-index:10;

                        top:-4px;
                        left:50%;

                        transform:
                            translateX(-50%);

                        width:0;
                        height:0;

                        border-left:
                            19px solid transparent;

                        border-right:
                            19px solid transparent;

                        border-top:
                            38px solid var(--red);

                        filter:
                            drop-shadow(
                                0 4px 6px
                                rgba(0,0,0,.45)
                            );

                        pointer-events:none;
                    "
                ></div>


                <!--
                ======================================
                    مرکز گردونه
                ======================================
                -->

                <button
                    id="wheelCenter"
                    type="button"
                    aria-label="چرخاندن گردونه"
                    style="
                        position:absolute;

                        z-index:20;

                        top:50%;
                        left:50%;

                        transform:
                            translate(-50%,-50%);

                        width:86px;
                        height:86px;

                        padding:0;

                        border-radius:50%;

                        display:flex;
                        align-items:center;
                        justify-content:center;

                        background:
                            radial-gradient(
                                circle at 35% 30%,
                                #35536d,
                                #142536
                            );

                        border:
                            5px solid
                            rgba(255,255,255,.2);

                        box-shadow:
                            0 8px 30px
                            rgba(0,0,0,.55),

                            inset
                            0 2px 8px
                            rgba(255,255,255,.12);

                        font-size:38px;

                        cursor:pointer;

                        transition:
                            transform .2s,
                            box-shadow .2s;
                    "
                >
                    💀
                </button>

            </div>


            <!--
            ==========================================
                BUTTON
            ==========================================
            -->

            <button
                id="wheelSpin"
                class="primary"
                type="button"
                disabled
            >
                در حال آماده‌سازی گردونه...
            </button>


            <!--
            ==========================================
                RESULT
            ==========================================
            -->

            <div
                id="wheelResult"
                class="result"
            ></div>

        </div>

    `,


    init() {


        /*
        ==========================================
            ELEMENTS
        ==========================================
        */


        const canvas =
            document.getElementById(
                "wheelCanvas"
            );


        const spinButton =
            document.getElementById(
                "wheelSpin"
            );


        const centerButton =
            document.getElementById(
                "wheelCenter"
            );


        const result =
            document.getElementById(
                "wheelResult"
            );


        if(
            !canvas ||
            !spinButton ||
            !centerButton ||
            !result
        ){

            return;

        }


        const ctx =
            canvas.getContext("2d");


        let tools = [];

        let rotation = 0;

        let spinning = false;

        let animationFrame = null;


        /*
        ==========================================
            COLORS
        ==========================================
        */


        const colors = [

            "#2b5278",
            "#315b7c",
            "#284967",
            "#386685",
            "#2d526f",
            "#3d6d8d",
            "#27455e",
            "#426f8d",
            "#31556e",
            "#365f7c"

        ];



        /*
        ==========================================
            LOAD TOOLS
        ==========================================
        */


        async function loadTools(){

            try{

                const response =
                    await fetch(
                        "tools.json",
                        {
                            cache:"no-store"
                        }
                    );


                if(!response.ok){

                    throw new Error(
                        "tools.json not found"
                    );

                }


                const files =
                    await response.json();


                /*
                ----------------------------------
                    تمام ابزارها
                ----------------------------------
                */

                const modules =
                    await Promise.all(

                        files.map(
                            async file => {

                                try{

                                    const module =
                                        await import(
                                            `./tools/${file}?wheel=${Date.now()}`
                                        );

                                    return (
                                        module.default ||
                                        module.tool
                                    );

                                }

                                catch(error){

                                    console.error(
                                        "Wheel tool load error:",
                                        file,
                                        error
                                    );

                                    return null;

                                }

                            }
                        )

                    );


                tools =
                    modules
                        .filter(Boolean)
                        .filter(
                            tool =>
                                tool.id !== "wheel"
                        );


                if(
                    tools.length === 0
                ){

                    throw new Error(
                        "No tools loaded"
                    );

                }


                setupCanvas();


                spinButton.disabled =
                    false;


                spinButton.innerHTML =
                    "🎡 بچرخون!";


                drawWheel();


            }

            catch(error){

                console.error(
                    "Wheel error:",
                    error
                );


                spinButton.disabled =
                    true;


                spinButton.innerHTML =
                    "خطا در بارگذاری گردونه";


                canvas.style.display =
                    "none";


                result.innerHTML = `

                    <p>
                        ابزارها قابل بارگذاری نیستند.
                    </p>

                `;

                result.classList.add(
                    "show"
                );

            }

        }



        /*
        ==========================================
            CANVAS SIZE
        ==========================================
        */


        function setupCanvas(){

            const rect =
                canvas.getBoundingClientRect();


            const size =
                Math.max(
                    300,
                    Math.floor(
                        rect.width
                    )
                );


            const ratio =
                window.devicePixelRatio || 1;


            canvas.width =
                size * ratio;


            canvas.height =
                size * ratio;


            ctx.setTransform(
                ratio,
                0,
                0,
                ratio,
                0,
                0
            );

        }



        /*
        ==========================================
            GET SIZE
        ==========================================
        */


        function getSize(){

            return (
                canvas.clientWidth ||
                500
            );

        }



        /*
        ==========================================
            DRAW WHEEL
        ==========================================
        */


        function drawWheel(){

            if(
                !tools.length
            ){

                return;

            }


            const size =
                getSize();


            const center =
                size / 2;


            const radius =
                size * 0.46;


            ctx.clearRect(
                0,
                0,
                size,
                size
            );


            ctx.save();


            ctx.translate(
                center,
                center
            );


            ctx.rotate(
                rotation
            );


            const slice =
                (
                    Math.PI * 2
                ) /
                tools.length;


            /*
            ----------------------------------
                OUTER SHADOW
            ----------------------------------
            */

            ctx.beginPath();

            ctx.arc(
                0,
                0,
                radius + 4,
                0,
                Math.PI * 2
            );

            ctx.shadowColor =
                "rgba(0,0,0,.5)";

            ctx.shadowBlur =
                25;

            ctx.fillStyle =
                "#101c29";

            ctx.fill();


            ctx.shadowBlur =
                0;



            /*
            ----------------------------------
                SLICES
            ----------------------------------
            */


            tools.forEach(
                (tool,index) => {

                    const start =
                        -Math.PI / 2 +
                        index * slice;


                    const end =
                        start + slice;


                    /*
                    ------------------------------
                        SECTOR
                    ------------------------------
                    */

                    ctx.beginPath();

                    ctx.moveTo(
                        0,
                        0
                    );

                    ctx.arc(
                        0,
                        0,
                        radius,
                        start,
                        end
                    );

                    ctx.closePath();


                    ctx.fillStyle =
                        colors[
                            index %
                            colors.length
                        ];


                    ctx.fill();


                    /*
                    ------------------------------
                        SECTOR BORDER
                    ------------------------------
                    */

                    ctx.strokeStyle =
                        "rgba(255,255,255,.22)";

                    ctx.lineWidth =
                        1.5;

                    ctx.stroke();



                    /*
                    ------------------------------
                        TEXT
                    ------------------------------
                    */


                    drawLabel(
                        tool,
                        index,
                        slice,
                        radius
                    );

                }
            );


            /*
            ----------------------------------
                OUTER BORDER
            ----------------------------------
            */

            ctx.beginPath();

            ctx.arc(
                0,
                0,
                radius,
                0,
                Math.PI * 2
            );

            ctx.strokeStyle =
                "rgba(255,255,255,.28)";

            ctx.lineWidth =
                3;

            ctx.stroke();


            ctx.restore();


            /*
            ----------------------------------
                CENTER RING
            ----------------------------------
            */

            ctx.beginPath();

            ctx.arc(
                center,
                center,
                48,
                0,
                Math.PI * 2
            );

            ctx.strokeStyle =
                "rgba(255,255,255,.16)";

            ctx.lineWidth =
                2;

            ctx.stroke();

        }



        /*
        ==========================================
            DRAW LABEL
        ==========================================
        */


        function drawLabel(
            tool,
            index,
            slice,
            radius
        ){

            const size =
                getSize();


            const center =
                size / 2;


            const middleAngle =
                -Math.PI / 2 +
                index * slice +
                slice / 2;


            /*
            ----------------------------------
                TEXT POSITION
            ----------------------------------
            */

            const textRadius =
                radius * 0.68;


            const x =
                Math.cos(
                    middleAngle
                ) *
                textRadius;


            const y =
                Math.sin(
                    middleAngle
                ) *
                textRadius;


            ctx.save();


            ctx.translate(
                center + x,
                center + y
            );


            /*
            ----------------------------------
                TEXT ROTATION
            ----------------------------------
            */

            let textAngle =
                middleAngle;


            /*
            متن همیشه خوانا باقی می‌ماند
            */

            if(
                textAngle >
                Math.PI / 2 &&
                textAngle <
                Math.PI * 1.5
            ){

                textAngle += Math.PI;

            }


            ctx.rotate(
                textAngle
            );


            /*
            ----------------------------------
                TEXT
            ----------------------------------
            */

            const title =
                tool.title ||
                tool.id;


            const maxWidth =
                Math.max(
                    65,
                    radius *
                    slice *
                    0.82
                );


            let fontSize =
                Math.min(
                    20,
                    Math.max(
                        11,
                        radius *
                        slice *
                        0.23
                    )
                );


            ctx.font =
                `bold ${fontSize}px Tahoma, Arial, sans-serif`;


            ctx.textAlign =
                "center";


            ctx.textBaseline =
                "middle";


            ctx.fillStyle =
                "#ffffff";


            ctx.shadowColor =
                "rgba(0,0,0,.45)";


            ctx.shadowBlur =
                4;


            /*
            ----------------------------------
                WRAP TEXT
            ----------------------------------
            */

            const words =
                String(title)
                    .split(/\s+/);


            const lines = [];

            let line = "";


            words.forEach(
                word => {

                    const test =
                        line
                        ? line + " " + word
                        : word;


                    if(
                        ctx.measureText(
                            test
                        ).width >
                        maxWidth
                    ){

                        if(line){

                            lines.push(
                                line
                            );

                        }

                        line =
                            word;

                    }

                    else{

                        line =
                            test;

                    }

                }
            );


            if(line){

                lines.push(
                    line
                );

            }


            /*
            ----------------------------------
                محدود کردن تعداد خطوط
            ----------------------------------
            */

            const maxLines =
                slice < 0.45
                ? 2
                : 3;


            if(
                lines.length >
                maxLines
            ){

                lines.length =
                    maxLines;


                let last =
                    lines[
                        maxLines - 1
                    ];


                if(
                    last.length > 2
                ){

                    last =
                        last.slice(
                            0,
                            Math.max(
                                1,
                                last.length - 1
                            )
                        ) +
                        "…";

                }


                lines[
                    maxLines - 1
                ] =
                    last;

            }


            const lineHeight =
                fontSize * 1.25;


            const totalHeight =
                lines.length *
                lineHeight;


            lines.forEach(
                (text,lineIndex) => {

                    ctx.fillText(

                        text,

                        0,

                        (
                            lineIndex *
                            lineHeight
                        ) -
                        totalHeight / 2 +
                        lineHeight / 2

                    );

                }
            );


            ctx.restore();

        }



        /*
        ==========================================
            SPIN
        ==========================================
        */


        function spin(){

            if(
                spinning ||
                !tools.length
            ){

                return;

            }


            spinning = true;


            spinButton.disabled =
                true;


            centerButton.disabled =
                true;


            result.classList.remove(
                "show"
            );


            result.innerHTML =
                "";


            /*
            ----------------------------------
                RANDOM WINNER
            ----------------------------------
            */

            const winnerIndex =
                Math.floor(
                    Math.random() *
                    tools.length
                );


            const slice =
                (
                    Math.PI * 2
                ) /
                tools.length;


            /*
            ----------------------------------
                TARGET
            ----------------------------------
            */

            /*
                فلش همیشه بالا قرار دارد.

                مرکز قطاع برنده را به
                بالای گردونه می‌آوریم.
            */

            const currentNormalized =
                (
                    rotation %
                    (Math.PI * 2)
                );


            const targetCenter =
                winnerIndex * slice +
                slice / 2;


            let targetRotation =
                -targetCenter;


            /*
            ----------------------------------
                فاصله چرخش
            ----------------------------------
            */

            let delta =
                targetRotation -
                currentNormalized;


            while(
                delta < 0
            ){

                delta +=
                    Math.PI * 2;

            }


            /*
            حداقل ۶ دور
            */

            const fullTurns =
                6 +
                Math.floor(
                    Math.random() * 3
                );


            const finalRotation =
                rotation +
                delta +
                fullTurns *
                Math.PI *
                2;


            const startRotation =
                rotation;


            const duration =
                5200 +
                Math.random() *
                800;


            const startTime =
                performance.now();


            /*
            ----------------------------------
                EASING
            ----------------------------------
            */

            function easeOut(t){

                return 1 -
                    Math.pow(
                        1 - t,
                        5
                    );

            }



            /*
            ----------------------------------
                ANIMATION
            ----------------------------------
            */

            function animate(
                now
            ){

                const elapsed =
                    now -
                    startTime;


                const progress =
                    Math.min(
                        elapsed /
                        duration,
                        1
                    );


                const eased =
                    easeOut(
                        progress
                    );


                rotation =
                    startRotation +
                    (
                        finalRotation -
                        startRotation
                    ) *
                    eased;


                drawWheel();


                if(
                    progress < 1
                ){

                    animationFrame =
                        requestAnimationFrame(
                            animate
                        );

                }

                else{

                    rotation =
                        finalRotation;


                    drawWheel();


                    finishSpin(
                        winnerIndex
                    );

                }

            }


            animationFrame =
                requestAnimationFrame(
                    animate
                );

        }



        /*
        ==========================================
            FINISH
        ==========================================
        */


        function finishSpin(
            winnerIndex
        ){

            spinning =
                false;


            spinButton.disabled =
                false;


            centerButton.disabled =
                false;


            const tool =
                tools[
                    winnerIndex
                ];


            if(!tool){

                return;

            }


            showResult(
                tool
            );

        }



        /*
        ==========================================
            SHOW RESULT
        ==========================================
        */


        function showResult(
            tool
        ){

            const icon =
                tool.icon ||
                "🧰";


            result.innerHTML = `

                <div
                    style="
                        font-size:48px;
                        margin-bottom:10px;
                    "
                >
                    ${icon}
                </div>


                <div
                    style="
                        color:var(--muted);
                        font-size:14px;
                    "
                >
                    🎯 گردونه انتخاب کرد:
                </div>


                <div
                    style="
                        font-size:28px;
                        font-weight:bold;
                        margin:
                            10px 0
                            15px;
                    "
                >
                    ${escapeHTML(
                        tool.title ||
                        tool.id
                    )}
                </div>


                <p
                    style="
                        color:var(--muted);
                        line-height:2;
                    "
                >
                    دیگه انتخاب با تو نیست.
                    برو ببین این ابزار چه بلایی سرت میاره. 💀
                </p>


                <button
                    id="openWheelTool"
                    class="primary"
                    type="button"
                >
                    ${escapeHTML(
                        tool.buttonText ||
                        "باز کردن ابزار"
                    )}
                </button>

            `;


            result.classList.add(
                "show"
            );


            const openButton =
                document.getElementById(
                    "openWheelTool"
                );


            if(openButton){

                openButton.onclick =
                    () => {

                        openTool(
                            tool
                        );

                    };

            }

        }



        /*
        ==========================================
            OPEN TOOL
        ==========================================
        */


        function openTool(
            tool
        ){

            const buttons =
                document.querySelectorAll(
                    "[data-tool]"
                );


            for(
                const button of buttons
            ){

                if(
                    button.dataset.tool ===
                    tool.id
                ){

                    button.click();

                    return;

                }

            }


            console.warn(
                "Tool button not found:",
                tool.id
            );

        }



        /*
        ==========================================
            EVENTS
        ==========================================
        */


        spinButton.onclick =
            spin;


        centerButton.onclick =
            spin;



        /*
        ==========================================
            CENTER HOVER
        ==========================================
        */


        centerButton.addEventListener(
            "mouseenter",
            () => {

                if(
                    !spinning
                ){

                    centerButton.style.transform =
                        "translate(-50%,-50%) scale(1.08)";

                }

            }
        );


        centerButton.addEventListener(
            "mouseleave",
            () => {

                centerButton.style.transform =
                    "translate(-50%,-50%) scale(1)";

            }
        );



        /*
        ==========================================
            RESIZE
        ==========================================
        */


        let resizeTimer;


        window.addEventListener(
            "resize",
            () => {

                clearTimeout(
                    resizeTimer
                );


                resizeTimer =
                    setTimeout(
                        () => {

                            if(
                                !spinning
                            ){

                                setupCanvas();

                                drawWheel();

                            }

                        },
                        150
                    );

            }
        );



        /*
        ==========================================
            START
        ==========================================
        */


        spinButton.disabled =
            true;


        loadTools();

    }

};
