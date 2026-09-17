'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppImage from '@/components/ui/AppImage';

// ─── Types ───────────────────────────────────────────────────────────────────
interface ActiveBid {
  id: string;
  lotTitle: string;
  lotImage: string;
  lotImageAlt: string;
  saleTitle: string;
  estimate: string;
  yourBid: number;
  currentBid: number;
  endsIn: string;
  status: 'leading' | 'outbid' | 'reserve-not-met';
}

interface WonLot {
  id: string;
  lotTitle: string;
  lotImage: string;
  lotImageAlt: string;
  saleTitle: string;
  hammerPrice: number;
  wonDate: string;
  paymentStatus: 'paid' | 'pending' | 'overdue';
}

interface ConsignmentItem {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  category: string;
  estimateRange: string;
  submittedDate: string;
  stage: 'submitted' | 'under-review' | 'approved' | 'catalogued' | 'sold';
}

interface PurchaseRecord {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  type: 'auction' | 'marketplace';
  amount: number;
  date: string;
  invoiceId: string;
}

interface OrderRecord {
  id: string;
  orderId: string;
  title: string;
  image: string;
  imageAlt: string;
  amount: number;
  orderDate: string;
  estimatedDelivery: string;
  status: 'confirmed' | 'processing' | 'shipped' | 'out-for-delivery' | 'delivered' | 'cancelled';
  trackingNumber?: string;
  carrier?: string;
}

