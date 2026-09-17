import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  User, 
  ShieldAlert, 
  MoreVertical, 
  Hospital, 
  Clock, 
  Check, 
  CheckCheck,
  AlertTriangle
} from 'lucide-react';
import { MOCK_CONVERSATIONS, MOCK_MESSAGES } from '../../mocks/notifications';
import { messageService } from '../../services/notificationService';
import { Button } from '../../components/ui/Button';
import { BloodGroupBadge } from '../../components/common/BloodGroupBadge';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../contexts/ToastContext';

export function MessagesPage() {
  const { addToast } = useToast();
  const [conversations, setConversations] = useState(MOCK_CONVERSATIONS);
  const [activeConvId, setActiveConvId] = useState('conv-1');
  const [messages, setMessages] = useState(MOCK_MESSAGES['conv-1'] || []);
  const [inputText, setInputText] = useState('');
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState('spam');

  const activeConv = conversations.find(c => c.id === activeConvId) || conversations[0];

  const handleSelectConv = (c) => {
    setActiveConvId(c.id);
    setMessages(MOCK_MESSAGES[c.id] || []);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const textToSend = inputText;
    setInputText('');

    const newMsg = await messageService.sendMessage(activeConvId, textToSend);
    setMessages(prev => [...prev, newMsg]);

    // Simulated automatic helpful reply
    setTimeout(() => {
      const autoReply = {
        id: `reply-${Date.now()}`,
        conversationId: activeConvId,
        senderId: activeConv.participantId,
        senderName: activeConv.participantName,
        text: 'ধন্যবাদ, আমি আপনার বার্তাটি পেয়েছি। যথাসময়ে হাসপাতালে উপস্থিত থাকব।',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: true,
        isMine: false
      };
      setMessages(prev => [...prev, autoReply]);
    }, 1200);
  };

  const handleReportUser = () => {
    setReportModalOpen(false);
    addToast('রিপোর্টটি সফলভাবে অ্যাডমিন মডারেশন টিমে পাঠানো হয়েছে।', 'info');
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden h-[750px] flex flex-col md:flex-row">
      {/* Left Conversation List */}
      <div className="w-full md:w-80 lg:w-96 border-r border-slate-200/90 flex flex-col flex-shrink-0 bg-slate-50/50">
        <div className="p-4 border-b border-slate-200/90 bg-white">
          <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-rose-600" />
            মেসেজ ও চ্যাট ({conversations.length})
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {conversations.map(c => {
            const isSelected = c.id === activeConvId;
            return (
              <div
                key={c.id}
                onClick={() => handleSelectConv(c)}
                className={`p-4 cursor-pointer transition-colors flex items-start gap-3 ${
                  isSelected ? 'bg-rose-50/70 border-l-4 border-rose-600' : 'hover:bg-slate-100/70 bg-white'
                }`}
              >
                <img
                  src={c.participantAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
                  alt={c.participantName}
                  className="w-11 h-11 rounded-full object-cover border border-slate-200 flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                      {c.participantName}
                    </h4>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap">{c.lastMessageTime}</span>
                  </div>

                  <p className="text-xs text-slate-500 truncate mb-1">{c.participantRole}</p>
                  <p className="text-xs text-slate-700 truncate leading-snug">{c.lastMessage}</p>

                  {c.requestReference && (
                    <div className="mt-2 flex items-center gap-1.5 text-[10px] bg-white px-2 py-0.5 rounded-md border border-slate-200 text-slate-600 truncate">
                      <span className="font-bold text-rose-600">[{c.requestReference.bloodGroup}]</span>
                      <span className="truncate">{c.requestReference.hospital}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Active Chat Window */}
      <div className="flex-1 flex flex-col h-full bg-slate-50/30">
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-200/90 bg-white flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={activeConv.participantAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
              alt={activeConv.participantName}
              className="w-10 h-10 rounded-full object-cover border border-slate-200"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-slate-900">{activeConv.participantName}</h3>
                {activeConv.bloodGroup && <BloodGroupBadge bloodGroup={activeConv.bloodGroup} size="sm" />}
              </div>
              <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> সক্রিয়
              </p>
            </div>
          </div>

          <button
            onClick={() => setReportModalOpen(true)}
            className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-slate-100 transition-colors text-xs flex items-center gap-1"
            title="রিপোর্ট বা ব্লক"
          >
            <AlertTriangle className="w-4 h-4" /> রিপোর্ট
          </button>
        </div>

        {/* Request Reference Banner */}
        {activeConv.requestReference && (
          <div className="p-3 bg-rose-50/70 border-b border-rose-100 flex items-center justify-between text-xs text-rose-950 px-5">
            <div className="flex items-center gap-2">
              <Hospital className="w-4 h-4 text-rose-600" />
              <span>রক্তের অনুরোধ: <strong>{activeConv.requestReference.patientName}</strong> ({activeConv.requestReference.hospital})</span>
            </div>
            <span className="font-bold bg-rose-600 text-white px-2 py-0.5 rounded-md text-[10px]">
              {activeConv.requestReference.bloodGroup}
            </span>
          </div>
        )}

        {/* Chat Message Bubble Feed */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.isMine ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-md p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                  msg.isMine
                    ? 'bg-rose-600 text-white rounded-br-none'
                    : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
              <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1 px-1">
                <span>{msg.timestamp}</span>
                {msg.isMine && <CheckCheck className="w-3.5 h-3.5 text-rose-600" />}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Responses */}
        <div className="px-4 py-2 bg-white/70 border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {['রক্তের গ্রুপ নিশ্চিত করুন', 'হাসপাতালের লোকেশন কোথায়?', 'আমি আসছি', 'ধন্যবাদ'].map((q, idx) => (
            <button
              key={idx}
              onClick={() => setInputText(q)}
              className="text-[11px] bg-slate-100 hover:bg-rose-50 hover:text-rose-700 px-3 py-1 rounded-full text-slate-600 whitespace-nowrap transition-colors border border-slate-200"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Send Input Bar */}
        <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-200/90 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="আপনার বার্তা লিখুন..."
            className="flex-1 px-4 py-2.5 rounded-2xl border border-slate-200 text-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
          />
          <Button type="submit" variant="emergency" size="md" className="rounded-2xl px-5">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>

      {/* Report Modal */}
      {reportModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setReportModalOpen(false)}
          title="ব্যবহারকারীর বিরুদ্ধে রিপোর্ট"
          subtitle={`রিপোর্ট করা হচ্ছে: ${activeConv.participantName}`}
        >
          <div className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">রিপোর্টের কারণ</label>
              <select
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm"
              >
                <option value="spam">স্প্যাম বা অবাঞ্ছিত বার্তা</option>
                <option value="fake">ভুল বা বিভ্রান্তিকর তথ্য</option>
                <option value="money">রক্তের বিনিময়ে টাকা দাবি</option>
                <option value="abuse">অশালীন আচরণ</option>
              </select>
            </div>

            <div className="flex items-center gap-3 pt-3">
              <Button variant="outline" className="flex-1" onClick={() => setReportModalOpen(false)}>
                বাতিল
              </Button>
              <Button variant="danger" className="flex-1" onClick={handleReportUser}>
                রিপোর্ট জমা দিন
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export function SettingsPage() {
  const { addToast } = useToast();
  const [notifySms, setNotifySms] = useState(true);
  const [notifyApp, setNotifyApp] = useState(true);
  const [hidePhone, setHidePhone] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    addToast('সেটিংস সফলভাবে সংরক্ষিত হয়েছে!', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 mb-1">সেটিংস ও নিরাপত্তা (Settings)</h1>
        <p className="text-xs sm:text-sm text-slate-500">বিজ্ঞপ্তি ও অ্যাকাউন্টের গোপনীয়তা নিয়ন্ত্রণ করুন</p>
      </div>

      <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">বিজ্ঞপ্তি সংক্রান্ত সেটিংস</h3>
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-bold text-xs sm:text-sm text-slate-800">জরুরি রক্তের পুশ নোটিফিকেশন</p>
              <p className="text-xs text-slate-500">আপনার এলাকায় রক্তদানের অনুরোধ পোস্ট হলে বিজ্ঞপ্তি পাবেন</p>
            </div>
            <input type="checkbox" checked={notifyApp} onChange={(e) => setNotifyApp(e.target.checked)} className="w-4 h-4 rounded text-rose-600" />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-bold text-xs sm:text-sm text-slate-800">এসএমএস অ্যালার্ট</p>
              <p className="text-xs text-slate-500">জরুরি ও-নেগেটিভ বা বিরল রক্তের প্রয়োজনে ফোনে এসএমএস পাঠানো হবে</p>
            </div>
            <input type="checkbox" checked={notifySms} onChange={(e) => setNotifySms(e.target.checked)} className="w-4 h-4 rounded text-rose-600" />
          </label>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">গোপনীয়তা ফিল্টার</h3>
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-bold text-xs sm:text-sm text-slate-800">সর্বজনীন তালিকা থেকে ফোন নম্বর গোপন রাখুন</p>
              <p className="text-xs text-slate-500">শুধুমাত্র প্ল্যাটফর্ম মেসেজের মাধ্যমে রক্তপ্রার্থী আপনার সাথে যোগাযোগ করতে পারবে</p>
            </div>
            <input type="checkbox" checked={hidePhone} onChange={(e) => setHidePhone(e.target.checked)} className="w-4 h-4 rounded text-rose-600" />
          </label>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <Button type="submit" variant="emergency">সেটিংস সেভ করুন</Button>
        </div>
      </form>
    </div>
  );
}
