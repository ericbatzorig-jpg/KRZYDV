import { WorkItem, FactItem, CareerPlanStep } from '../types';

export const BASE_NETLIFY_URL = 'https://rococo-parfait-b5fafe.netlify.app/';

/**
 * 10 cards corresponding directly to the 10 video grid tiles
 * "Миний бүтээлүүд": нэг жагсаалт (array), карт бүр шинэ цонхонд нээгдэнэ.
 */
export const myWorks: WorkItem[] = [
  {
    id: 1,
    title: 'Тоглоом хөгжүүлэгч',
    subtitle: 'MY DREAM JOB',
    category: 'Мөрөөдөл',
    link: `${BASE_NETLIFY_URL}Тоглоом хөгжүүлэгч.html`,
    description: 'Тоглоом бүтээх, шинэ ертөнц зохион бүтээх ба тоглоомын моод хийх миний мөрөөдөл.',
    tileIndex: 0,
    badge: 'Үндсэн төсөл'
  },
  {
    id: 2,
    title: '10 жилийн дараа: Банкир',
    subtitle: 'Хөрөнгө оруулалт & Зуучлал',
    category: 'Зорилго',
    link: `${BASE_NETLIFY_URL}index.html`,
    description: 'Зуучлал, эрсдэл ба хөрөнгө оруулалт. Мөнгөний хомсдолгүй бие даасан ирээдүй.',
    tileIndex: 1,
    badge: 'Ирээдүй'
  },
  {
    id: 3,
    title: 'AI + Код: Тоглоом бүтээх & Хак',
    subtitle: 'AI & Game Modding',
    category: 'Ур чадвар',
    link: `${BASE_NETLIFY_URL}Тоглоом хөгжүүлэгч.html`,
    description: 'Хиймэл оюун болон кодчлол ашиглан тоглоом бүтээх, моод хийх сонирхол.',
    tileIndex: 2
  },
  {
    id: 4,
    title: 'Temple Run 2 & Тоглоомын хобби',
    subtitle: 'Дуртай тоглоом',
    category: 'Тоглоом',
    link: `${BASE_NETLIFY_URL}Тоглоом хөгжүүлэгч.html`,
    description: 'Хурд, рефлекс шаарддаг миний хамгийн дуртай гар утасны тоглоом.',
    tileIndex: 3
  },
  {
    id: 5,
    title: 'Динзагийн бүх 46 цуврал',
    subtitle: 'Танин мэдэхүйн номууд',
    category: 'Уншсан ном',
    link: `${BASE_NETLIFY_URL}index.html`,
    description: 'Эх орны бахархалт Динзагийн 46 цуврал номыг нэг бүрчлэн бүрэн уншсан амжилт.',
    tileIndex: 4,
    badge: '46 ном'
  },
  {
    id: 6,
    title: 'Хөл бөмбөг тоглох хобби',
    subtitle: 'Спорт & Багийн ажиллагаа',
    category: 'Хобби',
    link: `${BASE_NETLIFY_URL}index.html`,
    description: 'Чөлөөт цагаа үр дүнтэй өнгөрүүлж, найзуудтайгаа хөл бөмбөг тоглох дуртай.',
    tileIndex: 5
  },
  {
    id: 7,
    title: 'HTML, CSS & JavaScript анхан шат',
    subtitle: 'Вэб кодчилол',
    category: 'Сургалт',
    link: `${BASE_NETLIFY_URL}index.html`,
    description: 'Одоо курст суралцаж, вэб хөгжүүлэлтийн анхны суурь мэдлэгээ эзэмшиж байна.',
    tileIndex: 6
  },
  {
    id: 8,
    title: 'Ээжийн хуушуур, бууз, банш',
    subtitle: 'Хамгийн дуртай хоол',
    category: 'Сонирхолтой факт',
    link: `${BASE_NETLIFY_URL}index.html`,
    description: 'Ээжийн хайраар амталж хийсэн уламжлалт монгол амтат хоолнууд.',
    tileIndex: 7
  },
  {
    id: 9,
    title: 'Maroon 5 & Despicable Me',
    subtitle: 'Хөгжим ба Хөдөлгөөнт кино',
    category: 'Уран бүтээл',
    link: `${BASE_NETLIFY_URL}index.html`,
    description: 'Дуртай хамтлаг: Maroon 5. Дуртай кино: Despicable Me 1, 2, 3, 4 цуврал.',
    tileIndex: 8
  },
  {
    id: 10,
    title: 'Эрхсоёрхууны эх портфолио',
    subtitle: 'Нүүр хуудас',
    category: 'Эх хувилбар',
    link: `${BASE_NETLIFY_URL}index.html`,
    description: '15 настайдаа бичсэн миний анхны вэб хуудас ба дурсамж.',
    tileIndex: 9,
    badge: 'Эх хуудас'
  }
];

export const personalFacts: FactItem[] = [
  {
    id: 1,
    label: 'Дуртай хоол',
    value: 'Ээжийн гараар хийсэн Хуушуур, бууз ба банш',
    iconName: 'Utensils'
  },
  {
    id: 2,
    label: 'Дуртай тоглоом',
    value: 'Temple Run 2 (Тоглоом бүтээх сонирхол)',
    iconName: 'Gamepad2'
  },
  {
    id: 3,
    label: 'Амьтан',
    value: 'Гэрт минь ямар ч амьтан байхгүй',
    iconName: 'Heart'
  },
  {
    id: 4,
    label: 'Номын амжилт',
    value: 'Динзагийн БҮХ 46 цувралыг бүрэн уншсан!',
    iconName: 'BookOpen'
  },
  {
    id: 5,
    label: 'Хэн ч мэдэхгүй нууц',
    value: 'Ямар ч насны охидууд ба хүүхнүүд миний анхаарлыг маш АМАРХАН сарниулж чаддаг',
    iconName: 'Sparkles'
  }
];

export const bankerPlan: CareerPlanStep[] = [
  {
    period: 'Одоо',
    title: 'HTML, CSS ба JavaScript',
    desc: 'Энэ курст сууж программ хангамж, вэб хөгжүүлэлтийн сууриа тавьж байна.'
  },
  {
    period: 'Энэ жил',
    title: 'Анхны санхүүгийн хэмнэлт',
    desc: 'Өөрийн хуримтлал, санхүүгээ удирдаж анхны хэмнэлтээ хийнэ.'
  },
  {
    period: 'Сургуульд',
    title: 'Математик & Гадаад хэл',
    desc: 'Тоондоо улам хичээж, олон гадаад хэл судалж өөрийгөө хөгжүүлнэ.'
  },
  {
    period: 'Ирээдүйд',
    title: 'Програмчлал & Банк Санхүү',
    desc: 'Их дээд сургуульд програмчлал, санхүүгийн чиглэлээр гүнзгийрүүлэн суралцана.'
  }
];
