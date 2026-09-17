import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from '../components/layouts/PublicLayout';
import { DashboardLayout } from '../components/layouts/DashboardLayout';
import { AdminLayout } from '../components/layouts/AdminLayout';

// Public Pages
import { HomePage } from '../pages/public/HomePage';
import { FindBloodPage } from '../pages/public/FindBloodPage';
import { BloodRequestsPage } from '../pages/public/BloodRequestsPage';
import { BloodRequestDetailPage } from '../pages/public/BloodRequestDetailPage';
import { RequestBloodPage } from '../pages/public/RequestBloodPage';
import { BecomeDonorPage } from '../pages/public/BecomeDonorPage';
import { DonorsPage } from '../pages/public/DonorsPage';
import { DonorDetailPage } from '../pages/public/DonorDetailPage';
import { HospitalsPage, HospitalDetailPage } from '../pages/public/HospitalsPage';
import { BloodBanksPage, BloodBankDetailPage } from '../pages/public/BloodBanksPage';
import { AboutPage } from '../pages/public/AboutPage';
import { HowItWorksPage } from '../pages/public/HowItWorksPage';
import { FAQPage } from '../pages/public/FAQPage';
import { ContactPage } from '../pages/public/ContactPage';
import { PrivacyPolicyPage, TermsPage } from '../pages/public/PrivacyPolicyPage';

// Auth Pages
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { ForgotPasswordPage, OtpVerificationPage, ResetPasswordPage } from '../pages/auth/ForgotPasswordPage';

// Dashboard Pages
import { DashboardOverviewPage } from '../pages/dashboard/DashboardOverviewPage';
import { MyProfilePage, MyBloodRequestsPage } from '../pages/dashboard/MyProfilePage';
import { DonationHistoryPage, NotificationsPage } from '../pages/dashboard/DonationHistoryPage';
import { MessagesPage, SettingsPage } from '../pages/dashboard/MessagesPage';

// Admin Pages
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { AdminUsersPage, AdminDonorsPage } from '../pages/admin/AdminUsersPage';
import { AdminBloodRequestsPage, AdminHospitalsPage } from '../pages/admin/AdminBloodRequestsPage';
import { AdminBloodBanksPage, AdminVerificationsPage } from '../pages/admin/AdminBloodBanksPage';
import { AdminReportsPage, AdminSettingsPage } from '../pages/admin/AdminReportsPage';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/find-blood" element={<FindBloodPage />} />
        <Route path="/blood-requests" element={<BloodRequestsPage />} />
        <Route path="/blood-requests/:id" element={<BloodRequestDetailPage />} />
        <Route path="/request-blood" element={<RequestBloodPage />} />
        <Route path="/become-a-donor" element={<BecomeDonorPage />} />
        <Route path="/donors" element={<DonorsPage />} />
        <Route path="/donors/:id" element={<DonorDetailPage />} />
        <Route path="/hospitals" element={<HospitalsPage />} />
        <Route path="/hospitals/:id" element={<HospitalDetailPage />} />
        <Route path="/blood-banks" element={<BloodBanksPage />} />
        <Route path="/blood-banks/:id" element={<BloodBankDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        
        {/* Auth Pages wrapped in Public Layout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-otp" element={<OtpVerificationPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>

      {/* User / Donor Dashboard */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardOverviewPage />} />
        <Route path="profile" element={<MyProfilePage />} />
        <Route path="requests" element={<MyBloodRequestsPage />} />
        <Route path="donations" element={<DonationHistoryPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Admin Panel */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="donors" element={<AdminDonorsPage />} />
        <Route path="blood-requests" element={<AdminBloodRequestsPage />} />
        <Route path="emergency" element={<AdminBloodRequestsPage />} />
        <Route path="hospitals" element={<AdminHospitalsPage />} />
        <Route path="blood-banks" element={<AdminBloodBanksPage />} />
        <Route path="inventory" element={<AdminBloodBanksPage />} />
        <Route path="verifications" element={<AdminVerificationsPage />} />
        <Route path="reports" element={<AdminReportsPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
