import React from 'react';
import ErrorBoundary from './error/errorBoundary';

export default React.createContext({loadingBoundary: '', errorBoundary: ErrorBoundary});