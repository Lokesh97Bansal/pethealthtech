import { motion } from "framer-motion";
import { Heart, Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  const footerSections = [
    {
      title: "Explore",
      links: [
        { name: "Featured Stories", href: "#stories" },
        { name: "Photo Gallery", href: "#gallery" },
        { name: "Share Your Story", href: "#submit" },
        { name: "About Us", href: "#about" },
      ],
    },
    {
      title: "Categories",
      links: [
        { name: "Protection Stories", href: "#" },
        { name: "Healing Moments", href: "#" },
        { name: "Daily Companions", href: "#" },
        { name: "Rescue Tales", href: "#" },
      ],
    },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <footer className="bg-dark-brown text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-4">
              <Heart className="text-soft-coral text-2xl mr-2" />
              <span className="text-xl font-serif font-bold">PetStories</span>
            </div>
            <p className="text-white/80 leading-relaxed">
              Celebrating the extraordinary bonds between pets and their families through heartwarming stories of love, loyalty, and companionship.
            </p>
          </motion.div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-lg mb-4">{section.title}</h4>
              <ul className="space-y-2 text-white/80">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <motion.button
                      whileHover={{ x: 5 }}
                      onClick={() => scrollToSection(link.href)}
                      className="hover:text-soft-coral transition-colors duration-200 text-left"
                    >
                      {link.name}
                    </motion.button>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Connect Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-lg mb-4">Connect</h4>
            <div className="flex space-x-4 mb-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="text-2xl hover:text-soft-coral transition-colors duration-200"
              >
                <Facebook />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="text-2xl hover:text-soft-coral transition-colors duration-200"
              >
                <Instagram />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="text-2xl hover:text-soft-coral transition-colors duration-200"
              >
                <Twitter />
              </motion.a>
            </div>
            <p className="text-white/80">Follow us for daily doses of pet love and inspiring stories.</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-white/60 text-sm">© 2024 PetStories. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-white/60">
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              className="hover:text-soft-coral transition-colors duration-200"
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              className="hover:text-soft-coral transition-colors duration-200"
            >
              Terms of Service
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              className="hover:text-soft-coral transition-colors duration-200"
            >
              Contact
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
