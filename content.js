/* Last Signal — all text content (AR / EN) and NASA sources.
   Every fact here comes from a NASA / JPL page listed in SRC. */
window.SRC = {
  mission: {t:'NASA — Mars Exploration Rovers: Spirit and Opportunity (mission page)', u:'https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/'},
  end:     {t:"NASA/JPL — NASA's Opportunity Rover Mission on Mars Comes to End (Feb 13, 2019)", u:'https://www.jpl.nasa.gov/news/nasas-opportunity-rover-mission-on-mars-comes-to-end/'},
  astro:   {t:'NASA Astrobiology — Opportunity Rover Mission Comes to an End', u:'https://astrobiology.nasa.gov/news/opportunity-rover-mission-comes-to-an-end/'},
  record:  {t:"NASA/JPL — Perseverance Sets Off-World Record for Total Distance Driven (Oct 12, 2026)", u:'https://www.jpl.nasa.gov/news/nasas-perseverance-sets-off-world-record-for-total-distance-driven/'},
  power:   {t:'NASA — Self-Portrait by Freshly Cleaned Opportunity (March 2014)', u:'https://science.nasa.gov/resource/self-portrait-by-freshly-cleaned-opportunity-mars-rover-in-march-2014/'},
  PIA17759:{t:'PIA17759 — Self-Portrait by Opportunity, January 2014', u:'https://science.nasa.gov/photojournal/self-portrait-by-opportunity-mars-rover-in-january-2014', c:'NASA/JPL-Caltech/Cornell Univ./Arizona State Univ.'},
  PIA19113:{t:'PIA19113 — Martian Concretions Near Fram Crater', u:'https://science.nasa.gov/photojournal/martian-concretions-near-fram-crater/', c:'NASA/JPL-Caltech/Cornell/USGS'},
  PIA05586:{t:"PIA05586 — 'Blueberry' Triplets Born in Rock", u:'https://science.nasa.gov/photojournal/blueberry-triplets-born-in-rock/', c:'NASA/JPL/Cornell/USGS'},
  PIA05585:{t:'PIA05585 — Microscopic image of El Capitan', u:'https://photojournal.jpl.nasa.gov/catalog/PIA05585', c:'NASA/JPL'},
  PIA05587:{t:"PIA05587 — A Bowl of Hematite-Rich 'Berries'", u:'https://science.nasa.gov/photojournal/a-bowl-of-hematite-rich-berries/', c:'NASA/JPL/Cornell/University of Mainz'},
  PIA09077:{t:"PIA09077 — Big Spherules near 'Victoria'", u:'https://science.nasa.gov/photojournal/big-spherules-near-victoria', c:'NASA/JPL-Caltech/Cornell/USGS'},
  PIA22929:{t:"PIA22929 — Opportunity's Last Message", u:'https://science.nasa.gov/resource/opportunitys-last-message/', c:'NASA/JPL-Caltech/Cornell/ASU'},
  PIA22909:{t:'PIA22909 — Opportunity Legacy Pan', u:'https://science.nasa.gov/photojournal/opportunity-legacy-pan-true-color', c:'NASA/JPL-Caltech/Cornell/ASU'},
  model:   {t:'NASA/JPL-Caltech — Spirit and Opportunity Rover 3D Model', u:'https://science.nasa.gov/resource/spirit-and-opportunity-rover-3d-model/', c:'NASA/JPL-Caltech'},
  berries: {t:'NASA/JPL — Mineral in Mars \'Berries\' Adds to Water Story', u:'https://www.jpl.nasa.gov/news/mineral-in-mars-berries-adds-to-water-story/'},
  mi:      {t:'NASA NTRS — Overview of Athena Microscopic Imager Results (31 microns/pixel)', u:'https://ntrs.nasa.gov/citations/20050169992'},
  usage:   {t:'NASA Images and Media Usage Guidelines', u:'https://www.nasa.gov/nasa-brand-center/images-and-media/'}
};

/* Ball positions in PIA19113 (normalized x,y,r) for the "find the spheres" challenge */
window.BALLS_19113 = [
  [.675,.214,.115],[.336,.446,.08],[.099,.541,.062],[.206,.497,.058],[.684,.557,.066],[.880,.534,.06],
  [.381,.708,.055],[.102,.706,.06],[.670,.826,.058],[.543,.641,.048],[.455,.799,.048],[.380,.595,.045],
  [.910,.733,.05],[.817,.808,.042],[.545,.530,.045],[.469,.464,.035],[.282,.859,.045],[.800,.408,.04]
];

