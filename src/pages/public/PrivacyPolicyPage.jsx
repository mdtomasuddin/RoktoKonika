import React from 'react';
import { ShieldCheck, Lock, FileText } from 'lucide-react';

export function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
          <Lock className="w-4 h-4 text-rose-600" /> নীতি ও সুরক্ষা
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">গোপনীয়তা নীতিমালা (Privacy Policy)</h1>
        <p className="text-xs sm:text-sm text-slate-500">সর্বশেষ আপডেট: সেপ্টেম্বর ২০২৬</p>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/90 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">১. তথ্যের গোপনীয়তা ও সুরক্ষা</h2>
          <p>
            রক্তকণিকা প্ল্যাটফর্ম রক্তদাতা এবং রক্ত সন্ধানকারী রোগীদের ব্যক্তিগত তথ্যের সর্বোচ্চ সুরক্ষা নিশ্চিত করতে প্রতিশ্রুতিবদ্ধ। রক্তদাতার ব্যক্তিগত পূর্ণ ঠিকানা কখনোই উন্মুক্তভাবে প্রদর্শন করা হয় না।
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">২. আমরা যেসব তথ্য সংগ্রহ করি</h2>
          <p>
            • রক্তদাতার নাম, রক্তের গ্রুপ, আনুমানিক এলাকা (জেলা ও থানা), সর্বশেষ রক্তদানের তারিখ এবং যোগাযোগের ফোন নম্বর। <br />
            • রোগীর রক্তের অনুরোধের ক্ষেত্রে রোগীর নাম, রক্তের গ্রুপ, হাসপাতালের নাম ও অবস্থান, যোগাযোগের ব্যক্তির নম্বর।
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">৩. তথ্যের ব্যবহার ও স্প্যাম প্রতিরোধ</h2>
          <p>
            সংগৃহীত তথ্য শুধুমাত্র জরুরি রক্তদান ও পারস্পরিক যোগাযোগের উদ্দেশ্যে ব্যবহৃত হয়। কোনো তৃতীয় পক্ষের বিজ্ঞাপনদাতা বা বাণিজ্যিক প্রতিষ্ঠানের কাছে তথ্য বিক্রয় বা বিনিময় করা হয় না।
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">৪. কুকিজ ও সেশন ডাটা</h2>
          <p>
            ব্যবহারকারীর সুবিধার্থে ব্রাউজার সেশন ও ভাষা পছন্দের জন্য লোকাল স্টোরেজ ব্যবহার করা হতে পারে।
          </p>
        </section>
      </div>
    </div>
  );
}

export function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
          <FileText className="w-4 h-4 text-rose-600" /> ব্যবহারবিধি ও শর্তাবলী
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">শর্তাবলী ও চিকিৎসাগত ডিসক্লেইমার (Terms)</h1>
        <p className="text-xs sm:text-sm text-slate-500">সর্বশেষ আপডেট: সেপ্টেম্বর ২০২৬</p>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/90 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">১. চিকিৎসা সংক্রান্ত ডিসক্লেইমার (Medical Disclaimer)</h2>
          <p className="bg-rose-50 p-4 rounded-2xl border border-rose-200 text-rose-950 font-medium">
            রক্তকণিকা কোনো হাসপাতাল বা রক্ত পরিসঞ্চালন ল্যাবরেটরি নয়। প্ল্যাটফর্মটি শুধুমাত্র রক্তদাতা ও গ্রহীতার মধ্যে ডিজিটাল সংযোগ তৈরি করে। রক্ত দেওয়ার পূর্বে অবশ্যই হাসপাতালের রেজিস্টার্ড চিকিৎসকের তত্ত্বাবধানে যথাযথ ক্রস-ম্যাচিং ও স্ক্রিনিং টেস্ট নিশ্চিত করতে হবে।
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">২. আর্থিক লেনদেন সম্পূর্ণ নিষিদ্ধ</h2>
          <p>
            স্বেচ্ছায় রক্তদান একটি নিঃস্বার্থ মানবিক সেবা। রক্তদানের বিনিময়ে যেকোনো প্রকার অর্থ দাবি করা বা গ্রহণ করা সম্পূর্ণ বেআইনি এবং প্ল্যাটফর্ম থেকে স্থায়ী বহিষ্কারযোগ্য অপরাধ।
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">৩. মিথ্যা অনুরোধ বা অপব্যবহার</h2>
          <p>
            মিথ্যা রক্তের অনুরোধ পোস্ট করা বা অন্যের নম্বর ব্যবহার করে অপব্যবহার করলে সাইবার অপরাধ আইন অনুযায়ী ব্যবস্থা নেওয়া হতে পারে।
          </p>
        </section>
      </div>
    </div>
  );
}
