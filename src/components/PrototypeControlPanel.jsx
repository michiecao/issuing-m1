import React, { useState, useRef, useEffect } from 'react';
import * as Icons from './icons';

const PANEL_WIDTH = 280;
const PANEL_MARGIN = 12; // 3 in tailwind = 12px

const PrototypeControlPanel = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [currentPos, setCurrentPos] = useState({ left: PANEL_MARGIN, bottom: PANEL_MARGIN });
  const panelRef = useRef(null);
  const dragStartRef = useRef({ x: 0, y: 0, left: 0, bottom: 0 });
  const initializedRef = useRef(false);
  const hasMovedRef = useRef(false);

  // Initialize position on mount
  useEffect(() => {
    if (!initializedRef.current) {
      setCurrentPos({ left: PANEL_MARGIN, bottom: PANEL_MARGIN });
      initializedRef.current = true;
    }
  }, []);

  // Keep panel within viewport bounds on resize
  useEffect(() => {
    const handleResize = () => {
      if (!isDragging && panelRef.current) {
        const panelHeight = panelRef.current.offsetHeight;
        setCurrentPos(prev => ({
          left: Math.min(prev.left, window.innerWidth - PANEL_WIDTH - PANEL_MARGIN),
          bottom: Math.min(prev.bottom, window.innerHeight - panelHeight - PANEL_MARGIN),
        }));
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isDragging]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - dragStartRef.current.x;
      const deltaY = e.clientY - dragStartRef.current.y;

      // Check if mouse has moved beyond threshold (5px)
      if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
        hasMovedRef.current = true;
      }

      // Calculate new position
      let newLeft = dragStartRef.current.left + deltaX;
      let newBottom = dragStartRef.current.bottom - deltaY; // Invert Y since bottom increases upward

      // Constrain to viewport bounds
      const panelHeight = panelRef.current?.offsetHeight || 300;
      newLeft = Math.max(PANEL_MARGIN, Math.min(newLeft, window.innerWidth - PANEL_WIDTH - PANEL_MARGIN));
      newBottom = Math.max(PANEL_MARGIN, Math.min(newBottom, window.innerHeight - panelHeight - PANEL_MARGIN));

      setCurrentPos({
        left: newLeft,
        bottom: newBottom,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);

      // If no significant movement, treat as click and toggle collapse
      if (!hasMovedRef.current) {
        setIsCollapsed(prev => !prev);
      }
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

  return (
    <>
      {/* Panel */}
      <div
        ref={panelRef}
        className={`fixed z-[80] ${isDragging ? 'cursor-grabbing' : ''} ${isDragging ? 'opacity-100' : isCollapsed ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
        style={{
          left: currentPos.left,
          bottom: currentPos.bottom,
          transition: isDragging ? 'none' : 'opacity 500ms',
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
