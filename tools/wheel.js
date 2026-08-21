import {
    escapeHTML
} from "../js/app.js";


/*
==================================================
   SPIN WHEEL
==================================================

   فقط همین فایل برای گردونه استفاده می‌شود.
   هیچ تغییری در app.js یا style.css لازم نیست.

==================================================
*/


import {
    Wheel
} from "https://cdn.jsdelivr.net/npm/spin-wheel@5.0.2/dist/spin-wheel-esm.js";


export default {

    id: "wheel",

    icon: "🎡",

    title: "گردونه بدبختی",

    description:
        "نمی‌دونی با کدوم ابزار ور بری؟ بذار خود گردونه برات تصمیم بگیره.",

    buttonText:
        "بچرخون 🎡",


    html: `

        <div
            id="badbakhtiWheel"
            style="
                width:100%;
                max-width:650px;
                margin:0 auto;
            "
        >

            <div
                style="
                    text-align:center;
                    margin-bottom:20px;
                "
            >

                <h2
                    style="
                        margin-bottom:8px;
                    "
                >
                    🎡 گردونه بدبختی
                </h2>

                <p
                    class="desc"
                    style="
                        margin:0;
                    "
                >
                    بذار شانس تصمیم بگیره امروز با کدوم ابزار بدبخت بشی.
                </p>

            </div>


            <!-- WHEEL -->

            <div
                id="wheelContainer"
                style="
                    position:relative;
                    width:min(90vw,620px);
                    aspect-ratio:1;
                    margin:25px auto 0;
                "
            >

                <div
                    id="wheelCanvas"
                    style="
                        width:100%;
                        height:100%;
                    "
                ></div>


                <!-- POINTER -->

                <div
                    style="
                        position:absolute;
                        z-index:20;
                        top:-2px;
                        left:50%;
                        transform:translateX(-50%);
                        width:0;
                        height:0;
                        border-left:18px solid transparent;
                        border-right:18px solid transparent;
                        border-top:34px solid var(--red);
                        filter:
                            drop-shadow(
                                0 4px 7px
                                rgba(0,0,0,.45)
                            );
                        pointer-events:none;
                    "
                ></div>


                <!-- CENTER BUTTON -->

                <button
                    id="wheelCenterButton"
                    type="button"
                    style="
                        position:absolute;
                        z-index:30;

                        top:50%;
                        left:50%;

                        transform:
                            translate(-50%,-50%);

                        width:82px;
                        height:82px;

                        border-radius:50%;

                        display:flex;
                        align-items:center;
                        justify-content:center;

                        background:
                            radial-gradient(
                                circle at 35% 30%,
                                #2c4358,
                                #142536
                            );

                        border:
                            5px solid
                            rgba(255,255,255,.16);

                        box-shadow:
                            0 8px 30px
                            rgba(0,0,0,.5),

                            inset
                            0 2px 5px
                            rgba(255,255,255,.12);

                        font-size:36px;

                        cursor:pointer;

                        transition:
                            transform .2s,
                            box-shadow .2s;
                    "
                >
                    💀
                </button>

            </div>


            <!-- SPIN BUTTON -->

            <button
                id="wheelSpinButton"
                class="primary"
                type="button"
                style="
                    max-width:500px;
                    margin:
                        25px auto 0;
                    display:block;
                "
            >
                🎡 بچرخون!
            </button>


            <!-- RESULT -->

            <div
                id="wheelResult"
                class="result"
                style="
                    margin-top:25px;
                "
            ></div>

        </div>

    `,


    init() {


        /*
        ==================================================
           ELEMENTS
        ==================================================
        */


        const wheelContainer =
            document.getElementById(
                "wheelCanvas"
            );


        const spinButton =
            document.getElementById(
                "wheelSpinButton"
            );


        const centerButton =
            document.getElementById(
                "wheelCenterButton"
            );


        const result =
            document.getElementById(
                "wheelResult"
            );


        if(
            !wheelContainer ||
            !spinButton ||
            !centerButton
        ){

            return;

        }



        /*
        ==================================================
           LOAD TOOLS
        ==================================================
        */

        let availableTools = [];


        async function loadWheelTools(){

            try{

                const response =
                    await fetch(
                        "../tools.json",
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


                const modules =
                    await Promise.all(

                        files.map(
                            file =>
                                import(
                                    `../tools/${file}?wheel=${Date.now()}`
                                )
                        )

                    );


                availableTools =
                    modules

                        .map(
                            module =>
                                module.default ||
                                module.tool
                        )

                        .filter(
                            tool =>
                                tool &&
                                tool.id &&
                                tool.id !== "wheel"
                        );


                if(
                    availableTools.length === 0
                ){

                    throw new Error(
                        "No tools found"
                    );

                }


                createWheel();


            }

            catch(error){

                console.error(
                    "Wheel tools error:",
                    error
                );


                wheelContainer.innerHTML = `

                    <div
                        style="
                            height:100%;
                            display:flex;
                            align-items:center;
                            justify-content:center;
                            text-align:center;
                            padding:30px;
                            color:var(--muted);
                        "
                    >

                        ⚠️

                        <br>

                        ابزارها قابل بارگذاری نیستند.

                    </div>

                `;

            }

        }



        /*
        ==================================================
           WHEEL COLORS
        ==================================================
        */


        const wheelColors = [

            "#2b5278",
            "#344f68",
            "#385d78",
            "#29445c",
            "#3b5870",
            "#31536f",
            "#263f55",
            "#42657e"

        ];



        /*
        ==================================================
           CREATE WHEEL
        ==================================================
        */


        let wheel = null;


        function createWheel(){


            const items =
                availableTools.map(
                    (tool,index) => ({

                        label:
                            tool.title || tool.id,

                        backgroundColor:
                            wheelColors[
                                index %
                                wheelColors.length
                            ],

                        labelColor:
                            "#ffffff",

                        value:
                            tool,

                        weight:1

                    })
                );



            wheel = new Wheel(

                wheelContainer,

                {

                    items:items,


                    /*
                    ----------------------------------
                       GENERAL
                    ----------------------------------
                    */

                    radius:0.94,

                    borderWidth:2,

                    borderColor:
                        "rgba(255,255,255,.16)",

                    lineWidth:1.5,

                    lineColor:
                        "rgba(255,255,255,.20)",


                    /*
                    ----------------------------------
                       LABELS
                    ----------------------------------
                    */

                    itemLabelFont:
                        "Tahoma, Arial, sans-serif",

                    itemLabelAlign:
                        "right",

                    itemLabelColors:[
                        "#ffffff"
                    ],

                    itemLabelFontSizeMax:
                        24,

                    itemLabelRadius:
                        0.78,

                    itemLabelRadiusMax:
                        0.34,

                    itemLabelRotation:
                        0,

                    itemLabelBaselineOffset:
                        0,


                    /*
                    ----------------------------------
                       POINTER
                    ----------------------------------
                    */

                    pointerAngle:
                        0,


                    /*
                    ----------------------------------
                       QUALITY
                    ----------------------------------
                    */

                    pixelRatio:
                        window.devicePixelRatio || 1,


                    /*
                    ----------------------------------
                       INTERACTION
                    ----------------------------------
                    */

                    isInteractive:false

                }

            );


            /*
            ----------------------------------
               RESULT AFTER SPIN
            ----------------------------------
            */


            wheel.onRest = event => {

                const index =
                    event.currentIndex;


                const selectedTool =
                    availableTools[index];


                if(!selectedTool){

                    return;

                }


                showWinner(
                    selectedTool
                );

            };


            /*
            ----------------------------------
               PRELOAD READY
            ----------------------------------
            */

            spinButton.disabled = false;

        }



        /*
        ==================================================
           SPIN
        ==================================================
        */


        let spinning = false;


        function spinWheel(){


            if(
                spinning ||
                !wheel ||
                availableTools.length === 0
            ){

                return;

            }


            spinning = true;


            spinButton.disabled = true;


            centerButton.disabled = true;


            result.classList.remove(
                "show"
            );


            result.innerHTML = "";


            /*
            ----------------------------------
               RANDOM TOOL
            ----------------------------------
            */


            const randomIndex =
                Math.floor(
                    Math.random() *
                    availableTools.length
                );


            /*
            ----------------------------------
               SPIN
            ----------------------------------
            */

            wheel.spinToItem(

                randomIndex,

                5000,

                true,

                7,

                1

            );

        }



        /*
        ==================================================
           SHOW WINNER
        ==================================================
        */


        function showWinner(tool){


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
                    گردونه تصمیمش رو گرفت...
                </div>


                <div
                    style="
                        font-size:28px;
                        font-weight:bold;
                        margin:10px 0;
                    "
                >
                    ${escapeHTML(
                        tool.title || tool.id
                    )}
                </div>


                <p
                    style="
                        color:var(--muted);
                        line-height:2;
                    "
                >
                    امروز نوبت این ابزار بدبختیه.
                </p>


                <button
                    id="wheelOpenWinner"
                    class="primary"
                    type="button"
                    style="
                        margin-top:15px;
                    "
                >
                    ${escapeHTML(
                        tool.buttonText ||
                        "بریم سراغش"
                    )}
                </button>

            `;


            result.classList.add(
                "show"
            );


            const openButton =
                document.getElementById(
                    "wheelOpenWinner"
                );


            if(openButton){

                openButton.onclick = () => {

                    openSelectedTool(
                        tool
                    );

                };

            }


            spinning = false;


            spinButton.disabled = false;


            centerButton.disabled = false;

        }



        /*
        ==================================================
           OPEN SELECTED TOOL
        ==================================================
        */


        function openSelectedTool(tool){


            /*
            app.js خودش دکمه ابزار انتخاب‌شده
            را ساخته و listener به آن وصل کرده.

            بنابراین به جای دست زدن به app.js،
            همان دکمه موجود را پیدا می‌کنیم
            و کلیک می‌کنیم.
            */


            const button =
                document.querySelector(
                    `[data-tool="${CSS.escape(tool.id)}"]`
                );


            if(button){

                button.click();

                return;

            }


            /*
            ----------------------------------
               Fallback
            ----------------------------------
            */


            console.warn(
                "Tool button not found:",
                tool.id
            );

        }



        /*
        ==================================================
           BUTTON EVENTS
        ==================================================
        */


        spinButton.onclick =
            spinWheel;


        centerButton.onclick =
            spinWheel;



        /*
        ==================================================
           CENTER BUTTON HOVER
        ==================================================
        */


        centerButton.addEventListener(
            "mouseenter",
            () => {

                if(!spinning){

                    centerButton.style.transform =
                        "translate(-50%,-50%) scale(1.08)";

                    centerButton.style.boxShadow =
                        `
                        0 10px 35px rgba(0,0,0,.55),
                        inset 0 2px 5px rgba(255,255,255,.15)
                        `;

                }

            }
        );


        centerButton.addEventListener(
            "mouseleave",
            () => {

                centerButton.style.transform =
                    "translate(-50%,-50%) scale(1)";

                centerButton.style.boxShadow =
                    `
                    0 8px 30px rgba(0,0,0,.5),
                    inset 0 2px 5px rgba(255,255,255,.12)
                    `;

            }
        );



        /*
        ==================================================
           START
        ==================================================
        */


        spinButton.disabled = true;


        loadWheelTools();

    }

};
