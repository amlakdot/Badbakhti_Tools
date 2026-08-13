import {
    showResult
} from "../js/app.js";


export default {


    id:"age",


    icon:"🎂",


    title:"سن یک بدبخت",


    description:
        "تاریخ تولدت رو انتخاب کن ببین چند ساله داری این زندگی رو تحمل می‌کنی. 😂",


    buttonText:
        "محاسبه سن بدبختی 🎂",



    html:`

        <h2>
            🎂 محاسبه سن یک بدبخت
        </h2>


        <p class="desc">
            تاریخ تولدت رو انتخاب کن تا ببینیم چند ساله داری دوام میاری. 💀
        </p>


        <div
            class="age-date-picker"
            style="
                display:grid;
                grid-template-columns:
                1fr 1.5fr 1.2fr;
                gap:10px;
                margin-top:20px;
            "
        >

            <select id="ageDay">

                <option value="">
                    روز
                </option>

            </select>


            <select id="ageMonth">

                <option value="">
                    ماه
                </option>

                <option value="1">
                    فروردین
                </option>

                <option value="2">
                    اردیبهشت
                </option>

                <option value="3">
                    خرداد
                </option>

                <option value="4">
                    تیر
                </option>

                <option value="5">
                    مرداد
                </option>

                <option value="6">
                    شهریور
                </option>

                <option value="7">
                    مهر
                </option>

                <option value="8">
                    آبان
                </option>

                <option value="9">
                    آذر
                </option>

                <option value="10">
                    دی
                </option>

                <option value="11">
                    بهمن
                </option>

                <option value="12">
                    اسفند
                </option>

            </select>


            <select id="ageYear">

                <option value="">
                    سال
                </option>

            </select>

        </div>


        <button
            class="primary"
            id="ageBtn"
        >
            محاسبه بدبختی 🎂
        </button>


        <div
            id="ageResult"
            class="result"
        ></div>

    `,



    init(){


        const daySelect =
            document.getElementById(
                "ageDay"
            );


        const monthSelect =
            document.getElementById(
                "ageMonth"
            );


        const yearSelect =
            document.getElementById(
                "ageYear"
            );



        /*
        =========================
        روزها
        =========================
        */

        for(
            let day = 1;
            day <= 31;
            day++
        ){

            daySelect.innerHTML += `

                <option value="${day}">
                    ${persianNumber(day)}
                </option>

            `;

        }



        /*
        =========================
        سال‌ها
        =========================
        */

        const today =
            new Date();


        const todayJalali =
            gregorianToJalali(
                today.getFullYear(),
                today.getMonth() + 1,
                today.getDate()
            );


        const currentJalaliYear =
            todayJalali[0];



        for(
            let year = currentJalaliYear;
            year >= 1300;
            year--
        ){

            yearSelect.innerHTML += `

                <option value="${year}">
                    ${persianNumber(year)}
                </option>

            `;

        }



        /*
        =========================
        تغییر ماه
        =========================
        */

        monthSelect.onchange =
        updateDays;



        yearSelect.onchange =
        updateDays;



        /*
        =========================
        دکمه
        =========================
        */

        document
        .getElementById(
            "ageBtn"
        )
        .onclick = calculateAge;



        function updateDays(){


            const month =
                Number(
                    monthSelect.value
                );


            const year =
                Number(
                    yearSelect.value
                );



            if(!month){

                return;

            }



            let maxDays;



            if(month <= 6){

                maxDays = 31;

            }

            else if(month <= 11){

                maxDays = 30;

            }

            else{

                maxDays =
                    isJalaliLeap(year)
                    ? 30
                    : 29;

            }



            const currentDay =
                Number(
                    daySelect.value
                );



            daySelect.innerHTML = `

                <option value="">
                    روز
                </option>

            `;



            for(
                let day = 1;
                day <= maxDays;
                day++
            ){

                daySelect.innerHTML += `

                    <option
                        value="${day}"
                        ${
                            day === currentDay
                            ? "selected"
                            : ""
                        }
                    >
                        ${persianNumber(day)}
                    </option>

                `;

            }

        }



        /*
        =========================
        محاسبه سن
        =========================
        */

        function calculateAge(){


            const jy =
                Number(
                    yearSelect.value
                );


            const jm =
                Number(
                    monthSelect.value
                );


            const jd =
                Number(
                    daySelect.value
                );



            if(
                !jy ||
                !jm ||
                !jd
            ){

                alert(
                    "روز، ماه و سال تولدت رو انتخاب کن بدبخت. 😂"
                );

                return;

            }



            /*
            =========================
            بررسی تاریخ
            =========================
            */

            const maxDays =
                getJalaliMonthDays(
                    jy,
                    jm
                );


            if(
                jd > maxDays
            ){

                alert(
                    "این تاریخ وجود نداره بدبخت. 😂"
                );

                return;

            }



            /*
            =========================
            تبدیل به میلادی
            =========================
            */

            const gregorian =
                jalaliToGregorian(
                    jy,
                    jm,
                    jd
                );



            const birth =
                new Date(
                    gregorian[0],
                    gregorian[1] - 1,
                    gregorian[2]
                );



            const now =
                new Date();



            /*
            =========================
            تاریخ آینده
            =========================
            */

            if(
                birth > now
            ){

                alert(
                    "داداش هنوز به دنیا نیومدی! 😂"
                );

                return;

            }



            /*
            =========================
            سن دقیق
            =========================
            */

            let years =
                now.getFullYear()
                -
                birth.getFullYear();


            let months =
                now.getMonth()
                -
                birth.getMonth();


            let days =
                now.getDate()
                -
                birth.getDate();



            if(days < 0){

                months--;


                const previousMonthDays =
                    new Date(
                        now.getFullYear(),
                        now.getMonth(),
                        0
                    )
                    .getDate();


                days +=
                    previousMonthDays;

            }



            if(months < 0){

                years--;

                months += 12;

            }



            /*
            =========================
            تولد بعدی
            =========================
            */

            let nextBirthdayYear =
                now.getFullYear();


            let nextBirthday =
                new Date(
                    nextBirthdayYear,
                    birth.getMonth(),
                    birth.getDate()
                );



            if(
                nextBirthday < now
            ){

                nextBirthday =
                    new Date(
                        nextBirthdayYear + 1,
                        birth.getMonth(),
                        birth.getDate()
                    );

            }



            const remainingDays =
                Math.ceil(
                    (
                        nextBirthday - now
                    )
                    /
                    86400000
                );



            /*
            =========================
            تبدیل تاریخ میلادی
            =========================
            */

            const europeanDate =

                String(
                    gregorian[2]
                ).padStart(2,"0")

                +

                "/"

                +

                String(
                    gregorian[1]
                ).padStart(2,"0")

                +

                "/"

                +

                gregorian[0];



            /*
            =========================
            روز هفته
            =========================
            */

            const weekDays = [

                "یکشنبه",
                "دوشنبه",
                "سه‌شنبه",
                "چهارشنبه",
                "پنجشنبه",
                "جمعه",
                "شنبه"

            ];


            const birthWeekDay =
                weekDays[
                    birth.getDay()
                ];



            /*
            =========================
            حیوان سال
            =========================
            */

            const animal =
                getChineseAnimal(
                    jy
                );



            /*
            =========================
            تعداد روزهای زندگی
            =========================
            */

            const totalDays =
                Math.floor(
                    (
                        now - birth
                    )
                    /
                    86400000
                );



            /*
            =========================
            نمایش نتیجه
            =========================
            */

            showResult(

                "ageResult",


                `


                <div
                    class="big"
                >
                    🎂
                </div>



                <h2>
                    تو یک بدبختی که...
                </h2>



                <div
                    style="
                        font-size:24px;
                        font-weight:bold;
                        line-height:2;
                    "
                >

                    ${persianNumber(years)}
                    سال،

                    ${persianNumber(months)}
                    ماه،

                    ${persianNumber(days)}
                    روز

                </div>



                <p>
                    از این زندگی گذشته
                    و هنوز somehow زنده‌ای. 💀
                </p>



                <div
                    style="
                        margin-top:20px;
                        padding:20px;
                        background:#ffffff08;
                        border-radius:18px;
                    "
                >

                    🌍 اگه تو اروپا به دنیا میومدی:

                    <br><br>

                    <strong
                        style="
                            font-size:23px;
                            direction:ltr;
                            display:inline-block;
                        "
                    >
                        ${europeanDate}
                    </strong>

                    <br><br>

                    یعنی

                    <b>
                        ${birthWeekDay}
                    </b>

                    به دنیا اومدی.

                </div>



                <div
                    style="
                        margin-top:20px;
                        padding:20px;
                        background:#ffffff08;
                        border-radius:18px;
                    "
                >

                    ⏳ تا تولدت:

                    <br><br>

                    <strong
                        style="
                            font-size:30px;
                        "
                    >
                        ${persianNumber(remainingDays)}
                    </strong>

                    روز

                    <br><br>

                    مونده بدبخت. 😂

                </div>



                <div
                    style="
                        margin-top:20px;
                        padding:20px;
                        background:#ffffff08;
                        border-radius:18px;
                    "
                >

                    🐴 تو متولد سال:

                    <h2
                        style="
                            margin-bottom:0;
                        "
                    >
                        ${animal}
                    </h2>

                </div>



                <div
                    style="
                        margin-top:20px;
                        padding:20px;
                        background:#ffffff08;
                        border-radius:18px;
                    "
                >

                    🫠 در مجموع حدود:

                    <br><br>

                    <strong
                        style="
                            font-size:25px;
                        "
                    >
                        ${persianNumber(
                            totalDays.toLocaleString("en-US")
                        )}
                    </strong>

                    روز

                    <br><br>

                    داری این زندگی رو تحمل می‌کنی.

                </div>



                <p
                    style="
                        color:var(--muted);
                        margin-top:25px;
                    "
                >

                    تاریخ تولد شمسی:

                    <br>

                    <b>

                        ${persianNumber(jy)}
                        /
                        ${persianNumber(
                            String(jm).padStart(2,"0")
                        )}
                        /
                        ${persianNumber(
                            String(jd).padStart(2,"0")
                        )}

                    </b>

                </p>



                <small>

                    این ابزار هیچ کاربرد علمی ندارد؛
                    فقط آمده یادآوری کند
                    که چقدر از عمرت گذشته. 😂

                </small>


                `

            );

        }

    }

};