interface PaymentReceipt {
  id: string;
  receiptId: string;
  description: string;
  amount: number;
  date: string;
  method: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  relatedInvoice?: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const activeBids: ActiveBid[] = [
{
  id: 'lot-3',
  lotTitle: 'Amrita Sher-Gil — Village Scene, 1938',
  lotImage: "https://img.rocket.new/generatedImages/rocket_gen_img_436aa22a5-1789091152916.png",
  lotImageAlt: 'Village scene painting by Amrita Sher-Gil showing rural Indian life',
  saleTitle: 'The Inaugural Collection — Live',
  estimate: '₹4.2Cr – ₹5.8Cr',
  yourBid: 42000000,
  currentBid: 45000000,
  endsIn: '2h 14m',
  status: 'outbid'
},
{
  id: 'lot-7',
  lotTitle: 'Tyeb Mehta — Diagonal, 1972',
  lotImage: "https://img.rocket.new/generatedImages/rocket_gen_img_4b7f78b9b-1789091151417.png",
  lotImageAlt: 'Abstract diagonal composition painting by Tyeb Mehta in bold colors',
  saleTitle: 'The Inaugural Collection — Live',
  estimate: '₹2.8Cr – ₹3.5Cr',
  yourBid: 29000000,
  currentBid: 29000000,
  endsIn: '3h 42m',
  status: 'leading'
},
{
  id: 'lot-11',
  lotTitle: 'Mughal Jade Dagger — 17th Century',
  lotImage: "https://img.rocket.new/generatedImages/rocket_gen_img_42446dad9-1789091152658.png",
  lotImageAlt: 'Ornate Mughal jade dagger with gold inlay from the 17th century',
  saleTitle: 'The Inaugural Collection — Live',
  estimate: '₹85L – ₹1.2Cr',
  yourBid: 9000000,
  currentBid: 9000000,
  endsIn: '5h 08m',
  status: 'reserve-not-met'
}];


const wonLots: WonLot[] = [
{
  id: 'wl-1',
  lotTitle: 'Raja Ravi Varma — Lady with Lamp, 1895',
  lotImage: "https://img.rocket.new/generatedImages/rocket_gen_img_44f3033ab-1789091152140.png",
  lotImageAlt: 'Oil painting of a lady holding a lamp by Raja Ravi Varma',
  saleTitle: 'Heritage India — September 2025',
  hammerPrice: 18500000,
  wonDate: '14 Sep 2025',
  paymentStatus: 'paid'
},
{
  id: 'wl-2',
  lotTitle: 'Bhupen Khakhar — Man Eating Jalebi',
  lotImage: "https://img.rocket.new/generatedImages/rocket_gen_img_403cda7de-1789091152073.png",
  lotImageAlt: 'Figurative painting by Bhupen Khakhar depicting a man eating jalebi',
  saleTitle: 'Modern Masters — July 2025',
  hammerPrice: 7200000,
  wonDate: '22 Jul 2025',
  paymentStatus: 'paid'
},
{
  id: 'wl-3',
  lotTitle: 'Pahari Miniature — Krishna & Radha, c.1780',
  lotImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1dabb10ad-1772089864019.png",
  lotImageAlt: 'Pahari miniature painting depicting Krishna and Radha in a garden',
  saleTitle: 'Miniatures & Manuscripts — May 2025',
  hammerPrice: 3400000,
  wonDate: '08 May 2025',
  paymentStatus: 'pending'
}];


const consignments: ConsignmentItem[] = [
{
  id: 'cs-1',
  title: 'Ganesh Pyne — The Wanderer, 1984',
  image: "https://images.unsplash.com/photo-1680121231530-b8e6043e9448",
  imageAlt: 'Figurative painting by Ganesh Pyne showing a lone wanderer in muted tones',
  category: 'Modern Indian Painting',
  estimateRange: '₹1.2Cr – ₹1.8Cr',
  submittedDate: '02 Sep 2025',
  stage: 'catalogued'
},
{
  id: 'cs-2',
  title: 'Bidri Ware Hookah Base — 18th Century',
  image: "https://images.unsplash.com/photo-1660786726920-1217e816e46e",
  imageAlt: 'Ornate Bidri ware hookah base with silver inlay from the 18th century',
  category: 'Decorative Arts',
  estimateRange: '₹45L – ₹65L',
  submittedDate: '18 Aug 2025',
  stage: 'under-review'
}];


const purchases: PurchaseRecord[] = [
{
  id: 'pur-1',
  title: 'Raja Ravi Varma — Lady with Lamp, 1895',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_44f3033ab-1789091152140.png",
  imageAlt: 'Oil painting of a lady holding a lamp by Raja Ravi Varma',
  type: 'auction',
  amount: 18500000,
  date: '14 Sep 2025',
  invoiceId: 'IAH-2025-0914-001'
},
{
  id: 'pur-2',
  title: 'Bhupen Khakhar — Man Eating Jalebi',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_403cda7de-1789091152073.png",
  imageAlt: 'Figurative painting by Bhupen Khakhar depicting a man eating jalebi',
  type: 'auction',
  amount: 7200000,
  date: '22 Jul 2025',
  invoiceId: 'IAH-2025-0722-003'
},
{
  id: 'pur-3',
  title: 'Pahari Miniature — Krishna & Radha, c.1780',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1dabb10ad-1772089864019.png",
  imageAlt: 'Pahari miniature painting depicting Krishna and Radha in a garden',
  type: 'auction',
  amount: 3400000,
  date: '08 May 2025',
  invoiceId: 'IAH-2025-0508-007'
},
{
  id: 'pur-4',
  title: 'Madhubani Silk Dupatta — Hand-painted',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b3a1bf64-1764662417489.png",
  imageAlt: 'Hand-painted Madhubani silk dupatta with traditional motifs',
  type: 'marketplace',
  amount: 18500,
  date: '30 Aug 2025',
  invoiceId: 'IAH-MP-2025-0830-012'
}];


const orders: OrderRecord[] = [
{
  id: 'ord-1',
  orderId: 'ORD-2025-0914-001',
  title: 'Raja Ravi Varma — Lady with Lamp, 1895',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_44f3033ab-1789091152140.png",
  imageAlt: 'Oil painting of a lady holding a lamp by Raja Ravi Varma',
  amount: 18500000,
  orderDate: '14 Sep 2025',
  estimatedDelivery: '28 Sep 2025',
  status: 'shipped',
  trackingNumber: 'DTDC-9847263510',
  carrier: 'DTDC Courier'
},
{
  id: 'ord-2',
  orderId: 'ORD-2025-0722-003',
  title: 'Bhupen Khakhar — Man Eating Jalebi',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_403cda7de-1789091152073.png",
  imageAlt: 'Figurative painting by Bhupen Khakhar depicting a man eating jalebi',
  amount: 7200000,
  orderDate: '22 Jul 2025',
  estimatedDelivery: '05 Aug 2025',
  status: 'delivered',
  trackingNumber: 'BLUEDART-7261849302',
  carrier: 'Blue Dart'
},
{
  id: 'ord-3',
  orderId: 'ORD-2025-0508-007',
  title: 'Pahari Miniature — Krishna & Radha, c.1780',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1dabb10ad-1772089864019.png",
  imageAlt: 'Pahari miniature painting depicting Krishna and Radha in a garden',
  amount: 3400000,
  orderDate: '08 May 2025',
  estimatedDelivery: '22 May 2025',
  status: 'delivered',
  trackingNumber: 'FEDEX-4829103847',
  carrier: 'FedEx'
},
{
  id: 'ord-4',
  orderId: 'ORD-2025-0830-012',
  title: 'Madhubani Silk Dupatta — Hand-painted',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b3a1bf64-1764662417489.png",
  imageAlt: 'Hand-painted Madhubani silk dupatta with traditional motifs',
  amount: 18500,
  orderDate: '30 Aug 2025',
  estimatedDelivery: '06 Sep 2025',
  status: 'out-for-delivery',
  trackingNumber: 'ECOM-3847291038',
  carrier: 'Ecom Express'
}];


const paymentReceipts: PaymentReceipt[] = [
{
  id: 'rcpt-1',
  receiptId: 'RCP-2025-0914-001',
  description: 'Auction Purchase — Raja Ravi Varma · Lady with Lamp',
  amount: 18500000,
  date: '14 Sep 2025',
  method: 'NEFT Transfer',
  status: 'completed',
  relatedInvoice: 'IAH-2025-0914-001'
},
{
  id: 'rcpt-2',
  receiptId: 'RCP-2025-0914-002',
  description: 'Buyer\'s Premium — IAH-2025-0914-001',
  amount: 2775000,
  date: '14 Sep 2025',
  method: 'NEFT Transfer',
  status: 'completed',
  relatedInvoice: 'IAH-2025-0914-001'
},
{
  id: 'rcpt-3',
  receiptId: 'RCP-2025-0722-003',
  description: 'Auction Purchase — Bhupen Khakhar · Man Eating Jalebi',
  amount: 7200000,
  date: '22 Jul 2025',
  method: 'RTGS Transfer',
  status: 'completed',
  relatedInvoice: 'IAH-2025-0722-003'
},
{
  id: 'rcpt-4',
  receiptId: 'RCP-2025-0508-007',
  description: 'Auction Purchase — Pahari Miniature · Krishna & Radha',
  amount: 3400000,
  date: '08 May 2025',
  method: 'Cheque',
  status: 'completed',
  relatedInvoice: 'IAH-2025-0508-007'
},
{
  id: 'rcpt-5',
  receiptId: 'RCP-2025-0830-012',
  description: 'Marketplace Purchase — Madhubani Silk Dupatta',
  amount: 18500,
  date: '30 Aug 2025',
  method: 'UPI',
  status: 'completed',
  relatedInvoice: 'IAH-MP-2025-0830-012'
},
{
  id: 'rcpt-6',
  receiptId: 'RCP-2025-0508-008',
  description: 'Pending Payment — Pahari Miniature · Buyer\'s Premium',
  amount: 510000,
  date: '08 May 2025',
  method: 'Awaiting Transfer',
  status: 'pending',
  relatedInvoice: 'IAH-2025-0508-007'
}];


// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatINR(n: number): string {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K`;
  return `₹${n.toLocaleString('en-IN')}`;
}

