import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Droplet, Phone, ArrowLeft, Send } from 'lucide-react';
import { authService } from '../../services/authService';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useToast } from '../../contexts/ToastContext';

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await authService.requestOtp(phone);
      addToast(res.message, 'info');
      navigate(`/verify-otp?phone=${encodeURIComponent(phone)}`);
    } catch (err) {
      addToast('ওটিপি পাঠাতে ব্যর্থ হয়েছে। নম্বরটি যাচাই করুন।', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-xl space-y-6">
        <Link to="/login" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-rose-600">
          <ArrowLeft className="w-4 h-4" /> লগইন পেজে ফিরে যান
        </Link>

        <div className="space-y-2 text-center">
          <h2 className="text-xl font-bold text-slate-900">পাসওয়ার্ড ভুলে গেছেন?</h2>
          <p className="text-xs text-slate-500">আপনার নিবন্ধিত মোবাইল নম্বর দিন। আমরা একটি ওটিপি কোড পাঠাব।</p>
        </div>

        <form onSubmit={handleRequestOtp} className="space-y-4">
          <Input
            label="মোবাইল নম্বর"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            leftIcon={<Phone className="w-4 h-4" />}
            placeholder="017XXXXXXXX"
          />

          <Button type="submit" variant="emergency" size="lg" className="w-full" isLoading={isLoading} leftIcon={<Send className="w-4 h-4" />}>
            ওটিপি কোড পাঠান
          </Button>
        </form>
      </div>
    </div>
  );
}

export function OtpVerificationPage() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [otp, setOtp] = useState(['1', '2', '3', '4', '5', '6']);
  const [isLoading, setIsLoading] = useState(false);

  const handleOtpChange = (index, val) => {
    if (val.length > 1) val = val[val.length - 1];
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    // Auto-focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const fullCode = otp.join('');
    if (fullCode.length < 6) {
      addToast('৬ সংখ্যার কোড সম্পূর্ণ লিখুন', 'warning');
      return;
    }
    setIsLoading(true);
    try {
      await authService.verifyOtp('phone', fullCode);
      addToast('ওটিপি যাচাই সফল হয়েছে!', 'success');
      navigate('/reset-password');
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-xl space-y-6 text-center">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900">ওটিপি ভেরিফিকেশন (OTP)</h2>
          <p className="text-xs text-slate-500">আপনার ফোনে পাঠানো ৬ সংখ্যার কোডটি প্রবেশ করান (ডেমো কোড: 123456)</p>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">
          <div className="flex justify-center gap-2">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                className="w-11 h-12 text-center text-lg font-black rounded-xl border border-slate-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
              />
            ))}
          </div>

          <Button type="submit" variant="emergency" size="lg" className="w-full" isLoading={isLoading}>
            কোড যাচাই করুন →
          </Button>
        </form>
      </div>
    </div>
  );
}

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      addToast('পাসওয়ার্ড দুটি মেলেনি', 'error');
      return;
    }
    setIsLoading(true);
    try {
      await authService.resetPassword('phone', password);
      addToast('পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে! লগইন করুন।', 'success');
      navigate('/login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold text-slate-900">নতুন পাসওয়ার্ড সেট করুন</h2>
          <p className="text-xs text-slate-500">একটি নিরাপদ ও শক্তিশালী নতুন পাসওয়ার্ড লিখুন</p>
        </div>

        <form onSubmit={handleReset} className="space-y-4">
          <Input
            label="নতুন পাসওয়ার্ড"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
          <Input
            label="পাসওয়ার্ড পুনরায় লিখুন"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
          />

          <Button type="submit" variant="emergency" size="lg" className="w-full" isLoading={isLoading}>
            পাসওয়ার্ড পরিবর্তন করুন
          </Button>
        </form>
      </div>
    </div>
  );
}
