export const solarData = [
    {
        id: 'sun',
        name: {
            uz: 'Quyosh',
            en: 'Sun',
            ru: 'Солнце'
        },
        type: {
            uz: 'Yulduz',
            en: 'Star',
            ru: 'Звезда'
        },
        texture: '/textures/sun.jpg',
        radius: 109, // Scaled down for view: 15
        distance: 0,
        description: {
            uz: "Quyosh — Quyosh tizimining markazi, barcha hayot manbai. Uning massasi tizimning 99.86% qismini tashkil qiladi. Asosan vodorod va geliydan iborat.",
            en: "The Sun is the center of the Solar System and the source of all life. Its mass accounts for 99.86% of the system. Composed mainly of hydrogen and helium.",
            ru: "Солнце — центр Солнечной системы, источник всей жизни. Его масса составляет 99,86% всей системы. Состоит в основном из водорода и гелия."
        },
        details: {
            temp: { uz: '5,500 °C (Sirt)', en: '5,500 °C (Surface)', ru: '5,500 °C (Поверхность)' },
            rotation: { uz: '25 kun', en: '25 days', ru: '25 дней' },
            composition: { uz: 'Vodorod (74%), Geliy', en: 'Hydrogen (74%), Helium', ru: 'Водород (74%), Гелий' },
            year: { uz: '230 mln yil (Galaktik)', en: '230 mln years (Galactic)', ru: '230 млн лет (Галактический)' },
            atmosphere: { uz: 'Quyosh toji', en: 'Solar Corona', ru: 'Солнечная корона' }
        },
        funFact: {
            uz: "Quyosh shunchalik kattaki, uning ichiga 1.3 millionta Yer sig‘ib ketadi!",
            en: "The Sun is so large that 1.3 million Earths could fit inside it!",
            ru: "Солнце настолько велико, что в него могло бы поместиться 1,3 миллиона Земель!"
        }
    },
    {
        id: 'mercury',
        name: {
            uz: 'Merkuriy',
            en: 'Mercury',
            ru: 'Меркурий'
        },
        type: {
            uz: 'Toshli Sayyora',
            en: 'Terrestrial Planet',
            ru: 'Планета земной группы'
        },
        texture: '/textures/mercury.jpg',
        radius: 0.38,
        distance: 30,
        speed: 0.04,
        description: {
            uz: "Quyoshga eng yaqin va eng kichik sayyora. Atmosferasi deyarli yo‘q, shuning uchun harorat keskin o‘zgaradi. Yuzasi kraterlarga boy.",
            en: "The closest and smallest planet to the Sun. It has almost no atmosphere, causing extreme temperature swings. Its surface is covered in craters.",
            ru: "Самая близкая и самая маленькая планета к Солнцу. Практически не имеет атмосферы, из-за чего происходят резкие перепады температур."
        },
        details: {
            temp: { uz: '-173 °C dan 427 °C', en: '-173 °C to 427 °C', ru: 'от -173 °C до 427 °C' },
            rotation: { uz: '59 kun', en: '59 days', ru: '59 дней' },
            year: { uz: '88 kun', en: '88 days', ru: '88 дней' },
            composition: { uz: 'Tosh va Temir', en: 'Rock and Iron', ru: 'Камень и Железо' },
            atmosphere: { uz: 'Juda siyrak', en: 'Very thin', ru: 'Очень разреженная' }
        },
        funFact: {
            uz: "Merkuriyda bir yil atigi 88 kun, lekin bir kun (quyosh chiqishidan botishigacha) 176 Yer kunga teng!",
            en: "A year on Mercury is only 88 days, but a day lasts 176 Earth days!",
            ru: "Год на Меркурии длится всего 88 дней, но один день равен 176 земным дням!"
        }
    },
    {
        id: 'venus',
        name: {
            uz: 'Venera',
            en: 'Venus',
            ru: 'Венера'
        },
        type: {
            uz: 'Toshli Sayyora',
            en: 'Terrestrial Planet',
            ru: 'Планета земной группы'
        },
        texture: '/textures/venus.jpg',
        radius: 0.95,
        distance: 45,
        speed: 0.03,
        description: {
            uz: "Yerning 'egizagi', lekin juda issiq va zaharli atmosferaga ega. Quyosh tizimidagi eng issiq sayyora (issiqxona effekti).",
            en: "Earth's 'twin', but with a very hot and toxic atmosphere. The hottest planet in the Solar System due to the greenhouse effect.",
            ru: "«Двойник» Земли, но с очень горячей и токсичной атмосферой. Самая горячая планета в Солнечной системе из-за парникового эффекта."
        },
        details: {
            temp: { uz: '462 °C (O‘zgarmas)', en: '462 °C (Constant)', ru: '462 °C (Постоянная)' },
            rotation: { uz: '243 kun (Teskarisiga)', en: '243 days (Retrograde)', ru: '243 дня (Ретроградное)' },
            year: { uz: '225 kun', en: '225 days', ru: '225 дней' },
            composition: { uz: 'Bazalt jinslar', en: 'Basalt rock', ru: 'Базальтовые породы' },
            atmosphere: { uz: '96% Karbonat angidrid', en: '96% Carbon Dioxide', ru: '96% Углекислый газ' }
        },
        funFact: {
            uz: "Venera o‘z o‘qi atrofida teskari aylanadi: Quyosh G'arbdan chiqib, Sharqqa botadi.",
            en: "Venus spins backward relative to other planets: Simple rises in the West and sets in the East.",
            ru: "Венера вращается в обратном направлении: Солнце встает на Западе и садится на Востоке."
        }
    },
    {
        id: 'earth',
        name: {
            uz: 'Yer',
            en: 'Earth',
            ru: 'Земля'
        },
        type: {
            uz: 'Toshli Sayyora',
            en: 'Terrestrial Planet',
            ru: 'Планета земной группы'
        },
        texture: '/textures/earth.jpg',
        radius: 1,
        distance: 60,
        speed: 0.02,
        clouds: '/textures/earth-clouds.png',
        description: {
            uz: "Bizning uyimiz. Hayot mavjud bo‘lgan yagona ma'lum sayyora. Yuzasining 70% qismi suv bilan qoplangan.",
            en: "Our home. The only known planet with life. 70% of its surface is covered with water.",
            ru: "Наш дом. Единственная известная планета с жизнью. 70% ее поверхности покрыто водой."
        },
        details: {
            temp: { uz: '-88 °C dan 58 °C', en: '-88 °C to 58 °C', ru: 'от -88 °C до 58 °C' },
            rotation: { uz: '24 soat', en: '24 hours', ru: '24 часа' },
            year: { uz: '365.25 kun', en: '365.25 days', ru: '365.25 дней' },
            composition: { uz: 'Tosh, Suv, Metallar', en: 'Rock, Water, Metals', ru: 'Камень, Вода, Металлы' },
            atmosphere: { uz: 'Azot, Kislorod', en: 'Nitrogen, Oxygen', ru: 'Азот, Кислород' }
        },
        funFact: {
            uz: "Yer koinotda suyuq suv sirtda barqaror bo‘la oladigan yagona joydir.",
            en: "Earth is the only place in the universe where liquid water can exist stably on the surface.",
            ru: "Земля — единственное место во Вселенной, где жидкая вода может стабильно существовать на поверхности."
        },
        moons: [
            {
                name: { uz: 'Oy', en: 'Moon', ru: 'Луна' },
                radius: 0.27, distance: 3, speed: 0.5, texture: '/textures/moon.jpg'
            }
        ]
    },
    {
        id: 'mars',
        name: {
            uz: 'Mars',
            en: 'Mars',
            ru: 'Марс'
        },
        type: {
            uz: 'Toshli Sayyora',
            en: 'Terrestrial Planet',
            ru: 'Планета земной группы'
        },
        texture: '/textures/mars.jpg',
        radius: 0.53,
        distance: 80,
        speed: 0.015,
        description: {
            uz: "'Qizil sayyora'. Sirti temir oksidi (zang) bilan qoplangan. Eng baland tog‘ (Olimp) shu yerda joylashgan.",
            en: "The 'Red Planet'. Its surface is covered in iron oxide (rust). Home to the tallest mountain (Olympus Mons).",
            ru: "«Красная планета». Поверхность покрыта оксидом железа (ржавчиной). Здесь находится самая высокая гора (Олимп)."
        },
        details: {
            temp: { uz: '-140 °C dan 20 °C', en: '-140 °C to 20 °C', ru: 'от -140 °C до 20 °C' },
            rotation: { uz: '24 soat 37 daq', en: '24h 37m', ru: '24ч 37м' },
            year: { uz: '687 kun', en: '687 days', ru: '687 дней' },
            composition: { uz: 'Temirga boy tosh', en: 'Iron-rich rock', ru: 'Богатый железом камень' },
            atmosphere: { uz: 'CO2 (Yupqa)', en: 'CO2 (Thin)', ru: 'CO2 (Тонкая)' }
        },
        funFact: {
            uz: "Marsdagi Olimp tog‘i Everestdan qariyb 3 barobar baland (21 km).",
            en: "Olympus Mons on Mars is nearly 3 times taller than Everest (21 km).",
            ru: "Гора Олимп на Марсе почти в 3 раза выше Эвереста (21 км)."
        },
        moons: [
            { name: { uz: 'Fobos', en: 'Phobos', ru: 'Фобос' }, radius: 0.05, distance: 1.5, speed: 1.2, texture: '/textures/moon.jpg' },
            { name: { uz: 'Deymos', en: 'Deimos', ru: 'Деймос' }, radius: 0.03, distance: 2.2, speed: 0.8, texture: '/textures/moon.jpg' }
        ]
    },
    {
        id: 'jupiter',
        name: {
            uz: 'Yupiter',
            en: 'Jupiter',
            ru: 'Юпитер'
        },
        type: {
            uz: 'Gaz Giganti',
            en: 'Gas Giant',
            ru: 'Газовый гигант'
        },
        texture: '/textures/jupiter.jpg',
        radius: 3.5, // Visual Scale
        distance: 120,
        speed: 0.008,
        description: {
            uz: "Quyosh tizimidagi eng katta sayyora. Asosan vodorod va geliydan iborat. Mashhur 'Katta Qizil Dog‘' — bu ulkan bo‘ron.",
            en: "The largest planet in the Solar System. Composed mainly of hydrogen and helium. The famous 'Great Red Spot' is a massive storm.",
            ru: "Самая большая планета Солнечной системы. Состоит в основном из водорода и гелия. Знаменитое «Большое Красное Пятно» — это огромный шторм."
        },
        details: {
            temp: { uz: '-145 °C', en: '-145 °C', ru: '-145 °C' },
            rotation: { uz: '9 soat 55 daq', en: '9h 55m', ru: '9ч 55м' },
            year: { uz: '12 yil', en: '12 years', ru: '12 лет' },
            composition: { uz: 'Vodorod, Geliy', en: 'Hydrogen, Helium', ru: 'Водород, Гелий' },
            atmosphere: { uz: 'Bo‘ronli', en: 'Stormy', ru: 'Штормовая' }
        },
        funFact: {
            uz: "Yupiter barcha boshqa sayyoralarni qo‘shganda ham ulardan 2.5 barobar og‘irroq.",
            en: "Jupiter is 2.5 times more massive than all other planets combined.",
            ru: "Юпитер в 2,5 раза массивнее всех остальных планет вместе взятых."
        },
        moons: [
            { name: { uz: 'Ganimed', en: 'Ganymede', ru: 'Ганимед' }, radius: 0.15, distance: 4.5, speed: 0.4, texture: '/textures/moon.jpg' },
            { name: { uz: 'Yevropa', en: 'Europa', ru: 'Европа' }, radius: 0.12, distance: 3.8, speed: 0.6, texture: '/textures/moon.jpg' },
            { name: { uz: 'Io', en: 'Io', ru: 'Ио' }, radius: 0.13, distance: 3.2, speed: 0.8, texture: '/textures/moon.jpg' }
        ]
    },
    {
        id: 'saturn',
        name: {
            uz: 'Saturn',
            en: 'Saturn',
            ru: 'Сатурн'
        },
        type: {
            uz: 'Gaz Giganti',
            en: 'Gas Giant',
            ru: 'Газовый гигант'
        },
        texture: '/textures/saturn.jpg',
        hasRing: true,
        ringTexture: '/textures/saturn_ring.png',
        radius: 3.0,
        distance: 160,
        speed: 0.006,
        description: {
            uz: "O‘zining halqalari bilan mashhur. Zichligi suvdan kam bo‘lgan yagona sayyora.",
            en: "Famous for its rings. The only planet with a density lower than water.",
            ru: "Известен своими кольцами. Единственная планета с плотностью меньше воды."
        },
        details: {
            temp: { uz: '-178 °C', en: '-178 °C', ru: '-178 °C' },
            rotation: { uz: '10 soat 33 daq', en: '10h 33m', ru: '10ч 33м' },
            year: { uz: '29.5 yil', en: '29.5 years', ru: '29,5 лет' },
            composition: { uz: 'Vodorod, Geliy', en: 'Hydrogen, Helium', ru: 'Водород, Гелий' },
            atmosphere: { uz: 'Gazsimon', en: 'Gaseous', ru: 'Газообразная' }
        },
        funFact: {
            uz: "Agar Saturnni yetarlicha katta okeanga solsangiz, u suv yuzida qalqib turardi!",
            en: "If you put Saturn in a large enough bathtub, it would float!",
            ru: "Если бы вы поместили Сатурн в достаточно большую ванну, он бы плавал!"
        },
        moons: [
            { name: { uz: 'Titan', en: 'Titan', ru: 'Титан' }, radius: 0.18, distance: 5.5, speed: 0.3, texture: '/textures/moon.jpg' },
            { name: { uz: 'Enselad', en: 'Enceladus', ru: 'Энцелад' }, radius: 0.08, distance: 4.0, speed: 0.5, texture: '/textures/moon.jpg' }
        ]
    },
    {
        id: 'uranus',
        name: {
            uz: 'Uran',
            en: 'Uranus',
            ru: 'Уран'
        },
        type: {
            uz: 'Muz Giganti',
            en: 'Ice Giant',
            ru: 'Ледяной гигант'
        },
        texture: '/textures/uranus.jpg',
        radius: 2.0,
        distance: 200,
        speed: 0.004,
        description: {
            uz: "Yonboshlab aylanadigan 'yotgan sayyora'. Quyosh tizimidagi eng sovuq sayyora.",
            en: "The 'sideways planet' that spins on its side. The coldest planet in the Solar System.",
            ru: "«Лежащая планета», вращающаяся на боку. Самая холодная планета в Солнечной системе."
        },
        details: {
            temp: { uz: '-224 °C', en: '-224 °C', ru: '-224 °C' },
            rotation: { uz: '17 soat', en: '17 hours', ru: '17 часов' },
            year: { uz: '84 yil', en: '84 years', ru: '84 года' },
            composition: { uz: 'Muz va Gaz', en: 'Ice and Gas', ru: 'Лёд и Газ' },
            atmosphere: { uz: 'Metan, Vodorod', en: 'Methane, Hydrogen', ru: 'Метан, Водород' }
        },
        funFact: {
            uz: "Uran xuddi g‘ildirak kabi orbitasi bo‘ylab 'dumalab' harakatlanadi (o‘qi 98° og‘gan).",
            en: "Uranus rolls like a ball along its orbit (axis tilted 98°).",
            ru: "Уран катится как шар по своей орбите (наклон оси 98°)."
        },
        moons: [
            { name: { uz: 'Titaniya', en: 'Titania', ru: 'Титания' }, radius: 0.1, distance: 3.5, speed: 0.4, texture: '/textures/moon.jpg' }
        ]
    },
    {
        id: 'neptune',
        name: {
            uz: 'Neptun',
            en: 'Neptune',
            ru: 'Нептун'
        },
        type: {
            uz: 'Muz Giganti',
            en: 'Ice Giant',
            ru: 'Ледяной гигант'
        },
        texture: '/textures/neptune.jpg',
        radius: 1.9,
        distance: 240,
        speed: 0.003,
        description: {
            uz: "Quyoshdan eng uzoq sayyora. Metan gazi tufayli ko‘k rangda. Eng kuchli shamollar shu yerda.",
            en: "The farthest planet from the Sun. Blue due to methane gas. Hosts the strongest winds.",
            ru: "Самая далекая планета от Солнца. Синяя из-за метана. Здесь дуют самые сильные ветры."
        },
        details: {
            temp: { uz: '-214 °C', en: '-214 °C', ru: '-214 °C' },
            rotation: { uz: '16 soat', en: '16 hours', ru: '16 часов' },
            year: { uz: '165 yil', en: '165 years', ru: '165 лет' },
            composition: { uz: 'Muz, Tosh', en: 'Ice, Rock', ru: 'Лёд, Камень' },
            atmosphere: { uz: 'Metan, Vodorod', en: 'Methane, Hydrogen', ru: 'Метан, Водород' }
        },
        funFact: {
            uz: "Neptunda olmos yomg‘irlari yog‘ishi mumkin (yuqori bosim tufayli).",
            en: "It may rain diamonds on Neptune (due to high pressure).",
            ru: "На Нептуне могут идти алмазные дожди (из-за высокого давления)."
        },
        moons: [
            { name: { uz: 'Triton', en: 'Triton', ru: 'Тритон' }, radius: 0.12, distance: 4.0, speed: 0.3, texture: '/textures/moon.jpg' }
        ]
    }
];