window.CONTENT = {
ar:{
  dir:'rtl', brand:'آخر إشارة', langBtn:'EN', evidence:'الأدلة', board:'لوحة الأدلة', boardEmpty:'لم تجمع أدلة بعد.',
  close:'إغلاق', next:'التالي', continue:'تابع', check:'تحقّق', sources:'المصادر', sim:'محاكاة', real:'صورة حقيقية', skip:'تخطَّ',
  newCard:'بطاقة دليل جديدة', didYouKnow:'هل تعلم؟',
  restartT:'العودة إلى البداية', restartQ:'هل تريد إعادة التجربة من البداية؟ ستُمسح الأدلة التي جمعتها.', restartYes:'نعم، من البداية', cancel:'إلغاء',
  start:'ابدأ', headphones:'للتجربة الكاملة: شغّل الصوت أو استخدم السماعات',
  opening:{
    hud1:'MER-B · OPPORTUNITY', hud2:'PERSEVERANCE VALLEY · MARS',
    power:'الطاقة', lowpower:'طاقة منخفضة', receiving:'استقبال بيانات…', fault:'فقدان الطاقة',
    caps:[
      ['المريخ · 2018','Opportunity تعمل منذ 14 عامًا… وقد صُممت لتعمل 90 يومًا مريخيًا فقط.'],
      ['صيف 2018','عاصفة غبار تبدأ بالانتشار حتى تغطي الكوكب كله.'],
      ['','الغبار يحجب الشمس… والألواح الشمسية لا تجد ضوءًا تشحن به البطاريات.'],
      ['10 يونيو 2018','آخر إرسال يصل إلى الأرض.']],
    lost:'SIGNAL LOST', lostAr:'آخر إشارة',
    q:'هذه آخر صورة وصلت من Opportunity. ماذا حدث قبلها؟',
    btn:'افتح أرشيف المهمة',
    note:'المشهد إعادة تصوّر مبنية على وقائع ناسا. الصورة حقيقية: PIA22929، آخر بيانات أرسلتها Opportunity في 10 يونيو 2018.'
  },
  ch1:{
    kicker:'الفصل 1', title:'كيف كانت تستكشف؟',
    intro:'هذه Opportunity، مجسم ثلاثي الأبعاد من ناسا. سنفحص ثلاثة أجزاء منها بالترتيب، وكل جزء يكشف لك كيف عملت هذه المركبة على كوكب آخر.',
    fact:'انطلقت Opportunity صيف 2003، وهبطت في سهل Meridiani على المريخ في 24 يناير 2004.',
    start:'ابدأ بالجزء الأول',
    tapPart:'اضغط النقطة المضيئة على المركبة',
    solar:{
      part:'الألواح الشمسية', q:'كيف عملت 14 عامًا بدل 90 يومًا؟',
      how:'كيف يؤثر الغبار على الألواح؟',
      steps:[
        'الألواح الشمسية تحوّل ضوء الشمس إلى كهرباء تشحن بطاريات المركبة.',
        'غبار المريخ ناعم جدًا، يحمله الهواء ثم يستقر ببطء فوق الألواح.',
        'كلما زادت طبقة الغبار، قلّ الضوء الذي يصل إلى الخلايا، فتقل الكهرباء.',
        'أحيانًا تهب رياح تزيل جزءًا من الغبار، ويسمّيها العلماء «أحداث تنظيف».'],
      lead:'جرّب الأحداث الثلاثة وراقب كيف يتغير الضوء والطاقة.',
      sc:[['dust','غبار يترسّب على الألواح'],['wind','رياح تمر فوق المركبة'],['storm','عاصفة غبار في الجو']],
      res:{dust:'الغبار غطّى الخلايا فحجب جزءًا من الضوء، فقلّت الطاقة.', wind:'الرياح أزالت جزءًا من الغبار، فوصل الضوء من جديد ورجعت الطاقة.', storm:'العاصفة حجبت ضوء الشمس نفسه قبل أن يصل إلى الألواح، فانهارت الطاقة.'},
      cells:'الخلايا الشمسية', light:'ضوء الشمس',
      ask:'إذن، ما الذي ساعدها على العيش أطول بكثير مما خُطّط له؟',
      opts:[
        ['الرياح كانت تنظّف الألواح أحيانًا، فترجع الطاقة',true,'صحيح. في يناير 2014 كانت الألواح تنتج أقل من 375 واط·ساعة يوميًا، وبعد أن نظّفتها الرياح أنتجت أكثر من 620 واط·ساعة في منتصف أبريل 2014.'],
        ['كانت تحمل وقودًا احتياطيًا',false,'Opportunity لا تستخدم وقودًا؛ طاقتها من ضوء الشمس فقط.'],
        ['كان العلماء ينظّفون الألواح عن بُعد',false,'لم تكن في المركبة أداة لتنظيف الألواح. الذي نظّفها هو رياح المريخ.']],
      fig:'صورة ذاتية، يناير 2014: الغبار ما زال على الألواح بعد أيام من رياح أزالت جزءًا منه.',
      ev:['الألواح والغبار','الغبار يقلل الطاقة، والرياح نظّفت الألواح فأطالت عمر المهمة.']
    },
    pancam:{
      part:'Pancam (الكاميرا البانورامية)', q:'ماذا رأت Opportunity بين الصخور؟',
      lead:'Pancam على رأس الصاري هي «عيون» المركبة. لاحظ العلماء حبيبات غريبة على الأرض، فاقتربت الذراع وصوّرتها بالكاميرا المجهرية.',
      task:'اضغط على 3 كرات صغيرة في الصورة.',
      found:'وجدت', of:'من',
      miss:'هذه ليست كرة. ابحث عن شكل مستدير.',
      done:'سمّاها العلماء «التوت الأزرق»، مع أنها في الحقيقة رمادية أكثر منها زرقاء. المساحة في الصورة 3 سم فقط.',
      fact:'يصل قطر هذه الكرات إلى نحو 5 ملم، أي بحجم حبة صغيرة.',
      fig:'صورة من الكاميرا المجهرية، أضيف لها اللون من الكاميرا البانورامية. المساحة الظاهرة 3 سم.',
      ev:['كرات غامضة','كرات صغيرة كثيرة منتشرة على سطح Meridiani.']
    },
    arm:{
      part:'الذراع العلمية', q:'كيف تفحص المركبة صخرة على كوكب آخر؟',
      lead:'الذراع تحمل أدوات مثل حقيبة الجيولوجي. اختر مهمة، ثم اختر الأداة التي تنفّذها.',
      tasksT:'المهمة', toolsT:'الأداة',
      tasks:[['mi','تصوير التفاصيل الصغيرة جدًا'],['rat','كشط السطح المغبّر لرؤية داخل الصخرة'],['mb','معرفة معادن الحديد في الصخرة']],
      tools:[['mi','الكاميرا المجهرية (MI)'],['rat','أداة كشط الصخور (RAT)'],['mb','مطياف Mössbauer']],
      pickTask:'اختر مهمة أولًا.', wrong:'ليست هذه الأداة. جرّب غيرها.',
      done:'ممتاز! ستستخدم أداتين منها لتحل قضية الفصل القادم.',
      fact:'اختار العلماء سهل Meridiani لأن المركبات المدارية رصدت فيه معدن الهيماتيت من الفضاء، وهذا المعدن على الأرض يتكوّن غالبًا مع الماء.',
      ev:['أدوات الذراع','الكاميرا المجهرية للتفاصيل، وRAT لكشط السطح، وMössbauer لمعادن الحديد.']
    },
    outro:'عرفتَ كيف كانت Opportunity تستكشف. الآن حان وقت فهم ما وجدته.',
    outroFact:'في 2004 التقطت Opportunity بانوراما لمنطقة فوهة Eagle سمّاها الفريق «Lion King»، وتكوّنت من 558 صورة وأكثر من 75 ميجابايت من البيانات.',
    outroBtn:'افتح قضية الكرات الرمادية'
  },
  ch2:{
    kicker:'الفصل 2', title:'قضية الكرات الرمادية',
    steps:['المشتبهون','الدليل 1','الدليل 2','الدليل 3','الحكم'],
    suspects:[
      ['volcano','🌋','بركان','قذف قطرات من صخر منصهر سقطت على الأرض'],
      ['meteor','☄️','نيزك','اصطدم بالمريخ فتطايرت قطرات منصهرة'],
      ['wheels','🛞','عجلات المركبة','صنعتها العجلات وهي تتحرك'],
      ['water','💧','ماء جوفي','جعلها تنمو ببطء داخل الصخر']],
    out:'مستبعَد', left:'مشتبه',
    case:{
      lead:'وجدت Opportunity آلاف الكرات الصغيرة. من أين جاءت؟ أمامك أربعة تفسيرات. مهمتك: اجمع ثلاثة أدلة حقيقية، واستبعد كل تفسير لا يتفق معها.',
      go:'ابدأ التحقيق'
    },
    clue1:{
      tool:'أداتك: الكاميرا المجهرية', title:'الدليل 1: الطبقات',
      lead:'هذه صخرة اسمها El Capitan، مكوّنة من طبقات رقيقة جدًا. حرّك العدسة المكبرة فوق الصورة وابحث عن كرة داخل الصخرة.',
      task:'حرّك العدسة واضغط عندما تجد الكرة.',
      found:'وجدتها! انظر للطبقات حولها: تمر من جانبها مستقيمة، ولا تنحني تحتها.',
      think:'فكّر: لو سقطت قطرة ثقيلة من السماء على طبقات طرية، ماذا سيحدث للطبقات؟',
      thinkA:'ستنحني أو تنكسر تحتها. لكن الطبقات هنا مستقيمة، إذن الكرة لم تسقط من الأعلى.',
      elim:'استبعد المشتبهَين اللذين يفترضان أن الكرات سقطت من السماء.',
      wrongElim:'هذا المشتبه لا يعتمد على السقوط من السماء. ابحث عن اللذين يسقطان من الأعلى.',
      done:'استبعدت البركان والنيزك.',
      fig:'El Capitan: كرة داخل طبقات رقيقة (الكاميرا المجهرية).',
      fact:'كل بكسل في صور الكاميرا المجهرية يغطي نحو 31 ميكرومتر، أي أصغر من سُمك شعرة.',
      ev:['الطبقات المستقيمة','الطبقات لا تنحني حول الكرة: لم تسقط من الأعلى.']
    },
    clue2:{
      tool:'أداتك: الكاميرا المجهرية', title:'الدليل 2: داخل الصخر',
      lead:'هذه منطقة سمّاها العلماء «Berry Bowl». ابحث عن ثلاث كرات ملتصقة ببعضها في خط واحد.',
      task:'اضغط على الكرات الثلاث الملتصقة.',
      miss:'ابحث عن ثلاث كرات متلاصقة تشبه رجل الثلج.',
      found:'هذه الكرات الثلاث «نمت» ملتصقة ببعضها، وهي جزء من الصخر نفسه.',
      elim:'العجلات تتحرك فوق السطح ولا تصنع كرات داخل الصخور. من المشتبه الذي تستبعده الآن؟',
      wrongElim:'فكّر: من الذي لا يستطيع صنع شيء داخل الصخر؟',
      done:'استبعدت العجلات. بقي مشتبه واحد… لكن المحقق الجيد يحتاج دليلًا يؤكد.',
      fig:'Berry Bowl: كرات داخل الصخر (الكاميرا المجهرية).',
      fact:'عنوان هذه الصورة في أرشيف ناسا: «توائم التوت الأزرق وُلدت في الصخر».',
      ev:['داخل الصخر','الكرات جزء من الصخر وملتصقة ببعضها: نمت في مكانها.']
    },
    clue3:{
      tool:'أداتك: مطياف Mössbauer', title:'الدليل 3: بصمة المعدن',
      lead:'المطياف يكشف «بصمة» معادن الحديد. افحص مكانين: مكان فيه كرات، ومكان خالٍ بجانبه.',
      t1:'افحص مكان الكرات (Berry Bowl)', t2:'افحص المكان الخالي (Empty)',
      scanning:'جارٍ الفحص…', meter:'بصمة الهيماتيت', high:'قوية', low:'ضعيفة',
      note:'تمثيل مبسّط لقياس ناسا الحقيقي. قيست Empty في اليوم المريخي 46، وBerry Bowl في اليوم 48، واستغرق القياس الحقيقي وقتًا أطول بكثير.',
      result:'بصمة الهيماتيت قوية حيث توجد الكرات فقط. والهيماتيت معدن حديد يتكوّن غالبًا في الماء.',
      graph:'الرسم الحقيقي من ناسا: الخط الأزرق (MössBerry، مكان الكرات) فيه ست قمم واضحة تسمّى Hematite sextet، وهي بصمة الهيماتيت. والخط الأصفر (Empty) قممه أضعف بكثير.',
      fig:'PIA05587: طيفا Mössbauer لـ Berry Bowl و Empty.',
      ev:['بصمة الهيماتيت','الكرات غنية بالهيماتيت، وهو معدن يتكوّن غالبًا في الماء.']
    },
    verdict:{
      title:'الحكم',
      lead:'راجع أدلتك الثلاثة، ثم أعلن من صنع الكرات.',
      btn:'أعلن الحكم',
      stamp:'القضية محلولة',
      result:'الكرات نمت داخل صخر كان مشبّعًا بالماء الجوفي. أي أن ماءً مرّ عبر صخور Meridiani في الماضي.',
      nasa:'وهذا يتفق مع ما تقوله ناسا: موقع Opportunity في سهل Meridiani يحتوي رواسب معدنية تدل على تاريخ رطب، ودراسة سجل الصخور أكدت أن الماء بقي على سطح المريخ لفترات طويلة في الماضي.',
      careful:'انتبه: هذا دليل على ماء قديم، وليس دليلًا على وجود حياة. العلماء لا يقولون أكثر مما تثبته الأدلة.',
      ev:['الحكم','نمت الكرات في صخر مبلل بالماء: كان هنا ماء قديم.']
    },
    outro:'وصلت هذه المعرفة إلى الأرض. لكن لماذا توقفت الرسائل بعد ذلك؟',
    outroBtn:'افتح الفصل الأخير'
  },
  ch3:{
    kicker:'الفصل 3', title:'لماذا صمتت؟',
    order:{
      lead:'هذه أحداث الفصل الأخير، لكنها مبعثرة. اضغطها بالترتيب الصحيح.',
      cards:[
        ['storm','عاصفة غبار عملاقة تغطي المريخ','صيف 2018'],
        ['power','الشمس تختفي والطاقة تنهار',''],
        ['last','آخر اتصال: صورة مظلمة ناقصة','10 يونيو 2018'],
        ['tries','أكثر من 1,000 أمر لاستعادة الاتصال','يونيو 2018 – فبراير 2019'],
        ['end','ناسا تعلن انتهاء المهمة','13 فبراير 2019']],
      wrong:'ليس هذا الحدث التالي. فكّر: ماذا يحدث أولًا؟',
      done:'رتّبت آخر فصل في قصة Opportunity.',
      fact:'استمع الفريق للمركبة طوال ثمانية أشهر تقريبًا قبل إعلان انتهاء المهمة.'
    },
    read:{
      lead:'هذه آخر صورة أرسلتها. اقرأها كما يقرأها العلماء.',
      qs:[
        ['لماذا الصورة مظلمة؟',[['العاصفة حجبت الشمس، والكاميرا كانت موجّهة نحوها',true],['التُقطت في الليل',false]],'صوّرتها بفلتر شمسي موجّه نحو الشمس، لكن العاصفة كانت قد حجبتها.'],
        ['ما النقاط البيضاء الصغيرة؟',[['نجوم في السماء',false],['تشويش من الكاميرا',true]],'كل صور Pancam فيها تشويش، والظلام جعله أوضح.'],
        ['لماذا الجزء السفلي أسود؟',[['توقف الإرسال قبل اكتمال الصورة',true],['الأرض كانت مظلمة',false]],'الجزء الناقص يظهر بكسلات سوداء.']],
      fig:'PIA22929: آخر رسالة من Opportunity، 10 يونيو 2018.',
      ev:['آخر صورة','صورة مظلمة ناقصة: العاصفة حجبت الشمس وتوقف الإرسال.']
    },
    legacy:{
      t:'إرث لا ينقطع',
      p:'قطعت Opportunity مسافة 45.16 كم، وظل هذا الرقم القياسي لأطول قيادة على عالم آخر حتى 11 أكتوبر 2026، عندما تجاوزته Perseverance بمسافة 45.22 كم.',
      ev:['رقم قياسي','45.16 كم: أطول مسافة قيادة على عالم آخر حتى أكتوبر 2026.']
    },
    outro:'هل انتهاء الاتصال يعني انتهاء الإنجاز؟',
    outroBtn:'افتح سجل الإرث'
  },
  fin:{
    kicker:'الخاتمة', title:'أكمل الإشارة',
    lead:'هذه آخر صورة أرسلتها Opportunity، وانقطع إرسالها قبل أن تكتمل. أكمل الإشارة ببناء سلسلة اكتشاف: أداة، ثم الدليل الذي جمعته، ثم النتيجة التي يثبتها.',
    step:'الجملة', of:'من',
    types:{tool:'أداة', ev:'دليل', res:'نتيجة'},
    ask:['اختر الأداة التي تريد أن تبدأ بها قصتك:','اختر الدليل الذي جمعته هذه الأداة:','اختر النتيجة التي يثبتها هذا الدليل:'],
    s:['استخدمت Opportunity…','وكان الدليل الذي لفت انتباهي…','وهذا ساعد العلماء على فهم…'],
    tools:{mb:'مطياف Mössbauer', mi:'الكاميرا المجهرية', solar:'الألواح الشمسية', pancam:'الكاميرا البانورامية Pancam'},
    toolDesc:{mb:'يكشف معادن الحديد في الصخور', mi:'يصوّر تفاصيل أصغر من شعرة', solar:'تحوّل ضوء الشمس إلى كهرباء', pancam:'عيون المركبة على رأس الصاري'},
    evs:{mb:'أن بصمة الهيماتيت قوية في الكرات فقط', mi:'أن الطبقات حول الكرة بقيت مستقيمة', solar:'أن الرياح نظّفت الألواح فرجعت الطاقة', pancam:'آخر صورة مظلمة توقف إرسالها في منتصفها'},
    ress:{mb:'أن ماءً قديمًا مرّ عبر صخور المريخ', mi:'أن الكرات نمت داخل الصخر ولم تسقط من السماء', solar:'لماذا عملت 14 عامًا بدل 90 يومًا', pancam:'أن العاصفة حجبت الشمس فانقطع الاتصال'},
    wrongEv:'هل تستطيع هذه الأداة أن تجمع هذا الدليل؟ فكّر: ماذا تفعل الأداة التي اخترتها؟',
    wrongRes:'هل هذا ما يثبته هذا الدليل فعلًا؟ ابحث عن النتيجة التي تأتي منه مباشرة.',
    chainDone:'سلسلة مكتملة', linkOk:'حلقة صحيحة',
    edit:'عدّل الجملة بكلماتك (اختياري)',
    name:'اكتب اسمك ليظهر على بطاقتك', namePh:'اسمك', nameNeed:'اكتب اسمك (حرفان على الأقل) لتُرسل الإشارة.',
    send:'أرسل الإشارة', sending:'جارٍ الإرسال…', complete:'SIGNAL COMPLETE',
    honest:'الجزء العلوي صورة ناسا الحقيقية (PIA22929)، والسطور السفلية رسالتك أنت.',
    hook:'أكملتُ آخر إشارة من المريخ', sub:'وأعدتُ بناء قصة Opportunity من أدلة ناسا الحقيقية',
    lastCap:'آخر صورة أرسلتها المركبة · 10 يونيو 2018',
    role:'مستكشف أرشيف المهمة', evN:'أدلة', firstTry:'من أول محاولة', years:'عامًا على المريخ',
    cta:'هل تستطيع أنت أن تُكمل الإشارة؟', cta2:'جرّب «آخر إشارة»: قصة حقيقية من المريخ', tags:'#آخر_إشارة  #NASASpaceApps', link:'https://alyhy15.github.io/SUHD1/', scan:'امسح الرمز وابدأ مهمتك ←',
    kicker2:'تذكارك جاهز', title2:'اكتملت الإشارة',
    incoming:'إشارة واردة من المريخ', decoding:'جارٍ فك الإشارة…',
    download:'نزّل بطاقتك', copy:'انسخ نص المشاركة', copied:'تم النسخ', saved:'تم الحفظ', dlFail:'لم يكتمل التنزيل. اضغط على الصورة مطولًا أو بزر الفأرة الأيمن لحفظها.',
    share:'نزّل البطاقة وشاركها مع أصدقائك ومعلميك، وتحدَّهم أن يُكملوا الإشارة.',
    shareText:'أكملتُ آخر إشارة من المريخ في «آخر إشارة» وأعدتُ بناء قصة مركبة Opportunity من أدلة ناسا الحقيقية. هل تستطيع أنت؟',
    again:'أعد الاستكشاف',
    thanks:'انقطعت الإشارة في 2018، لكن الأدلة ما زالت تتكلم، وأنت أكملت رسالتها.'
  },
  guide:{
    title:'مرشد المهمة', hint:'أعطني تلميحًا', explain:'اشرح', source:'أرني المصدر', ask:'اسأل عن المهمة…', send:'إرسال',
    off:'المرشد الذكي غير متاح في هذا العرض. هذا تلميح جاهز:', thinking:'يفكّر…', err:'تعذّر الرد الآن. جرّب بعد قليل.',
    hello:'أنا مرشد المهمة. أساعدك بتلميحات ومصادر من ناسا، ولا أجيب إلا بما تدعمه الأدلة.',
    helloKB:'أنا مرشد المهمة. أجيب من بنك أسئلة مبني على مصادر ناسا الموثقة، ومع كل جواب مصدره. اسألني أو اختر سؤالًا:',
    noEv:'لا يوجد عندي دليل على هذا في مصادر ناسا التي أعتمد عليها. جرّب أحد هذه الأسئلة:', more:'أسئلة قريبة:', src:'المصدر:', hintL:'تلميح:'
  },
  back:'رجوع', ok:'تم',
  impact:{
    title:'لوحة الأثر', live:'مباشر', sub:'بيانات حقيقية مجهولة الهوية من تجارب فعلية على «آخر إشارة». لا نخزّن أي اسم. الأرقام تبدأ من الصفر وتتحدث مباشرة.',
    sessions:'تجربة بدأت', completion:'نسبة الإكمال', avgTime:'متوسط مدة التجربة', minutes:'دقيقة', firstTry:'متوسط الحل من أول محاولة', guide:'استخدموا مرشد المهمة',
    funnel:'إلى أين وصل المستكشفون؟', stages:['الافتتاحية','الفصل 1','الفصل 2','الفصل 3','أكمل الإشارة','البطاقة'],
    acc:'الحل من أول محاولة في كل تحدٍّ', accNote:'نسبة من أنهوا التحدي دون أي خطأ: تكشف المفاهيم السهلة والصعبة.',
    ch:{solar:'الألواح والغبار', pancam:'إيجاد الكرات', arm:'أدوات الذراع', clue1:'دليل الطبقات', clue2:'داخل الصخر', order:'ترتيب الأحداث', read:'قراءة آخر صورة', fin:'أكمل الإشارة'},
    split:'اللغة والجهاز', ar:'العربية', en:'الإنجليزية', mobile:'جوال', desktop:'حاسوب',
    empty:'لا توجد تجارب بعد. ابدأ التجربة لتظهر أول النتائج هنا.', noDb:'لوحة الأثر تعمل داخل رابط Claude للمشروع.', updated:'آخر تحديث',
    reset:'مسح بيانات الأثر', resetQ:'هل تريد مسح كل بيانات الأثر؟ لا يمكن التراجع.', resetDone:'تم مسح البيانات.'
  },
  srcTitle:'المصادر', srcNote:'كل الصور والبيانات والمجسم من ناسا. المشاهد المتحركة إعادة تصوّر مبنية على وقائع ناسا، والمحاكاة مبسّطة للتعليم. لا نستخدم شعار ناسا ولا ندّعي اعتمادها للمشروع.',
  admin:{open:'تعديل النصوص (المشرف)', title:'لوحة المشرف: تعديل النصوص', search:'ابحث في النصوص…', save:'حفظ التعديلات', saved:'تم الحفظ. التعديلات تظهر لكل الزوار.', reset:'الأصل', changed:'معدّل', none:'لا توجد تعديلات غير محفوظة.', fail:'تعذّر الحفظ.', noDb:'التخزين غير متاح في هذا العرض.', count:'نصًا'}
},
en:{
  dir:'ltr', brand:'Last Signal', langBtn:'عربي', evidence:'Evidence', board:'Evidence board', boardEmpty:'No evidence collected yet.',
  close:'Close', next:'Next', continue:'Continue', check:'Check', sources:'Sources', sim:'Simulation', real:'Real image', skip:'Skip',
  newCard:'New evidence card', didYouKnow:'Did you know?',
  restartT:'Back to the start', restartQ:'Start the experience again from the beginning? Your collected evidence will be cleared.', restartYes:'Yes, start over', cancel:'Cancel',
  start:'Start', headphones:'For the full experience, turn on sound or use headphones',
  opening:{
    hud1:'MER-B · OPPORTUNITY', hud2:'PERSEVERANCE VALLEY · MARS',
    power:'Power', lowpower:'Low power', receiving:'Receiving data…', fault:'Power lost',
    caps:[
      ['Mars · 2018','Opportunity has been working for 14 years… it was designed for only 90 Martian days.'],
      ['Summer 2018','A dust storm starts to spread until it covers the whole planet.'],
      ['','Dust blocks the Sun… the solar panels have no light to charge the batteries.'],
      ['June 10, 2018','The last transmission reaches Earth.']],
    lost:'SIGNAL LOST', lostAr:'Last Signal',
    q:'This is the last image that arrived from Opportunity. What happened before it?',
    btn:'Open the mission archive',
    note:'A re-creation based on NASA\'s record. The image is real: PIA22929, the last data Opportunity sent on June 10, 2018.'
  },
  ch1:{
    kicker:'Chapter 1', title:'How did it explore?',
    intro:'This is Opportunity, a NASA 3D model. We will examine three of its parts in order, and each one shows how this rover worked on another planet.',
    fact:'Opportunity launched in summer 2003 and landed at Meridiani Planum on Mars on January 24, 2004.',
    start:'Start with the first part',
    tapPart:'Tap the glowing point on the rover',
    solar:{
      part:'Solar panels', q:'How did it work for 14 years instead of 90 days?',
      how:'How does dust affect the panels?',
      steps:[
        'Solar panels turn sunlight into electricity that charges the rover\'s batteries.',
        'Martian dust is very fine. The air carries it, then it slowly settles on the panels.',
        'The thicker the dust layer, the less light reaches the cells, so less electricity is made.',
        'Sometimes winds blow some of the dust away. Scientists call these "cleaning events".'],
      lead:'Try the three events and watch how the light and power change.',
      sc:[['dust','Dust settles on the panels'],['wind','Wind blows over the rover'],['storm','A dust storm fills the sky']],
      res:{dust:'Dust covered the cells and blocked some light, so power dropped.', wind:'Wind removed some dust, so light got through again and power came back.', storm:'The storm blocked sunlight before it even reached the panels, so power collapsed.'},
      cells:'Solar cells', light:'Sunlight',
      ask:'So what helped it last much longer than planned?',
      opts:[
        ['Wind sometimes cleaned the panels, so power came back',true,'Correct. In January 2014 the panels made less than 375 watt-hours a day; after wind cleaned them they made more than 620 watt-hours in mid-April 2014.'],
        ['It carried backup fuel',false,'Opportunity didn\'t use fuel; its power came only from sunlight.'],
        ['Scientists cleaned the panels remotely',false,'The rover had no tool to clean its panels. Martian wind did it.']],
      fig:'Self-portrait, January 2014: dust still on the panels, days after winds removed some of it.',
      ev:['Panels and dust','Dust lowers power, and wind cleaned the panels, extending the mission.']
    },
    pancam:{
      part:'Pancam (panoramic camera)', q:'What did Opportunity see between the rocks?',
      lead:'Pancam, on top of the mast, is the rover\'s "eyes". Scientists noticed strange grains on the ground, so the arm moved in and took a close-up with the Microscopic Imager.',
      task:'Tap 3 small spheres in the image.',
      found:'Found', of:'of',
      miss:'That\'s not a sphere. Look for a round shape.',
      done:'Scientists nicknamed them "blueberries", even though they are more gray than blue. The area shown is only 3 cm across.',
      fact:'These spheres are up to about 5 mm across, the size of a small bead.',
      fig:'Microscopic Imager image, with color added from the panoramic camera. The area shown is 3 cm across.',
      ev:['Mystery spheres','Many small spheres scattered on the surface of Meridiani.']
    },
    arm:{
      part:'Robotic arm', q:'How does a rover examine a rock on another planet?',
      lead:'The arm carries tools, like a geologist\'s kit. Pick a task, then pick the tool that does it.',
      tasksT:'Task', toolsT:'Tool',
      tasks:[['mi','Take pictures of very tiny details'],['rat','Grind off the dusty surface to see inside the rock'],['mb','Identify iron minerals in the rock']],
      tools:[['mi','Microscopic Imager (MI)'],['rat','Rock Abrasion Tool (RAT)'],['mb','Mössbauer spectrometer']],
      pickTask:'Pick a task first.', wrong:'Not this tool. Try another.',
      done:'Excellent! You will use two of these tools to solve the next case.',
      fact:'Scientists chose Meridiani because orbiters detected the mineral hematite there from space. On Earth, hematite usually forms with water.',
      ev:['Arm tools','MI for details, RAT to grind the surface, Mössbauer for iron minerals.']
    },
    outro:'You know how Opportunity explored. Now it\'s time to understand what it found.',
    outroFact:'In 2004 Opportunity took a panorama of the Eagle Crater area that the team called "Lion King". It was made of 558 images and more than 75 megabytes of data.',
    outroBtn:'Open the case of the gray spheres'
  },
  ch2:{
    kicker:'Chapter 2', title:'The case of the gray spheres',
    steps:['Suspects','Clue 1','Clue 2','Clue 3','Verdict'],
    suspects:[
      ['volcano','🌋','Volcano','Threw out drops of melted rock that fell to the ground'],
      ['meteor','☄️','Meteorite','Hit Mars and splashed out melted drops'],
      ['wheels','🛞','Rover wheels','The wheels made them while driving'],
      ['water','💧','Groundwater','Made them grow slowly inside the rock']],
    out:'Ruled out', left:'Suspect',
    case:{
      lead:'Opportunity found thousands of small spheres. Where did they come from? You have four explanations. Your mission: collect three real clues and rule out every explanation that doesn\'t fit them.',
      go:'Start the investigation'
    },
    clue1:{
      tool:'Your tool: Microscopic Imager', title:'Clue 1: The layers',
      lead:'This is a rock called El Capitan, made of very thin layers. Move the magnifier over the picture and look for a sphere inside the rock.',
      task:'Move the magnifier and tap when you find the sphere.',
      found:'Found it! Look at the layers around it: they pass by it straight and don\'t bend under it.',
      think:'Think: if a heavy drop fell from the sky onto soft layers, what would happen to the layers?',
      thinkA:'They would bend or break under it. But these layers are straight, so the sphere did not fall from above.',
      elim:'Rule out the two suspects that say the spheres fell from the sky.',
      wrongElim:'That suspect doesn\'t depend on falling from the sky. Find the two that fall from above.',
      done:'You ruled out the volcano and the meteorite.',
      fig:'El Capitan: a sphere inside thin layers (Microscopic Imager).',
      fact:'Each pixel in Microscopic Imager pictures covers about 31 micrometers, smaller than the width of a hair.',
      ev:['Straight layers','The layers don\'t bend around the sphere: it didn\'t fall from above.']
    },
    clue2:{
      tool:'Your tool: Microscopic Imager', title:'Clue 2: Inside the rock',
      lead:'This is a spot scientists called "Berry Bowl". Look for three spheres stuck together in a line.',
      task:'Tap the three joined spheres.',
      miss:'Look for three joined spheres that look like a snowman.',
      found:'These three spheres "grew" stuck together, and they are part of the rock itself.',
      elim:'Wheels roll over the surface; they can\'t make spheres inside rocks. Which suspect do you rule out now?',
      wrongElim:'Think: which one can\'t make anything inside a rock?',
      done:'You ruled out the wheels. One suspect is left… but a good detective needs a clue that confirms it.',
      fig:'Berry Bowl: spheres inside the rock (Microscopic Imager).',
      fact:'NASA\'s archive title for this picture is "\'Blueberry\' Triplets Born in Rock".',
      ev:['Inside the rock','The spheres are part of the rock and joined together: they grew in place.']
    },
    clue3:{
      tool:'Your tool: Mössbauer spectrometer', title:'Clue 3: The mineral fingerprint',
      lead:'The spectrometer detects the "fingerprint" of iron minerals. Scan two spots: one with spheres, and an empty spot next to it.',
      t1:'Scan the spheres (Berry Bowl)', t2:'Scan the empty spot (Empty)',
      scanning:'Scanning…', meter:'Hematite fingerprint', high:'Strong', low:'Weak',
      note:'A simplified view of NASA\'s real measurement. Empty was measured on sol 46 and Berry Bowl on sol 48, and the real measurement took much longer.',
      result:'The hematite fingerprint is strong only where the spheres are. Hematite is an iron mineral that usually forms in water.',
      graph:'NASA\'s real graph: the blue line (MössBerry, the spheres spot) has six clear peaks called the "hematite sextet", the fingerprint of hematite. The yellow line (Empty) has much weaker peaks.',
      fig:'PIA05587: Mössbauer spectra of Berry Bowl and Empty.',
      ev:['Hematite fingerprint','The spheres are rich in hematite, a mineral that usually forms in water.']
    },
    verdict:{
      title:'The verdict',
      lead:'Review your three clues, then announce what made the spheres.',
      btn:'Announce the verdict',
      stamp:'Case solved',
      result:'The spheres grew inside rock that was soaked with groundwater. That means water once moved through the rocks at Meridiani.',
      nasa:'This matches what NASA says: Opportunity\'s site at Meridiani Planum has mineral deposits that suggest a wet history, and studying the rock record confirmed that water was long-standing on the surface of Mars in ancient times.',
      careful:'Careful: this is evidence of ancient water, not evidence of life. Scientists don\'t claim more than the evidence shows.',
      ev:['The verdict','The spheres grew in wet rock: there was ancient water here.']
    },
    outro:'This knowledge reached Earth. So why did the messages stop?',
    outroBtn:'Open the last chapter'
  },
  ch3:{
    kicker:'Chapter 3', title:'Why did it go silent?',
    order:{
      lead:'These are the events of the final chapter, but they\'re mixed up. Tap them in the right order.',
      cards:[
        ['storm','A giant dust storm covers Mars','Summer 2018'],
        ['power','The Sun disappears and power collapses',''],
        ['last','Last contact: a dark, incomplete image','June 10, 2018'],
        ['tries','More than 1,000 commands to restore contact','June 2018 – Feb 2019'],
        ['end','NASA declares the mission over','Feb 13, 2019']],
      wrong:'That\'s not the next event. Think: what happens first?',
      done:'You put Opportunity\'s final chapter in order.',
      fact:'The team listened for the rover for about eight months before declaring the mission over.'
    },
    read:{
      lead:'This is the last image it sent. Read it the way scientists do.',
      qs:[
        ['Why is the image dark?',[['The storm blocked the Sun, and the camera was pointed at it',true],['It was taken at night',false]],'It was taken with a solar filter pointed at the Sun, but the storm had blotted it out.'],
        ['What are the small white dots?',[['Stars in the sky',false],['Camera noise',true]],'All Pancam images have some noise; the darkness makes it easier to see.'],
        ['Why is the bottom black?',[['The transmission stopped before the image was complete',true],['The ground was dark',false]],'The missing part shows up as black pixels.']],
      fig:'PIA22929: Opportunity\'s last message, June 10, 2018.',
      ev:['The last image','A dark, incomplete image: the storm blocked the Sun and the transmission stopped.']
    },
    legacy:{
      t:'A legacy that continues',
      p:'Opportunity drove 45.16 km. That stayed the record for the longest drive on another world until Oct 11, 2026, when Perseverance passed it at 45.22 km.',
      ev:['A record','45.16 km: the longest drive on another world until October 2026.']
    },
    outro:'Does losing contact mean the achievement is over?',
    outroBtn:'Open the legacy log'
  },
  fin:{
    kicker:'Finale', title:'Complete the signal',
    lead:'This is the last image Opportunity sent, and its transmission stopped before it was complete. Complete the signal by building a discovery chain: a tool, then the evidence it collected, then the result that evidence proves.',
    step:'Sentence', of:'of',
    types:{tool:'Tool', ev:'Evidence', res:'Result'},
    ask:['Pick the tool you want to start your story with:','Pick the evidence this tool collected:','Pick the result this evidence proves:'],
    s:['Opportunity used…','The evidence that caught my attention was…','This helped scientists understand…'],
    tools:{mb:'the Mössbauer spectrometer', mi:'the Microscopic Imager', solar:'its solar panels', pancam:'its panoramic camera, Pancam'},
    toolDesc:{mb:'Detects iron minerals in rocks', mi:'Pictures details smaller than a hair', solar:'Turn sunlight into electricity', pancam:'The rover\'s eyes on top of the mast'},
    evs:{mb:'that the hematite fingerprint is strong only in the spheres', mi:'that the layers around the sphere stayed straight', solar:'that wind cleaned the panels and the power came back', pancam:'the last dark image that stopped halfway'},
    ress:{mb:'that ancient water moved through Martian rocks', mi:'that the spheres grew inside the rock and didn\'t fall from the sky', solar:'why it worked 14 years instead of 90 days', pancam:'that the storm blocked the Sun and contact was lost'},
    wrongEv:'Could this tool collect that evidence? Think: what does the tool you picked do?',
    wrongRes:'Is that really what this evidence proves? Look for the result that comes straight from it.',
    chainDone:'Chain complete', linkOk:'Correct link',
    edit:'Edit the sentence in your own words (optional)',
    name:'Write your name to show on your card', namePh:'Your name', nameNeed:'Write your name (at least 2 letters) to send the signal.',
    send:'Send the signal', sending:'Sending…', complete:'SIGNAL COMPLETE',
    honest:'The top part is NASA\'s real image (PIA22929); the lines below are your message.',
    hook:'I completed the last signal from Mars', sub:'and rebuilt Opportunity\'s story from NASA\'s real evidence',
    lastCap:'The last image Opportunity sent · June 10, 2018',
    role:'Mission archive explorer', evN:'pieces of evidence', firstTry:'on the first try', years:'years on Mars',
    cta:'Can you complete the signal?', cta2:'Try "Last Signal": a true story from Mars', tags:'#LastSignal  #NASASpaceApps', link:'https://alyhy15.github.io/SUHD1/', scan:'Scan the code and start your mission →',
    kicker2:'Your keepsake is ready', title2:'Signal complete',
    incoming:'Incoming transmission from Mars', decoding:'Decoding signal…',
    download:'Download your card', copy:'Copy share text', copied:'Copied', saved:'Saved', dlFail:'The download didn\'t finish. Long-press or right-click the image to save it.',
    share:'Download your card, share it with friends and teachers, and challenge them to complete the signal.',
    shareText:'I completed the last signal from Mars in "Last Signal" and rebuilt the story of NASA\'s Opportunity rover from real evidence. Can you?',
    again:'Explore again',
    thanks:'The signal stopped in 2018, but the evidence still speaks, and you completed its message.'
  },
  guide:{
    title:'Mission guide', hint:'Give me a hint', explain:'Explain', source:'Show the source', ask:'Ask about the mission…', send:'Send',
    off:'The AI guide isn\'t available in this view. Here is a ready hint:', thinking:'Thinking…', err:'Couldn\'t answer right now. Try again soon.',
    hello:'I\'m the mission guide. I help with hints and NASA sources, and I only answer with what the evidence supports.',
    helloKB:'I\'m the mission guide. I answer from a question bank built on verified NASA sources, with the source for each answer. Ask me or pick a question:',
    noEv:'I don\'t have evidence for that in the NASA sources I rely on. Try one of these:', more:'Related questions:', src:'Source:', hintL:'Hint:'
  },
  back:'Back', ok:'OK',
  impact:{
    title:'Impact dashboard', live:'Live', sub:'Real, anonymous data from actual runs of "Last Signal". No names are stored. Numbers start at zero and update live.',
    sessions:'runs started', completion:'completion rate', avgTime:'average run time', minutes:'min', firstTry:'average first-try success', guide:'used the mission guide',
    funnel:'How far did explorers get?', stages:['Opening','Chapter 1','Chapter 2','Chapter 3','Complete the signal','Card'],
    acc:'First-try success per challenge', accNote:'Share of explorers who finished each challenge with no mistakes: shows which ideas are easy or hard.',
    ch:{solar:'Panels and dust', pancam:'Finding the spheres', arm:'Arm tools', clue1:'The layers clue', clue2:'Inside the rock', order:'Ordering events', read:'Reading the last image', fin:'Complete the signal'},
    split:'Language and device', ar:'Arabic', en:'English', mobile:'Phone', desktop:'Computer',
    empty:'No runs yet. Start the experience and the first results will appear here.', noDb:'The impact dashboard works inside the project\'s Claude link.', updated:'Last update',
    reset:'Clear impact data', resetQ:'Clear all impact data? This cannot be undone.', resetDone:'Data cleared.'
  },
  srcTitle:'Sources', srcNote:'All images, data and the 3D model come from NASA. Animated scenes are re-creations based on NASA\'s record, and simulations are simplified for learning. We don\'t use the NASA logo or claim NASA endorses this project.',
  admin:{open:'Edit texts (admin)', title:'Admin: edit texts', search:'Search texts…', save:'Save changes', saved:'Saved. Changes are shown to all visitors.', reset:'Original', changed:'edited', none:'No unsaved changes.', fail:'Couldn\'t save.', noDb:'Storage isn\'t available in this view.', count:'texts'}
}};

