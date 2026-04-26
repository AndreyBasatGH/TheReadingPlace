import React, { useState, useEffect, useRef } from "react";
import "./styles.css";

export default function App() {
  const [isSecretActive, setIsSecretActive] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [language, setLanguage] = useState("BG");
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [activeUsers, setActiveUsers] = useState(() =>
    Math.floor(Math.random() * (999 - 100 + 1) + 100)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isNumberVisible, setIsNumberVisible] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const steps = [4, 7, 11, -4, -7, -11];
    const interval = setInterval(() => {
      setIsNumberVisible(false);
      setTimeout(() => {
        const randomStep = steps[Math.floor(Math.random() * steps.length)];
        setActiveUsers((prev) => {
          const next = prev + randomStep;
          return next < 100 ? 100 : next;
        });
        setIsNumberVisible(true);
      }, 800);
    }, 35000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "a") {
        e.preventDefault();
        setIsSecretActive(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  useEffect(() => {
    // Намира контейнера със скрола
    const scroller = document.querySelector(".scrollable-content");
    if (scroller) {
      // Връща го най-горе плавно
      scroller.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [language]); // Изпълнява се само когато се смени 'language'

  const handlePixelClick = () => {
    setIsSecretActive(false);
    setIsEntering(true);
    if (audioRef.current) {
      setTimeout(() => {
        const audio = audioRef.current;
        audio.volume = 0;
        audio.play().catch((err) => console.error("Audio error:", err));
        let fadeInterval = setInterval(() => {
          if (audio.volume < 0.4) {
            audio.volume = Math.min(audio.volume + 0.02, 0.4);
          } else {
            clearInterval(fadeInterval);
          }
        }, 100);
      }, 4000);
    }
  };
  const handleNextPage = () => {
    const scroller = document.querySelector(".scrollable-content");
    if (scroller) {
      scroller.scrollTo({ top: 0, behavior: "smooth" });
    }
    setTimeout(() => {
      setCurrentPage((prev) => prev + 1);
    }, 1000);
  };
  return (
    <div className="main-container">
      <audio ref={audioRef} src="/music.mp3" preload="auto" loop />

      <div
        className={`layer external ${isEntering ? "animate-exit-darken" : ""}`}
      />

      <div
        className={`layer internal ${isEntering ? "fade-in-from-black" : ""}`}
      >
        <div
          className={`magic-book single-page ${
            isEntering ? "fade-in-book" : ""
          }`}
        >
          <div className="parchment-texture"></div>
          <div
            className="scrollable-content ink-rewrite"
            key={`${language}-${currentPage}`}
          >
            <div className="language-picker">
              <div
                className="current-lang"
                onClick={() => setShowLangMenu(!showLangMenu)}
              >
                {language}
              </div>
              {showLangMenu && (
                <div className="lang-dropdown">
                  {["BG", "EN", "PL", "RU"]
                    .filter((l) => l !== language)
                    .map((lang) => (
                      <div
                        key={lang}
                        className="lang-option"
                        onClick={() => {
                          setLanguage(lang);
                          setShowLangMenu(false);
                        }}
                      >
                        {lang}
                      </div>
                    ))}
                </div>
              )}
            </div>

            {language === "BG" && (
              <>
                <h1 className="prologue-title">ПРОЛОГ</h1>
                <h2 className="prologue-subtitle">1. За хобитите</h2>
                <div className="ink-text">
                  Тази книга се занимава преди всичко с хобитите — от нейните
                  страници читателят може да узнае много за техния нрав и
                  нещичко за историята им. Допълнителни сведения има и в
                  извадките от Червената книга на Западния предел, които вече
                  бяха публикувани под заглавието „Хобитът“. Те са извлечени от
                  началните глави на Червената книга, съчинени от самия Билбо,
                  първият световноизвестен хобит, и озаглавени от него „Дотам и
                  обратно“, тъй като разказват за пътешествието му на изток и
                  завръщането му — едно приключение, което по-късно въвлякло
                  всички хобити в описаните тук велики събития от онази епоха.
                  <br />
                  <br />
                  Но навярно мнозина биха пожелали още отначало да узнаят нещо
                  повече за този удивителен народ, други пък може да не
                  разполагат с предишната книга. За тия читатели сме подбрали
                  бележки по основните въпроси на хобитознанието и припомняме
                  накратко първоначалното приключение.
                  <br />
                  <br />
                  Хобитите са скромен, но много древен народ, далеч
                  по-многоброен в миналото, отколкото днес. Обичат мира, покоя и
                  хубавата орна земя, любимите им места са спретнатите, грижливо
                  обработени уединени краища. При все че изкусно боравят с
                  инструменти, те нито разбират, нито ползват (пък и никога не
                  са ползвали) каквато и да било машина, по-сложна от ковашки
                  мех, воденица или ръчен стан. Дори в добрите стари времена те
                  странели от „Големия народ“, както ни наричат, а днес са почти
                  неоткриваеми, защото с ужас ни отбягват. Надарени са с остър
                  слух и зорки очи, пъргави и ловки са, макар че имат склонност
                  към напълняване и не обичат излишната припряност. Открай време
                  владеят изкуството да изчезват бързо и безшумно, щом насреща
                  им затрополят досадните едри човеци; постепенно са развили
                  това умение дотам, че хората биха го сметнали за вълшебство.
                  Но всъщност хобитите никога не са се отдавали на
                  магьосничество и неуловимостта им се дължи единствено на
                  професионално съвършенство, стигнало (чрез наследственост,
                  практика и неразделна дружба с природа) до висота, недостъпна
                  за по-едрите и тромави народи. Защото те са малки същества,
                  по-дребни от джуджетата — не са тъй набити и яки, ала иначе не
                  им отстъпват по ръст. Високи са от два до четири фута.
                  Всъщност днес те рядко достигат три фута, ала твърдят, че са
                  издребнели, а в древността били по-едри. Според Червената
                  книга Бандобрас Тук (Бикогласния), син на Исенгрим Втори, бил
                  висок четири фута и пет инча и можел да язди кон. През цялата
                  история на хобитите само двама прочути герои от древността са
                  го задминали, но за този любопитен случай ще стане дума в
                  настоящата книга.
                  <br />
                  <br />
                  Колкото до описаните в нашия разказ хобити от Графството, през
                  своята епоха на мир и благоденствие те били весел народ.
                  Носели пъстри дрехи, като най-обичали жълтия и зеления цвят,
                  но рядко надявали обувки, защото на ходилата имали дебела и
                  жилава кожа, обрасла с гъсти и къдрави косми, наподобяващи
                  косата им — обикновено кестенява. Тъй че обущарството, за
                  разлика от останалите занаяти, не било на почит сред тях, но с
                  дългите си, изкусни пръсти хобитите умеели да изработват много
                  други полезни и хубави вещи. Лицата им обикновено не били
                  толкова красиви, колкото добродушни — широки, яснооки,
                  червенобузести, с уста винаги готова за смях, за ядене и
                  пиене. А и хобитите на драго сърце се смеели, ядели и пиели,
                  обичали да се шегуват простодушно по всяко време и се хранели
                  по шест пъти дневно (стига да имало с какво). Били
                  гостоприемни, обожавали забавите и подаръците, които охотно
                  раздавали и още по-охотно получавали.
                  <br />
                  <br />
                  Очевидно е, че въпреки по-сетнешното отчуждение хобитите са
                  наши роднини — много по-близки нам от елфите и дори от
                  джуджетата. В древността те говорели човешки езици, преиначени
                  по тяхному, а не се отличавали от хората и по онова, което
                  обичали или мразели. Ала вече не може да се открие каква точно
                  е връзката ни с тях. Произходът на хобитите се крие в
                  забравените днес Древни времена. Елфите единствени все още
                  пазят летописи за онази изчезнала епоха, но техните легенди
                  предават главно собствената им история, в която хората се
                  появяват рядко, а хобитите изобщо не се споменават. И все пак
                  ясно е, че хобитите са живеели мирно и кротко в Средната земя
                  дълги години, преди другите народи да им обърнат внимание. В
                  края на краищата светът бил пълен с безброй чудновати
                  създания, та тия дребни човечета не изглеждали кой знае колко
                  важни. Но в дните на Билбо и неговия наследник Фродо, без сами
                  да го желаят, те изведнъж станали и важни, и прочути и
                  неведнъж внасяли смут сред съветите на вълшебници и владетели.
                  <br />
                  <br />
                  Отдавна са отминали ония дни, Третата епоха на Средната земя.
                  Очертанията на всички земи са се променили, но областите,
                  населявани едно време от хобитите, са несъмнено същите, които
                  те обитават и до днес — северозападният дял на Стария свят,
                  източно от Морето. По времето на Билбо хобитите вече не
                  помнели своята изначална родина. Любовта към науката (с
                  изключение на генеалогията) не се ширела сред тях, но
                  неколцина чудаци от най-старите родове все още се ровели из
                  книгите и дори сбирали от елфи, джуджета и хора разкази за
                  древни времена и далечни страни. Собствените им летописи
                  започват едва след заселването на Графството, а най-древните
                  им легенди не се връщат по-далеч от Дните на странстване.
                  Независимо от това, преданията и очевидните особености на
                  езика и обичаите им доказват, че както много други народи в
                  далечното минало хобитите са се придвижили на запад.
                  Най-ранните им легенди загатват за времената, когда са живели
                  по горното течение на Андуин, между склоновете на Зеленогор
                  Велики и Мъгливите планини. Вече не е ясно защо подир това са
                  предприели трудния и опасен планински преход към Ериадор.
                  Преданията им нашепват как хората се множали из този край, как
                  над гората паднала сянка, та я затъмнила и я нарекли Мраколес.
                  <br />
                  <br />
                  Още преди да прекосят планините, хобитите вече се делели на
                  три донякъде различни рода: Твърдоноги, Запасливци и
                  Дъждокрийци. Твърдоногите били мургави, дребни, голобради и
                  босоноги, имали сръчни ръце и пъргави нозе, а любимите им
                  места били възвишенията и хълмистите склонове. Запасливците
                  били по-едри и широкоплещести, с мощни ръце и крака.
                  Предпочитали равнините и речните долини. Дъждокрийците били
                  по-високи и по-стройни от останалите, имали светла кожа и коса
                  и обичали дърветата и горите.
                  <br />
                  <br />
                  В древните времена Твърдоногите често общували с джуджетата и
                  дълго живели в подножията на планините. Те рано потеглили на
                  запад и пребродили Ериадор чак до Бурния връх, докато другите
                  още си стояли в Дивите земи. Това бил най-нормалният,
                  най-представителният и най-многообразният хобитов род. Имали
                  склонност към заседнал живот и най-дълго запазили потомствения
                  обичай да живеят в тунели и дупки.
                  <br />
                  <br />
                  Запасливците се задържали дълго по бреговете на Великата река
                  Андуин и не се плашели чак толкова от хората. Подир
                  Твърдоногите те също потеглили на запад, сетне слезли на юг по
                  течението на Шумноструйка. Мнозина от тях се заселили между
                  Тарбад и границите на страната Дун, преди отново да се
                  прехвърлят на север.
                  <br />
                  <br />
                  Дъждокрийците, най-малобройните, били северняшки род. За
                  разлика от останалите хобити те дружали с елфите и били
                  по-изкусни в словата и песните, отколкото в занаятите. В
                  древността предпочитали лова пред земеделието. Те пресекли
                  планините северно от Ломидол и се спуснали по река
                  Скрежноблик. В Ериадор скоро се размесили с другите родове, но
                  бидейки малко по-смели и предприемчиви, често се издигали като
                  предводители и вождове на кланове сред Твърдоногите и
                  Запасливците. Дори по времето на Билбо яката дъждокрийска
                  жилка все още си личала сред най-почитаните родове, например
                  Туковци или Господарите на Фуков край.
                  <br />
                  <br />
                  В западните области на Ериадор, между Мъгливите и Лунните
                  планини, хобитите заварили хора и елфи. Там още живеели
                  последните Дунеданци, потомци на кралете, които някога
                  доплавали от Задмория, ала редиците им бързо се топели и
                  земите на Северното кралство запустели надлъж и нашир. За
                  пришълците имало място в изобилие и не след дълго хобитите
                  започнали да създават спретнати общини. По времето на Билбо
                  повечето ранни поселения отдавна били изчезнали и забравени,
                  но едно от първите значителни селища, макар и позападнало, все
                  още съществувало — Брее, сред гората Кестенака, на около
                  четиридесет мили източно от Графството.
                  <br />
                  <br />
                  Няма съмнение, че тъкмо в ония ранни дни хобитите се научили
                  на четмо и започнали да пишат буквите на Дунеданците, които от
                  своя страна отдавна били заимствали това изкуство от елфите.
                  Пак по онова време те забравили прежните си наречия и оттогава
                  насетне заговорили на Общия език, наричан Западняшки и
                  общоприет из всички земи на кралете от Арнор до Гондор, по
                  цялото Морско крайбрежие от залива Белфалас до Лунния залив.
                  От миналото все пак запазили някои свои думи, названията на
                  месеците и дните, както и множество лични имена.
                  <br />
                  <br />
                  По онова време хобитовите легенди за пръв път се превръщат в
                  история с точно летоброене. През 1601 година на Третата епоха
                  братята Дъждокрийци Марчо и Бланко потеглили от Брее и като
                  получили разрешение от Великия крал във Форност[1], пресекли
                  мътната река Барандуин, последвани от безчет хобити. Те минали
                  по Сводокаменния мост, съграден в славните времена на
                  Северното кралство, и взели за своя родина цялата земя отвъд
                  реката, чак до Далечните ридове. От тях се изисквало само да
                  поддържат в изправност Големия мост и всички останали мостове
                  и пътища, да помагат на кралските вестоносци и да признават
                  владетеля.
                  <br />
                  <br />
                  Така започва Летоброенето на Графството, защото годината на
                  преминаването през Брендивин (както хобитите преиначили името
                  на реката) станала Година първа на Графството и всички
                  по-късни дати се отчитали от нея[2]. Западните хобити тутакси
                  обикнали своята нова страна, останали там и скоро отново
                  изчезнали от историята на хората и елфите. Докато все още
                  имало крал, те официално се числели за негови поданици, но на
                  дело се подчинявали на собствените си вождове и изобщо не се
                  месели в събитията на външния свят. По време на сетното
                  сражение край Форност против Ангмарския крал-чародей те
                  пратили няколко стрелци на помощ на своя крал, макар никоя от
                  легендите на хората да не го споменава. Ала тази война донесла
                  гибелта на Северното кралство; тогава хобитите обявили
                  страната за своя и избрали измежду вождовете си Тан, който да
                  поеме властта на загиналия крал. Цяло хилядолетие войните
                  почти не ги засягали и подир Черната чума (37 г. от Л. Г.) те
                  добрували и се множали чак до злощастната Дълга зима и
                  последвалия Велик глад. Хиляди измрели тогава, но по времето,
                  когато започва нашата история, Сиромашките години (1158–1160)
                  били далечно минало и хобитите отново се радвали на изобилие.
                  Страната била богата и плодородна — вярно, на идване я
                  заварили отдавна запустяла, но още личало, че е била
                  обработвана добре в древни времена, когато кралят владеел там
                  много ферми, житници, лозя и гори.
                  <br />
                  <br />
                  Земите им се простирали на четиридесет левги от Далечните
                  ридове до Моста на Брендивин и на петдесет левги от северните
                  пущинаци до блатата на юг. Хобитите ги нарекли Графство, като
                  територия под властта на техния Тан и като добропорядъчна
                  област. Заживели наистина добропорядъчно в това приятно
                  затънтено кътче и все по-рядко се интересували от мрачните
                  събития на далечния свят, докато повярвали, че в Средната земя
                  мирът и изобилието са законно право на всички здравомислещи.
                  Те забравяли или пренебрегвали малкото, което знаели за
                  Пазителите и за делата на ония, които охранявали дългия покой
                  на Графството. Намирали се под закрила, ала вече не си
                  спомняли за това.
                  <br />
                  <br />
                  Хобитите не са войнствени и никога не са се сражавали помежду
                  си. Разбира се, в древността често им се налагало да воюват,
                  за да оцелеят в един суров свят, ала по времето на Билбо това
                  било отдавна отминала история. Последното сражение преди
                  началото на нашия разказ и единственото в границите на
                  Графството било още в незапомнени времена — Битката на
                  Зелените поля, 1147 г. от Л. Г., когато Бандорбас Тук
                  отблъснал нашествието на орките. Дори климатът се смекчил и
                  само в бабините приказки все още се мяркали вълците, които
                  идели от север да плячкосват в някогашните мразовити зими.
                  Макар че в Графството все още имало известни запаси от оръжие,
                  те най-често висели като трофеи над камините или се трупали
                  накуп в музея в Голям Дълбалник, наричан Дом на матомите. С
                  думата матом хобитите означавали всеки безполезен предмет,
                  който не желаели да изхвърлят. Жилищата им честичко се
                  задръствали с матоми, каквито били и многото подаръци,
                  минаващи от ръка на ръка.
                  <br />
                  <br />
                  Въпреки мира и охолството този народ си останал удивително як.
                  Стигнело ли се до бой, врагът осъзнавал, че трудно ще ги
                  изплаши или затрие. И може би неизчерпаемата им любов към
                  хубавите неща се дължала тъкмо на това, че в тежък час можели
                  да се лишат от тях и със своята издръжливост пред ударите на
                  скръб, враг или буря да смаят ония, които не ги познавали
                  добре и съдели за тях само по коремчетата и закръглените им
                  лица. Макар че трудно се разгневявали и не посягали за
                  развлечение на нищо живо, те ставали храбри в безизходица и
                  още умеели да въртят оръжие. Добре стреляли с лък, защото
                  имали зорко око и точна ръка. А можели да се справят и без
                  лък. Влезело ли животно в нивите им, запомняло завинаги, че ще
                  е добре бързо да се скрие, щом някой хобит посегне за камък.
                  <br />
                  <br />
                  Отначало всички хобити живеели в подземни дупки, поне така
                  смятат те. И до днес им е най-уютно в подобни жилища, но
                  постепенно им се наложило да привикнат към по-други домове. По
                  времето на Билбо само най-богатите и най-бедните хобити от
                  Графството се придържали към стария обичай. Сиромасите
                  продължавали да живеят в най-примитивни бърлоги — просто дупки
                  с по едно прозорче, а понякога и без него; заможните пък
                  изграждали по-луксозни подобия на някогашните скромни
                  леговища. Но не навсякъде се намирали подходящи места за тия
                  просторни и разклонени тунели (наричани смялове). Хобитите се
                  множали и в ниските и равнинни области започнали да строият
                  домове над земята. Дори в хълмистите райони и в най-старите
                  села като Хобитово, Скътана паланка или в главната община на
                  Графството, Голям Дълбалник на Белите ридове, вече имало много
                  дървени, тухлени и каменни къщи. Особено ги харесвали
                  мелничарите, ковачите, въжарите, коларите и други занаятчии,
                  защото дори когато имали дупки на разположение, хобитите били
                  свикнали да строят сайванти и работилници.
                  <br />
                  <br />
                  Казват, че обичаят да се строят големи къщи и хамбари тръгнал
                  от жителите на Мочурището край бреговете на Брендивин.
                  Хобитите от този край, Източната околия, били сравнително едри
                  и тежконоги, а в дъждовно време обували ботуши като
                  джуджетата. Но не било тайна, че в жилите им тече запасливска
                  кръв, както личало и от мъха по брадите на мнозина от тях.
                  Подобна растителност не се срещала нито у Твърдоногите, нито у
                  Дъждокрийците. Всъщност повечето жители на Мочурището (и на
                  зеления по-късно Фуков край, източно от Реката) пристигнали в
                  Графството от далечния юг; те запазили множество чудновати
                  имена и странни думи, каквито не се срещали другаде из
                  Графството.
                  <br />
                  <br />
                  Както много други занаяти, вероятно и умението да градят
                  произхождало от Дунеданците. Но не е изключено хобитите да са
                  го възприели направо от елфите, учители на хората в ранните
                  години на тяхната история. Защото по онова време Върховните
                  елфи не били напуснали Средната земя и все още живеели край
                  Сивите заливи, далеч на запад, а се срещали и в по-близки до
                  Графството области. От незапомнени времена три елфически кули
                  се издигали на Стражевите хълмове, отвъд западната граница. В
                  лунни нощи сиянието им се виждало отдалеч. Най-високата и
                  най-далечната се реела самотно над зелена могила. Хобитите от
                  Западната околия разказвали, че от нейния връх се вижда
                  Морето, но не помнели някой хобит да се е изкачил дотам.
                  Малцина били виждали морето, малцина плавали по него и почти
                  никой не се завръщал да разкаже за това. Повечето хобити
                  изпитвали боязън дори от реките и лодките; само единици знаели
                  да плуват. Година подир година те все по-рядко общували с
                  елфите, докато започнали да се плашат и от тях и да гледат с
                  недоверие на техните приятели. А морето се превръщало в
                  страшна дума, в гибелен символ, и те отвърнали лица от
                  Западните хълмове.
                  <br />
                  <br />
                  Независимо дали е усвоено от елфите или от хората, изкуството
                  им да градят било своеобразно. Хобитите не издигали кули.
                  Обикновено къщите им били дълги, ниски и удобни. Най-старите
                  сгради просто имитирали смялове, с покриви от суха трева,
                  слама или чимове и с леко изпъкнали стени. Този етап обаче бил
                  отдавна отминал, строителството на хобитите се усъвършенствало
                  чрез самостоятелно открити или заимствани от джуджетата
                  похвати. Като главна архитектурна особеност им останало само
                  предпочитанието към кръглите прозорци и дори кръгли врати.
                  <br />
                  <br />
                  Хобитите от Графството имали големи домове, изпълнени с
                  многобройна челяд. (Ергените Билбо и Фродо Торбинс били
                  изключително явление, но те изобщо си били особняци и дори
                  дружели с елфите.) Понякога, какъвто е случаят с Туковци от
                  Големите Смялове или Брендифуковци от Бренди-палат, няколко
                  роднински поколения съжителствали (относително) мирно в
                  безбройните тунели на своя родов замък. Всички хобити без
                  изключение се делели на кланове и много грижливо пресмятали
                  роднинските си връзки. За целта чертаели дълги и обстойни
                  родословни дървета с безброй разклонения. Когато човек има
                  работа with хобити, важно е да помни кой кому е роднина и в
                  каква степен. Невъзможно би било да изложим в тази книга
                  родословно дърво, включващо поне основните членове на
                  най-значителните родове по времето, от което започва нашият
                  разказ. Генеалогичните дървета, приложени към Червената книга
                  на Западния предел, заемат цяло отделно томче и всички освен
                  хобитите биха ги сметнали за извънредно скучни. Ала хобитите
                  обожавали подобни неща, стига да са точни. Такива книги
                  обичали — пълни с вече известни неща, изложени просто и ясно,
                  без противоречия.
                  <div className="prologue-notes">
                    <hr className="notes-divider" />
                    <p>
                      [1] Според летописите на Гондор това е бил Аргелеб II,
                      двадесетият крал от Северната династия, прекъсваща триста
                      години по-късно при владичеството на Арведуи. — Б.а.
                    </p>
                    <p>
                      [2] Така че, прибавяйки към датите на Летоброенето на
                      Графството 1600, можем да ги приведем към годините на
                      Третата епоха по летописите на елфите и Дунеданците. —
                      Б.а.
                    </p>
                    <div className="page-navigation">
                      <div className="ink-divider"></div>
                      <button
                        className="next-page-btn"
                        onClick={handleNextPage}
                      >
                        <svg className="runic-arrow" viewBox="0 0 100 100">
                          <path
                            d="M20 50 L80 50 M55 25 L80 50 L55 75"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {language === "EN" && (
              <>
                <h1 className="prologue-title">PROLOGUE</h1>
                <h2 className="prologue-subtitle">1 Concerning Hobbits</h2>
                <div className="ink-text">
                  This book is largely concerned with Hobbits, and from its
                  pages a reader may discover much of their character and a
                  little of their history. Further information will also be
                  found in the selection from the Red Book of Westmarch that has
                  already been published, under the title of The Hobbit. That
                  story was derived from the earlier chapters of the Red Book,
                  composed by Bilbo himself, the first Hobbit to become famous
                  in the world at large, and called by him There and Back Again,
                  since they told of his journey into the East and his return:
                  an adventure which later involved all the Hobbits in the great
                  events of that Age that are here related.
                  <br />
                  <br />
                  Many, however, may wish to know more about this remarkable
                  people from the outset, while some may not possess the earlier
                  book. For such readers a few notes on the more important
                  points are here collected from Hobbit-lore, and the first
                  adventure is briefly recalled.
                  <br />
                  <br />
                  Hobbits are an unobtrusive but very ancient people, more
                  numerous formerly than they are today; for they love peace and
                  quiet and good tilled earth: a well-ordered and wellfarmed
                  countryside was their favourite haunt. They do not and did not
                  understand or like machines more complicated than a
                  forge-bellows, a water-mill, or a hand-loom, though they were
                  skilful with tools. Even in ancient days they were, as a rule,
                  shy of ‘the Big Folk’, as they call us, and now they avoid us
                  with dismay and are becoming hard to find. They are quick of
                  hearing and sharp-eyed, and though they are inclined to be fat
                  and do not hurry unnecessarily, they are nonetheless nimble
                  and deft in their movements.
                  <br />
                  <br />
                  They possessed from the first the art of disappearing swiftly
                  and silently, when large folk whom they do not wish to meet
                  come blundering by; and this art they have developed until to
                  Men it may seem magical. But Hobbits have never, in fact,
                  studied magic of any kind, and their elusiveness is due solely
                  to a professional skill that heredity and practice, and a
                  close friendship with the earth, have rendered inimitable by
                  bigger and clumsier races. For they are a little people,
                  smaller than Dwarves: less stout and stocky, that is, even
                  when they are not actually much shorter. Their height is
                  variable, ranging between two and four feet of our measure.
                  They seldom now reach three feet; but they have dwindled, they
                  say, and in ancient days they were taller. According to the
                  Red Book, Bandobras Took (Bullroarer), son of Isumbras the
                  Third, was four foot five and able to ride a horse. He was
                  surpassed in all Hobbit records only by two famous characters
                  of old; but that curious matter is dealt with in this book.
                  <br />
                  <br />
                  As for the Hobbits of the Shire, with whom these tales are
                  concerned, in the days of their peace and prosperity they were
                  a merry folk. They dressed in bright colours, being notably
                  fond of yellow and green; but they seldom wore shoes, since
                  their feet had tough leathery soles and were clad in a thick
                  curling hair, much like the hair of their heads, which was
                  commonly brown. Thus, the only craft little practised among
                  them was shoe-making; but they had long and skilful fingers
                  and could make many other useful and comely things. Their
                  faces were as a rule good-natured rather than beautiful,
                  broad, bright-eyed, red-cheeked, with mouths apt to laughter,
                  and to eating and drinking. And laugh they did, and eat, and
                  drink, often and heartily, being fond of simple jests at all
                  times, and of six meals a day (when they could get them). They
                  were hospitable and delighted in parties, and in presents,
                  which they gave away freely and eagerly accepted.
                  <br />
                  <br />
                  It is plain indeed that in spite of later estrangement Hobbits
                  are relatives of ours: far nearer to us than Elves, or even
                  than Dwarves. Of old they spoke the languages of Men, after
                  their own fashion, and liked and disliked much the same things
                  as Men did. But what exactly our relationship is can no longer
                  be discovered. The beginning of Hobbits lies far back in the
                  Elder Days that are now lost and forgotten. Only the Elves
                  still preserve any records of that vanished time, and their
                  traditions are concerned almost entirely with their own
                  history, in which Men appear seldom and Hobbits are not
                  mentioned at all. Yet it is clear that Hobbits had, in fact,
                  lived quietly in Middle-earth for many long years before other
                  folk became even aware of them. And the world being after all
                  full of strange creatures beyond count, these little people
                  seemed of very little importance. But in the days of Bilbo,
                  and of Frodo his heir, they suddenly became, by no wish of
                  their own, both important and renowned, and troubled the
                  counsels of the Wise and the Great.
                  <br />
                  <br />
                  Those days, the Third Age of Middle-earth, are now long past,
                  and the shape of all lands has been changed; but the regions
                  in which Hobbits then lived were doubtless the same as those
                  in which they still linger: the North-West of the Old World,
                  east of the Sea. Of their original home the Hobbits in Bilbo’s
                  time preserved no knowledge. A love of learning (other than
                  genealogical lore) was far from general among them, but there
                  remained still a few in the older families who studied their
                  own books, and even gathered reports of old times and distant
                  lands from Elves, Dwarves, and Men. Their own records began
                  only after the settlement of the Shire, and their most ancient
                  legends hardly looked further back than their Wandering Days.
                  It is clear, nonetheless, from these legends, and from the
                  evidence of their peculiar words and customs, that like many
                  other folk Hobbits had in the distant past moved westward.
                  Their earliest tales seem to glimpse a time when they dwelt in
                  the upper vales of Anduin, between the eaves of Greenwood the
                  Great and the Misty Mountains. Why they later undertook the
                  hard and perilous crossing of the mountains into Eriador is no
                  longer certain. Their own accounts speak of the multiplying of
                  Men in the land, and ofa shadow that fell on the forest, so
                  that it became darkened and its new name was Mirkwood.
                  <br />
                  <br />
                  Before the crossing of the mountains the Hobbits had already
                  become divided into three somewhat different breeds: Harfoots,
                  Stoors, and Fallohides. The Harfoots were browner of skin,
                  smaller, and shorter, and they were beardless and bootless;
                  their hands and feet were neat and nimble; and they preferred
                  highlands and hillsides. The Stoors were broader, heavier in
                  build; their feet and hands were larger; and they preferred
                  flat lands and riversides. The Fallohides were fairer of skin
                  and also of hair, and they were taller and slimmer than the
                  others; they were lovers of trees and of woodlands.
                  <br />
                  <br />
                  The Harfoots had much to do with Dwarves in ancient times, and
                  long lived in the foothills of the mountains. They moved
                  westward early, and roamed over Eriador as far as Weathertop
                  while the others were still in Wilderland. They were the most
                  normal and representative variety of Hobbit, and far the most
                  numerous. They were the most inclined to settle in one place,
                  and longest preserved their ancestral habit of living in
                  tunnels and holes.
                  <br />
                  <br />
                  The Stoors lingered long by the banks of the Great River
                  Anduin, and were less shy of Men. They came west after the
                  Harfoots and followed the course of the Loudwater southwards;
                  and there many of them long dwelt between Tharbad and the
                  borders of Dunland before they moved north again.
                  <br />
                  <br />
                  The Fallohides, the least numerous, were a northerly branch.
                  They were more friendly with Elves than the other Hobbits
                  were, and had more skill in language and song than in
                  handicrafts; and of old they preferred hunting to tilling.
                  They crossed the mountains north of Rivendell and came down
                  the River Hoarwell. In Eriador they soon mingled with the
                  other kinds that had preceded them, but being somewhat bolder
                  and more adventurous, they were often found as leaders or
                  chieftains among clans of Harfoots or Stoors. Even in Bilbo’s
                  time the strong Fallohidish strain could still be noted among
                  the greater families, such as the Tooks and the Masters of
                  Buckland.
                  <br />
                  <br />
                  In the westlands of Eriador, between the Misty Mountains and
                  the Mountains of Lune, the Hobbits found both Men and Elves.
                  Indeed, a remnant still dwelt there of the Du´nedain, the
                  kings of Men that came over the Sea out of Westernesse; but
                  they were dwindling fast and the lands of their North Kingdom
                  were falling far and wide into waste. There was room and to
                  spare for incomers, and ere long the Hobbits began to settle
                  in ordered communities. Most of their earlier settlements had
                  long disappeared and been forgotten in Bilbo’s time; but one
                  of the first to become important still endured, though reduced
                  in size; this was at Bree and in the Chetwood that lay round
                  about, some forty miles east of the Shire.
                  <br />
                  <br />
                  It was in these early days, doubtless, that the Hobbits
                  learned their letters and began to write after the manner of
                  the Du´nedain, who had in their turn long before learned the
                  art from the Elves. And in those days also they forgot
                  whatever languages they had used before, and spoke ever after
                  the Common Speech, the Westron as it was named, that was
                  current through all the lands of the kings from Arnor to
                  Gondor, and about all the coasts of the Sea from Belfalas to
                  Lune. Yet they kept a few words of their own, as well as their
                  own names of months and days, and a great store of personal
                  names out of the past.
                  <br />
                  <br />
                  About this time legend among the Hobbits first becomes history
                  with a reckoning of years. For it was in the one thousand six
                  hundred and first year of the Third Age that the Fallohide
                  brothers, Marcho and Blanco, set out from Bree; and having
                  obtained permission from the high king at Fornost,* they
                  crossed the brown river Baranduin with a great following of
                  Hobbits. They passed over the Bridge of Stonebows, that had
                  been built in the days of the power of the North Kingdom, and
                  they took all the land beyond to dwell in, between the river
                  and the Far Downs. All that was demanded of them was that they
                  should keep the Great Bridge in repair, and all other bridges
                  and roads, speed the king’s messengers, and acknowledge his
                  lordship. <br />
                  <br />
                  Thus began the Shire-reckoning, for the year of the crossing
                  of the Brandywine (as the Hobbits turned the name) became Year
                  One of the Shire, and all later dates were reckoned from it.*
                  At once the western Hobbits fell in love with their new land,
                  and they remained there, and soon passed once more out of the
                  history of Men and of Elves. While there was still a king they
                  were in name his subjects, but they were, in fact, ruled by
                  their own chieftains and meddled not at all with events in the
                  world outside. To the last battle at Fornost with the
                  Witch-lord of Angmar they sent some bowmen to the aid of the
                  king, or so they maintained, though no tales of Men record it.
                  But in that war the North Kingdom ended; and then the Hobbits
                  took the land for their own, and they chose from their own
                  chiefs a Thain to hold the authority of the king that was
                  gone. There for a thousand years they were little troubled by
                  wars, and they prospered and multiplied after the Dark Plague
                  (S.R. 37) until the disaster of the Long Winter and the famine
                  that followed it. Many thousands then perished, but the Days
                  of Dearth (1158–60) were at the time of this tale long past
                  and the Hobbits had again become accustomed to plenty. The
                  land was rich and kindly, and though it had long been deserted
                  when they entered it, it had before been well tilled, and
                  there the king had once had many farms, cornlands, vineyards,
                  and woods. <br />
                  <br />* As the records of Gondor relate this was Argeleb II,
                  the twentieth of the Northern line, which came to an end with
                  Arvedui three hundred years later.
                </div>
              </>
            )}
          </div>
        </div>

        <div className={`parchment-note ${isEntering ? "show-note" : ""}`}>
          <div className="parchment-texture"></div>
          <div className="note-content">
            <span className="note-label">
              Companions by the
              <br />
              Fireplace
            </span>
            <span
              className={`note-value ${
                isNumberVisible ? "fade-in-ink" : "fade-out-ink"
              }`}
            >
              {activeUsers}
            </span>
          </div>
        </div>
      </div>

      {isSecretActive && (
        <div className="dark-overlay">
          <div className="secret-pixel" onClick={handlePixelClick} />
        </div>
      )}
    </div>
  );
}
