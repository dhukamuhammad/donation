"use client";
import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import axiosInstance from "@/lib/axiosinstance";
import { showError, showSuccess } from "@/components/Toaster";
import { z } from "zod"; // Zod import kiya

/* =======================
    Zod Schema
======================= */
const contactSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Valid email is required"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({}); // Errors store karne ke liye state
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Pehle ke errors clear karo

    // Zod validation logic
    const result = contactSchema.safeParse(form);

    if (!result.success) {
      const formattedErrors = result.error.flatten().fieldErrors;
      const fieldErrors = {};
      for (const key in formattedErrors) {
        fieldErrors[key] = formattedErrors[key][0];
      }
      setErrors(fieldErrors); // Errors set karo
      return; // Aage ka code mat chalao
    }

    setLoading(true);

    try {
      await axiosInstance.post("/contact", form);
      showSuccess("Thank you! Your message has been sent successfully.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      showError("Failed to send message. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-['Outfit']">
      {/* --- Header Section --- */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
            Get in <span className="text-blue-600">Touch</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Have questions about a campaign or want to volunteer? We are here to
            help and would love to hear from you.
          </p>
        </div>
      </section>

      {/* --- Main Content Section --- */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Left Section (Original) */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Contact Information
                </h2>
                <p className="text-slate-500 mb-8 text-sm leading-relaxed">
                  Fill out the form and our team will get back to you within 24
                  hours. You can also reach us via the details below.
                </p>

                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                      <MapPin className="text-blue-600" size={22} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-1">
                        Our Office
                      </p>
                      <p className="text-slate-500 text-[15px] leading-relaxed">
                        Mahi Village, Vadgam Taluka,
                        <br />
                        Banaskantha, Gujarat - 385410, India
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                      <Phone className="text-blue-600" size={22} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-1">
                        Call Us
                      </p>
                      <p className="text-slate-500 text-[15px]">
                        +91 98765 43210
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                      <Mail className="text-blue-600" size={22} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-1">
                        Email Us
                      </p>
                      <p className="text-slate-500 text-[15px]">
                        support@donatecare.org
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                      <Clock className="text-blue-600" size={22} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-1">
                        Support Hours
                      </p>
                      <p className="text-slate-500 text-[15px]">
                        Mon - Sat: 9:00 AM - 6:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-bold text-slate-800 text-xs uppercase tracking-[0.2em] mb-6">
                  Connect with us
                </p>
                <div className="flex gap-3">
                  {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all"
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1.5 h-8 bg-blue-600 rounded-full"></div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Send us a Message
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase ml-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all text-sm"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1 font-medium">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase ml-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all text-sm"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1 font-medium">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all text-sm"
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-xs mt-1 font-medium">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">
                      Your Message
                    </label>
                    <textarea
                      rows="5"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Type your message here..."
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all text-sm resize-none"
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1 font-medium">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg shadow-lg shadow-blue-600/10 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    {loading ? "Sending..." : "Send Message"}
                    <Send size={18} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Map Section --- */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="w-full h-[400px] rounded-2xl border border-slate-200 overflow-hidden relative transition-all duration-700">
            <iframe
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14614.331498110825!2d72.486255!3d23.951556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395ce6df67417e0b%3A0xc3f17070f7d56637!2sMahi%2C%20Gujarat%20385410!5e0!3m2!1sen!2sin!4v1700000000000"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