const stageConfig: Record<ConsignmentItem['stage'], {label: string;color: string;step: number;}> = {
  submitted: { label: 'Submitted', color: 'text-[#645E59] bg-[#F0EDE8]', step: 1 },
  'under-review': { label: 'Under Review', color: 'text-[#A34828] bg-[#FDF0E8]', step: 2 },
  approved: { label: 'Approved', color: 'text-[#3A6B4A] bg-[#EAF3EC]', step: 3 },
  catalogued: { label: 'Catalogued', color: 'text-[#231F20] bg-[#E2DDD5]', step: 4 },
  sold: { label: 'Sold', color: 'text-[#FAF9F7] bg-[#231F20]', step: 5 }
};

const bidStatusConfig: Record<ActiveBid['status'], {label: string;dot: string;text: string;}> = {
  leading: { label: 'Leading', dot: 'bg-[#3A6B4A]', text: 'text-[#3A6B4A]' },
  outbid: { label: 'Outbid', dot: 'bg-[#A34828]', text: 'text-[#A34828]' },
  'reserve-not-met': { label: 'Reserve Not Met', dot: 'bg-[#B8A99A]', text: 'text-[#645E59]' }
};

const paymentConfig: Record<WonLot['paymentStatus'], {label: string;color: string;}> = {
  paid: { label: 'Paid', color: 'text-[#3A6B4A] bg-[#EAF3EC]' },
  pending: { label: 'Payment Due', color: 'text-[#A34828] bg-[#FDF0E8]' },
  overdue: { label: 'Overdue', color: 'text-[#FAF9F7] bg-[#A34828]' }
};

const orderStatusConfig: Record<OrderRecord['status'], {label: string;color: string;step: number;}> = {
  confirmed: { label: 'Confirmed', color: 'text-[#645E59] bg-[#F0EDE8]', step: 1 },
  processing: { label: 'Processing', color: 'text-[#A34828] bg-[#FDF0E8]', step: 2 },
  shipped: { label: 'Shipped', color: 'text-[#231F20] bg-[#E2DDD5]', step: 3 },
  'out-for-delivery': { label: 'Out for Delivery', color: 'text-[#A34828] bg-[#FDF0E8]', step: 4 },
  delivered: { label: 'Delivered', color: 'text-[#3A6B4A] bg-[#EAF3EC]', step: 5 },
  cancelled: { label: 'Cancelled', color: 'text-[#FAF9F7] bg-[#A34828]', step: 0 }
};

const receiptStatusConfig: Record<PaymentReceipt['status'], {label: string;color: string;}> = {
  completed: { label: 'Completed', color: 'text-[#3A6B4A] bg-[#EAF3EC]' },
  pending: { label: 'Pending', color: 'text-[#A34828] bg-[#FDF0E8]' },
  failed: { label: 'Failed', color: 'text-[#FAF9F7] bg-[#A34828]' },
  refunded: { label: 'Refunded', color: 'text-[#645E59] bg-[#F0EDE8]' }
};

