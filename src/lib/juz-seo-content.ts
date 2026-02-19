// SEO Content Data for Juz Pages
// Contains long-form descriptions, surah info, and FAQ for each juz

export interface SurahInJuz {
    number: number;
    name: string;        // English transliteration
    nameArabic: string;
    meaning: string;     // Indonesian meaning
    totalAyahs: number;
    ayahRange: string;   // e.g. "28-83" or "1-182" (range within this juz)
    type: 'Makkiyah' | 'Madaniyah';
    description: string; // Short description in Indonesian
}

export interface JuzSEOContent {
    juzNumber: number;
    intro: string;           // Introductory paragraph
    totalAyahs: number;      // Total ayahs in this juz
    totalSurahs: number;
    surahs: SurahInJuz[];
    keywords: string[];      // Additional keyword variations
    faq: { question: string; answer: string }[];
}

export const JUZ_SEO_DATA: Record<number, JuzSEOContent> = {
    1: {
        juzNumber: 1,
        intro: 'Juz 1 Al-Quran, yang sering disebut Juz "Alif Lam Mim", dimulai dari Surah Al-Fatihah ayat 1 dan berakhir di Surah Al-Baqarah ayat 141. Juz ini meletakkan fondasi keimanan dalam Islam, membahas tiga golongan manusia (mukmin, kafir, munafik), kisah penciptaan Nabi Adam a.s., serta sejarah panjang Bani Israil dan perjuangan Nabi Ibrahim a.s. dalam membangun Ka\'bah.',
        totalAyahs: 148,
        totalSurahs: 2,
        surahs: [
            {
                number: 1,
                name: 'Al-Fatihah',
                nameArabic: 'الفاتحة',
                meaning: 'Pembukaan',
                totalAyahs: 7,
                ayahRange: '1-7',
                type: 'Makkiyah',
                description: 'Surah Al-Fatihah adalah pembuka Al-Quran yang terdiri dari 7 ayat. Surah ini disebut "Ummul Kitab" (Induk Al-Quran) karena merangkum seluruh inti ajaran Islam. Membacanya adalah rukun wajib dalam setiap rakaat shalat.'
            },
            {
                number: 2,
                name: 'Al-Baqarah',
                nameArabic: 'البقرة',
                meaning: 'Sapi Betina',
                totalAyahs: 286,
                ayahRange: '1-141',
                type: 'Madaniyah',
                description: 'Surah Al-Baqarah adalah surah terpanjang dalam Al-Quran. Dalam Juz 1 (ayat 1-141), surah ini membahas karakteristik orang bertakwa, kisah Nabi Adam, serta porsi besar mengenai peringatan Allah kepada Bani Israil dan kisah Nabi Ibrahim bersama Ismail membangun Baitullah.'
            },
        ],
        keywords: [
            'juz 1',
            'juz 1 al quran',
            'alif lam mim',
            'surah al fatihah',
            'surah al baqarah juz 1',
            'awal juz 1',
            'juz 1 sampai ayat berapa'
        ],
        faq: [
            {
                question: 'Juz 1 meliputi surah apa saja?',
                answer: 'Juz 1 mencakup Surah Al-Fatihah (ayat 1-7) secara utuh dan Surah Al-Baqarah bagian awal (ayat 1-141).'
            },
            {
                question: 'Berapa total ayat dalam Juz 1?',
                answer: 'Total ayat dalam Juz 1 adalah 148 ayat (7 ayat Al-Fatihah + 141 ayat Al-Baqarah).'
            },
            {
                question: 'Apa arti Alif Lam Mim di awal Juz 1?',
                answer: 'Alif Lam Mim adalah huruf-huruf muqatha\'ah (terpotong) yang merupakan rahasia Allah. Sebagian ulama menafsirkannya sebagai isyarat kemukjizatan Al-Quran yang tersusun dari huruf arab namun tidak bisa ditandingi oleh manusia.'
            },
        ],
    },
    2: {
        juzNumber: 2,
        intro: 'Juz 2 Al-Quran, yang diawali dengan kata "Sayaqul" (Akan berkata), dimulai dari Surah Al-Baqarah ayat 142 dan berakhir di ayat 252. Juz ini merupakan juz yang padat dengan ayat-ayat hukum (Ahkam). Pembahasan dimulai dari pengalihan kiblat, kemudian merinci syariat ibadah (puasa, haji), hukum qishash, dan porsi besar mengenai hukum keluarga (pernikahan, perceraian/talak, iddah, dan penyusuan). Juz ini ditutup dengan kisah kepemimpinan Talut dan kemenangan Nabi Daud a.s. atas Jalut.',
        totalAyahs: 111,
        totalSurahs: 1,
        surahs: [
            {
                number: 2,
                name: 'Al-Baqarah',
                nameArabic: 'البقرة',
                meaning: 'Sapi Betina',
                totalAyahs: 286,
                ayahRange: '142-252',
                type: 'Madaniyah',
                description: 'Rentang ayat ini adalah inti hukum syariat dalam Surah Al-Baqarah. Membahas perpindahan kiblat ke Ka\'bah, ayat tentang kewajiban puasa Ramadhan (ayat 183), aturan haji, hukum perang (jihad) di jalan Allah, serta aturan rinci hubungan suami istri. Diakhiri dengan doa memohon kemenangan (ayat 250) dalam kisah Talut dan Jalut.'
            },
        ],
        keywords: [
            'juz 2',
            'sayaqulu sufaha',
            'ayat puasa ramadhan',
            'hukum talak dan rujuk',
            'peralihan kiblat',
            'talut dan jalut',
            'al baqarah 142'
        ],
        faq: [
            {
                question: 'Juz 2 mulai dari ayat berapa?',
                answer: 'Juz 2 dimulai dari Surah Al-Baqarah ayat 142 (Sayaqulu sufaha...) dan berakhir di ayat 252.'
            },
            {
                question: 'Apakah Ayat Kursi ada di Juz 2?',
                answer: 'Tidak. Ayat Kursi adalah Surah Al-Baqarah ayat 255, yang merupakan awal pembukaan Juz 3. Juz 2 berakhir di ayat 252.'
            },
            {
                question: 'Apa topik utama dalam Juz 2?',
                answer: 'Juz 2 fokus pada pembentukan hukum umat Islam (Ahkam), meliputi kiblat, puasa, haji, qishash, dan hukum keluarga (munakahat).'
            },
        ],
    },
    3: {
        juzNumber: 3,
        intro: 'Juz 3 Al-Quran, yang diawali dengan kata "Tilkar Rusul" (Itulah rasul-rasul), dimulai dari Surah Al-Baqarah ayat 253 dan berakhir di Surah Ali \'Imran ayat 92. Juz ini memiliki kedudukan istimewa karena memuat ayat paling agung (Ayat Kursi) dan ayat terpanjang dalam Al-Quran (Ayat Dayn). Tema berpindah dari penyempurnaan hukum ekonomi Islam (larangan riba) di akhir Al-Baqarah, menuju penguatan aqidah dan kisah Keluarga Imran di awal surah berikutnya.',
        totalAyahs: 126,
        totalSurahs: 2,
        surahs: [
            {
                number: 2,
                name: 'Al-Baqarah',
                nameArabic: 'البقرة',
                meaning: 'Sapi Betina',
                totalAyahs: 286,
                ayahRange: '253-286',
                type: 'Madaniyah',
                description: 'Bagian penutup Surah Al-Baqarah ini memuat Ayat Kursi (Ayat 255), ditegaskannya prinsip "Tidak ada paksaan dalam agama", peringatan keras terhadap Riba, serta Ayat Dayn (ayat 282) yang merupakan ayat terpanjang dalam Al-Quran mengatur pencatatan utang. Ditutup dengan dua ayat "Amanar Rasul" yang memiliki keutamaan besar.'
            },
            {
                number: 3,
                name: 'Ali \'Imran',
                nameArabic: 'آل عمران',
                meaning: 'Keluarga Imran',
                totalAyahs: 200,
                ayahRange: '1-92',
                type: 'Madaniyah',
                description: 'Surah ini dimulai dengan penegasan Tauhid dan Al-Quran sebagai pembenar kitab sebelumnya. Pada Juz 3, fokus utamanya adalah kisah istri Imran (Hannah), kelahiran Maryam, keajaiban Nabi Isa a.s., serta dialog teologis membantah argumen Ahli Kitab (Peristiwa Mubahalah). Juga menyinggung sedikit tentang Perang Badar.'
            },
        ],
        keywords: [
            'juz 3',
            'tilkar rusul',
            'ayat kursi',
            'ayat 1000 dinar salah', // *Catatan: Banyak orang salah sangka ayat 1000 dinar ada di sini, padahal di At-Talaq. Keyword ini untuk antisipasi pencarian salah.*
            'ayat dayn',
            'ayat terpanjang',
            'riba',
            'amanar rasul',
            'keluarga imran'
        ],
        faq: [
            {
                question: 'Juz 3 sampai ayat berapa?',
                answer: 'Juz 3 berakhir pada Surah Ali \'Imran ayat 92 (Lan tanalul birra... / Kamu tidak akan memperoleh kebajikan...).'
            },
            {
                question: 'Di mana letak ayat terpanjang dalam Al-Quran?',
                answer: 'Ayat terpanjang (Ayat Dayn/Muamalah) terletak di Juz 3, yaitu Surah Al-Baqarah ayat 282.'
            },
            {
                question: 'Apa perbedaan tema Al-Baqarah dan Ali Imran di Juz 3?',
                answer: 'Al-Baqarah di Juz 3 banyak membahas Tauhid Kekuasaan Allah dan Hukum Muamalah (Ekonomi), sedangkan Ali Imran membahas Tauhid dalam membantah syubhat (keraguan) Ahli Kitab tentang Nabi Isa.'
            },
        ],
    },
    4: {
        juzNumber: 4,
        intro: 'Juz 4 Al-Quran, yang diawali dengan kata "Lan Tanalul Birra" (Kamu tidak akan memperoleh kebajikan), dimulai dari Surah Ali \'Imran ayat 93 dan berakhir di Surah An-Nisa ayat 23. Juz ini memuat transisi dari pembahasan pertahanan umat (pasca Perang Uhud) di Ali \'Imran menuju penataan internal masyarakat Islam (hak-hak kaum lemah, wanita, dan yatim) di awal Surah An-Nisa.',
        totalAyahs: 131,
        totalSurahs: 2,
        surahs: [
            {
                number: 3,
                name: 'Ali \'Imran',
                nameArabic: 'آل عمران',
                meaning: 'Keluarga Imran',
                totalAyahs: 200,
                ayahRange: '93-200',
                type: 'Madaniyah',
                description: 'Bagian kedua surah ini mengupas tuntas evaluasi kekalahan dalam Perang Uhud, larangan riba yang berlipat ganda, serta perintah bersatu (Wata\'shimu...). Surah ditutup dengan karakteristik "Ulul Albab" (orang yang berakal) yang selalu merenungi penciptaan langit dan bumi.'
            },
            {
                number: 4,
                name: 'An-Nisa',
                nameArabic: 'النساء',
                meaning: 'Wanita',
                totalAyahs: 176,
                ayahRange: '1-23',
                type: 'Madaniyah',
                description: 'Awal Surah An-Nisa fokus pada penegakan keadilan sosial. Membahas perlindungan harta anak yatim, syariat poligami (dengan syarat adil), pembagian waris (Faraidh), hukum zina (awal), dan diakhiri dengan rincian wanita-wanita yang haram dinikahi (Mahram).'
            },
        ],
        keywords: [
            'juz 4',
            'lan tanalu',
            'perang uhud',
            'ulul albab',
            'hukum waris islam',
            'faraidh',
            'mahram',
            'ayat poligami'
        ],
        faq: [
            {
                question: 'Apa isi kandungan utama akhir Surah Ali Imran di Juz 4?',
                answer: 'Isinya adalah evaluasi militer dan spiritual pasca Perang Uhud, serta doa-doa kaum Ulul Albab (cendekiawan) yang merenungi kebesaran ciptaan Allah.'
            },
            {
                question: 'Apa hukum penting yang ada di awal Juz 4 bagian An-Nisa?',
                answer: 'Hukum yang paling menonjol adalah pembagian warisan (Hukum Faraidh) pada ayat 11-12, dan aturan pernikahan (termasuk poligami dan mahram).'
            },
            {
                question: 'Juz 4 berakhir di ayat berapa?',
                answer: 'Juz 4 berakhir tepat di Surah An-Nisa ayat 23, yang membahas tentang wanita-wanita yang haram dinikahi (Ibu, anak perempuan, saudara perempuan, dll).'
            },
        ],
    },
    5: {
        juzNumber: 5,
        intro: 'Juz 5 Al-Quran, yang diawali dengan kata "Wal Muhshanat" (Dan wanita-wanita yang bersuami), dimulai dari Surah An-Nisa ayat 24 dan berakhir di ayat 147. Juz ini sangat padat dengan hukum sosiopolitik Islam. Mulai dari etika rumah tangga (hak kepemimpinan suami/Qawwam), cara menangani konflik suami-istri (Nusyuz), perintah taat pada Ulil Amri (pemerintah), tata cara shalat saat perang (Shalat Khauf), hingga ancaman keras bagi kaum Munafik.',
        totalAyahs: 124,
        totalSurahs: 1,
        surahs: [
            {
                number: 4,
                name: 'An-Nisa',
                nameArabic: 'النساء',
                meaning: 'Wanita',
                totalAyahs: 176,
                ayahRange: '24-147',
                type: 'Madaniyah',
                description: 'Lanjutan Surah An-Nisa ini membahas: 1) Larangan menikahi wanita yang sudah bersuami, 2) Kepemimpinan laki-laki (Ayat 34), 3) Syariat Tayammum (Ayat 43), 4) Perintah menegakkan keadilan dan taat pada pemimpin (Ayat 58-59), 5) Hukum membunuh sesama mukmin, dan 6) Shalat Qashar bagi musafir.'
            },
        ],
        keywords: [
            'juz 5',
            'wal muhsanat',
            'ayat ketaatan ulil amri',
            'shalat khauf',
            'hukum nusyuz',
            'tayamum an nisa',
            'munafik',
            'qawwamun'
        ],
        faq: [
            {
                question: 'Juz 5 membahas tentang apa saja?',
                answer: 'Fokus utamanya adalah hukum keluarga (penyelesaian konflik), hukum pidana (pembunuhan), hukum tata negara (ketaatan pada pemimpin), dan ibadah praktis saat kondisi darurat (perang/perjalanan).'
            },
            {
                question: 'Di mana letak ayat tentang ketaatan pada pemerintah (Ulil Amri)?',
                answer: 'Ayat tentang ketaatan pada Allah, Rasul, dan Ulil Amri terletak di Surah An-Nisa ayat 59, yang berada di Juz 5.'
            },
            {
                question: 'Apa arti Wal Muhshanat di awal Juz 5?',
                answer: 'Wal Muhshanat dalam konteks ayat 24 berarti wanita-wanita yang sudah bersuami (haram dinikahi kecuali budak yang dimiliki dalam konteks perang masa lalu).'
            },
        ],
    },
    6: {
        juzNumber: 6,
        intro: 'Juz 6 Al-Quran, yang diawali dengan kata "La Yuhibbullah" (Allah tidak menyukai ucapan buruk...), dimulai dari Surah An-Nisa ayat 148 dan berakhir di Surah Al-Ma\'idah ayat 81. Juz ini menutup pembahasan hukum sosial di An-Nisa dengan menyoroti perilaku Ahli Kitab, lalu membuka Surah Al-Ma\'idah dengan penekanan pada pemenuhan janji (akad), hukum makanan, thaharah (bersuci), dan prinsip kepemimpinan dalam Islam.',
        totalAyahs: 110,
        totalSurahs: 2,
        surahs: [
            {
                number: 4,
                name: 'An-Nisa',
                nameArabic: 'النساء',
                meaning: 'Wanita',
                totalAyahs: 176,
                ayahRange: '148-176',
                type: 'Madaniyah',
                description: 'Bagian penutup ini membantah klaim penyaliban Nabi Isa a.s. (ditegaskan beliau diangkat ke langit), perilaku buruk Bani Israil yang melanggar janji, dan ditutup dengan fatwa hukum waris "Kalalah" (seseorang yang meninggal tanpa meninggalkan ayah dan anak).'
            },
            {
                number: 5,
                name: 'Al-Ma\'idah',
                nameArabic: 'المائدة',
                meaning: 'Hidangan',
                totalAyahs: 120,
                ayahRange: '1-81',
                type: 'Madaniyah',
                description: 'Surah ini dibuka dengan rincian hewan yang haram dimakan (ayat 3) dan penyempurnaan agama Islam (Al-Yauma akmaltu...). Memuat ayat hukum Wudhu & Tayammum (ayat 6), Kisah Habil dan Qabil (pembunuhan pertama), hukum Qishash dan Hirabah (ayat 33), serta peringatan agar tidak menjadikan Yahudi & Nasrani sebagai pemimpin/teman setia (ayat 51).'
            },
        ],
        keywords: [
            'juz 6',
            'la yuhibbullah',
            'ayat wudhu',
            'kisah habil qabil',
            'makanan haram',
            'kalalah',
            'al maidah 51',
            'hukum hirabah'
        ],
        faq: [
            {
                question: 'Juz 6 berakhir di ayat berapa?',
                answer: 'Juz 6 berakhir pada Surah Al-Ma\'idah ayat 81. (Juz 7 dimulai dari ayat 82).'
            },
            {
                question: 'Di mana letak ayat tentang tata cara Wudhu?',
                answer: 'Ayat yang merinci tata cara Wudhu (dan Tayammum) secara lengkap terdapat di Juz 6, yaitu Surah Al-Ma\'idah ayat 6.'
            },
            {
                question: 'Apa itu Kalalah yang dibahas di akhir Juz 6 (An-Nisa)?',
                answer: 'Kalalah adalah istilah untuk seseorang yang meninggal dunia tanpa meninggalkan ayah ke atas atau anak ke bawah. Hukum warisnya dijelaskan di ayat terakhir An-Nisa (176).'
            },
        ],
    },
    7: {
        juzNumber: 7,
        intro: 'Juz 7 Al-Quran diawali dengan ayat "Latajidanna..." (Surah Al-Ma\'idah ayat 82), namun lebih dikenal luas dengan sebutan Juz "Wa Idza Sami\'u" (merujuk pada ayat 83). Juz ini berakhir di Surah Al-An\'am ayat 110. Bagian ini sangat menarik karena menampilkan transisi dari ayat-ayat Madaniyah yang sarat hukum ketat (seperti larangan keras khamr dan judi) menuju ayat-ayat Makkiyah yang sangat kental dengan argumen Tauhid dan pembuktian rasional atas keesaan Allah.',
        totalAyahs: 149,
        totalSurahs: 2,
        surahs: [
            {
                number: 5,
                name: 'Al-Ma\'idah',
                nameArabic: 'المائدة',
                meaning: 'Hidangan',
                totalAyahs: 120,
                ayahRange: '82-120',
                type: 'Madaniyah',
                description: 'Bagian penutup Surah Al-Ma\'idah ini memuat ayat-ayat penting seperti pujian bagi pendeta Nasrani yang menangis menerima kebenaran Al-Quran (ayat 83), hukum kaffarah (penebus) sumpah, pengharaman mutlak khamr (minuman keras) dan judi (ayat 90), mukjizat turunnya hidangan (Al-Ma\'idah) dari langit untuk pengikut Nabi Isa, serta persaksian agung Nabi Isa yang menolak dituhankan di hadapan Allah (ayat 116).'
            },
            {
                number: 6,
                name: 'Al-An\'am',
                nameArabic: 'الأنعام',
                meaning: 'Binatang Ternak',
                totalAyahs: 165,
                ayahRange: '1-110',
                type: 'Makkiyah',
                description: 'Surah Al-An\'am turun sekaligus di Makkah dengan fokus utama pada pemurnian Aqidah. Membantah kesyirikan kaum musyrik Makkah, menampilkan argumen rasional Nabi Ibrahim a.s. saat membuktikan keesaan Allah melalui pengamatan bintang, bulan, dan matahari (ayat 74-79), serta menyebutkan 18 nama Nabi secara berurutan (ayat 83-86) sebagai rantai pembawa risalah kebenaran tauhid.'
            },
        ],
        keywords: [
            'juz 7',
            'wa idza samiu',
            'larangan khamr dan judi',
            'ayat 90 al maidah',
            'kisah nabi ibrahim mencari tuhan',
            'hidangan dari langit',
            'al anam juz 7'
        ],
        faq: [
            {
                question: 'Juz 7 dimulai dan diakhiri di ayat berapa?',
                answer: 'Juz 7 dimulai dari Surah Al-Ma\'idah ayat 82 dan berakhir di Surah Al-An\'am ayat 110.'
            },
            {
                question: 'Di mana letak ayat pengharaman minuman keras (khamr) dan judi?',
                answer: 'Larangan mutlak mengenai khamr, judi, berkorban untuk berhala, dan mengundi nasib terdapat di Juz 7, tepatnya di Surah Al-Ma\'idah ayat 90.'
            },
            {
                question: 'Apa kisah utama yang ada di Surah Al-An\'am awal Juz 7?',
                answer: 'Kisah yang paling menonjol adalah pencarian kebenaran oleh Nabi Ibrahim a.s. yang menolak menjadikan benda-benda langit (bintang, bulan, matahari) yang bisa terbenam/hilang sebagai Tuhan.'
            },
        ],
    },
    8: {
        juzNumber: 8,
        intro: 'Juz 8 Al-Quran, yang diawali dengan kata "Walau Annana" (Dan seandainya Kami...), dimulai dari Surah Al-An\'am ayat 111 dan berakhir di Surah Al-A\'raf ayat 87. Juz ini menutup Surah Al-An\'am dengan wasiat-wasiat agung akidah Islam (termasuk doa yang sering dibaca saat iftitah shalat), lalu membuka Surah Al-A\'raf yang mengisahkan sejarah awal umat manusia, tipu daya Iblis kepada Nabi Adam, hingga kisah-kisah kaum terdahulu yang dibinasakan.',
        totalAyahs: 142,
        totalSurahs: 2,
        surahs: [
            {
                number: 6,
                name: 'Al-An\'am',
                nameArabic: 'الأنعام',
                meaning: 'Binatang Ternak',
                totalAyahs: 165,
                ayahRange: '111-165',
                type: 'Makkiyah',
                description: 'Penutup Al-An\'am ini menjelaskan keras kepalanya kaum musyrikin yang tidak akan beriman walau malaikat turun. Memuat 10 Wasiat Allah (ayat 151-153) yang ekuivalen dengan "Ten Commandments", dan diakhiri dengan ikrar penyerahan diri total: "Sesungguhnya shalatku, ibadahku, hidupku, dan matiku hanyalah untuk Allah..." (ayat 162).'
            },
            {
                number: 7,
                name: 'Al-A\'raf',
                nameArabic: 'الأعراف',
                meaning: 'Tempat Tertinggi',
                totalAyahs: 206,
                ayahRange: '1-87',
                type: 'Makkiyah',
                description: 'Al-A\'raf merujuk pada "tempat tertinggi" antara surga dan neraka, tempat orang yang amal baik dan buruknya seimbang. Bagian ini mengisahkan secara rinci jatuhnya Adam dan Hawa karena tipu daya Iblis (diiringi perintah menutup aurat), dilanjutkan dengan dialog penghuni surga dan neraka, serta kisah Nabi Nuh, Nabi Hud (Kaum \'Ad), Nabi Shalih (Kaum Tsamud), dan Nabi Luth.'
            },
        ],
        keywords: [
            'juz 8',
            'walau annana',
            'doa iftitah inna sholati',
            'kisah nabi adam dan iblis',
            'ashabul araf',
            'kisah kaum tsamud dan ad',
            '10 wasiat al anam'
        ],
        faq: [
            {
                question: 'Juz 8 berisi surah apa saja?',
                answer: 'Juz 8 berisi akhir Surah Al-An\'am (ayat 111-165) dan paruh pertama Surah Al-A\'raf (ayat 1-87).'
            },
            {
                question: 'Apa arti kata "Al-A\'raf"?',
                answer: 'Al-A\'raf berarti tempat yang tinggi (tembok pemisah) antara surga dan neraka. Di sana terdapat orang-orang yang timbangan amal kebaikan dan keburukannya persis sama, menunggu keputusan Allah.'
            },
            {
                question: 'Di mana letak ayat yang sering dijadikan doa Iftitah dalam shalat?',
                answer: 'Ayat "Inna shalati wa nusuki wa mahyaya wa mamati lillahi rabbil \'alamin" berada di akhir Juz 8, tepatnya Surah Al-An\'am ayat 162.'
            },
        ],
    },
    9: {
        juzNumber: 9,
        intro: 'Juz 9 Al-Quran, yang diawali dengan kalimat "Qalal Mala\'u" (Pemuka-pemuka kaum berkata...), dimulai dari Surah Al-A\'raf ayat 88 dan berakhir di Surah Al-Anfal ayat 40. Juz ini merupakan transisi besar, dimulai dari kelanjutan kisah para nabi terdahulu (terutama epik Nabi Musa a.s. dan Fir\'aun) di Makkah, menuju hukum-hukum tata negara, militer, dan rampasan perang (Surah Al-Anfal) yang diturunkan di Madinah.',
        totalAyahs: 159,
        totalSurahs: 2,
        surahs: [
            {
                number: 7,
                name: 'Al-A\'raf',
                nameArabic: 'الأعراف',
                meaning: 'Tempat Tertinggi',
                totalAyahs: 206,
                ayahRange: '88-206',
                type: 'Makkiyah',
                description: 'Lanjutan surah ini dibuka dengan kisah Nabi Syu\'aib. Fokus utamanya adalah kisah panjang Nabi Musa melawan Fir\'aun, mukjizat tongkat, taubatnya para penyihir, penyeberangan laut, dan penyembahan patung anak sapi (Samiri). Di sini juga terdapat ayat Perjanjian Alam Roh (ayat 172) dan ditutup dengan "Ayat Sajdah" pertama dalam Al-Quran (ayat 206) yang disunnahkan sujud tilawah saat membacanya.'
            },
            {
                number: 8,
                name: 'Al-Anfal',
                nameArabic: 'الأنفال',
                meaning: 'Rampasan Perang',
                totalAyahs: 75,
                ayahRange: '1-40',
                type: 'Madaniyah',
                description: 'Surah Al-Anfal turun pasca kemenangan besar Perang Badar. Menjelaskan kriteria mukmin sejati yang bergetar hatinya saat disebut nama Allah (ayat 2), hukum pembagian ghanimah (rampasan perang), intervensi ribuan malaikat yang membantu umat Islam di medan Badar, serta evaluasi agar umat tidak berselisih mengenai harta.'
            },
        ],
        keywords: [
            'juz 9',
            'qalal malau',
            'kisah musa dan firaun',
            'perjanjian alam roh',
            'ayat sajdah al araf',
            'perang badar',
            'harta rampasan perang',
            'ghanimah'
        ],
        faq: [
            {
                question: 'Juz 9 berakhir di ayat berapa?',
                answer: 'Juz 9 berakhir di Surah Al-Anfal ayat 40. Paruh kedua Al-Anfal akan dilanjutkan di Juz 10.'
            },
            {
                question: 'Apa peristiwa besar yang melatarbelakangi turunnya Surah Al-Anfal?',
                answer: 'Surah Al-Anfal turun berkaitan langsung dengan Perang Badar, yaitu perang besar pertama umat Islam, untuk mengatur hukum pembagian harta rampasan perang (Ghanimah) dan evaluasi strategi.'
            },
            {
                question: 'Di mana letak Ayat Sajdah pertama di Al-Quran?',
                answer: 'Ayat sajdah (ayat yang disunnahkan untuk sujud tilawah ketika dibaca/didengar) pertama berada di penutup Surah Al-A\'raf, yaitu ayat 206.'
            },
        ],
    },
    10: {
        juzNumber: 10,
        intro: 'Juz 10 Al-Quran, yang diawali dengan kata "Wa\'lamu" (Dan ketahuilah...), dimulai dari Surah Al-Anfal ayat 41 dan berakhir di Surah At-Taubah ayat 92. Juz ini mengakhiri evaluasi Perang Badar dengan aturan spesifik pembagian harta militer, lalu memasuki Surah At-Taubah yang sangat tegas mencabut perjanjian damai dengan kaum musyrikin Makkah serta membongkar habis-habisan karakter kaum Munafik saat Perang Tabuk.',
        totalAyahs: 127,
        totalSurahs: 2,
        surahs: [
            {
                number: 8,
                name: 'Al-Anfal',
                nameArabic: 'الأنفال',
                meaning: 'Rampasan Perang',
                totalAyahs: 75,
                ayahRange: '41-75',
                type: 'Madaniyah',
                description: 'Akhir Surah Al-Anfal menetapkan hukum Khumus (seperlima harta rampasan perang untuk Allah, Rasul, kerabat, yatim, miskin, musafir). Juga menegaskan pentingnya kekuatan militer untuk menggentarkan musuh (ayat 60), serta mengukuhkan ikatan persaudaraan (ukhuwah) abadi antara kaum Muhajirin dan Anshar.'
            },
            {
                number: 9,
                name: 'At-Taubah',
                nameArabic: 'التوبة',
                meaning: 'Pengampunan',
                totalAyahs: 129,
                ayahRange: '1-92',
                type: 'Madaniyah',
                description: 'Satu-satunya surah tanpa Bismillah karena turun dalam nuansa perang dan pelepasan diri (Bara\'ah) dari musyrikin. Membahas perintah meramaikan masjid, hukum jizyah (pajak perlindungan bagi non-muslim), dalil utama 8 golongan (Asnaf) penerima Zakat (ayat 60), serta keengganan kaum munafik mengikuti Perang Tabuk di musim panas.'
            },
        ],
        keywords: [
            'juz 10',
            'walamu',
            '8 asnaf zakat',
            'at taubah 60',
            'surah tanpa bismillah',
            'perang tabuk',
            'pembagian ghanimah',
            'hukum khumus'
        ],
        faq: [
            {
                question: 'Mengapa Surah At-Taubah di Juz 10 tidak diawali Bismillah?',
                answer: 'Karena surah ini diawali dengan pernyataan "Bara\'ah" (pemutusan hubungan/perjanjian) dan ancaman perang terhadap kaum musyrikin yang berkhianat. Bismillah mengandung makna kasih sayang yang tidak sesuai dengan konteks kemurkaan di awal surah ini.'
            },
            {
                question: 'Di mana letak ayat yang merinci 8 golongan penerima Zakat?',
                answer: 'Dalil utama pembagian zakat terdapat di Juz 10, tepatnya pada Surah At-Taubah ayat 60.'
            },
            {
                question: 'Juz 10 berakhir di ayat berapa?',
                answer: 'Juz 10 berakhir di Surah At-Taubah ayat 92, yang menceritakan kesedihan para sahabat miskin yang menangis karena tidak memiliki kendaraan untuk ikut berjihad.'
            },
        ],
    },
    11: {
        juzNumber: 11,
        intro: 'Juz 11 Al-Quran dimulai dari Surah At-Taubah ayat 93 dan berakhir di Surah Hud ayat 5. Juz ini sering disebut Juz "Ya\'tadzirun" (merujuk pada kata mencolok di awal juz ini). Transisi terjadi dari penutup At-Taubah yang Madaniyah (menyelesaikan sisa konflik Perang Tabuk) menuju Surah Yunus dan awal Surah Hud yang Makkiyah (berfokus pada tauhid, hari kiamat, dan kisah umat terdahulu yang dibinasakan).',
        totalAyahs: 151,
        totalSurahs: 3,
        surahs: [
            {
                number: 9,
                name: 'At-Taubah',
                nameArabic: 'التوبة',
                meaning: 'Pengampunan',
                totalAyahs: 129,
                ayahRange: '93-129',
                type: 'Madaniyah',
                description: 'Penutup At-Taubah ini memuat kisah pembongkaran "Masjid Dhirar" (masjid yang dibangun munafik untuk memecah belah umat) dan diterimanya taubat tiga sahabat teguh (termasuk Ka\'ab bin Malik) yang sempat diboikot karena absen dari Perang Tabuk. Ditutup dengan dua ayat agung yang memuji kelembutan Rasulullah (Laqad ja\'akum rasulun...).'
            },
            {
                number: 10,
                name: 'Yunus',
                nameArabic: 'يونس',
                meaning: 'Nabi Yunus',
                totalAyahs: 109,
                ayahRange: '1-109',
                type: 'Makkiyah',
                description: 'Surah Yunus membantah keraguan musyrikin terhadap Al-Quran dan kebangkitan. Mengisahkan secara singkat Nabi Nuh, kelanjutan Nabi Musa, serta fakta sejarah diabadikannya jasad Fir\'aun sebagai pelajaran (ayat 92). Dinamai Yunus karena kaumnya adalah satu-satunya umat yang taubat massalnya diterima Allah tepat sebelum azab turun (ayat 98).'
            },
            {
                number: 11,
                name: 'Hud',
                nameArabic: 'هود',
                meaning: 'Nabi Hud',
                totalAyahs: 123,
                ayahRange: '1-5',
                type: 'Makkiyah',
                description: 'Lima ayat pertama Surah Hud di Juz 11 ini berfungsi sebagai pengantar (prolog) yang menegaskan bahwa Al-Quran tersusun rapi dari sisi Allah, serta perintah utama untuk bertauhid dan ber-istighfar kepada-Nya.'
            },
        ],
        keywords: [
            'juz 11',
            'yatadzirun',
            'masjid dhirar',
            'kaab bin malik',
            'jasad firaun yunus 92',
            'surah yunus',
            'laqad jaakum rasulun min anfusikum'
        ],
        faq: [
            {
                question: 'Berapa total ayat dalam Juz 11?',
                answer: 'Total ayat di Juz 11 adalah 151 ayat (37 ayat At-Taubah + 109 ayat Yunus + 5 ayat Hud).'
            },
            {
                question: 'Apa peristiwa besar yang diungkap di akhir Surah At-Taubah (Juz 11)?',
                answer: 'Peristiwa Masjid Dhirar, yaitu masjid yang diperintahkan Allah untuk dihancurkan/dibakar karena dibangun oleh kaum munafik sebagai basis konspirasi melawan Rasulullah.'
            },
            {
                question: 'Di mana letak ayat yang menyebutkan jasad Fir\'aun diselamatkan?',
                answer: 'Janji Allah untuk menyelamatkan/mengawetkan jasad Fir\'aun agar menjadi pelajaran bagi generasi setelahnya terdapat di Juz 11, tepatnya Surah Yunus ayat 92.'
            },
        ],
    },
    12: {
        juzNumber: 12,
        intro: 'Juz 12 Al-Quran diawali dengan kata "Wa Ma Min Dabbah" (Dan tidak ada suatu binatang melata pun...), dimulai dari Surah Hud ayat 6 dan berakhir di Surah Yusuf ayat 52. Juz ini didominasi oleh kisah-kisah para Nabi yang sarat ujian berat, mulai dari kehancuran kaum-kaum terdahulu di Surah Hud, hingga paruh pertama epik perjalanan hidup Nabi Yusuf a.s. yang penuh rintangan pengkhianatan dan fitnah.',
        totalAyahs: 170,
        totalSurahs: 2,
        surahs: [
            {
                number: 11,
                name: 'Hud',
                nameArabic: 'هود',
                meaning: 'Nabi Hud',
                totalAyahs: 123,
                ayahRange: '6-123',
                type: 'Makkiyah',
                description: 'Surah ini menceritakan detail tragis tenggelamnya putra Nabi Nuh a.s. yang menolak beriman, serta azab mengerikan yang menimpa kaum \'Ad, Tsamud, kaum Luth, dan Madyan. Surah ini sangat berat bagi Rasulullah SAW (sampai beliau bersabda surah ini membuat rambutnya beruban) karena memuat perintah tegas untuk "Istiqamah" (Surah Hud ayat 112).'
            },
            {
                number: 12,
                name: 'Yusuf',
                nameArabic: 'يوسف',
                meaning: 'Nabi Yusuf',
                totalAyahs: 111,
                ayahRange: '1-52',
                type: 'Makkiyah',
                description: 'Surah ini bergelar "Ahsanul Qashash" (Sebaik-baik Kisah). Paruh pertama di juz ini menceritakan kedengkian saudara-saudara Yusuf yang membuangnya ke sumur, penjualannya sebagai budak di Mesir, keteguhannya menolak rayuan Zulaikha (istri Al-Aziz), hingga Yusuf yang lebih memilih penjara daripada berbuat maksiat.'
            },
        ],
        keywords: [
            'juz 12',
            'wa ma min dabbah',
            'kisah nabi yusuf',
            'rayuan zulaikha',
            'putra nabi nuh',
            'ayat istiqamah',
            'ahsanul qashash'
        ],
        faq: [
            {
                question: 'Juz 12 berisi surah apa saja?',
                answer: 'Juz 12 berisi lanjutan Surah Hud (ayat 6-123) dan paruh pertama Surah Yusuf (ayat 1-52).'
            },
            {
                question: 'Apa alasan Surah Hud disebut surah yang membuat Rasulullah beruban?',
                answer: 'Karena di dalam Surah Hud (khususnya ayat 112) terdapat perintah yang sangat berat pelaksanaannya, yaitu perintah untuk berlaku "Istiqamah" (teguh pendirian) di jalan yang benar tanpa melampaui batas sedikit pun.'
            },
        ],
    },
    13: {
        juzNumber: 13,
        intro: 'Juz 13 Al-Quran, yang dikenal dengan nama "Wa Ma Ubarri\'u" (Dan aku tidak membebaskan diriku...), dimulai dari Surah Yusuf ayat 53 dan berakhir di Surah Ibrahim ayat 52. Juz ini memuat akhir (happy ending) dari kisah pelik Nabi Yusuf, dilanjutkan dengan Surah Ar-Ra\'d yang memaparkan fenomena alam sebagai bukti tauhid, dan ditutup dengan Surah Ibrahim yang berisi doa-doa agung bapak para nabi.',
        totalAyahs: 154,
        totalSurahs: 3,
        surahs: [
            {
                number: 12,
                name: 'Yusuf',
                nameArabic: 'يوسف',
                meaning: 'Nabi Yusuf',
                totalAyahs: 111,
                ayahRange: '53-111',
                type: 'Makkiyah',
                description: 'Bagian akhir Surah Yusuf ini menceritakan pembebasannya dari penjara karena kemampuannya menakwilkan mimpi Raja, diangkatnya Yusuf menjadi bendahara negara Mesir, dan pertemuannya kembali dengan saudara-saudaranya di mana Yusuf memaafkan mereka total tanpa dendam ("La tatsriba \'alaikumul yaum").'
            },
            {
                number: 13,
                name: 'Ar-Ra\'d',
                nameArabic: 'الرعد',
                meaning: 'Guruh/Petir',
                totalAyahs: 43,
                ayahRange: '1-43',
                type: 'Madaniyah',
                description: 'Membahas kebesaran Allah (bahkan petir pun bertasbih memuji-Nya) dan ketetapan takdir. Surah ini memuat ayat motivasi yang sangat populer: "Sesungguhnya Allah tidak akan mengubah keadaan suatu kaum sebelum mereka mengubah keadaan diri mereka sendiri" (Ayat 11).'
            },
            {
                number: 14,
                name: 'Ibrahim',
                nameArabic: 'إبراهيم',
                meaning: 'Nabi Ibrahim',
                totalAyahs: 52,
                ayahRange: '1-52',
                type: 'Makkiyah',
                description: 'Berisi penegasan tauhid, perumpamaan "Kalimat Thayyibah" (kalimat tauhid) seperti pohon yang akarnya menancap kuat dan cabangnya menjulang ke langit (ayat 24-25), pidato penyesalan Iblis di neraka (ayat 22) yang mencampakkan pengikutnya, serta doa syahdu Nabi Ibrahim untuk keamanan Makkah.'
            },
        ],
        keywords: [
            'juz 13',
            'wa ma ubarriu',
            'akhir kisah nabi yusuf',
            'ar rad ayat 11',
            'pidato iblis di neraka',
            'pohon kalimat thayyibah',
            'doa nabi ibrahim'
        ],
        faq: [
            {
                question: 'Di mana letak ayat "Allah tidak akan mengubah nasib suatu kaum..."?',
                answer: 'Ayat yang sangat terkenal tersebut berada di Juz 13, tepatnya pada Surah Ar-Ra\'d ayat 11.'
            },
            {
                question: 'Apa isi pidato Iblis di akhirat yang disebutkan di Juz 13?',
                answer: 'Pada Surah Ibrahim ayat 22, diceritakan Iblis akan berpidato di neraka, menyatakan bahwa janji Allah benar dan janjinya palsu. Iblis menegaskan ia hanya "mengajak", tidak memaksa, dan manusia sendirilah yang menurutinya. Iblis pun berlepas diri dan menyalahkan manusia.'
            },
            {
                question: 'Bagaimana akhir dari kisah saudara-saudara Nabi Yusuf?',
                answer: 'Nabi Yusuf memaafkan saudara-saudaranya secara total atas pengkhianatan mereka di masa lalu, dan akhirnya seluruh keluarga (termasuk Nabi Ya\'qub) bersatu kembali di Mesir.'
            },
        ],
    },
    14: {
        juzNumber: 14,
        intro: 'Juz 14 Al-Quran, yang diawali dengan kata "Rubama" (Seringkali...), dimulai dari Surah Al-Hijr ayat 1 dan berakhir di Surah An-Nahl ayat 128. Juz ini berisi dua surah Makkiyah secara utuh. Fokus utamanya adalah bantahan terhadap kaum musyrik, jaminan Allah atas keaslian Al-Quran, serta penjabaran luar biasa mengenai nikmat-nikmat alam semesta yang diberikan kepada manusia.',
        totalAyahs: 227,
        totalSurahs: 2,
        surahs: [
            {
                number: 15,
                name: 'Al-Hijr',
                nameArabic: 'الحجر',
                meaning: 'Batu/Nama Kota',
                totalAyahs: 99,
                ayahRange: '1-99',
                type: 'Makkiyah',
                description: 'Surah ini memuat jaminan abadi dari Allah bahwa Dia sendiri yang menjaga kemurnian Al-Quran (ayat 9). Dinamakan Al-Hijr (kota kuno kaum Tsamud) karena mengisahkan kehancuran mereka yang memahat gunung menjadi rumah namun mendustakan rasul. Juga memuat kisah malaikat tamu Nabi Ibrahim yang diutus mengazab kaum Luth.'
            },
            {
                number: 16,
                name: 'An-Nahl',
                nameArabic: 'النحل',
                meaning: 'Lebah',
                totalAyahs: 128,
                ayahRange: '1-128',
                type: 'Makkiyah',
                description: 'Dikenal juga sebagai "Surah An-Ni\'am" (Surah Nikmat-nikmat) karena memaparkan karunia Allah dari ujung rambut hingga ujung kaki, serta alam semesta. Membahas wahyu (ilham) yang diberikan kepada Lebah sehingga menghasilkan madu penyembuh (ayat 68-69), serta ayat perintah berbuat adil dan ihsan (ayat 90) yang selalu dibaca penutup khutbah Jumat.'
            },
        ],
        keywords: [
            'juz 14',
            'rubama',
            'jaminan kemurnian al quran',
            'al hijr 9',
            'surah an niam',
            'ayat lebah dan madu',
            'ayat penutup khutbah jumat',
            'an nahl 90'
        ],
        faq: [
            {
                question: 'Juz 14 berisi surah apa saja?',
                answer: 'Juz 14 memuat dua surah secara penuh (tidak terpotong), yaitu seluruh Surah Al-Hijr dan seluruh Surah An-Nahl.'
            },
            {
                question: 'Di mana letak ayat tentang khasiat madu lebah sebagai obat?',
                answer: 'Terdapat di Juz 14, tepatnya pada Surah An-Nahl ayat 68-69.'
            },
            {
                question: 'Ayat apa di Juz 14 yang menjamin Al-Quran tidak akan bisa dipalsukan?',
                answer: 'Janji Allah untuk menjaga Al-Quran ("Inna nahnu nazzalnadz dzikra wa inna lahu lahafizhun") terdapat di Surah Al-Hijr ayat 9.'
            },
        ],
    },
    15: {
        juzNumber: 15,
        intro: 'Juz 15 Al-Quran, yang diawali dengan kalimat "Subhanalladzi" (Maha Suci Allah yang telah memperjalankan...), dimulai dari Surah Al-Isra ayat 1 dan berakhir di Surah Al-Kahfi ayat 74. Juz ini sangat spesial karena memuat mukjizat perjalanan malam Rasulullah (Isra\' Mi\'raj) dan berisi Surah Al-Kahfi yang menjadi benteng pelindung umat Islam dari fitnah Dajjal di akhir zaman.',
        totalAyahs: 185,
        totalSurahs: 2,
        surahs: [
            {
                number: 17,
                name: 'Al-Isra\'',
                nameArabic: 'الإسراء',
                meaning: 'Perjalanan Malam',
                totalAyahs: 111,
                ayahRange: '1-111',
                type: 'Makkiyah',
                description: 'Sering juga disebut Surah Bani Israil karena menubuatkan kerusakan yang dibuat Yahudi di Masjidil Aqsha. Diawali dengan kisah Isra\' ke Baitul Maqdis. Surah ini memuat pedoman moral komprehensif, khususnya perintah tertinggi berbakti kepada orang tua (Birrul Walidain) dengan larangan berkata "Ah/Cis" (ayat 23-24).'
            },
            {
                number: 18,
                name: 'Al-Kahfi',
                nameArabic: 'الكهف',
                meaning: 'Gua',
                totalAyahs: 110,
                ayahRange: '1-74',
                type: 'Makkiyah',
                description: 'Dianjurkan dibaca setiap hari Jumat sebagai pelindung dari Dajjal. Di Juz 15, surah ini mencakup 3 kisah ujian besar: Ujian Keimanan (7 pemuda tertidur 300 tahun di gua / Ashabul Kahfi), Ujian Harta (pemilik dua kebun anggur yang sombong), dan Ujian Ilmu (awal perjalanan Nabi Musa berguru pada Nabi Khidir).'
            },
        ],
        keywords: [
            'juz 15',
            'subhanallazi',
            'isra miraj',
            'surah bani israil',
            'birrul walidain',
            'al isra 23',
            'ashabul kahfi',
            'musa dan khidir'
        ],
        faq: [
            {
                question: 'Di mana letak larangan membentak orang tua dan larangan berkata "Ah"?',
                answer: 'Aturan berbakti kepada orang tua (Birrul Walidain) yang paling gamblang terdapat di Juz 15, yakni Surah Al-Isra ayat 23-24.'
            },
            {
                question: 'Apakah Surah Al-Kahfi ada secara utuh di Juz 15?',
                answer: 'Tidak. Juz 15 memuat sebagian besar Surah Al-Kahfi (ayat 1-74). Sisa ceritanya (seperti kelanjutan kisah Khidir dan kemunculan Zulkarnain & Ya\'juj Ma\'juj) dilanjutkan di Juz 16.'
            },
            {
                question: 'Apa saja kisah yang diceritakan di Surah Al-Kahfi Juz 15?',
                answer: 'Bagian ini memuat kisah Ashabul Kahfi (pemuda yang bersembunyi di gua), perumpamaan dua orang pemilik kebun, dan perjalanan Nabi Musa a.s. bersama Nabi Khidir a.s.'
            },
        ],
    },
    16: {
        juzNumber: 16,
        intro: 'Juz 16 Al-Quran, yang diawali dengan kalimat "Qala Alam" (Dia [Khidir] berkata: Bukankah...), dimulai dari Surah Al-Kahfi ayat 75 dan berakhir di Surah Taha ayat 135. Juz ini merangkum kisah-kisah menakjubkan yang melampaui nalar manusia; mulai dari benteng logam Dzulqarnain, kelahiran ajaib tanpa ayah (Nabi Isa a.s.), hingga mukjizat tongkat Nabi Musa a.s. membelah lautan.',
        totalAyahs: 269,
        totalSurahs: 3,
        surahs: [
            {
                number: 18,
                name: 'Al-Kahfi',
                nameArabic: 'الكهف',
                meaning: 'Gua',
                totalAyahs: 110,
                ayahRange: '75-110',
                type: 'Makkiyah',
                description: 'Melanjutkan perjalanan tak terduga Nabi Musa bersama Khidir (melubangi perahu, membunuh anak, menegakkan tembok). Disusul kisah kepemimpinan adil Raja Dzulqarnain yang mengurung bangsa perusak Ya\'juj dan Ma\'juj di balik tembok tembaga. Ditutup dengan hakikat keluasan ilmu Allah yang tak habis ditulis walau seluruh lautan menjadi tintanya.'
            },
            {
                number: 19,
                name: 'Maryam',
                nameArabic: 'مريم',
                meaning: 'Maryam',
                totalAyahs: 98,
                ayahRange: '1-98',
                type: 'Makkiyah',
                description: 'Satu-satunya surah yang memakai nama perempuan. Menceritakan keajaiban kelahiran Nabi Yahya (dari ayah yang sangat renta dan ibu mandul) serta kelahiran Nabi Isa (dari perawan suci Maryam). Surah ini sangat syahdu, penuh dengan kata "Ar-Rahman", memuat debat lembut Ibrahim dengan ayahnya, serta ayat sajdah (ayat 58).'
            },
            {
                number: 20,
                name: 'Taha',
                nameArabic: 'طه',
                meaning: 'Taha',
                totalAyahs: 135,
                ayahRange: '1-135',
                type: 'Makkiyah',
                description: 'Surah yang bacaan awalnya (ayat 1-14) meluluhkan hati Umar bin Khattab hingga memeluk Islam. Mengisahkan secara runut biografi Nabi Musa: dihanyutkan ke sungai Nil, pelarian ke Madyan, dialog langsung dengan Allah di Bukit Thur, kemenangan melawan penyihir Fir\'aun, hingga tragedi penyembahan patung sapi (Samiri).'
            },
        ],
        keywords: [
            'juz 16',
            'qala alam aqul laka',
            'yajuj majuj',
            'dzulqarnain',
            'kelahiran nabi isa',
            'surah taha umar bin khattab',
            'kisah musa dan firaun'
        ],
        faq: [
            {
                question: 'Berapa total ayat di Juz 16?',
                answer: 'Total ada 269 ayat (36 ayat akhir Al-Kahfi + 98 ayat Maryam + 135 ayat Taha).'
            },
            {
                question: 'Di mana letak kisah Ya\'juj dan Ma\'juj?',
                answer: 'Kisah pengurungan bangsa perusak Ya\'juj dan Ma\'juj oleh Raja Dzulqarnain berada di paruh akhir Surah Al-Kahfi (Juz 16).'
            },
            {
                question: 'Surah apa yang membuat Umar bin Khattab masuk Islam?',
                answer: 'Awal Surah Taha yang terdapat di Juz 16. Ayat-ayat tersebut menegaskan bahwa Al-Quran diturunkan bukan untuk menyusahkan manusia.'
            },
        ],
    },
    17: {
        juzNumber: 17,
        intro: 'Juz 17 Al-Quran, yang diawali dengan peringatan keras "Iqtaraba Lin Nas" (Telah dekat kepada manusia hari menghisab...), dimulai dari Surah Al-Anbiya ayat 1 dan berakhir di Surah Al-Hajj ayat 78. Juz ini berisi teguran tentang dekatnya Hari Kiamat yang digambarkan dengan gempa dahsyat, serangkaian ujian berat yang dihadapi para Nabi, serta penetapan syariat ibadah Haji sebagai simbol tauhid lintas generasi.',
        totalAyahs: 190,
        totalSurahs: 2,
        surahs: [
            {
                number: 21,
                name: 'Al-Anbiya',
                nameArabic: 'الأنبياء',
                meaning: 'Para Nabi',
                totalAyahs: 112,
                ayahRange: '1-112',
                type: 'Makkiyah',
                description: 'Merangkum fragmen kehidupan 16 Nabi yang memberi pesan kuat tentang kepasrahan. Memuat keberanian Ibrahim menghancurkan berhala dan diselamatkan dari api, kesabaran Ayyub menghadapi penyakit, serta doa monumental Nabi Yunus (Doa Dzun Nun) dari dalam perut paus (ayat 87).'
            },
            {
                number: 22,
                name: 'Al-Hajj',
                nameArabic: 'الحج',
                meaning: 'Haji',
                totalAyahs: 78,
                ayahRange: '1-78',
                type: 'Madaniyah',
                description: 'Dibuka dengan kengerian gempa Hari Kiamat. Membahas perintah kepada Nabi Ibrahim untuk menyeru umat manusia beribadah haji (ayat 27), hukum hewan qurban, dan izin pertama kalinya umat Islam diperbolehkan angkat senjata (berperang) murni untuk membela diri dari penindasan (ayat 39).'
            },
        ],
        keywords: [
            'juz 17',
            'iqtaraba linnasi',
            'doa nabi yunus',
            'la ilaha illa anta subhanaka',
            'ibrahim dibakar',
            'ayat perintah haji',
            'izin perang pertama',
            'surah 2 sajdah'
        ],
        faq: [
            {
                question: 'Di mana letak doa Nabi Yunus di dalam perut ikan?',
                answer: 'Doa "La ilaha illa anta, subhanaka inni kuntu minaz zalimin" terletak di Juz 17, yaitu Surah Al-Anbiya ayat 87.'
            },
            {
                question: 'Apa keistimewaan Surah Al-Hajj di Juz 17?',
                answer: 'Surah Al-Hajj adalah satu-satunya surah dalam Al-Quran yang di dalamnya terdapat dua Ayat Sajdah (ayat 18 dan 77 dalam mayoritas mazhab).'
            },
            {
                question: 'Di mana ayat pertama yang mengizinkan umat Islam berperang?',
                answer: 'Izin pertama kali untuk membela diri secara fisik dari kaum musyrikin turun di Juz 17, tepatnya Surah Al-Hajj ayat 39.'
            },
        ],
    },
    18: {
        juzNumber: 18,
        intro: 'Juz 18 Al-Quran, yang diawali dengan kalimat "Qad Aflaha" (Sungguh beruntung...), dimulai dari Surah Al-Mu\'minun ayat 1 dan berakhir di Surah Al-Furqan ayat 20. Juz ini menampilkan transisi luar biasa; diawali dengan penjabaran spiritual tentang karakter mukmin sejati di Surah Al-Mu\'minun, lalu dilanjutkan dengan ketegasan hukum pidana sosial dan etika pergaulan dalam Surah An-Nur.',
        totalAyahs: 202,
        totalSurahs: 3,
        surahs: [
            {
                number: 23,
                name: 'Al-Mu\'minun',
                nameArabic: 'المؤمنون',
                meaning: 'Orang-orang Beriman',
                totalAyahs: 118,
                ayahRange: '1-118',
                type: 'Makkiyah',
                description: 'Surah ini dibuka dengan 7 sifat orang beriman yang dijamin masuk Surga Firdaus (khusyuk shalat, menjauhi hal sia-sia, menunaikan zakat, menjaga kemaluan, dsb). Memuat penjelasan ilmiah tentang tahapan perkembangan janin manusia (Nuthfah, \'Alaqah, Mudhghah) pada ayat 12-14, serta kelanjutan kisah-kisah kaum terdahulu.'
            },
            {
                number: 24,
                name: 'An-Nur',
                nameArabic: 'النور',
                meaning: 'Cahaya',
                totalAyahs: 64,
                ayahRange: '1-64',
                type: 'Madaniyah',
                description: 'Sangat padat dengan hukum kemasyarakatan. Memuat hukuman cambuk bagi pezina dan penuduh zina (Qadzaf), bantahan Allah atas fitnah keji terhadap Aisyah r.a. (Peristiwa Ifk), perintah menundukkan pandangan (Ghadhul Basar), kewajiban menutup aurat/hijab bagi wanita (ayat 31), dan perumpamaan indah tentang Cahaya Allah (Ayat 35).'
            },
            {
                number: 25,
                name: 'Al-Furqan',
                nameArabic: 'الفرقان',
                meaning: 'Pembeda',
                totalAyahs: 77,
                ayahRange: '1-20',
                type: 'Makkiyah',
                description: 'Dua puluh ayat pertama Surah Al-Furqan di juz ini membahas tentang keagungan Al-Quran sebagai pembeda (hak dan batil). Menyoroti juga ejekan dan penolakan kaum musyrik yang menuntut agar Rasulullah didampingi malaikat atau memiliki harta karun.'
            },
        ],
        keywords: [
            'juz 18',
            'qad aflaha',
            'sifat orang beriman',
            'tahapan janin dalam al quran',
            'ayat hijab',
            'an nur 31',
            'haditsul ifk',
            'cahaya di atas cahaya'
        ],
        faq: [
            {
                question: 'Di mana letak ayat yang mewajibkan wanita menutup aurat/hijab?',
                answer: 'Aturan rinci mengenai batasan aurat wanita dan perintah menjulurkan kerudung hingga menutupi dada terdapat di Juz 18, tepatnya Surah An-Nur ayat 31.'
            },
            {
                question: 'Apa itu peristiwa Haditsul Ifk di Surah An-Nur?',
                answer: 'Itu adalah peristiwa fitnah keji dari kaum munafik yang menuduh istri Rasulullah, Aisyah r.a., berselingkuh. Allah menurunkan belasan ayat di Surah An-Nur untuk membersihkan nama Aisyah secara abadi.'
            },
            {
                question: 'Sebutkan proses penciptaan manusia di Surah Al-Mu\'minun!',
                answer: 'Di ayat 12-14, Allah merinci tahapannya: Saripati tanah -> Nuthfah (sperma) -> \'Alaqah (segumpal darah) -> Mudhghah (segumpal daging) -> \'Izham (tulang belulang) -> dibungkus daging -> ditiupkan ruh.'
            },
        ],
    },
    19: {
        juzNumber: 19,
        intro: 'Juz 19 Al-Quran, yang diawali dengan kalimat "Wa Qalalladzina" (Dan berkatalah orang-orang yang...), dimulai dari Surah Al-Furqan ayat 21 dan berakhir di Surah An-Naml ayat 55. Juz ini dominan memuat narasi hiburan bagi Rasulullah SAW melalui pengulangan pola sejarah para rasul yang selalu didustakan kaumnya, ditutup dengan pesona kebesaran kerajaan Nabi Sulaiman.',
        totalAyahs: 339,
        totalSurahs: 3,
        surahs: [
            {
                number: 25,
                name: 'Al-Furqan',
                nameArabic: 'الفرقان',
                meaning: 'Pembeda',
                totalAyahs: 77,
                ayahRange: '21-77',
                type: 'Makkiyah',
                description: 'Lanjutan surah ini menjelaskan penyesalan mendalam orang zalim di akhirat yang menggigit jarinya karena salah memilih teman. Bagian akhir (ayat 63-77) sangat istimewa karena merinci karakteristik "Ibadurrahman" (Hamba-hamba Tuhan Yang Maha Pengasih), yaitu mereka yang rendah hati, rajin tahajud, tidak berzina, dan tidak membunuh.'
            },
            {
                number: 26,
                name: 'Asy-Syu\'ara',
                nameArabic: 'الشعراء',
                meaning: 'Para Penyair',
                totalAyahs: 227,
                ayahRange: '1-227',
                type: 'Makkiyah',
                description: 'Surah panjang dengan ritme ayat yang pendek-pendek. Menceritakan dialog Musa dan Fir\'aun, Ibrahim dengan kaumnya, serta Nabi Nuh, Hud, Luth, dan Syu\'aib. Setiap kisah ditutup dengan refrain yang sama: "Sesungguhnya pada yang demikian itu terdapat tanda (kekuasaan Allah)...". Surah ini juga membantah tuduhan bahwa Al-Quran adalah syair/mantra buatan manusia.'
            },
            {
                number: 27,
                name: 'An-Naml',
                nameArabic: 'النمل',
                meaning: 'Semut',
                totalAyahs: 93,
                ayahRange: '1-55',
                type: 'Makkiyah',
                description: 'Paruh awal surah ini mengisahkan mukjizat Nabi Musa (tongkat dan tangan bercahaya). Kisah utamanya berpusat pada Nabi Sulaiman yang mewarisi kerajaan Daud, kemampuannya memahami bahasa semut (ayat 18), inspeksi pasukan burung (Hud-hud), hingga pengiriman surat dakwah ke Ratu Saba (Bilqis).'
            },
        ],
        keywords: [
            'juz 19',
            'wa qalalladzina',
            'ibadurrahman',
            'al furqan 63',
            'kisah nabi sulaiman',
            'ratu bilqis saba',
            'bismillah dua kali',
            'burung hud hud'
        ],
        faq: [
            {
                question: 'Di mana terdapat ayat "Bismillah" yang berada di tengah-tengah surah?',
                answer: 'Kalimat "Bismillahirrahmanirrahim" muncul sebagai isi surat Nabi Sulaiman kepada Ratu Bilqis. Ini terdapat di Juz 19, tepatnya Surah An-Naml ayat 30.'
            },
            {
                question: 'Siapa itu "Ibadurrahman" dan di mana sifat mereka dijelaskan?',
                answer: 'Ibadurrahman adalah gelar kehormatan untuk hamba-hamba Allah yang paling disayangi-Nya. Sifat-sifat mereka dirinci di akhir Surah Al-Furqan (mulai ayat 63 sampai 77).'
            },
            {
                question: 'Mengapa Surah ke-26 dinamakan Asy-Syu\'ara (Para Penyair)?',
                answer: 'Untuk membedakan secara tegas antara mukjizat firman Allah (Al-Quran) dengan perkataan para penyair musyrik masa itu yang sering kali hanya mengikuti hawa nafsu dan tidak membuktikan ucapan mereka dengan tindakan (dijelaskan di akhir surah).'
            },
        ],
    },
    20: {
        juzNumber: 20,
        intro: 'Juz 20 Al-Quran, yang diawali dengan kalimat "Amman Khalaqa" (Atau siapakah yang telah menciptakan...), dimulai dari Surah An-Naml ayat 56 dan berakhir di Surah Al-Ankabut ayat 44. Juz ini memuat akhir kisah kaum Luth di An-Naml, dilanjutkan dengan biografi terlengkap Nabi Musa a.s. dalam Surah Al-Qasas, dan ditutup dengan pembukaan Surah Al-Ankabut yang membahas kepastian datangnya ujian bagi orang beriman.',
        totalAyahs: 170,
        totalSurahs: 3,
        surahs: [
            {
                number: 27,
                name: 'An-Naml',
                nameArabic: 'النمل',
                meaning: 'Semut',
                totalAyahs: 93,
                ayahRange: '56-93',
                type: 'Makkiyah',
                description: 'Penutup Surah An-Naml ini menegaskan keesaan Allah dengan rentetan pertanyaan retoris (Amman / Siapakah yang...). Memuat janji Allah bahwa Dia-lah satu-satunya yang mengabulkan doa orang yang dalam kesulitan/terdesak (ayat 62), serta gambaran ditiupnya sangkakala pada Hari Kiamat.'
            },
            {
                number: 28,
                name: 'Al-Qasas',
                nameArabic: 'القصص',
                meaning: 'Kisah-kisah',
                totalAyahs: 88,
                ayahRange: '1-88',
                type: 'Makkiyah',
                description: 'Menyajikan secara dramatis kelahiran Musa, keberanian ibunya menghanyutkannya ke sungai, Musa dibesarkan di istana Fir\'aun, takdir yang membawanya ke Madyan, hingga turunnya wahyu di Bukit Thur. Surah ini juga memuat teguran keras lewat kisah Qarun yang ditelan bumi karena sombong atas kekayaannya, dan penegasan bahwa Hidayah murni hak Allah (ayat 56).'
            },
            {
                number: 29,
                name: 'Al-Ankabut',
                nameArabic: 'العنكبوت',
                meaning: 'Laba-laba',
                totalAyahs: 69,
                ayahRange: '1-44',
                type: 'Makkiyah',
                description: 'Paruh awal surah ini menegaskan bahwa keimanan pasti diuji (ayat 2-3). Mengisahkan para nabi terdahulu (Nuh, Ibrahim, Luth, Syu\'aib) dan memuat perumpamaan ikonik: orang musyrik yang bergantung pada selain Allah ibarat berlindung di sarang laba-laba, rumah yang paling rapuh (ayat 41).'
            },
        ],
        keywords: [
            'juz 20',
            'amman khalaqa',
            'kisah nabi musa',
            'kisah qarun',
            'al qasas 56 hidayah',
            'sarang laba laba',
            'amman yujibul mudhtarra',
            'doa saat terdesak'
        ],
        faq: [
            {
                question: 'Di mana letak kisah Qarun yang ditenggelamkan beserta hartanya?',
                answer: 'Kisah kesombongan Qarun dan kehancurannya diceritakan di Juz 20, tepatnya pada paruh akhir Surah Al-Qasas (mulai ayat 76).'
            },
            {
                question: 'Ayat apa di Juz 20 yang menegaskan bahwa Nabi tidak bisa memberi hidayah?',
                answer: 'Surah Al-Qasas ayat 56 (Innaka la tahdi man ahbabta...). Ayat ini turun saat paman Rasulullah, Abu Thalib, wafat tanpa mengucapkan syahadat meski sangat dicintai beliau.'
            },
        ],
    },
    21: {
        juzNumber: 21,
        intro: 'Juz 21 Al-Quran, yang diawali dengan kalimat "Utlu Ma Uhiya" (Bacalah apa yang telah diwahyukan...), dimulai dari Surah Al-Ankabut ayat 45 dan berakhir di Surah Al-Ahzab ayat 30. Juz ini sangat kaya akan hikmah sosial dan keluarga. Dimulai dengan khasiat shalat mencegah perbuatan keji, nubuat sejarah kemenangan Romawi, nasihat parenting abadi dari Luqman, keutamaan sujud malam hari, hingga etika keluarga Nabi di tengah Perang Ahzab.',
        totalAyahs: 179,
        totalSurahs: 5,
        surahs: [
            {
                number: 29,
                name: 'Al-Ankabut',
                nameArabic: 'العنكبوت',
                meaning: 'Laba-laba',
                totalAyahs: 69,
                ayahRange: '45-69',
                type: 'Makkiyah',
                description: 'Bagian akhir ini dibuka dengan ayat masyhur bahwa shalat yang benar dapat mencegah perbuatan keji dan mungkar (ayat 45). Juga memuat adab berdebat dengan Ahli Kitab, yakni harus dengan cara yang paling baik (ayat 46).'
            },
            {
                number: 30,
                name: 'Ar-Rum',
                nameArabic: 'الروم',
                meaning: 'Bangsa Romawi',
                totalAyahs: 60,
                ayahRange: '1-60',
                type: 'Makkiyah',
                description: 'Surah ini diawali dengan mukjizat ramalan Al-Quran bahwa Romawi yang baru saja hancur oleh Persia akan bangkit menang dalam beberapa tahun. Memuat ayat fondasi pernikahan Islam "Sakinah, Mawaddah, wa Rahmah" (ayat 21), serta peringatan bahwa kerusakan di darat dan laut adalah ulah tangan manusia (ayat 41).'
            },
            {
                number: 31,
                name: 'Luqman',
                nameArabic: 'لقمان',
                meaning: 'Luqman',
                totalAyahs: 34,
                ayahRange: '1-34',
                type: 'Makkiyah',
                description: 'Memuat kurikulum pendidikan anak/parenting terbaik dalam Islam. Nasihat Luqman (seorang hamba saleh yang diabadikan namanya) kepada anaknya mencakup: Larangan syirik, kewajiban berbakti kepada orang tua, kepastian balasan amal (sekecil biji sawi), mendirikan shalat, larangan sombong, dan perintah melunakkan suara.'
            },
            {
                number: 32,
                name: 'As-Sajdah',
                nameArabic: 'السجدة',
                meaning: 'Sujud',
                totalAyahs: 30,
                ayahRange: '1-30',
                type: 'Makkiyah',
                description: 'Surah yang disunnahkan oleh Rasulullah untuk dibaca pada rakaat pertama Shalat Subuh hari Jumat. Membahas penciptaan semesta dalam 6 masa, proses biologis penciptaan manusia, penyesalan orang berdosa di akhirat, dan memuat Ayat Sajdah pada ayat 15.'
            },
            {
                number: 33,
                name: 'Al-Ahzab',
                nameArabic: 'الأحزاب',
                meaning: 'Golongan-golongan Bersekutu',
                totalAyahs: 73,
                ayahRange: '1-30',
                type: 'Madaniyah',
                description: 'Di juz 21, surah ini mencakup pembatalan tradisi "Zhihar" dan anak angkat zaman Jahiliyah. Mengisahkan kengerian pengepungan Madinah dalam Perang Khandaq (Ahzab), menyebut sosok Zaid bin Haritsah (satu-satunya sahabat yang namanya eksplisit di Al-Quran), serta pedoman khusus bagi istri-istri Nabi (Ummahatul Mukminin).'
            },
        ],
        keywords: [
            'juz 21',
            'utlu ma uhiya',
            'inna shalata tanha',
            'ar rum 21 sakinah mawaddah',
            'nasihat luqman',
            'kerusakan alam ulah manusia',
            'zaid bin haritsah',
            'perang khandaq ahzab'
        ],
        faq: [
            {
                question: 'Di mana letak ayat tentang pernikahan agar mencapai "Sakinah, Mawaddah, wa Rahmah"?',
                answer: 'Terdapat di Juz 21, yaitu pada Surah Ar-Rum ayat 21.'
            },
            {
                question: 'Juz 21 ini dimulai dari Surah apa dan ayat berapa?',
                answer: 'Juz 21 (Juz Utlu Ma Uhiya) secara resmi dimulai dari Surah Al-Ankabut ayat 45.'
            },
            {
                question: 'Di mana ayat larangan menyekutukan Allah (syirik) yang dinasihatkan kepada seorang anak?',
                answer: 'Itu adalah inti dari pendidikan keluarga yang terdapat dalam Surah Luqman ayat 13 di Juz 21.'
            },
        ],
    },
    22: {
        juzNumber: 22,
        intro: 'Juz 22 Al-Quran, yang diawali dengan kalimat "Wa Man Yaqnut" (Dan barangsiapa yang taat...), dimulai dari Surah Al-Ahzab ayat 31 dan berakhir di Surah Yasin ayat 27. Juz ini kaya akan etika sosial dan ketauhidan, mencakup pedoman khusus bagi istri-istri Nabi, ayat perintah bershalawat, kisah kehancuran peradaban Saba yang kufur nikmat, dan awal dari "Jantung Al-Quran" yaitu Surah Yasin.',
        totalAyahs: 169,
        totalSurahs: 4,
        surahs: [
            {
                number: 33,
                name: 'Al-Ahzab',
                nameArabic: 'الأحزاب',
                meaning: 'Golongan-golongan Bersekutu',
                totalAyahs: 73,
                ayahRange: '31-73',
                type: 'Madaniyah',
                description: 'Lanjutan Surah Al-Ahzab ini sangat krusial karena menegaskan status Nabi Muhammad SAW sebagai "Khatamun Nabiyyin" (Penutup Para Nabi) di ayat 40. Memuat aturan hijab bagi wanita muslimah (ayat 59), adab bertamu ke rumah Nabi, dan perintah agung dari Allah beserta malaikat-Nya untuk bershalawat kepada Nabi (ayat 56).'
            },
            {
                number: 34,
                name: 'Saba',
                nameArabic: 'سبأ',
                meaning: 'Kaum Saba',
                totalAyahs: 54,
                ayahRange: '1-54',
                type: 'Makkiyah',
                description: 'Menceritakan mukjizat Nabi Daud (bisa melunakkan besi) dan Nabi Sulaiman (mengendalikan angin dan jin). Kontras dengan itu, diceritakan kaum Saba di Yaman yang diberi kemakmuran luar biasa namun kufur, sehingga Allah menghancurkan bendungan raksasa mereka (Banjir \'Arim) dan mengubah kebun mereka menjadi hutan yang pahit buahnya.'
            },
            {
                number: 35,
                name: 'Fathir',
                nameArabic: 'فاطر',
                meaning: 'Pencipta',
                totalAyahs: 45,
                ayahRange: '1-45',
                type: 'Makkiyah',
                description: 'Juga dikenal sebagai Surah Al-Mala\'ikah (Malaikat) karena ayat pertamanya menyebut malaikat memiliki sayap (dua, tiga, atau empat). Surah ini menegaskan perniagaan yang tidak akan rugi (membaca Al-Quran, shalat, infak), serta membagi umat Islam menjadi 3 golongan (yang menzalimi diri sendiri, pertengahan, dan yang berlomba dalam kebaikan).'
            },
            {
                number: 36,
                name: 'Yasin',
                nameArabic: 'يس',
                meaning: 'Yasin',
                totalAyahs: 83,
                ayahRange: '1-27',
                type: 'Makkiyah',
                description: 'Bagian awal dari "Jantung Al-Quran". Di Juz 22 ini, Yasin membahas penegasan kerasulan Muhammad SAW di atas jalan yang lurus. Mengisahkan "Ashabul Qaryah" (penduduk kota yang mendustakan tiga utusan Allah sekaligus), serta kisah heroik seorang pria pembela rasul yang akhirnya dibunuh dan langsung disambut surga.'
            },
        ],
        keywords: [
            'juz 22',
            'wa man yaqnut',
            'ayat shalawat nabi',
            'al ahzab 56',
            'khatamun nabiyyin',
            'kisah bendungan maarib saba',
            'jantung al quran',
            'surah yasin awal'
        ],
        faq: [
            {
                question: 'Di mana letak ayat perintah membaca Shalawat kepada Nabi Muhammad SAW?',
                answer: 'Ayat yang sangat masyhur, "Innallaha wa mala\'ikatahu yusalluna \'alan-nabi...", terdapat di Juz 22, tepatnya Surah Al-Ahzab ayat 56.'
            },
            {
                question: 'Apakah Surah Yasin secara penuh ada di Juz 22?',
                answer: 'Tidak. Juz 22 hanya memuat awal Surah Yasin (ayat 1 sampai 27). Sisanya dilanjutkan di Juz 23.'
            },
        ],
    },
    23: {
        juzNumber: 23,
        intro: 'Juz 23 Al-Quran, yang diawali dengan kalimat "Wa Ma Anzalna" (Dan Kami tidak menurunkan...), dimulai dari Surah Yasin ayat 28 dan berakhir di Surah Az-Zumar ayat 31. Juz ini seluruhnya berisi surah-surah Makkiyah yang sangat kuat menekankan tentang bukti kebangkitan (kiamat), kekuasaan Allah di alam semesta, dan fragmen ujian kesabaran para Nabi terdahulu (terutama pengorbanan dramatis Nabi Ibrahim dan Ismail).',
        totalAyahs: 357,
        totalSurahs: 4,
        surahs: [
            {
                number: 36,
                name: 'Yasin',
                nameArabic: 'يس',
                meaning: 'Yasin',
                totalAyahs: 83,
                ayahRange: '28-83',
                type: 'Makkiyah',
                description: 'Lanjutan Surah Yasin ini memaparkan bukti-bukti kebangkitan melalui tanda alam (bumi mati yang dihidupkan, peredaran presisi matahari dan bulan pada garis edarnya). Ditutup dengan ayat masyhur "Kun Fayakun" (ayat 82) yang menunjukkan betapa mudahnya bagi Allah menciptakan sesuatu.'
            },
            {
                number: 37,
                name: 'Ash-Shaffat',
                nameArabic: 'الصافات',
                meaning: 'Barisan-barisan',
                totalAyahs: 182,
                ayahRange: '1-182',
                type: 'Makkiyah',
                description: 'Membahas barisan para malaikat yang bertasbih. Inti surah ini adalah kisah-kisah para nabi, yang paling epik adalah kisah mimpi Nabi Ibrahim a.s. untuk menyembelih putra kesayangannya (Ismail a.s.), yang karena ketaatan mereka berdua, kemudian diganti Allah dengan sembelihan besar (ayat 102-107).'
            },
            {
                number: 38,
                name: 'Shad',
                nameArabic: 'ص',
                meaning: 'Shad',
                totalAyahs: 88,
                ayahRange: '1-88',
                type: 'Makkiyah',
                description: 'Fokus pada ujian berat para pemimpin dan nabi. Memuat kisah Nabi Daud a.s. yang diuji melalui sengketa dua orang, ujian hilangnya kerajaan Nabi Sulaiman dan kembalinya kekuatan itu, ketabahan luar biasa Nabi Ayyub a.s. menghadapi penyakit (disembuhkan lewat mata air), serta keangkuhan Iblis yang menolak sujud pada Adam.'
            },
            {
                number: 39,
                name: 'Az-Zumar',
                nameArabic: 'الزمر',
                meaning: 'Rombongan-rombongan',
                totalAyahs: 75,
                ayahRange: '1-31',
                type: 'Makkiyah',
                description: 'Paruh awal Surah Az-Zumar ini menekankan pentingnya keikhlasan murni dalam beragama. Memuat perumpamaan cerdas tentang tauhid (membandingkan budak yang memiliki banyak majikan yang saling berselisih, dengan budak yang hanya memiliki satu majikan rukun), dan menegaskan bahwa semua manusia akan mati dan saling berbantah di akhirat.'
            },
        ],
        keywords: [
            'juz 23',
            'wa ma anzalna',
            'kun fayakun',
            'yasin 82',
            'kisah penyembelihan ismail',
            'ash shaffat 102',
            'kisah nabi ayyub',
            'surah az zumar awal'
        ],
        faq: [
            {
                question: 'Juz 23 sering disebut Juz apa?',
                answer: 'Juz 23 disebut Juz "Wa Ma Anzalna", yang diambil dari lafaz pertama pada Surah Yasin ayat 28 (pembuka juz ini).'
            },
            {
                question: 'Di mana letak ayat "Kun Fayakun"?',
                answer: 'Kalimat ketetapan Allah yang berbunyi "Innama amruhu idza arada syai\'an an yaqula lahu kun fa yakun" terletak di Juz 23, yaitu penutup Surah Yasin ayat 82.'
            },
            {
                question: 'Surah apa yang menceritakan peristiwa Nabi Ibrahim menyembelih putranya?',
                answer: 'Peristiwa yang menjadi cikal bakal Idul Adha tersebut diceritakan secara rinci dalam Surah Ash-Shaffat ayat 102-107 yang berada di Juz 23.'
            },
        ],
    },
    24: {
        juzNumber: 24,
        intro: 'Juz 24 Al-Quran, yang diawali dengan kalimat "Faman Azhlamu" (Maka siapakah yang lebih zalim...), dimulai dari Surah Az-Zumar ayat 32 dan berakhir di Surah Fussilat ayat 46. Juz ini memuat ayat paling membesarkan hati tentang ampunan Allah tanpa batas, kisah heroik seorang pria mukmin rahasia di istana Fir\'aun, serta peringatan mengerikan tentang anggota tubuh yang akan bersaksi di Hari Kiamat.',
        totalAyahs: 175,
        totalSurahs: 3,
        surahs: [
            {
                number: 39,
                name: 'Az-Zumar',
                nameArabic: 'الزمر',
                meaning: 'Rombongan-rombongan',
                totalAyahs: 75,
                ayahRange: '32-75',
                type: 'Makkiyah',
                description: 'Penutup surah ini sangat epik karena menggambarkan rombongan ahli neraka yang digiring dengan kasar, dan rombongan ahli surga yang disambut salam oleh malaikat. Di sini juga terdapat "Ayat Harapan" (Ayat 53) di mana Allah menyeru hamba-Nya yang melampaui batas agar tidak pernah berputus asa dari rahmat-Nya, karena Allah mengampuni semua dosa.'
            },
            {
                number: 40,
                name: 'Ghafir',
                nameArabic: 'غافر',
                meaning: 'Maha Pengampun',
                totalAyahs: 85,
                ayahRange: '1-85',
                type: 'Makkiyah',
                description: 'Sering disebut Surah Al-Mu\'min. Memfokuskan pada kisah seorang pria beriman dari keluarga Fir\'aun yang menyembunyikan keimanannya namun berani membela Nabi Musa di depan umum. Surah ini juga mengungkap bahwa Malaikat Pemikul \'Arsy senantiasa memohonkan ampunan bagi orang-orang yang bertaubat.'
            },
            {
                number: 41,
                name: 'Fussilat',
                nameArabic: 'فصلت',
                meaning: 'Yang Dijelaskan',
                totalAyahs: 54,
                ayahRange: '1-46',
                type: 'Makkiyah',
                description: 'Menggambarkan proses penciptaan langit dan bumi. Menjelaskan hari ketika musuh-musuh Allah dikumpulkan, di mana kulit, telinga, dan mata mereka akan berbicara menjadi saksi atas kejahatan yang mereka tutupi (Ayat 20-22). Terdapat juga satu Ayat Sajdah pada ayat 38.'
            },
        ],
        keywords: [
            'juz 24',
            'faman azhlamu',
            'la taqnatu mir rahmatillah',
            'az zumar 53',
            'surah ghafir',
            'ayat harapan ampunan',
            'kulit menjadi saksi'
        ],
        faq: [
            {
                question: 'Di mana letak ayat larangan berputus asa dari ampunan Allah karena banyak dosa?',
                answer: 'Ayat "Katakanlah: Hai hamba-hamba-Ku yang malampaui batas... janganlah berputus asa dari rahmat Allah" ada di Juz 24, yaitu Surah Az-Zumar ayat 53.'
            },
            {
                question: 'Berapa jumlah ayat di Juz 24 secara tepat?',
                answer: 'Terdapat 175 ayat, mencakup 44 ayat akhir Az-Zumar, 85 ayat utuh Surah Ghafir, dan 46 ayat awal Surah Fussilat.'
            },
            {
                question: 'Mengapa Surah ke-40 disebut Surah Al-Mu\'min?',
                answer: 'Karena surah ini menceritakan kisah hebat seorang "Mu\'min" (orang beriman) dari kalangan keluarga Fir\'aun yang membela Nabi Musa dari rencana pembunuhan.'
            },
        ],
    },
    25: {
        juzNumber: 25,
        intro: 'Juz 25 Al-Quran, yang diawali dengan kalimat "Ilaihi Yuraddu" (Kepada-Nyalah dikembalikan...), dimulai dari Surah Fussilat ayat 47 dan berakhir di Surah Al-Jatsiyah ayat 37. Seluruh surah di juz ini merupakan kelompok "Hawamim" (diawali dengan huruf muqatha\'ah Ha-Mim). Memuat pedoman musyawarah, doa-doa harian, kengerian kabut kiamat (Dukhan), hingga gambaran umat yang berlutut menunggu pengadilan akhir.',
        totalAyahs: 246,
        totalSurahs: 5,
        surahs: [
            {
                number: 41,
                name: 'Fussilat',
                nameArabic: 'فصلت',
                meaning: 'Yang Dijelaskan',
                totalAyahs: 54,
                ayahRange: '47-54',
                type: 'Makkiyah',
                description: 'Bagian penutup ini menegaskan bahwa hanya Allah yang mengetahui kapan Kiamat terjadi. Serta janji Allah bahwa Dia akan memperlihatkan tanda-tanda kebesaran-Nya di segenap ufuk alam semesta dan pada diri manusia itu sendiri hingga terbukti Al-Quran itu benar.'
            },
            {
                number: 42,
                name: 'Asy-Syura',
                nameArabic: 'الشورى',
                meaning: 'Musyawarah',
                totalAyahs: 53,
                ayahRange: '1-53',
                type: 'Makkiyah',
                description: 'Membahas prinsip-prinsip syariat yang sama sejak zaman Nabi Nuh hingga Muhammad. Memerintahkan umat Islam untuk menyelesaikan urusan melalui jalan musyawarah (Syura). Juga menjelaskan bahwa memaafkan lebih utama meskipun membalas kejahatan setimpal diperbolehkan.'
            },
            {
                number: 43,
                name: 'Az-Zukhruf',
                nameArabic: 'الزخرف',
                meaning: 'Perhiasan',
                totalAyahs: 89,
                ayahRange: '1-89',
                type: 'Makkiyah',
                description: 'Menegaskan bahwa harta dan perhiasan dunia (zukhruf) tidak ada nilainya sama sekali di mata Allah dan bukan ukuran kemuliaan (diberikan bahkan kepada orang kafir). Memuat doa menaiki kendaraan (ayat 13-14), dan bantahan bahwa malaikat adalah anak perempuan Allah.'
            },
            {
                number: 44,
                name: 'Ad-Dukhan',
                nameArabic: 'الدخان',
                meaning: 'Kabut/Asap',
                totalAyahs: 59,
                ayahRange: '1-59',
                type: 'Makkiyah',
                description: 'Dibuka dengan sumpah demi malam yang diberkahi (turunnya Al-Quran). Dinamakan Ad-Dukhan karena berisi peringatan akan datangnya kabut/asap tebal yang menyelimuti manusia sebagai azab. Menjelaskan pula kengerian "Pohon Zaqqum" sebagai makanan ahli neraka yang mendidihkan perut.'
            },
            {
                number: 45,
                name: 'Al-Jatsiyah',
                nameArabic: 'الجاثية',
                meaning: 'Yang Berlutut',
                totalAyahs: 37,
                ayahRange: '1-37',
                type: 'Makkiyah',
                description: 'Menutup juz 25 dengan gambaran visual Hari Kiamat di mana setiap umat (bangsa) akan dipanggil menghadap buku catatan amalnya dalam keadaan berlutut ketakutan (Jatsiyah). Tidak ada yang bisa menolong mereka kecuali amal yang dikerjakan di dunia.'
            },
        ],
        keywords: [
            'juz 25',
            'ilaihi yuraddu',
            'doa naik kendaraan',
            'subhanalladzi sakhkhara lana',
            'az zukhruf 13',
            'pohon zaqqum',
            'surah ad dukhan',
            'ayat musyawarah'
        ],
        faq: [
            {
                question: 'Di mana letak doa naik kendaraan "Subhanalladzi Sakhkhara lana hadza..."?',
                answer: 'Doa perjalanan atau menaiki kendaraan tersebut berasal dari Surah Az-Zukhruf ayat 13-14 yang terletak di Juz 25.'
            },
            {
                question: 'Apa arti Ad-Dukhan yang ada di Juz 25?',
                answer: 'Ad-Dukhan berarti kabut atau asap tebal. Ini merujuk pada salah satu tanda besar hari kiamat atau azab yang diturunkan kepada orang kafir Quraisy.'
            },
            {
                question: 'Sebutkan makanan penghuni neraka yang diceritakan di Surah Ad-Dukhan!',
                answer: 'Makanan itu adalah Pohon Zaqqum, yang buahnya seperti kotoran minyak yang mendidih di dalam perut, diceritakan pada ayat 43-46.'
            },
        ],
    },
    26: {
        juzNumber: 26,
        intro: 'Juz 26 Al-Quran sering disebut Juz "Ha Mim" karena diawali dengan huruf muqatha\'ah tersebut pada Surah Al-Ahqaf ayat 1, dan berakhir di Surah Adz-Dzariyat ayat 30. Juz ini menandai masuknya kita ke deretan surah-surah yang lebih pendek (Mufasshal). Isinya sangat kaya akan adab sosial kemasyarakatan, aturan peperangan, kedudukan Nabi Muhammad SAW, hingga gambaran detail malaikat pencatat amal.',
        totalAyahs: 195,
        totalSurahs: 6,
        surahs: [
            {
                number: 46,
                name: 'Al-Ahqaf',
                nameArabic: 'الأحقاف',
                meaning: 'Bukit-bukit Pasir',
                totalAyahs: 35,
                ayahRange: '1-35',
                type: 'Makkiyah',
                description: 'Dinamakan dari tempat tinggal kaum \'Ad (kaum Nabi Hud) yang dihancurkan angin topan. Surah ini memuat perintah berbakti kepada orang tua (mengingat kepayahan ibu mengandung dan menyusui selama 30 bulan), serta doa masyhur ketika seseorang mencapai usia kematangan 40 tahun (ayat 15).'
            },
            {
                number: 47,
                name: 'Muhammad',
                nameArabic: 'محمد',
                meaning: 'Nabi Muhammad',
                totalAyahs: 38,
                ayahRange: '1-38',
                type: 'Madaniyah',
                description: 'Sering juga disebut Surah Al-Qital (Peperangan). Membahas aturan tawanan perang dan janji Allah bagi para syuhada. Surah ini juga merinci keindahan surga yang memiliki sungai-sungai dari air jernih, susu yang tak berubah rasa, khamr yang lezat, dan madu murni (ayat 15).'
            },
            {
                number: 48,
                name: 'Al-Fath',
                nameArabic: 'الفتح',
                meaning: 'Kemenangan',
                totalAyahs: 29,
                ayahRange: '1-29',
                type: 'Madaniyah',
                description: 'Turun sepulang dari Perjanjian Hudaibiyah. Allah menyebut perjanjian damai yang awalnya mengecewakan sahabat ini sebagai "Fathan Mubiina" (Kemenangan yang nyata). Memuat peristiwa Bai\'at Ridwan, di mana Allah meridhai para sahabat yang bersumpah setia di bawah pohon.'
            },
            {
                number: 49,
                name: 'Al-Hujurat',
                nameArabic: 'الحجرات',
                meaning: 'Kamar-kamar',
                totalAyahs: 18,
                ayahRange: '1-18',
                type: 'Madaniyah',
                description: 'Dikenal sebagai "Surah Akhlaq". Memuat etika kepada Nabi (larangan meninggikan suara), perintah Tabayyun (klarifikasi berita), larangan mengolok-olok, larangan Su\'udzon (buruk sangka), larangan Ghibah (mengumpamakan penggunjing seperti pemakan bangkai saudaranya), dan deklarasi kesetaraan ras manusia (ayat 13).'
            },
            {
                number: 50,
                name: 'Qaf',
                nameArabic: 'ق',
                meaning: 'Qaf',
                totalAyahs: 45,
                ayahRange: '1-45',
                type: 'Makkiyah',
                description: 'Surah yang sering dibaca Rasulullah saat khutbah shalat Ied. Sangat tajam membahas hari kebangkitan. Mengungkap keberadaan malaikat pengawas di kanan dan kiri (Raqib & \'Atid) yang mencatat setiap ucapan (ayat 18), kedatangan sakaratul maut, dan penciptaan langit bumi dalam 6 masa.'
            },
            {
                number: 51,
                name: 'Adz-Dzariyat',
                nameArabic: 'الذاريات',
                meaning: 'Angin yang Menerbangkan',
                totalAyahs: 60,
                ayahRange: '1-30',
                type: 'Makkiyah',
                description: 'Paruh awal surah ini dimulai dengan sumpah Allah demi angin, awan, kapal, dan malaikat pembagi rezeki. Mengisahkan secara singkat tamu-tamu (malaikat) Nabi Ibrahim yang datang membawa kabar gembira tentang kelahiran Ishaq dan kabar azab bagi kaum Luth.'
            },
        ],
        keywords: [
            'juz 26',
            'surah al hujurat',
            'larangan ghibah',
            'doa usia 40 tahun',
            'al ahqaf 15',
            'inna akramakum indallahi atqakum',
            'malaikat raqib atid',
            'perjanjian hudaibiyah'
        ],
        faq: [
            {
                question: 'Di mana letak ayat yang melarang Ghibah (menggunjing) dan Su\'udzon?',
                answer: 'Aturan etika sosial tersebut berada di Surah Al-Hujurat ayat 12, yang mengibaratkan orang yang suka ghibah seperti memakan daging saudaranya yang sudah mati.'
            },
            {
                question: 'Ayat apa di Juz 26 yang menyatakan bahwa manusia paling mulia adalah yang paling bertakwa?',
                answer: 'Surah Al-Hujurat ayat 13: "Hai manusia, sesungguhnya Kami menciptakan kamu dari seorang laki-laki dan seorang perempuan... Sesungguhnya orang yang paling mulia di antara kamu di sisi Allah ialah orang yang paling takwa."'
            },
            {
                question: 'Di mana letak doa ketika seseorang mencapai usia 40 tahun?',
                answer: 'Doa memohon petunjuk untuk mensyukuri nikmat dan memperbaiki keturunan di usia kematangan (40 tahun) ada di Surah Al-Ahqaf ayat 15.'
            },
        ],
    },
    27: {
        juzNumber: 27,
        intro: 'Juz 27 Al-Quran, yang diawali dengan kalimat "Qala Fama Khathbukum" (Ibrahim berkata: Apakah urusanmu...), dimulai dari Surah Adz-Dzariyat ayat 31 dan berakhir di Surah Al-Hadid ayat 29. Juz ini sangat populer karena menghimpun surah-surah ikonik favorit umat Islam, seperti Surah Ar-Rahman (Pengantin Al-Quran) dan Surah Al-Waqi\'ah yang identik dengan pintu rezeki dan gambaran detail Hari Kiamat.',
        totalAyahs: 399,
        totalSurahs: 7,
        surahs: [
            {
                number: 51,
                name: 'Adz-Dzariyat',
                nameArabic: 'الذاريات',
                meaning: 'Angin yang Menerbangkan',
                totalAyahs: 60,
                ayahRange: '31-60',
                type: 'Makkiyah',
                description: 'Akhir surah ini menceritakan azab kaum Luth, Fir\'aun, kaum \'Ad, dan Tsamud. Ditutup dengan ayat paling mendasar dalam Islam tentang tujuan keberadaan manusia: "Dan Aku tidak menciptakan jin dan manusia melainkan supaya mereka mengabdi/beribadah kepada-Ku" (Ayat 56).'
            },
            {
                number: 52,
                name: 'Ath-Thur',
                nameArabic: 'الطور',
                meaning: 'Bukit',
                totalAyahs: 49,
                ayahRange: '1-49',
                type: 'Makkiyah',
                description: 'Allah bersumpah demi Bukit Thur (tempat Musa menerima wahyu). Surah ini merinci kenikmatan surga, di mana Allah menjanjikan bahwa orang-orang beriman akan dikumpulkan kembali di surga bersama anak cucu mereka yang mengikuti jejak keimanan tersebut (Ayat 21).'
            },
            {
                number: 53,
                name: 'An-Najm',
                nameArabic: 'النجم',
                meaning: 'Bintang',
                totalAyahs: 62,
                ayahRange: '1-62',
                type: 'Makkiyah',
                description: 'Mengonfirmasi kebenaran peristiwa Isra Mi\'raj, saat Nabi melihat wujud asli Malaikat Jibril di Sidratul Muntaha. Membantah penyembahan berhala Latta, Uzza, dan Manat. Menegaskan bahwa manusia hanya memperoleh apa yang telah diusahakannya (Ayat 39). Diakhiri dengan Ayat Sajdah.'
            },
            {
                number: 54,
                name: 'Al-Qamar',
                nameArabic: 'القمر',
                meaning: 'Bulan',
                totalAyahs: 55,
                ayahRange: '1-55',
                type: 'Makkiyah',
                description: 'Diturunkan sebagai respons atas mukjizat terbelahnya bulan ("Iqtarabatis sa\'atu wansyaqqal qamar"). Memiliki ciri khas pengulangan ayat peringatan sebanyak 4 kali: "Dan sesungguhnya telah Kami mudahkan Al-Quran untuk pelajaran, maka adakah orang yang mengambil pelajaran?"'
            },
            {
                number: 55,
                name: 'Ar-Rahman',
                nameArabic: 'الرحمن',
                meaning: 'Yang Maha Pengasih',
                totalAyahs: 78,
                ayahRange: '1-78',
                type: 'Madaniyah',
                description: 'Digelar sebagai "Arusul Quran" (Pengantin Al-Quran) karena keindahan sastranya. Ditujukan secara khusus kepada dua golongan (Jin dan Manusia) dengan pengulangan ayat "Fabiayyi ala i rabbikuma tukadzdziban" (Maka nikmat Tuhan kamu yang manakah yang kamu dustakan?) sebanyak 31 kali.'
            },
            {
                number: 56,
                name: 'Al-Waqi\'ah',
                nameArabic: 'الواقعة',
                meaning: 'Hari Kiamat',
                totalAyahs: 96,
                ayahRange: '1-96',
                type: 'Makkiyah',
                description: 'Membagi manusia di Hari Kiamat menjadi tiga golongan: As-Sabiqun (Golongan terdepan/terbaik), Ashabul Yamin (Golongan Kanan/masuk surga), dan Ashabul Syimal (Golongan Kiri/masuk neraka). Surah ini sering dibaca sebagai wasilah memohon kelancaran rezeki dari Allah.'
            },
            {
                number: 57,
                name: 'Al-Hadid',
                nameArabic: 'الحديد',
                meaning: 'Besi',
                totalAyahs: 29,
                ayahRange: '1-29',
                type: 'Madaniyah',
                description: 'Memotivasi umat untuk menafkahkan hartanya. Terdapat fakta ilmiah menakjubkan pada ayat 25 bahwa besi "diturunkan" (diciptakan melalui ledakan supernova di luar angkasa dan dibawa ke bumi melalui meteor). Surah ini juga mengibaratkan kehidupan dunia hanyalah permainan dan senda gurau belaka.'
            },
        ],
        keywords: [
            'juz 27',
            'tujuan penciptaan manusia',
            'adz dzariyat 56',
            'surah ar rahman',
            'fabiayyi ala i rabbikuma',
            'surah al waqiah',
            'terbelahnya bulan',
            'al qamar'
        ],
        faq: [
            {
                question: 'Di mana letak ayat "Dan Aku tidak menciptakan jin dan manusia melainkan supaya mereka mengabdi kepada-Ku"?',
                answer: 'Ayat tujuan penciptaan ini ada di awal Juz 27, yaitu Surah Adz-Dzariyat ayat 56.'
            },
            {
                question: 'Berapa kali kalimat "Fabiayyi ala i rabbikuma tukadzdziban" diulang dalam Surah Ar-Rahman?',
                answer: 'Kalimat yang berarti "Maka nikmat Tuhan kamu yang manakah yang kamu dustakan?" ini diulang sebanyak 31 kali di dalam Surah Ar-Rahman.'
            },
            {
                question: 'Surah apa di Juz 27 yang menceritakan tentang terbelahnya bulan?',
                answer: 'Peristiwa tersebut diabadikan di ayat pertama Surah Al-Qamar.'
            },
        ],
    },
    28: {
        juzNumber: 28,
        intro: 'Juz 28 Al-Quran dikenal dengan nama Juz "Qad Sami\'allah" (Sungguh Allah telah mendengar...). Juz ini sangat unik karena memuat 9 surah yang semuanya adalah surah Madaniyah, sehingga isinya sangat padat dengan syariat, hukum sosial, aturan rumah tangga, hingga manajemen konflik internal umat Islam dan kaum munafik.',
        totalAyahs: 137,
        totalSurahs: 9,
        surahs: [
            {
                number: 58,
                name: 'Al-Mujadalah',
                nameArabic: 'المجادلة',
                meaning: 'Wanita yang Menggugat',
                totalAyahs: 22,
                ayahRange: '1-22',
                type: 'Madaniyah',
                description: 'Satu-satunya surah dalam Al-Quran di mana lafaz "Allah" selalu disebut di setiap ayatnya. Diawali dengan kisah Khaulah binti Tsa\'labah yang menggugat suaminya karena hukum Zhihar (menyamakan punggung istri dengan ibu). Juga memuat adab memberi kelapangan tempat duduk dalam majelis (ayat 11).'
            },
            {
                number: 59,
                name: 'Al-Hasyr',
                nameArabic: 'الحشر',
                meaning: 'Pengusiran',
                totalAyahs: 24,
                ayahRange: '1-24',
                type: 'Madaniyah',
                description: 'Mengisahkan pengusiran pengkhianat Yahudi Bani Nadhir dari Madinah. Mengajarkan konsep harta "Fai" (rampasan tanpa perang) agar harta tidak hanya berputar di kalangan orang kaya saja. Tiga ayat terakhirnya (22-24) memuat deretan Asmaul Husna yang sangat agung dan sering dijadikan wirid.'
            },
            {
                number: 60,
                name: 'Al-Mumtahanah',
                nameArabic: 'الممتحنة',
                meaning: 'Wanita yang Diuji',
                totalAyahs: 13,
                ayahRange: '1-13',
                type: 'Madaniyah',
                description: 'Memberikan pedoman tegas tentang batas toleransi dan hubungan diplomatik antara Muslim dan Non-Muslim. Memperbolehkan berbuat baik kepada Non-Muslim yang tidak memerangi umat Islam (ayat 8), serta kisah ujian keimanan bagi wanita-wanita Makkah yang hijrah.'
            },
            {
                number: 61,
                name: 'Ash-Shaff',
                nameArabic: 'الصف',
                meaning: 'Barisan',
                totalAyahs: 14,
                ayahRange: '1-14',
                type: 'Madaniyah',
                description: 'Allah sangat membenci orang yang mengatakan apa yang tidak dilakukannya (ayat 2-3). Surah ini menyerukan umat Islam agar berjuang dalam satu barisan yang kokoh seperti bangunan yang tersusun rapi. Memuat nubuat Nabi Isa tentang kedatangan Nabi bernama Ahmad (ayat 6).'
            },
            {
                number: 62,
                name: 'Al-Jumu\'ah',
                nameArabic: 'الجمعة',
                meaning: 'Hari Jumat',
                totalAyahs: 11,
                ayahRange: '1-11',
                type: 'Madaniyah',
                description: 'Mewajibkan laki-laki muslim untuk segera meninggalkan perniagaan/pekerjaan saat azan Shalat Jumat berkumandang (ayat 9). Namun, setelah shalat selesai, umat diperintahkan kembali bertebaran mencari karunia Allah di muka bumi.'
            },
            {
                number: 63,
                name: 'Al-Munafiqun',
                nameArabic: 'المنافقون',
                meaning: 'Orang-orang Munafik',
                totalAyahs: 11,
                ayahRange: '1-11',
                type: 'Madaniyah',
                description: 'Membongkar sifat dusta, pengecut, dan bahaya laten dari tokoh munafik Abdullah bin Ubay. Ditutup dengan peringatan agar harta dan anak tidak melalaikan kita dari mengingat Allah, dan perintah berinfak sebelum datangnya kematian yang penuh penyesalan.'
            },
            {
                number: 64,
                name: 'At-Taghabun',
                nameArabic: 'التغابن',
                meaning: 'Hari Ditampakkan Kesalahan',
                totalAyahs: 18,
                ayahRange: '1-18',
                type: 'Madaniyah',
                description: 'Taghabun adalah nama lain Hari Kiamat (hari di mana kerugian dan penyesalan ditampakkan). Memperingatkan bahwa istri dan anak-anak terkadang bisa menjadi musuh atau fitnah (ujian) yang menghalangi ketaatan kepada Allah (ayat 14-15).'
            },
            {
                number: 65,
                name: 'Ath-Thalaq',
                nameArabic: 'الطلاق',
                meaning: 'Talak/Perceraian',
                totalAyahs: 12,
                ayahRange: '1-12',
                type: 'Madaniyah',
                description: 'Merinci hukum perceraian yang benar sesuai sunnah, masa iddah, dan nafkah. Di surah inilah letak "Ayat Seribu Dinar" (ayat 2-3) yang sangat masyhur: Barangsiapa bertakwa, Allah akan memberinya jalan keluar dan rezeki dari arah yang tidak disangka-sangka.'
            },
            {
                number: 66,
                name: 'At-Tahrim',
                nameArabic: 'التحريم',
                meaning: 'Pengharaman',
                totalAyahs: 12,
                ayahRange: '1-12',
                type: 'Madaniyah',
                description: 'Menegur Nabi SAW karena mengharamkan yang halal (madu/budak) demi menyenangkan istrinya. Terdapat perintah menjaga diri dan keluarga dari api neraka (ayat 6). Ditutup dengan perumpamaan dua istri nabi yang kafir (istri Nuh & Luth) dan dua wanita mukminah teladan (istri Fir\'aun & Maryam).'
            },
        ],
        keywords: [
            'juz 28',
            'qad samiallah',
            'ayat 1000 dinar',
            'ath thalaq 2',
            'jual beli hari jumat',
            'jagalah keluargamu dari neraka',
            'surah al mujadalah',
            'harta fai'
        ],
        faq: [
            {
                question: 'Di mana letak "Ayat Seribu Dinar" yang populer untuk kelancaran rezeki?',
                answer: 'Ayat tentang rezeki dari arah yang tak disangka-sangka bagi orang bertakwa tersebut ada di Juz 28, tepatnya pada Surah Ath-Thalaq ayat 2 dan 3.'
            },
            {
                question: 'Sebutkan ayat yang memerintahkan kita menjaga keluarga dari api neraka!',
                answer: 'Ayat "Qu anfusakum wa ahlikum nara..." terdapat di akhir Juz 28, yaitu Surah At-Tahrim ayat 6.'
            },
            {
                question: 'Surah apa di Juz 28 yang selalu menyebut lafaz "Allah" di setiap ayatnya?',
                answer: 'Satu-satunya surah dengan keistimewaan tersebut di dalam Al-Quran adalah Surah Al-Mujadalah (surah ke-58).'
            },
        ],
    },
    29: {
        juzNumber: 29,
        intro: 'Juz 29 Al-Quran, yang sering disebut Juz "Tabarak" (Maha Suci Allah...), dimulai dari Surah Al-Mulk ayat 1 dan berakhir di Surah Al-Mursalat ayat 50. Juz ini berisi 11 surah Makkiyah (kecuali Al-Insan menurut sebagian ulama). Karakteristik utamanya adalah gaya bahasa yang tegas, ritme yang cepat, dan fokus utama pada bukti-bukti penciptaan alam, kepastian kiamat, dan ancaman bagi para pendusta.',
        totalAyahs: 431,
        totalSurahs: 11,
        surahs: [
            {
                number: 67,
                name: 'Al-Mulk',
                nameArabic: 'الملك',
                meaning: 'Kerajaan',
                totalAyahs: 30,
                ayahRange: '1-30',
                type: 'Makkiyah',
                description: 'Surah pembuka juz 29 yang dijuluki "Al-Mani\'ah" (Pencegah dari siksa kubur) jika dibaca setiap malam. Mengajak manusia meneliti kesempurnaan ciptaan Allah di langit tanpa cacat sedikitpun. Menantang akal manusia tentang burung yang terbang, dan air yang meresap ke dalam bumi.'
            },
            {
                number: 68,
                name: 'Al-Qalam',
                nameArabic: 'القلم',
                meaning: 'Pena',
                totalAyahs: 52,
                ayahRange: '1-52',
                type: 'Makkiyah',
                description: 'Diawali dengan huruf "Nun". Membela Rasulullah dari tuduhan gila, dan memujinya memiliki akhlak yang sangat agung (ayat 4). Menceritakan kisah Ashabul Jannah (para pemilik kebun pelit yang kebunnya dihanguskan karena tidak mau bersedekah), serta menyinggung kisah Nabi Yunus (Dzun Nun).'
            },
            {
                number: 69,
                name: 'Al-Haqqah',
                nameArabic: 'الحاقة',
                meaning: 'Hari Kiamat yang Pasti Terjadi',
                totalAyahs: 52,
                ayahRange: '1-52',
                type: 'Makkiyah',
                description: 'Mengisahkan kedahsyatan tiupan sangkakala pertama, di mana langit terbelah dan malaikat memikul \'Arsy (ayat 17). Merinci kebahagiaan orang yang menerima buku catatan amal dari tangan kanannya, dan jerit penyesalan orang yang menerimanya dari tangan kirinya.'
            },
            {
                number: 70,
                name: 'Al-Ma\'arij',
                nameArabic: 'المعارج',
                meaning: 'Tempat Naik',
                totalAyahs: 44,
                ayahRange: '1-44',
                type: 'Makkiyah',
                description: 'Menjelaskan sifat dasar psikologis manusia yang keluh kesah saat ditimpa musibah dan kikir saat mendapat kebaikan (ayat 19-21), kecuali mereka yang mendirikan shalat. Menggambarkan azab kiamat yang setara dengan 50.000 tahun.'
            },
            {
                number: 71,
                name: 'Nuh',
                nameArabic: 'نوح',
                meaning: 'Nabi Nuh',
                totalAyahs: 28,
                ayahRange: '1-28',
                type: 'Makkiyah',
                description: 'Bercerita utuh tentang kesabaran epik dakwah Nabi Nuh a.s. selama 950 tahun (baik siang maupun malam). Menjelaskan keutamaan Istighfar yang dapat mendatangkan hujan berkah, harta, dan anak (ayat 10-12). Ditutup dengan doa kebinasaan atas kaumnya.'
            },
            {
                number: 72,
                name: 'Al-Jinn',
                nameArabic: 'الجن',
                meaning: 'Jin',
                totalAyahs: 28,
                ayahRange: '1-28',
                type: 'Makkiyah',
                description: 'Menceritakan takjubnya sekelompok Jin saat mencuri dengar bacaan Al-Quran Nabi Muhammad, lalu mereka beriman. Menjelaskan bahwa sejak Al-Quran turun, langit dijaga ketat oleh panah api (meteor) sehingga Jin tak bisa lagi mencuri berita langit.'
            },
            {
                number: 73,
                name: 'Al-Muzzammil',
                nameArabic: 'المزمل',
                meaning: 'Orang yang Berselimut',
                totalAyahs: 20,
                ayahRange: '1-20',
                type: 'Makkiyah',
                description: 'Perintah langsung kepada Rasulullah (yang sedang berselimut ketakutan saat awal wahyu) untuk bangun melaksanakan Shalat Malam (Tahajud) setengah malam atau lebih, dan membaca Al-Quran secara Tartil untuk mempersiapkan mental menerima wahyu yang berat.'
            },
            {
                number: 74,
                name: 'Al-Muddatstsir',
                nameArabic: 'المدثر',
                meaning: 'Orang yang Berkemul',
                totalAyahs: 56,
                ayahRange: '1-56',
                type: 'Makkiyah',
                description: 'Ayat kedua (Kum fa andzir/Bangun dan berilah peringatan) adalah awal peresmian tugas "Risalah" bagi Nabi Muhammad. Menyebutkan bahwa penjaga Neraka Saqar berjumlah 19 malaikat, dan mengancam tokoh musyrik Walid bin Mughirah yang mengejek Al-Quran sebagai sihir.'
            },
            {
                number: 75,
                name: 'Al-Qiyamah',
                nameArabic: 'القيامة',
                meaning: 'Hari Kiamat',
                totalAyahs: 40,
                ayahRange: '1-40',
                type: 'Makkiyah',
                description: 'Bantahan keras terhadap kaum kafir yang ragu tulang-belulang bisa disatukan lagi (bahkan Allah mampu menyusun kembali sidik jari mereka). Terdapat ayat teguran saat Nabi Muhammad terburu-buru menirukan bacaan Jibril (ayat 16).'
            },
            {
                number: 76,
                name: 'Al-Insan',
                nameArabic: 'الإنسان',
                meaning: 'Manusia',
                totalAyahs: 31,
                ayahRange: '1-31',
                type: 'Madaniyah',
                description: 'Sering disebut Surah Ad-Dahr. Membahas awal mula penciptaan manusia dari air mani yang bercampur, lalu diberi pilihan jalan syukur atau kufur. Memberikan gambaran sangat detail tentang pakaian sutra surga dan minuman yang dicampur jahe (Zanjabil).'
            },
            {
                number: 77,
                name: 'Al-Mursalat',
                nameArabic: 'المرسلات',
                meaning: 'Malaikat yang Diutus',
                totalAyahs: 50,
                ayahRange: '1-50',
                type: 'Makkiyah',
                description: 'Surah penutup Juz 29 ini memiliki ciri khas berupa pengulangan kalimat ancaman yang sangat mengerikan sebanyak 10 kali: "Wailun yauma\'idzin lil mukadz-dzibin" (Kecelakaan yang besarlah pada hari itu bagi orang-orang yang mendustakan).'
            },
        ],
        keywords: [
            'juz 29',
            'tabarak',
            'surah al mulk',
            'siksa kubur',
            'istighfar mendatangkan rezeki',
            'surah nuh 10',
            'malaikat 19 neraka',
            'al muddatstsir'
        ],
        faq: [
            {
                question: 'Apa keutamaan membaca Surah Al-Mulk di Juz 29?',
                answer: 'Rasulullah SAW bersabda bahwa Surah Al-Mulk (yang berjumlah 30 ayat) akan memohonkan ampunan bagi pembacanya, dan menjadi pelindung atau pencegah (Al-Mani\'ah) dari siksa kubur.'
            },
            {
                question: 'Di mana letak ayat tentang khasiat Istighfar bisa melancarkan rezeki dan anak?',
                answer: 'Itu adalah inti dari dakwah Nabi Nuh yang direkam dalam Surah Nuh ayat 10-12 di Juz 29.'
            },
            {
                question: 'Kalimat ancaman apa yang diulang hingga 10 kali di akhir Juz 29?',
                answer: 'Kalimat "Wailun yauma\'idzin lil mukadz-dzibin" (Celakalah pada hari itu bagi para pendusta!) yang diulang di sepanjang Surah Al-Mursalat.'
            },
        ],
    },
    30: {
        juzNumber: 30,
        intro: 'Juz 30 Al-Quran, yang sangat masyhur dengan sebutan Juz \'Amma, dimulai dari Surah An-Naba ayat 1 dan berakhir di penutup Al-Quran, Surah An-Nas ayat 6. Juz ini memuat 37 surah pendek yang paling sering dihafal dan dibaca dalam shalat sehari-hari. Fokus utama Juz \'Amma adalah penanaman aqidah dasar, pengingat keras tentang kedahsyatan Hari Kiamat, serta penciptaan alam semesta.',
        totalAyahs: 564,
        totalSurahs: 37,
        surahs: [
            { number: 78, name: 'An-Naba\'', nameArabic: 'النبأ', meaning: 'Berita Besar', totalAyahs: 40, ayahRange: '1-40', type: 'Makkiyah', description: 'Membahas tentang "Berita Besar" (Kiamat) yang diperselisihkan kaum musyrik. Menjelaskan bukti kekuasaan Allah pada alam (gunung sebagai pasak, siang dan malam) dan diakhiri dengan penyesalan orang kafir yang ingin menjadi tanah.' },
            { number: 79, name: 'An-Nazi\'at', nameArabic: 'النازعات', meaning: 'Malaikat Pencabut Nyawa', totalAyahs: 46, ayahRange: '1-46', type: 'Makkiyah', description: 'Bersumpah demi malaikat yang mencabut nyawa dengan keras dan lembut. Mengisahkan akhir tragis kesombongan Fir\'aun, serta penegasan bahwa Kiamat pasti datang secara tiba-tiba.' },
            { number: 80, name: '\'Abasa', nameArabic: 'عبس', meaning: 'Ia Bermuka Masam', totalAyahs: 42, ayahRange: '1-42', type: 'Makkiyah', description: 'Berisi teguran halus Allah kepada Rasulullah SAW yang sempat berpaling dari Abdullah bin Ummi Maktum (sahabat tunanetra yang ingin belajar) karena sedang berdakwah kepada pembesar Quraisy.' },
            { number: 81, name: 'At-Takwir', nameArabic: 'التكوير', meaning: 'Menggulung', totalAyahs: 29, ayahRange: '1-29', type: 'Makkiyah', description: 'Menggambarkan kengerian Kiamat (matahari digulung, bintang berjatuhan, lautan dipanaskan). Juga memuat larangan keras tradisi Jahiliyah mengubur bayi perempuan hidup-hidup.' },
            { number: 82, name: 'Al-Infithar', nameArabic: 'الانفطار', meaning: 'Terbelah', totalAyahs: 19, ayahRange: '1-19', type: 'Makkiyah', description: 'Menjelaskan langit yang terbelah saat kiamat. Mempertanyakan apa yang membuat manusia durhaka kepada Tuhannya, serta menyebutkan Malaikat Kiraman Katibin (Pencatat Amal).' },
            { number: 83, name: 'Al-Muthaffifin', nameArabic: 'المطففين', meaning: 'Orang yang Curang', totalAyahs: 36, ayahRange: '1-36', type: 'Makkiyah', description: 'Ancaman keras (Wail/Celaka) bagi pedagang yang curang dalam takaran dan timbangan. Menyebutkan buku catatan amal orang durhaka (Sijjin) dan orang berbakti (Illiyyin).' },
            { number: 84, name: 'Al-Insyiqaq', nameArabic: 'الانشقاق', meaning: 'Terbelah', totalAyahs: 25, ayahRange: '1-25', type: 'Makkiyah', description: 'Membahas kepatuhan langit dan bumi kepada Allah saat dihancurkan. Menggambarkan dua cara manusia menerima buku amal: dari tangan kanan (hisab yang mudah) dan dari belakang punggung.' },
            { number: 85, name: 'Al-Buruj', nameArabic: 'البروج', meaning: 'Gugusan Bintang', totalAyahs: 22, ayahRange: '1-22', type: 'Makkiyah', description: 'Mengisahkan Ashabul Ukhdud (orang-orang beriman yang dibakar hidup-hidup di dalam parit oleh raja yang zalim). Menegaskan bahwa penjagaan Allah atas Al-Quran ada di Lauhul Mahfuz.' },
            { number: 86, name: 'Ath-Thariq', nameArabic: 'الطارق', meaning: 'Yang Datang di Malam Hari', totalAyahs: 17, ayahRange: '1-17', type: 'Makkiyah', description: 'Menyebutkan penciptaan manusia dari air yang terpancar (mani) sebagai bukti bahwa Allah sangat mampu membangkitkan manusia kembali setelah mati.' },
            { number: 87, name: 'Al-A\'la', nameArabic: 'الأعلى', meaning: 'Yang Maha Tinggi', totalAyahs: 19, ayahRange: '1-19', type: 'Makkiyah', description: 'Surah yang sangat sering dibaca Rasulullah pada rakaat pertama Shalat Jumat dan Ied. Membahas penyucian nama Allah dan jaminan bahwa Rasulullah tidak akan lupa pada wahyu yang dibacakan Jibril.' },
            { number: 88, name: 'Al-Ghasyiyah', nameArabic: 'الغاشية', meaning: 'Hari Pembalasan', totalAyahs: 26, ayahRange: '1-26', type: 'Makkiyah', description: 'Sering dibaca berpasangan dengan Al-A\'la. Memvisualisasikan dua kondisi wajah manusia di akhirat: wajah yang tertunduk hina dan kepanasan, serta wajah yang berseri-seri di surga.' },
            { number: 89, name: 'Al-Fajr', nameArabic: 'الفجر', meaning: 'Fajar', totalAyahs: 30, ayahRange: '1-30', type: 'Makkiyah', description: 'Bersumpah demi waktu Fajar. Mengisahkan kehancuran kaum \'Ad (Iram yang bertiang tinggi), Tsamud, dan Fir\'aun. Ditutup dengan panggilan mesra Allah kepada "Nafsul Mutmainnah" (Jiwa yang tenang).' },
            { number: 90, name: 'Al-Balad', nameArabic: 'البلد', meaning: 'Negeri', totalAyahs: 20, ayahRange: '1-20', type: 'Makkiyah', description: 'Bersumpah demi Kota Makkah. Menjelaskan bahwa manusia diciptakan dalam susah payah, dan memerintahkan manusia menempuh "Jalan yang Mendaki" (membebaskan budak, menyantuni anak yatim dan orang miskin).' },
            { number: 91, name: 'Asy-Syams', nameArabic: 'الشمس', meaning: 'Matahari', totalAyahs: 15, ayahRange: '1-15', type: 'Makkiyah', description: 'Memuat sumpah beruntun terpanjang di Al-Quran (matahari, bulan, siang, malam, langit, bumi, jiwa). Kesimpulannya: Beruntunglah orang yang menyucikan jiwanya, dan merugilah yang mengotorinya.' },
            { number: 92, name: 'Al-Lail', nameArabic: 'الليل', meaning: 'Malam', totalAyahs: 21, ayahRange: '1-21', type: 'Makkiyah', description: 'Menegaskan bahwa usaha manusia itu berbeda-beda. Allah akan memudahkan jalan kebahagiaan bagi orang yang dermawan dan bertakwa, serta menyulitkan jalan bagi orang yang bakhil (kikir).' },
            { number: 93, name: 'Ad-Duha', nameArabic: 'الضحى', meaning: 'Waktu Duha', totalAyahs: 11, ayahRange: '1-11', type: 'Makkiyah', description: 'Surah yang turun untuk menghibur Rasulullah yang bersedih karena wahyu sempat terputus (Fatrahtul Wahyi). Berisi larangan menghardik anak yatim dan peminta-minta, serta perintah mensyukuri nikmat.' },
            { number: 94, name: 'Al-Insyirah', nameArabic: 'الشرح', meaning: 'Kelapangan', totalAyahs: 8, ayahRange: '1-8', type: 'Makkiyah', description: 'Sering disebut Surah Asy-Syarh. Janji Allah bahwa "Sesungguhnya bersama kesulitan ada kemudahan" (diulang 2 kali). Mengajarkan agar setelah selesai satu urusan, kerjakanlah urusan lain dengan sungguh-sungguh.' },
            { number: 95, name: 'At-Tin', nameArabic: 'التين', meaning: 'Buah Tin', totalAyahs: 8, ayahRange: '1-8', type: 'Makkiyah', description: 'Bersumpah demi buah Tin, Zaitun, Gunung Sinai, dan Kota Makkah. Menegaskan bahwa manusia diciptakan dalam bentuk sebaik-baiknya (Ahsani Taqwim), namun bisa jatuh ke tempat serendah-rendahnya.' },
            { number: 96, name: 'Al-\'Alaq', nameArabic: 'العلق', meaning: 'Segumpal Darah', totalAyahs: 19, ayahRange: '1-19', type: 'Makkiyah', description: 'Lima ayat pertamanya (Iqra\') adalah wahyu pertama yang diturunkan di Gua Hira. Menekankan pentingnya membaca, ilmu pengetahuan, serta peringatan bagi orang yang menghalangi ibadah shalat (Abu Jahal). Terdapat Ayat Sajdah di akhir.' },
            { number: 97, name: 'Al-Qadr', nameArabic: 'القدر', meaning: 'Kemuliaan', totalAyahs: 5, ayahRange: '1-5', type: 'Makkiyah', description: 'Menjelaskan keagungan Malam Lailatul Qadar di bulan Ramadhan, yang nilainya lebih baik daripada seribu bulan, di mana para malaikat turun membawa kedamaian.' },
            { number: 98, name: 'Al-Bayyinah', nameArabic: 'البينة', meaning: 'Pembuktian', totalAyahs: 8, ayahRange: '1-8', type: 'Madaniyah', description: 'Menjelaskan bahwa Ahli Kitab dan musyrikin tidak akan meninggalkan agama mereka sampai datang bukti nyata (Rasulullah). Membagi manusia menjadi Khairul Bariyyah (sebaik-baik makhluk) dan Syarrul Bariyyah.' },
            { number: 99, name: 'Az-Zalzalah', nameArabic: 'الزلزلة', meaning: 'Kegoncangan', totalAyahs: 8, ayahRange: '1-8', type: 'Madaniyah', description: 'Menggambarkan gempa bumi dahsyat saat kiamat, di mana bumi mengeluarkan beban beratnya. Menegaskan bahwa amal seberat "Dzarrah" (atom/biji sawi) pun, baik atau buruk, pasti akan dibalas.' },
            { number: 100, name: 'Al-\'Adiyat', nameArabic: 'العاديات', meaning: 'Kuda Perang', totalAyahs: 11, ayahRange: '1-11', type: 'Makkiyah', description: 'Bersumpah demi kuda perang yang berlari kencang memercikkan api. Menegur manusia yang sangat ingkar kepada Tuhannya dan terlalu mencintai harta benda.' },
            { number: 101, name: 'Al-Qari\'ah', nameArabic: 'القارعة', meaning: 'Hari Kiamat', totalAyahs: 11, ayahRange: '1-11', type: 'Makkiyah', description: 'Menggambarkan manusia pada hari kiamat beterbangan seperti laron, dan gunung seperti bulu yang dihamburkan. Mengaitkan keselamatan dengan berat atau ringannya timbangan amal kebaikan.' },
            { number: 102, name: 'At-Takatsur', nameArabic: 'التكاثر', meaning: 'Bermegah-megahan', totalAyahs: 8, ayahRange: '1-8', type: 'Makkiyah', description: 'Peringatan bahwa perlombaan mengumpulkan harta dan status (bermegah-megahan) telah melalaikan manusia, sampai mereka masuk ke liang kubur. Diakhiri peringatan bahwa nikmat dunia akan dimintai pertanggungjawaban.' },
            { number: 103, name: 'Al-\'Ashr', nameArabic: 'العصر', meaning: 'Masa/Waktu', totalAyahs: 3, ayahRange: '1-3', type: 'Makkiyah', description: 'Surah yang merangkum kunci keselamatan manusia. Demi waktu, semua manusia berada dalam kerugian, kecuali yang beriman, beramal saleh, dan saling menasihati dalam kebenaran dan kesabaran.' },
            { number: 104, name: 'Al-Humazah', nameArabic: 'الهمزة', meaning: 'Pengumpat', totalAyahs: 9, ayahRange: '1-9', type: 'Makkiyah', description: 'Ancaman Neraka Huthamah (api yang menghancurkan hingga ke hulu hati) bagi orang yang suka mencela, mengumpat, dan menghitung-hitung hartanya karena mengira harta itu mengekalkannya.' },
            { number: 105, name: 'Al-Fil', nameArabic: 'الفيل', meaning: 'Gajah', totalAyahs: 5, ayahRange: '1-5', type: 'Makkiyah', description: 'Menceritakan sejarah kegagalan Pasukan Gajah pimpinan Abrahah yang ingin menghancurkan Ka\'bah, yang kemudian dibinasakan oleh burung Ababil berbekal batu panas (Sijjil).' },
            { number: 106, name: 'Quraisy', nameArabic: 'قريش', meaning: 'Suku Quraisy', totalAyahs: 4, ayahRange: '1-4', type: 'Makkiyah', description: 'Mengingatkan Suku Quraisy atas nikmat keamanan dan kemudahan berniaga di musim dingin dan panas, sehingga wajib bagi mereka menyembah Tuhan pemilik Ka\'bah.' },
            { number: 107, name: 'Al-Ma\'un', nameArabic: 'الماعون', meaning: 'Barang yang Berguna', totalAyahs: 7, ayahRange: '1-7', type: 'Makkiyah', description: 'Menjelaskan ciri pendusta agama: menghardik anak yatim, tidak memberi makan orang miskin, shalat karena riya (ingin dipuji), dan enggan menolong dengan barang berguna.' },
            { number: 108, name: 'Al-Kautsar', nameArabic: 'الكوثر', meaning: 'Nikmat Berlimpah', totalAyahs: 3, ayahRange: '1-3', type: 'Makkiyah', description: 'Surah terpendek dalam Al-Quran. Berisi penghiburan bagi Nabi bahwa ia diberi Telaga Kautsar, serta perintah mendirikan shalat dan berkurban.' },
            { number: 109, name: 'Al-Kafirun', nameArabic: 'الكافرون', meaning: 'Orang-orang Kafir', totalAyahs: 6, ayahRange: '1-6', type: 'Makkiyah', description: 'Deklarasi mutlak toleransi dan ketegasan aqidah: tidak ada kompromi mencampuradukkan ibadah antara Islam dan kaum musyrik ("Untukmu agamamu, dan untukkulah agamaku").' },
            { number: 110, name: 'An-Nasr', nameArabic: 'النصر', meaning: 'Pertolongan', totalAyahs: 3, ayahRange: '1-3', type: 'Madaniyah', description: 'Turun di akhir hayat Rasulullah SAW. Berisi kabar gembira atas "Fathu Makkah" (Penaklukan Makkah) dan berbondong-bondongnya manusia masuk Islam, diiringi perintah bertasbih dan beristighfar.' },
            { number: 111, name: 'Al-Lahab', nameArabic: 'المسد', meaning: 'Gejolak Api', totalAyahs: 5, ayahRange: '1-5', type: 'Makkiyah', description: 'Juga dikenal sebagai Surah Al-Masad. Berisi kutukan langsung kepada paman Nabi (Abu Lahab) dan istrinya (pembawa kayu bakar) yang akan binasa di dalam neraka yang bergejolak.' },
            { number: 112, name: 'Al-Ikhlas', nameArabic: 'الإخلاص', meaning: 'Memurnikan Keesaan', totalAyahs: 4, ayahRange: '1-4', type: 'Makkiyah', description: 'Sering disebut "Surah Tauhid". Menegaskan keesaan mutlak Allah (Ahad), tempat bergantung (Ash-Shamad), tidak beranak, tidak diperanakkan, dan tiada yang setara dengan-Nya. Pahalanya setara membaca 1/3 Al-Quran.' },
            { number: 113, name: 'Al-Falaq', nameArabic: 'الفلق', meaning: 'Waktu Subuh', totalAyahs: 5, ayahRange: '1-5', type: 'Makkiyah', description: 'Bersama An-Nas disebut "Al-Mu\'awwidzatain". Berisi doa permohonan perlindungan kepada Tuhan penguasa subuh dari kejahatan makhluk, kegelapan malam, penyihir (yang meniup buhul), dan orang dengki.' },
            { number: 114, name: 'An-Nas', nameArabic: 'الناس', meaning: 'Manusia', totalAyahs: 6, ayahRange: '1-6', type: 'Makkiyah', description: 'Surah penutup Al-Quran. Doa memohon perlindungan kepada Tuhannya manusia, Rajanya manusia, Sesembahannya manusia, dari bisikan (was-was) jin dan manusia yang bersembunyi di dalam dada.' },
        ],
        keywords: [
            'juz 30',
            'juz amma lengkap',
            'al ikhlas',
            'al falaq',
            'an nas',
            'al muawwidzatain',
            'iqra',
            'surah qulhu',
            'hafalan quran',
            'juz 30 37 surah'
        ],
        faq: [
            {
                question: 'Mengapa dinamakan Juz \'Amma?',
                answer: 'Disebut Juz \'Amma karena juz ini diawali dengan lafaz "‘Amma yatasā\'alūn" pada ayat pertama Surah An-Naba\'.'
            },
            {
                question: 'Apakah semua surah di Juz 30 diturunkan di Makkah (Makkiyah)?',
                answer: 'Mayoritas iya, namun ada tiga surah yang disepakati sebagai Madaniyah (turun setelah hijrah), yaitu Al-Bayyinah, Az-Zalzalah, dan An-Nasr.'
            },
            {
                question: 'Surah mana yang pahalanya setara dengan sepertiga Al-Quran?',
                answer: 'Surah Al-Ikhlas (Qul huwallahu ahad) karena esensi isinya mencakup sepertiga pokok ajaran Al-Quran, yaitu murni tentang Tauhid.'
            },
            {
                question: 'Apa itu Al-Mu\'awwidzatain?',
                answer: 'Al-Mu\'awwidzatain (Dua surah perlindungan) adalah sebutan untuk dua surah penutup Al-Quran, yakni Surah Al-Falaq dan Surah An-Nas, yang diajarkan untuk meruqyah/melindungi diri.'
            },
        ],
    }
};
