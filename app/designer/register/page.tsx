"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronLeft, Upload, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import FluidBackground from "@/components/FluidBackground"

const steps = [
  { id: 1, title: "Personal Info", description: "Tell us about yourself" },
  { id: 2, title: "Professional", description: "Your experience" },
  { id: 3, title: "Portfolio", description: "Show your work" },
  { id: 4, title: "Review", description: "Confirm details" },
]

export default function DesignerRegistration() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    specialization: "",
    yearsExperience: "",
    portfolio: [],
    website: "",
    socialLinks: "",
  })

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    console.log("Form submitted:", formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0fdf9] via-[#e6f9f3] to-[#d4f4e8] overflow-hidden relative">
      <FluidBackground />

      <div className="relative z-10 container mx-auto px-2 sm:px-4 py-4 sm:py-8 md:py-12 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto w-full"
        >
          <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 md:mb-3 text-balance">
              Designer Registration
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground text-balance">
              Join our community of creative professionals
            </p>
          </div>

          <div className="mb-6 sm:mb-8 md:mb-12 backdrop-blur-md bg-white/40 rounded-lg sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg border border-white/30">
            <div className="flex justify-between mb-3 md:mb-4 gap-1 sm:gap-2">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center flex-1 min-w-0">
                  <motion.div
                    initial={false}
                    animate={{
                      scale: index === currentStep ? 1.1 : 1,
                      backgroundColor: index <= currentStep ? "#00b67f" : "#e5e7eb",
                    }}
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-semibold text-xs sm:text-sm mb-1 md:mb-2 transition-all duration-300 shadow-md flex-shrink-0"
                    style={{
                      color: index <= currentStep ? "#ffffff" : "#6b7280",
                    }}
                  >
                    {index < currentStep ? <Check size={16} className="sm:w-5 sm:h-5 md:w-5 md:h-5" /> : step.id}
                  </motion.div>
                  <p className="text-xs font-semibold text-gray-800 hidden md:block truncate">{step.title}</p>
                </div>
              ))}
            </div>
            {/* Progress bar */}
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={false}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-[#00b67f] rounded-full shadow-sm"
              />
            </div>
          </div>

          <motion.div
            className="backdrop-blur-xl bg-white/80 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-12 border border-white/40"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Step 1: Personal Info */}
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-1 md:mb-2">
                    {steps[0].title}
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-4 md:mb-8">
                    {steps[0].description}
                  </p>

                  <div className="space-y-3 sm:space-y-4 md:space-y-6">
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-foreground mb-1 md:mb-2">
                          First Name
                        </label>
                        <Input
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="John"
                          className="rounded-lg md:rounded-xl border-2 border-border focus:border-emerald transition-colors text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-foreground mb-1 md:mb-2">
                          Last Name
                        </label>
                        <Input
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Doe"
                          className="rounded-lg md:rounded-xl border-2 border-border focus:border-emerald transition-colors text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-foreground mb-1 md:mb-2">
                        Email Address
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="rounded-lg md:rounded-xl border-2 border-border focus:border-emerald transition-colors text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-foreground mb-1 md:mb-2">
                          Phone
                        </label>
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+1 (555) 000-0000"
                          className="rounded-lg md:rounded-xl border-2 border-border focus:border-emerald transition-colors text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-foreground mb-1 md:mb-2">
                          Location
                        </label>
                        <Input
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          placeholder="City, Country"
                          className="rounded-lg md:rounded-xl border-2 border-border focus:border-emerald transition-colors text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-foreground mb-1 md:mb-2">Bio</label>
                      <Textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder="Tell us about yourself..."
                        className="rounded-lg md:rounded-xl border-2 border-border focus:border-emerald transition-colors min-h-20 md:min-h-24 text-sm"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Professional */}
              {currentStep === 1 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-1 md:mb-2">
                    {steps[1].title}
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-4 md:mb-8">
                    {steps[1].description}
                  </p>

                  <div className="space-y-3 sm:space-y-4 md:space-y-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-foreground mb-1 md:mb-2">
                        Specialization
                      </label>
                      <select
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleInputChange}
                        className="w-full px-3 sm:px-4 py-2 md:py-3 rounded-lg md:rounded-xl border-2 border-gray-300 focus:border-[#00b67f] focus:outline-none focus:ring-2 focus:ring-[#00b67f]/20 transition-colors bg-white text-sm text-gray-900"
                      >
                        <option value="" className="text-gray-400">Select your specialization</option>
                        <option value="womenswear">Womenswear Design</option>
                        <option value="menswear">Menswear Design</option>
                        <option value="bridal">Bridal & Evening Wear</option>
                        <option value="couture">Haute Couture</option>
                        <option value="streetwear">Streetwear & Casual</option>
                        <option value="sustainable">Sustainable Fashion</option>
                        <option value="accessories">Accessories Design</option>
                        <option value="textile">Textile & Print Design</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-foreground mb-1 md:mb-2">
                        Years of Experience
                      </label>
                      <select
                        name="yearsExperience"
                        value={formData.yearsExperience}
                        onChange={handleInputChange}
                        className="w-full px-3 sm:px-4 py-2 md:py-3 rounded-lg md:rounded-xl border-2 border-gray-300 focus:border-[#00b67f] focus:outline-none focus:ring-2 focus:ring-[#00b67f]/20 transition-colors bg-white text-sm text-gray-900"
                      >
                        <option value="" className="text-gray-400">Select experience level</option>
                        <option value="0-2">0-2 years (Emerging Designer)</option>
                        <option value="2-5">2-5 years (Established)</option>
                        <option value="5-10">5-10 years (Senior Designer)</option>
                        <option value="10+">10+ years (Master Designer)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-foreground mb-1 md:mb-2">
                        Website
                      </label>
                      <Input
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        placeholder="https://yourportfolio.com"
                        className="rounded-lg md:rounded-xl border-2 border-border focus:border-emerald transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-foreground mb-1 md:mb-2">
                        Social Links
                      </label>
                      <Input
                        name="socialLinks"
                        value={formData.socialLinks}
                        onChange={handleInputChange}
                        placeholder="LinkedIn, Instagram, Dribbble..."
                        className="rounded-lg md:rounded-xl border-2 border-border focus:border-emerald transition-colors text-sm"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Portfolio */}
              {currentStep === 2 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-1 md:mb-2">
                    {steps[2].title}
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-4 md:mb-8">
                    {steps[2].description}
                  </p>

                  <div className="space-y-3 sm:space-y-4 md:space-y-6">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="border-2 border-dashed border-emerald/40 rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 text-center cursor-pointer hover:border-emerald/60 transition-colors"
                    >
                      <Upload className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-emerald mx-auto mb-2 md:mb-3" />
                      <p className="text-foreground font-semibold mb-1 text-sm md:text-base">
                        Drop your portfolio images here
                      </p>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        or click to browse (PNG, JPG, GIF up to 10MB)
                      </p>
                    </motion.div>

                    {formData.portfolio.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                        {formData.portfolio.map((item, idx) => (
                          <div
                            key={idx}
                            className="aspect-square bg-gradient-to-br from-emerald/20 to-sage/20 rounded-lg md:rounded-xl flex items-center justify-center"
                          >
                            <p className="text-xs md:text-sm text-muted-foreground">Item {idx + 1}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="bg-emerald/5 rounded-lg md:rounded-xl p-3 md:p-4 border border-emerald/20">
                      <p className="text-xs md:text-sm text-foreground">
                        📝 <strong>Pro tip:</strong> Upload 3-5 of your best works to showcase your skills.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Review */}
              {currentStep === 3 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-1 md:mb-2">
                    {steps[3].title}
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-4 md:mb-8">
                    {steps[3].description}
                  </p>

                  <div className="space-y-3 sm:space-y-4 md:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6">
                      <div className="bg-cream-lighter rounded-lg md:rounded-xl p-3 md:p-4">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                          Name
                        </p>
                        <p className="text-sm md:text-base text-foreground font-semibold">
                          {formData.firstName} {formData.lastName}
                        </p>
                      </div>
                      <div className="bg-cream-lighter rounded-lg md:rounded-xl p-3 md:p-4">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                          Email
                        </p>
                        <p className="text-sm md:text-base text-foreground font-semibold">{formData.email}</p>
                      </div>
                      <div className="bg-cream-lighter rounded-lg md:rounded-xl p-3 md:p-4">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                          Specialization
                        </p>
                        <p className="text-sm md:text-base text-foreground font-semibold capitalize">
                          {formData.specialization || "Not selected"}
                        </p>
                      </div>
                      <div className="bg-cream-lighter rounded-lg md:rounded-xl p-3 md:p-4">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                          Experience
                        </p>
                        <p className="text-sm md:text-base text-foreground font-semibold">
                          {formData.yearsExperience || "Not selected"}
                        </p>
                      </div>
                    </div>

                    <div className="bg-emerald/10 rounded-lg md:rounded-xl p-3 md:p-4 border border-emerald/20">
                      <p className="text-xs md:text-sm text-foreground">
                        ✓ All information looks good? Click submit to complete your registration!
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-2 md:gap-4 mt-6 md:mt-10 pt-4 md:pt-8 border-t border-border">
              <Button
                onClick={handlePrev}
                disabled={currentStep === 0}
                variant="outline"
                className="flex-1 rounded-lg md:rounded-xl py-2 md:py-3 flex items-center justify-center gap-2 bg-transparent text-sm md:text-base"
              >
                <ChevronLeft size={16} className="md:w-5 md:h-5" />
                <span className="hidden sm:inline">Previous</span>
              </Button>
              <Button
                onClick={currentStep === steps.length - 1 ? handleSubmit : handleNext}
                className="flex-1 rounded-lg md:rounded-xl py-2 md:py-3 flex items-center justify-center gap-2 bg-[#00b67f] hover:bg-[#00a371] text-white hover:shadow-lg transition-all text-sm md:text-base"
              >
                {currentStep === steps.length - 1 ? (
                  <>
                    <Check size={16} className="md:w-5 md:h-5" />
                    <span className="hidden sm:inline">Submit</span>
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight size={16} className="md:w-5 md:h-5" />
                  </>
                )}
              </Button>
            </div>
          </motion.div>

          <p className="text-center text-xs md:text-sm text-muted-foreground mt-4 md:mt-8">
            Already registered?{" "}
            <a href="#" className="text-emerald font-semibold hover:underline">
              Sign in
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
