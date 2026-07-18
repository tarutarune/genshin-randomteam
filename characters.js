const characters = [
  {
    id: "traveler",
    name: "旅人",
    rarity: 5,
    element: "全元素",
    weapon: "片手剣",
    image: "images/Traveler.png"
  },

  {
    id: "venti",
    name: "ウェンティ",
    rarity: 5,
    element: "風",
    weapon: "弓",
    image: "images/Venti.png"
  },

  {
    id: "jean",
    name: "ジン",
    rarity: 5,
    element: "風",
    weapon: "片手剣",
    image: "images/Jean.png"
  },

  {
    id: "diluc",
    name: "ディルック",
    rarity: 5,
    element: "炎",
    weapon: "両手剣",
    image: "images/Diluc.png"
  },

  {
    id: "mona",
    name: "モナ",
    rarity: 5,
    element: "水",
    weapon: "法器",
    image: "images/Mona.png"
  },

  {
    id: "qiqi",
    name: "七七",
    rarity: 5,
    element: "氷",
    weapon: "片手剣",
    image: "images/Qiqi.png"
  },

  {
    id: "keqing",
    name: "刻晴",
    rarity: 5,
    element: "雷",
    weapon: "片手剣",
    image: "images/Keqing.png"
  },

  {
    id: "amber",
    name: "アンバー",
    rarity: 4,
    element: "炎",
    weapon: "弓",
    image: "images/Amber.png"
  },

  {
    id: "bennett",
    name: "ベネット",
    rarity: 4,
    element: "炎",
    weapon: "片手剣",
    image: "images/Bennett.png"
  },

  {
    id: "xiangling",
    name: "香菱",
    rarity: 4,
    element: "炎",
    weapon: "長柄武器",
    image: "images/Xiangling.png"
  },

  {
    id: "kaeya",
    name: "ガイア",
    rarity: 4,
    element: "氷",
    weapon: "片手剣",
    image: "images/Kaeya.png"
  },

  {
    id: "chongyun",
    name: "重雲",
    rarity: 4,
    element: "氷",
    weapon: "両手剣",
    image: "images/Chongyun.png"
  },

  {
    id: "xingqiu",
    name: "行秋",
    rarity: 4,
    element: "水",
    weapon: "片手剣",
    image: "images/Xingqiu.png"
  },

  {
    id: "barbara",
    name: "バーバラ",
    rarity: 4,
    element: "水",
    weapon: "法器",
    image: "images/Barbara.png"
  },

  {
    id: "razor",
    name: "レザー",
    rarity: 4,
    element: "雷",
    weapon: "両手剣",
    image: "images/Razor.png"
  },

  {
    id: "lisa",
    name: "リサ",
    rarity: 4,
    element: "雷",
    weapon: "法器",
    image: "images/Lisa.png"
  },

  {
    id: "fischl",
    name: "フィッシュル",
    rarity: 4,
    element: "雷",
    weapon: "弓",
    image: "images/Fischl.png"
  },

  {
    id: "noelle",
    name: "ノエル",
    rarity: 4,
    element: "岩",
    weapon: "両手剣",
    image: "images/Noelle.png"
  },

  {
    id: "ningguang",
    name: "凝光",
    rarity: 4,
    element: "岩",
    weapon: "法器",
    image: "images/Ningguang.png"
  },

  {
    id: "beidou",
    name: "北斗",
    rarity: 4,
    element: "雷",
    weapon: "両手剣",
    image: "images/Beidou.png"
  },

  {
    id: "sucrose",
    name: "スクロース",
    rarity: 4,
    element: "風",
    weapon: "法器",
    image: "images/Sucrose.png"
  },

  {
    id: "klee",
    name: "クレー",
    rarity: 5,
    element: "炎",
    weapon: "法器",
    image: "images/Klee.png"
  },

  {
    id: "tartaglia",
    name: "タルタリヤ",
    rarity: 5,
    element: "水",
    weapon: "弓",
    image: "images/Tartaglia.png"
  },

  {
    id: "diona",
    name: "ディオナ",
    rarity: 4,
    element: "氷",
    weapon: "弓",
    image: "images/Diona.png"
  },

  {
    id: "zhongli",
    name: "鍾離",
    rarity: 5,
    element: "岩",
    weapon: "長柄武器",
    image: "images/Zhongli.png"
  },

  {
    id: "xinyan",
    name: "辛炎",
    rarity: 4,
    element: "炎",
    weapon: "両手剣",
    image: "images/Xinyan.png"
  },

  {
    id: "albedo",
    name: "アルベド",
    rarity: 5,
    element: "岩",
    weapon: "片手剣",
    image: "images/Albedo.png"
  },

  {
    id: "ganyu",
    name: "甘雨",
    rarity: 5,
    element: "氷",
    weapon: "弓",
    image: "images/Ganyu.png"
  },

  {
    id: "xiao",
    name: "魈",
    rarity: 5,
    element: "風",
    weapon: "長柄武器",
    image: "images/Xiao.png"
  },

  {
    id: "hu tao",
    name: "胡桃",
    rarity: 5,
    element: "炎",
    weapon: "長柄武器",
    image: "images/Hu Tao.png"
  },

  {
    id: "rosaria",
    name: "ロサリア",
    rarity: 4,
    element: "氷",
    weapon: "長柄武器",
    image: "images/Rosaria.png"
  },

  {
    id: "yanfei",
    name: "煙緋",
    rarity: 4,
    element: "炎",
    weapon: "法器",
    image: "images/Yanfei.png"
  },

  {
    id: "eula",
    name: "エウルア",
    rarity: 5,
    element: "氷",
    weapon: "両手剣",
    image: "images/Eula.png"
  },

  {
    id: "kaedehara kazuha",
    name: "楓原万葉",
    rarity: 5,
    element: "風",
    weapon: "片手剣",
    image: "images/Kaedehara Kazuha.png"
  },

  {
    id: "kamisato ayaka",
    name: "神里綾華",
    rarity: 5,
    element: "氷",
    weapon: "片手剣",
    image: "images/Kamisato Ayaka.png"
  },

  {
    id: "yoimiya",
    name: "宵宮",
    rarity: 5,
    element: "炎",
    weapon: "弓",
    image: "images/Yoimiya.png"
  },

  {
    id: "sayu",
    name: "早柚",
    rarity: 4,
    element: "風",
    weapon: "両手剣",
    image: "images/Sayu.png"
  },

  {
    id: "aloy",
    name: "アーロイ",
    rarity: 5,
    element: "氷",
    weapon: "弓",
    image: "images/Aloy.png"
  },

  {
    id: "raiden",
    name: "雷電将軍",
    rarity: 5,
    element: "雷",
    weapon: "長柄武器",
    image: "images/Raiden.png"
  },

  {
    id: "kujou sara",
    name: "九条裟羅",
    rarity: 4,
    element: "雷",
    weapon: "弓",
    image: "images/Kujou Sara.png"
  },

  {
    id: "sangonomiya kokomi",
    name: "珊瑚宮心海",
    rarity: 5,
    element: "水",
    weapon: "法器",
    image: "images/Sangonomiya Kokomi.png"
  },

  {
    id: "thoma",
    name: "トーマ",
    rarity: 4,
    element: "炎",
    weapon: "長柄武器",
    image: "images/Thoma.png"
  },

  {
    id: "arataki itto",
    name: "荒瀧一斗",
    rarity: 5,
    element: "岩",
    weapon: "両手剣",
    image: "images/Arataki Itto.png"
  },

  {
    id: "gorou",
    name: "ゴロー",
    rarity: 4,
    element: "岩",
    weapon: "弓",
    image: "images/Gorou.png"
  },

  {
    id: "shenhe",
    name: "申鶴",
    rarity: 5,
    element: "氷",
    weapon: "長柄武器",
    image: "images/Shenhe.png"
  },

  {
    id: "yun jin",
    name: "雲菫",
    rarity: 4,
    element: "岩",
    weapon: "長柄武器",
    image: "images/Yun Jin.png"
  },

  {
    id: "yae miko",
    name: "八重神子",
    rarity: 5,
    element: "雷",
    weapon: "法器",
    image: "images/Yae Miko.png"
  },

  {
    id: "kamisato ayato",
    name: "神里綾人",
    rarity: 5,
    element: "水",
    weapon: "片手剣",
    image: "images/Kamisato Ayato.png"
  },

  {
    id: "yelan",
    name: "夜蘭",
    rarity: 5,
    element: "水",
    weapon: "弓",
    image: "images/Yelan.png"
  },

  {
    id: "kuki shinobu",
    name: "久岐忍",
    rarity: 4,
    element: "雷",
    weapon: "片手剣",
    image: "images/Kuki Shinobu.png"
  },

  {
    id: "shikanoin heizou",
    name: "鹿野院平蔵",
    rarity: 4,
    element: "風",
    weapon: "法器",
    image: "images/Shikanoin Heizou.png"
  },

  {
    id: "tighnari",
    name: "ティナリ",
    rarity: 5,
    element: "草",
    weapon: "弓",
    image: "images/Tighnari.png"
  },

  {
    id: "collei",
    name: "コレイ",
    rarity: 4,
    element: "草",
    weapon: "弓",
    image: "images/Collei.png"
  },

  {
    id: "dori",
    name: "ドリー",
    rarity: 4,
    element: "雷",
    weapon: "両手剣",
    image: "images/Dori.png"
  },

  {
    id: "cyno",
    name: "セノ",
    rarity: 5,
    element: "雷",
    weapon: "長柄武器",
    image: "images/Cyno.png"
  },

  {
    id: "candace",
    name: "キャンディス",
    rarity: 4,
    element: "水",
    weapon: "長柄武器",
    image: "images/Candace.png"
  },

  {
    id: "nilou",
    name: "ニィロウ",
    rarity: 5,
    element: "水",
    weapon: "片手剣",
    image: "images/Nilou.png"
  },

  {
    id: "nahida",
    name: "ナヒーダ",
    rarity: 5,
    element: "草",
    weapon: "法器",
    image: "images/Nahida.png"
  },

  {
    id: "layla",
    name: "レイラ",
    rarity: 4,
    element: "氷",
    weapon: "片手剣",
    image: "images/Layla.png"
  },

  {
    id: "wanderer",
    name: "放浪者",
    rarity: 5,
    element: "風",
    weapon: "法器",
    image: "images/Wanderer.png"
  },

  {
    id: "faruzan",
    name: "ファルザン",
    rarity: 4,
    element: "風",
    weapon: "弓",
    image: "images/Faruzan.png"
  },

  {
    id: "alhaitham",
    name: "アルハイゼン",
    rarity: 5,
    element: "草",
    weapon: "片手剣",
    image: "images/Alhaitham.png"
  },

  {
    id: "yaoyao",
    name: "ヨォーヨ",
    rarity: 4,
    element: "草",
    weapon: "長柄武器",
    image: "images/Yaoyao.png"
  },

  {
    id: "dehya",
    name: "ディシア",
    rarity: 5,
    element: "炎",
    weapon: "両手剣",
    image: "images/Dehya.png"
  },

  {
    id: "mika",
    name: "ミカ",
    rarity: 4,
    element: "氷",
    weapon: "長柄武器",
    image: "images/Mika.png"
  },

  {
    id: "baizhu",
    name: "白朮",
    rarity: 5,
    element: "草",
    weapon: "法器",
    image: "images/Baizhu.png"
  },

  {
    id: "kaveh",
    name: "カーヴェ",
    rarity: 4,
    element: "草",
    weapon: "両手剣",
    image: "images/Kaveh.png"
  },

  {
    id: "kirara",
    name: "綺良々",
    rarity: 4,
    element: "草",
    weapon: "片手剣",
    image: "images/Kirara.png"
  },

  {
    id: "lyney",
    name: "リネ",
    rarity: 5,
    element: "炎",
    weapon: "弓",
    image: "images/Lyney.png"
  },

  {
    id: "lynette",
    name: "リネット",
    rarity: 4,
    element: "風",
    weapon: "片手剣",
    image: "images/Lynette.png"
  },

  {
    id: "freminet",
    name: "フレミネ",
    rarity: 4,
    element: "氷",
    weapon: "両手剣",
    image: "images/Freminet.png"
  },

  {
    id: "neuvillette",
    name: "ヌヴィレット",
    rarity: 5,
    element: "水",
    weapon: "法器",
    image: "images/Neuvillette.png"
  },

  {
    id: "wriothesley",
    name: "リオセスリ",
    rarity: 5,
    element: "氷",
    weapon: "法器",
    image: "images/Wriothesley.png"
  },

  {
    id: "furina",
    name: "フリーナ",
    rarity: 5,
    element: "水",
    weapon: "片手剣",
    image: "images/Furina.png"
  },

  {
    id: "charlotte",
    name: "シャルロット",
    rarity: 4,
    element: "氷",
    weapon: "法器",
    image: "images/Charlotte.png"
  },

  {
    id: "navia",
    name: "ナヴィア",
    rarity: 5,
    element: "岩",
    weapon: "両手剣",
    image: "images/Navia.png"
  },

  {
    id: "chevreuse",
    name: "シュヴルーズ",
    rarity: 4,
    element: "炎",
    weapon: "長柄武器",
    image: "images/Chevreuse.png"
  },

  {
    id: "xianyun",
    name: "閑雲",
    rarity: 5,
    element: "風",
    weapon: "法器",
    image: "images/Xianyun.png"
  },

  {
    id: "gaming",
    name: "嘉明",
    rarity: 4,
    element: "炎",
    weapon: "両手剣",
    image: "images/Gaming.png"
  },

  {
    id: "chiori",
    name: "千織",
    rarity: 5,
    element: "岩",
    weapon: "片手剣",
    image: "images/Chiori.png"
  },

  {
    id: "arlecchino",
    name: "アルレッキーノ",
    rarity: 5,
    element: "炎",
    weapon: "長柄武器",
    image: "images/Arlecchino.png"
  },

  {
    id: "clorinde",
    name: "クロリンデ",
    rarity: 5,
    element: "雷",
    weapon: "片手剣",
    image: "images/Clorinde.png"
  },

  {
    id: "sigewinne",
    name: "シグウィン",
    rarity: 5,
    element: "水",
    weapon: "弓",
    image: "images/Sigewinne.png"
  },

  
  {
    id: "sethos",
    name: "セトス",
    rarity: 4,
    element: "雷",
    weapon: "弓",
    image: "images/Sethos.png"
  },


  {
    id: "emilie",
    name: "エミリエ",
    rarity: 5,
    element: "草",
    weapon: "長柄武器",
    image: "images/Emilie.png"
  },

  {
    id: "mualani",
    name: "ムアラニ",
    rarity: 5,
    element: "水",
    weapon: "法器",
    image: "images/Mualani.png"
  },

  {
    id: "kachina",
    name: "カチーナ",
    rarity: 4,
    element: "岩",
    weapon: "長柄武器",
    image: "images/Kachina.png"
  },

  {
    id: "kinich",
    name: "キィニチ",
    rarity: 5,
    element: "草",
    weapon: "両手剣",
    image: "images/Kinich.png"
  },

  {
    id: "xilonen",
    name: "シロネン",
    rarity: 5,
    element: "岩",
    weapon: "片手剣",
    image: "images/Xilonen.png"
  },

  {
    id: "chasca",
    name: "チャスカ",
    rarity: 5,
    element: "風",
    weapon: "弓",
    image: "images/Chasca.png"
  },

  {
    id: "ororon",
    name: "オロルン",
    rarity: 4,
    element: "雷",
    weapon: "弓",
    image: "images/Ororon.png"
  },

  {
    id: "mavuika",
    name: "マーヴィカ",
    rarity: 5,
    element: "炎",
    weapon: "両手剣",
    image: "images/Mavuika.png"
  },

  {
    id: "citlali",
    name: "シトラリ",
    rarity: 5,
    element: "氷",
    weapon: "法器",
    image: "images/Citlali.png"
  },

  {
    id: "lan yan",
    name: "藍硯",
    rarity: 4,
    element: "風",
    weapon: "法器",
    image: "images/Lan Yan.png"
  },

  {
    id: "yumemizuki mizuki",
    name: "夢見月瑞希",
    rarity: 5,
    element: "風",
    weapon: "法器",
    image: "images/Yumemizuki Mizuki.png"
  },

  {
    id: "varesa",
    name: "ヴァレサ",
    rarity: 5,
    element: "雷",
    weapon: "法器",
    image: "images/Varesa.png"
  },

  {
    id: "iansan",
    name: "イアンサ",
    rarity: 4,
    element: "雷",
    weapon: "長柄武器",
    image: "images/Iansan.png"
  },

  {
    id: "escofier",
    name: "エスコフィエ",
    rarity: 5,
    element: "氷",
    weapon: "長柄武器",
    image: "images/Escofier.png"
  },

  {
    id: "ifa",
    name: "イファ",
    rarity: 4,
    element: "風",
    weapon: "法器",
    image: "images/Ifa.png"
  },

  {
    id: "skirk",
    name: "スカーク",
    rarity: 5,
    element: "氷",
    weapon: "片手剣",
    image: "images/Skirk.png"
  },

  {
    id: "dahlia",
    name: "ダリア",
    rarity: 4,
    element: "水",
    weapon: "法器",
    image: "images/Dahlia.png"
  },

  {
    id: "ineffa",
    name: "イネファ",
    rarity: 5,
    element: "雷",
    weapon: "長柄武器",
    image: "images/Ineffa.png"
  },

  {
    id: "lauma",
    name: "ラウマ",
    rarity: 5,
    element: "草",
    weapon: "法器",
    image: "images/Lauma.png"
  },

  {
    id: "aino",
    name: "アイノ",
    rarity: 4,
    element: "水",
    weapon: "両手剣",
    image: "images/Aino.png"
  },

  {
    id: "flins",
    name: "フリンズ",
    rarity: 5,
    element: "雷",
    weapon: "長柄武器",
    image: "images/Flins.png"
  },

  {
    id: "nefer",
    name: "ネフェル",
    rarity: 5,
    element: "草",
    weapon: "法器",
    image: "images/Nefer.png"
  },

  {
    id: "durin",
    name: "ドゥリン",
    rarity: 5,
    element: "炎",
    weapon: "片手剣",
    image: "images/Durin.png"
  },

  {
    id: "jahoda",
    name: "ヤフォダ",
    rarity: 4,
    element: "風",
    weapon: "弓",
    image: "images/Jahoda.png"
  },

  {
    id: "illuga",
    name: "イルーガ",
    rarity: 4,
    element: "岩",
    weapon: "長柄武器",
    image: "images/Illuga.png"
  },

  {
    id: "zibai",
    name: "兹白",
    rarity: 5,
    element: "岩",
    weapon: "片手剣",
    image: "images/Zibai.png"
  },

  {
    id: "columbina",
    name: "コロンビーナ",
    rarity: 5,
    element: "水",
    weapon: "法器",
    image: "images/Columbina.png"
  },

  {
    id: "varka",
    name: "ファルカ",
    rarity: 5,
    element: "風",
    weapon: "両手剣",
    image: "images/Varka.png"
  },

  {
    id: "linnea",
    name: "リンネア",
    rarity: 5,
    element: "岩",
    weapon: "弓",
    image: "images/Linnea.png"
  },

  {
    id: "nicole",
    name: "ニコ",
    rarity: 5,
    element: "炎",
    weapon: "法器",
    image: "images/Nicole.png"
  },

  {
    id: "prune",
    name: "プルーネ",
    rarity: 4,
    element: "風",
    weapon: "両手剣",
    image: "images/Prune.png"
  },

  {
    id: "lohen",
    name: "ローエン",
    rarity: 5,
    element: "氷",
    weapon: "長柄武器",
    image: "images/Lohen.png"
  },

    {
    id: "Sandrone",
    name: "サンドローネ",
    rarity: 5,
    element: "氷",
    weapon: "両手剣",
    image: "images/Sandrone.png"
  }
];