/* Static hints per step (also used when the AI guide is not available) */
window.HINTS = {
  ar:{opening:'اضغط «افتح أرشيف المهمة» لتبدأ.', ch1intro:'اضغط الزر لتبدأ بالجزء الأول.', solar:'جرّب الأحداث الثلاثة، ثم فكّر: ما الذي أعاد الطاقة؟', pancam:'الكرات مستديرة ورمادية مائلة للزرقة. الكبيرة أعلى الصورة سهلة!', arm:'MI = صور مقرّبة، RAT = كشط، Mössbauer = معادن الحديد.', case:'اقرأ التفسيرات الأربعة، ثم ابدأ التحقيق. ستستبعدها واحدًا تلو الآخر.', clue1:'الكرة في الجهة اليسرى من الصورة. البركان والنيزك كلاهما يُسقط القطرات من السماء.', clue2:'الكرات الثلاث الملتصقة تشبه رجل الثلج، على يمين الصورة.', clue3:'افحص المكانين، وقارن طول مؤشر البصمة.', verdict:'بقي مشتبه واحد فقط لم تستبعده الأدلة.', order:'السبب يأتي قبل النتيجة: العاصفة أولًا، والإعلان آخرًا.', read:'تذكّر: العاصفة، والكاميرا، والإرسال.', fin:'ابدأ بأداة، ثم اختر الدليل الذي تستطيع هذه الأداة جمعه، ثم النتيجة التي يثبتها هذا الدليل.'},
  en:{opening:'Press "Open the mission archive" to begin.', ch1intro:'Press the button to start with the first part.', solar:'Try all three events, then think: what brought the power back?', pancam:'The spheres are round and bluish-gray. The big one at the top is easy!', arm:'MI = close-ups, RAT = grinding, Mössbauer = iron minerals.', case:'Read the four explanations, then start. You will rule them out one by one.', clue1:'The sphere is on the left side of the picture. The volcano and the meteorite both drop things from the sky.', clue2:'The three joined spheres look like a snowman, on the right side.', clue3:'Scan both spots and compare the fingerprint bars.', verdict:'Only one suspect is left that the clues did not rule out.', order:'Cause comes before effect: the storm first, the announcement last.', read:'Remember: the storm, the camera, the transmission.', fin:'Start with a tool, then pick the evidence that tool can collect, then the result that evidence proves.'}
};

