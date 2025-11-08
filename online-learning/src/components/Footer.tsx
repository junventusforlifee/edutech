import { Youtube, Twitter, Facebook, Instagram, Mail, Phone, MessageCircle, Linkedin } from 'lucide-react';

export default function Footer() {
  const whatsappNumber = "2348080408579"; // Remove any spaces or special characters
  const whatsappMessage = "Hello, I'm interested in learning more about NEOTISA programs.";

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4">NEOTISA</h3>
            <p className="text-gray-400">
              Providing quality education and technology programs to help students excel.
            </p>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Programs</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Academy Programs</li>
              <li>Technology Programs</li>
              <li>Certification Courses</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            {/* Email */}
            <div className="flex items-center mb-2 text-gray-400">
              <Mail size={18} className="mr-2" />
              <a 
                href="mailto:info@neotisa.com"
                className="hover:text-white transition-colors"
              >
                contact@neotisa.com
              </a>
            </div>
            {/* First Phone */}
            <div className="flex items-center mb-2 text-gray-400">
              <Phone size={18} className="mr-2" />
              <a 
                href="tel:+2348080408579"
                className="hover:text-white transition-colors"
              >
                +234 808 040 8579
              </a>
            </div>
            {/* Second Phone */}
            <div className="flex items-center mb-2 text-gray-400">
              <Phone size={18} className="mr-2" />
              <a 
                href="tel:08031849347"
                className="hover:text-white transition-colors"
              >
                0803 184 9347
              </a>
            </div>
            {/* WhatsApp */}
            <div className="flex items-center text-gray-400">
              <MessageCircle size={18} className="mr-2" />
              <a 
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center"
              >
                <span className="hidden sm:inline">Chat on </span>WhatsApp
              </a>
            </div>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a 
                href="https://youtube.com/@neotisaedutech" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={24} />
              </a>
              <a 
                href="https://twitter.com/your-profile" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
              <a 
                href="https://facebook.com/theneotisa" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a 
                href="https://instagram.com/your-profile" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a 
                href="https://linkedin.com/in/neotisaedtech" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} NEOTISA EDU.TECH.LTD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
