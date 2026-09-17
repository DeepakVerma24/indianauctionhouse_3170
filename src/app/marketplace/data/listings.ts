export type ListingCategory = 'Contemporary Art' | 'Serigraphs' | 'Luxury Items' | 'Estate Items';
export type ListingCondition = 'Mint' | 'Excellent' | 'Very Good' | 'Good';
export type ListingBadge = 'IAH Certified' | 'GI Tagged' | 'Estate Verified' | 'Artist Signed' | 'Limited Edition' | 'NFC Chipped';

export interface MarketplaceListing {
  id: string;
  title: string;
  artist: string;
  artistId?: string;
  category: ListingCategory;
  medium: string;
  year: string;
  dimensions?: string;
  edition?: string;
  price: number;
  originalPrice?: number;
  condition: ListingCondition;
  badges: ListingBadge[];
  image: string;
  imageAlt: string;
  galleryImages: {src: string;alt: string;}[];
  description: string;
  provenance: string;
  dppHash?: string;
  sellerName: string;
  sellerVerified: boolean;
  listedAt: string;
  isFeatured?: boolean;
  isNew?: boolean;
}

export const listings: MarketplaceListing[] = [
{
  id: 'mkt-001',
  title: 'Monsoon Geometry — Study IV',
  artist: 'Aarav Mehta',
  artistId: 'aarav-mehta',
  category: 'Contemporary Art',
  medium: 'Oil & Gold Leaf on Belgian Linen',
  year: '2025',
  dimensions: '60 × 80 cm',
  price: 285000,
  condition: 'Mint',
  badges: ['IAH Certified', 'NFC Chipped', 'Artist Signed'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_40b0dbd9c-1789078227059.png",
  imageAlt: 'Contemporary Indian painting with monsoon blues and gold leaf geometry on Belgian linen',
  galleryImages: [
  { src: "https://images.unsplash.com/photo-1577398628407-76350bf6d8c5", alt: 'Front view of Monsoon Geometry Study IV' },
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_14ffec978-1765226087617.png", alt: 'Detail of gold leaf application on canvas' },
  { src: "https://images.unsplash.com/photo-1587670848290-ec30cfd49201", alt: 'Studio shot showing canvas texture and depth' }],

  description: 'Part of Mehta\'s ongoing Monsoon Geometry series, Study IV captures the precise moment when afternoon rain breaks over Pichola Lake. 24K gold leaf is applied in geometric bands over a deep indigo ground, referencing both Rajput miniature borders and contemporary abstraction. The linen was sourced from Ghent; the gold from a Jaipur atelier that has supplied Rajasthani craftsmen for three generations.',
  provenance: 'Painted in Udaipur studio, 2025. Consigned directly by the artist to IAH Marketplace. NFC chip embedded in stretcher bar — DPP live.',
  dppHash: '0xA3F1C9B2E4D7A0C5F2E1B9D3C6A8F4E2B7D1C9AA',
  sellerName: 'IAH Primary Market',
  sellerVerified: true,
  listedAt: '2026-09-01',
  isFeatured: true,
  isNew: true
},
{
  id: 'mkt-002',
  title: 'Shri Nathji Sharad Purnima — Serigraphy Edition',
  artist: 'Master Kalyan Sharma',
  artistId: 'master-kalyan-sharma',
  category: 'Serigraphs',
  medium: '14-colour Serigraphy on Archival Cotton Rag',
  year: '2024',
  dimensions: '76 × 56 cm',
  edition: 'Edition 7 of 30',
  price: 48500,
  originalPrice: 55000,
  condition: 'Mint',
  badges: ['IAH Certified', 'Artist Signed', 'Limited Edition', 'GI Tagged'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1231eb508-1779111272428.png",
  imageAlt: 'Traditional Pichwai-style serigraphy print with jewel tones and intricate floral borders',
  galleryImages: [
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_4504412d2-1789078227861.png", alt: 'Full view of Sharad Purnima serigraphy print' },
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_45ee1f2b0-1789078227874.png", alt: 'Detail of 14-colour screen printing layers' }],

  description: 'A museum-quality serigraphy reproduction of Master Sharma\'s celebrated Sharad Purnima Pichwai, produced in a strictly limited edition of 30 under his direct supervision at the Nathdwara studio. Fourteen separate screens were cut by hand; the gold passages use genuine 22K gold ink. Each print is signed, numbered, and accompanied by a certificate of authenticity bearing the GI-Tag registration number.',
  provenance: 'Printed at Nathdwara studio under artist supervision, 2024. Certificate of authenticity issued. GI-Tag registration: RJ/HC/2024/0047.',
  sellerName: 'Nathdwara Guild — IAH Partner',
  sellerVerified: true,
  listedAt: '2026-08-20',
  isFeatured: true
},
{
  id: 'mkt-003',
  title: 'Cosmic Tandava — Bronze Study',
  artist: 'Swaminathan Sthapati',
  artistId: 'swaminathan-sthapati',
  category: 'Contemporary Art',
  medium: 'Panchaloha Lost-Wax Bronze',
  year: '2024',
  dimensions: '38 cm height',
  price: 620000,
  condition: 'Mint',
  badges: ['IAH Certified', 'NFC Chipped', 'Artist Signed'],
  image: "https://images.unsplash.com/photo-1703711063979-1a18f784b90b",
  imageAlt: 'Classical Nataraja bronze sculpture in Chola tradition with detailed casting and patina',
  galleryImages: [
  { src: "https://images.unsplash.com/photo-1710090019262-450c3368a7ca", alt: 'Front view of Cosmic Tandava bronze Nataraja' },
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_4590bc65e-1789078227168.png", alt: 'Three-quarter view showing casting detail and patina' }],

  description: 'A study-scale Nataraja cast in the classical Panchaloha alloy (five metals: copper, gold, silver, zinc, iron) using the lost-wax method unchanged since the Chola period. Sthapati adheres strictly to the Agamic tala proportional system — the figure\'s height is precisely 38 cm, corresponding to the 8-tala canon for a domestic shrine piece. The patina was achieved through traditional burial in earth for six weeks.',
  provenance: 'Cast in Swamimalai foundry, 2024. Agamic proportional certification issued by the Sthapati Guild. NFC chip embedded in base.',
  dppHash: '0xC7D2A5F9B3E1C8D4A6F0B2E5C9D3A7F1B4E8C2D6',
  sellerName: 'IAH Primary Market',
  sellerVerified: true,
  listedAt: '2026-09-05',
  isFeatured: true,
  isNew: true
},
{
  id: 'mkt-004',
  title: 'Kanjivaram Silk Sari — Zari Peacock Motif',
  artist: 'Salvi Master Weavers',
  artistId: 'salvi-master-weavers',
  category: 'Luxury Items',
  medium: 'Pure Silk, 22K Zari',
  year: '2025',
  dimensions: '6.3 metres × 120 cm',
  price: 185000,
  condition: 'Mint',
  badges: ['GI Tagged', 'IAH Certified', 'Artist Signed'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a7ca6a09-1764679826771.png",
  imageAlt: 'Luxurious deep crimson Kanjivaram silk sari with intricate 22K gold zari peacock border',
  galleryImages: [
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_1e2d18636-1773201050593.png", alt: 'Full drape of Kanjivaram sari showing peacock motif border' },
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_16222154f-1772087216631.png", alt: 'Close-up of 22K zari weaving detail on silk ground' }],

  description: 'Woven over eleven weeks on a traditional pit loom in Kanchipuram by the Salvi family\'s fourth-generation master weavers. The peacock motif in the pallu uses 22K zari thread — genuine gold wire wound around a silk core — requiring 340 individual warp manipulations per repeat. The deep crimson ground is achieved with natural lac dye. GI-Tag certified under the Kanchipuram Silk Sarees Geographical Indication.',
  provenance: 'Woven in Kanchipuram, 2025. GI-Tag registration: TN/TX/2025/0012. Salvi family weaver certificate included.',
  sellerName: 'Salvi Weavers — IAH Partner',
  sellerVerified: true,
  listedAt: '2026-08-15'
},
{
  id: 'mkt-005',
  title: 'Vintage Patek Philippe Calatrava — Ref. 96',
  artist: 'Estate of Ratan Tata Collection',
  category: 'Estate Items',
  medium: '18K Yellow Gold, Manual Wind',
  year: '1962',
  dimensions: '36mm case',
  price: 4200000,
  condition: 'Excellent',
  badges: ['Estate Verified', 'IAH Certified'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1218305a0-1768284381688.png",
  imageAlt: 'Vintage 1962 Patek Philippe Calatrava in 18K gold with cream dial and original leather strap',
  galleryImages: [
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_1c396ee3f-1768284380387.png", alt: 'Front view of vintage Patek Philippe Calatrava Ref. 96' },
  { src: "https://images.unsplash.com/photo-1715777197224-71e0cacd6cac", alt: 'Case back showing movement and hallmarks' }],

  description: 'A pristine example of the Calatrava Reference 96 in 18K yellow gold, produced in 1962 during the height of Patek Philippe\'s Geneva workshop output. The cream lacquer dial retains its original patina with no restoration. The movement, Calibre 12-120, has been serviced by a certified Patek Philippe watchmaker in 2024 with all original parts retained. Accompanied by original box, extract from the Patek Philippe archives, and estate documentation.',
  provenance: 'Acquired new in Geneva, 1962. Passed by descent through the estate. IAH estate verification completed September 2026. Patek Philippe archive extract reference: PP/1962/96/4471.',
  sellerName: 'IAH Estate Division',
  sellerVerified: true,
  listedAt: '2026-09-08',
  isFeatured: true,
  isNew: true
},
{
  id: 'mkt-006',
  title: 'Warli Harvest Festival — Serigraphy',
  artist: 'Jivya Soma Mashe Estate',
  category: 'Serigraphs',
  medium: '8-colour Serigraphy on Handmade Paper',
  year: '2023',
  dimensions: '56 × 76 cm',
  edition: 'Edition 12 of 50',
  price: 28000,
  condition: 'Mint',
  badges: ['Estate Verified', 'Limited Edition', 'IAH Certified'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1410c12b9-1764749001095.png",
  imageAlt: 'Warli tribal art serigraphy print showing harvest festival scene in white on terracotta ground',
  galleryImages: [
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_1410c12b9-1764749001095.png", alt: 'Full view of Warli harvest festival serigraphy' }],

  description: 'Produced posthumously from the estate of Jivya Soma Mashe — the artist credited with bringing Warli painting to international recognition — this serigraphy edition was authorised by the Mashe family trust and printed at the Tata Institute of Social Sciences press in Mumbai. The composition depicts the Tarpa dance at harvest, rendered in the traditional white pigment-on-earth-ground palette. Each print is accompanied by an estate certificate.',
  provenance: 'Printed from original Mashe composition, 2023. Estate authorisation certificate: JM/EST/2023/012. Mashe family trust seal.',
  sellerName: 'Mashe Estate Trust — IAH Partner',
  sellerVerified: true,
  listedAt: '2026-07-30'
},
{
  id: 'mkt-007',
  title: 'Bidri Ware Hookah Base — Mughal Floral',
  artist: 'Mohammad Sadiq Atelier',
  category: 'Luxury Items',
  medium: 'Bidri (Zinc-Copper Alloy, Silver Inlay)',
  year: '2024',
  dimensions: '28 cm height',
  price: 42000,
  condition: 'Mint',
  badges: ['GI Tagged', 'IAH Certified', 'Artist Signed'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1621c733b-1774287246361.png",
  imageAlt: 'Bidriware hookah base with intricate silver inlay floral pattern on matte black zinc alloy',
  galleryImages: [
  { src: "https://images.unsplash.com/photo-1696492139774-21d4ddc8a4fa", alt: 'Full view of Bidri hookah base with silver inlay' }],

  description: 'A masterwork of Bidri craft from the Mohammad Sadiq Atelier in Bidar, Karnataka — the only city where this 14th-century technique survives. The base is cast in a zinc-copper alloy, then inlaid with pure silver wire in a Mughal floral pattern derived from Humayun\'s Tomb garden motifs. The characteristic matte black finish is achieved by burying the piece in a mixture of sal ammoniac and soil unique to Bidar. GI-Tag certified.',
  provenance: 'Made in Bidar atelier, 2024. GI-Tag registration: KA/HC/2024/0089. Mohammad Sadiq master craftsman certificate.',
  sellerName: 'Sadiq Atelier — IAH Partner',
  sellerVerified: true,
  listedAt: '2026-08-10'
},
{
  id: 'mkt-008',
  title: 'Vintage Cartier Tank Américaine — 18K Gold',
  artist: 'Private Estate Collection',
  category: 'Estate Items',
  medium: '18K Yellow Gold, Quartz',
  year: '1998',
  dimensions: '26 × 34mm case',
  price: 1850000,
  condition: 'Very Good',
  badges: ['Estate Verified', 'IAH Certified'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_44b010efa-1789078228606.png",
  imageAlt: 'Vintage 1998 Cartier Tank Américaine in 18K yellow gold with cream dial and sapphire crown',
  galleryImages: [
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_1f403a88e-1773567710194.png", alt: 'Front view of Cartier Tank Américaine in yellow gold' },
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_13e62fef1-1781385277238.png", alt: 'Side profile showing case curvature and crown detail' }],

  description: 'A 1998 Cartier Tank Américaine in 18K yellow gold with the distinctive curved case that distinguishes the Américaine from the standard Tank. The cream dial with Roman numerals and blued steel hands is in excellent condition. The sapphire cabochon crown is original. Accompanied by original Cartier box, papers, and a 2025 service record from Cartier\'s authorised service centre in Mumbai.',
  provenance: 'Purchased new at Cartier Paris, 1998. Single owner. IAH estate verification completed August 2026. Cartier service record: CS/MUM/2025/4471.',
  sellerName: 'IAH Estate Division',
  sellerVerified: true,
  listedAt: '2026-08-28'
},
{
  id: 'mkt-009',
  title: 'Gond Tree of Life — Large Format',
  artist: 'Venkat Raman Singh Shyam',
  category: 'Contemporary Art',
  medium: 'Acrylic on Canvas',
  year: '2024',
  dimensions: '90 × 120 cm',
  price: 165000,
  condition: 'Mint',
  badges: ['IAH Certified', 'Artist Signed', 'NFC Chipped'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_4428b3960-1789078227884.png",
  imageAlt: 'Large format Gond painting showing Tree of Life with intricate dot-and-line patterns in vivid colours',
  galleryImages: [
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_416029098-1789078227879.png", alt: 'Full view of Gond Tree of Life large format canvas' }],

  description: 'Venkat Raman Singh Shyam is among the foremost practitioners of the Gond painting tradition from Patangarh, Madhya Pradesh. This large-format canvas depicts the cosmic Tree of Life — a central motif in Gond cosmology — rendered in the characteristic dot-and-line technique using acrylic on canvas. The composition contains over 40,000 individual marks. Shyam\'s work is held in the collections of the British Museum and the Crafts Museum, New Delhi.',
  provenance: 'Painted in Bhopal studio, 2024. Consigned directly by the artist. NFC chip embedded in stretcher bar.',
  dppHash: '0xE9B4D2F7A1C5E8B3D6F0A2C4E7B1D5F9A3C7E2B6',
  sellerName: 'IAH Primary Market',
  sellerVerified: true,
  listedAt: '2026-09-03',
  isNew: true
},
{
  id: 'mkt-010',
  title: 'Madhubani Ardhanarishvara — Serigraphy',
  artist: 'Sita Devi Estate',
  category: 'Serigraphs',
  medium: '10-colour Serigraphy on Handmade Mithila Paper',
  year: '2022',
  dimensions: '60 × 90 cm',
  edition: 'Edition 3 of 25',
  price: 38500,
  condition: 'Mint',
  badges: ['Estate Verified', 'Limited Edition', 'IAH Certified'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_454710d89-1789078227888.png",
  imageAlt: 'Madhubani serigraphy print of Ardhanarishvara in traditional Mithila style with bold black outlines and natural pigment colours',
  galleryImages: [
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_49bed120e-1789078227880.png", alt: 'Full view of Madhubani Ardhanarishvara serigraphy' }],

  description: 'Produced from the estate of Sita Devi — one of the founding masters of the Madhubani painting revival — this serigraphy edition was printed on handmade Mithila paper using ten screens, including passages in genuine natural pigments. The Ardhanarishvara composition is considered one of Sita Devi\'s most significant works, combining the Tantric iconographic tradition with her distinctive bold-outline style. Estate authorised, strictly limited to 25 impressions.',
  provenance: 'Printed from original Sita Devi composition, 2022. Estate authorisation: SD/EST/2022/003. Bihar Handicrafts Board certificate.',
  sellerName: 'Sita Devi Estate Trust',
  sellerVerified: true,
  listedAt: '2026-07-15'
},
{
  id: 'mkt-011',
  title: 'Meenakari Enamel Jewellery Box — Jaipur',
  artist: 'Surana Jewellers Atelier',
  category: 'Luxury Items',
  medium: 'Sterling Silver, Meenakari Enamel, Kundan',
  year: '2025',
  dimensions: '15 × 10 × 8 cm',
  price: 95000,
  condition: 'Mint',
  badges: ['GI Tagged', 'IAH Certified', 'Artist Signed'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1474aee5d-1767899903122.png",
  imageAlt: 'Ornate Jaipur meenakari jewellery box in sterling silver with vibrant enamel floral panels and kundan border',
  galleryImages: [
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_1eaeb3b67-1784951760534.png", alt: 'Top view of meenakari jewellery box showing enamel panels' }],

  description: 'A masterwork of Jaipur\'s Meenakari tradition — the art of enamelling on metal — produced by the Surana Jewellers Atelier, whose craftsmen have worked in the Pink City for five generations. The box is constructed in sterling silver with six panels of Meenakari enamel depicting the seasons of Rajasthan, bordered by Kundan-set semi-precious stones. The interior is lined with hand-embroidered silk. GI-Tag certified under Jaipur Meenakari.',
  provenance: 'Made in Jaipur atelier, 2025. GI-Tag registration: RJ/JW/2025/0034. Surana family master craftsman certificate.',
  sellerName: 'Surana Atelier — IAH Partner',
  sellerVerified: true,
  listedAt: '2026-09-06',
  isNew: true
},
{
  id: 'mkt-012',
  title: 'Vintage Rolex Submariner — Ref. 5513',
  artist: 'Estate of Maharaja of Jodhpur',
  category: 'Estate Items',
  medium: 'Stainless Steel, Automatic',
  year: '1971',
  dimensions: '40mm case',
  price: 3600000,
  condition: 'Very Good',
  badges: ['Estate Verified', 'IAH Certified'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_19f2dd156-1772224466600.png",
  imageAlt: 'Vintage 1971 Rolex Submariner Ref. 5513 in stainless steel with matte black dial and original bezel',
  galleryImages: [
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_1d4e42cf0-1781395891016.png", alt: 'Front view of vintage Rolex Submariner 5513' }],

  description: 'A 1971 Rolex Submariner Reference 5513 from the estate of the Maharaja of Jodhpur — one of the most significant vintage Rolex examples to come to market from a royal Indian collection. The matte black dial is original and unrestored; the gilt printing retains its warm patina. The movement has been serviced by a certified Rolex watchmaker with all original parts. The estate documentation traces the watch to a gift from the Maharaja\'s visit to Geneva in 1971.',
  provenance: 'Gifted in Geneva, 1971. Single owner. Passed by descent through the Jodhpur royal estate. IAH estate verification completed September 2026.',
  sellerName: 'IAH Estate Division',
  sellerVerified: true,
  listedAt: '2026-09-09',
  isFeatured: true,
  isNew: true
}];


export const categories: ListingCategory[] = ['Contemporary Art', 'Serigraphs', 'Luxury Items', 'Estate Items'];

export const priceRanges = [
{ label: 'Under ₹1L', min: 0, max: 100000 },
{ label: '₹1L – ₹5L', min: 100000, max: 500000 },
{ label: '₹5L – ₹20L', min: 500000, max: 2000000 },
{ label: '₹20L+', min: 2000000, max: Infinity }];