/* Knowledge base the AI guide may use (and nothing else) */
window.KB = `
[end] Opportunity's final communication was received June 10, 2018, during a planet-wide dust storm. After more than 1,000 commands to restore contact, NASA declared the mission complete on Feb 13, 2019, after nearly 15 years on Mars. Opportunity worked for about 14 years (2004–2018); the mission was declared over about 15 years after landing. Source: NASA/JPL, Feb 13, 2019.
[astro] Opportunity was designed to last 90 Martian days and travel about 1,000 meters. It launched in summer 2003 and landed at Meridiani Planum on January 24, 2004. A dust storm in June 2018 kept its solar panels from recharging its batteries. Source: NASA Astrobiology.
[mer] Meridiani Planum was chosen because orbiters detected the mineral hematite there; on Earth hematite often forms with water. Opportunity found hematite in small spheres nicknamed "blueberries". Its tools: Pancam (panoramic camera on the mast), Navcam, Microscopic Imager (MI) on the arm, Rock Abrasion Tool (RAT), Mössbauer spectrometer (iron minerals), APXS (chemistry). Source: NASA Mars Exploration Rovers.
[PIA09077] The spherules are up to about 5 mm across; investigations determined they are iron-rich concretions that formed inside deposits soaked with groundwater. Source: NASA Photojournal PIA09077.
[berries] The spherules are about the size of BBs and more gray than blue; they lie embedded in outcrop rocks and scattered on soil. Source: NASA/JPL.
[mi] The Microscopic Imager images at 31 micrometers per pixel over a 32 mm field of view. Source: NASA NTRS.
[PIA19113] Microscopic Imager image with color from the panoramic camera; the area shown is 3 cm across; the spherules are concretions nicknamed blueberries. Source: PIA19113.
[PIA05586] Berry Bowl: Microscopic Imager image of spheres, including three joined in a line ("triplets") inside the rock. Source: PIA05586.
[PIA05585] El Capitan: Microscopic Imager image; fine layers in the rock do not bend around the sphere. Source: PIA05585.
[PIA05587] Mössbauer spectra: blue line = Berry Bowl (with spheres, measured sol 48), yellow line = Empty (no spheres, sol 46). Berry Bowl shows the outcrop features plus a strong hematite signature, a "magnetic sextet" (six peaks). Hematite is an iron mineral that often forms in water. Source: PIA05587.
[power] Opportunity's solar arrays made less than 375 watt-hours per day in January 2014 and more than 620 watt-hours per day in mid-April 2014, after wind-driven cleaning. Source: NASA, March 2014 self-portrait.
[PIA17759] Self-portrait taken Jan 3–6, 2014, a few days after winds removed some of the dust on the solar panels. Source: PIA17759.
[PIA22929] The last image: dark because it was taken with the solar filter pointed at the Sun, which the dust storm had blotted out; white speckles are camera noise; the image is incomplete because transmission stopped, so the bottom is black. Source: PIA22929.
[cases] In Chapter 2 the student weighs four possible explanations (volcano drops, meteorite splash, rover wheels, groundwater). Evidence: straight layers (not fallen from above), spheres embedded and fused inside rock (grew in place, not wheels), strong hematite only at spheres (formed with water). Conclusion: concretions grown in water-soaked rock; evidence of ancient water, not of life.
[mission] NASA mission page: Opportunity landed January 24, 2004 at Meridiani Planum; its site had mineral deposits suggesting a wet history; studying the rock record confirmed water was long-standing on Mars's surface in ancient times; it last communicated June 10, 2018 during a planet-wide dust storm; it drove 45.16 km and held the off-Earth driving record until Oct 11, 2026 (Perseverance, 45.22 km); Pancam took images through multiple color filters; the 2004 "Lion King" panorama of the Eagle Crater area used 558 images and more than 75 MB of data. Source: NASA mission page.
[record] Opportunity's total distance was 45.16 km (28.06 miles). Perseverance passed it on Oct 11, 2026 at 45.22 km, setting the record for the farthest distance driven on another world. Source: NASA/JPL, Oct 12, 2026.
`;

