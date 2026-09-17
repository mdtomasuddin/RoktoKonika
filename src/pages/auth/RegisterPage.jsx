import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Droplet, Lock, Mail, User, Phone, MapPin, HeartHandshake } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { BloodGroupSelector } from '../../components/common/BloodGroupSelector';
import { LocationSelector } from '../../components/common/LocationSelector';
import { useToast } from '../../contexts/ToastContext';

export function RegisterPage() {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const { addToast } = useToast();

  const [role, setRole] = useState('donor'); // 'donor' or 'seeker'
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [division, setDivision] = useState('Dhaka');
  const [district, setDistrict] = useState('Dhaka City');
  const [area, setArea] = useState('ধানমন্ডি (Dhanmondi)');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register({
        name,
        phone,
        email,
        password,
        role,
        bloodGroup,
        division,
        district,
        area
      });
      addToast(`স্বাগতম, ${res.user.name}! নিবন্ধন সফল হয়েছে।`, 'success');
      navigate('/dashboard');
    } catch (err) {
      addToast('নিবন্ধন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।', 'error');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-lg w-full space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-xl">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center text-white shadow-md">
              <Droplet className="w-6 h-6 fill-white" />
            </div>
            <span className="text-2xl font-black text-slate-900">
              রক্ত<span className="text-rose-600">কণিকা</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold text-slate-900 mt-2">নতুন অ্যাকাউন্ট তৈরি করুন</h2>
          <p className="text-xs text-slate-500">রক্তদাতা অথবা রক্তগ্রহীতা হিসেবে যোগ দিন</p>
        </div>

        {/* Role Switcher Pills */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-2xl">
          <button
            type="button"
            onClick={() => setRole('donor')}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${role === 'donor' ? 'bg-white text-rose-700 shadow-sm' : 'text-slate-600'}`}
          >
            🩸 রক্তদাতা (Donor)
          </button>
          <button
            type="button"
            onClick={() => setRole('seeker')}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${role === 'seeker' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
          >
            🔍 রক্তপ্রার্থী (Seeker)
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="আপনার পুরো নাম"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            leftIcon={<User className="w-4 h-4" />}
            placeholder="যেমন: তানভীর আহমেদ"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="মোবাইল নম্বর"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              leftIcon={<Phone className="w-4 h-4" />}
              placeholder="017XXXXXXXX"
            />
            <Input
              label="ইমেইল (ঐচ্ছিক)"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
              placeholder="name@email.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              রক্তের গ্রুপ <span className="text-rose-500">*</span>
            </label>
            <BloodGroupSelector value={bloodGroup} onChange={setBloodGroup} />
          </div>

          <LocationSelector
            division={division}
            district={district}
            area={area}
            onDivisionChange={setDivision}
            onDistrictChange={setDistrict}
            onAreaChange={setArea}
            required
          />

          <Input
            label="পাসওয়ার্ড"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4" />}
            placeholder="••••••••"
          />

          <Button
            type="submit"
            variant="emergency"
            size="lg"
            className="w-full shadow-lg"
            isLoading={loading}
          >
            অ্যাকাউন্ট তৈরি করুন →
          </Button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
          ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
          <Link to="/login" className="font-bold text-rose-600 hover:underline">
            লগইন করুন
          </Link>
        </div>
      </div>
    </div>
  );
}
