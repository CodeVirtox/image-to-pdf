"use client";
import { useState, useRef, ChangeEvent } from 'react';
import { Toaster, toast } from 'react-hot-toast';

export default function PDFConverter() {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (files.some(file => !file.type.startsWith('image/'))) {
        toast.error('Please select only image files');
        return;
      }
      setSelectedImages(files);
      toast.success(`${files.length} images selected`);
    }
  };

  const convertToPDF = async () => {
    if (selectedImages.length === 0) {
      toast.error('Please select images first');
      return;
    }

    setIsConverting(true);
    toast.loading('Converting to PDF...');

    // Simulate conversion (replace with actual PDF generation)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsConverting(false);
    toast.success('Conversion successful!', {
      duration: 4000,
    });
    // Add actual download logic here
  };

  const resetSelection = () => {
    setSelectedImages([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.dismiss();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" />
      
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden md:max-w-2xl transition-all duration-500 hover:shadow-3xl">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Image to PDF Converter</h1>
            <p className="text-gray-600">Convert your images to a single PDF file</p>
          </div>

          {/* Drag and drop area */}
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer transition-all duration-300 hover:border-blue-400 hover:bg-blue-50 mb-6"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageSelect}
              className="hidden"
              accept="image/*"
              multiple
            />
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-2 text-sm text-gray-600">
              Drag & drop images here or <span className="text-blue-500 font-medium">click to browse</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">JPG, PNG, GIF supported</p>
          </div>

          {/* Selected images preview */}
          {selectedImages.length > 0 && (
            <div className="mb-6 transition-all duration-300">
              <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
                <span className="bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                  {selectedImages.length}
                </span>
                Selected Images
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {selectedImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Image ${index + 1}`}
                      className="h-24 w-full object-cover rounded-md shadow-sm group-hover:opacity-75 transition-opacity"
                    />
                    <button
                      onClick={() => setSelectedImages(prev => prev.filter((_, i) => i !== index))}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none"
                    >
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={resetSelection}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={convertToPDF}
              disabled={isConverting || selectedImages.length === 0}
              className={`px-6 py-2 rounded-lg transition-all ${isConverting || selectedImages.length === 0 ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              {isConverting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Converting...
                </span>
              ) : (
                'Convert to PDF'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}