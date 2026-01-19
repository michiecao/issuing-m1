import React, { useState, useRef, useEffect } from 'react';
import * as Icons from './icons';

const PANEL_WIDTH = 280;
const PANEL_MARGIN = 12; // 3 in tailwind = 12px

const PrototypeControlPanel = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [position, setPosition] = useState('left'); // 'left' or 'right'
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [keepVisible, setKeepVisible] = useState(false);
  const [currentPos, setCurrentPos] = useState({ left: 0, bottom: PANEL_MARGIN });
  const [panelHeight, setPanelHeight] = useState(0);
  const panelRef = useRef(null);
  const dragStartRef = useRef({ x: 0, y: 0, left: 0, bottom: 0 });
  const initializedRef = useRef(false);
  const hasMovedRef = useRef(false);

  // Calculate the left position for each snap point
  const getSnapPosition = (pos) => {
    if (pos === 'left') {
      return { left: PANEL_MARGIN, bottom: PANEL_MARGIN };
    } else {
      return { left: window.innerWidth - PANEL_WIDTH - PANEL_MARGIN, bottom: PANEL_MARGIN };
    }
  };

  // Initialize position on mount
  useEffect(() => {
    if (!initializedRef.current) {
      setCurrentPos(getSnapPosition(position));
      initializedRef.current = true;
    }
  }, []);

  // Update position when window resizes
  useEffect(() => {
    const handleResize = () => {
      if (!isDragging && !isAnimating) {
        setCurrentPos(getSnapPosition(position));
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [position, isDragging, isAnimating]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - dragStartRef.current.x;
      const deltaY = e.clientY - dragStartRef.current.y;

      // Check if mouse has moved beyond threshold (5px)
      if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
        hasMovedRef.current = true;
      }

      setCurrentPos({
        left: dragStartRef.current.left + deltaX,
        bottom: dragStartRef.current.bottom - deltaY, // Invert Y since bottom increases upward
      });
    };

    const handleMouseUp = (e) => {
      setIsDragging(false);

      // If no significant movement, treat as click and toggle collapse
      if (!hasMovedRef.current) {
        setIsCollapsed(prev => !prev);
        return;
      }

      // Determine which corner is closer based on mouse position
      const windowWidth = window.innerWidth;
      const mouseX = e.clientX;
      const newPosition = mouseX < windowWidth / 2 ? 'left' : 'right';

      setPosition(newPosition);
      setIsAnimating(true);
      setKeepVisible(true);

      // Wait for DOM to update with transition class, then change position
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const snapPos = getSnapPosition(newPosition);
          setCurrentPos(snapPos);
        });
      });

      // Clear animating state after transition completes
      setTimeout(() => setIsAnimating(false), 350);

      // Keep visible for 1 second after animation completes, then fade out
      setTimeout(() => setKeepVisible(false), 350 + 500);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleDragStart = (e) => {
    e.preventDefault();

    // Reset movement tracking
    hasMovedRef.current = false;

    // Measure panel height when drag starts
    if (panelRef.current) {
      setPanelHeight(panelRef.current.offsetHeight);
    }

    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      left: currentPos.left,
      bottom: currentPos.bottom,
    };

    setIsDragging(true);
  };

  if (!children) {
    return null;
  }

  // Determine which drop zone is active based on current drag position
  const isLeftZoneActive = currentPos.left < (window.innerWidth - PANEL_WIDTH) / 2;

  return (
    <>
      {/* Drop zone indicators when dragging */}
      {isDragging && (
        <>
          <div
            className={`fixed bottom-3 left-3 z-40 w-[280px] rounded-lg transition-colors ${isLeftZoneActive ? 'bg-blue-400/20' : 'bg-gray-400/10'
              }`}
            style={{ height: panelHeight }}
          />
          <div
            className={`fixed bottom-3 right-3 z-40 w-[280px] rounded-lg transition-colors ${!isLeftZoneActive ? 'bg-blue-400/20' : 'g-gray-400/10'
              }`}
            style={{ height: panelHeight }}
          />
        </>
      )}

      {/* Panel */}
      <div
        ref={panelRef}
        className={`fixed z-50 ${isDragging ? 'cursor-grabbing' : ''} ${isDragging || isAnimating || keepVisible ? 'opacity-100' : isCollapsed ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
        style={{
          left: currentPos.left,
          bottom: currentPos.bottom,
          transition: isAnimating ? 'left 300ms cubic-bezier(0.22, 1, 0.36, 1), bottom 300ms cubic-bezier(0.22, 1, 0.36, 1)' : isDragging ? 'none' : 'opacity 500ms',
        }}
      >
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden" style={{ width: '276px' }}>
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 bg-gray-50 cursor-grab active:cursor-grabbing hover:bg-gray-100 transition-colors select-none"
            onMouseDown={handleDragStart}
          >
            <div className="flex items-center space-x-2 pointer-events-none">
              <Icons.SettingsIcon />
              <span className="text-sm font-semibold text-gray-900">Prototype controls</span>
            </div>
            <div
              className={`text-gray-500 transition-transform duration-200 pointer-events-none ${isCollapsed ? 'rotate-180' : ''}`}
            >
              <Icons.ChevronDownIcon size={12} />
            </div>
          </div>

          {/* Controls */}
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${isCollapsed ? 'max-h-0 opacity-0' : 'max-h-[600px] opacity-100'
              }`}
          >
            <div className="p-4 space-y-4">
              {children}
            </div>

            {/* All prototypes link */}
            <div className="px-4 pb-4">
              <a
                href="#"
                className="items-center flex justify-center gap-2 w-full px-3 py-1 text-sm hover:cursor-pointer
                font-medium rounded-md transition-colors text-gray-600 border border-gray-300 hover:bg-gray-100"
              >
                <Icons.ArrowLeftIcon size={12} />
                <span>Back to all prototypes</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrototypeControlPanel;
