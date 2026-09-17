export interface PortfolioWork {
  workId: string;
  title: string;
  year: string;
  medium: string;
  status: 'In Drop 001' | 'Sold' | 'In Private Collection' | 'Available';
  dppHash: string;
  image: string;
  imageAlt: string;
  estimateLow?: number;
  estimateHigh?: number;
  soldPrice?: number;
  linkedLotId?: string;
  linkedMarketplaceId?: string;
  provenanceChain: {date: string;event: string;}[];
}

export interface BTSPost {
  id: string;
  type: 'photo' | 'video' | 'text';
  caption: string;
  timestamp: string;
  image?: string;
  imageAlt?: string;
}

export interface ArtistAward {
  year: string;
  title: string;
  body: string;
}

export interface Artist {
  id: string;
  name: string;
  note: string;
  school: string;
  bio: string;
  studioLocation: string;
  heroImage: string;
  heroImageAlt: string;
  avatarImage: string;
  avatarImageAlt: string;
  portfolioWorks: PortfolioWork[];
  btsFeed: BTSPost[];
  followerCount: number;
  activeLotIds: string[];
  cohort?: string;
  awards?: ArtistAward[];
  totalSalesValue?: string;
  exhibitionCount?: number;
  yearsActive?: string;
  specialisation?: string;
  website?: string;
  instagram?: string;
}

