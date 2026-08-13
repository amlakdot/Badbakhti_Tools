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
        تاریخ تولدت رو انتخاب کن تا میزان بدبختی‌ات محاسبه شود. 💀
    </p>



    <div
        style="
        display:grid;
        grid-template-columns:
        1fr 1.5fr 1.2fr;
        gap:10px;
        "
    >


        <select id="birthDay">

            <option value="">
                روز
            </option>

        </select>



        <select id="birthMonth">

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



        <select id="birthYear">

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
                "birthDay"
            );


        const yearSelect =
            document.getElementById(
                "birthYear"
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
                    ${toPersianNumber(day)}
                </option>

            `;

        }



        /*
        =========================
        سال‌ها
        =========================
        */


        const currentGregorianYear =
            new Date()
            .getFullYear();


        const currentJalaliYear =
            currentGregorianYear - 621;



        for(
            let year =
                currentJalaliYear;

            year >= 1300;

            year--
        ){

            yearSelect.innerHTML += `

                <option value="${year}">
                    ${toPersianNumber(year)}
                </option>

            `;

        }



        /*
        =========================
        محاسبه
        =========================
        */


        document
        .getElementById(
            "ageBtn"
        )
        .onclick = ()=>{


            const jy =
                Number(
                    yearSelect.value
                );


            const jm =
                Number(
                    document
                    .getElementById(
                        "birthMonth"
                    )
                    .value
                );


            const jd =
                Number(
                    daySelect.value
                );



            /*
            =========================
            بررسی انتخاب
            =========================
            */


            if(
                !jy ||
                !jm ||
                !jd
            ){

                alert(
                    "تاریخ تولدت رو انتخاب کن بدبخت. 😂"
                );

                return;

            }



            /*
            =========================
            بررسی روز معتبر
            =========================
            */


            const maxDay =
                jm <= 6
                ? 31
                : jm <= 11
                ? 30
                : isJalaliLeap(jy)
                ? 30
                : 29;



            if(
                jd > maxDay
            ){

                alert(
                    "این تاریخی که انتخاب کردی وجود نداره بدبخت. 😂"
                );

                return;

            }



            /*
            =========================
            تبدیل شمسی به میلادی
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
            محاسبه سن
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


                days +=
                    new Date(
                        now.getFullYear(),
                        now.getMonth(),
                        0
                    )
                    .getDate();

            }



            if(months < 0){

                years--;

                months += 12;

            }



            /*
            =========================
            اگر تاریخ آینده باشد
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
            تولد بعدی
            =========================
            */


            let nextBirthday =
                new Date(
                    now.getFullYear(),
                    birth.getMonth(),
                    birth.getDate()
                );



            if(
                nextBirthday < now
            ){

                nextBirthday.setFullYear(
                    now.getFullYear() + 1
                );

            }



            const remainingMilliseconds =
                nextBirthday - now;



            const remainingDays =
                Math.ceil(
                    remainingMilliseconds
                    /
                    (
                        1000 *
                        60 *
                        60 *
                        24
                    )
                );



            /*
            =========================
            تاریخ میلادی
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
            حیوان سال
            =========================
            */


            const animal =
                getChineseAnimal(
                    jy
                );



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
            نمایش
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
                    تو یک بدبختی که:
                </h2>



                <div
                    style="
                    font-size:24px;
                    font-weight:bold;
                    line-height:2;
                    "
                >

                    ${toPersianNumber(years)}
                    سال،

                    ${toPersianNumber(months)}
                    ماه،

                    ${toPersianNumber(days)}
                    روز

                </div>



                <p>
                    از این زندگی می‌گذره و هنوز
                    تسلیم نشدی. 💀
                </p>



                <hr>



                <div
                    style="
                    margin-top:20px;
                    padding:20px;
                    background:#ffffff08;
                    border-radius:18px;
                    "
                >

                    🌍 اگر تو اروپا به دنیا می‌اومدی:

                    <br><br>

                    <b
                        style="
                        font-size:22px;
                        "
                    >
                        ${europeanDate}
                    </b>

                    <br><br>

                    یعنی دقیقاً
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

                    🎂 تا تولد بعدی:

                    <br><br>

                    <strong
                        style="
                        font-size:28px;
                        "
                    >
                        ${toPersianNumber(remainingDays)}
                    </strong>

                    روز

                    <br>

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

                    🐉 تو متولد سال:

                    <h2
                        style="
                        margin-bottom:0;
                        "
                    >
                        ${animal}
                    </h2>

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
                        ${toPersianNumber(jy)}
                        /
                        ${toPersianNumber(
                            String(jm).padStart(2,"0")
                        )}
                        /
                        ${toPersianNumber(
                            String(jd).padStart(2,"0")
                        )}
                    </b>

                </p>



                <small>

                    این ابزار هیچ کاربرد علمی ندارد؛
                    فقط آمده یادآوری کند که
                    چقدر از عمرت گذشته. 😂

                </small>


                `

            );


        };


    }


};





/*
=================================
تبدیل عدد انگلیسی به فارسی
=================================
*/


function toPersianNumber(
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
سال کبیسه شمسی
=================================
*/


function isJalaliLeap(
    year
){

    const remainder =
        year % 33;


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
        remainder
    );

}





/*
=================================
تبدیل شمسی به میلادی
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
        Math.floor(
            jy / 33
        ) * 8
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