/*
=================================
تعداد روزهای ماه شمسی
=================================
*/

function getJalaliMonthDays(
    year,
    month
){

    if(month <= 6){

        return 31;

    }


    if(month <= 11){

        return 30;

    }


    return isJalaliLeap(year)
        ? 30
        : 29;

}





/*
=================================
تشخیص کبیسه شمسی
=================================
*/

function isJalaliLeap(
    year
){

    const breaks = [

        -61,
        9,
        38,
        199,
        426,
        686,
        756,
        818,
        1111,
        1181,
        1210,
        1635,
        2060,
        2097,
        2192,
        2262,
        2324,
        2394,
        2456,
        3178

    ];


    let leapJ = -14;


    let jp = breaks[0];


    let jump;


    for(
        let i = 1;
        i < breaks.length;
        i++
    ){

        const jm =
            breaks[i];


        jump =
            jm - jp;


        if(
            year < jm
        ){

            break;

        }


        leapJ +=
            Math.floor(
                jump / 33
            ) * 8
            +
            Math.floor(
                (jump % 33) / 4
            );


        jp = jm;

    }


    let n =
        year - jp;


    leapJ +=
        Math.floor(
            n / 33
        ) * 8
        +
        Math.floor(
            ((n % 33) + 3) / 4
        );


    if(
        jump % 33 === 4 &&
        jump - n === 4
    ){

        leapJ++;

    }


    const leap =
        Math.floor(
            (
                (
                    year + 1
                ) %
                33
            )
        );


    return [
        1,
        5,
        9,
        13,
        17,
        22,
        26,
        30
    ].includes(
        leap
    );

}





