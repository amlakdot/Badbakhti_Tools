import { showResult } from "../js/app.js";

export default {
  id: "friendquiz",
  icon: "🤝",
  title: "رفیقم من بدبخت چقدر می‌شناسه؟",
  description: "۲۰ تا سؤال جواب بده، لینک بساز و بده رفیقت ببین چقدر می‌شناستت",
  buttonText: "شروع تست رفاقت 🤝",

  html: `
    <div class="box">
      <h2>🤝 رفیقم من بدبخت چقدر می‌شناسه؟</h2>
      <p class="desc">
        اول خودت جواب بده، بعد لینک رو بده به رفیقت.
        ببین چند تا رو درست حدس می‌زنه.
      </p>
      <div id="friendQuizArea"></div>
    </div>
  `,

  init() {
    const area = document.getElementById("friendQuizArea");

    const questions = [
      {
        q: "وقتی با دوستات بیرون می‌ری، بیشتر چی حال می‌ده؟",
        bank: [
          "کافه شلوغ با حرف زدن بی‌وقفه",
          "قدم زدن طولانی تو خیابون",
          "خونه یکی از بچه‌ها با چای و گپ",
          "سینما یا کنسرت",
          "رانندگی شبانه بدون مقصد",
          "جمع کوچیک و آروم",
          "هر جا که غذا خوب باشه",
          "اصلاً بیرون رفتن حال نمی‌ده، ترجیح می‌دم آنلاین بمونم"
        ]
      },
      {
        q: "تو گروه دوستی بیشتر چه نقشی داری؟",
        bank: [
          "کسی که همه بهش پناه می‌برن",
          "کسی که جوک می‌گه و حال همه رو خوب می‌کنه",
          "کسی که برنامه‌ریزی می‌کنه",
          "کسی که ساکت می‌شینه و گوش می‌ده",
          "کسی که همیشه دیر می‌رسه",
          "کسی که بحث‌های سنگین راه می‌ندازه",
          "کسی که همه رو به هم وصل می‌کنه",
          "کسی که بیشتر وقت‌ها غایبه ولی وقتی هست تأثیر داره"
        ]
      },
      {
        q: "وقتی یکی از دوستات ناراحته، اولین واکنش‌ات چیه؟",
        bank: [
          "می‌پرسم چی شده و کامل گوش می‌دم",
          "سعی می‌کنم با شوخی حالشو عوض کنم",
          "می‌گم «درکم می‌کنم» و کنارش می‌مونم",
          "راه‌حل عملی پیشنهاد می‌دم",
          "فضای تنهایی بهش می‌دم",
          "براش یه چیزی می‌خرم یا کادو می‌دم",
          "مستقیم می‌گم چیکار کنه",
          "خودم هم ناراحت می‌شم و باهاش غرق می‌شم"
        ]
      },
      {
        q: "بزرگ‌ترین نقطه ضعف‌ات تو دوستی چیه؟",
        bank: [
          "دیر جواب دادن پیام",
          "خیلی زود دلخور شدن",
          "زیاد حرف زدن از خودم",
          "کم حرف زدن و بسته بودن",
          "مقایسه کردن دوستان با هم",
          "فراموش کردن مناسبت‌ها",
          "خیلی زود خسته شدن از رابطه",
          "سخت اعتماد کردن"
        ]
      },
      {
        q: "تو جمع دوستانه بیشتر از چی عصبانی می‌شی؟",
        bank: [
          "وقتی یکی پشت سر بقیه حرف می‌زنه",
          "وقتی قول می‌دن و عمل نمی‌کنن",
          "وقتی بحث سیاسی یا مذهبی بی‌جهت داغ می‌شه",
          "وقتی یکی همیشه مرکز توجه می‌خواد باشه",
          "وقتی حس می‌کنم نادیده گرفته شدم",
          "وقتی یکی خیلی منفی‌بافه",
          "وقتی برنامه‌ها لحظه آخری کنسل می‌شه",
          "تقریباً هیچ‌چیز، آرومم"
        ]
      },
      {
        q: "اگه بتونی فقط یکی از این عادت‌ها رو تو دوستات ببینی، کدوم رو انتخاب می‌کنی؟",
        bank: [
          "همیشه صادق بودن حتی اگه دردناک باشه",
          "همیشه در دسترس بودن",
          "داشتن حس شوخ‌طبعی قوی",
          "حمایت مالی وقتی لازم باشه",
          "احترام به حریم شخصی",
          "جاه‌طلبی و انگیزه دادن",
          "وفاداری مطلق",
          "فهمیدن بدون نیاز به توضیح زیاد"
        ]
      },
      {
        q: "بیشترین وقت آزادت رو چطور می‌گذرونی؟",
        bank: [
          "اسکرول اینستا و توییتر",
          "فیلم و سریال",
          "کتاب یا پادکست",
          "ورزش یا پیاده‌روی",
          "گپ زدن با یکی دو تا دوست نزدیک",
          "کار کردن روی پروژه شخصی",
          "خوابیدن و ریکاور شدن",
          "هیچ‌کار خاصی، فقط بودن"
        ]
      },
      {
        q: "تو مسائل مالی با دوستات چطور هستی؟",
        bank: [
          "خیلی راحت پول قرض می‌دم و می‌گیرم",
          "ترجیح می‌دم حساب‌ها جدا باشه",
          "گاهی خسیس می‌شم",
          "همیشه من بیشتر خرج می‌کنم",
          "حساسم روی اینکه کی چقدر داده",
          "اصلاً راجع به پول حرف نمی‌زنم",
          "اگه لازم باشه بدون منت کمک می‌کنم",
          "ترجیح می‌دم هیچ‌وقت پول وسط نباشه"
        ]
      },
      {
        q: "کدوم موضوع بیشتر تو جمع دوستات بحث می‌شه؟",
        bank: [
          "مهاجرت و آینده",
          "رابطه‌های عاطفی",
          "کار و پول",
          "خانواده و فشارهاش",
          "سیاست و اوضاع کشور",
          "فیلم، موسیقی و مم",
          "برنامه‌های سفر و خوش‌گذرونی",
          "حرفای بی‌خود و روزمره"
        ]
      },
      {
        q: "وقتی حس می‌کنی یکی از دوستات داره ازت دور می‌شه، چیکار می‌کنی؟",
        bank: [
          "مستقیم می‌پرسم چی شده",
          "خودم فاصله می‌گیرم",
          "بیشتر پیام می‌دم و تلاش می‌کنم",
          "صبر می‌کنم ببینم خودش برمی‌گرده",
          "از بقیه می‌پرسم خبری هست یا نه",
          "عصبانی می‌شم و کات می‌کنم",
          "سعی می‌کنم بفهمم مشکل از منه یا نه",
          "قبول می‌کنم که روابط تغییر می‌کنن"
        ]
      },
      {
        q: "بیشترین چیزی که تو دوستی بهت انرژی می‌ده چیه؟",
        bank: [
          "حرف زدن تا دیروقت",
          "سکوت راحت کنار هم",
          "تجربه‌های جدید با هم",
          "حمایت تو لحظه‌های سخت",
          "خندیدن بی‌وقفه",
          "رشد کردن با هم",
          "حس امنیت و پذیرفته شدن",
          "رقابت سالم و انگیزه"
        ]
      },
      {
        q: "تو کدوم موقعیت بیشتر احساس تنهایی می‌کنی حتی اگه دوست داشته باشی؟",
        bank: [
          "وقتی همه مشغول زندگی خودشونن",
          "تو جمع‌های شلوغ",
          "وقتی کسی حرف دلت رو نمی‌فهمه",
          "بعد از یه دعوا یا سوءتفاهم",
          "وقتی موفقیت یا شکست بزرگی داری",
          "شب‌های طولانی",
          "وقتی حس می‌کنم باید نقش بازی کنی",
          "تقریباً هیچ‌وقت"
        ]
      },
      {
        q: "اگه یکی از دوستات راز مهمی بهت بگه، چیکار می‌کنی؟",
        bank: [
          "تا ابد نگه می‌دارم",
          "فقط به یکی دو تا آدم خیلی نزدیک ممکنه بگم",
          "اگه به نفعش باشه ممکنه دخالت کنم",
          "سنگین می‌شه برام و اذیت می‌شم",
          "سعی می‌کنم فراموش کنم",
          "اگه خطرناک باشه بهش می‌گم باید به کس دیگه‌ای بگه",
          "کاملاً محرمانه می‌مونه",
          "بستگی به راز داره"
        ]
      },
      {
        q: "کدوم نوع طنز بیشتر بهت می‌چسبه تو دوستات؟",
        bank: [
          "طنز سیاه و تلخ",
          "شوخی‌های شخصی و خودمونی",
          "مم و رفرنس‌های اینترنتی",
          "طنز موقعیتی و لحظه‌ای",
          "شوخی‌های رک و بی‌پرده",
          "طنز ملایم و خانوادگی",
          "خودتحقیری",
          "تقریباً هر شوخی‌ای"
        ]
      },
      {
        q: "وقتی با دوستات برنامه‌ای می‌ریزید، معمولاً چی پیش میاد؟",
        bank: [
          "من برنامه‌ریزم و همه چیز مرتب پیش می‌ره",
          "همه چیز لحظه آخری مشخص می‌شه",
          "یکی دو نفر همیشه غایب می‌شن",
          "برنامه‌ها خیلی سریع کنسل می‌شن",
          "معمولاً بهتر از انتظار پیش می‌ره",
          "بحث سر جزئیات زیاد پیش میاد",
          "من دیر می‌رسم و بقیه شاکی می‌شن",
          "اصلاً برنامه نمی‌ریزیم، خودبه‌خود پیش میاد"
        ]
      },
      {
        q: "بیشترین چیزی که از یه دوست نزدیک انتظار داری چیه؟",
        bank: [
          "اینکه بدون قضاوت گوش بده",
          "اینکه تو سختی‌ها باشه",
          "اینکه صادق باشه",
          "اینکه حالم رو بفهمه بدون توضیح",
          "اینکه رشد کنه و منم باهاش",
          "اینکه وقت بذاره",
          "اینکه ازم دفاع کنه",
          "اینکه فقط باشه، بدون انتظار زیاد"
        ]
      },
      {
        q: "تو روابط دوستی چقدر زود دل می‌بندی؟",
        bank: [
          "خیلی سریع و عمیق",
          "آروم و محتاط",
          "اول خوب چک می‌کنم بعد نزدیک می‌شم",
          "تقریباً به سختی",
          "بستگی به طرف مقابل داره",
          "اول عاشق می‌شم بعد پشیمون",
          "سعی می‌کنم سطحی نگه دارم",
          "اصلاً نمی‌تونم کنترل کنم"
        ]
      },
      {
        q: "کدوم موقعیت بیشتر باعث می‌شه از یه دوست فاصله بگیری؟",
        bank: [
          "دروغ گفتن",
          "حسادت یا رقابت ناسالم",
          "تغییر ارزش‌ها",
          "بی‌توجهی مداوم",
          "دخالت تو زندگی شخصی",
          "منفی‌بافی دائمی",
          "وقتی حس کنم دیگه چیزی برای گفتن نداریم",
          "تقریباً هیچ‌چیز، سخت قطع می‌کنم"
        ]
      },
      {
        q: "اگه قرار باشه یکی از این‌ها رو با دوستات تجربه کنی، کدوم هیجان‌انگیزتره؟",
        bank: [
          "یه سفر جاده‌ای طولانی",
          "یه پروژه مشترک (کسب‌وکار یا هنری)",
          "یه شب‌نشینی طولانی با حرفای عمیق",
          "کمک کردن به هم تو یه بحران",
          "کشف یه جای جدید تو شهر",
          "یه چالش فیزیکی یا ورزشی",
          "ساختن یه خاطره احمقانه با هم",
          "فقط بودن بدون هیچ برنامه‌ای"
        ]
      },
      {
        q: "اگه بهترین دوستت بخواد یه جمله واقعی در موردت بنویسه، کدوم به واقعیت نزدیک‌تره؟",
        bank: [
          "«همیشه می‌تونم روش حساب کنم»",
          "«باهاش می‌تونم خودم باشم»",
          "«گاهی سنگین می‌شه ولی ارزشش رو داره»",
          "«بیشتر از چیزی که نشون می‌ده حس داره»",
          "«باهاش خندیدن راحت‌ترین کار دنیاست»",
          "«وقتی هست آروم می‌شم»",
          "«گاهی دور می‌شه ولی برمی‌گرده»",
          "«هیچ‌کدوم از اینا کامل نیست»"
        ]
      }
    ];

    function shuffle(arr) {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }

    // کد کردن داده‌ها (کوتاه)
    function encodeData(name, answers) {
      const raw = name.slice(0, 12) + "|" + answers.join("");
      return btoa(unescape(encodeURIComponent(raw)))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
    }

    // دیکد کردن
    function decodeData(str) {
      try {
        const padded = str + "===".slice((str.length + 3) % 4);
        const raw = decodeURIComponent(escape(atob(padded.replace(/-/g, "+").replace(/_/g, "/"))));
        const [name, ansStr] = raw.split("|");
        const answers = ansStr.split("").map(Number);
        if (!name || answers.length !== 20) return null;
        return { name, answers };
      } catch {
        return null;
      }
    }

    // ========== تشخیص حالت ==========
    const params = new URLSearchParams(window.location.search);
    const code = params.get("q");

    if (code) {
      startFriendMode(code);
    } else {
      startCreatorMode();
    }

    // ========== حالت سازنده ==========
    function startCreatorMode() {
      let name = "";
      let answers = [];
      let index = 0;

      area.innerHTML = `
        <div class="question">اسم خودت چیه؟</div>
        <input type="text" id="userName" placeholder="مثلاً علی، سارا..." maxlength="12"
          style="width:100%;padding:12px;border-radius:10px;border:none;margin-bottom:16px;">
        <button class="primary" id="startBtn">شروع سؤالات</button>
      `;

      document.getElementById("startBtn").onclick = () => {
        name = document.getElementById("userName").value.trim() || "یکی";
        renderQuestion();
      };

      function renderQuestion() {
        if (index >= 20) {
          finishCreator();
          return;
        }

        const item = questions[index];
        area.innerHTML = `
          <div class="progress-box">
            <p>سؤال ${index + 1} از ۲۰</p>
            <div class="bar"><span style="width:${(index / 20) * 100}%"></span></div>
          </div>
          <div class="question">${item.q}</div>
          <div>
            ${item.bank.map((opt, i) => `
              <button class="secondary answer" data-i="${i}">
                ${String.fromCharCode(65 + i)} - ${opt}
              </button>
            `).join("")}
          </div>
        `;

        document.querySelectorAll(".answer").forEach(btn => {
          btn.onclick = () => {
            answers.push(Number(btn.dataset.i));
            index++;
            renderQuestion();
          };
        });
      }

      function finishCreator() {
        const code = encodeData(name, answers);
        const link = `${location.origin}${location.pathname}?q=${code}`;

        area.innerHTML = `
          <div style="text-align:center">
            <h3>لینک آماده‌ست 🎉</h3>
            <p style="margin:16px 0;line-height:1.8;word-break:break-all">
              این لینک رو بده به رفیقت:<br>
              <b style="color:var(--pink)">${link}</b>
            </p>
            <button class="primary" id="copyBtn">کپی لینک</button>
            <button class="secondary" id="againBtn" style="margin-top:10px">از اول بساز</button>
          </div>
        `;

        document.getElementById("copyBtn").onclick = () => {
          navigator.clipboard.writeText(link);
          document.getElementById("copyBtn").innerText = "کپی شد ✅";
        };

        document.getElementById("againBtn").onclick = startCreatorMode;
      }
    }

    // ========== حالت دوست ==========
    function startFriendMode(code) {
      const data = decodeData(code);
      if (!data) {
        area.innerHTML = `<p style="text-align:center;color:var(--red)">لینک نامعتبره 💀</p>`;
        return;
      }

      let index = 0;
      let score = 0;

      function renderQuestion() {
        if (index >= 20) {
          showResult();
          return;
        }

        const item = questions[index];
        const correctIndex = data.answers[index];
        const correctText = item.bank[correctIndex];

        // ۳ گزینه غلط
        let wrongs = item.bank
          .map((t, i) => ({ t, i }))
          .filter(x => x.i !== correctIndex);

        wrongs = shuffle(wrongs).slice(0, 3);
        const options = shuffle([
          { t: correctText, correct: true },
          ...wrongs.map(w => ({ t: w.t, correct: false }))
        ]);

        area.innerHTML = `
          <div class="progress-box">
            <p>سؤال ${index + 1} از ۲۰</p>
            <div class="bar"><span style="width:${(index / 20) * 100}%"></span></div>
          </div>
          <div class="question">${item.q}</div>
          <div>
            ${options.map((opt, i) => `
              <button class="secondary answer" data-correct="${opt.correct}">
                ${String.fromCharCode(65 + i)} - ${opt.t}
              </button>
            `).join("")}
          </div>
        `;

        document.querySelectorAll(".answer").forEach(btn => {
          btn.onclick = () => {
            if (btn.dataset.correct === "true") score++;
            index++;
            renderQuestion();
          };
        });
      }

      function showResult() {
        const percent = Math.round((score / 20) * 100);
        let title, desc;

        if (percent >= 85) {
          title = "رفیق واقعی پیدا شد 🔥";
          desc = `${data.name} رو خیلی خوب می‌شناسی. این رفاقت بوی اعتماد می‌ده.`;
        } else if (percent >= 65) {
          title = "رفاقت قابل قبول";
          desc = `بدک نیست. ${data.name} رو تا حد خوبی می‌شناسی.`;
        } else if (percent >= 40) {
          title = "رفاقت نصفه‌نصفه‌ست";
          desc = `چند تا رو درست گفتی، ولی هنوز خیلی چیزا از ${data.name} نمی‌دونی.`;
        } else {
          title = "این رفاقت بیشتر بوی تعارفات می‌ده 💀";
          desc = `راستش ${data.name} رو خیلی سطحی می‌شناسی.`;
        }

        area.innerHTML = `
          <div style="text-align:center">
            <h2>${title}</h2>
            <div class="big" style="font-size:2.8rem;margin:14px 0">${percent}٪</div>
            <p style="line-height:1.8;margin-bottom:18px">${desc}</p>
            <p>از ۲۰ سؤال، <b>${score}</b> تا رو درست جواب دادی.</p>
            <button class="primary" id="shareBtn" style="margin-top:18px">کپی نتیجه</button>
          </div>
        `;

        document.getElementById("shareBtn").onclick = () => {
          const text = `نتیجه تست رفاقت\n\nدرصد شناخت از ${data.name}: ${percent}%\n${score} از ۲۰ درست\n\n${title}\n${desc}\n\nhttps://xixtelegram.github.io/Badbakhti_Tools/`;
          navigator.clipboard.writeText(text);
          document.getElementById("shareBtn").innerText = "کپی شد ✅";
        };
      }

      renderQuestion();
    }
  }
};