// ─── Sub-components ───────────────────────────────────────────────────────────
function SectionHeader({ title, count, cta, ctaHref }: {title: string;count?: number;cta?: string;ctaHref?: string;}) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <h2 className="font-display text-xl font-semibold text-[#231F20] tracking-wide">{title}</h2>
        {count !== undefined &&
        <span className="text-xs font-semibold text-[#645E59] bg-[#F0EDE8] border border-[#E2DDD5] px-2.5 py-0.5 rounded-full">
            {count}
          </span>
        }
      </div>
      {cta && ctaHref &&
      <Link href={ctaHref} className="text-xs font-semibold text-[#A34828] hover:text-[#873B20] transition-colors tracking-wide uppercase">
          {cta} →
        </Link>
      }
    </div>);

}

function ActiveBidCard({ bid }: {bid: ActiveBid;}) {
  const cfg = bidStatusConfig[bid.status];
  const isLeading = bid.status === 'leading';
  return (
    <div className={`bg-[#FAF9F7] border rounded-[5px] overflow-hidden flex gap-0 ${isLeading ? 'border-[#3A6B4A]/40' : 'border-[#E2DDD5]'}`}>
      <div className="relative w-24 shrink-0">
        <AppImage src={bid.lotImage} alt={bid.lotImageAlt} fill className="object-cover" sizes="96px" />
      </div>
      <div className="flex-1 p-4 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="text-sm font-semibold text-[#231F20] leading-snug line-clamp-2">{bid.lotTitle}</p>
          <span className={`shrink-0 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border border-[#E2DDD5] bg-[#FAF9F7] ${cfg.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} ${isLeading ? 'animate-pulse' : ''}`} />
            {cfg.label}
          </span>
        </div>
        <p className="text-xs text-[#B8A99A] mb-3">{bid.saleTitle}</p>
        <div className="flex items-end justify-between gap-4">
          <div className="flex gap-5">
            <div>
              <p className="text-[10px] text-[#B8A99A] uppercase tracking-wider mb-0.5">Your Bid</p>
              <p className="text-sm font-semibold text-[#231F20]">{formatINR(bid.yourBid)}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#B8A99A] uppercase tracking-wider mb-0.5">Current</p>
              <p className={`text-sm font-semibold ${bid.status === 'outbid' ? 'text-[#A34828]' : 'text-[#231F20]'}`}>{formatINR(bid.currentBid)}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-[#B8A99A] uppercase tracking-wider mb-0.5">Ends In</p>
            <p className="text-sm font-semibold text-[#231F20]">{bid.endsIn}</p>
          </div>
        </div>
        {bid.status === 'outbid' &&
        <div className="mt-3">
            <Link href="/" className="inline-block text-[10px] font-semibold uppercase tracking-wider bg-[#A34828] text-[#FAF9F7] px-3 py-1.5 rounded-[3px] hover:bg-[#873B20] transition-colors">
              Raise Bid
            </Link>
          </div>
        }
      </div>
    </div>);

}

function WonLotCard({ lot }: {lot: WonLot;}) {
  const cfg = paymentConfig[lot.paymentStatus];
  return (
    <div className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[5px] overflow-hidden flex gap-0">
      <div className="relative w-24 shrink-0">
        <AppImage src={lot.lotImage} alt={lot.lotImageAlt} fill className="object-cover" sizes="96px" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <span className="absolute bottom-2 left-2 text-[9px] font-bold text-[#FAF9F7] uppercase tracking-wider">Won</span>
      </div>
      <div className="flex-1 p-4 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="text-sm font-semibold text-[#231F20] leading-snug line-clamp-2">{lot.lotTitle}</p>
          <span className={`shrink-0 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${cfg.color}`}>
            {cfg.label}
          </span>
        </div>
        <p className="text-xs text-[#B8A99A] mb-3">{lot.saleTitle}</p>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] text-[#B8A99A] uppercase tracking-wider mb-0.5">Hammer Price</p>
            <p className="text-base font-semibold text-[#231F20]">{formatINR(lot.hammerPrice)}</p>
          </div>
          <p className="text-xs text-[#B8A99A]">{lot.wonDate}</p>
        </div>
        {lot.paymentStatus === 'pending' &&
        <div className="mt-3">
            <button className="text-[10px] font-semibold uppercase tracking-wider bg-[#231F20] text-[#FAF9F7] px-3 py-1.5 rounded-[3px] hover:bg-[#3A3535] transition-colors">
              Complete Payment
            </button>
          </div>
        }
      </div>
    </div>);

}

function ConsignmentCard({ item }: {item: ConsignmentItem;}) {
  const cfg = stageConfig[item.stage];
  const steps: ConsignmentItem['stage'][] = ['submitted', 'under-review', 'approved', 'catalogued', 'sold'];
  return (
    <div className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[5px] overflow-hidden">
      <div className="flex gap-0">
        <div className="relative w-24 shrink-0">
          <AppImage src={item.image} alt={item.imageAlt} fill className="object-cover" sizes="96px" />
        </div>
        <div className="flex-1 p-4 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <p className="text-sm font-semibold text-[#231F20] leading-snug line-clamp-2">{item.title}</p>
            <span className={`shrink-0 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${cfg.color}`}>
              {cfg.label}
            </span>
          </div>
          <p className="text-xs text-[#B8A99A] mb-1">{item.category}</p>
          <p className="text-xs text-[#645E59] font-medium mb-3">Est. {item.estimateRange}</p>
          {/* Progress bar */}
          <div className="flex gap-1">
            {steps.map((s, i) =>
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-colors ${i < cfg.step ? 'bg-[#A34828]' : 'bg-[#E2DDD5]'}`} />

            )}
          </div>
          <p className="text-[10px] text-[#B8A99A] mt-1.5">Submitted {item.submittedDate}</p>
        </div>
      </div>
    </div>);

}

function PurchaseRow({ record }: {record: PurchaseRecord;}) {
  function handleDownloadInvoice() {
    const content = [
      'INDIA ART & HERITAGE AUCTIONS',
      '─────────────────────────────────────────',
      `INVOICE: ${record.invoiceId}`,
      `DATE: ${record.date}`,
      '─────────────────────────────────────────',
      `ITEM: ${record.title}`,
      `TYPE: ${record.type === 'auction' ? 'Auction Purchase' : 'Marketplace Purchase'}`,
      '─────────────────────────────────────────',
      `AMOUNT: ${formatINR(record.amount)}`,
      '─────────────────────────────────────────',
      'Thank you for your purchase.',
      'For queries: support@indiaartheritage.com'
    ].join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${record.invoiceId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex items-center gap-4 py-4 border-b border-[#E2DDD5] last:border-0">
      <div className="relative w-14 h-14 shrink-0 rounded-[3px] overflow-hidden border border-[#E2DDD5]">
        <AppImage src={record.image} alt={record.imageAlt} fill className="object-cover" sizes="56px" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#231F20] line-clamp-1">{record.title}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${record.type === 'auction' ? 'bg-[#F0EDE8] text-[#645E59]' : 'bg-[#EAF3EC] text-[#3A6B4A]'}`}>
            {record.type === 'auction' ? 'Auction' : 'Marketplace'}
          </span>
          <span className="text-xs text-[#B8A99A]">{record.date}</span>
        </div>
        <p className="text-[10px] text-[#B8A99A] mt-0.5">{record.invoiceId}</p>
      </div>
      <div className="flex flex-col items-end gap-2 shrink-0">
        <p className="text-sm font-semibold text-[#231F20]">{formatINR(record.amount)}</p>
        <button
          onClick={handleDownloadInvoice}
          className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#A34828] border border-[#A34828]/30 bg-[#FDF0E8] px-2.5 py-1 rounded-[3px] hover:bg-[#A34828] hover:text-[#FAF9F7] transition-colors"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Invoice
        </button>
      </div>
    </div>);

}

function OrderCard({ order }: {order: OrderRecord;}) {
  const cfg = orderStatusConfig[order.status];
  const steps: Array<OrderRecord['status']> = ['confirmed', 'processing', 'shipped', 'out-for-delivery', 'delivered'];
  const isCancelled = order.status === 'cancelled';

  return (
    <div className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[5px] overflow-hidden">
      <div className="flex gap-0">
        <div className="relative w-24 shrink-0">
          <AppImage src={order.image} alt={order.imageAlt} fill className="object-cover" sizes="96px" />
        </div>
        <div className="flex-1 p-4 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <p className="text-sm font-semibold text-[#231F20] leading-snug line-clamp-2">{order.title}</p>
            <span className={`shrink-0 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${cfg.color}`}>
              {cfg.label}
            </span>
          </div>
          <p className="text-[10px] text-[#B8A99A] mb-1">Order {order.orderId}</p>
          <div className="flex items-center gap-4 mb-3">
            <div>
              <p className="text-[10px] text-[#B8A99A] uppercase tracking-wider mb-0.5">Order Date</p>
              <p className="text-xs font-medium text-[#231F20]">{order.orderDate}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#B8A99A] uppercase tracking-wider mb-0.5">
                {order.status === 'delivered' ? 'Delivered' : 'Est. Delivery'}
              </p>
              <p className="text-xs font-medium text-[#231F20]">{order.estimatedDelivery}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#B8A99A] uppercase tracking-wider mb-0.5">Value</p>
              <p className="text-xs font-semibold text-[#231F20]">{formatINR(order.amount)}</p>
            </div>
          </div>
          {/* Progress steps */}
          {!isCancelled && (
            <div className="flex gap-1 mb-2">
              {steps.map((s, i) => (
                <div key={s} className={`h-1 flex-1 rounded-full transition-colors ${i < cfg.step ? 'bg-[#231F20]' : 'bg-[#E2DDD5]'}`} />
              ))}
            </div>
          )}
          {order.trackingNumber && !isCancelled && (
            <div className="flex items-center gap-2 mt-1.5">
              <svg className="w-3 h-3 text-[#B8A99A] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-[10px] text-[#B8A99A]">
                <span className="text-[#645E59] font-medium">{order.carrier}</span>
                {' · '}
                <span className="font-mono">{order.trackingNumber}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>);

}

function PaymentReceiptRow({ receipt }: {receipt: PaymentReceipt;}) {
  const cfg = receiptStatusConfig[receipt.status];

  function handleDownloadReceipt() {
    const content = [
      'INDIA ART & HERITAGE AUCTIONS',
      '─────────────────────────────────────────',
      `PAYMENT RECEIPT: ${receipt.receiptId}`,
      `DATE: ${receipt.date}`,
      '─────────────────────────────────────────',
      `DESCRIPTION: ${receipt.description}`,
      `PAYMENT METHOD: ${receipt.method}`,
      `STATUS: ${receipt.status.toUpperCase()}`,
      receipt.relatedInvoice ? `RELATED INVOICE: ${receipt.relatedInvoice}` : '',
      '─────────────────────────────────────────',
      `AMOUNT: ${formatINR(receipt.amount)}`,
      '─────────────────────────────────────────',
      'For queries: support@indiaartheritage.com'
    ].filter(Boolean).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${receipt.receiptId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex items-center gap-4 py-4 border-b border-[#E2DDD5] last:border-0">
      {/* Icon */}
      <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center ${receipt.status === 'completed' ? 'bg-[#EAF3EC]' : receipt.status === 'pending' ? 'bg-[#FDF0E8]' : 'bg-[#F0EDE8]'}`}>
        {receipt.status === 'completed' ? (
          <svg className="w-4 h-4 text-[#3A6B4A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : receipt.status === 'pending' ? (
          <svg className="w-4 h-4 text-[#A34828]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : (
          <svg className="w-4 h-4 text-[#645E59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#231F20] line-clamp-1">{receipt.description}</p>
        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
          <span className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${cfg.color}`}>
            {cfg.label}
          </span>
          <span className="text-xs text-[#B8A99A]">{receipt.date}</span>
          <span className="text-xs text-[#B8A99A]">·</span>
          <span className="text-xs text-[#645E59]">{receipt.method}</span>
        </div>
        {receipt.relatedInvoice && (
          <p className="text-[10px] text-[#B8A99A] mt-0.5">Ref: {receipt.relatedInvoice}</p>
        )}
      </div>
      <div className="flex flex-col items-end gap-2 shrink-0">
        <p className={`text-sm font-semibold ${receipt.status === 'pending' ? 'text-[#A34828]' : 'text-[#231F20]'}`}>
          {formatINR(receipt.amount)}
        </p>
        {receipt.status === 'completed' && (
          <button
            onClick={handleDownloadReceipt}
            className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#645E59] border border-[#E2DDD5] bg-[#F0EDE8] px-2.5 py-1 rounded-[3px] hover:bg-[#231F20] hover:text-[#FAF9F7] hover:border-[#231F20] transition-colors"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Receipt
          </button>
        )}
        {receipt.status === 'pending' && (
          <button className="text-[10px] font-semibold uppercase tracking-wider bg-[#A34828] text-[#FAF9F7] px-2.5 py-1 rounded-[3px] hover:bg-[#873B20] transition-colors">
            Pay Now
          </button>
        )}
      </div>
    </div>);

}

// ─── Main Page ────────────────────────────────────────────────────────────────
type TabId = 'bids' | 'won' | 'consignments' | 'history' | 'orders' | 'payments';

const tabs: {id: TabId;label: string;count: number;}[] = [
{ id: 'bids', label: 'Active Bids', count: activeBids.length },
{ id: 'won', label: 'Won Lots', count: wonLots.length },
{ id: 'orders', label: 'Order Status', count: orders.length },
{ id: 'history', label: 'Invoices', count: purchases.length },
{ id: 'payments', label: 'Payments', count: paymentReceipts.length },
{ id: 'consignments', label: 'Consignments', count: consignments.length }];


export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<TabId>('bids');

  const totalSpend = purchases.reduce((s, p) => s + p.amount, 0);
  const leadingCount = activeBids.filter((b) => b.status === 'leading').length;
  const pendingPayments = paymentReceipts.filter((r) => r.status === 'pending');
  const completedPayments = paymentReceipts.filter((r) => r.status === 'completed');

  return (
    <div className="min-h-screen bg-[#F5F3EF]">
      <Header />

      <main className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Profile Banner ── */}
          <div className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[5px] overflow-hidden mb-8">
            {/* Top strip */}
            <div className="h-24 bg-gradient-to-r from-[#231F20] via-[#3A3535] to-[#A34828] relative">
              
            </div>
            <div className="px-6 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-8">
                {/* Avatar */}
                <div className="flex items-end gap-4">
                  <div className="w-16 h-16 rounded-full border-4 border-[#FAF9F7] bg-[#231F20] flex items-center justify-center shrink-0 shadow-md">
                    <span className="font-display text-2xl font-semibold text-[#FAF9F7]">A</span>
                  </div>
                  <div className="pb-1">
                    <h1 className="font-display text-xl font-semibold text-[#231F20] tracking-wide">Arjun Mehta</h1>
                    <p className="text-xs text-[#B8A99A]">Collector since 2022 · Paddle #4821</p>
                  </div>
                </div>
                {/* Edit */}
                <button className="self-start sm:self-auto text-xs font-semibold uppercase tracking-wider text-[#645E59] border border-[#E2DDD5] bg-[#FAF9F7] px-4 py-2 rounded-[3px] hover:border-[#231F20] hover:text-[#231F20] transition-colors">
                  Edit Profile
                </button>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#E2DDD5] border border-[#E2DDD5] rounded-[5px] overflow-hidden mt-6">
                {[
                { label: 'Active Bids', value: activeBids.length.toString(), sub: `${leadingCount} leading` },
                { label: 'Lots Won', value: wonLots.length.toString(), sub: 'all time' },
                { label: 'Consignments', value: consignments.length.toString(), sub: 'in pipeline' },
                { label: 'Total Acquired', value: formatINR(totalSpend), sub: 'purchase value' }].
                map((stat) =>
                <div key={stat.label} className="bg-[#FAF9F7] px-5 py-4">
                    <p className="text-[10px] text-[#B8A99A] uppercase tracking-wider mb-1">{stat.label}</p>
                    <p className="font-display text-xl font-semibold text-[#231F20]">{stat.value}</p>
                    <p className="text-[10px] text-[#B8A99A] mt-0.5">{stat.sub}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Tabs ── */}
          <div className="grid grid-cols-3 sm:grid-cols-6 border border-[#E2DDD5] rounded-[5px] overflow-hidden bg-[#FAF9F7] mb-8">
            {tabs.map((tab) =>
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-3 px-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-colors border-r border-[#E2DDD5] last:border-r-0 ${
              activeTab === tab.id ?
              'bg-[#231F20] text-[#FAF9F7]' :
              'text-[#645E59] hover:text-[#231F20] hover:bg-[#F0EDE8]'}`
              }>
                <span className="text-center leading-tight">{tab.label}</span>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
              activeTab === tab.id ? 'bg-[#FAF9F7]/20 text-[#FAF9F7]' : 'bg-[#E2DDD5] text-[#645E59]'}`
              }>
                  {tab.count}
                </span>
              </button>
            )}
          </div>

          {/* ── Tab Panels ── */}

          {/* Active Bids */}
          {activeTab === 'bids' &&
          <div>
              <SectionHeader title="Active Bids" count={activeBids.length} cta="View All Auctions" ctaHref="/" />
              {activeBids.length === 0 ?
            <EmptyState message="No active bids. Browse current auctions to place your first bid." ctaLabel="Browse Auctions" ctaHref="/" /> :

            <div className="space-y-4">
                  {activeBids.map((bid) => <ActiveBidCard key={bid.id} bid={bid} />)}
                </div>
            }
              {/* Bid summary */}
              <div className="mt-6 bg-[#FAF9F7] border border-[#E2DDD5] rounded-[5px] p-5 flex flex-wrap gap-6">
                <div>
                  <p className="text-[10px] text-[#B8A99A] uppercase tracking-wider mb-1">Total Committed</p>
                  <p className="font-display text-lg font-semibold text-[#231F20]">
                    {formatINR(activeBids.reduce((s, b) => s + b.yourBid, 0))}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-[#B8A99A] uppercase tracking-wider mb-1">Leading</p>
                  <p className="font-display text-lg font-semibold text-[#3A6B4A]">{leadingCount} lot{leadingCount !== 1 ? 's' : ''}</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#B8A99A] uppercase tracking-wider mb-1">Outbid</p>
                  <p className="font-display text-lg font-semibold text-[#A34828]">
                    {activeBids.filter((b) => b.status === 'outbid').length} lot{activeBids.filter((b) => b.status === 'outbid').length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>
          }

          {/* Won Lots */}
          {activeTab === 'won' &&
          <div>
              <SectionHeader title="Won Lots" count={wonLots.length} />
              {wonLots.length === 0 ?
            <EmptyState message="No won lots yet. Keep bidding!" ctaLabel="Browse Auctions" ctaHref="/" /> :

            <div className="space-y-4">
                  {wonLots.map((lot) => <WonLotCard key={lot.id} lot={lot} />)}
                </div>
            }
            </div>
          }

          {/* Order Status */}
          {activeTab === 'orders' &&
          <div>
              <SectionHeader title="Order Status" count={orders.length} />
              {/* Status legend */}
              <div className="flex flex-wrap gap-2 mb-6">
                {(['confirmed','processing','shipped','out-for-delivery','delivered'] as OrderRecord['status'][]).map((s) => (
                  <span key={s} className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${orderStatusConfig[s].color}`}>
                    {orderStatusConfig[s].label}
                  </span>
                ))}
              </div>
              {orders.length === 0 ?
            <EmptyState message="No orders to track yet." ctaLabel="Browse Marketplace" ctaHref="/marketplace" /> :

            <div className="space-y-4">
                  {orders.map((order) => <OrderCard key={order.id} order={order} />)}
                </div>
            }
              {/* Summary */}
              <div className="mt-6 bg-[#FAF9F7] border border-[#E2DDD5] rounded-[5px] p-5 flex flex-wrap gap-6">
                {[
                  { label: 'In Transit', value: orders.filter(o => o.status === 'shipped' || o.status === 'out-for-delivery').length, color: 'text-[#A34828]' },
                  { label: 'Delivered', value: orders.filter(o => o.status === 'delivered').length, color: 'text-[#3A6B4A]' },
                  { label: 'Processing', value: orders.filter(o => o.status === 'confirmed' || o.status === 'processing').length, color: 'text-[#645E59]' }
                ].map(stat => (
                  <div key={stat.label}>
                    <p className="text-[10px] text-[#B8A99A] uppercase tracking-wider mb-1">{stat.label}</p>
                    <p className={`font-display text-lg font-semibold ${stat.color}`}>{stat.value} order{stat.value !== 1 ? 's' : ''}</p>
                  </div>
                ))}
              </div>
            </div>
          }

          {/* Purchase History / Invoices */}
          {activeTab === 'history' &&
          <div>
              <SectionHeader title="Invoices & Purchase History" count={purchases.length} />
              <div className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[5px] px-5">
                {purchases.map((record) => <PurchaseRow key={record.id} record={record} />)}
              </div>
              {/* Total */}
              <div className="mt-4 bg-[#231F20] rounded-[5px] px-5 py-4 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#FAF9F7]/60">Total Acquired Value</p>
                <p className="font-display text-xl font-semibold text-[#FAF9F7]">{formatINR(totalSpend)}</p>
              </div>
            </div>
          }

          {/* Payment Receipts */}
          {activeTab === 'payments' &&
          <div>
              <SectionHeader title="Payment Receipt History" count={paymentReceipts.length} />
              {/* Summary cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-[#E2DDD5] border border-[#E2DDD5] rounded-[5px] overflow-hidden mb-6">
                {[
                  { label: 'Total Paid', value: formatINR(completedPayments.reduce((s, r) => s + r.amount, 0)), sub: `${completedPayments.length} transactions`, color: 'text-[#231F20]' },
                  { label: 'Pending', value: formatINR(pendingPayments.reduce((s, r) => s + r.amount, 0)), sub: `${pendingPayments.length} awaiting`, color: 'text-[#A34828]' },
                  { label: 'Last Payment', value: completedPayments[0]?.date ?? '—', sub: completedPayments[0]?.method ?? '', color: 'text-[#231F20]' }
                ].map(stat => (
                  <div key={stat.label} className="bg-[#FAF9F7] px-5 py-4">
                    <p className="text-[10px] text-[#B8A99A] uppercase tracking-wider mb-1">{stat.label}</p>
                    <p className={`font-display text-lg font-semibold ${stat.color}`}>{stat.value}</p>
                    <p className="text-[10px] text-[#B8A99A] mt-0.5">{stat.sub}</p>
                  </div>
                ))}
              </div>
              {/* Pending first */}
              {pendingPayments.length > 0 && (
                <div className="mb-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#A34828] mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A34828] animate-pulse inline-block" />
                    Pending Payments
                  </p>
                  <div className="bg-[#FAF9F7] border border-[#A34828]/20 rounded-[5px] px-5">
                    {pendingPayments.map((r) => <PaymentReceiptRow key={r.id} receipt={r} />)}
                  </div>
                </div>
              )}
              {/* Completed */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#645E59] mb-3">Completed Transactions</p>
                <div className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[5px] px-5">
                  {completedPayments.map((r) => <PaymentReceiptRow key={r.id} receipt={r} />)}
                </div>
              </div>
            </div>
          }

          {/* Consignments */}
          {activeTab === 'consignments' &&
          <div>
              <SectionHeader title="Consignment Pipeline" count={consignments.length} cta="Submit New" ctaHref="/consignment" />
              {/* Stage legend */}
              <div className="flex flex-wrap gap-3 mb-6">
                {(Object.entries(stageConfig) as [ConsignmentItem['stage'], typeof stageConfig[ConsignmentItem['stage']]][]).map(([key, cfg]) =>
              <span key={key} className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${cfg.color}`}>
                    {cfg.label}
                  </span>
              )}
              </div>
              {consignments.length === 0 ?
            <EmptyState message="No consignments in progress. Submit a work for our next sale." ctaLabel="Consign a Work" ctaHref="/consignment" /> :

            <div className="space-y-4">
                  {consignments.map((item) => <ConsignmentCard key={item.id} item={item} />)}
                </div>
            }
            </div>
          }

        </div>
      </main>

      <Footer />
    </div>);

}

function EmptyState({ message, ctaLabel, ctaHref }: {message: string;ctaLabel: string;ctaHref: string;}) {
  return (
    <div className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[5px] py-16 text-center">
      <p className="text-sm text-[#B8A99A] mb-4">{message}</p>
      <Link href={ctaHref} className="inline-block text-xs font-semibold uppercase tracking-wider bg-[#231F20] text-[#FAF9F7] px-5 py-2.5 rounded-[3px] hover:bg-[#3A3535] transition-colors">
        {ctaLabel}
      </Link>
    </div>);

}