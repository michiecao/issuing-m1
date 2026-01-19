import React, { useState, useEffect } from 'react';
import PrototypeWrapper from './PrototypeWrapper';
import Prototype1, {
  initialVariables as prototype1InitialVars
} from './prototypes/Prototype1';
import Prototype2, { initialVariables as prototype2InitialVars } from './prototypes/Prototype2';
import Prototype3, { initialVariables as prototype3InitialVars } from './prototypes/Prototype3';

// Prototype definitions - edit this array to add/modify prototypes
const PROTOTYPES = [
  {
    id: 'prototype1',
    title: 'Platform controls ↔ Embedded',
    description: 'Mapping platform features to the embedded component.',
    status: 'in-progress',
    component: Prototype1,
    initialVariables: prototype1InitialVars,
    initialControlVariables: { currentView: 'platform', showWrapper: true },
  },
  {
    id: 'prototype2',
    title: 'Embedded navigation',
    description: 'Exploring navigation patterns in the component.',
    status: 'in-progress',
    component: Prototype2,
    initialVariables: prototype2InitialVars,
    initialControlVariables: { currentView: 'platform', showWrapper: true },
  },
  {
    id: 'prototype3',
    title: 'Platform configuration & onboarding',
    description: 'Exploring platform configuration and onboarding flows.',
    status: 'in-progress',
    component: Prototype3,
    initialVariables: prototype3InitialVars,
    initialControlVariables: { currentView: 'platform', showWrapper: true, onboardingStep: 'none' },
  },
];

const PrototypeCard = ({ id, title, description, status, href, disabled }) => (
  <tr
    className={`border-b border-gray-200 last:border-b-0 relative ${disabled ? 'opacity-50' : 'cursor-pointer hover:bg-gray-50'} transition-colors`}
  >
    <td className="px-6 py-4">
      {!disabled && <a href={href} className="absolute inset-1" aria-label={title} />}
      <code className="text-sm text-gray-500 font-mono">{id}</code>
    </td>
    <td className="px-6 py-4">
      <div className="font-medium text-gray-900">{title}</div>
    </td>
    <td className="px-6 py-4">
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status === 'active'
          ? 'bg-green-100 text-green-800'
          : status === 'in-progress'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-gray-100 text-gray-600'
          }`}
      >
        {status}
      </span>
    </td>
    <td className="px-6 py-4">
      <div className="text-sm text-gray-600">{description}</div>
    </td>
    <td className="px-6 py-4 text-right">
      <svg
        className="w-5 h-5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </td>
  </tr>
);

const HomePage = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-gray-100">
    <div className="container mx-auto px-6 py-12 max-w-6xl">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Issuing M1 Prototypes
        </h1>
        <p className="text-lg text-gray-600">
          Prototype explorations for Issuing M1.
        </p>
      </div>

      {/* Prototypes Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {PROTOTYPES.map((prototype) => (
              <PrototypeCard
                key={prototype.id}
                id={prototype.id}
                title={prototype.title}
                description={prototype.description}
                status={prototype.status}
                disabled={prototype.disabled}
                href={`#${prototype.id}`}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

function App() {
  // Get initial view from URL hash
  const getViewFromHash = () => {
    const hash = window.location.hash.slice(1); // Remove the '#'
    return hash || 'home';
  };

  const [currentView, setCurrentView] = useState(getViewFromHash);

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentView(getViewFromHash());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleBackToHome = () => {
    window.location.hash = '';
  };

  if (currentView === 'home') {
    return <HomePage />;
  }

  const currentPrototype = PROTOTYPES.find((p) => p.id === currentView);

  if (currentPrototype) {
    const PrototypeComponent = currentPrototype.component;
    return (
      <PrototypeWrapper
        initialVariables={currentPrototype.initialVariables}
        initialControlVariables={currentPrototype.initialControlVariables || {}}
      >
        <PrototypeComponent />
      </PrototypeWrapper>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Prototype Not Found
        </h2>
        <button
          onClick={handleBackToHome}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default App;
