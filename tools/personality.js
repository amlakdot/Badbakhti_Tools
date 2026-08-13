import {
    showResult
} from "../js/app.js";


export default {

    id:"personality",

    icon:"💀",

    title:"تست شخصیت بدبختی",

    description:
    "ببین چه مدل بدبختی هستی و نقطه ضعف پنهانت چیه 😂",

    buttonText:
    "شروع نابودی 💀",



    html:`

    <div class="box">


        <h2>
            💀 تست شخصیت بدبختی
        </h2>


        <p class="desc">
            هر آدمی یک مدل خرابکاری دارد.
            با ۲۰ سؤال بفهم چه مدل بدبختی هستی.
        </p>


        <div id="personalityArea">


            <button
            class="primary"
            id="startPersonality"
            >
                شروع نابودی 💀
            </button>


        </div>


    </div>

    `,



    init(){


        const area =
        document.getElementById(
            "personalityArea"
        );



        let index = 0;



        let scores = {

            OVER:0,
            IDLE:0,
            CHAOS:0,
            MASK:0,
            SHOP:0,
            LONE:0,
            SURV:0,
            SCROLL:0

        };



        const questions = [


        {
            q:"وقتی یک کار مهم داری چه می‌کنی؟",

            a:[

                ["همان اول انجامش می‌دهم","SURV"],

                ["اول همه چیز را بررسی می‌کنم","OVER"],

                ["می‌گذارم لحظه آخر","CHAOS"],

                ["کلاً فراموش می‌کنم","IDLE"]

            ]

        },



        {
            q:"وقتی ناراحت هستی:",

            a:[

                ["تنهایی حلش می‌کنم","LONE"],

                ["می‌گویم خوبم و پنهان می‌کنم","MASK"],

                ["با گوشی فرار می‌کنم","SCROLL"],

                ["چیزی می‌خرم بهتر شوم","SHOP"]

            ]

        },



        {
            q:"وقتی تصمیم سخت داری:",

            a:[

                ["خیلی فکر می‌کنم","OVER"],

                ["هرچه شد شد","CHAOS"],

                ["از کسی کمک نمی‌گیرم","LONE"],

                ["عقب می‌اندازم","IDLE"]

            ]

        },



        {
            q:"آخر شب معمولاً:",

            a:[

                ["فکر زیاد دارم","OVER"],

                ["در گوشی هستم","SCROLL"],

                ["برای فردا آماده می‌شوم","SURV"],

                ["وانمود می‌کنم مشکلی نیست","MASK"]

            ]

        },



        {
            q:"اگر پول اضافه داشته باشی:",

            a:[

                ["پس‌انداز می‌کنم","SURV"],

                ["چیزی می‌خرم","SHOP"],

                ["برای آینده تحلیل می‌کنم","OVER"],

                ["خرجش می‌کنم","CHAOS"]

            ]

        },



        {
            q:"وقتی مشکلی پیش می‌آید:",

            a:[

                ["حلش می‌کنم","SURV"],

                ["زیاد تحلیل می‌کنم","OVER"],

                ["تا آخرین لحظه صبر می‌کنم","CHAOS"],

                ["بیخیال می‌شوم","IDLE"]

            ]

        },



        {
            q:"دیگران تو را چگونه می‌بینند؟",

            a:[

                ["آرام و مستقل","LONE"],

                ["قوی و بدون مشکل","MASK"],

                ["غیرقابل پیش‌بینی","CHAOS"],

                ["خیلی فکرکننده","OVER"]

            ]

        },



        {
            q:"وقتی خیلی خسته‌ای:",

            a:[

                ["استراحت می‌کنم","SURV"],

                ["اسکرول می‌کنم","SCROLL"],

                ["خودم را مجبور می‌کنم ادامه بدهم","MASK"],

                ["همه چیز را رها می‌کنم","IDLE"]

            ]

        },



        {
            q:"بزرگ‌ترین مشکل تو:",

            a:[

                ["شروع کردن","IDLE"],

                ["زیادی فکر کردن","OVER"],

                ["پنهان کردن احساسات","MASK"],

                ["خرج احساسی","SHOP"]

            ]

        },



        {
            q:"در بحران بزرگ:",

            a:[

                ["زیر فشار بهتر کار می‌کنم","CHAOS"],

                ["تحلیل می‌کنم","OVER"],

                ["دوام می‌آورم","SURV"],

                ["تنها می‌شوم","LONE"]

            ]

        },



        {
            q:"وقتی شکست می‌خوری:",

            a:[

                ["دوباره تلاش می‌کنم","SURV"],

                ["خودم را سرزنش می‌کنم","OVER"],

                ["پنهانش می‌کنم","MASK"],

                ["رها می‌کنم","IDLE"]

            ]

        },



        {
            q:"وقت آزاد تو:",

            a:[

                ["خرید و تفریح","SHOP"],

                ["اینترنت و گوشی","SCROLL"],

                ["تنهایی","LONE"],

                ["رسیدگی به کارها","SURV"]

            ]

        },



        {
            q:"وقتی هدف داری:",

            a:[

                ["برنامه دقیق می‌ریزم","OVER"],

                ["عقب می‌اندازم","IDLE"],

                ["لحظه آخر انجام می‌دهم","CHAOS"],

                ["تا آخر می‌روم","SURV"]

            ]

        },



        {
            q:"بیشتر از چه چیزی می‌ترسی؟",

            a:[

                ["اشتباه کردن","OVER"],

                ["از دست دادن آزادی","LONE"],

                ["شکست خوردن","SURV"],

                ["قضاوت شدن","MASK"]

            ]

        },



        {
            q:"وقتی پول کم می‌آوری:",

            a:[

                ["نگران می‌شوم","OVER"],

                ["خرید می‌کنم","SHOP"],

                ["راه حل پیدا می‌کنم","SURV"],

                ["فرار ذهنی می‌کنم","SCROLL"]

            ]

        },

        {
            q:"سبک زندگی تو:",

            a:[

                ["همیشه برنامه دارم","OVER"],

                ["هر روز یک بحران جدید","CHAOS"],

                ["آرام و کند","IDLE"],

                ["تنها ولی مستقل","LONE"]

            ]

        },



        {
            q:"بیشتر وقتت کجا می‌رود؟",

            a:[

                ["فکر کردن","OVER"],

                ["گوشی","SCROLL"],

                ["کار کردن","SURV"],

                ["سرگرمی و خرید","SHOP"]

            ]

        },



        {
            q:"دوست داری دیگران تو را چگونه ببینند؟",

            a:[

                ["قوی","MASK"],

                ["موفق","SURV"],

                ["باهوش","OVER"],

                ["خاص","CHAOS"]

            ]

        },



        {
            q:"کدام جمله نزدیک تو است؟",

            a:[

                ["باید بیشتر فکر کنم","OVER"],

                ["بعداً انجام می‌دهم","IDLE"],

                ["وقتی مجبور شوم عالی می‌شوم","CHAOS"],

                ["هرطور شده ادامه می‌دهم","SURV"]

            ]

        }


        ];




        const results={


            OVER:{
                name:"🧠 بیش‌فکر حرفه‌ای",
                power:"ساختن ۲۰ راه حل برای یک مشکل",
                weak:"شروع کردن",
                enemy:"فکرهای ساعت ۳ شب"
            },


            IDLE:{
                name:"🦥 انسان آماده‌به‌کار",
                power:"آرام بودن",
                weak:"اقدام نکردن",
                enemy:"دکمه بعداً"
            },


            CHAOS:{
                name:"🔥 نابغه لحظه آخری",
                power:"عملکرد زیر فشار",
                weak:"برنامه‌ریزی",
                enemy:"تقویم"
            },


            MASK:{
                name:"🎭 خوبم‌گوی حرفه‌ای",
                power:"تحمل بالا",
                weak:"حرف نزدن",
                enemy:"احساسات پنهان"
            },


            SHOP:{
                name:"💸 خریدکننده احساسی",
                power:"لذت بردن",
                weak:"کنترل خرج",
                enemy:"تخفیف‌ها"
            },


            LONE:{
                name:"🐺 گرگ خسته",
                power:"استقلال",
                weak:"کمک نگرفتن",
                enemy:"تنهایی"
            },


            SURV:{
                name:"🫠 بازمانده",
                power:"دوام آوردن",
                weak:"عادت به سختی",
                enemy:"تسلیم شدن"
            },


            SCROLL:{
                name:"📱 قربانی اسکرول",
                power:"فرار ذهنی",
                weak:"تمرکز",
                enemy:"فقط ۵ دقیقه دیگر"
            }


        };




        function renderQuestion(){


            let item =
            questions[index];


            area.innerHTML=`

            <div class="progress-box">


                <p>
                💀 مرحله ${index+1}
                از ${questions.length}
                </p>


                <div class="bar">

                    <span
                    style="
                    width:${((index)/questions.length)*100}%
                    "
                    ></span>

                </div>


            </div>



            <div class="question">

                ${item.q}

            </div>



            <div>


            ${
                item.a.map(
                (a,i)=>`

                <button
                class="secondary answer"
                data-id="${i}"
                >

                ${String.fromCharCode(65+i)}
                -
                ${a[0]}

                </button>

                `
                ).join("")
            }


            </div>

            `;



            document
            .querySelectorAll(".answer")
            .forEach(btn=>{


                btn.onclick=()=>{


                    let answer =
                    item.a[
                        Number(btn.dataset.id)
                    ];



                    scores[
                        answer[1]
                    ]++;



                    index++;



                    if(index >= questions.length){

                        finish();

                    }

                    else{

                        area.style.opacity="0";


                        setTimeout(()=>{

                            area.style.opacity="1";

                            renderQuestion();

                        },250);

                    }


                };


            });


        }




        function finish(){


            let sorted =
            Object.entries(scores)
            .sort(
                (a,b)=>b[1]-a[1]
            );


            let type =
            sorted[0][0];


            let second =
            sorted[1][0];


            let result =
            results[type];


            let total =
            Object.values(scores)
            .reduce(
                (a,b)=>a+b,
                0
            );


            let score =
            Math.round(
                (scores[type]/total)*100
            );


            let misery =
            Math.min(
                100,
                score+
                Math.floor(Math.random()*20)
            );



            area.innerHTML=`

            <div class="story-card">


                <h2>
                💀 نتیجه تست بدبختی
                </h2>


                <h1>
                ${result.name}
                </h1>


                <div class="big">
                ${misery}٪
                </div>


                <div class="bar">

                    <span
                    style="
                    width:${misery}%
                    "
                    ></span>

                </div>



                <p>
                🔥 قدرت:
                <br>
                <b>${result.power}</b>
                </p>


                <p>
                ☠️ ضعف:
                <br>
                <b>${result.weak}</b>
                </p>


                <p>
                👹 دشمن:
                <br>
                <b>${result.enemy}</b>
                </p>



                <p>

                شخصیت دوم:

                <br>

                ${results[second].name}

                </p>



                <button
                class="primary"
                id="restartPersonality"
                >

                دوباره نابود شو 💀

                </button>


            </div>

            `;



            localStorage.setItem(
                "badbakhtiPersonality",
                JSON.stringify({
                    type,
                    score:misery,
                    date:new Date()
                    .toLocaleDateString("fa-IR")
                })
            );



            document
            .getElementById(
                "restartPersonality"
            )
            .onclick=()=>{


                index=0;


                scores={

                    OVER:0,
                    IDLE:0,
                    CHAOS:0,
                    MASK:0,
                    SHOP:0,
                    LONE:0,
                    SURV:0,
                    SCROLL:0

                };


                renderQuestion();


            };


        }




        document
        .getElementById(
            "startPersonality"
        )
        .onclick=()=>{


            renderQuestion();


        };


    }


};
