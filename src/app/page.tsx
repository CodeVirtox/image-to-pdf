"use client";

import { useState, useRef } from 'react';

export default function ImageToPDF() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target?.result) {
          setSelectedImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const convertToPDF = async () => {
    if (!selectedImage) return;

    setIsConverting(true);

    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    const img = new Image();
    img.src = selectedImage;

    img.onload = () => {
      const width = doc.internal.pageSize.getWidth();
      const height = (img.height * width) / img.width;
      doc.addImage(img, 'JPEG', 0, 0, width, height);
      const pdfBlob = doc.output('blob');
      const generatedPdfUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(generatedPdfUrl);
      setIsConverting(false);
    };
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target?.result) {
          setSelectedImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <header className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-blue-900">PDFGenie</h1>
          <nav>
            <a href="#" className="text-blue-900 hover:text-blue-700">Support</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="py-12 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">Convert Your Images to PDF Instantly</h1>
            <p className="text-lg text-gray-600 mb-8">
              Upload your image – click convert – download your PDF in seconds. No signup required.
            </p>
            <button 
              onClick={() => fileInputRef.current?.click()} 
              className="bg-blue-900 hover:bg-blue-800 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
            >
              Start Now
            </button>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-2xl mx-auto">
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-900 transition duration-200"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/jpeg,image/png" 
                className="hidden" 
              />
              {!selectedImage ? (
                <>
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-2 text-sm text-gray-600">Drag & drop your image here or click to browse</p>
                  <p className="mt-1 text-xs text-gray-500">Supported formats: JPG, PNG – Max size: 10MB</p>
                </>
              ) : (
                <div className="mt-4">
                  <img src={selectedImage} alt="Preview" className="max-h-60 mx-auto rounded" />
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={convertToPDF}
                disabled={!selectedImage || isConverting}
                className={`py-3 px-6 rounded-lg font-medium ${!selectedImage || isConverting ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-900 hover:bg-blue-800 text-white'} transition duration-200`}
              >
                {isConverting ? 'Converting...' : 'Convert to PDF'}
              </button>
              
              {pdfUrl && (
                <a 
                  href={pdfUrl} 
                  download="converted.pdf"
                  className="py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg text-center transition duration-200"
                >
                  Download PDF
                </a>
              )}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-blue-900 mb-12">Why Use Our Image to PDF Converter?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: '⚡',
                  title: 'Fast & Free',
                  description: 'Convert images to PDF in seconds without any cost.'
                },
                {
                  icon: '🛡️',
                  title: 'Secure',
                  description: 'Your files never leave your browser. No server processing.'
                },
                {
                  icon: '📱',
                  title: 'Mobile Friendly',
                  description: 'Works perfectly on all devices, no app installation needed.'
                },
                {
                  icon: '💡',
                  title: 'Simple to Use',
                  description: 'Just upload, convert, and download. No registration required.'
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition duration-200">
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-900 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Start converting your images now – it is free!</h2>
            <button 
              onClick={() => fileInputRef.current?.click()} 
              className="bg-white text-blue-900 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition duration-200"
            >
              Try the Tool
            </button>
          </div>
        </section>
      </main>

      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 mb-4 md:mb-0">© PDFGenie – All rights reserved</p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-600 hover:text-blue-900">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-blue-900">Terms of Use</a>
            <a href="#" className="text-gray-600 hover:text-blue-900">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}