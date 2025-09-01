'use client'

import { useState, useEffect } from "react";
import { initializeApp, getApps } from "firebase/app";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

// Define the initial state for the form data
const initialFormData = {
  restaurantName: "",
  restaurantAddress: "",
  email: "",
  password: "",
  confirmPassword: "",
  ownerName: "",
  ownerPhone: "",
  businessLicenseNumber: "",
  taxId: "",
  businessLicenseFile: null,
  healthPermitFile: null,
};

// Main component for the restaurant registration form
export default function Registration() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [db, setDb] = useState(null);
  const [storage, setStorage] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  
  // Use the global app ID if available, otherwise use a default
  const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "default_app";

  // Initialize Firebase services and handle authentication
  useEffect(() => {
    const initFirebase = async () => {
      try {
        // Check if a Firebase app has already been initialized
        let app;
        if (!getApps().length) {
          const firebaseConfig = JSON.parse(__firebase_config);
          app = initializeApp(firebaseConfig);
        } else {
          app = getApps()[0];
        }
        
        const dbInstance = getFirestore(app);
        const storageInstance = getStorage(app);
        console.log("SETTING UP DB AND STORAGE");
        console.log("dbInstance:", dbInstance);
        console.log("storageInstance:", storageInstance);

        setDb(dbInstance);
        setStorage(storageInstance);
        setIsAuthReady(true);
      } catch (e) {
        console.error("Firebase initialization failed:", e);
        setError("Failed to initialize the app. Check the console for details.");
      }
    };
    initFirebase();
  }, []);

  // Handler for all input fields
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Move to the next step of the form
  const nextStep = () => {
    setError("");
    if (step === 1) {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  // Go back to the previous step
  const prevStep = () => {
    setError("");
    setStep((prev) => prev - 1);
  };

  // Handle the final form submission
  const handleFinalSubmit = async (e) => {
    console.log(formData)
    e.preventDefault();
    setError("");
    setIsLoading(true);

    console.log("db:", db)
    console.log("auth:", auth)
    console.log("storage:", storage)
    if (!db || !auth || !storage) {
      setError("App is not ready. Please wait a moment.");
      setIsLoading(false);
      return;
    }

    try {
      // 1. Create a new user with email and password
      console.log("1. Create a new user with email and password")
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // 2. Upload documents to Firebase Storage
      console.log("2. Upload documents to Firebase Storage")
      const uploadPromises = [];
      const uploadedFileUrls = {};
      const userId = user.uid;

      const uploadFile = async (file, fileName) => {
        if (!file) return;
        const filePath = `users/${userId}/documents/${fileName}`;
        const fileRef = ref(storage, filePath);
        const uploadTask = uploadBytes(fileRef, file).then(async (snapshot) => {
          const downloadUrl = await getDownloadURL(snapshot.ref);
          uploadedFileUrls[fileName.replace('.pdf', '').replace('.jpg', '').replace('.png', '')] = downloadUrl;
        });
        uploadPromises.push(uploadTask);
      };

      await Promise.all([
        uploadFile(formData.businessLicenseFile, "business_license.pdf"),
        uploadFile(formData.healthPermitFile, "health_permit.pdf"),
      ]);

      // 3. Save all restaurant data to Firestore
      console.log("3. Save all restaurant data to Firestore");
      const restaurantData = {
        restaurantName: formData.restaurantName,
        restaurantAddress: formData.restaurantAddress,
        ownerName: formData.ownerName,
        ownerPhone: formData.ownerPhone,
        businessLicenseNumber: formData.businessLicenseNumber,
        taxId: formData.taxId,
        ...uploadedFileUrls,
        createdAt: new Date(),
        userId: userId,
      };
      
      console.log("test 1")
      
      const restaurantDocRef = doc(db, "users", userId);
      await setDoc(restaurantDocRef, restaurantData);
      // 4. Redirect to the dashboard on success
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
    } finally {
      setIsLoading(false);
    }
  };

  // Renders the form step based on the current `step` state
  const renderFormStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-5">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Step 1: Restaurant Info</h2>
            <p className="text-gray-600 mb-8">Tell us about your restaurant and create your account.</p>
            <div>
              <label htmlFor="restaurantName" className="block text-sm font-medium text-gray-700 mb-1">
                Restaurant Name
              </label>
              <input
                id="restaurantName"
                name="restaurantName"
                type="text"
                placeholder="e.g., The Cozy Corner"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-black"
                value={formData.restaurantName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="restaurantAddress" className="block text-sm font-medium text-gray-700 mb-1">
                Restaurant Address
              </label>
              <input
                id="restaurantAddress"
                name="restaurantAddress"
                type="text"
                placeholder="e.g., 123 Main St, Anytown, USA"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-black"
                value={formData.restaurantAddress}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-black"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-black"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-black"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={nextStep}
                className="bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition disabled:opacity-70 disabled:cursor-not-allowed"
              >
                Next Step
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-5">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Step 2: Business & Owner Details</h2>
            <p className="text-gray-600 mb-8">Provide details for business verification (KYC).</p>
            <div>
              <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700 mb-1">
                Owner Name
              </label>
              <input
                id="ownerName"
                name="ownerName"
                type="text"
                placeholder="Full Legal Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-black"
                value={formData.ownerName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="ownerPhone" className="block text-sm font-medium text-gray-700 mb-1">
                Owner Phone Number
              </label>
              <input
                id="ownerPhone"
                name="ownerPhone"
                type="tel"
                placeholder="e.g., +1 (555) 123-4567"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-black"
                value={formData.ownerPhone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="businessLicenseNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Business License Number
              </label>
              <input
                id="businessLicenseNumber"
                name="businessLicenseNumber"
                type="text"
                placeholder="Enter license number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-black"
                value={formData.businessLicenseNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="taxId" className="block text-sm font-medium text-gray-700 mb-1">
                Tax ID Number
              </label>
              <input
                id="taxId"
                name="taxId"
                type="text"
                placeholder="Enter tax ID"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-black"
                value={formData.taxId}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
              >
                Next Step
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-5">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Step 3: Documents Upload</h2>
            <p className="text-gray-600 mb-8">Please upload a copy of your business license and health permit.</p>
            <div>
              <label htmlFor="businessLicenseFile" className="block text-sm font-medium text-gray-700 mb-1">
                Business License
              </label>
              <input
                id="businessLicenseFile"
                name="businessLicenseFile"
                type="file"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-black"
                onChange={handleInputChange}
                accept=".pdf, .jpg, .png"
                required
              />
              <p className="mt-1 text-xs text-gray-500">Supported formats: PDF, JPG, PNG. Max size: 5MB.</p>
            </div>
            <div>
              <label htmlFor="healthPermitFile" className="block text-sm font-medium text-gray-700 mb-1">
                Health Permit
              </label>
              <input
                id="healthPermitFile"
                name="healthPermitFile"
                type="file"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-black"
                onChange={handleInputChange}
                accept=".pdf, .jpg, .png"
                required
              />
              <p className="mt-1 text-xs text-gray-500">Supported formats: PDF, JPG, PNG. Max size: 5MB.</p>
            </div>
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading || !formData.businessLicenseFile || !formData.healthPermitFile}
                className="bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Complete Registration"
                )}
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Renders the progress bar for the form
  const renderProgressBar = () => (
    <div className="relative pt-1">
      <div className="flex mb-2 items-center justify-between text-xs">
        <span className="text-indigo-600 font-semibold">
          Step {step} of 3
        </span>
        <span className="text-gray-500">
          {step === 1 ? 'Restaurant Info' : step === 2 ? 'KYC Details' : 'Document Upload'}
        </span>
      </div>
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
        <div
          style={{ width: `${(step / 3) * 100}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 transition-all duration-300 ease-in-out"
        ></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl">
        {/* Left side - Branding */}
        <div className="bg-indigo-600 text-white p-8 md:p-12 md:w-2/5 flex flex-col justify-center">
          <div className="mb-8">
            <img
              src="https://placehold.co/180x40/4b5563/ffffff?text=Spotlight+Logo"
              alt="Spotlight Logo"
              className="h-10 w-auto mb-6"
            />
            <h1 className="text-3xl font-bold mb-4">Join Spotlight Today</h1>
            <p className="text-indigo-100">
              Onboard your restaurant to reach more customers with our powerful AI-driven platform.
            </p>
          </div>
          <div className="space-y-4 mt-8">
            <div className="flex items-center">
              <div className="bg-opacity-20 p-2 rounded-full mr-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span>Secure & verified process</span>
            </div>
            <div className="flex items-center">
              <div className="bg-opacity-20 p-2 rounded-full mr-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span>Reach a wider audience</span>
            </div>
            <div className="flex items-center">
              <div className="bg-opacity-20 p-2 rounded-full mr-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span>Connect with diners</span>
            </div>
          </div>
        </div>
        {/* Right side - Form */}
        <div className="bg-white p-8 md:p-12 md:w-3/5">
          {renderProgressBar()}
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}
          <form onSubmit={handleFinalSubmit} className="space-y-5">
            {renderFormStep()}
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Already have an account?</span>
              </div>
            </div>
            <div className="mt-4 text-center">
              <a href="/login"
                className="inline-block w-full border border-gray-300 rounded-lg py-3 px-4 font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                Sign in
              </a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              By registering, you agree to our{" "}
              <a href="#" className="text-indigo-600 hover:text-indigo-500">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-indigo-600 hover:text-indigo-500">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
