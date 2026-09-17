import React from 'react';
import { Link } from 'react-router-dom';
import { Droplet, ShieldCheck, Users, Target, Award, Heart } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider">
          <Droplet className="w-4 h-4" /> আমাদের সম্পর্কে
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
          রক্তের প্রয়োজনে, মানুষের পাশে
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          “রক্তকণিকা” বাংলাদেশের সর্বস্তরের মানুষের জন্য একটি সম্পূর্ণ অলাভজনক, মানবিক ও আধুনিক ডিজিটাল রক্ত সেবা প্ল্যাটফর্ম।
        </p>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">আমাদের লক্ষ্য (Mission)</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            বাংলাদেশের যেকোনো প্রান্তে রক্তের প্রয়োজনে যেন কোনো মানুষ রক্তদাতার অভাবে মৃত্যুবরণ না করেন। ডিজিটাল প্রযুক্তির মাধ্যমে তাৎক্ষণিকভাবে রক্তগ্রহীতা ও রক্তদাতার মধ্যে নিরাপদ ও দ্রুত সংযোগ স্থাপন করাই আমাদের মূল উদ্দেশ্য।
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">আমাদের দৃষ্টিভঙ্গি (Vision)</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            একটি সামাজিক আন্দোলন গড়ে তোলা যেখানে প্রতিটি সুস্থ ও প্রাপ্তবয়স্ক তরুণ-তরুণী নিয়মিত স্বেচ্ছায় রক্তদান করবেন এবং পুরো বাংলাদেশে রক্তের কৃত্রিম সংকট পুরোপুরি দূর হবে।
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">মূল মূল্যবোধ</span>
          <h2 className="text-2xl sm:text-3xl font-black">যেসব নীতিতে আমরা অবিচল</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
            <h3 className="font-bold text-lg">১০০% অলাভজনক</h3>
            <p className="text-xs text-slate-400 leading-relaxed">রক্তকণিকা সম্পূর্ণ বিনা মূল্যে ও মানবতার সেবায় পরিচালিত। এখানে কোনো আর্থিক লেনদেনের সুযোগ নেই।</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <Heart className="w-8 h-8 text-rose-400" />
            <h3 className="font-bold text-lg">গোপনীয়তা ও নিরাপত্তা</h3>
            <p className="text-xs text-slate-400 leading-relaxed">ডোনার ও রোগীর সংবেদনশীল তথ্য কঠোরভাবে সুরক্ষিত। স্প্যাম ও হয়রানি রোধে আমরা সর্বোচ্চ সতর্ক।</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <Users className="w-8 h-8 text-sky-400" />
            <h3 className="font-bold text-lg">স্বেচ্ছাসেবী নেটওয়ার্ক</h3>
            <p className="text-xs text-slate-400 leading-relaxed">সারা দেশের হাজারো তরুণ স্কাউট, রেড ক্রিসেন্ট, সন্ধানী ও বিভিন্ন বিশ্ববিদ্যালয়ের ভলান্টিয়ারদের সমন্বয়।</p>
          </div>
        </div>
      </div>

      {/* CTA Bottom */}
      <div className="text-center p-8 bg-rose-50 rounded-3xl border border-rose-200 space-y-4">
        <h3 className="text-xl font-black text-slate-900">আপনিও কি মানুষের পাশে দাঁড়াতে চান?</h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto">আজই রক্তকণিকার স্বেচ্ছাসেবী রক্তদাতা হিসেবে নিবন্ধন করুন অথবা রক্তের অনুরোধ পোস্ট করুন।</p>
        <div className="flex justify-center gap-3">
          <Link to="/become-a-donor">
            <Button variant="emergency" size="lg">রক্তদাতা হোন</Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" size="lg">যোগাযোগ করুন</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
