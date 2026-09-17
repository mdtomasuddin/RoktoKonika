import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldAlert, Heart, CheckCircle2 } from 'lucide-react';

export function FAQPage() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'কে কে রক্তদান করতে পারবেন?',
      a: '১৮ থেকে ৬০ বছর বয়সী যেকোনো সুস্থ নারী ও পুরুষ রক্তদান করতে পারেন। পুরুষের ওজন কমপক্ষে ৫০ কেজি এবং নারীর ওজন কমপক্ষে ৪৫ কেজি হতে হবে।'
    },
    {
      q: 'কত দিন পর পর রক্তদান করা যায়?',
      a: 'সুস্থ পুরুষ প্রতি ৩ মাস পর পর এবং সুস্থ নারী প্রতি ৪ মাস পর পর নিরাপদে রক্তদান করতে পারেন।'
    },
    {
      q: 'রক্তদানে কি শরীরে কোনো দুর্বলতা বা ক্ষতি হয়?',
      a: 'একেবারেই না। একজন প্রাপ্তবয়স্ক মানুষের শরীরে গড়ে ৫ থেকে ৬ লিটার রক্ত থাকে। রক্তদানের সময় মাত্র ৩৫০-৪৫০ মিলি রক্ত নেওয়া হয়, যা শরীরের মোট রক্তের মাত্র ৭-৮%। ২৪ থেকে ৪৮ ঘণ্টার মধ্যে শরীরে তরল অংশ পূরণ হয়ে যায় এবং কয়েক সপ্তাহের মধ্যে নতুন লোহিত কণিকা তৈরি হয়।'
    },
    {
      q: 'রক্তকণিকা প্ল্যাটফর্মে ডোনার হতে কি কোনো ফি দিতে হয়?',
      a: 'না, রক্তকণিকা সম্পূর্ণ বিনামূল্যে পরিচালিত একটি মানবিক প্ল্যাটফর্ম। এখানে ডোনার বা রিকোয়েস্টার কারো থেকেই কোনো প্রকার ফি নেওয়া হয় না।'
    },
    {
      q: 'রক্তদানের পূর্বে কী কী প্রস্তুতি নেওয়া দরকার?',
      a: 'রক্তদানের আগের রাতে পর্যাপ্ত ঘুমানো উচিত, রক্তদানের ২-৩ ঘণ্টা আগে স্বাস্থ্যকর খাবার খাওয়া এবং প্রচুর পানি পান করা উচিত। খালি পেটে কখনোই রক্ত দেওয়া উচিত নয়।'
    },
    {
      q: 'রক্তগ্রহীতার জন্য সবচেয়ে জরুরি পদক্ষেপ কী?',
      a: 'রক্ত নেওয়ার পূর্বে অবশ্যই উপযুক্ত রেজিস্টার্ড ব্লাড ট্রান্সফিউশন ল্যাবে রক্তদাতার রক্তের সাথে রোগীর রক্তের ক্রস-ম্যাচিং এবং ৫টি বাধ্যতামূলক স্ক্রিনিং টেস্ট (HIV, Hepatitis B/C, Malaria, VDRL) সম্পন্ন করতে হবে।'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" /> সাধারণ জিজ্ঞাসা
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900">
          প্রশ্নোত্তর ও স্বাস্থ্য তথ্য (FAQ)
        </h1>
        <p className="text-sm text-slate-600">
          রক্তদান ও রক্ত গ্রহণ সংক্রান্ত সচরাচর জিজ্ঞাসিত প্রশ্ন ও চিকিৎসাবিজ্ঞান ভিত্তিক সঠিক তথ্য।
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden transition-all shadow-xs"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 text-left font-bold text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
              >
                <span className="text-sm sm:text-base">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180 text-rose-600' : ''}`} />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
