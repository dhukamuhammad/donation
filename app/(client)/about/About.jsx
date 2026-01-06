"using client";
const About = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-12">
          {/* Main About Section */}
          <section className="ounded-2xl p-10 mb-10">
            <h2 className="text-4xl font-bold text-[#2563EB] text-center mb-8 relative pb-4">
              About Us
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#2563EB] rounded"></span>
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              <strong className="text-[#2563EB]">Help Connect</strong> is a
              revolutionary platform that bridges the gap between those in need
              and those willing to help. We believe that everyone deserves
              support during difficult times, and that everyone has the power to
              make a difference in someone's life.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Our website enables anyone facing financial hardship to share
              their story, upload necessary documentation, and connect directly
              with compassionate donors who want to help. We've created a
              transparent, secure, and simple way for communities to support
              each other.
            </p>
          </section>

        </div>
      </div>
    </>
  );
};

export default About;