/* ================= OFFLINE MISSION GUIDE: verified Q&A bank =================
   Used on the public site (no API). Every answer comes from the NASA facts above (window.KB) with its source key.
   k = keywords (Arabic + English, any form), st = steps where it is most relevant, t = question type. */
window.QA = [
 {id:'last', s:'end', t:'when', st:['opening','order','read','fin','final'],
  k:['اخر اشاره','اخر اتصال','اخر رساله','انقطع','انقطاع','سكتت','سكت','توقفت عن الاتصال','فقدنا','فقد الاتصال','last signal','last contact','last message','lost contact','silent','stopped talking'],
  q:{ar:'متى أرسلت أوبورتيونيتي آخر إشارة؟', en:'When did Opportunity send its last signal?'},
  a:{ar:'آخر اتصال من أوبورتيونيتي وصل في 10 يونيو 2018، أثناء عاصفة غبار غطّت كوكب المريخ كله.', en:'Opportunity\'s final communication was received on June 10, 2018, during a dust storm that covered the whole planet.'}},
 {id:'why', s:'astro', t:'why', st:['opening','order','read'],
  k:['ليش توقفت','لماذا توقفت','سكتت','سكت','انقطع','انقطاع','فقد الاتصال','وش صار','ايش صار','شو صار','ماذا حدث','سبب التوقف','سبب الانقطاع','ماتت','موت','انتهت','توقفت','why stop','why did it stop','silent','lost contact','what happened','why die','died','what killed'],
  q:{ar:'لماذا توقفت المركبة؟', en:'Why did the rover stop?'},
  a:{ar:'في يونيو 2018 منعت عاصفة غبار كوكبية الألواح الشمسية من إعادة شحن البطاريات، فلم تعد المركبة قادرة على الاتصال.', en:'In June 2018 a planet-wide dust storm kept the solar panels from recharging the batteries, so the rover could no longer communicate.'}},
 {id:'storm', s:'end', t:'what', st:['order','read','opening'],
  k:['عاصفه','عاصفة الغبار','عاصفه غباريه','عاصفه 2018','dust storm','storm','planet wide'],
  q:{ar:'ما هي عاصفة الغبار في 2018؟', en:'What was the 2018 dust storm?'},
  a:{ar:'عاصفة غبار غطّت المريخ كله في 2018 وحجبت الشمس. وأثناءها وصل آخر اتصال من أوبورتيونيتي في 10 يونيو 2018.', en:'A dust storm that covered all of Mars in 2018 and blotted out the Sun. During it, Opportunity\'s last communication arrived on June 10, 2018.'}},
 {id:'end', s:'end', t:'when', st:['order','legacy','fin'],
  k:['نهايه المهمه','انتهاء المهمه','اعلنت ناسا','اعلان','اعلنت','2019','mission end','declared','announce','mission complete','end of mission'],
  q:{ar:'متى أعلنت ناسا نهاية المهمة؟', en:'When did NASA declare the mission over?'},
  a:{ar:'أعلنت ناسا اكتمال المهمة في 13 فبراير 2019، بعد قرابة 15 عامًا على المريخ.', en:'NASA declared the mission complete on February 13, 2019, after nearly 15 years on Mars.'}},
 {id:'cmds', s:'end', t:'howmany', st:['order','fin'],
  k:['اوامر','امر','حاولت ناسا','محاوله','محاولات','استعاده الاتصال','ايقاظ','تصحى','ترجع','يرجعون','commands','try','tried','wake','restore contact','come back'],
  q:{ar:'هل حاولت ناسا إعادة الاتصال بها؟', en:'Did NASA try to restore contact?'},
  a:{ar:'نعم. أرسلت ناسا أكثر من 1000 أمر لاستعادة الاتصال، ولم يصل رد، فأعلنت نهاية المهمة في 13 فبراير 2019.', en:'Yes. NASA sent more than 1,000 commands to restore contact. No reply came, so it declared the mission over on Feb 13, 2019.'}},
 {id:'land', s:'mission', t:'when', st:['ch1intro','order'],
  k:['هبطت','هبوط','وصلت','اين هبطت','وين نزلت','ميريدياني','2004','landed','landing','land','arrive','meridiani','where'],
  q:{ar:'متى وأين هبطت أوبورتيونيتي؟', en:'When and where did Opportunity land?'},
  a:{ar:'هبطت في 24 يناير 2004 في سهل ميريدياني (Meridiani Planum) على المريخ.', en:'It landed on January 24, 2004, at Meridiani Planum on Mars.'}},
 {id:'launch', s:'astro', t:'when', st:['ch1intro'],
  k:['انطلقت','اطلاق','اطلقت','صاروخ','2003','launch','launched','rocket'],
  q:{ar:'متى انطلقت المركبة من الأرض؟', en:'When did the rover launch from Earth?'},
  a:{ar:'انطلقت أوبورتيونيتي في صيف 2003، وهبطت على المريخ في 24 يناير 2004.', en:'Opportunity launched in summer 2003 and landed on Mars on January 24, 2004.'}},
 {id:'design', s:'astro', t:'howmany', st:['ch1intro','solar','legacy'],
  k:['90 يوم','90','تسعين','المخطط','مصممه','صممت','كان متوقع','العمر المتوقع','designed','planned','expected','90 days','supposed'],
  q:{ar:'كم كان مخططًا أن تعمل؟', en:'How long was it designed to last?'},
  a:{ar:'صُمّمت لتعمل 90 يومًا مريخيًا وتقطع نحو 1000 متر فقط.', en:'It was designed to last 90 Martian days and travel about 1,000 meters.'}},
 {id:'life', s:'end', t:'howmany', st:['ch1intro','solar','legacy','fin'],
  k:['كم سنه','كم عام','كم عاشت','عمرها','14 عام','15 عام','مده المهمه','كم اشتغلت','how long','how many years','years','lifetime','14 years'],
  q:{ar:'كم سنة عملت فعلًا؟', en:'How many years did it actually work?'},
  a:{ar:'عملت نحو 14 عامًا (2004–2018) بدل 90 يومًا، وأُعلنت نهاية المهمة بعد نحو 15 عامًا من الهبوط.', en:'It worked for about 14 years (2004–2018) instead of 90 days, and the mission was declared over about 15 years after landing.'}},
 {id:'dist', s:'record', t:'howmany', st:['legacy','fin'],
  k:['مسافه','قطعت','كم مشت','كم كيلو','كيلومتر','45','distance','how far','km','kilometers','miles','drove'],
  q:{ar:'كم قطعت أوبورتيونيتي؟', en:'How far did Opportunity drive?'},
  a:{ar:'قطعت 45.16 كيلومترًا (28.06 ميلًا)، مع أنها صُمّمت لتقطع نحو 1000 متر فقط.', en:'It drove 45.16 km (28.06 miles), though it was designed to travel only about 1,000 meters.'}},
 {id:'record', s:'record', t:'what', st:['legacy','fin'],
  k:['رقم قياسي','الرقم القياسي','قياسي','بيرسيفيرانس','برسفيرنس','تجاوزت','record','perseverance','beat','farthest'],
  q:{ar:'هل ما زالت تحمل الرقم القياسي للمسافة؟', en:'Does it still hold the distance record?'},
  a:{ar:'احتفظت بالرقم القياسي لأطول مسافة على عالم آخر حتى 11 أكتوبر 2026، حين تجاوزتها المركبة Perseverance بمسافة 45.22 كم.', en:'It held the record for the farthest distance driven on another world until Oct 11, 2026, when Perseverance passed it at 45.22 km.'}},
 {id:'site', s:'mission', t:'why', st:['ch1intro','case','verdict'],
  k:['لماذا ميريدياني','ليش اختاروا','لماذا اختير','اختيار المكان','الموقع','why meridiani','why there','choose','chosen','landing site'],
  q:{ar:'لماذا اختارت ناسا سهل ميريدياني؟', en:'Why did NASA choose Meridiani Planum?'},
  a:{ar:'لأن المركبات المدارية رصدت هناك معدن الهيماتيت، وهذا المعدن يتكوّن على الأرض غالبًا مع الماء. والموقع كان فيه رواسب معدنية توحي بماضٍ رطب.', en:'Orbiters detected the mineral hematite there, and on Earth hematite often forms with water. The site had mineral deposits suggesting a wet history.'}},
 {id:'power', s:'power', t:'how', st:['solar'],
  k:['طاقه','الطاقه','واط','بطاريه','شحن','رجعت الطاقه','كيف عاشت','كيف استمرت','power','energy','watt','battery','charge','survive','how did it last'],
  q:{ar:'كيف استمرت 14 عامًا بالطاقة الشمسية؟', en:'How did solar power keep it going for 14 years?'},
  a:{ar:'الغبار كان يغطي الألواح فتقل الطاقة، ثم تأتي رياح تنظّف جزءًا منه. في يناير 2014 كانت الطاقة أقل من 375 واط·ساعة يوميًا، وفي منتصف أبريل 2014 صارت أكثر من 620.', en:'Dust covered the panels and power dropped, then winds cleaned some of it off. In January 2014 power was under 375 watt-hours a day; by mid-April 2014 it was over 620.'}},
 {id:'panels', s:'power', t:'what', st:['solar'],
  k:['الواح','الالواح الشمسيه','لوح','غبار','تراكم','الغبار على الالواح','solar panel','panels','dust','solar array','arrays'],
  q:{ar:'ماذا يفعل الغبار بالألواح الشمسية؟', en:'What does dust do to the solar panels?'},
  a:{ar:'الغبار المتراكم يحجب ضوء الشمس عن الألواح فتقل الطاقة. وفي 2014 نظّفت الرياح جزءًا منه، فارتفعت الطاقة من أقل من 375 إلى أكثر من 620 واط·ساعة يوميًا.', en:'Built-up dust blocks sunlight from the panels, so power drops. In 2014 winds cleaned some of it off, and power rose from under 375 to over 620 watt-hours a day.'}},
 {id:'selfie', s:'PIA17759', t:'what', st:['solar'],
  k:['سيلفي','صوره ذاتيه','صورت نفسها','self portrait','selfie','pia17759'],
  q:{ar:'ما قصة الصورة الذاتية في 2014؟', en:'What is the 2014 self-portrait?'},
  a:{ar:'صورة ذاتية التقطتها أوبورتيونيتي بين 3 و6 يناير 2014، بعد أيام من إزالة الرياح جزءًا من الغبار عن ألواحها.', en:'A self-portrait Opportunity took on January 3–6, 2014, a few days after winds removed some of the dust from its panels.'}},
 {id:'berries', s:'berries', t:'what', st:['pancam','case','clue1','clue2','clue3','verdict'],
  k:['توت','التوت الازرق','بلوبيري','كرات','الكرات','كريات','حبات','blueberries','blueberry','berries','spheres','spherules','balls'],
  q:{ar:'ما هي كرات «التوت الأزرق»؟', en:'What are the "blueberries"?'},
  a:{ar:'كرات صغيرة بحجم حبة الخردق تقريبًا، رمادية أكثر منها زرقاء، موجودة داخل الصخور ومتناثرة على التربة. وهي غنية بمعدن الهيماتيت.', en:'Small spheres about the size of BBs, more gray than blue, embedded in rocks and scattered on the soil. They are rich in the mineral hematite.'}},
 {id:'bsize', s:'PIA09077', t:'howmany', st:['pancam','case'],
  k:['حجم','كم حجم','قطر','مليمتر','ملم','5 مم','size','how big','diameter','mm','millimeter'],
  q:{ar:'كم حجم كرات التوت الأزرق؟', en:'How big are the blueberries?'},
  a:{ar:'بحجم حبة الخردق تقريبًا، وأكبرها يصل قطره إلى نحو 5 مليمترات.', en:'About the size of BBs; the biggest are up to about 5 mm across.'}},
 {id:'bname', s:'berries', t:'why', st:['pancam','case'],
  k:['ليش اسمها','اسمها توت','سميت توت','تسمى توت','called blueberries','named blueberries','لماذا تسمى','لماذا سميت','زرقاء','ازرق','لونها','why called','why blue','name','color','colour'],
  q:{ar:'هل هي زرقاء فعلًا؟', en:'Are they really blue?'},
  a:{ar:'لا. «التوت الأزرق» لقب أطلقه الفريق عليها، لكنها في الحقيقة رمادية أكثر منها زرقاء.', en:'No. "Blueberries" is a nickname from the team; they are actually more gray than blue.'}},
 {id:'concretion', s:'PIA09077', t:'how', st:['verdict','ch2outro','case'],
  k:['كيف تكونت','كيف تشكلت','تكونت','تشكلت','اصلها','من وين جت','تكتلات','تكتل','how formed','how did they form','form','concretion','concretions','origin'],
  q:{ar:'كيف تكوّنت كرات التوت الأزرق؟', en:'How did the blueberries form?'},
  a:{ar:'تبيّن أنها «تكتّلات» غنية بالحديد نمت داخل رواسب مشبعة بالمياه الجوفية، أي نمت في مكانها داخل الصخر.', en:'Investigations showed they are iron-rich concretions that grew inside deposits soaked with groundwater, growing in place inside the rock.'}},
 {id:'hematite', s:'PIA05587', t:'what', st:['clue3','verdict','case','ch1intro'],
  k:['هيماتيت','الهيماتيت','هماتيت','معدن','حديد','hematite','mineral','iron'],
  q:{ar:'ما هو الهيماتيت؟', en:'What is hematite?'},
  a:{ar:'معدن من معادن الحديد، يتكوّن على الأرض غالبًا مع الماء. لذلك كان وجوده على المريخ دليلًا مهمًا.', en:'An iron mineral that on Earth often forms with water. That is why finding it on Mars was important evidence.'}},
 {id:'water', s:'mission', t:'what', st:['verdict','ch2outro','legacy','fin'],
  k:['ماء','مياه','الماء','موية','بحيره','رطب','water','wet','groundwater','lake','ocean'],
  q:{ar:'هل وجدت أوبورتيونيتي ماءً على المريخ؟', en:'Did Opportunity find water on Mars?'},
  a:{ar:'وجدت أدلة على ماء قديم: دراسة سجل الصخور أكدت أن الماء ظل موجودًا فترة طويلة على سطح المريخ في الماضي القديم.', en:'It found evidence of ancient water: studying the rock record confirmed water was long-standing on Mars\'s surface in ancient times.'}},
 {id:'alive', s:'mission', t:'what', st:['verdict','ch2outro','legacy'],
  k:['حياه','كائنات','مخلوقات','فضائيين','بكتيريا','حي','life','alive','aliens','alien','living','bacteria'],
  q:{ar:'هل وجدت حياة على المريخ؟', en:'Did it find life on Mars?'},
  a:{ar:'لا. ما وجدته هو دليل على ماء قديم، وليس دليلًا على حياة. ونحن في هذه التجربة لا نقول إلا ما تدعمه الأدلة.', en:'No. What it found is evidence of ancient water, not of life. In this experience we only say what the evidence supports.'}},
 {id:'tools', s:'mission', t:'what', st:['arm','ch1intro','fin'],
  k:['ادوات','اداه','اجهزه','اجهزتها','معدات','tools','instruments','equipment','what can it do'],
  q:{ar:'ما أدوات أوبورتيونيتي؟', en:'What tools does Opportunity have?'},
  a:{ar:'كاميرا بانورامية (Pancam) وكاميرا ملاحة (Navcam) على الصاري، وعلى الذراع: المصوّر المجهري (MI)، وأداة كشط الصخور (RAT)، ومطياف موسباور لمعادن الحديد، ومطياف APXS للكيمياء.', en:'A panoramic camera (Pancam) and a navigation camera (Navcam) on the mast; on the arm: the Microscopic Imager (MI), the Rock Abrasion Tool (RAT), the Mössbauer spectrometer for iron minerals, and APXS for chemistry.'}},
 {id:'pancam', s:'mission', t:'what', st:['pancam','ch1intro'],
  k:['بانكام','الكاميرا البانوراميه','كاميرا','الصاري','عيون','عيونها','pancam','panoramic','camera','mast','eyes'],
  q:{ar:'ما هي كاميرا Pancam؟', en:'What is Pancam?'},
  a:{ar:'الكاميرا البانورامية على صاري المركبة، تلتقط صورًا عبر عدة مرشحات لونية لتكوّن صورًا ملوّنة ومشاهد واسعة.', en:'The panoramic camera on the rover\'s mast. It took images through multiple color filters to build color pictures and wide views.'}},
 {id:'mi', s:'mi', t:'what', st:['arm','clue1','clue2','pancam'],
  k:['المصور المجهري','مجهر','مجهري','ميكروسكوب','عدسه','مكبره','ميكرومتر','microscopic imager','microscope','mi','magnify','lens','micron'],
  q:{ar:'ما هو المصوّر المجهري (MI)؟', en:'What is the Microscopic Imager (MI)?'},
  a:{ar:'كاميرا مقرّبة على الذراع تصوّر بدقة 31 ميكرومترًا لكل بكسل، ومجال رؤيتها 32 مليمترًا فقط، فترى تفاصيل الصخر الدقيقة.', en:'A close-up camera on the arm that images at 31 micrometers per pixel over a 32 mm field of view, showing tiny rock details.'}},
 {id:'rat', s:'mission', t:'what', st:['arm'],
  k:['كشط','اداه الكشط','rat','grind','grinding','abrasion','brush'],
  q:{ar:'ما هي أداة كشط الصخور (RAT)؟', en:'What is the Rock Abrasion Tool (RAT)?'},
  a:{ar:'أداة على ذراع المركبة تكشط سطح الصخر لتكشف ما تحته قبل فحصه بالأدوات الأخرى.', en:'A tool on the rover\'s arm that grinds the rock surface to expose what is underneath before the other tools examine it.'}},
 {id:'moss', s:'PIA05587', t:'what', st:['arm','clue3'],
  k:['موسباور','موسبور','مطياف','طيف','بصمه','mossbauer','mössbauer','spectrometer','spectrum','fingerprint'],
  q:{ar:'ما هو مطياف موسباور؟', en:'What is the Mössbauer spectrometer?'},
  a:{ar:'جهاز على الذراع يكشف معادن الحديد في الصخر، مثل الهيماتيت، فيعطي ما يشبه «بصمة» لكل معدن.', en:'An instrument on the arm that detects iron minerals in rock, such as hematite, giving something like a "fingerprint" for each mineral.'}},
 {id:'apxs', s:'mission', t:'what', st:['arm'],
  k:['apxs','كيمياء','كيميائي','عناصر','chemistry','chemical','elements'],
  q:{ar:'ما هو جهاز APXS؟', en:'What is APXS?'},
  a:{ar:'مطياف على الذراع يقيس كيمياء الصخور والتربة.', en:'A spectrometer on the arm that measures the chemistry of rocks and soil.'}},
 {id:'navcam', s:'mission', t:'what', st:['arm','pancam'],
  k:['navcam','نافكام','كاميرا الملاحه','ملاحه','navigation'],
  q:{ar:'ما هي Navcam؟', en:'What is Navcam?'},
  a:{ar:'كاميرا الملاحة على الصاري، من أدوات المركبة إلى جانب الكاميرا البانورامية.', en:'The navigation camera on the mast, one of the rover\'s tools alongside the panoramic camera.'}},
 {id:'lastimg', s:'PIA22929', t:'what', st:['read','order','fin','final'],
  k:['اخر صوره','الصوره الاخيره','صوره مظلمه','مظلمه','سوداء','last image','last picture','final image','dark image','dark','pia22929'],
  q:{ar:'لماذا آخر صورة مظلمة وناقصة؟', en:'Why is the last image dark and incomplete?'},
  a:{ar:'التُقطت بمرشّح الشمس موجّهًا نحو الشمس التي حجبتها العاصفة، فبدت مظلمة. النقاط البيضاء ضجيج في الكاميرا، والجزء السفلي أسود لأن الإرسال توقف قبل اكتمالها.', en:'It was taken with the solar filter pointed at the Sun, which the storm had blotted out, so it looks dark. The white specks are camera noise, and the bottom is black because the transmission stopped.'}},
 {id:'specks', s:'PIA22929', t:'what', st:['read'],
  k:['نقاط بيضاء','النقاط البيضاء','نقط','ضجيج','تشويش','white dots','white specks','specks','noise','dots'],
  q:{ar:'ما النقاط البيضاء في آخر صورة؟', en:'What are the white specks in the last image?'},
  a:{ar:'هي ضجيج في الكاميرا، وليست نجومًا ولا أجسامًا.', en:'They are camera noise, not stars or objects.'}},
 {id:'lionking', s:'mission', t:'what', st:['ch1outro','pancam','legacy'],
  k:['الاسد الملك','بانوراما','558','lion king','panorama','eagle crater'],
  q:{ar:'ما هي بانوراما «الأسد الملك»؟', en:'What is the "Lion King" panorama?'},
  a:{ar:'بانوراما التقطتها أوبورتيونيتي في 2004 لمنطقة فوهة «إيغل»، من 558 صورة وأكثر من 75 ميغابايت من البيانات.', en:'A 2004 panorama of the Eagle Crater area made from 558 images and more than 75 MB of data.'}},
 {id:'layers', s:'PIA05585', t:'why', st:['clue1','case'],
  k:['طبقات','الطبقات','تنحني','بركان','نيزك','سقطت','من السماء','layers','bend','volcano','meteor','meteorite','fell','from the sky'],
  q:{ar:'كيف استبعدنا البركان والنيزك؟', en:'How were the volcano and meteorite ruled out?'},
  a:{ar:'في صورة El Capitan المجهرية، الطبقات الدقيقة في الصخر لا تنحني حول الكرة. لو سقطت الكرة من الأعلى لضغطت الطبقات وثنتها.', en:'In the El Capitan microscopic image, the fine rock layers do not bend around the sphere. A sphere that fell from above would have pushed the layers down.'}},
 {id:'triplet', s:'PIA05586', t:'why', st:['clue2','case'],
  k:['ثلاث كرات','ملتصقه','ملتصقة','رجل الثلج','عجلات','العجلات','triplet','triplets','joined','snowman','wheels','wheel'],
  q:{ar:'كيف استبعدنا عجلات المركبة؟', en:'How were the rover wheels ruled out?'},
  a:{ar:'في صورة Berry Bowl ظهرت ثلاث كرات ملتصقة في خط داخل الصخر نفسه. هذا يعني أنها نمت في مكانها، لا أن العجلات صنعتها.', en:'The Berry Bowl image shows three spheres joined in a line inside the rock itself. That means they grew in place; the wheels did not make them.'}},
 {id:'sextet', s:'PIA05587', t:'what', st:['clue3','verdict'],
  k:['ست قمم','سداسيه','قمم','الخط الازرق','الخط الاصفر','empty','berry bowl','sextet','six peaks','peaks','blue line','yellow line'],
  q:{ar:'ماذا أظهر مطياف موسباور في الفحصين؟', en:'What did the Mössbauer scans show?'},
  a:{ar:'مكان Berry Bowl (فيه كرات، قيس في اليوم 48) أظهر بصمة هيماتيت قوية من ست قمم. ومكان Empty (بلا كرات، اليوم 46) لم يُظهرها. إذن الهيماتيت مرتبط بالكرات.', en:'Berry Bowl (with spheres, measured on sol 48) showed a strong hematite signature with six peaks. Empty (no spheres, sol 46) did not. So the hematite comes with the spheres.'}},
 {id:'verdict', s:'PIA09077', t:'what', st:['verdict','ch2outro'],
  k:['الحكم','النتيجه','الاستنتاج','الجواب','من الفاعل','حل القضيه','verdict','conclusion','answer','solution','result'],
  q:{ar:'ما الاستنتاج النهائي في الجزء الثاني؟', en:'What is the final conclusion of part two?'},
  a:{ar:'الكرات تكتّلات نمت داخل صخور مشبعة بالماء. هذا دليل على ماء قديم في المريخ، وليس دليلًا على حياة.', en:'The spheres are concretions that grew inside water-soaked rock. That is evidence of ancient water on Mars, not of life.'}},
 {id:'model', s:'model', t:'what', st:['ch1intro','solar','pancam','arm'],
  k:['مجسم','نموذج','ثلاثي الابعاد','3d','model','3d model'],
  q:{ar:'من أين جاء المجسم ثلاثي الأبعاد؟', en:'Where does the 3D model come from?'},
  a:{ar:'هو النموذج ثلاثي الأبعاد الرسمي لمركبتي MER من ناسا/JPL-Caltech، ومنشور على موقع ناسا.', en:'It is the official NASA/JPL-Caltech 3D model of the MER rovers, published on NASA\'s website.'}},
 {id:'name', s:'mission', t:'what', st:['opening','ch1intro'],
  k:['معنى اسمها','اسمها','اوبورتيونيتي','اوبرتونتي','opportunity','meaning','name','oppy'],
  q:{ar:'ماذا يعني اسم Opportunity؟', en:'What does the name Opportunity mean?'},
  a:{ar:'كلمة Opportunity تعني بالعربية «الفرصة». وهي مركبة ناسا التي هبطت في سهل ميريدياني في 24 يناير 2004.', en:'"Opportunity" is the English word for a chance. It is the NASA rover that landed at Meridiani Planum on January 24, 2004.'}},
 {id:'now', s:'end', t:'what', st:['legacy','fin','final'],
  k:['وين هي الحين','اين هي الان','هل ما زالت','ما زالت هناك','موجوده','where is it now','still there','still on mars','now'],
  q:{ar:'هل ما زالت المركبة على المريخ؟', en:'Is the rover still on Mars?'},
  a:{ar:'نعم، بقيت على سطح المريخ. لكنها صامتة منذ آخر اتصال في 10 يونيو 2018.', en:'Yes, it remains on the surface of Mars, silent since its last communication on June 10, 2018.'}},
 {id:'spirit', s:'mission', t:'what', st:[],
  k:['سبيريت','سبيرت','spirit','twin','توأم'],
  q:{ar:'وماذا عن المركبة Spirit؟', en:'What about the Spirit rover?'},
  a:{ar:'في هذه التجربة نركّز على أوبورتيونيتي فقط، حتى نتتبع قصة دليل واحد من البداية إلى النهاية.', en:'In this experience we focus only on Opportunity, so we can follow one trail of evidence from start to finish.'}},
 {id:'about', s:null, t:'what', st:['opening','fin','final'],
  k:['ما هذه التجربه','وش هذا الموقع','هذا الموقع','التجربه','المشروع','this site','this project','this experience','about'],
  q:{ar:'ما هي تجربة «آخر إشارة»؟', en:'What is "Last Signal"?'},
  a:{ar:'تجربة تعيد فيها بناء قصة أوبورتيونيتي بنفسك من أدلة ناسا الحقيقية: صورها وقياساتها. قاعدتنا: لا قصة بدون دليل.', en:'An experience where you rebuild Opportunity\'s story yourself from NASA\'s real evidence: its images and measurements. Our rule: no story without evidence.'}},
 {id:'whoami', s:null, t:'what', st:[],
  k:['من انت','مين انت','انت مين','ذكاء اصطناعي','بوت','روبوت','who are you','are you ai','bot','chatgpt'],
  q:{ar:'من أنت؟', en:'Who are you?'},
  a:{ar:'أنا مرشد المهمة. أجيب من بنك أسئلة مبني على مصادر ناسا الموثقة فقط، ومع كل جواب مصدره. وإذا لم أجد دليلًا، أقول ذلك بصراحة.', en:'I\'m the mission guide. I answer from a question bank built only on verified NASA sources, with the source for each answer. If there\'s no evidence, I say so.'}}
];

