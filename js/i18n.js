const translations = {
  nav: {
    home: { en: 'Home', fr: 'Accueil', ar: 'الرئيسية' },
    whatIs: { en: 'What Is It?', fr: "Qu'est-ce que c'est ?", ar: 'ما هو؟' },
    science: { en: 'Science', fr: 'Science', ar: 'العلم' },
    stories: { en: 'Stories', fr: 'Histoires', ar: 'قصص' },
    poems: { en: 'Poems & Quotes', fr: 'Poèmes & Citations', ar: 'شعر واقتباسات' },
    gallery: { en: 'Gallery', fr: 'Galerie', ar: 'معرض' },
    tips: { en: 'Tips', fr: 'Conseils', ar: 'نصائح' },
    blog: { en: 'Blog', fr: 'Blog', ar: 'مدونة' },
    share: { en: 'Share', fr: 'Partager', ar: 'شارك' },
    contact: { en: 'Contact', fr: 'Contact', ar: 'اتصل بنا' },
    privacy: { en: 'Privacy', fr: 'Confidentialité', ar: 'الخصوصية' },
    siteName: { en: 'Love at First Sight', fr: 'Le Coup de Foudre', ar: 'الحب من أول نظرة' },
    logo: { en: '\u2665 Love at First Sight', fr: '\u2665 Love at First Sight', ar: '\u2665 \u0627\u0644\u062d\u0628 \u0645\u0646 \u0623\u0648\u0644 \u0646\u0638\u0631\u0629' },
  },
  footer: {
    tagline: { en: 'Celebrating the magic of that one moment when two souls recognize each other.', fr: 'Célébrer la magie de cet instant où deux âmes se reconnaissent.', ar: 'احتفاء بسحر تلك اللحظة التي تتعرف فيها روحان على بعضهما.' },
    quickLinks: { en: 'Quick Links', fr: 'Liens rapides', ar: 'روابط سريعة' },
    languages: { en: 'Languages', fr: 'Langues', ar: 'اللغات' },
    copyright: { en: 'Love at First Sight. Made with heart.', fr: 'Le coup de foudre. Fait avec cœur.', ar: 'الحب من أول نظرة. صنع بقلب.' },
    allRights: { en: 'All rights reserved.', fr: 'Tous droits réservés.', ar: 'جميع الحقوق محفوظة.' },
  },
  home: {
    heroTitle: { en: 'Love at First Sight', fr: 'Le Coup de Foudre', ar: 'الحب من أول نظرة' },
    heroSubtitle: { en: 'That one moment that changes everything.', fr: "Cet instant unique qui change tout.", ar: 'تلك اللحظة الواحدة التي تغير كل شيء.' },
    heroDesc: { en: 'Is it real? Is it magic? Or is it simply the most human thing there is, to recognize a soul in a stranger?', fr: 'Est-ce réel ? Est-ce magique ? Ou est-ce simplement la chose la plus humaine qui soit, reconnaître une âme dans un inconnu ?', ar: 'هل هو حقيقي؟ هل هو سحر؟ أم أنه ببساطة أكثر الأشياء إنسانية، أن تتعرف على روح في شخص غريب؟' },
    cta: { en: 'Share Your Story', fr: 'Partagez Votre Histoire', ar: 'شارك قصتك' },
    learnMore: { en: 'Learn More', fr: 'En Savoir Plus', ar: 'اعرف أكثر' },
    quotes: [
      { en: '"The best thing to hold onto in life is each other." — Audrey Hepburn', fr: '"La meilleure chose à laquelle s\'accrocher dans la vie, c\'est l\'autre." — Audrey Hepburn', ar: '"أفضل شيء يمكن التمسك به في الحياة هو بعضنا البعض." — أودري هيبورن' },
      { en: '"It was at first sight, and forever." — Victor Hugo', fr: '"Ce fut dès le premier regard, et pour toujours." — Victor Hugo', ar: '"كان من أول نظرة، وإلى الأبد." — فيكتور هوجو' },
      { en: '"Love is not blind — it sees more, not less." — Rabbi Julius Gordon', fr: '"L\'amour n\'est pas aveugle — il voit plus, pas moins." — Julius Gordon', ar: '"الحب ليس أعمى — إنه يرى أكثر، لا أقل." — الحاخام يوليوس جوردون' },
      { en: '"The most beautiful thing about love at first sight is that it needs no translation."', fr: '"La plus belle chose du coup de foudre est qu\'il n\'a besoin d\'aucune traduction."', ar: '"أجمل ما في الحب من أول نظرة أنه لا يحتاج إلى ترجمة."' },
      { en: '"Your body has decided before your conscious mind has caught up."', fr: '"Votre corps a décidé avant que votre esprit conscient n\'ait eu le temps de comprendre."', ar: '"لقد قرر جسدك قبل أن يدرك عقلك الواعي."' },
    ],
    featureCards: [
      { title: { en: 'What Is Love at First Sight?', fr: "Qu'est-ce que le coup de foudre ?", ar: 'ما هو الحب من أول نظرة؟' }, desc: { en: 'What it means, where it comes from, and why that electric moment hits so hard.', fr: 'Ce que ça signifie, d\'où ça vient, et pourquoi cet instant électrique frappe si fort.', ar: 'ماذا يعني، من أين يأتي، ولماذا تضرب تلك اللحظة الكهربائية بقوة.' }, link: 'what-is.html' },
      { title: { en: 'The Science Behind It', fr: 'La science derrière tout ça', ar: 'العلم وراء ذلك' }, desc: { en: 'Dopamine, eye contact, and the strange biology of instant attraction.', fr: 'La dopamine, le contact visuel, et l\'étrange biologie de l\'attraction instantanée.', ar: 'الدوبامين، التواصل البصري، والبيولوجيا الغريبة للانجذاب الفوري.' }, link: 'science.html' },
      { title: { en: 'Famous Love Stories', fr: 'Histoires d\'amour célèbres', ar: 'قصص حب شهيرة' }, desc: { en: 'From Layla & Majnun to modern tales — love that struck like lightning.', fr: 'De Layla et Majnun aux contes modernes — l\'amour qui frappe comme la foudre.', ar: 'من ليلى ومجنون إلى الحكايات الحديثة — حب ضرب كالبرق.' }, link: 'stories.html' },
    ],
  },
  whatIs: {
    pageTitle: { en: 'What Is Love at First Sight?', fr: "Qu'est-ce que le coup de foudre ?", ar: 'ما هو الحب من أول نظرة؟' },
    pageSubtitle: { en: 'Exploring the moment that poets, scientists, and hopeless romantics have tried to understand for centuries.', fr: 'Explorer cet instant que poètes, scientifiques et romantiques invétérés tentent de comprendre depuis des siècles.', ar: 'استكشاف اللحظة التي حاول الشعراء والعلماء والرومانسيون اليائسون فهمها لقرون.' },
    intro: { en: "I think most of us have wondered about it at some point. That cinematic moment when two strangers lock eyes across a room and something shifts. Is it real, or just something we've been conditioned to believe in by movies and novels?", fr: "Je pense que la plupart d'entre nous se sont posé la question à un moment donné. Ce moment cinématographique où deux inconnus se croisent du regard et quelque chose bascule. Est-ce réel, ou simplement quelque chose qu'on nous a conditionnés à croire par les films et les romans ?", ar: 'أعتقد أن معظمنا تساءل عن ذلك في وقت ما. تلك اللحظة السينمائية عندما يتلاقى عينا غريبين عبر الغرفة ويتغير شيء ما. هل هو حقيقي، أم مجرد شيء تم تكييفنا للاعتقاد به من خلال الأفلام والروايات؟' },
    section1Title: { en: 'A Feeling Beyond Words', fr: 'Un sentiment au-delà des mots', ar: 'شعور يتجاوز الكلمات' },
    section1Body: { en: "Love at first sight isn't about knowing someone. It's about recognizing something. A familiarity that doesn't make logical sense. It's the strange sensation of meeting someone for the first time and feeling like you've known them forever. The French call it 'coup de foudre.' A thunderbolt. A strike of lightning. That's exactly what it feels like. Sudden. Electric. Unpredictable.", fr: "Voici ce que j'en suis venu à croire : le coup de foudre ne consiste pas à connaître quelqu'un. Il s'agit de reconnaître quelque chose. Une familiarité qui n'a pas de sens logique. C'est l'étrange sensation de rencontrer quelqu'un pour la première fois et d'avoir l'impression de le connaître depuis toujours. Soudain. Électrique. Imprévisible.", ar: 'إليكم ما توصلت إليه: الحب من أول نظرة لا يتعلق بمعرفة شخص ما. إنه يتعلق بالتعرف على شيء ما. ألفة لا معنى منطقي لها. إنه الإحساس الغريب بمقابلة شخص لأول مرة والشعور وكأنك تعرفه إلى الأبد.' },
    section2Title: { en: 'What the Philosophers Say', fr: 'Ce que disent les philosophes', ar: 'ما يقوله الفلاسفة' },
    section2Body: { en: "Philosophers have gone back and forth on this for ages. Plato thought love was about recognizing a kindred soul, a fragment of your other half. Aristotle was more practical: love needs time and knowledge. I lean toward Plato. Not because it's more romantic. I just think there's something to the idea that we carry pictures of what we're looking for, and when we see it, we know.", fr: "Les philosophes ont débattu de cela pendant des siècles. Platon pensait que l'amour était une question de reconnaissance d'une âme sœur — un fragment de votre moitié. Aristote était plus pragmatique, arguant que l'amour nécessite du temps et de la connaissance. Je penche pour Platon sur ce point.", ar: 'تجادل الفلاسفة في هذا لقرون. اعتقد أفلاطون أن الحب يتعلق بالتعرف على روح قريبة — جزء من نصفك الآخر. كان أرسطو أكثر عملية، بحجة أن الحب يتطلب وقتًا ومعرفة. أنا أميل نحو أفلاطون في هذا.' },
    section3Title: { en: 'Love Across Cultures', fr: "L'amour à travers les cultures", ar: 'الحب عبر الثقافات' },
    section3Body: { en: "Different cultures describe it differently. In Arabic poetry, it's 'hubb min awal nazra' — love from the first glance. The desert poets built entire epics around a single look. In French culture, the coup de foudre is practically a national obsession. They believe in it without apology. In Japan, there's a concept called 'koi no yokan' — not love at first sight exactly, but the feeling that you will fall in love with someone you've just met. It's subtle. And sometimes the anticipation of love hits just as hard as love itself.", fr: "Ce qui est fascinant, c'est comment différentes cultures le décrivent. Dans la poésie arabe, c'est 'hubb min awal nazra' — l'amour dès le premier regard. Dans la culture française, le coup de foudre est presque une obsession nationale. Au Japon, il y a un concept appelé 'koi no yokan'. Parfois l'anticipation de l'amour est aussi puissante que l'amour lui-même.", ar: 'الرائع هو كيف تصفه الثقافات المختلفة. في الشعر العربي، هو "حب من أول نظرة". في الثقافة الفرنسية، "لو كو دو فودر" هو هوس وطني تقريبًا. في اليابان، هناك مفهوم يسمى "كوي نو يوكان". أحيانًا يكون توقع الحب قويًا مثل الحب نفسه.' },
    section4Title: { en: 'So, Does It Really Exist?', fr: "Alors, ça existe vraiment ?", ar: 'إذن، هل هو موجود حقًا؟' },
    section4Body: { en: "Honestly? I think it does. But not like in the movies. Real love at first sight isn't about instant happily-ever-after. It's instant recognition. A door that opens, not a story that ends. What matters is what you do after you walk through. The lightning strike is just the beginning.", fr: "Honnêtement ? Je pense que oui. Mais pas comme dans les films. Le vrai coup de foudre n'est pas un 'ils vécurent heureux' instantané. C'est une reconnaissance instantanée — une porte qui s'ouvre, pas une histoire qui se termine. L'éclair n'est que le début.", ar: 'بصراحة؟ أعتقد أنه موجود. ولكن ليس بالطريقة التي تظهرها الأفلام. الحب الحقيقي من أول نظرة ليس عن "سعادة أبدية" فورية. إنه عن التعرف الفوري — باب يفتح، لا قصة تنتهي. البرق هو مجرد البداية.' },
  },
  science: {
    pageTitle: { en: 'The Science of Love at First Sight', fr: 'La science du coup de foudre', ar: 'علم الحب من أول نظرة' },
    pageSubtitle: { en: 'What happens in your brain and body when love strikes like lightning.', fr: 'Ce qui se passe dans votre cerveau et votre corps quand l\'amour frappe comme la foudre.', ar: 'ماذا يحدث في دماغك وجسدك عندما يضرب الحب كالبرق.' },
    intro: { en: "I'll be honest — I used to think explaining love through science was a way of killing its magic. Like learning how a magic trick works. But the more I read, the more I realized: the biology of love at first sight is, in its own way, weirder and more wonderful than the poetry.", fr: "Pour être honnête, je pensais qu'expliquer l'amour par la science revenait à tuer sa magie. Mais plus je lisais, plus je réalisais : la biologie du coup de foudre est, à sa manière, encore plus étonnante que la poésie.", ar: 'لأكون صريحًا، كنت أعتقد أن تفسير الحب من خلال العلم هو قتل لسحره. ولكن كلما قرأت أكثر، أدركت أكثر: بيولوجيا الحب من أول نظرة هي، بطريقتها الخاصة، أكثر روعة من الشعر.' },
    section1Title: { en: 'The 0.2 Second Decision', fr: 'La décision en 0,2 seconde', ar: 'قرار الـ 0.2 ثانية' },
    section1Body: { en: "Research suggests it takes about a fifth of a second to decide if you're attracted to someone. That's barely a heartbeat. In that blink of time, your brain processes symmetry, body language, and dozens of micro-cues you're not even aware of. Studies using MRI scans show that the same brain regions that light up when a drug addict gets a fix also activate when someone sees a person they find attractive. It's that powerful. And that fast.", fr: "Les recherches suggèrent qu'il faut environ un cinquième de seconde pour décider si quelqu'un vous attire. C'est à peine un battement de cœur. Dans ce clin d'œil, votre cerveau traite la symétrie, le langage corporel et des dizaines de micro-signaux.", ar: 'تشير الأبحاث إلى أن الأمر يستغرق حوالي خمس الثانية لتقرر ما إذا كنت منجذبًا لشخص ما. هذا بالكاد نبضة قلب. في تلك اللحظة، يعالج دماغك التناسق ولغة الجسد وعشرات الإشارات الدقيقة.' },
    section2Title: { en: 'The Chemical Cocktail', fr: 'Le cocktail chimique', ar: 'الكوكتيل الكيميائي' },
    section2Body: { en: "When you experience love at first sight, your brain throws a party. Dopamine floods your system, the reward chemical that makes you feel euphoric. Norepinephrine kicks in, making your heart race and your palms sweat. That's the 'butterflies.' It's also why you might say something stupid. Meanwhile, oxytocin starts building attachment. All of this happens in seconds. Your body has decided before your conscious mind catches up.", fr: "Quand vous vivez un coup de foudre, votre cerveau fait la fête. La dopamine inonde votre système. La noradrénaline s'active, accélérant votre cœur. Pendant ce temps, l'ocytocine commence à créer l'attachement. Tout cela arrive en quelques secondes.", ar: 'عندما تمر بالحب من أول نظرة، يبدأ دماغك حفلة. يغمر الدوبامين نظامك. ينشط النورإبينفرين، مما يسرع نبضات قلبك. وفي الوقت نفسه، يبدأ الأوكسيتوسين في بناء التعلق. كل هذا يحدث في ثوانٍ.' },
    section3Title: { en: 'The Eyes Have It', fr: 'Les yeux dans les yeux', ar: 'العيون تفعلها' },
    section3Body: { en: "Eye contact might be the closest thing we have to magic. Studies show that sustained eye contact — even just two minutes — can produce feelings of deep connection between strangers. Pupil dilation is a big part of this. When we see something we like, our pupils dilate. And when someone's pupils dilate while looking at us, our brain reads it as attraction. It's a feedback loop. A silent conversation happening beneath language.", fr: "Le contact visuel est peut-être ce qui se rapproche le plus de la magie. Des études montrent que même deux minutes de contact visuel soutenu peuvent produire des sentiments de connexion profonde. La dilatation des pupilles est un élément important. Une conversation silencieuse sous le langage.", ar: 'التواصل البصري قد يكون أقرب شيء لدينا إلى السحر. تظهر الدراسات أن التواصل البصري المستمر — حتى لمدة دقيقتين — يمكن أن ينتج مشاعر ارتباط عميق بين الغرباء. اتساع حدقة العين هو جزء كبير من هذا.' },
    section4Title: { en: 'But Is It Love or Lust?', fr: 'Mais est-ce de l\'amour ou du désir ?', ar: 'ولكن هل هو حب أم شهوة؟' },
    section4Body: { en: "It's probably both, at first. The brain doesn't separate the two in those early moments. What matters is what happens next. The initial spark can grow into lasting love, or it can fizzle out. Science doesn't tell us which. It only tells us the fire exists. Whether you feed it or walk away is up to you.", fr: "Bonne question. La réponse honnête est : c'est probablement les deux, au début. Le cerveau ne sépare pas clairement les deux dans ces premiers instants. Ce qui compte, c'est ce qui se passe ensuite. La science ne nous dit pas lequel — elle nous dit seulement que le feu existe.", ar: 'سؤال عادل. الإجابة الصادقة هي: إنه على الأرجح كليهما في البداية. الدماغ لا يفصل بوضوح بين الاثنين في تلك اللحظات الأولى. المهم هو ما يحدث بعد ذلك. العلم لا يخبرنا أيهما — يخبرنا فقط أن النار موجودة.' },
  },
  stories: {
    pageTitle: { en: 'Famous Love Stories', fr: 'Histoires d\'amour célèbres', ar: 'قصص حب شهيرة' },
    pageSubtitle: { en: 'Tales of love that struck like lightning — from ancient legends to modern romances.', fr: 'Des histoires d\'amour qui ont frappé comme la foudre — des légendes anciennes aux romances modernes.', ar: 'حكايات حب ضربت كالبرق — من الأساطير القديمة إلى الرومانسيات الحديثة.' },
    intro: { en: "I've always been drawn to love stories. Not the perfectly packaged Hollywood ones, but the messy, improbable, real ones. The kind where two people met by chance and something clicked. The kind that make you believe in fate, even if you don't want to.", fr: "J'ai toujours été attiré par les histoires d'amour. Pas celles parfaitement emballées d'Hollywood, mais les vraies, les improbables, les désordonnées. Celles qui vous font croire au destin, même si vous ne voulez pas.", ar: 'لطالما انجذبت إلى قصص الحب. ليس تلك المعبأة بشكل مثالي من هوليوود، ولكن القصص الحقيقية، الفوضوية، غير المتوقعة. تلك التي تجعلك تؤمن بالقدر، حتى لو كنت لا تريد ذلك.' },
    stories: [
      {
        title: { en: 'Layla & Majnun', fr: 'Layla et Majnun', ar: 'ليلى ومجنون' },
        origin: { en: 'Arabic Legend — 7th Century', fr: 'Légende arabe — VIIe siècle', ar: 'أسطورة عربية — القرن السابع' },
        img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
        text: { en: "The most famous love story in the Arab world isn't a fairytale — it's a tragedy. Qays fell in love with Layla at first sight when they were children. But her family refused the marriage. Qays went mad with longing, wandering the desert, reciting poetry about Layla. They called him 'Majnun' — possessed by jinn. But maybe he was just possessed by love. They never married. He never stopped loving her. It's heartbreaking. And it's also the most beautiful story of unconsummated love ever told.", fr: "L'histoire d'amour la plus célèbre du monde arabe n'est pas un conte de fées — c'est une tragédie. Qays est tombé amoureux de Layla au premier regard quand ils étaient enfants. Mais sa famille a refusé le mariage. Qays est devenu fou de désir, errant dans le désert, récitant de la poésie sur Layla. Ils ne se sont jamais mariés. Il n'a jamais cessé de l'aimer.", ar: 'أشهر قصة حب في الوطن العربي ليست حكاية خيالية — إنها مأساة. وقع قيس في حب ليلى من أول نظرة عندما كانا طفلين. لكن عائلتها رفضت الزواج. أصيب قيس بالجنون من الشوق، يتجول في الصحراء، يلقي الشعر عن ليلى. لم يتزوجوا أبدًا. لم يتوقف عن حبها أبدًا.' },
      },
      {
        title: { en: 'Romeo & Juliet', fr: 'Roméo et Juliette', ar: 'روميو وجولييت' },
        origin: { en: 'Shakespeare — 1597', fr: 'Shakespeare — 1597', ar: 'شكسبير — 1597' },
        img: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=600&q=80',
        text: { en: "Yes, it's cliché. I know. But clichés become clichés for a reason. Romeo sees Juliet across a crowded room and — bam. He forgets Rosaline instantly. He climbs walls. He risks death. All based on a single look. People roll their eyes at it now, but there's a reason teenagers have been acting irrational after locking eyes across a classroom for centuries. Shakespeare understood something: love at first sight doesn't care about consequences. That's what makes it dangerous. And unforgettable.", fr: "Oui, c'est cliché. Je sais. Mais les clichés le deviennent pour une raison. Roméo voit Juliette dans une salle bondée et — bam. Shakespeare a compris quelque chose : le coup de foudre ne se soucie pas des conséquences. C'est ce qui le rend dangereux. Et inoubliable.", ar: 'نعم، إنه كليشيه. أعرف. لكن الكليشيهات تصبح كليشيهات لسبب. روميو يرى جولييت عبر غرفة مزدحمة وبام. شكسبير فهم شيئًا: الحب من أول نظرة لا يهتم بالعواقب. هذا ما يجعله خطيرًا. ولا يُنسى.' },
      },
      {
        title: { en: 'The Story of Yusuf and Zulaikha', fr: 'Yusuf et Zulaikha', ar: 'قصة يوسف وزليخة' },
        origin: { en: 'Persian & Islamic Tradition', fr: 'Tradition persane et islamique', ar: 'التقليد الفارسي والإسلامي' },
        img: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80',
        text: { en: "This story, told in the Quran and expanded by Persian poets like Jami, is one of the most complex tales of love at first sight. Zulaikha saw Yusuf and was instantly consumed by love. But he didn't feel the same. Her love was unreturned. For years. She suffered. She was humiliated. And yet her love never died. What gets me is that this story doesn't pretend love at first sight is always mutual or easy. Sometimes it's a burden. Sometimes it's all you carry.", fr: "Cette histoire, racontée dans le Coran et développée par des poètes persans comme Jami, est l'un des récits les plus complexes du coup de foudre. Zulaikha a vu Yusuf et a été instantanément consumée par l'amour. Mais il ne ressentait pas la même chose.", ar: 'هذه القصة، المروية في القرآن والموسعة من قبل شعراء فارسيين مثل جامي، هي واحدة من أكثر حكايات الحب من أول نظرة تعقيدًا. رأت زليخة يوسف واشتعلت حبًا فورًا. لكنه لم يشعر بنفس الشيء.' },
      },
      {
        title: { en: 'Modern Love Stories', fr: 'Histoires d\'amour modernes', ar: 'قصص حب حديثة' },
        origin: { en: 'Real People, Real Moments', fr: 'Vraies personnes, vrais moments', ar: 'أشخاص حقيقيون، لحظات حقيقية' },
        img: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=600&q=80',
        text: { en: "I've read hundreds of online stories from people who swear they experienced love at first sight. A woman who locked eyes with a stranger on a train in Tokyo — she got off at his stop even though it wasn't hers. They've been married 20 years. A man who saw a woman reading his favorite book in a Paris café. He wrote his number on a napkin. She called. They have three kids now. These stories follow a pattern: recognition, risk, reward. The first look opens the door. But someone has to walk through it.", fr: "J'ai lu des centaines d'histoires en ligne de personnes qui jurent avoir vécu le coup de foudre. Ces histoires suivent un schéma : reconnaissance, risque, récompense. Le premier regard ouvre la porte. Mais quelqu'un doit la franchir.", ar: 'قرأت مئات القصص عبر الإنترنت من أشخاص يقسمون أنهم عاشوا الحب من أول نظرة. هذه القصص تتبع نمطًا: الاعتراف، المخاطرة، المكافأة. النظرة الأولى تفتح الباب. لكن على شخص ما أن يعبره.' },
      },
    ],
  },
  poems: {
    pageTitle: { en: 'Poems & Quotes', fr: 'Poèmes & Citations', ar: 'شعر واقتباسات' },
    pageSubtitle: { en: 'Words that capture what the heart already knows.', fr: 'Des mots qui capturent ce que le cœur sait déjà.', ar: 'كلمات تلتقط ما يعرفه القلب بالفعل.' },
    intro: { en: "Poets have been trying to describe love at first sight forever. They all fail, of course. But some of them fail beautifully.", fr: "Les poètes essaient de décrire le coup de foudre depuis qu'il existe un langage. Ils échouent tous, bien sûr. Mais certains échouent magnifiquement.", ar: 'يحاول الشعراء وصف الحب من أول نظرة منذ أن وجدت اللغة. يفشلون جميعًا بالطبع. لكن بعضهم يفشل بشكل جميل.' },
    arabicPoetry: { en: 'Arabic Poetry', fr: 'Poésie arabe', ar: 'الشعر العربي' },
    frenchPoetry: { en: 'French Poetry', fr: 'Poésie française', ar: 'الشعر الفرنسي' },
    englishPoetry: { en: 'English Poetry', fr: 'Poésie anglaise', ar: 'الشعر الإنجليزي' },
    poems: {
      arabic: [
        { quote: { en: '"They said: be patient. I said: love has no patience. They said: forget her. I said: the soul does not forget."', fr: '"Ils ont dit : sois patient. J\'ai dit : l\'amour n\'a pas de patience. Ils ont dit : oublie-la. J\'ai dit : l\'âme n\'oublie pas."', ar: '"قالوا: اصبر. قلت: الحب لا صبر له. قالوا: انسها. قلت: الروح لا تنسى."' }, author: { en: 'Qays ibn al-Mulawwah (Majnun)', fr: 'Qays ibn al-Mulawwah (Majnun)', ar: 'قيس بن الملوح (مجنون)' } },
        { quote: { en: '"She looked at me once. And I became her slave forever."', fr: '"Elle m\'a regardé une fois. Et je suis devenu son esclave pour toujours."', ar: '"نظرت إلي نظرة. فصرت عبدها إلى الأبد."' }, author: { en: 'Antar ibn Shaddad', fr: 'Antar ibn Shaddad', ar: 'عنتر بن شداد' } },
        { quote: { en: '"Between my eyes and her eyes, my heart forgot its way home."', fr: '"Entre mes yeux et ses yeux, mon cœur a oublié le chemin de la maison."', ar: '"بين عيني وعينيها، ضاع قلبي في الطريق."' }, author: { en: 'Nizar Qabbani', fr: 'Nizar Qabbani', ar: 'نزار قباني' } },
        { quote: { en: '"The most beautiful thing about love at first sight is that it needs no translation."', fr: '"La plus belle chose du coup de foudre est qu\'il n\'a besoin d\'aucune traduction."', ar: '"أجمل ما في الحب من أول نظرة أنه لا يحتاج إلى ترجمة."' }, author: { en: 'Arabic Proverb', fr: 'Proverbe arabe', ar: 'مثل عربي' } },
      ],
      french: [
        { quote: { en: 'She looked at me once. And I became her slave forever.', fr: '"Elle m\'a regardé une fois. Et je suis devenu son esclave pour toujours."', ar: '"نظرت إلي نظرة. فصرت عبدها إلى الأبد."' }, author: { en: 'Victor Hugo', fr: 'Victor Hugo', ar: 'فيكتور هوجو' } },
        { quote: { en: '"It was at first sight — and at the last sight, and at every sight in between."', fr: '"Ce fut au premier regard — et au dernier regard, et à chaque regard entre les deux."', ar: '"كان من أول نظرة — ومن آخر نظرة، ومن كل نظرة بينهما."' }, author: { en: 'Jacques Prévert', fr: 'Jacques Prévert', ar: 'جاك بريفير' } },
        { quote: { en: '"Love is not something you find. Love is something that finds you."', fr: '"L\'amour n\'est pas quelque chose que l\'on trouve. L\'amour est quelque chose qui vous trouve."', ar: '"الحب ليس شيئًا تجده. الحب هو شيء يجدك."' }, author: { en: 'Alfred de Musset', fr: 'Alfred de Musset', ar: 'ألفريد دي موسيه' } },
        { quote: { en: '"To love at first sight is to recognize a soul you have not forgotten."', fr: '"Aimer au premier regard, c\'est reconnaître une âme que l\'on n\'a pas oubliée."', ar: '"أن تحب من أول نظرة هو أن تتعرف على روح لم تنساها."' }, author: { en: 'French Proverb', fr: 'Proverbe français', ar: 'مثل فرنسي' } },
      ],
      english: [
        { quote: { en: '"Who ever loved, that loved not at first sight?"', fr: '"Qui a jamais aimé sans aimer au premier regard ?"', ar: '"من أحب يومًا دون أن يحب من أول نظرة؟"' }, author: { en: 'Christopher Marlowe', fr: 'Christopher Marlowe', ar: 'كريستوفر مارلو' } },
        { quote: { en: '"I saw her and we were lost in time — nothing else mattered."', fr: '"Je l\'ai vue et nous étions perdus dans le temps — rien d\'autre n\'avait d\'importance."', ar: '"رأيتها وضاع كلانا في الزمان — لا شيء آخر كان مهمًا."' }, author: { en: 'Pablo Neruda', fr: 'Pablo Neruda', ar: 'بابلو نيرودا' } },
        { quote: { en: '"Love is not blind — it sees more, not less. But because it sees more, it chooses to see through."', fr: '"L\'amour n\'est pas aveugle — il voit plus, pas moins. Mais parce qu\'il voit plus, il choisit de voir à travers."', ar: '"الحب ليس أعمى — إنه يرى أكثر، لا أقل. لكن لأنه يرى أكثر، يختار أن يرى من خلال."' }, author: { en: 'Rabbi Julius Gordon', fr: 'Rabbi Julius Gordon', ar: 'الحاخام يوليوس جوردون' } },
        { quote: { en: '"The only thing better than falling in love at first sight is staying in love long after."', fr: '"La seule chose meilleure que de tomber amoureux au premier regard, c\'est de rester amoureux longtemps après."', ar: '"الشيء الوحيد الأفضل من الوقوع في الحب من أول نظرة هو البقاء في الحب بعد ذلك بوقت طويل."' }, author: { en: 'Anonymous', fr: 'Anonyme', ar: 'مجهول' } },
      ],
    },
    langArabic: { en: 'Arabic', fr: 'Arabe', ar: 'العربية' },
    langFrench: { en: 'French', fr: 'Français', ar: 'الفرنسية' },
    langEnglish: { en: 'English', fr: 'Anglais', ar: 'الإنجليزية' },
  },
  gallery: {
    pageTitle: { en: 'Gallery & Videos', fr: 'Galerie & Vidéos', ar: 'معرض وفيديو' },
    pageSubtitle: { en: 'Images and moments that capture the feeling of that first electric glance.', fr: 'Des images et des moments qui capturent ce premier regard électrique.', ar: 'صور ولحظات تلتقط ذلك الشعور بتلك النظرة الكهربائية الأولى.' },
    photoGallery: { en: 'Photo Gallery', fr: 'Galerie photo', ar: 'معرض الصور' },
    photoDesc: { en: 'Click any image to expand', fr: 'Cliquez sur une image pour agrandir', ar: 'انقر على أي صورة للتكبير' },
    songSection: { en: 'Love Songs', fr: 'Chansons d\'amour', ar: 'أغاني الحب' },
    tabArabic: { en: 'Arabic', fr: 'Arabe', ar: 'العربية' },
    tabFrench: { en: 'French', fr: 'Français', ar: 'الفرنسية' },
    tabEnglish: { en: 'English', fr: 'Anglais', ar: 'الإنجليزية' },
  },
  tips: {
    pageTitle: { en: 'Tips to Make It Happen', fr: 'Conseils pour que ça arrive', ar: 'نصائح لجعلها تحدث' },
    pageSubtitle: { en: 'Not a guide. Just some thoughts from someone who believes.', fr: 'Pas un guide. Juste quelques réflexions de quelqu\'un qui y croit.', ar: 'ليس دليلاً. مجرد بعض الأفكار من شخص يؤمن بذلك.' },
    intro: { en: "I want to be careful here. Love at first sight isn't something you can engineer. You can't schedule a thunderbolt. But you can put yourself in the path of possibility. These aren't rules. Just thoughts.", fr: "Je veux être prudent ici. Le coup de foudre n'est pas quelque chose que l'on peut provoquer. On ne peut pas programmer un éclair. Mais on peut se mettre sur le chemin de la possibilité.", ar: 'أريد أن أكون حذرًا هنا. الحب من أول نظرة ليس شيئًا يمكنك هندسته. لا يمكنك جدولة صاعقة. لكن يمكنك وضع نفسك في مسار الاحتمال.' },
    tips: [
      { number: 1, title: { en: 'Be Present', fr: 'Soyez présent', ar: 'كن حاضرًا' }, text: { en: "You can't recognize a soul if you're staring at your phone. The most common thread in love-at-first-sight stories is that both people were fully present. Not distracted. Not scrolling. Just there, in that moment, with their eyes open.", fr: "Vous ne pouvez pas reconnaître une âme si vous regardez votre téléphone. Le point commun dans les histoires de coup de foudre est que les deux personnes étaient pleinement présentes.", ar: 'لا يمكنك التعرف على روح إذا كنت تحدق في هاتفك. الخيط المشترك في قصص الحب من أول نظرة هو أن كلا الشخصين كانا حاضرين بالكامل.' } },
      { number: 2, title: { en: 'Go Places That Matter to You', fr: 'Allez dans des endroits qui comptent pour vous', ar: 'اذهب إلى الأماكن المهمة بالنسبة لك' }, text: { en: "Love at first sight happens when two people with overlapping worlds collide. Go to the places you genuinely love — the bookshop, the museum, the café with the good music. You're more likely to find someone who shares your wavelength when you're already on your frequency.", fr: "Le coup de foudre arrive quand deux personnes avec des mondes qui se chevauchent se rencontrent. Allez dans les endroits que vous aimez vraiment.", ar: 'يحدث الحب من أول نظرة عندما يتصادم شخصان لهما عوالم متداخلة. اذهب إلى الأماكن التي تحبها حقًا.' } },
      { number: 3, title: { en: 'Make Eye Contact', fr: 'Établissez un contact visuel', ar: 'تواصل بصريًا' }, text: { en: "This sounds obvious. It isn't. Most of us avoid eye contact with strangers. We look away. We pretend we didn't see them. But every love-at-first-sight story I've read starts with a held gaze. Not a stare. A held gaze. There's a difference.", fr: "Cela semble évident. Ça ne l'est pas. La plupart d'entre nous évitent le contact visuel avec les étrangers. Nous détournons le regard. Mais la mythologie du coup de foudre commence presque toujours par un regard soutenu.", ar: 'هذا يبدو واضحًا. لكنه ليس كذلك. معظمنا يتجنب التواصل البصري مع الغرباء. ننظر بعيدًا. لكن أسطورة الحب من أول نظرة تبدأ دائمًا تقريبًا بنظرة ثابتة.' } },
      { number: 4, title: { en: 'Say Something', fr: 'Dites quelque chose', ar: 'قل شيئًا' }, text: { en: "The look is just the beginning. Someone has to break the silence. It doesn't have to be clever or smooth. In fact, awkward is better. \"Hi\" works. \"I know this is random but...\" works. The bravest thing you can do is interrupt the silence.", fr: "Le regard n'est que le début. Quelqu'un doit briser le silence. Ça n'a pas besoin d'être intelligent ou fluide. En fait, le maladroit est mieux.", ar: 'النظرة هي مجرد البداية. على شخص ما كسر الصمت. لا يجب أن يكون ذكيًا أو سلسًا. في الواقع، الإحراج أفضل.' } },
      { number: 5, title: { en: 'Don\'t Force It', fr: 'Ne forcez pas', ar: 'لا تجبر الأمور' }, text: { en: "Nobody wants to admit this: most looks don't lead to love. And that's fine. You can't fake chemistry. You can't manufacture recognition. Sometimes you look into someone's eyes and there's nothing there. And that's okay. The thunderbolt doesn't answer to anyone.", fr: "Voici la vérité que personne ne veut admettre : la plupart des regards ne mènent pas à l'amour. Et c'est très bien. On ne peut pas fabriquer la reconnaissance.", ar: 'إليكم الحقيقة التي لا أحد يريد الاعتراف بها: معظم النظرات لا تؤدي إلى الحب. وهذا جيد. لا يمكنك تزييف الكيمياء.' } },
    ],
  },
  share: {
    pageTitle: { en: 'Share Your Story', fr: 'Partagez votre histoire', ar: 'شارك قصتك' },
    pageSubtitle: { en: 'Did love at first sight happen to you? Tell us about that moment.', fr: 'Le coup de foudre vous est-il arrivé ? Racontez-nous cet instant.', ar: 'هل حدث لك الحب من أول نظرة؟ أخبرنا عن تلك اللحظة.' },
    intro: { en: "I genuinely want to hear your story. Not because I'm collecting data, but because I believe every love-at-first-sight story is a small miracle. And miracles deserve to be told.", fr: "Je veux vraiment entendre votre histoire. Pas parce que je collecte des données, mais parce que je crois que chaque histoire de coup de foudre est un petit miracle. Et les miracles méritent d'être racontés.", ar: 'أريد حقًا سماع قصتك. ليس لأنني أجمع بيانات، ولكن لأنني أعتقد أن كل قصة حب من أول نظرة هي معجزة صغيرة. والمعجزات تستحق أن تروى.' },
    form: {
      name: { en: 'Your Name', fr: 'Votre nom', ar: 'اسمك' },
      namePlaceholder: { en: 'Enter your name', fr: 'Entrez votre nom', ar: 'أدخل اسمك' },
      email: { en: 'Your Email (optional)', fr: 'Votre email (optionnel)', ar: 'البريد الإلكتروني (اختياري)' },
      emailPlaceholder: { en: 'Enter your email', fr: 'Entrez votre email', ar: 'أدخل بريدك الإلكتروني' },
      title: { en: 'Story Title', fr: 'Titre de l\'histoire', ar: 'عنوان القصة' },
      titlePlaceholder: { en: 'Give your story a title', fr: 'Donnez un titre à votre histoire', ar: 'أعطِ قصتك عنوانًا' },
      lang: { en: 'Story Language', fr: 'Langue de l\'histoire', ar: 'لغة القصة' },
      langEn: { en: 'English', fr: 'Anglais', ar: 'الإنجليزية' },
      langFr: { en: 'French', fr: 'Français', ar: 'الفرنسية' },
      langAr: { en: 'Arabic', fr: 'Arabe', ar: 'العربية' },
      story: { en: 'Your Story', fr: 'Votre histoire', ar: 'قصتك' },
      storyPlaceholder: { en: 'Tell us about that moment when your eyes met...', fr: 'Racontez-nous ce moment où vos yeux se sont croisés...', ar: 'أخبرنا عن تلك اللحظة التي تلاقت فيها عيونكما...' },
      submit: { en: 'Share Your Story', fr: 'Partagez votre histoire', ar: 'شارك قصتك' },
      success: { en: 'Thank you! Your story has been shared.', fr: 'Merci ! Votre histoire a été partagée.', ar: 'شكرًا لك! تم مشاركة قصتك.' },
      sending: { en: 'Sending...', fr: 'Envoi...', ar: 'جارٍ الإرسال...' },
      localSuccess: { en: 'Thank you! Your story has been shared (local).', fr: 'Merci ! Votre histoire a été partagée (local).', ar: 'شكرًا لك! تمت مشاركة قصتك (محلي).' },
    },
    wallTitle: { en: 'Love Stories Wall', fr: 'Mur des histoires d\'amour', ar: 'جدار قصص الحب' },
    empty: { en: 'No stories yet. Be the first to share!', fr: 'Pas encore d\'histoires. Soyez le premier à partager !', ar: 'لا توجد قصص بعد. كن أول من يشارك!' },
    moderationNotice: { en: 'Stories are reviewed before being published. You will receive an email when your story is approved.', fr: 'Les histoires sont relues avant d\'être publiées. Vous recevrez un email lorsque votre histoire sera approuvée.', ar: 'تتم مراجعة القصص قبل النشر. ستتلقى بريدًا إلكترونيًا عند الموافقة على قصتك.' },
  },
  blog: {
    pageTitle: { en: 'Blog', fr: 'Blog', ar: 'مدونة' },
    pageSubtitle: { en: 'Thoughts, stories, and reflections on love at first sight.', fr: 'Réflexions, histoires et pensées sur le coup de foudre.', ar: 'أفكار وقصص وتأملات عن الحب من أول نظرة.' },
    readMore: { en: 'Read More', fr: 'Lire plus', ar: 'اقرأ المزيد' },
    posts: [
      { id: 1, title: { en: 'Did I Experience Love at First Sight?', fr: 'Ai-je vécu un coup de foudre ?', ar: 'هل عشت الحب من أول نظرة؟' }, date: { en: 'June 15, 2026', fr: '15 juin 2026', ar: '١٥ يونيو ٢٠٢٦' }, image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&q=80', excerpt: { en: "I've been asking myself this question for years. Here's what I've decided.", fr: "Je me suis posé cette question pendant des années. Voici ce que j'ai décidé.", ar: 'ظللت أسأل نفسي هذا السؤال لسنوات. إليكم ما قررته.' } },
      { id: 2, title: { en: 'Love at First Sight in the Digital Age', fr: 'Le coup de foudre à l\'ère numérique', ar: 'الحب من أول نظرة في العصر الرقمي' }, date: { en: 'June 8, 2026', fr: '8 juin 2026', ar: '٨ يونيو ٢٠٢٦' }, image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80', excerpt: { en: "Can you fall in love at first sight if that first sight is a profile picture?", fr: "Peut-on tomber amoureux au premier regard si ce premier regard est une photo de profil ?", ar: 'هل يمكن أن تقع في الحب من أول نظرة إذا كانت تلك النظرة الأولى صورة شخصية؟' } },
      { id: 3, title: { en: 'How Your Brain Decides in 0.2 Seconds', fr: 'Comment votre cerveau décide en 0,2 seconde', ar: 'كيف يقرر دماغك في 0.2 ثانية' }, date: { en: 'June 1, 2026', fr: '1 juin 2026', ar: '١ يونيو ٢٠٢٦' }, image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&q=80', excerpt: { en: "The neuroscience of instant attraction is stranger than fiction.", fr: "La neuroscience de l'attraction instantanée est plus étrange que la fiction.", ar: 'علم الأعصاب للانجذاب الفوري أغرب من الخيال.' } },
      { id: 4, title: { en: "Coup de Foudre: The French Obsession", fr: "Coup de foudre : l'obsession française", ar: 'لو كو دو فودر: الهوس الفرنسي' }, date: { en: 'May 25, 2026', fr: '25 mai 2026', ar: '٢٥ مايو ٢٠٢٦' }, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80', excerpt: { en: "Why the French take love at first sight more seriously than anyone else.", fr: "Pourquoi les Français prennent le coup de foudre plus au sérieux que quiconque.", ar: 'لماذا يأخذ الفرنسيون الحب من أول نظرة على محمل الجد أكثر من أي شخص آخر.' } },
      { id: 5, title: { en: 'من أول نظرة: Love Stories from the Arab World', fr: 'Histoires d\'amour du monde arabe', ar: 'من أول نظرة: قصص حب من العالم العربي' }, date: { en: 'May 18, 2026', fr: '18 mai 2026', ar: '١٨ مايو ٢٠٢٦' }, image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&q=80', excerpt: { en: "Arabic poetry has celebrated love at first sight for over a millennium.", fr: "La poésie arabe célèbre le coup de foudre depuis plus d'un millénaire.", ar: 'يحتفل الشعر العربي بالحب من أول نظرة منذ أكثر من ألف عام.' } },
      { id: 6, title: { en: 'Famous Love at First Sight Couples in History', fr: 'Couples célèbres du coup de foudre dans l\'histoire', ar: 'أشهر الأزواج الذين عاشوا الحب من أول نظرة في التاريخ' }, date: { en: 'May 11, 2026', fr: '11 mai 2026', ar: '١١ مايو ٢٠٢٦' }, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', excerpt: { en: 'From Antony and Cleopatra to modern icons, history is full of electric first meetings.', fr: "D'Antoine et Cléopâtre aux icônes modernes, l'histoire est pleine de premières rencontres électriques.", ar: 'من أنطونيو وكليوباترا إلى أيقونات العصر الحديث، التاريخ مليء باللقاءات الأولى الكهربائية.' } },
      { id: 7, title: { en: 'Love at First Sight vs Love Over Time', fr: 'Coup de foudre vs Amour progressif', ar: 'الحب من أول نظرة ضد الحب التدريجي' }, date: { en: 'May 4, 2026', fr: '4 mai 2026', ar: '٤ مايو ٢٠٢٦' }, image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=600&q=80', excerpt: { en: 'Which lasts longer? Science has some surprising answers.', fr: 'Lequel dure le plus longtemps ? La science a des réponses surprenantes.', ar: 'أيهما يدوم أطول؟ العلم لديه إجابات مفاجئة.' } },
      { id: 8, title: { en: 'The Biology of the First Look', fr: 'La biologie du premier regard', ar: 'بيولوجيا النظرة الأولى' }, date: { en: 'April 27, 2026', fr: '27 avril 2026', ar: '٢٧ أبريل ٢٠٢٦' }, image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&q=80', excerpt: { en: 'What happens in your body the moment you lock eyes with someone?', fr: 'Que se passe-t-il dans votre corps au moment où vos yeux croisent ceux de quelqu\'un ?', ar: 'ماذا يحدث في جسدك في اللحظة التي تلتقي فيها عيناك بشخص ما؟' } },
    ],
  },
  blogPost: {
    back: { en: 'Back to Blog', fr: 'Retour au blog', ar: 'العودة إلى المدونة' },
    notFound: { en: 'Post not found.', fr: 'Article non trouvé.', ar: 'المقال غير موجود.' },
  },
  contact: {
    pageTitle: { en: 'Contact Us', fr: 'Contactez-nous', ar: 'اتصل بنا' },
    pageSubtitle: { en: "We'd love to hear from you. Every message is read with care.", fr: 'Nous aimerions avoir de vos nouvelles. Chaque message est lu avec attention.', ar: 'يسعدنا التواصل معك. كل رسالة تقرأ بعناية.' },
    intro: { en: 'Have a question about love at first sight? Want to share a thought, a story, or just say hello? Write to us. We read every single message.', fr: 'Vous avez une question sur le coup de foudre ? Vous voulez partager une pensée, une histoire ou simplement dire bonjour ? Écrivez-nous. Nous lisons chaque message.', ar: 'هل لديك سؤال عن الحب من أول نظرة؟ تريد مشاركة فكرة أو قصة أو مجرد إلقاء التحية؟ اكتب لنا. نقرأ كل رسالة.' },
    form: {
      name: { en: 'Your Name', fr: 'Votre nom', ar: 'اسمك' },
      namePlaceholder: { en: 'Enter your name', fr: 'Entrez votre nom', ar: 'أدخل اسمك' },
      email: { en: 'Your Email', fr: 'Votre email', ar: 'بريدك الإلكتروني' },
      emailPlaceholder: { en: 'Enter your email', fr: 'Entrez votre email', ar: 'أدخل بريدك الإلكتروني' },
      subject: { en: 'Subject', fr: 'Sujet', ar: 'الموضوع' },
      subjectPlaceholder: { en: 'What is this about?', fr: 'De quoi s\'agit-il ?', ar: 'عن ماذا يتعلق؟' },
      message: { en: 'Message', fr: 'Message', ar: 'الرسالة' },
      messagePlaceholder: { en: 'Write your message here...', fr: 'Écrivez votre message ici...', ar: 'اكتب رسالتك هنا...' },
      submit: { en: 'Send Message', fr: 'Envoyer le message', ar: 'أرسل الرسالة' },
      sending: { en: 'Sending...', fr: 'Envoi...', ar: 'جارٍ الإرسال...' },
      success: { en: 'Thank you! Your message has been sent. We will get back to you soon.', fr: 'Merci ! Votre message a été envoyé. Nous vous répondrons bientôt.', ar: 'شكرًا لك! تم إرسال رسالتك. سنعود إليك قريبًا.' },
      error: { en: 'Sorry, something went wrong. Please try again or email us directly at rafaabou@proton.me.', fr: 'Désolé, une erreur s\'est produite. Veuillez réessayer ou nous envoyer un email directement à rafaabou@proton.me.', ar: 'عذرًا، حدث خطأ ما. يرجى المحاولة مرة أخرى أو مراسلتنا مباشرة على rafaabou@proton.me.' },
    },
    emailTitle: { en: 'Email', fr: 'Email', ar: 'البريد الإلكتروني' },
    responseTitle: { en: 'Response Time', fr: 'Délai de réponse', ar: 'وقت الرد' },
    responseText: { en: 'We reply within 24-48 hours.', fr: 'Nous répondons sous 24 à 48 heures.', ar: 'نرد خلال 24-48 ساعة.' },
  },
  notFound: {
    pageTitle: { en: 'Page Not Found', fr: 'Page non trouvée', ar: 'الصفحة غير موجودة' },
    pageSubtitle: { en: 'This page seems to have wandered off...', fr: 'Cette page semble s\'être égarée...', ar: 'يبدو أن هذه الصفحة قد ضلت طريقها...' },
    goHome: { en: 'Go Home', fr: 'Accueil', ar: 'العودة إلى الرئيسية' },
  },
  admin: {
    loginTitle: { en: 'Admin Login', fr: 'Connexion admin', ar: 'تسجيل الدخول للمشرف' },
    tokenPlaceholder: { en: 'Enter admin token', fr: 'Entrez le jeton admin', ar: 'أدخل رمز المشرف' },
    login: { en: 'Login', fr: 'Connexion', ar: 'تسجيل الدخول' },
    error: { en: 'Invalid token', fr: 'Jeton invalide', ar: 'رمز غير صالح' },
    title: { en: 'Love Stories — Moderation', fr: 'Histoires d\'amour — Modération', ar: 'قصص الحب — إدارة' },
    logout: { en: 'Logout', fr: 'Déconnexion', ar: 'تسجيل الخروج' },
    total: { en: 'Total', fr: 'Total', ar: 'المجموع' },
    pending: { en: 'Pending', fr: 'En attente', ar: 'قيد الانتظار' },
    approved: { en: 'Approved', fr: 'Approuvées', ar: 'تمت الموافقة' },
    rejected: { en: 'Rejected', fr: 'Rejetées', ar: 'مرفوض' },
    storiesTab: { en: 'Stories', fr: 'Histoires', ar: 'القصص' },
    contactsTab: { en: 'Contact Messages', fr: 'Messages de contact', ar: 'رسائل الاتصال' },
    allFilter: { en: 'All', fr: 'Tout', ar: 'الكل' },
    pendingFilter: { en: 'Pending', fr: 'En attente', ar: 'قيد الانتظار' },
    approvedFilter: { en: 'Approved', fr: 'Approuvées', ar: 'تمت الموافقة' },
    rejectedFilter: { en: 'Rejected', fr: 'Rejetées', ar: 'مرفوض' },
    loadingStories: { en: 'Loading stories...', fr: 'Chargement des histoires...', ar: 'جارٍ تحميل القصص...' },
    loadingContacts: { en: 'Loading contacts...', fr: 'Chargement des contacts...', ar: 'جارٍ تحميل الرسائل...' },
    noStories: { en: 'No stories found.', fr: 'Aucune histoire trouvée.', ar: 'لا توجد قصص.' },
    noContacts: { en: 'No contact messages found.', fr: 'Aucun message trouvé.', ar: 'لا توجد رسائل.' },
    nameLabel: { en: 'Name', fr: 'Nom', ar: 'الاسم' },
    emailLabel: { en: 'Email', fr: 'Email', ar: 'البريد الإلكتروني' },
    dateLabel: { en: 'Date', fr: 'Date', ar: 'التاريخ' },
    actions: { en: 'Actions', fr: 'Actions', ar: 'إجراءات' },
    approve: { en: 'Approve', fr: 'Approuver', ar: 'موافقة' },
    reject: { en: 'Reject', fr: 'Rejeter', ar: 'رفض' },
    copyEmailUrl: { en: 'Copy Email URL', fr: 'Copier l\'URL d\'email', ar: 'نسخ رابط البريد' },
    connected: { en: 'Connected', fr: 'Connecté', ar: 'متصل' },
    connecting: { en: 'Connecting...', fr: 'Connexion...', ar: 'جارٍ الاتصال...' },
    offline: { en: 'Offline', fr: 'Hors ligne', ar: 'غير متصل' },
    serverError: { en: 'Server error: ', fr: 'Erreur serveur : ', ar: 'خطأ في الخادم: ' },
    invalidToken: { en: 'Invalid token. Try again.', fr: 'Jeton invalide. Réessayez.', ar: 'رمز غير صالح. حاول مرة أخرى.' },
    cannotConnect: { en: 'Cannot connect to server. Is the Worker deployed?', fr: 'Impossible de se connecter au serveur. Le Worker est-il déployé ?', ar: 'لا يمكن الاتصال بالخادم. هل العامل منشور؟' },
    failedLoadContacts: { en: 'Failed to load contacts: ', fr: 'Échec du chargement des contacts : ', ar: 'فشل تحميل جهات الاتصال: ' },
    errorAlert: { en: 'Error: ', fr: 'Erreur : ', ar: 'خطأ: ' },
    clipboardSuccess: { en: 'One-time URLs copied to clipboard!', fr: 'URLs à usage unique copiées dans le presse-papiers !', ar: 'تم نسخ الروابط لمرة واحدة إلى الحافظة!' },
  },
  lightbox: {
    close: { en: 'Close image viewer', fr: 'Fermer la visionneuse', ar: 'إغلاق معاينة الصورة' },
  },
  common: {
    skipToContent: { en: 'Skip to content', fr: 'Passer au contenu', ar: 'تخطي إلى المحتوى' },
    mainNavigation: { en: 'Main navigation', fr: 'Navigation principale', ar: 'التنقل الرئيسي' },
    menu: { en: 'Menu', fr: 'Menu', ar: 'القائمة' },
    noscript: { en: 'JavaScript is not enabled. Some features like theme switching and translations may not work.', fr: 'JavaScript n\'est pas activé. Certaines fonctionnalités comme le changement de thème et les traductions peuvent ne pas fonctionner.', ar: 'جافا سكريبت غير مفعلة. بعض الميزات مثل تبديل السمة والترجمات قد لا تعمل.' },
    loading: { en: 'Loading...', fr: 'Chargement...', ar: 'جار التحميل...' },
    nextScience: { en: 'Next: The Science Behind It →', fr: 'Suivant : La science derrière tout ça →', ar: 'التالي: العلم وراء ذلك ←' },
    nextStories: { en: 'Next: Famous Love Stories →', fr: 'Suivant : Histoires d\'amour célèbres →', ar: 'التالي: قصص حب شهيرة ←' },
    nextPoems: { en: 'Next: Poems & Quotes →', fr: 'Suivant : Poèmes & Citations →', ar: 'التالي: شعر واقتباسات ←' },
    nextGallery: { en: 'Next: Gallery & Videos →', fr: 'Suivant : Galerie & Vidéos →', ar: 'التالي: معرض وفيديو ←' },
    nextShare: { en: 'Next: Share Your Story →', fr: 'Suivant : Partagez votre histoire →', ar: 'التالي: شارك قصتك ←' },
    lightboxAlt: { en: 'Expanded gallery image', fr: 'Image agrandie de la galerie', ar: 'الصورة الموسعة من المعرض' },
    lightboxViewer: { en: 'Image viewer', fr: 'Visionneuse d\'images', ar: 'عارض الصور' },
  },
  privacy: {
    pageTitle: { en: 'Privacy Policy', fr: 'Politique de confidentialité', ar: 'سياسة الخصوصية' },
    lastUpdated: { en: 'Last updated: June 15, 2026', fr: 'Dernière mise à jour : 15 juin 2026', ar: 'آخر تحديث: ١٥ يونيو ٢٠٢٦' },
    collectTitle: { en: 'What We Collect', fr: 'Ce que nous collectons', ar: 'ما نقوم بجمعه' },
    collectText: { en: 'We collect only the information you voluntarily provide through our contact form or story submission: your name, email address, and the content of your message or story. We do not use cookies, trackers, or analytics services.', fr: 'Nous collectons uniquement les informations que vous fournissez volontairement via notre formulaire de contact ou de soumission d\'histoire : votre nom, adresse email et le contenu de votre message ou histoire. Nous n\'utilisons pas de cookies, traceurs ou services d\'analyse.', ar: 'نقوم فقط بجمع المعلومات التي تقدمها طواعية من خلال نموذج الاتصال الخاص بنا أو إرسال القصص: اسمك وعنوان بريدك الإلكتروني ومحتوى رسالتك أو قصتك. لا نستخدم ملفات تعريف الارتباط أو أدوات التتبع أو خدمات التحليل.' },
    useTitle: { en: 'How We Use Your Data', fr: 'Comment nous utilisons vos données', ar: 'كيف نستخدم بياناتك' },
    useText: { en: 'Your data is used solely to respond to your inquiries and, if you submit a story, to review and publish it on the site (with your name if provided). We do not share, sell, or rent your personal information to third parties.', fr: 'Vos données sont utilisées uniquement pour répondre à vos demandes et, si vous soumettez une histoire, pour la réviser et la publier sur le site (avec votre nom si fourni). Nous ne partageons, vendons ou louons pas vos informations personnelles à des tiers.', ar: 'تُستخدم بياناتك فقط للرد على استفساراتك، وإذا قمت بإرسال قصة، لمراجعتها ونشرها على الموقع (مع اسمك إذا تم تقديمه). نحن لا نشارك أو نبيع أو نؤجر معلوماتك الشخصية لأطراف ثالثة.' },
    storageTitle: { en: 'Data Storage', fr: 'Stockage des données', ar: 'تخزين البيانات' },
    storageText: { en: 'Your messages and stories are stored in Cloudflare KV, a secure key-value store. We retain this data for as long as necessary to operate the site. You may request deletion of your data by contacting us.', fr: 'Vos messages et histoires sont stockés dans Cloudflare KV, un stockage clé-valeur sécurisé. Nous conservons ces données aussi longtemps que nécessaire pour faire fonctionner le site. Vous pouvez demander la suppression de vos données en nous contactant.', ar: 'يتم تخزين رسائلك وقصصك في Cloudflare KV، وهو تخزين آمن من نوع مفتاح-قيمة. نحتفظ بهذه البيانات طالما كان ذلك ضروريًا لتشغيل الموقع. يمكنك طلب حذف بياناتك عن طريق الاتصال بنا.' },
    rightsTitle: { en: 'Your Rights', fr: 'Vos droits', ar: 'حقوقك' },
    rightsText: { en: 'You have the right to access, correct, or delete your personal data at any time. To exercise these rights, contact us via the contact form or email rafaabou@proton.me.', fr: 'Vous avez le droit d\'accéder, de corriger ou de supprimer vos données personnelles à tout moment. Pour exercer ces droits, contactez-nous via le formulaire de contact ou par email à rafaabou@proton.me.', ar: 'لديك الحق في الوصول إلى بياناتك الشخصية أو تصحيحها أو حذفها في أي وقت. لممارسة هذه الحقوق، اتصل بنا عبر نموذج الاتصال أو البريد الإلكتروني rafaabou@proton.me.' },
    cookiesTitle: { en: 'Cookies', fr: 'Cookies', ar: 'ملفات تعريف الارتباط' },
    cookiesText: { en: 'This site does not use cookies. We believe in privacy by default.', fr: 'Ce site n\'utilise pas de cookies. Nous croyons en la confidentialité par défaut.', ar: 'هذا الموقع لا يستخدم ملفات تعريف الارتباط. نؤمن بالخصوصية بشكل افتراضي.' },
  },
};

function getLang() {
  return document.documentElement.lang || 'en';
}

function t(key) {
  const lang = getLang();
  const keys = key.split('.');
  let obj = translations;
  for (const k of keys) {
    if (obj && obj[k]) obj = obj[k];
    else return key;
  }
  if (Array.isArray(obj)) return obj;
  if (obj && typeof obj === 'object' && obj[lang] !== undefined) return obj[lang];
  return obj && obj.en !== undefined ? obj.en : key;
}

function switchLang(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  localStorage.setItem('love-lang', lang);
  updatePageContent();
  updateLangButtons();
  updateThemeLabels();
  updatePageTitle();
  reorderPoetrySections();
}

function reorderPoetrySections() {
  const container = document.getElementById('poetrySections');
  if (!container) return;
  const lang = getLang();
  const order = { en: ['en', 'fr', 'ar'], fr: ['fr', 'en', 'ar'], ar: ['ar', 'en', 'fr'] };
  const sections = Array.from(container.querySelectorAll('[data-poetry-lang]'));
  sections.sort((a, b) => order[lang].indexOf(a.dataset.poetryLang) - order[lang].indexOf(b.dataset.poetryLang));
  sections.forEach(section => container.appendChild(section));
}

function updatePageTitle() {
  const lang = getLang();
  const siteName = t('nav.siteName');
  const headerH1 = document.querySelector('.page-header h1');
  if (headerH1) {
    document.title = lang === 'ar' ? headerH1.textContent : headerH1.textContent + ' - ' + siteName;
    return;
  }
  const postTitle = document.getElementById('postTitle');
  if (postTitle && postTitle.textContent) {
    document.title = lang === 'ar' ? postTitle.textContent : postTitle.textContent + ' - ' + siteName;
    return;
  }
  const heroSpan = document.querySelector('.hero-content h1 span[data-i18n]');
  if (heroSpan) {
    document.title = lang === 'ar' ? heroSpan.textContent : heroSpan.textContent + ' - ' + siteName;
    return;
  }
}

function updatePageContent() {
  try {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      try {
        const key = el.dataset.i18n;
        const translated = t(key);
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          if (el.dataset.i18nPlaceholder) el.placeholder = t(el.dataset.i18nPlaceholder);
          return;
        }
        if (el.tagName === 'SELECT') {
          el.querySelectorAll('option').forEach(opt => {
            if (opt.dataset.i18n) opt.textContent = t(opt.dataset.i18n);
          });
          return;
        }
        el.textContent = translated;
      } catch (e) { console.warn('i18n content update failed:', e.message); }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      try { el.placeholder = t(el.dataset.i18nPlaceholder); } catch (e) { console.warn('i18n placeholder failed:', e.message); }
    });

    document.querySelectorAll('[data-i18n-value]').forEach(el => {
      try { el.value = t(el.dataset.i18nValue); } catch (e) { console.warn('i18n value failed:', e.message); }
    });

    document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
      try { el.setAttribute('aria-label', t(el.dataset.i18nAriaLabel)); } catch (e) { console.warn('i18n aria-label failed:', e.message); }
    });

    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
      try { el.alt = t(el.dataset.i18nAlt); } catch (e) { console.warn('i18n alt failed:', e.message); }
    });
  } catch (e) { console.warn('updatePageContent failed:', e.message); }
}

