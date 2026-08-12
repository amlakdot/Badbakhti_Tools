const home =
    document.getElementById("home");


const app =
    document.getElementById("app");


const homeHeader =
    document.getElementById("homeHeader");


let tools = [];



/* =========================
   LOAD TOOLS
========================= */

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


        const modules =
            await Promise.all(

                files.map(
                    file =>
                        import(
                            `../tools/${file}?v=${Date.now()}`
                        )
                )

            );


        tools =
            modules

                .map(
                    module =>
                        module.default ||
                        module.tool
                )

                .filter(Boolean);


        renderHome();

    }

    catch(error){

        console.error(error);


        home.innerHTML = `

            <div class="tool">

                <div class="emoji">
                    ⚠️
                </div>

                <h2>
                    خطا در بارگذاری ابزارها
                </h2>

                <p>
                    فایل tools.json پیدا نشد
                    یا ابزارها قابل بارگذاری نیستند.
                </p>

            </div>

        `;

    }

}



/* =========================
   RENDER HOME
========================= */

function renderHome(){

    home.innerHTML =
        tools.map(
            tool => `

            <div class="tool">

                <div class="emoji">
                    ${tool.icon || "🧰"}
                </div>

                <h2>
                    ${escapeHTML(tool.title)}
                </h2>

                <p>
                    ${escapeHTML(
                        tool.description || ""
                    )}
                </p>

                <button
                    class="open"
                    data-tool="${escapeHTML(tool.id)}"
                >

                    ${escapeHTML(
                        tool.buttonText ||
                        "باز کردن"
                    )}

                </button>

            </div>

        `
        ).join("");


    home
        .querySelectorAll(
            "[data-tool]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () =>
                    openApp(
                        button.dataset.tool
                    )
            );

        });

}



/* =========================
   OPEN TOOL
========================= */

function openApp(id){

    const tool =
        tools.find(
            item =>
                item.id === id
        );


    if(!tool)
        return;


    home.style.display =
        "none";


    homeHeader.style.display =
        "none";


    app.classList.add(
        "active"
    );


    app.innerHTML = `

        <button
            class="back"
            id="backButton"
        >
            ← برگشت
        </button>

        <div class="box">

            ${tool.html}

        </div>

    `;


    document
        .getElementById(
            "backButton"
        )
        .addEventListener(
            "click",
            goHome
        );


    if(
        typeof tool.init ===
        "function"
    ){

        tool.init(app);

    }


    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}



/* =========================
   HOME
========================= */

function goHome(){

    app.classList.remove(
        "active"
    );


    app.innerHTML =
        "";


    home.style.display =
        "grid";


    homeHeader.style.display =
        "block";


    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}



/* =========================
   RESULT
========================= */

export function showResult(
    id,
    html
){

    const box =
        document.getElementById(
            id
        );


    if(!box)
        return;


    box.innerHTML =
        html;


    box.classList.add(
        "show"
    );


    box.scrollIntoView({

        behavior:"smooth",

        block:"nearest"

    });

}



/* =========================
   FORMAT
========================= */

export function format(
    number
){

    return Math.round(
        number
    )
    .toLocaleString(
        "fa-IR"
    )
    + " تومان";

}



/* =========================
   ESCAPE HTML
========================= */

export function escapeHTML(
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



/* =========================
   START
========================= */

loadTools();
