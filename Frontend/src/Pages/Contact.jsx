import React from "react";

const Contact = () => {
  return (
    <section className="bg-gray-50 py-10 lg:py-16">
      <div className="container mx-auto px-5 max-w-screen-md">
        {/* Heading Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-primaryColor mb-4">
            Contact Us
          </h2>
          <p className="text-lg text-gray-600">
            Have a question or need help? Feel free to get in touch with us. We're here to assist you!
          </p>
        </div>

        {/* Form Section */}
        <form
          action="#"
          className="bg-white rounded-lg shadow-lg p-6 md:p-10 space-y-6"
        >
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              className="mt-2 w-full px-4 py-3 border border-[#0066ff61] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0066ff] focus:border-[#0066ff] text-gray-800"
              required
            />
          </div>

          {/* Subject Input */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              placeholder="Let us know how we can help you"
              className="mt-2 w-full px-4 py-3 border border-[#0066ff61] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0066ff] focus:border-[#0066ff] text-gray-800"
              required
            />
          </div>

          {/* Message Textarea */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Your Message
            </label>
            <textarea
              id="message"
              rows="6"
              placeholder="Leave a comment..."
              className="mt-2 w-full px-4 py-3 border border-[#0066ff61] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0066ff] focus:border-[#0066ff] text-gray-800"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-8 py-3 text-white bg-primaryColor rounded-lg shadow-lg hover:bg-primaryDark transition duration-300 text-lg font-semibold"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
