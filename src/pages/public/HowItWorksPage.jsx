import React from 'react';
import { 
  PlusCircle, 
  Search, 
  PhoneCall, 
  HeartHandshake, 
  ShieldCheck, 
  HelpCircle
} from 'lucide-react';

export function HowItWorksPage() {
  const steps = [
    {
      num: '০১',
      title: 'রক্তের অনুরোধ পোস্ট করুন',
      desc: 'রোগীর রক্তের গ্রুপ, প্রয়োজনীয় রক্তের পরিমাণ, হাসপাতালের সঠিক ঠিকানা ও যোগাযোগের নম্বর দিয়ে সহজে অনুরোধ জানান।',
      icon: PlusCircle,
      color: 'bg-rose-50 text-rose-600'
    },
    {
      num: '০২',
      title: 'তাত্ক্ষণিক নোটিফিকেশন ও ফিল্টারিং',
      desc: 'আমাদের প্ল্যাটফর্ম সাথে সাথে ঐ নির্দিষ্ট গ্রুপ ও এলাকায় থাকা সক্রিয় রক্তদাতাদের কাছে নোটিফিকেশন পাঠিয়ে দেয়।',
      icon: Search,
      color: 'bg-sky-50 text-sky-600'
    },
    {
      num: '০৩',
      title: 'রক্তদাতার সম্মতি ও সংযোগ',
      desc: 'উপযুক্ত রক্তদাতা রক্তদানে সম্মতি দিলে রোগীর পরিবার তাৎক্ষণিক মেসেজ বা কল অপশন দেখতে পান।',
      icon: PhoneCall,
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      num: '০৪',
      title: 'ক্রস-ম্যাচিং ও নিরাপদ রক্তদান',
      desc: 'হাসপাতালের ল্যাবে রক্তদাতার রক্তের স্ক্রিনিং ও ক্রস-ম্যাচিং শেষে নিরাপদে রক্ত সঞ্চালন সম্পন্ন হয়।',
      icon: HeartHandshake,
      color: 'bg-amber-50 text-amber-600'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" /> প্ল্যাটফর্ম গাইড
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900">
          কীভাবে কাজ করে রক্তকণিকা?
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          রক্ত সন্ধান থেকে শুরু করে রক্তদান পর্যন্ত প্রতিটি পদক্ষেপ সহজ ও নিরাপদ করতে আমরা তৈরি করেছি একটি নিরবচ্ছিন্ন মানবিক প্রক্রিয়া।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div key={step.num} className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4 relative overflow-hidden">
              <span className="absolute top-6 right-6 text-3xl font-black text-slate-100">{step.num}</span>
              <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center`}>
                <Icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Trust & Safety Box */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-emerald-400" /> রক্তদানের ক্ষেত্রে কিছু জরুরি সতর্কতা
        </h3>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
          <li>• রক্ত দেওয়ার আগে রক্তদাতার রক্তচাপ, হিমোগ্লোবিন এবং শরীরের তাপমাত্রা পরীক্ষা করা উচিত।</li>
          <li>• হেপাটাইটিস বি, সি, এইচআইভি, ম্যালেরিয়া ও সিফিলিস টেস্ট ল্যাবরেটরি থেকে নিশ্চিত করা আবশ্যক।</li>
          <li>• রক্তদাতা ও রোগীর স্বজনদের মধ্যে যেকোনো ধরনের আর্থিক লেনদেন সম্পূর্ণ নিষিদ্ধ।</li>
        </ul>
      </div>
    </div>
  );
}