/* "Explain" for each step (never reveals a quiz answer) */
window.EXPLAIN = {
  ar:{opening:'أوبورتيونيتي مركبة ناسا الشمسية التي هبطت على المريخ في 2004. ستعيد بناء قصتها من أدلتها الحقيقية.',
      ch1intro:'في الجزء الأول تتعرف على المركبة: كيف تحصل على الطاقة، وبماذا ترى، وبماذا تفحص الصخور.',
      solar:'المركبة تعمل بالطاقة الشمسية. أي شيء يغطي الألواح يقلّل الطاقة، وأي شيء يكشفها يعيدها. راقب ماذا يحدث للألواح في كل حدث.',
      pancam:'هذه صورة من المصوّر المجهري مع ألوان من الكاميرا البانورامية، عرضها 3 سم فقط. الكرات الصغيرة فيها هي ما سمّاه العلماء «التوت الأزرق».',
      arm:'ذراع المركبة تحمل أدوات للعمل عن قرب: واحدة تصوّر، وواحدة تكشط، وواحدة تكشف معادن الحديد. فكّر في عمل كل أداة.',
      case:'أمامك أربعة تفسيرات محتملة لأصل الكرات. العالم لا يختار التفسير الذي يعجبه، بل يستبعد ما تنقضه الأدلة.',
      clue1:'الصخر الرسوبي يتكوّن في طبقات. لو سقط جسم عليه من الأعلى، ماذا سيحدث للطبقات تحته؟',
      clue2:'إذا كانت الكرات داخل الصخر نفسه وملتصقة ببعضها، فهل يمكن أن تكون شيئًا وصل من الخارج؟',
      clue3:'مطياف موسباور يعطي «بصمة» لمعادن الحديد. قارن البصمة في مكان فيه كرات ومكان بلا كرات.',
      verdict:'جمعت ثلاثة أدلة. انظر أي تفسير بقي ولم ينقضه أي دليل.',
      order:'كل قصة علمية لها تسلسل: سبب ثم نتيجة. رتّب الأحداث كما وقعت.',
      read:'آخر صورة من المركبة فيها معلومات: لونها، والنقاط فيها، والجزء الناقص منها. كل واحدة منها تحكي شيئًا.',
      fin:'السلسلة العلمية: أداة تجمع دليلًا، والدليل يثبت نتيجة. ابنِ الرابط خطوة بخطوة.'},
  en:{opening:'Opportunity is NASA\'s solar-powered rover that landed on Mars in 2004. You will rebuild its story from its real evidence.',
      ch1intro:'In part one you get to know the rover: how it gets power, how it sees, and how it examines rocks.',
      solar:'The rover runs on solar power. Anything that covers the panels lowers power; anything that uncovers them brings it back. Watch the panels in each event.',
      pancam:'This is a Microscopic Imager picture with color from the panoramic camera, only 3 cm across. The small spheres are what scientists nicknamed "blueberries".',
      arm:'The rover\'s arm carries close-up tools: one takes pictures, one grinds, one detects iron minerals. Think about what each one does.',
      case:'You have four possible explanations for the spheres. Scientists don\'t pick the one they like; they rule out what the evidence contradicts.',
      clue1:'Sedimentary rock forms in layers. If something fell onto it from above, what would happen to the layers underneath?',
      clue2:'If the spheres are inside the rock itself and joined together, could they be something that arrived from outside?',
      clue3:'The Mössbauer spectrometer gives a "fingerprint" of iron minerals. Compare a spot with spheres and a spot without.',
      verdict:'You collected three clues. See which explanation is left that no clue contradicts.',
      order:'Every science story has an order: cause, then effect. Put the events in the order they happened.',
      read:'The rover\'s last image holds information: its darkness, its specks, and its missing part. Each one tells something.',
      fin:'A science chain: a tool collects evidence, and the evidence proves a result. Build the link step by step.'}
};

/* Three suggested questions per step */
window.SUGG = {
  opening:['last','why','about'], ch1intro:['land','design','site'], solar:['panels','design','selfie'], pancam:['berries','bsize','pancam'],
  arm:['mi','moss','rat'], ch1outro:['lionking','tools','life'], case:['berries','hematite','alive'], clue1:['mi','layers','berries'],
  clue2:['triplet','concretion','bname'], clue3:['moss','sextet','hematite'], verdict:['concretion','water','alive'], ch2outro:['water','alive','site'],
  order:['storm','cmds','end'], read:['lastimg','specks','storm'], legacy:['dist','record','life'], fin:['tools','water','last'], final:['record','now','about']
};

/* AI guide on the public site: URL of the Cloudflare Worker that holds the NVIDIA key (empty = question bank only) */
window.CHAT_API = '';
/* AI guide directly from the browser (NVIDIA). Note: this key is visible to anyone who opens the site's code. */
window.NV = { key: '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', model: 'meta/llama-3.3-70b-instruct' };
