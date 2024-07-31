const Footer = () => {
  return (
    <footer className="bg-gray-800 p-4">
      <div className="container mx-auto text-center text-white">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} LMS Console. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="text-white hover:text-gray-400">
            Privacy Policy
          </a>
          <a href="#" className="text-white hover:text-gray-400">
            Terms of Service
          </a>
          <a href="#" className="text-white hover:text-gray-400">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
