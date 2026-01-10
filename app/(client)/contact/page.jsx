"use client";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Get In <span className="text-blue-600">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Have questions? We're here to help. Reach out to us and we'll
            respond as soon as possible.
          </p>
          <div className="w-32 h-1.5 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Quick Contact Cards */}
          <div className="group hover:scale-105 transition-transform duration-300">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all h-full">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                <Phone className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Call Us</h3>
              <p className="text-gray-600 mb-4">Mon-Fri from 9am to 6pm</p>
              <p className="text-blue-600 font-semibold">+91 98765 43210</p>
              <p className="text-blue-600 font-semibold">+91 87654 32109</p>
            </div>
          </div>

          <div className="group hover:scale-105 transition-transform duration-300">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all h-full">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                <Mail className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Email Us</h3>
              <p className="text-gray-600 mb-4">
                We'll respond within 24 hours
              </p>
              <p className="text-blue-600 font-semibold">
                contact@helpconnect.org
              </p>
              <p className="text-blue-600 font-semibold">
                support@helpconnect.org
              </p>
            </div>
          </div>

          <div className="group hover:scale-105 transition-transform duration-300">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all h-full">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                <MapPin className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Visit Us</h3>
              <p className="text-gray-600 mb-4">Come say hello at our office</p>
              <p className="text-gray-700 font-medium">
                123 Seva Marg, Dharma Nagar
              </p>
              <p className="text-gray-700">New Delhi - 110001, India</p>
            </div>
          </div>
        </div>

        {/* Contact Form and Info Section */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Form - Takes 3 columns */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="w-8 h-8 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-900">
                  Send Us a Message
                </h2>
              </div>

              <p className="text-gray-600 mb-8">
                Fill out the form below and our team will get back to you within
                24 hours.
              </p>

              {submitted && (
                <div className="mb-6 bg-green-50 border-l-4 border-green-500 text-green-800 px-5 py-4 rounded-lg flex items-start gap-3">
                  <svg
                    className="w-6 h-6 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold">Message sent successfully!</p>
                    <p className="text-sm">
                      Our team will get back to you shortly.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                      placeholder="How can we help?"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none outline-none"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>

          {/* Additional Info Sidebar - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Office Hours */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 border border-blue-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Office Hours
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-3 border-b border-blue-100">
                  <span className="font-semibold text-gray-700">
                    Monday - Friday
                  </span>
                  <span className="text-blue-600 font-medium">
                    9:00 AM - 6:00 PM
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-blue-100">
                  <span className="font-semibold text-gray-700">Saturday</span>
                  <span className="text-blue-600 font-medium">
                    10:00 AM - 4:00 PM
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="font-semibold text-gray-700">Sunday</span>
                  <span className="text-gray-500 font-medium">Closed</span>
                </div>
              </div>
            </div>

            {/* FAQ Quick Links */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-3xl p-8 text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-4">Need Quick Help?</h3>
              <p className="mb-6 opacity-95">
                Check out our frequently asked questions for instant answers to
                common inquiries.
              </p>
              <button className="w-full bg-white text-blue-600 font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition-colors">
                View FAQs
              </button>
            </div>

            {/* Emergency Contact */}
            <div className="bg-white rounded-3xl p-8 border-2 border-red-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Emergency Support
              </h3>
              <p className="text-gray-600 mb-4">
                For urgent matters requiring immediate attention, please call
                our emergency helpline.
              </p>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-red-500" />
                <span className="text-red-600 font-bold text-lg">
                  +91 91111 00000
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-2">Available 24/7</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-16 bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-10 md:p-12 text-center border border-gray-200">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Still Have Questions?
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Our dedicated support team is here to assist you with any questions
            about campaigns, donations, or platform features.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg">
              Start a Campaign
            </button>
            <button className="px-8 py-3 bg-white text-gray-700 rounded-full font-semibold hover:bg-gray-100 transition-colors border-2 border-gray-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
