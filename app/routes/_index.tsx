import type { MetaFunction, ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useState } from "react";
import { Modal } from "~/components/Modal";
import { submitContactForm } from "~/services/supabase.server";
import type { ContactSubmission } from "~/types";
import { useActionData } from "@remix-run/react";
import { AuthModal } from "~/components/AuthModals";
import { signIn, signUp } from "~/services/auth.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const submission = Object.fromEntries(formData);

  try {
    await submitContactForm(submission as Omit<ContactSubmission, 'id' | 'created_at'>);
    return json({ success: true });
  } catch (error) {
    console.error('Error submitting form:', error);
    return json({ success: false, error: 'Failed to submit form' }, { status: 400 });
  }
};

export const meta: MetaFunction = () => {
  return [
    { title: "Mid-West Developments" },
    { name: "description", content: "Mid-West Developments" },
  ];
};

const serviceDetails = {
  brandDevelopment: {
    title: "Brand Development Services",
    content: (
      <div className="space-y-4">
        <p>At Mid-West Developments, we craft compelling brand identities that resonate with your audience and stand the test of time. Our comprehensive brand development services include:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Logo Design:</strong> Creative, memorable logos that capture your brand's essence</li>
          <li><strong>Brand Strategy:</strong> Detailed market analysis and positioning strategy</li>
          <li><strong>Visual Identity:</strong> Cohesive color schemes, typography, and design elements</li>
          <li><strong>Brand Guidelines:</strong> Comprehensive documentation for consistent brand application</li>
          <li><strong>Social Media Presence:</strong> Strategic planning for social media platforms</li>
          <li><strong>Marketing Collateral:</strong> Business cards, letterheads, and promotional materials</li>
        </ul>
        <p>We work closely with you to understand your vision and create a brand that truly represents your business values and appeals to your target market.</p>
      </div>
    )
  },
  webDevelopment: {
    title: "Web Development Solutions",
    content: (
      <div className="space-y-4">
        <p>Our web development team creates powerful, scalable, and user-friendly digital solutions tailored to your needs:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Custom Websites:</strong> Unique, responsive designs that work across all devices</li>
          <li><strong>E-commerce Solutions:</strong> Secure, efficient online stores with payment integration</li>
          <li><strong>Web Applications:</strong> Custom tools and platforms for your business needs</li>
          <li><strong>Content Management Systems:</strong> Easy-to-use interfaces for content updates</li>
          <li><strong>Performance Optimization:</strong> Fast-loading, SEO-friendly websites</li>
          <li><strong>Maintenance & Support:</strong> Ongoing technical support and updates</li>
        </ul>
        <p>We use the latest technologies and best practices to ensure your web presence is modern, secure, and effective.</p>
      </div>
    )
  },
  digitalMarketing: {
    title: "Digital Marketing Expertise",
    content: (
      <div className="space-y-4">
        <p>Drive growth and reach your target audience with our comprehensive digital marketing services:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>SEO Optimization:</strong> Improve your search engine rankings and visibility</li>
          <li><strong>Content Strategy:</strong> Engaging, relevant content that converts</li>
          <li><strong>Social Media Management:</strong> Active presence across all platforms</li>
          <li><strong>Email Marketing:</strong> Targeted campaigns that drive engagement</li>
          <li><strong>PPC Advertising:</strong> Optimized ad campaigns for maximum ROI</li>
          <li><strong>Analytics & Reporting:</strong> Detailed insights and performance tracking</li>
        </ul>
        <p>Our data-driven approach ensures your marketing efforts deliver measurable results and sustainable growth.</p>
      </div>
    )
  },
  consultation: {
    title: "Strategic Consultation Services",
    content: (
      <div className="space-y-4">
        <p>Benefit from our extensive experience with our strategic consultation services:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Business Strategy:</strong> Comprehensive planning and growth strategies</li>
          <li><strong>Market Analysis:</strong> In-depth research and competitive analysis</li>
          <li><strong>Growth Planning:</strong> Scalable solutions for sustainable expansion</li>
          <li><strong>Technology Assessment:</strong> Evaluation of technical needs and solutions</li>
          <li><strong>Process Optimization:</strong> Streamline operations and improve efficiency</li>
          <li><strong>Risk Management:</strong> Identify and mitigate potential challenges</li>
        </ul>
        <p>We partner with you to develop actionable strategies that drive success and achieve your business objectives.</p>
      </div>
    )
  }
};

