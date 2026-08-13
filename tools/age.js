import {
    showResult
} from "../js/app.js";


export default {


    id:"age",


    icon:"🎂",


    title:"سن یک بدبخت",


    description:
        "تاریخ تولدت رو بده ببین چند ساله داری دوام میاری. 😂",


    buttonText:
        "محاسبه سن بدبختی 🎂",



    html:`


    <h2>
        🎂 محاسبه سن یک بدبخت
    </h2>


    <p class="desc">
        تاریخ تولدت رو به شمسی وارد کن تا میزان بدبختی محاسبه شود. 💀
    </p>



    <input
        id="jalaliBirth"
        type="text"
        placeholder="مثلاً 1381/01/08"
    >



    <button
        class="primary"
        id="ageBtn"
    >
        محاسبه بدبختی
    </button>



    <div
        id="ageResult"
        class="result"
    ></div>


    `,



    init(){


        document
        .getElementById(
            "ageBtn"
        )
        .onclick = ()=>{


            let value =
            document
            .getElementById(
                "jalaliBirth"
            )
            .value
            .trim();



            if(!value){

                alert(
                    "تاریخ تولدت رو وارد کن بدبخت."
                );

                return;

            }



            let parts =
            value.split("/");



            if(parts.length !== 3){

                alert(
                    "فرمت درست: 1381/01/08"
                );

                return;

            }



            let jy =
            Number(parts[0]);


            let jm =
            Number(parts[1]);


            let jd =
            Number(parts[2]);



            let g =
            jalaliToGregorian(
                jy,
                jm,
                jd
            );



            let birth =
            new Date(
                g[0],
                g[1]-1,
                g[2]
            );



            let now =
            new Date();



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

                months+=12;

            }




            let nextBirthday =
            new Date(
                now.getFullYear(),
                birth.getMonth(),
                birth.getDate()
            );



            if(nextBirthday < now){

                nextBirthday.setFullYear(
                    now.getFullYear()+1
                );

            }



            let remain =
            Math.ceil(
                (
                    nextBirthday-now
                )
                /
                (1000*60*60*24)
            );




            let zodiac =
            animals[
                jy % 12
            ];




            let european =
            birth.toLocaleDateString(
                "en-GB"
            );




            showResult(

                "ageResult",


                `


                <div class="big">
                    🎂
                </div>



                <h2>
                    تو یک بدبختی که:
                </h2>



                <h3>

                ${years}
                سال،

                ${months}
                ماه،

                ${days}
                روز

                است داری زندگی می‌کنی. 💀

                </h3>




                <hr>




                <p>

                🌍 اگر در اروپا به دنیا می‌اومدی:

                <br><br>

                <b>
                ${european}
                </b>

                </p>





                <p>

                ⏳ تا تولد بعدی:

                <br><br>

                ${remain}
                روز

                مانده بدبخت. 😂

                </p>




                <div
                style="
                padding:20px;
                background:#ffffff08;
                border-radius:18px;
                margin-top:20px;
                "
                >


                🐉 تو متولد سال:

                <h2>
                ${zodiac}
                </h2>


                </div>




                <small>

                این ابزار فقط برای خراب کردن روحیه ساخته شده. 😂

                </small>



                `

            );


        };


    }


};





function jalaliToGregorian(jy,jm,jd){


    jy -= 979;

    let days =
    365*jy
    +
    Math.floor(jy/33)*8
    +
    Math.floor(
        ((jy%33)+3)/4
    );



    for(
        let i=0;
        i<jm-1;
        i++
    ){

        days +=
        i<6
        ?
        31
        :
        30;

    }



    days += jd-1;



    let gd =
    days+79;



    let gy =
    1600
    +
    400*
    Math.floor(
        gd/146097
    );



    gd %=146097;



    let leap=true;



    if(gd>=36525){

        gd--;

        gy +=
        100*
        Math.floor(
            gd/36524
        );

        gd %=36524;


        if(gd>=365){

            gd++;

        }

        else{

            leap=false;

        }

    }



    gy +=
    4*
    Math.floor(
        gd/1461
    );



    gd %=1461;



    if(gd>=366){

        leap=false;

        gd--;

        gy +=
        Math.floor(
            gd/365
        );

        gd %=365;

    }



    let salMonth =
    [
        31,28,31,30,31,30,
        31,31,30,31,30,31
    ];



    if(
        leap
    ){

        salMonth[1]=29;

    }



    let gm=0;



    while(
        gd>=salMonth[gm]
    ){

        gd -=
        salMonth[gm];

        gm++;

    }



    return [
        gy,
        gm+1,
        gd+1
    ];

}




const animals=[

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
