import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Droplet, Lock, Mail } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useToast } from '../../contexts/ToastContext';

export function LoginPage() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const { addToast } = useToast();

  const [emailOrPhone, setEmailOrPhone] = useState('tanvir.donor@example.com');
  const [password, setPassword] = useState('123456');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(emailOrPhone, password);
      addToast(`স্বাগতম, ${res.user.name}!`, 'success');
      if (res.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      addToast('লগইন ব্যর্থ হয়েছে। সঠিক তথ্য দিন।', 'error');
    }
  };

  const handleQuickLogin = (roleType) => {
    if (roleType === 'donor') {
      setEmailOrPhone('tanvir.donor@example.com');
    } else if (roleType === 'seeker') {
      setEmailOrPhone('kamrul@example.com');
    } else if (roleType === 'admin') {
      setEmailOrPhone('admin@roktokonika.org.bd');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-xl">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center text-white shadow-md">
              <Droplet className="w-6 h-6 fill-white" />
            </div>
            <span className="text-2xl font-black text-slate-900">
              রক্ত<span className="text-rose-600">কণিকা</span><span className="text-slate-500 text-lg font-bold ml-1">-RoktoKonika</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold text-slate-900 mt-2">অ্যাকাউন্টে লগইন করুন</h2>
          <p className="text-xs text-slate-500">আপনার ড্যাশবোর্ড ও অনুরোধসমূহ পরিচালনা করতে লগইন করুন</p>
        </div>

        {/* Quick Demo Logins Buttons */}
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
          <span className="font-bold text-slate-700 block text-[11px] uppercase tracking-wider">দ্রুত ডেমো লগইন নির্বাচন:</span>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => handleQuickLogin('donor')}
              className="px-2 py-1.5 rounded-lg bg-rose-50 text-rose-700 font-bold border border-rose-200 hover:bg-rose-100 text-[11px]"
            >
              🩸 ডোনার
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('seeker')}
              className="px-2 py-1.5 rounded-lg bg-sky-50 text-sky-700 font-bold border border-sky-200 hover:bg-sky-100 text-[11px]"
            >
              🔍 গ্রহীতা
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="px-2 py-1.5 rounded-lg bg-purple-50 text-purple-700 font-bold border border-purple-200 hover:bg-purple-100 text-[11px]"
            >
              🛡️ অ্যাডমিন
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="ইমেইল অথবা মোবাইল নম্বর"
            type="text"
            required
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
            placeholder="example@mail.com বা 017XXXXXXXX"
          />

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium text-slate-700">পাসওয়ার্ড</label>
              <Link to="/forgot-password" className="text-xs font-semibold text-rose-600 hover:underline">
                পাসওয়ার্ড ভুলে গেছেন?
              </Link>
            </div>
            <Input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
              placeholder="••••••••"
            />
          </div>

          <Button
            type="submit"
            variant="emergency"
            size="lg"
            className="w-full shadow-lg"
            isLoading={loading}
          >
            লগইন করুন →
          </Button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
          কোনো অ্যাকাউন্ট নেই?{' '}
          <Link to="/register" className="font-bold text-rose-600 hover:underline">
            নতুন নিবন্ধন করুন
          </Link>
        </div>
      </div>
    </div>
  );
}
