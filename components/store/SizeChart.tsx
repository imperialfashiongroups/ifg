'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Ruler } from 'lucide-react';

interface SizeChartProps {
  category: string;
}

const SIZE_CHARTS: Record<string, { headers: string[]; rows: string[][] }> = {
  default: {
    headers: ['Size', 'Chest (cm)', 'Waist (cm)', 'Hips (cm)', 'Length (cm)'],
    rows: [
      ['XS', '78–82',  '62–66',  '84–88',  '96'],
      ['S',  '82–86',  '66–70',  '88–92',  '98'],
      ['M',  '86–90',  '70–74',  '92–96',  '100'],
      ['L',  '90–94',  '74–78',  '96–100', '102'],
      ['XL', '94–100', '78–84',  '100–106','104'],
      ['2XL','100–108','84–92',  '106–114','106'],
      ['3XL','108–116','92–100', '114–122','108'],
    ],
  },
  men: {
    headers: ['Size', 'Chest (cm)', 'Waist (cm)', 'Shoulder (cm)', 'Length (cm)'],
    rows: [
      ['S',  '84–88',  '76–80',  '42',  '70'],
      ['M',  '88–92',  '80–84',  '44',  '72'],
      ['L',  '92–96',  '84–88',  '46',  '74'],
      ['XL', '96–100', '88–92',  '48',  '76'],
      ['2XL','100–106','92–98',  '50',  '78'],
      ['3XL','106–112','98–104', '52',  '80'],
    ],
  },
  kids: {
    headers: ['Size', 'Age', 'Height (cm)', 'Chest (cm)', 'Waist (cm)'],
    rows: [
      ['2–3Y',  '2–3',  '92–98',   '52–54', '51–53'],
      ['3–4Y',  '3–4',  '98–104',  '54–56', '53–55'],
      ['4–5Y',  '4–5',  '104–110', '56–58', '55–57'],
      ['5–6Y',  '5–6',  '110–116', '58–60', '57–59'],
      ['6–7Y',  '6–7',  '116–122', '60–63', '59–61'],
      ['7–8Y',  '7–8',  '122–128', '63–66', '61–63'],
      ['8–10Y', '8–10', '128–140', '66–70', '63–66'],
    ],
  },
  footwear: {
    headers: ['UK', 'EU', 'US (Men)', 'US (Women)', 'Foot Length (cm)'],
    rows: [
      ['4',  '37', '5',  '6',  '23.0'],
      ['5',  '38', '6',  '7',  '24.0'],
      ['6',  '39', '7',  '8',  '25.0'],
      ['7',  '40', '8',  '9',  '26.0'],
      ['8',  '41', '9',  '10', '27.0'],
      ['9',  '42', '10', '11', '28.0'],
      ['10', '43', '11', '12', '29.0'],
      ['11', '44', '12', '13', '30.0'],
    ],
  },
};

// Measurement tips
const MEASUREMENT_TIPS = [
  'Use a soft measuring tape',
  'Measure over light inner clothing',
  'Keep tape parallel to the floor',
  'For best fit, compare measurements with the size chart',
];

export default function SizeChart({ category }: SizeChartProps) {
  const [open, setOpen] = useState(false);
  const [unit, setUnit] = useState<'cm' | 'inch'>('cm');

  const chartKey = category.toLowerCase().includes('men')
    ? 'men'
    : category.toLowerCase().includes('kids') || category.toLowerCase().includes('frock')
    ? 'kids'
    : category.toLowerCase().includes('footwear') || category.toLowerCase().includes('shoe')
    ? 'footwear'
    : 'default';

  const chart = SIZE_CHARTS[chartKey];

  const convertToInch = (val: string) => {
    if (!val || isNaN(parseFloat(val))) return val;
    const parts = val.split('–');
    return parts.map(p => (parseFloat(p) / 2.54).toFixed(1)).join('–');
  };

  const getDisplayValue = (val: string, colIndex: number) => {
    const isMeasurement = colIndex > 0 && !val.includes('Y') && !val.includes('UK') && !isNaN(parseFloat(val.split('–')[0]));
    if (unit === 'inch' && isMeasurement) return convertToInch(val);
    return val;
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 text-sm text-gold-500 hover:text-gold-600 font-medium transition-colors"
        id="size-chart-btn"
      >
        <Ruler className="w-4 h-4" />
        Size Chart
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gold-50 rounded-lg flex items-center justify-center">
                  <Ruler className="w-4 h-4 text-gold-500" />
                </div>
                <h2 className="font-serif font-bold text-brand-black text-xl">Size Guide</h2>
              </div>
              <div className="flex items-center gap-3">
                {/* Unit Toggle */}
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setUnit('cm')}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${unit === 'cm' ? 'bg-white shadow-sm text-brand-black' : 'text-gray-500'}`}
                  >
                    CM
                  </button>
                  <button
                    onClick={() => setUnit('inch')}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${unit === 'inch' ? 'bg-white shadow-sm text-brand-black' : 'text-gray-500'}`}
                  >
                    INCH
                  </button>
                </div>
                <button onClick={() => setOpen(false)} className="p-1.5 hover:bg-gray-100 rounded-lg">
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-auto p-5 flex-1">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-brand-black text-white">
                      {chart.headers.map((h, i) => (
                        <th key={h} className={`px-4 py-3 font-medium text-xs tracking-wider whitespace-nowrap ${i === 0 ? 'text-left rounded-tl-lg' : 'text-center'} ${i === chart.headers.length - 1 ? 'rounded-tr-lg' : ''}`}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {chart.rows.map((row, ri) => (
                      <tr key={ri} className={`${ri % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gold-50 transition-colors`}>
                        {row.map((cell, ci) => (
                          <td key={ci} className={`px-4 py-3 ${ci === 0 ? 'font-bold text-gold-600 text-left' : 'text-center text-gray-700'} whitespace-nowrap`}>
                            {getDisplayValue(cell, ci)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Tips */}
              <div className="mt-6 p-4 bg-gold-50 rounded-xl border border-gold-100">
                <p className="text-sm font-semibold text-brand-black mb-3">📏 How to Measure</p>
                <ul className="space-y-1.5">
                  {MEASUREMENT_TIPS.map(tip => (
                    <li key={tip} className="text-xs text-gray-600 flex items-start gap-2">
                      <span className="text-gold-500 mt-0.5">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-xs text-gray-400 mt-4 text-center">
                * Measurements are approximate and may vary by ±1–2 cm. When in doubt, size up.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
