import React, { useState } from 'react';

function FAQs() {
  const [accordionState, setAccordionState] = useState({});

  const toggleAccordion = (id) => {
    setAccordionState((prevState) => ({
      ...prevState,
      [id]: !prevState[id] // Toggle the state
    }));
  };

  return (
    <main className="w-full max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16 lg:py-20">
      <div className="space-y-12 md:space-y-16 lg:space-y-20">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Get answers to the most common questions about Rentify, including details on privacy and data integrity.
            </p>
          </div>
          <div data-orientation="vertical">
            {faqData.map((faq, index) => (
              <div key={index} data-orientation="vertical" className="border-b">
                <h3 data-orientation="vertical" className="flex">
                  <button
                    type="button"
                    aria-controls={`radix-${index}`}
                    aria-expanded={accordionState[index] ? "true" : "false"}
                    onClick={() => toggleAccordion(index)}
                    className="text-left flex flex-1 items-center justify-between py-4 transition-all hover:underline [&amp;[data-state=open]>svg]:rotate-180 text-base font-semibold"
                  >
                    {faq.question}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`lucide lucide-chevron-down h-4 w-4 shrink-0 transition-transform duration-200 ${accordionState[index] ? 'transform rotate-180' : ''}`}
                    >
                      <path d="m6 9 6 6 6-6"></path>
                    </svg>
                  </button>
                </h3>
                <div
                  id={`radix-${index}`}
                  hidden={!accordionState[index]}
                  role="region"
                  aria-labelledby={`radix-${index}`}
                  data-orientation="vertical"
                  className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
                  style={{'--radix-accordion-content-height': 'var(--radix-collapsible-content-height)', '--radix-accordion-content-width': 'var(--radix-collapsible-content-width)'}}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

// Sample FAQ data
const faqData = [
  {
    question: "What is Rentify's privacy policy?",
    answer: "At Rentify, we prioritize the privacy and security of our users' personal information. Our privacy policy outlines how we collect, use, disclose, and protect your data. Here are some key points from our privacy policy 1. Data Collection: We collect personal information from users when they register an account, list a property, make inquiries, or engage with our platform.\n\n2. Data Usage: We use the information we collect to provide and improve our services, personalize user experiences, communicate with users, and ensure compliance with legal obligations.\n\n3. Data Sharing: We do not sell or rent personal information to third parties. However, we may share information with trusted partners and service providers who assist us in operating our platform.\n\n4. Data Security: We implement industry-standard security measures to protect user data from unauthorized access, disclosure, alteration, or destruction.\n\n5. User Controls: Users have the right to access, update, or delete their personal information. We provide tools and settings to help users manage their privacy preferences.\n\nFor more detailed information about our privacy practices, please review our full privacy policy available on our website.",
  },
  {
    question: "How does Rentify ensure data integrity?",
    answer: "Data integrity is paramount at Rentify, where we ensure the accuracy, consistency, and reliability of all data within our platform. Employing stringent validation processes and leveraging cutting-edge encryption techniques, we maintain the integrity of user data throughout its lifecycle. Our dedicated team regularly audits systems and implements robust security measures to mitigate the risk of unauthorized access, tampering, or loss. By upholding the highest standards of data integrity, we instill trust and confidence in our users, guaranteeing that their information remains secure and trustworthy at all times."
  },
  {
    question: "Is my personal information secure with Rentify?",
    answer: "Absolutely. Rentify employs state-of-the-art security measures to safeguard your personal information. We use encryption protocols, firewalls, and other security technologies to protect your data from unauthorized access, misuse, or alteration.",
  },
  {
    question: "How can I trust the accuracy of property listings on Rentify?",
    answer: "Rentify verifies all property listings to ensure their accuracy and authenticity. We conduct rigorous checks to confirm property details, such as location, amenities, and rental terms. Additionally, we encourage users to report any inaccuracies or discrepancies they encounter.",
  },
  {
    question: "Does Rentify provide support for landlords and tenants?",
    answer: "Yes, Rentify offers comprehensive support for both landlords and tenants. Our customer service team is available to assist you with any questions, concerns, or technical issues you may encounter. You can reach out to us via email, phone, or live chat for prompt assistance.",
  },
  {
    question: "What are the benefits of using Rentify for landlords?",
    answer: "Rentify offers several benefits for landlords, including hassle-free property management, access to a large pool of potential tenants, and the ability to list properties for rent without any commission or brokerage fees. Our platform streamlines the rental process and helps landlords maximize their rental income.",
  },
  {
    question: "Can tenants find properties without paying any fees on Rentify?",
    answer: "Yes, Rentify is completely free for tenants. There are no registration fees, subscription fees, or hidden charges involved. Tenants can search for properties, view listings, and connect with landlords at no cost. Rentify aims to make the rental process as affordable and accessible as possible for tenants.",
  }
  // Add more FAQ objects here
];

export default FAQs;
