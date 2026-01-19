import React from 'react';
import { usePrototype } from '../PrototypeContext';

const EmbeddedComponentWrapper = ({ children, componentName = 'Financial-account' }) => {
  const { getControlVariable } = usePrototype();
  const showWrapper = getControlVariable('showWrapper', true);

  return (
    <div
      className={`relative h-full transition-all duration-200 outline-2 outline-dashed rounded-sm p-0.5 ${showWrapper ? 'outline-[#533AFD]' : 'outline-transparent'
        }`}
    >
      {/* Wrapper Label */}
      <div
        className={`absolute -top-7 left-0 px-2 transition-all duration-200 bg-[#EDEDF8] rounded-sm ${showWrapper ? 'opacity-100' : 'opacity-0'
          }`}
      >
        <span className="text-xs font-mono font-semibold text-[#533AFD]">{componentName}</span>
      </div>

      {/* Content */}
      {children}
    </div>
  );
};

export default EmbeddedComponentWrapper;
