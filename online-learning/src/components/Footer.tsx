import { Youtube, Twitter, Facebook, Instagram, Mail, Phone } from 'lucide-react';
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl  font-bold mb-4">NEOTISA</h3>
            <p className="text-gray-400">
              Providing quality education and technology programs to help students excel.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Programs</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Academy Programs</li>
              <li>Technology Programs</li>
              <li>Certification Courses</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="flex items-center mb-2 text-gray-400">
              <Mail size={18} className="mr-2" />
              <span>info@neotisa.com</span>
            </div>
            <div className="flex items-center text-gray-400">
              <Phone size={18} className="mr-2" />
              <span>+234 8080408579</span>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Youtube size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} NEOTISA EDU.TECH.LTD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}