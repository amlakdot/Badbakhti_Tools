export default {

    id: "wheel",

    icon: "🎡",

    title: "گردونه بدبختی",

    description:
        "بذار شانس تصمیم بگیره امروز کدوم ابزار بدبختی رو باید امتحان کنی.",

    buttonText:
        "چرخوندن گردونه 🎡",


    html: `

        <div
            style="
                text-align:center;
            "
        >

            <h2>
                🎡 گردونه بدبختی
            </h2>

            <p class="desc">
                نمی‌دونی کدوم ابزار رو انتخاب کنی؟
                <br>
                بذار خود گردونه برات تصمیم بگیره. 💀
            </p>


            <div
                id="wheelStatus"
                style="
                    margin:
                        15px
                        0
                        20px;

                    color:
                        var(--muted);

                    font-size:
                        14px;

                    min-height:
                        22px;
                "
            >
                در حال آماده‌سازی گردونه...
            </div>


            <div
                id="wheelStage"
                style="
                    position:relative;

                    width:
                        min(
                            100%,
                            560px
                        );

                    aspect-ratio:
                        1;

                    margin:
                        10px
                        auto
                        25px;

                    display:flex;

                    align-items:center;

                    justify-content:center;
                "
            >

                <!--
                    فلش ثابت انتخاب
                -->

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
                            17px
                            solid
                            transparent;

                        border-right:
                            17px
                            solid
                            transparent;

                        border-top:
                            32px
                            solid
                            var(--red);

                        filter:
                            drop-shadow(
                                0
                                4px
                                8px
                                rgba(
                                    0,
                                    0,
                                    0,
                                    .45
                                )
                            );

                        pointer-events:none;
                    "
                ></div>


                <canvas
                    id="badbakhtiWheel"
                    style="
                        display:block;

                        width:100%;
                        height:100%;

                        border-radius:50%;

                        filter:
                            drop-shadow(
                                0
                                20px
                                40px
                                rgba(
                                    0,
                                    0,
                                    0,
                                    .35
                                )
                            );

                        cursor:pointer;
                    "
                ></canvas>


                <!--
                    حلقه بیرونی
                -->

                <div
                    style="
                        position:absolute;

                        inset:0;

                        border-radius:50%;

                        border:
                            5px
                            solid
                            rgba(
                                255,
                                255,
                                255,
                                .10
                            );

                        pointer-events:none;
                    "
                ></div>

            </div>


            <button
                class="primary"
                id="spinWheelBtn"
                disabled
            >
                آماده‌سازی...
            </button>


            <div
                id="wheelResult"
                class="result"
            ></div>

        </div>

    `,


    init() {

        const canvas =
            document.getElementById(
                "badbakhtiWheel"
            );


        const button =
            document.getElementById(
                "spinWheelBtn"
            );


        const status =
            document.getElementById(
                "wheelStatus"
            );


        const result =
            document.getElementById(
                "wheelResult"
            );


        if(
            !canvas ||
            !button
        ){
            return;
        }


        const ctx =
            canvas.getContext(
                "2d"
            );


        if(!ctx){

            status.textContent =
                "مرورگرت از Canvas پشتیبانی نمی‌کند.";

            return;

        }


        /*
        =================================
        تنظیمات
        =================================
        */

        const TAU =
            Math.PI * 2;


        let items = [];


        let rotation = 0;


        let spinning = false;


        let animationFrame = null;


        let audioContext = null;


        let lastSegment = -1;


        let cssSize = 0;


        /*
        =================================
        گرفتن ابزارها
        =================================

        ابزارها مستقیماً از همان
        tools.json پروژه خوانده می‌شوند.

        wheel.js خودش دوباره import نمی‌شود
        تا حلقه import ایجاد نشود.
        =================================
        */


        async function loadWheelItems(){

            try{

                const response =
                    await fetch(
                        "../tools.json",
                        {
                            cache:
                                "no-store"
                        }
                    );


                if(!response.ok){

                    throw new Error(
                        "tools.json not found"
                    );

                }


                const files =
                    await response.json();


                const wheelFiles =
                    files.filter(
                        file => {

                            const clean =
                                String(file)
                                    .split("?")[0]
                                    .toLowerCase();

                            return (
                                clean !==
                                "wheel.js"
                            );

                        }
                    );


                const modules =
                    await Promise.all(

                        wheelFiles.map(
                            async file => {

                                try{

                                    const module =
                                        await import(
                                            `../tools/${file}?wheel=${Date.now()}`
                                        );

                                    return (
                                        module.default ||
                                        module.tool ||
                                        null
                                    );

                                }

                                catch(error){

                                    console.warn(
                                        "Wheel could not load:",
                                        file,
                                        error
                                    );

                                    return null;

                                }

                            }
                        )

                    );


                items =
                    modules
                        .filter(Boolean)
                        .filter(
                            tool =>
                                tool.id &&
                                tool.title
                        );


                if(
                    items.length <
                    2
                ){

                    throw new Error(
                        "Not enough tools"
                    );

                }


                drawWheel();


                status.textContent =
                    `${persianNumber(items.length)} ابزار آماده‌ان؛ ببینیم قرعه به نام کدوم بدبخت می‌افته. 💀`;


                button.disabled =
                    false;


                button.textContent =
                    "چرخوندن گردونه 🎡";


            }

            catch(error){

                console.error(
                    "Wheel error:",
                    error
                );


                status.textContent =
                    "خطا در بارگذاری گردونه";


                result.innerHTML = `

                    <div
                        class="big"
                    >
                        💀
                    </div>

                    <h3>
                        خطا در بارگذاری گردونه
                    </h3>

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
        =================================
        Canvas Size
        =================================
        */

        function resizeCanvas(){

            const rect =
                canvas.getBoundingClientRect();


            cssSize =
                Math.max(
                    260,
                    Math.floor(
                        rect.width
                    )
                );


            const dpr =
                Math.min(
                    window.devicePixelRatio ||
                    1,
                    2
                );


            canvas.width =
                cssSize * dpr;


            canvas.height =
                cssSize * dpr;


            ctx.setTransform(
                dpr,
                0,
                0,
                dpr,
                0,
                0
            );


            drawWheel();

        }


        /*
        =================================
        رنگ‌های گردونه
        =================================
        */

        const colors = [

            "#2b5278",
            "#304f70",
            "#355a7c",
            "#3b6488",
            "#416d91",
            "#37617f",
            "#31566f",
            "#294c65",
            "#3d607b",
            "#466c88",
            "#345b78",
            "#3e6680"

        ];


        /*
        =================================
        شکستن متن
        =================================
        */

        function wrapText(
            text,
            maxWidth,
            font
        ){

            ctx.font = font;


            const words =
                String(text)
                    .trim()
                    .split(/\s+/);


            const lines = [];


            let current = "";


            for(
                const word of words
            ){

                const test =
                    current
                    ? current + " " + word
                    : word;


                if(
                    ctx.measureText(
                        test
                    ).width <= maxWidth
                ){

                    current =
                        test;

                }

                else{

                    if(current){

                        lines.push(
                            current
                        );

                    }

                    current =
                        word;

                }

            }


            if(current){

                lines.push(
                    current
                );

            }


            return lines;

        }


        /*
        =================================
        متن داخل هر سگمنت
        =================================
        */

        function drawSegmentText(
            item,
            index,
            center,
            radius,
            segmentAngle
        ){

            const startAngle =
                -Math.PI / 2 +
                index *
                segmentAngle;


            const middleAngle =
                startAngle +
                segmentAngle / 2;


            ctx.save();


            ctx.translate(
                center,
                center
            );


            ctx.rotate(
                middleAngle
            );


            /*
            متن در قسمت بیرونی
            و داخل محدوده خودش
            */

            const textRadius =
                radius * 0.66;


            ctx.translate(
                textRadius,
                0
            );


            /*
            متن را نسبت به شعاع
            خوانا نگه می‌داریم.
            */

            let textAngle =
                middleAngle;


            /*
            برای نیمه چپ گردونه
            متن برعکس نشود.
            */

            const normalized =
                (
                    middleAngle +
                    Math.PI * 2
                ) %
                (Math.PI * 2);


            if(
                normalized >
                Math.PI / 2 &&
                normalized <
                Math.PI * 1.5
            ){

                ctx.rotate(
                    Math.PI
                );

            }


            const segmentWidth =
                Math.max(
                    42,
                    radius *
                    segmentAngle *
                    0.72
                );


            let fontSize;


            if(
                items.length <= 8
            ){

                fontSize = 17;

            }

            else if(
                items.length <= 12
            ){

                fontSize = 14;

            }

            else if(
                items.length <= 16
            ){

                fontSize = 12;

            }

            else{

                fontSize = 10;

            }


            const font =
                `bold ${fontSize}px Tahoma, Arial, sans-serif`;


            const lines =
                wrapText(
                    item.title,
                    segmentWidth,
                    font
                );


            const maxLines =
                items.length > 14
                ? 2
                : 3;


            const visibleLines =
                lines.slice(
                    0,
                    maxLines
                );


            if(
                lines.length >
                maxLines &&
                visibleLines.length
            ){

                visibleLines[
                    visibleLines.length - 1
                ] += "…";

            }


            ctx.font =
                font;


            ctx.textAlign =
                "center";


            ctx.textBaseline =
                "middle";


            /*
            سایه برای خوانایی
            */

            ctx.shadowColor =
                "rgba(0,0,0,.45)";

            ctx.shadowBlur =
                5;

            ctx.shadowOffsetY =
                2;


            ctx.fillStyle =
                "#ffffff";


            const lineHeight =
                fontSize *
                1.25;


            const totalHeight =
                visibleLines.length *
                lineHeight;


            visibleLines.forEach(
                (line, lineIndex) => {

                    const y =
                        (
                            lineIndex *
                            lineHeight
                        ) -
                        (
                            totalHeight -
                            lineHeight
                        ) / 2;


                    ctx.fillText(
                        line,
                        0,
                        y
                    );

                }
            );


            ctx.restore();

        }


        /*
        =================================
        رسم کامل گردونه
        =================================
        */

        function drawWheel(){

            if(
                !items.length ||
                !cssSize
            ){

                return;

            }


            const center =
                cssSize / 2;


            const radius =
                center - 7;


            const segmentAngle =
                TAU /
                items.length;


            ctx.clearRect(
                0,
                0,
                cssSize,
                cssSize
            );


            ctx.save();


            /*
            خود گردونه می‌چرخد
            */

            ctx.translate(
                center,
                center
            );


            ctx.rotate(
                rotation
            );


            ctx.translate(
                -center,
                -center
            );


            /*
            سایه داخلی
            */

            ctx.beginPath();

            ctx.arc(
                center,
                center,
                radius,
                0,
                TAU
            );

            ctx.fillStyle =
                "#101c28";

            ctx.fill();


            /*
            سگمنت‌ها
            */

            for(
                let i = 0;
                i < items.length;
                i++
            ){

                const startAngle =
                    -Math.PI / 2 +
                    i *
                    segmentAngle;


                const endAngle =
                    startAngle +
                    segmentAngle;


                /*
                بخش رنگی
                */

                ctx.beginPath();

                ctx.moveTo(
                    center,
                    center
                );

                ctx.arc(
                    center,
                    center,
                    radius,
                    startAngle,
                    endAngle
                );

                ctx.closePath();


                ctx.fillStyle =
                    colors[
                        i %
                        colors.length
                    ];


                ctx.fill();


                /*
                خط جداکننده
                */

                ctx.beginPath();

                ctx.moveTo(
                    center,
                    center
                );

                ctx.lineTo(
                    center +
                    Math.cos(
                        startAngle
                    ) *
                    radius,

                    center +
                    Math.sin(
                        startAngle
                    ) *
                    radius
                );


                ctx.strokeStyle =
                    "rgba(255,255,255,.16)";


                ctx.lineWidth =
                    2;


                ctx.stroke();


                /*
                متن
                */

                drawSegmentText(
                    items[i],
                    i,
                    center,
                    radius,
                    segmentAngle
                );

            }


            /*
            حلقه داخلی
            */

            ctx.beginPath();

            ctx.arc(
                center,
                center,
                radius * 0.23,
                0,
                TAU
            );


            ctx.fillStyle =
                "#142536";


            ctx.fill();


            ctx.strokeStyle =
                "rgba(255,255,255,.18)";


            ctx.lineWidth =
                3;


            ctx.stroke();


            /*
            حلقه تزئینی داخلی
            */

            ctx.beginPath();

            ctx.arc(
                center,
                center,
                radius * 0.29,
                0,
                TAU
            );


            ctx.strokeStyle =
                "rgba(255,255,255,.08)";


            ctx.lineWidth =
                2;


            ctx.stroke();


            /*
            💀 وسط گردونه

            چون روی Canvas کشیده می‌شود،
            همراه خود گردونه می‌چرخد.
            */

            ctx.font =
                `${Math.floor(
                    radius * 0.16
                )}px "Segoe UI Emoji", "Apple Color Emoji", sans-serif`;


            ctx.textAlign =
                "center";


            ctx.textBaseline =
                "middle";


            ctx.shadowColor =
                "rgba(0,0,0,.5)";


            ctx.shadowBlur =
                8;


            ctx.fillText(
                "💀",
                center,
                center
            );


            ctx.restore();


            /*
            حلقه بیرونی روشن
            */

            ctx.beginPath();

            ctx.arc(
                center,
                center,
                radius,
                0,
                TAU
            );


            ctx.strokeStyle =
                "rgba(255,255,255,.20)";


            ctx.lineWidth =
                5;


            ctx.stroke();

        }


        /*
        =================================
        Audio
        =================================
        */

        function createAudio(){

            try{

                if(!audioContext){

                    audioContext =
                        new (
                            window.AudioContext ||
                            window.webkitAudioContext
                        )();

                }


                if(
                    audioContext.state ===
                    "suspended"
                ){

                    audioContext.resume();

                }

            }

            catch(error){

                audioContext =
                    null;

            }

        }


        function tick(){

            if(!audioContext){

                return;

            }


            try{

                const now =
                    audioContext.currentTime;


                const oscillator =
                    audioContext.createOscillator();


                const gain =
                    audioContext.createGain();


                oscillator.type =
                    "sine";


                oscillator.frequency.setValueAtTime(
                    720,
                    now
                );


                oscillator.frequency.exponentialRampToValueAtTime(
                    420,
                    now + 0.035
                );


                gain.gain.setValueAtTime(
                    0.055,
                    now
                );


                gain.gain.exponentialRampToValueAtTime(
                    0.001,
                    now + 0.045
                );


                oscillator.connect(
                    gain
                );


                gain.connect(
                    audioContext.destination
                );


                oscillator.start(
                    now
                );


                oscillator.stop(
                    now + 0.05
                );

            }

            catch(error){

                // صدا اختیاری است؛
                // نباید باعث خرابی گردونه شود.

            }

        }


        /*
        =================================
        مشخص کردن سگمنت زیر فلش
        =================================
        */

        function getSelectedIndex(){

            const segmentAngle =
                TAU /
                items.length;


            /*
            فلش در زاویه
            -PI/2 قرار دارد.

            چون گردونه rotation دارد،
            زاویه مربوط به نقطه فلش
            را به سیستم مختصات گردونه
            برمی‌گردانیم.
            */

            let angle =
                (
                    -Math.PI / 2 -
                    rotation +
                    TAU
                ) % TAU;


            angle =
                (
                    angle +
                    Math.PI / 2
                ) % TAU;


            return Math.floor(
                angle /
                segmentAngle
            ) % items.length;

        }


        /*
        =================================
        Ease Out Quart
        =================================
        */

        function easeOutQuart(t){

            return 1 -
                Math.pow(
                    1 - t,
                    4
                );

        }


        /*
        =================================
        Spin
        =================================
        */

        function spin(){

            if(
                spinning ||
                items.length < 2
            ){

                return;

            }


            createAudio();


            spinning =
                true;


            button.disabled =
                true;


            result.classList.remove(
                "show"
            );


            result.innerHTML =
                "";


            status.textContent =
                "گردونه داره تصمیم می‌گیره... 💀";


            /*
            نتیجه از قبل مشخص می‌شود.

            انیمیشن فقط وظیفه دارد
            گردونه را به آن نتیجه برساند.
            */

            const winnerIndex =
                Math.floor(
                    Math.random() *
                    items.length
                );


            const segmentAngle =
                TAU /
                items.length;


            /*
            مرکز سگمنت برنده
            */

            const winnerCenter =
                winnerIndex *
                segmentAngle +
                segmentAngle / 2;


            /*
            فلش در -PI/2 است.

            باید winnerCenter را
            دقیقاً زیر فلش قرار دهیم.
            */

            const targetBase =
                -Math.PI / 2 -
                winnerCenter;


            const currentNormalized =
                (
                    rotation %
                    TAU +
                    TAU
                ) % TAU;


            let targetNormalized =
                (
                    targetBase %
                    TAU +
                    TAU
                ) % TAU;


            let delta =
                targetNormalized -
                currentNormalized;


            if(
                delta < 0
            ){

                delta += TAU;

            }


            /*
            چند دور کامل اضافه
            */

            const fullTurns =
                5 +
                Math.floor(
                    Math.random() * 2
                );


            /*
            کمی offset تصادفی
            داخل همان سگمنت.

            این باعث می‌شود همیشه
            دقیقاً وسط سگمنت نایستد.
            */

            const safeMargin =
                segmentAngle *
                0.18;


            const randomOffset =
                (
                    Math.random() *
                    (
                        segmentAngle -
                        safeMargin * 2
                    )
                ) -
                (
                    segmentAngle -
                    safeMargin * 2
                ) / 2;


            const targetRotation =
                rotation +
                delta +
                fullTurns * TAU +
                randomOffset;


            const startRotation =
                rotation;


            const duration =
                4800 +
                Math.random() *
                900;


            const startTime =
                performance.now();


            lastSegment =
                getSelectedIndex();


            function animate(now){

                if(!spinning){

                    return;

                }


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
                    easeOutQuart(
                        progress
                    );


                rotation =
                    startRotation +
                    (
                        targetRotation -
                        startRotation
                    ) *
                    eased;


                drawWheel();


                /*
                صدای عبور از هر سگمنت
                */

                const currentSegment =
                    getSelectedIndex();


                if(
                    currentSegment !==
                    lastSegment
                ){

                    tick();


                    lastSegment =
                        currentSegment;

                }


                if(
                    progress < 1
                ){

                    animationFrame =
                        requestAnimationFrame(
                            animate
                        );

                    return;

                }


                /*
                پایان
                */

                rotation =
                    targetRotation;


                drawWheel();


                spinning =
                    false;


                button.disabled =
                    false;


                button.textContent =
                    "دوباره بچرخون 🎡";


                /*
                نتیجه واقعی همان نتیجه‌ای است
                که قبل از انیمیشن انتخاب شده بود.
                */

                showWinner(
                    items[winnerIndex]
                );

            }


            animationFrame =
                requestAnimationFrame(
                    animate
                );

        }


        /*
        =================================
        نمایش برنده
        =================================
        */

        function showWinner(
            winner
        ){

            if(!winner){

                return;

            }


            status.textContent =
                "گردونه تصمیمش رو گرفت. 💀";


            result.innerHTML = `

                <div
                    class="big"
                >
                    ${winner.icon || "🧰"}
                </div>


                <h2>
                    انتخاب شد:
                </h2>


                <div
                    style="
                        font-size:26px;
                        font-weight:bold;
                        margin:15px 0;
                    "
                >
                    ${escapeHTML(
                        winner.title
                    )}
                </div>


                <p>
                    خب...
                    دیگه انتخاب با تو نیست. 😐
                </p>


                <button
                    class="primary"
                    id="openWheelWinner"
                >
                    ${escapeHTML(
                        winner.buttonText ||
                        "باز کردن ابزار"
                    )}
                </button>

            `;


            result.classList.add(
                "show"
            );


            const openButton =
                document.getElementById(
                    "openWheelWinner"
                );


            if(openButton){

                openButton.onclick =
                    () => {

                        openSelectedTool(
                            winner.id
                        );

                    };

            }

        }


        /*
        =================================
        باز کردن ابزار انتخاب‌شده
        =================================

        openApp در app.js export نشده.
        بنابراین از همان دکمه واقعی ابزار
        استفاده می‌کنیم.

        اینطوری هیچ تغییری در app.js
        لازم نیست.
        =================================
        */

        function openSelectedTool(
            id
        ){

            const backButton =
                document.getElementById(
                    "backButton"
                );


            /*
            اول از ابزار فعلی خارج شو
            تا Home دوباره نمایش داده شود.
            */

            if(backButton){

                backButton.click();

            }


            /*
            بعد دکمه همان ابزار را
            پیدا و کلیک کن.
            */

            setTimeout(
                () => {

                    const selector =
                        `[data-tool="${cssEscape(id)}"]`;


                    const toolButton =
                        document.querySelector(
                            selector
                        );


                    if(toolButton){

                        toolButton.click();

                    }

                },
                80
            );

        }


        /*
        =================================
        CSS Escape
        =================================
        */

        function cssEscape(
            value
        ){

            if(
                window.CSS &&
                typeof window.CSS.escape ===
                "function"
            ){

                return window.CSS.escape(
                    String(value)
                );

            }


            return String(value)
                .replace(
                    /["\\]/g,
                    "\\$&"
                );

        }


        /*
        =================================
        HTML Escape
        =================================
        */

        function escapeHTML(
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


        /*
        =================================
        اعداد فارسی
        =================================
        */

        function persianNumber(
            value
        ){

            return String(value)

                .replace(
                    /0/g,
                    "۰"
                )

                .replace(
                    /1/g,
                    "۱"
                )

                .replace(
                    /2/g,
                    "۲"
                )

                .replace(
                    /3/g,
                    "۳"
                )

                .replace(
                    /4/g,
                    "۴"
                )

                .replace(
                    /5/g,
                    "۵"
                )

                .replace(
                    /6/g,
                    "۶"
                )

                .replace(
                    /7/g,
                    "۷"
                )

                .replace(
                    /8/g,
                    "۸"
                )

                .replace(
                    /9/g,
                    "۹"
                );

        }


        /*
        =================================
        Events
        =================================
        */

        button.addEventListener(
            "click",
            spin
        );


        canvas.addEventListener(
            "click",
            () => {

                if(
                    !spinning &&
                    !button.disabled
                ){

                    spin();

                }

            }
        );


        /*
        =================================
        Resize
        =================================
        */

        const resizeObserver =
            new ResizeObserver(
                () => {

                    resizeCanvas();

                }
            );


        resizeObserver.observe(
            canvas
        );


        /*
        =================================
        شروع
        =================================
        */

        requestAnimationFrame(
            () => {

                resizeCanvas();

                loadWheelItems();

            }
        );

    }

};