function updateLangButtons() {
  const lang = getLang();
  const langLabels = {
    en: { en: 'English', fr: 'Anglais', ar: 'الإنجليزية' },
    fr: { en: 'Français', fr: 'Français', ar: 'الفرنسية' },
    ar: { en: 'العربية', fr: 'العربية', ar: 'العربية' },
  };
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
    const labels = langLabels[btn.dataset.lang];
    if (labels) btn.textContent = labels[lang] || btn.dataset.lang;
  });
}

function updateThemeLabels() {
  try {
    const lang = getLang();
    const themeLabels = {
      romantic: { en: 'Romantic', fr: 'Romantique', ar: 'رومانسي' },
      pastel: { en: 'Pastel', fr: 'Pastel', ar: 'باستيل' },
      dark: { en: 'Dark', fr: 'Sombre', ar: 'داكن' },
      sunset: { en: 'Sunset', fr: 'Coucher de soleil', ar: 'غروب' },
    };
    document.querySelectorAll('.theme-btn').forEach(btn => {
      const labels = themeLabels[btn.dataset.theme];
      if (labels) btn.textContent = labels[lang] || btn.dataset.theme;
    });
  } catch (e) { console.warn('updateThemeLabels failed:', e.message); }
}

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('love-lang') || 'ar';
  switchLang(savedLang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => switchLang(btn.dataset.lang));
  });
});
