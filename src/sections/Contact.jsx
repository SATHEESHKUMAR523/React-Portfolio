function Contact() {
  return (
    <section
      id="contact"
      className="py-20 bg-gray-950 text-white"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">

        <p className="text-blue-500 uppercase tracking-[0.2em] text-sm mb-3">
          Get In Touch
        </p>

        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Contact Me
        </h2>

        <p className="text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed">
          I’m currently looking for opportunities as a Python Full Stack Developer.
          Feel free to reach out for collaborations, freelance work, or job opportunities.
        </p>

        <a
          href="mailto:satheeshkumardev123@gmail.com"
          className="inline-block bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-lg font-medium transition duration-300"
        >
          Send Message
        </a>

      </div>
    </section>
  )
}

export default Contact