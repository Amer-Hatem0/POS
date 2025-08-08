import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-4">
          <div className="absolute inset-0 border-4 border-primary-light rounded-full animate-pulse"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
        </div>
        <h2 className="text-lg font-semibold text-foreground animate-pulse">Loading...</h2>
        <p className="text-sm text-muted-foreground mt-2">Please wait while we prepare your content</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;