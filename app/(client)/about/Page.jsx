"use client";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              About <span className="text-blue-600">Help Connect</span>
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Mission Statement */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-10 md:p-12 shadow-sm border border-blue-100">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <span className="w-2 h-9 bg-blue-600 rounded-full mr-4"></span>
              Our Mission
            </h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              <strong className="text-blue-600">Help Connect</strong> is a
              revolutionary platform that bridges the gap between those in need
              and those willing to help. We believe that everyone deserves
              support during difficult times, and that everyone has the power to
              make a difference in someone's life.
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Our platform enables individuals facing financial hardship to
              share their story, upload necessary documentation, and connect
              directly with compassionate donors who want to help. We've created
              a transparent, secure, and simple way for communities to support
              each other, fostering a culture of empathy, generosity, and mutual
              aid.
            </p>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            What We Stand For
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all h-full">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                  <svg
                    className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Transparency
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Every campaign is verified with proper documentation, ensuring
                  donors know exactly where their contributions are going.
                </p>
              </div>
            </div>

            {/* Value 2 */}
            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all h-full">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                  <svg
                    className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Community
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Building a supportive network where people can help each other
                  during life's most challenging moments.
                </p>
              </div>
            </div>

            {/* Value 3 */}
            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all h-full">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                  <svg
                    className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Compassion
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Fostering empathy and understanding, making it easy for
                  generous hearts to make meaningful contributions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            How Help Connect Works
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Share Your Story
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Individuals in need create a campaign, sharing their
                    situation and uploading relevant documentation to verify
                    their case.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Get Verified
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our team reviews submissions to ensure authenticity and
                    transparency, maintaining trust within our community.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Connect with Donors
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Compassionate individuals browse campaigns and contribute
                    directly to causes that resonate with them.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  4
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Make an Impact
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Funds are transferred securely, enabling real change and
                    helping people overcome their challenges.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-3xl p-10 text-white shadow-xl">
              <h3 className="text-xl font-bold mb-6">
                Why Choose Help Connect?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 flex-shrink-0 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="leading-relaxed">
                    100% secure and encrypted transactions
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 flex-shrink-0 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="leading-relaxed">
                    Direct connection between donors and recipients
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 flex-shrink-0 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="leading-relaxed">
                    Verified documentation for every campaign
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 flex-shrink-0 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="leading-relaxed">
                    User-friendly platform for all ages
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 flex-shrink-0 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="leading-relaxed">
                    Regular updates and transparent reporting
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-gradient-to-r from-blue-600 to-blue-500 rounded-3xl p-12 md:p-16 text-white shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Join Our Community Today
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-95">
            Whether you need support or want to make a difference in someone's
            life, Help Connect is here to bridge the gap. Together, we can
            create a world where no one faces hardship alone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg">
              Start a Campaign
            </button>
            <button className="px-8 py-4 bg-blue-700 text-white rounded-full font-semibold text-lg hover:bg-blue-800 transition-colors border-2 border-white">
              Become a Donor
            </button>
          </div>
        </section>
      </div>
    </div> 
  );
};

export default About;
