'use client';

import React, { useRef, useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';

type UploadDropzoneProps = {
  onFileSelect: (file: File | undefined) => void;
  error?: string;
};

export const UploadDropzone: React.FC<UploadDropzoneProps> = ({ onFileSelect, error }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleFile = (file: File) => {
    setSelectedFile(file);
    onFileSelect(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreview(null);
    onFileSelect(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // clear the input
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup object URL if used in future
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="space-y-4">
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center text-sm text-gray-500 cursor-pointer hover:border-blue-400 transition-colors"
      >
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleChange}
          className="hidden"
        />
        <p>Click or drag an image here to upload</p>
        <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
        {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
      </div>

      {preview && selectedFile && (
        <div className="relative flex items-center gap-4 p-4 bg-gray-50 border rounded-md shadow-sm">
          <Image
            src={preview}
            width={64}
            height={64}
            alt="Selected preview"
            className="object-cover rounded-md border"
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-700">{selectedFile.name}</p>
            <p className="text-xs text-gray-500">{(selectedFile.size / 1024).toFixed(2)} KB</p>
          </div>
          <button
            onClick={removeFile}
            className="text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Remove selected image"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
