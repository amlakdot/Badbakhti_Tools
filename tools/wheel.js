/*
=========================
SMART TEXT LAYOUT
=========================

اندازه متن بر اساس فضای واقعی
هر قطاع محاسبه می‌شود.
*/

const textRadius =
    radius * .67;


/*
عرض تقریبی قطاع در محل قرارگیری متن

هرچه زاویه قطاع بیشتر باشد،
فضای بیشتری برای متن داریم.
*/

const availableWidth =

    2 *

    textRadius *

    Math.sin(
        (
            angle / 2
        ) *
        Math.PI /
        180
    ) *


    /*
    کمی حاشیه امن
    */

    .88;


/*
=========================
محل متن
=========================
*/

const textPoint =
    polarToCartesian(
        center,
        center,
        textRadius,
        middle
    );


/*
=========================
چرخش متن
=========================
*/

let textRotation =
    middle;


/*
متن در نیمه چپ وارونه نشود
*/

if(
    textRotation > 90 &&
    textRotation < 270
){

    textRotation += 180;

}


/*
=========================
اندازه هوشمند متن
=========================

هر کاراکتر فارسی تقریباً
0.9 برابر font-size فضا می‌گیرد.

بر اساس عرض واقعی قطاع،
بزرگ‌ترین سایز ممکن انتخاب می‌شود.
*/

const title =
    tool.title;


/*
حداکثر سایز متن
*/

const maxFontSize =
    26;


/*
حداقل سایز قابل قبول
*/

const minFontSize =
    11;


/*
محاسبه تقریبی اندازه مناسب
*/

let fontSize =

    availableWidth /

    Math.max(
        title.length * .82,
        1
    );


/*
محدود کردن بین حداقل و حداکثر
*/

fontSize =
    Math.max(

        minFontSize,

        Math.min(
            fontSize,
            maxFontSize
        )

    );


/*
=========================
اندازه ایموجی
=========================
*/

const iconSize =

    Math.min(

        30,

        Math.max(
            18,
            fontSize * 1.45
        )

    );


/*
فاصله ایموجی و متن
*/

const iconY =
    -(
        fontSize * .9
    );


const titleY =
    fontSize * 1.15;


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

        <!-- ICON -->

        <text

            class="wheel-label"

            x="0"

            y="${iconY}"

            style="
                font-size:
                ${iconSize}px;
            "

        >

            ${tool.icon}

        </text>


        <!-- TITLE -->

        <text

            class="wheel-label"

            x="0"

            y="${titleY}"

            style="
                font-size:
                ${fontSize}px;
            "

            textLength="
                ${availableWidth}
            "

            lengthAdjust="
                spacingAndGlyphs
            "

        >

            ${title}

        </text>

    </g>

`;
