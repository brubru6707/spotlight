"use client"
import Link from 'next/link';
import Image from 'next/image'; // Import the Next.js Image component
import React, { useState } from 'react';

// Helper component for checklist items for better readability
const CheckListItem = ({ text, linkText, linkHref }) => (
  <li className="flex items-start space-x-3">
    <svg className="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
    <span className="text-sm text-gray-600">
      {text}
      {linkText && (
        <>
          {' '}
          <a href={linkHref} className="text-red-500 hover:underline">
            {linkText}
          </a>
        </>
      )}
    </span>
  </li>
);

// Helper component for the feature cards
const FeatureCard = ({ icon, title, children }) => (
  <div className="flex flex-col items-center text-center">
    <div className="p-4 bg-blue-100 rounded-full">
      {icon}
    </div>
    <h4 className="mt-4 text-lg font-semibold text-gray-800">{title}</h4>
    <p className="mt-2 text-sm text-gray-600 max-w-xs">
      {children}
    </p>
  </div>
);

// Helper component for Testimonial Cards
const TestimonialCard = ({ quote, name, role, location, imgSrc }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col h-full">
        {/* Escaped the quotes */}
        <p className="text-gray-600 text-sm flex-grow">&quot;{quote}&quot;</p>
        <div className="mt-6 flex items-center">
            {/* Replaced <img> with Next.js Image */}
            <Image className="h-12 w-12 rounded-full object-cover" src={imgSrc} alt={name} width={48} height={48} />
            <div className="ml-4">
                <p className="font-semibold text-gray-800">{name}</p>
                <p className="text-xs text-gray-500">{role}</p>
                <p className="text-xs text-gray-500">{location}</p>
            </div>
        </div>
    </div>
);

// Helper component for FAQ items
const FAQItem = ({ question, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 py-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left text-gray-800 hover:text-gray-900 focus:outline-none"
            >
                <span className="font-medium">{question}</span>
                <svg
                    className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}
            >
                <p className="text-gray-600 text-sm">
                    {children}
                </p>
            </div>
        </div>
    );
};

// Social Icon Helper
const SocialIcon = ({ href, children }) => (
    <a href={href} className="text-gray-500 hover:text-gray-800 transition-colors">
        {children}
    </a>
);


