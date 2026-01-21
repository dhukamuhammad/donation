"use client";
import React from "react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* ================= NAVBAR ================= */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">
            DevBrand
          </h1>
          <nav className="hidden md:flex space-x-8 font-medium">
            <a href="#" className="hover:text-blue-600">Home</a>
            <a href="#" className="hover:text-blue-600">Features</a>
            <a href="#" className="hover:text-blue-600">Pricing</a>
            <a href="#" className="hover:text-blue-600">Contact</a>
          </nav>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Get Started
          </button>
        </div>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Build modern websites <br />
            <span className="text-blue-600">with ease</span>
          </h2>
          <p className="mt-6 text-gray-600 text-lg">
            Create fast, responsive and beautiful web applications using
            React and Tailwind CSS. Perfect for startups and developers.
          </p>
          <div className="mt-8 flex gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
              Get Started
            </button>
            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition">
              Learn More
            </button>
          </div>
        </div>

        <div className="bg-blue-100 rounded-2xl h-72 flex items-center justify-center">
          <span className="text-blue-600 text-xl font-semibold">
            Hero Image / Illustration
          </span>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center">
            Why Choose Us
          </h3>
          <p className="text-center text-gray-600 mt-4">
            Everything you need to build modern web apps
          </p>

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Fast Development",
                desc: "Tailwind CSS helps you build UI faster without writing custom CSS.",
              },
              {
                title: "Responsive Design",
                desc: "Looks perfect on mobile, tablet, and desktop screens.",
              },
              {
                title: "Clean Code",
                desc: "Reusable React components with clean structure.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 border rounded-xl hover:shadow-lg transition"
              >
                <h4 className="text-xl font-semibold mb-3">
                  {item.title}
                </h4>
                <p className="text-gray-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center text-white">
          <h3 className="text-3xl font-bold">
            Ready to start your project?
          </h3>
          <p className="mt-4 text-blue-100">
            Join thousands of developers building better products.
          </p>
          <button className="mt-8 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
            Start Now
          </button>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 DevBrand. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
