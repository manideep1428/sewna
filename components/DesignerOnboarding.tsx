"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, User, Briefcase, CheckCircle, ArrowRight, ArrowLeft, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface DesignerOnboardingProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  bio: string;
  experience: string;
  specialization: string;
  portfolioImages: File[];
  portfolioUrls: string[];
}

export default function DesignerOnboarding({ isOpen, onClose }: DesignerOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    bio: "",
    experience: "",
    specialization: "",
    portfolioImages: [],
    portfolioUrls: [],
  });
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [portfolioUrl, setPortfolioUrl] = useState("");

  const totalSteps = 4;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      portfolioImages: [...prev.portfolioImages, ...files]
    }));

    // Create preview URLs
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      portfolioImages: prev.portfolioImages.filter((_, i) => i !== index)
    }));
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

  const addPortfolioUrl = () => {
    if (portfolioUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        portfolioUrls: [...prev.portfolioUrls, portfolioUrl]
      }));
      setPortfolioUrl("");
    }
  };

  const removeUrl = (index: number) => {
    setFormData(prev => ({
      ...prev,
      portfolioUrls: prev.portfolioUrls.filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Handle form submission here
    onClose();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#00b67f]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-[#00b67f]" />
              </div>
              <h3 className="text-2xl font-serif text-black mb-2">Personal Information</h3>
              <p className="text-gray-600">Let's get to know you</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#00b67f] focus:ring-2 focus:ring-[#00b67f]/20 outline-none transition-all"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#00b67f] focus:ring-2 focus:ring-[#00b67f]/20 outline-none transition-all"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#00b67f] focus:ring-2 focus:ring-[#00b67f]/20 outline-none transition-all"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#00b67f]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-[#00b67f]" />
              </div>
              <h3 className="text-2xl font-serif text-black mb-2">Professional Details</h3>
              <p className="text-gray-600">Tell us about your expertise</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience *</label>
              <select
                value={formData.experience}
                onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#00b67f] focus:ring-2 focus:ring-[#00b67f]/20 outline-none transition-all"
              >
                <option value="">Select experience</option>
                <option value="0-1">0-1 years</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="10+">10+ years</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specialization *</label>
              <select
                value={formData.specialization}
                onChange={(e) => setFormData(prev => ({ ...prev, specialization: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#00b67f] focus:ring-2 focus:ring-[#00b67f]/20 outline-none transition-all"
              >
                <option value="">Select specialization</option>
                <option value="casual">Casual Wear</option>
                <option value="formal">Formal Wear</option>
                <option value="traditional">Traditional Wear</option>
                <option value="bridal">Bridal & Wedding</option>
                <option value="contemporary">Contemporary Fashion</option>
                <option value="streetwear">Streetwear</option>
                <option value="couture">Haute Couture</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio *</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#00b67f] focus:ring-2 focus:ring-[#00b67f]/20 outline-none transition-all resize-none"
                placeholder="Tell us about your design philosophy and what makes your work unique..."
              />
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#00b67f]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ImageIcon className="w-8 h-8 text-[#00b67f]" />
              </div>
              <h3 className="text-2xl font-serif text-black mb-2">Upload Portfolio</h3>
              <p className="text-gray-600">Showcase your best work</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Upload Images *</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#00b67f] transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-1">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-400">PNG, JPG up to 10MB</p>
                </label>
              </div>

              {previewImages.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {previewImages.map((preview, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                      <img src={preview} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio Website/Social Media</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-[#00b67f] focus:ring-2 focus:ring-[#00b67f]/20 outline-none transition-all"
                  placeholder="https://instagram.com/yourhandle"
                />
                <button
                  onClick={addPortfolioUrl}
                  className="px-6 py-3 bg-[#00b67f] text-white rounded-lg hover:bg-[#009c6d] transition-colors"
                >
                  Add
                </button>
              </div>

              {formData.portfolioUrls.length > 0 && (
                <div className="mt-3 space-y-2">
                  {formData.portfolioUrls.map((url, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg">
                      <span className="text-sm text-gray-600 truncate">{url}</span>
                      <button onClick={() => removeUrl(index)} className="text-red-500 hover:text-red-700">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#00b67f]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-[#00b67f]" />
              </div>
              <h3 className="text-2xl font-serif text-black mb-2">Review & Submit</h3>
              <p className="text-gray-600">Confirm your information</p>
            </div>

            <div className="space-y-4 bg-gray-50 rounded-lg p-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Personal Information</h4>
                <p className="text-sm text-gray-600">Name: {formData.name}</p>
                <p className="text-sm text-gray-600">Email: {formData.email}</p>
                <p className="text-sm text-gray-600">Phone: {formData.phone}</p>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-700 mb-2">Professional Details</h4>
                <p className="text-sm text-gray-600">Experience: {formData.experience}</p>
                <p className="text-sm text-gray-600">Specialization: {formData.specialization}</p>
                <p className="text-sm text-gray-600">Bio: {formData.bio.substring(0, 100)}...</p>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-700 mb-2">Portfolio</h4>
                <p className="text-sm text-gray-600">Images: {formData.portfolioImages.length} uploaded</p>
                <p className="text-sm text-gray-600">Links: {formData.portfolioUrls.length} added</p>
              </div>
            </div>

            <div className="bg-[#00b67f]/10 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                By submitting, you agree to SEWNA's Terms of Service and confirm that all information provided is accurate.
              </p>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden relative"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Progress bar */}
              <div className="bg-gray-100 h-2">
                <motion.div
                  className="bg-[#00b67f] h-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Content */}
              <div className="p-8 overflow-y-auto max-h-[calc(90vh-8rem)]">
                <AnimatePresence mode="wait">
                  {renderStepContent()}
                </AnimatePresence>
              </div>

              {/* Navigation buttons */}
              <div className="border-t bg-gray-50 px-8 py-6 flex justify-between items-center">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: totalSteps }).map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index + 1 === currentStep ? "bg-[#00b67f] w-8" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {currentStep < totalSteps ? (
                  <button
                    onClick={nextStep}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#00b67f] text-white hover:bg-[#009c6d] transition-all"
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#00b67f] text-white hover:bg-[#009c6d] transition-all"
                  >
                    Submit
                    <CheckCircle className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