export default function App() {
  return (
    <>
      <div className="font-sans bg-gray-50 min-h-screen">
        {/* Header */}
        <header className="absolute top-0 left-0 right-0 z-10 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <div className="flex-shrink-0">
                 {/* Replaced <img> with Next.js Image */}
                <Image 
                  src="/main_spotlight_logo.svg" 
                  alt="Spotlight Logo" 
                  width={150}
                  height={32}
                  className="h-8 w-auto"
                />
              </div>
              {/* Login Button */}
              <div>
                <Link href="/login" className="px-6 py-2 text-sm font-semibold text-gray-700 bg-white rounded-lg shadow-sm hover:bg-gray-100 transition-colors">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main>
          {/* Hero Section */}
          <div 
            className="relative flex items-center justify-center pt-40 pb-32 md:pb-48 bg-cover bg-center">

            {/* Background overlay for better text readability */}
            <div className="absolute inset-0 bg-white bg-cover bg-opacity-20 backdrop-blur-lg bg-[url('/food_banner_bg.jpg')]"></div>
            
            <div className="relative z-10 text-center text-gray-800">
              <h1 className="text-4xl md:text-6xl font-bold">
                Partner with Spotlight
              </h1>
              <h2 className="text-4xl md:text-6xl font-bold mt-2">
                and grow your business
              </h2>
              <p className="mt-6 text-sm md:text-base max-w-md mx-auto">
                0% commission for 1st month! Valid for new restaurant partners in select cities.
              </p>
              <div className="mt-8 px-8 py-3 font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 cursor-pointer inline-block">
                <Link href="/signup">
                    Register your restaurant
                </Link>
              </div>
            </div>
          </div>

          {/* Get Started Section */}
          <div className="relative px-4 -mt-20 md:-mt-32">
            <div className="container mx-auto max-w-5xl bg-white rounded-xl shadow-2xl p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Left Side: Checklist */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Get Started - It only takes 10 minutes</h3>
                  <p className="mt-2 text-sm text-gray-500">Please keep these documents and details ready for a smooth sign-up.</p>
                  
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    <ul className="space-y-4">
                      <CheckListItem text="PAN card" />
                      <CheckListItem 
                        text="FSSAI license" 
                        linkText="Apply here"
                        linkHref="#"
                      />
                       <CheckListItem text="Bank account details" />
                    </ul>
                     <ul className="space-y-4">
                       <CheckListItem text="GST number, if applicable" />
                       <CheckListItem 
                         text="Menu & profile food image"
                         linkText="Refer here"
                         linkHref="#"
                       />
                    </ul>
                  </div>
                </div>

                {/* Right Side: Video Thumbnail */}
                <div className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer shadow-lg">
                   {/* Replaced <img> with Next.js Image */}
                  <Image 
                    src="https://placehold.co/1280x720/e0e0e0/000000?text=Video+Thumbnail"
                    alt="How to onboard your restaurant guide"
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-10 transition-all flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center transition-transform transform group-hover:scale-110">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.018 15.124A1 1 0 013 14.236V5.764a1 1 0 011.518-.853l8.472 4.236a1 1 0 010 1.706l-8.472 4.236a1 1 0 01-1.518-.863z"></path></svg>
                    </div>
                  </div>
                   <div className="absolute bottom-0 left-0 p-4">
                      <h4 className="text-white font-bold text-sm">How to onboard your restaurant</h4>
                      <p className="text-white text-xs">A quick guide to registration</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Why Partner With Us Section */}
          <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                 <div className="flex items-center justify-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <h2 className="mx-4 text-2xl md:text-3xl font-bold text-gray-800 whitespace-wrap">Why should you partner with Spotlight?</h2>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <FeatureCard 
                  title="Attract new customers"
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.282-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.282.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  }
                >
                  Reach the millions of people ordering on Spotlight.
                </FeatureCard>

                <FeatureCard 
                  title="Doorstep delivery convenience"
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 001.414 0l2.414-2.414a1 1 0 01.707-.293H20" />
                    </svg>
                  }
                >
                  Easily get your orders delivered through our trained delivery partners.
                </FeatureCard>

                <FeatureCard 
                  title="Onboarding support"
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  }
                >
                  For any support, email us at merchantonboarding@spotlight.com
                </FeatureCard>
              </div>
            </div>
          </section>

          {/* Restaurant Success Stories Section */}
          <section className="bg-blue-50 py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800">Restaurant success stories</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <TestimonialCard
                        quote="Spotlight enabled me to restart my operations post-COVID when I had no hope of doing my business again. I'm grateful to the platform for helping me thrive - my online ordering business has done so well, it has even taken over my dining business!"
                        name="Arshad Khan"
                        role="Owner - Khusiboo biryani,"
                        location="Shillong"
                        imgSrc="https://placehold.co/100x100/e0e0e0/000000?text=AK"
                    />
                    <TestimonialCard
                        quote="Thanks to Spotlight's invaluable support, our startup cloud kitchen has been doing wonders in the competitive food industry landscape. Their dedication to promoting local businesses and powerful reporting tools have been instrumental in our success, and we look forward to a long-term partnership."
                        name="Vijay"
                        role="Owner - Birgo,"
                        location="Coimbatore"
                        imgSrc="https://placehold.co/100x100/e0e0e0/000000?text=V"
                    />
                    <TestimonialCard
                        quote="Spotlight helped us grow by 60% since registration, and now, we are one of the biggest vegetarian joints in Ernakulam city."
                        name="Sandeep K Mohan"
                        role="Owner - Mysore Raman Idli,"
                        location="Kerala"
                        imgSrc="https://placehold.co/100x100/e0e0e0/000000?text=SM"
                    />
                </div>
            </div>
          </section>

          {/* Frequently Asked Questions Section */}
          <section className="py-20">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                  <div className="text-center mb-12">
                      <h2 className="text-3xl font-bold text-gray-800">Frequently asked questions</h2>
                  </div>
                  <div className="bg-white p-8 rounded-lg shadow-lg">
                      <FAQItem question="What are the documents and details required to start deliveries through Spotlight?">
                          To start delivering with Spotlight, you will need your PAN card, FSSAI license, bank account details, and GST number if applicable. You&apos;ll also need a menu and a profile food image.
                      </FAQItem>
                      <FAQItem question="How long will it take for a restaurant to go live on Spotlight after submitting the documents?">
                          After you submit all the required documents and they are verified, your restaurant can go live on our platform within 24-48 hours. We&apos;ll notify you as soon as you&apos;re ready to start receiving orders.
                      </FAQItem>
                      <FAQItem question="What is the one-time onboarding fee? Do I have to pay it at the time of registration?">
                          There is a one-time onboarding fee to get started on the platform. This fee can be paid at the time of registration. For current fee details and any promotional offers, please check our pricing page or contact our sales team.
                      </FAQItem>
                      <FAQItem question="How can I get help and support from Spotlight if I get stuck?">
                          We have a dedicated support team available 24/7. You can reach out to us via email at merchantonboarding@spotlight.com, through the partner app, or by calling our support hotline. We&apos;re here to help you with any issues you might face.
                      </FAQItem>
                  </div>
              </div>
          </section>
        </main>
        
        {/* Footer */}
        <footer className="bg-white border-t border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-wrap justify-between items-start mb-8">
                    <div className="w-full md:w-auto mb-6 md:mb-0">
                        <Image 
                            src="/main_spotlight_logo.svg" 
                            alt="Spotlight Logo" 
                            width={150}
                            height={32}
                            className="h-8 w-auto mb-2"
                        />
                        <span className="text-xs text-gray-500">restaurant partner</span>
                    </div>
                    <a href="mailto:merchantonboarding@spotlight.com" className="flex items-center space-x-2 text-sm text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>merchantonboarding@spotlight.com</span>
                    </a>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    {/* Column 1 */}
                    <div>
                        <h5 className="font-bold text-gray-800 mb-4">ABOUT SPOTLIGHT</h5>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li><a href="#" className="hover:underline">Who We Are</a></li>
                            <li><a href="#" className="hover:underline">Blog</a></li>
                            <li><a href="#" className="hover:underline">Work With Us</a></li>
                            <li><a href="#" className="hover:underline">Investor Relations</a></li>
                            <li><a href="#" className="hover:underline">Report Fraud</a></li>
                        </ul>
                    </div>
                    {/* Column 2 */}
                    <div>
                        <h5 className="font-bold text-gray-800 mb-4">SPOTLIGHTVERSE</h5>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li><a href="#" className="hover:underline">Spotlight</a></li>
                            <li><a href="#" className="hover:underline">Blinkit</a></li>
                            <li><a href="#" className="hover:underline">Feeding India</a></li>
                            <li><a href="#" className="hover:underline">Hyperpure</a></li>
                            <li><a href="#" className="hover:underline">Spotlightland</a></li>
                        </ul>
                    </div>
                    {/* Column 3 */}
                    <div>
                        <h5 className="font-bold text-gray-800 mb-4">FOR RESTAURANTS</h5>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li><a href="#" className="hover:underline">Partner With Us</a></li>
                            <li><a href="#" className="hover:underline">Apps For You</a></li>
                        </ul>
                    </div>
                    {/* Column 4 */}
                    <div>
                        <h5 className="font-bold text-gray-800 mb-4">LEARN MORE</h5>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li><a href="#" className="hover:underline">Privacy</a></li>
                            <li><a href="#" className="hover:underline">Security</a></li>
                            <li><a href="#" className="hover:underline">Terms</a></li>
                            <li><a href="#" className="hover:underline">Sitemap</a></li>
                        </ul>
                    </div>
                    {/* Column 5 */}
                    <div className="col-span-2 md:col-span-1">
                        <h5 className="font-bold text-gray-800 mb-4">SOCIAL LINKS</h5>
                        <div className="flex space-x-4 mb-6">
                            <SocialIcon href="#">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                            </SocialIcon>
                            <SocialIcon href="#">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.644-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" /></svg>
                            </SocialIcon>
                            <SocialIcon href="#">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.299 1.634 4.211 3.793 4.649-.69.188-1.432.23-2.164.084.616 1.923 2.408 3.316 4.533 3.354-1.798 1.407-4.069 2.245-6.516 2.245-.42 0-.836-.025-1.244-.074 2.323 1.496 5.078 2.372 8.034 2.372 9.637 0 14.904-8.01 14.904-14.904 0-.227-.005-.453-.014-.678.98-.71 1.832-1.6 2.516-2.6" /></svg>
                            </SocialIcon>
                            <SocialIcon href="#">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                            </SocialIcon>
                        </div>
                        <div className="space-y-4">
                            <a href="#" className="block"><Image src="https://placehold.co/135x40/000000/ffffff?text=App+Store" alt="Download on the App Store" width={135} height={40} className="h-10 w-auto" /></a>
                            <a href="#" className="block"><Image src="https://placehold.co/135x40/000000/ffffff?text=Google+Play" alt="Get it on Google Play" width={135} height={40} className="h-10 w-auto" /></a>
                        </div>
                    </div>
                </div>
                
                <div className="border-t border-gray-200 mt-8 pt-6 text-xs text-gray-500">
                    <p>By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners. 2008-2024 © Spotlight™ Ltd. All rights reserved.</p>
                </div>
            </div>
        </footer>
      </div>
    </>
  );
}
