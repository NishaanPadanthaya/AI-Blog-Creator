export default function Footer() {
  return (
    <footer className="bg-dark text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-lg font-semibold mb-4 md:mb-0">AI Blog Generator</p>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} AI Blog Generator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