export const artists: Artist[] = [
{
  id: 'aarav-mehta',
  name: 'Aarav Mehta',
  note: 'Udaipur Residency Cohort · Contemporary Canvases',
  school: 'Udaipur Residency Cohort',
  bio: 'Aarav Mehta works at the intersection of monsoon memory and contemporary abstraction. Trained under the Udaipur Residency programme, his canvases layer 24K gold leaf over Belgian linen to capture the luminous quality of Rajasthani light at dusk. His practice is rooted in the idea that landscape is not observed but felt — each work a slow accumulation of atmospheric pressure.',
  studioLocation: 'Udaipur, Rajasthan',
  heroImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_173e420da-1772355767113.png',
  heroImageAlt: 'Aarav Mehta studio with large canvas showing monsoon blues and gold leaf on Belgian linen',
  avatarImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_1e94368a9-1785832789097.png',
  avatarImageAlt: 'Portrait of artist Aarav Mehta in his Udaipur studio',
  followerCount: 412,
  activeLotIds: ['lot-01', 'lot-04'],
  cohort: 'Udaipur Residency Cohort',
  specialisation: 'Contemporary Abstraction · Gold Leaf',
  yearsActive: '2015–Present',
  exhibitionCount: 14,
  totalSalesValue: '₹1.2 Cr',
  awards: [
  { year: '2024', title: 'IAH Emerging Artist Award', body: 'Indian Auction House' },
  { year: '2022', title: 'Kochi-Muziris Biennale Satellite Selection', body: 'KMB Foundation' },
  { year: '2020', title: 'Lalit Kala Akademi Fellowship', body: 'Government of India' }],

  portfolioWorks: [
  {
    workId: 'am-001',
    title: 'Echoes of Monsoon over Pichola',
    year: '2024',
    medium: 'Oil & 24K Gold on Belgian Linen',
    status: 'In Drop 001',
    dppHash: '0x3a1f9c2b4e8d7a0c5f2e1b9d3c6a8f4e2b7d1c9a',
    image: 'https://images.unsplash.com/photo-1717239171197-a384912935fd',
    imageAlt: 'Vibrant contemporary Indian painting with monsoon blues and golden sunburst on dark canvas',
    estimateLow: 280000,
    estimateHigh: 380000,
    linkedLotId: 'lot-01',
    provenanceChain: [
    { date: '2024', event: 'Created in Udaipur studio — Belgian linen sourced from Ghent' },
    { date: 'Jan 2025', event: 'Exhibited at Kochi-Muziris Biennale satellite show' },
    { date: 'Mar 2026', event: 'Consigned to IAH Drop 001 — NFC chip embedded' }]

  },
  {
    workId: 'am-002',
    title: 'Geometric Meditations',
    year: '2023',
    medium: 'Raw Earth Pigments on Canvas',
    status: 'In Drop 001',
    dppHash: '0x7b2e4d1a9c3f8e5b0d6a2c4f7e1b3d9a5c8f2e4b',
    image: 'https://images.unsplash.com/photo-1566153509069-6aa29a1f9921',
    imageAlt: 'Abstract geometric Indian painting with earth tones and ochre pigments on textured canvas',
    estimateLow: 150000,
    estimateHigh: 220000,
    linkedLotId: 'lot-04',
    provenanceChain: [
    { date: '2023', event: 'Completed in Udaipur studio — earth pigments sourced from Jodhpur quarries' },
    { date: 'Nov 2023', event: 'Acquired by private collector, Mumbai' },
    { date: 'Feb 2026', event: 'Re-consigned to IAH — provenance verified by Dr. R. Sen' }]

  },
  {
    workId: 'am-003',
    title: 'Aravalli at First Light',
    year: '2022',
    medium: 'Acrylic & Gold Dust on Canvas',
    status: 'In Private Collection',
    dppHash: '0x1c9e5a3d7f2b8e4c0a6d3f9b1e7c5a2d8f4b6e3c',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_139f883b4-1781359359601.png',
    imageAlt: 'Sunrise over Aravalli hills rendered in warm gold and amber acrylic on canvas',
    soldPrice: 420000,
    provenanceChain: [
    { date: '2022', event: 'Created during Udaipur Residency first cohort' },
    { date: 'Jun 2022', event: 'Acquired by Tata Trusts Art Collection, Mumbai' }]

  },
  {
    workId: 'am-004',
    title: 'Monsoon Raga III',
    year: '2021',
    medium: 'Oil on Linen',
    status: 'Sold',
    dppHash: '0x5d8b2f4a1e9c7d3b6f0e2a4c8d1f5b9e3a7c2d6f',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_139f883b4-1781359359601.png',
    imageAlt: 'Deep blue monsoon landscape with gestural brushwork on natural linen',
    soldPrice: 3200000,
    provenanceChain: [
    { date: '2021', event: 'Created in Udaipur studio' },
    { date: "Dec 2021", event: "Sold at Christie's South Asian Art, London — £42,000" }]

  }],

  btsFeed: [
  {
    id: 'bts-am-01',
    type: 'photo',
    caption: 'Laying the first gold leaf layer on the new 60×80 canvas. The linen has to be completely dry — any moisture and the leaf lifts. Three days of gesso, two of sizing. Now we begin.',
    timestamp: '2026-09-08T09:15:00Z',
    image: 'https://images.unsplash.com/photo-1602615008471-4fe8ffed22a7',
    imageAlt: 'Artist hands applying gold leaf to large canvas in studio with natural light'
  },
  {
    id: 'bts-am-02',
    type: 'text',
    caption: "The monsoon this year was different. Heavier, slower. I spent three weeks just watching the lake — the way the light breaks through cloud cover at 6am is unlike anything I've seen in ten years here. That's what Drop 001 is trying to hold.",
    timestamp: '2026-09-05T14:30:00Z'
  },
  {
    id: 'bts-am-03',
    type: 'photo',
    caption: "Pigment mixing session. These earth tones come from Jodhpur quarries — the same ochre the Mehrangarh fort walls are made of. I grind them myself. It takes four hours for a single session's worth.",
    timestamp: '2026-09-01T11:00:00Z',
    image: 'https://images.unsplash.com/photo-1562749481-32ea4e8cffc3',
    imageAlt: 'Close-up of artist mixing earth pigments in ceramic bowls on wooden studio table'
  },
  {
    id: 'bts-am-04',
    type: 'text',
    caption: "IAH's NFC embedding process is fascinating. Dr. Sen's team spent two hours with the finished canvas — UV scan, pigment stability test, then the chip goes into the stretcher bar. The DPP is live the moment the chip is sealed.",
    timestamp: '2026-08-28T16:45:00Z'
  }]

},
{
  id: 'master-kalyan-sharma',
  name: 'Master Kalyan Sharma',
  note: 'Nathdwara Guild · 4th Generation Pichwai Master',
  school: 'Nathdwara Guild',
  bio: 'Master Kalyan Sharma is a fourth-generation Pichwai painter from Nathdwara, the sacred town in Rajasthan where this tradition was born in the 17th century. His works are painted on hand-spun cotton using natural stone pigments — lapis lazuli, malachite, cinnabar — ground in the same manner as his great-grandfather. Each Pichwai takes between three and eighteen months to complete. His Shri Nathji compositions are considered among the finest produced in the living tradition.',
  studioLocation: 'Nathdwara, Rajasthan',
  heroImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_4b2528b89-1789076766885.png',
  heroImageAlt: 'Master Kalyan Sharma studio with traditional Pichwai paintings in progress on cotton fabric',
  avatarImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_1f188cfaf-1784475295626.png',
  avatarImageAlt: 'Portrait of Master Kalyan Sharma in traditional Nathdwara studio',
  followerCount: 287,
  activeLotIds: ['lot-02'],
  cohort: 'Nathdwara Lineage Workshops',
  specialisation: 'Pichwai · Natural Stone Pigments',
  yearsActive: '1985–Present',
  exhibitionCount: 31,
  totalSalesValue: '₹3.8 Cr',
  awards: [
  { year: '2023', title: 'National Award for Master Craftsperson', body: 'Ministry of Textiles, India' },
  { year: '2018', title: 'Shilp Guru Award', body: 'Development Commissioner for Handicrafts' },
  { year: '2010', title: 'GI Tag Certification', body: 'Rajasthan Handicrafts Board' }],

  portfolioWorks: [
  {
    workId: 'ks-001',
    title: 'Shri Nathji Kamal Talai',
    year: '2024',
    medium: 'Natural Stone Pigment on Cotton',
    status: 'In Drop 001',
    dppHash: '0x9f1c3e5a7b2d4f8e0c6a1d3f7b9e2c4a6d8f0b2e',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_44ecd4a6a-1789076766499.png",
    imageAlt: 'Traditional Indian folk painting with rich jewel tones on warm earthy background',
    estimateLow: 850000,
    estimateHigh: 1200000,
    linkedLotId: 'lot-02',
    provenanceChain: [
    { date: '2022–2024', event: 'Painted over 18 months in Nathdwara studio — lapis lazuli sourced from Afghanistan' },
    { date: 'Jan 2026', event: 'GI-Tag certification issued by Rajasthan Handicrafts Board' },
    { date: 'Mar 2026', event: 'Consigned to IAH Drop 001' }]

  },
  {
    workId: 'ks-002',
    title: 'Govardhan Puja Mahotsav',
    year: '2021',
    medium: 'Natural Stone Pigment on Cotton',
    status: 'In Private Collection',
    dppHash: '0x4a8c2e6f1b9d3a7e5c0f4b8d2a6e0c4f8b2d6a0e',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1533f7c3e-1765792410795.png",
    imageAlt: 'Detailed Pichwai painting depicting Govardhan festival with hundreds of figures in jewel tones',
    soldPrice: 1850000,
    provenanceChain: [
    { date: '2019–2021', event: 'Painted over 24 months — largest work in the Sharma family tradition' },
    { date: 'Aug 2021', event: 'Acquired by Crafts Museum, New Delhi — permanent collection' }]

  },
  {
    workId: 'ks-003',
    title: 'Raas Leela at Vrindavan',
    year: '2019',
    medium: 'Natural Stone Pigment & Gold on Cotton',
    status: 'Sold',
    dppHash: '0x2b6d0f4a8c1e5b9d3f7a1c5e9b3d7f1a5c9e3b7d',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_151efa678-1774031059679.png",
    imageAlt: 'Raas Leela scene with Krishna and gopis in traditional Pichwai style with gold accents',
    soldPrice: 1850000,
    provenanceChain: [
    { date: '2018–2019', event: 'Painted in Nathdwara studio' },
    { date: "Oct 2019", event: "Sold at Sotheby's Mumbai — ₹18,50,000" }]

  }],

  btsFeed: [
  {
    id: 'bts-ks-01',
    type: 'photo',
    caption: 'Grinding lapis lazuli this morning. This stone came from the same Afghan mine my grandfather used. The colour you get from stone is alive in a way synthetic pigment never is — it shifts with the light.',
    timestamp: '2026-09-07T08:00:00Z',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_4b0a72a0b-1789076765795.png',
    imageAlt: 'Stone pigment grinding process with lapis lazuli and malachite on traditional grinding stone'
  },
  {
    id: 'bts-ks-02',
    type: 'text',
    caption: 'The Kamal Talai composition took 18 months. The lotus pond alone has 340 individual flowers — each one painted with a single-hair brush. My father could do 60 in a day. I manage 40. My son does 80. The tradition improves.',
    timestamp: '2026-09-03T10:30:00Z'
  },
  {
    id: 'bts-ks-03',
    type: 'photo',
    caption: 'Cotton preparation — the fabric is hand-spun in Nathdwara and sized with tamarind seed paste before any pigment touches it. This is the same process from the 17th century. We do not change what works.',
    timestamp: '2026-08-25T09:15:00Z',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1b42f5544-1779099279397.png',
    imageAlt: 'Hand-spun cotton fabric being prepared with traditional sizing paste in Nathdwara studio'
  }]

},
{
  id: 'swaminathan-sthapati',
  name: 'Swaminathan Sthapati',
  note: 'Swamimalai Guild · Classical Bronze Tradition',
  school: 'Swamimalai Guild',
  bio: 'Swaminathan Sthapati is a master bronze caster from Swamimalai, Tamil Nadu — the epicentre of the Chola bronze tradition. His family has practised the lost-wax (cire perdue) method for eleven generations, producing works for temples across South India and for major international museum collections. His Nataraja compositions are considered the finest produced in the living tradition, adhering strictly to the Agamic proportional canon (tala system) while achieving a sculptural vitality that distinguishes his work from workshop production.',
  studioLocation: 'Swamimalai, Tamil Nadu',
  heroImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_1eeae18a3-1766382467341.png',
  heroImageAlt: 'Classical bronze Nataraja sculpture in casting studio with traditional tools and wax models',
  avatarImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_4140950b2-1789076766329.png',
  avatarImageAlt: 'Portrait of Swaminathan Sthapati in his Swamimalai bronze casting studio',
  followerCount: 631,
  activeLotIds: ['lot-03'],
  cohort: 'Nathdwara Lineage Workshops',
  specialisation: 'Panchaloha Bronze · Lost-Wax Casting',
  yearsActive: '1978–Present',
  exhibitionCount: 47,
  totalSalesValue: '₹9.4 Cr',
  awards: [
  { year: '2021', title: 'Padma Shri', body: 'Government of India' },
  { year: '2015', title: 'UNESCO Living Human Treasure', body: 'UNESCO' },
  { year: '2008', title: 'National Award for Traditional Crafts', body: 'Ministry of Culture' }],

  portfolioWorks: [
  {
    workId: 'ss-001',
    title: 'Cosmic Tandava Nataraja',
    year: '2023',
    medium: 'Panchaloha Lost-Wax Bronze',
    status: 'In Drop 001',
    dppHash: '0x6e2a8c4f0b9d1e7a3c5f8b2d4a6e0c8f1b3d5a7e',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_4140950b2-1789076766329.png",
    imageAlt: 'Classical bronze sculpture with dark patina against neutral studio background',
    estimateLow: 2200000,
    estimateHigh: 3500000,
    linkedLotId: 'lot-03',
    provenanceChain: [
    { date: '2021–2023', event: 'Cast over 18 months — wax model, clay investment, bronze pour, cold-work finishing' },
    { date: 'Dec 2023', event: 'Consecration ceremony at Swamimalai Murugan Temple' },
    { date: 'Feb 2026', event: 'Consigned to IAH — NFC embedded in base plinth' }]

  },
  {
    workId: 'ss-002',
    title: 'Ardhanarishvara',
    year: '2020',
    medium: 'Panchaloha Lost-Wax Bronze',
    status: 'In Private Collection',
    dppHash: '0x3f7b1d5a9e2c6f0b4d8a2e6c0f4b8d2a6e0c4f8b',
    image: "https://images.unsplash.com/photo-1586987480884-fb9c18f16fda",
    imageAlt: 'Bronze Ardhanarishvara figure with fine detail work and traditional dark patina',
    soldPrice: 5800000,
    provenanceChain: [
    { date: '2018–2020', event: 'Cast in Swamimalai studio — panchaloha alloy per Agamic specification' },
    { date: 'Mar 2020', event: 'Acquired by National Museum, New Delhi — permanent collection' }]

  },
  {
    workId: 'ss-003',
    title: 'Dakshinamurti',
    year: '2017',
    medium: 'Panchaloha Lost-Wax Bronze',
    status: 'Sold',
    dppHash: '0x8c4e0a6d2f8b4e0a6d2f8b4e0a6d2f8b4e0a6d2f',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_433820c18-1789076766497.png",
    imageAlt: 'Seated Dakshinamurti bronze with intricate crown and jewellery detailing',
    soldPrice: 6800000,
    provenanceChain: [
    { date: '2015–2017', event: 'Cast in Swamimalai studio' },
    { date: 'Jun 2017', event: "Sold at Bonhams Indian & Islamic Art, London — £68,000" }]

  }],

  btsFeed: [
  {
    id: 'bts-ss-01',
    type: 'photo',
    caption: 'The wax model for the new Nataraja commission — 48 inches. The prabhavali (flame aureole) alone has 108 individual flame tongues. Each one is shaped by hand, then attached to the main figure. This stage takes three months.',
    timestamp: '2026-09-06T07:30:00Z',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_4d24a5f09-1789508291487.png",
    imageAlt: 'Wax model of Nataraja in progress showing detailed flame aureole being assembled by hand'
  },
  {
    id: 'bts-ss-02',
    type: 'text',
    caption: 'The panchaloha ratio for this casting: copper 80%, zinc 9%, tin 7%, lead 3%, gold 1%. The gold is not decorative — it is ritual. The Agamas specify it. We do not deviate.',
    timestamp: '2026-09-02T12:00:00Z'
  },
  {
    id: 'bts-ss-03',
    type: 'photo',
    caption: "Cold-work finishing on the Cosmic Tandava — the chasing tools are the same ones my grandfather used. The patina develops over six months of controlled oxidation. You cannot rush bronze.",
    timestamp: '2026-08-20T10:00:00Z',
    image: 'https://images.unsplash.com/photo-1593895648907-820e948a94d7',
    imageAlt: 'Artisan using traditional chasing tools on bronze surface in Swamimalai studio'
  }]

},
{
  id: 'salvi-master-weavers',
  name: 'Salvi Master Weavers',
  note: 'Patan, Gujarat · Double Ikat Patola Tradition',
  school: 'Patan, Gujarat',
  bio: 'The Salvi family of Patan, Gujarat are among the last three families in the world who know the complete process of double ikat Patola weaving. In double ikat, both warp and weft threads are resist-dyed before weaving — a process so precise that the pattern must be calculated and tied before a single thread is placed on the loom. A single Patola sari takes six to twelve months to complete. The Salvi family has been weaving for over 700 years.',
  studioLocation: 'Patan, Gujarat',
  heroImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_1964ea514-1773200249465.png',
  heroImageAlt: 'Traditional Patola loom with double ikat silk threads in deep burgundy and gold in Patan workshop',
  avatarImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_16d4174e7-1775965009186.png',
  avatarImageAlt: 'Portrait of Salvi master weaver at traditional Patola loom in Patan Gujarat',
  followerCount: 198,
  activeLotIds: ['lot-05'],
  cohort: 'Nathdwara Lineage Workshops',
  specialisation: 'Double Ikat Patola · Silk Weaving',
  yearsActive: '1320–Present (700 yrs)',
  exhibitionCount: 22,
  totalSalesValue: '₹2.1 Cr',
  awards: [
  { year: '2019', title: 'GI Tag — Patan Patola', body: 'Geographical Indications Registry' },
  { year: '2016', title: 'National Handicrafts Award', body: 'Development Commissioner for Handicrafts' }],

  portfolioWorks: [
  {
    workId: 'sw-001',
    title: 'Royal Shikargah Patola',
    year: '2023',
    medium: 'Double Ikat Silk with Zari',
    status: 'In Drop 001',
    dppHash: '0x1a5c9e3b7d1a5c9e3b7d1a5c9e3b7d1a5c9e3b7d',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_404c82f1e-1789076766331.png",
    imageAlt: 'Intricate Indian silk textile with deep burgundy and gold ikat patterns on dark background',
    estimateLow: 480000,
    estimateHigh: 720000,
    linkedLotId: 'lot-05',
    provenanceChain: [
    { date: '2022–2023', event: 'Woven over 9 months — silk sourced from Bangalore, natural dyes from Ahmedabad' },
    { date: 'Jan 2024', event: 'GI-Tag certification — Rajasthan Handicrafts Board' },
    { date: 'Apr 2026', event: 'Consigned to IAH Drop 001' }]

  },
  {
    workId: 'sw-002',
    title: 'Navaratna Vohra Patola',
    year: '2020',
    medium: 'Double Ikat Silk',
    status: 'In Private Collection',
    dppHash: '0x7d3f9b5e1c7d3f9b5e1c7d3f9b5e1c7d3f9b5e1c',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_163a91d25-1765284124623.png",
    imageAlt: 'Navaratna nine-gem pattern Patola in deep jewel tones on natural silk',
    soldPrice: 920000,
    provenanceChain: [
    { date: '2019–2020', event: 'Woven over 12 months in Patan workshop' },
    { date: 'Nov 2020', event: 'Acquired by Calico Museum of Textiles, Ahmedabad — permanent collection' }]

  }],

  btsFeed: [
  {
    id: 'bts-sw-01',
    type: 'photo',
    caption: "Tying the resist on the warp threads for the new commission. Each tie is placed by hand — 1,200 ties for this section alone. The pattern exists only in the weaver's memory until the threads are dyed and the ties removed.",
    timestamp: '2026-09-04T08:45:00Z',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_15ae9cd1a-1772847531314.png',
    imageAlt: 'Close-up of resist-tying process on silk warp threads showing intricate pattern preparation'
  },
  {
    id: 'bts-sw-02',
    type: 'text',
    caption: 'The Shikargah pattern — hunting scenes — was traditionally woven for royal courts. The deer, elephants, and horsemen are encoded in the thread count. No cartoon, no graph paper. The pattern lives in the hands.',
    timestamp: '2026-08-30T11:00:00Z'
  }]

}];


export function getArtistById(id: string): Artist | undefined {
  return artists.find((a) => a.id === id);
}

export function getArtistByName(name: string): Artist | undefined {
  return artists.find((a) => a.name.toLowerCase() === name.toLowerCase());
}