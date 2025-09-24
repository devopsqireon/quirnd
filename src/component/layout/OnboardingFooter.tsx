import React from 'react';

export default function OnboardingFooter() {
  return (
    <footer className="w-full max-w-3xl mx-auto mt-8  py-4 text-center text-black text-sm">
      <div className="flex justify-center items-center space-x-4 mb-2">
        <a href="#" className="hover:underline">Privacy Policy</a>
        <a href="#" className="hover:underline">Terms of Use</a>
        <a href="#" className="hover:underline">Support</a>
        <a href="#" className="hover:underline">Contact us</a>
      </div>
      <p>&copy; 2025 Qireon Ltd. All rights reserved.</p>
    </footer>
  );
}