export default function Index() {
  const [activeModal, setActiveModal] = useState<keyof typeof serviceDetails | null>(null);
  const actionData = useActionData<typeof action>();

  const handleSubmit = async (data: Omit<ContactSubmission, 'id' | 'created_at'>) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await fetch('', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to submit form');
    }

    setActiveModal(null);
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col items-center gap-16 w-full pt-32">
        <header className="flex flex-col items-center gap-9 w-full relative">
          <div className="w-[800px] mx-auto">
            <div className="flex justify-center items-center mb-4">
              <img
                src="/midwest-logo.png"
                alt="Mid-West Developments"
                className="w-full max-w-[600px]"
              />
            </div>
            <div className="relative right-8 mt-8">
              <img
                src="/dev-logo.png"
                alt="Development Design"
                className="w-full"
              />
            </div>
          </div>
        </header>
        <nav className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-red-200 p-6 dark:border-red-700 bg-gray-800/75">
          <h1 className="text-2xl font-bold leading-6 text-white">
            We have the time and the expertise to put you on the map!
          </h1>
          <ul>
            {resources.map(({ id, text, subtext, icon }) => (
              <li key={id}>
                <button
                  onClick={() => setActiveModal(id as keyof typeof serviceDetails)}
                  className="group flex flex-col gap-2 self-stretch p-3 leading-normal text-white hover:underline w-full text-left"
                >
                  <div className="flex items-center gap-3">
                    {icon}
                    <div className="text-white text-xl" dangerouslySetInnerHTML={{ __html: text }} />
                  </div>
                  <p className="text-lg text-white">{subtext}</p>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Service Modals */}
        {activeModal && (
          <Modal
            isOpen={true}
            onClose={() => setActiveModal(null)}
            title={serviceDetails[activeModal].title}
            serviceType={activeModal}
            onSubmit={handleSubmit}
          >
            {serviceDetails[activeModal].content}
          </Modal>
        )}
      </div>
    </div>
  );
}

const resources = [
  {
    id: "brandDevelopment",
    text: "<h3>Brand Development</h3>",
    subtext: "Logo design, marketing strategy, company identity, social media presence, and more.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
      >
        <path
          d="M8.51851 12.0741L7.92592 18L15.6296 9.7037L11.4815 7.33333L12.0741 2L4.37036 10.2963L8.51851 12.0741Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "webDevelopment",
    text: "<h3>Web Development</h3>",
    subtext: "Custom websites, e-commerce solutions, web applications, and responsive design.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
      >
        <path
          d="M4.561 12.749L3.15503 14.1549M3.00811 8.99944H1.01978M3.15503 3.84489L4.561 5.2508M8.3107 1.70923L8.3107 3.69749M13.4655 3.84489L12.0595 5.2508M18.1868 17.0974L16.635 18.6491C16.4636 18.8205 16.1858 18.8205 16.0144 18.6491L13.568 16.2028C13.383 16.0178 13.0784 16.0347 12.915 16.239L11.2697 18.2956C11.047 18.5739 10.6029 18.4847 10.505 18.142L7.85215 8.85711C7.75756 8.52603 8.06365 8.21994 8.39472 8.31453L17.6796 10.9673C18.0223 11.0653 18.1115 11.5094 17.8332 11.7321L15.7766 13.3773C15.5723 13.5408 15.5554 13.8454 15.7404 14.0304L18.1868 16.4767C18.3582 16.6481 18.3582 16.926 18.1868 17.0974Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "digitalMarketing",
    text: "<h3>Digital Marketing</h3>",
    subtext: "SEO optimization, social media management, content creation, and online advertising.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
      >
        <path
          d="M9.99981 10.0751V9.99992M17.4688 17.4688C15.889 19.0485 11.2645 16.9853 7.13958 12.8604C3.01467 8.73546 0.951405 4.11091 2.53116 2.53116C4.11091 0.951405 8.73546 3.01467 12.8604 7.13958C16.9853 11.2645 19.0485 15.889 17.4688 17.4688ZM2.53132 17.4688C0.951566 15.8891 3.01483 11.2645 7.13974 7.13963C11.2647 3.01471 15.8892 0.951453 17.469 2.53121C19.0487 4.11096 16.9854 8.73551 12.8605 12.8604C8.73562 16.9853 4.11107 19.0486 2.53132 17.4688Z"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "consultation",
    text: "<h3>Consultation Services</h3>",
    subtext: "Business strategy, market analysis, competitive research, and growth planning.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
      >
        <path
          d="M15.0686 1.25995L14.5477 1.17423L14.2913 1.63578C14.1754 1.84439 14.0545 2.08275 13.9422 2.31963C12.6461 2.16488 11.3406 2.16505 10.0445 2.32014C9.92822 2.08178 9.80478 1.84975 9.67412 1.62413L9.41449 1.17584L8.90333 1.25995C7.33547 1.51794 5.80717 1.99419 4.37748 2.66939L4.19 2.75793L4.07461 2.93019C1.23864 7.16437 0.46302 11.3053 0.838165 15.3924L0.868838 15.7266L1.13844 15.9264C2.81818 17.1714 4.68053 18.1233 6.68582 18.719L7.18892 18.8684L7.50166 18.4469C7.96179 17.8268 8.36504 17.1824 8.709 16.4944L8.71099 16.4904C10.8645 17.0471 13.128 17.0485 15.2821 16.4947C15.6261 17.1826 16.0293 17.8269 16.4892 18.4469L16.805 18.8725L17.3116 18.717C19.3056 18.105 21.1876 17.1751 22.8559 15.9238L23.1224 15.724L23.1528 15.3923C23.5873 10.6524 22.3579 6.53306 19.8947 2.90714L19.7759 2.73227L19.5833 2.64518C18.1437 1.99439 16.6386 1.51826 15.0686 1.25995Z"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
];
