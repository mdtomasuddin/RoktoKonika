import React, { useState } from 'react';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Send
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input, Textarea } from '../../components/ui/Input';
import { EMERGENCY_HOTLINES } from '../../constants';
import { useToast } from '../../contexts/ToastContext';

export function ContactPage() {
  const { addToast } = useToast();
  const [name, setName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setName('');
      setEmailOrPhone('');
      setSubject('');
      setMessage('');
      addToast('ধন্যবাদ! আপনার বার্তাটি রক্তকণিকা সেন্ট্রাল টিমে পৌঁছেছে।', 'success');
    }, 500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider">
          <PhoneCall className="w-4 h-4" /> হেল্পডেস্ক ও যোগাযোগ
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900">
          আমাদের সাথে যোগাযোগ করুন
        </h1>
        <p className="text-sm text-slate-600">
          জরুরি রক্তের সহায়তা, প্রযুক্তিগত সমস্যা বা যেকোনো পরামর্শের জন্য আমাদের হটলাইন বা মেসেজ পাঠাতে পারেন।
        </p>
      </div>

      {/* Emergency Hotlines Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {EMERGENCY_HOTLINES.map((item, idx) => (
          <div key={idx} className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2">
            <span className="text-xs text-slate-500 font-bold">{item.name}</span>
            <a href={`tel:${item.number}`} className="text-xl font-black text-rose-600 block hover:underline">
              {item.number}
            </a>
            <p className="text-xs text-slate-500">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Contact Form & Office Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Office Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white space-y-6">
            <h3 className="text-xl font-bold text-white">কেন্দ্রীয় কার্যালয় ও তথ্য কেন্দ্র</h3>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">সদর দপ্তর:</strong>
                  <span>শাহবাগ মোড়, ঢাকা - ১০০০, বাংলাদেশ</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">ইমেইল:</strong>
                  <span>support@roktokonika.org.bd</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <PhoneCall className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">সাপোর্ট হটলাইন:</strong>
                  <span>০৯৬১২-৮৮৯৯০০ (সকাল ৮টা - রাত ১০টা)</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-xs text-slate-400">
              জরুরি চিকিৎসা বা রক্ত পরিসঞ্চালনের সিদ্ধান্তের জন্য সর্বদা হাসপাতালের চিকিৎসকের পরামর্শ নিন।
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-rose-600" /> যেকোনো প্রশ্ন বা বার্তা পাঠান
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="আপনার নাম"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="যেমন: তানভীর হাসান"
              />
              <Input
                label="ইমেইল অথবা মোবাইল নম্বর"
                required
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="name@email.com বা 017XXXXXXXX"
              />
            </div>

            <Input
              label="বিষয় (Subject)"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="যেমন: রক্তদাতা আইডি সংক্রান্ত জিজ্ঞাসা"
            />

            <Textarea
              label="আপনার বিস্তারিত বার্তা"
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="আপনার প্রশ্ন বা মতামত লিখুন..."
            />

            <Button type="submit" variant="emergency" size="lg" isLoading={isSending} leftIcon={<Send className="w-4 h-4" />}>
              বার্তা পাঠান
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