/*
=================================
شمسی → میلادی
=================================
*/

function jalaliToGregorian(
    jy,
    jm,
    jd
){

    jy -= 979;


    let days =
        365 * jy
        +
        Math.floor(jy / 33) * 8
        +
        Math.floor(
            ((jy % 33) + 3) / 4
        );


    for(
        let i = 0;
        i < jm - 1;
        i++
    ){

        days +=
            i < 6
            ? 31
            : 30;

    }


    days +=
        jd - 1;


    let gDay =
        days + 79;


    let gy =
        1600
        +
        400 *
        Math.floor(
            gDay / 146097
        );


    gDay %=
        146097;


    let leap =
        true;


    if(
        gDay >= 36525
    ){

        gDay--;


        gy +=
            100 *
            Math.floor(
                gDay / 36524
            );


        gDay %=
            36524;


        if(
            gDay >= 365
        ){

            gDay++;

        }

        else{

            leap = false;

        }

    }


    gy +=
        4 *
        Math.floor(
            gDay / 1461
        );


    gDay %=
        1461;


    if(
        gDay >= 366
    ){

        leap = false;


        gDay--;


        gy +=
            Math.floor(
                gDay / 365
            );


        gDay %=
            365;

    }


    const monthDays = [

        31,
        leap ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31

    ];


    let gm = 0;


    while(
        gDay >=
        monthDays[gm]
    ){

        gDay -=
            monthDays[gm];


        gm++;

    }


    return [

        gy,
        gm + 1,
        gDay + 1

    ];

}





/*
=================================
میلادی → شمسی
=================================
*/

function gregorianToJalali(
    gy,
    gm,
    gd
){

    const gdm = [

        0,
        31,
        59,
        90,
        120,
        151,
        181,
        212,
        243,
        273,
        304,
        334

    ];


    let gy2 =
        gm > 2
        ? gy + 1
        : gy;


    let days =
        355666
        +
        (
            365 * gy
        )
        +
        Math.floor(
            (gy2 + 3) / 4
        )
        -
        Math.floor(
            (gy2 + 99) / 100
        )
        +
        Math.floor(
            (gy2 + 399) / 400
        )
        +
        gd
        +
        gdm[gm - 1];


    let jy =
        -1595
        +
        33 *
        Math.floor(
            days / 12053
        );


    days %=
        12053;


    jy +=
        4 *
        Math.floor(
            days / 1461
        );


    days %=
        1461;


    if(
        days > 365
    ){

        jy +=
            Math.floor(
                (days - 1) / 365
            );


        days =
            (days - 1) % 365;

    }


    let jm;


    if(
        days < 186
    ){

        jm =
            1 +
            Math.floor(
                days / 31
            );

    }

    else{

        jm =
            7 +
            Math.floor(
                (days - 186) / 30
            );

    }


    const jd =
        1
        +
        (
            days < 186
            ? days % 31
            : (days - 186) % 30
        );


    return [

        jy,
        jm,
        jd

    ];

}





/*
=================================
حیوان سال
=================================

سال 1405 = اسب
سال 1404 = مار
سال 1403 = اژدها

ترتیب:
موش → گاو → ببر → خرگوش →
اژدها → مار → اسب → بز →
میمون → خروس → سگ → خوک
*/

function getChineseAnimal(
    jalaliYear
){

    const animals = [

        "موش 🐭",
        "گاو 🐮",
        "ببر 🐯",
        "خرگوش 🐰",
        "اژدها 🐉",
        "مار 🐍",
        "اسب 🐴",
        "بز 🐐",
        "میمون 🐒",
        "خروس 🐓",
        "سگ 🐕",
        "خوک 🐷"

    ];


    /*
    1405 = 2026 = اسب
    */

    const index =
        (
            jalaliYear + 5
        ) % 12;


    return animals[index];

}





/*
=================================
عدد فارسی
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
