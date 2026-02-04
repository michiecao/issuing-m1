import React, { useState } from 'react';
import gradientBg from '../../assets/gradient-bg.png';

// Icons
const InfoIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M8.5 1.5H3C2.17157 1.5 1.5 2.17157 1.5 3V8.5C1.5 9.32843 2.17157 10 3 10H8.5C9.32843 10 10 9.32843 10 8.5V3C10 2.17157 9.32843 1.5 8.5 1.5ZM3 0C1.34315 0 0 1.34315 0 3V8.5C0 10.1569 1.34315 11.5 3 11.5H8.5C10.1569 11.5 11.5 10.1569 11.5 8.5V3C11.5 1.34315 10.1569 0 8.5 0H3Z" fill="#6C7688"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M4.23182 6.24998C4.23182 5.86338 4.54522 5.54998 4.93182 5.54998H6.02273C6.40933 5.54998 6.72273 5.86338 6.72273 6.24998V8.24998C6.72273 8.63658 6.40933 8.94998 6.02273 8.94998C5.63613 8.94998 5.32273 8.63658 5.32273 8.24998V6.94998H4.93182C4.54522 6.94998 4.23182 6.63658 4.23182 6.24998Z" fill="#6C7688"/>
    <path d="M4.74994 3.74999C4.74994 3.19858 5.19854 2.74999 5.74994 2.74999C6.30134 2.74999 6.74994 3.19858 6.74994 3.74999C6.74994 4.30139 6.30134 4.74999 5.74994 4.74999C5.19854 4.74999 4.74994 4.30139 4.74994 3.74999Z" fill="#6C7688"/>
  </svg>
);

const ChevronDownSmallIcon = () => (
  <svg width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M0.606072 6.33351C0.307015 6.62011 0.296913 7.09487 0.58351 7.39393L3.45851 10.3939C3.59989 10.5415 3.79535 10.6249 3.99969 10.625C4.20403 10.6251 4.39955 10.5418 4.54106 10.3944L7.41606 7.39938C7.70291 7.10056 7.6932 6.62579 7.39438 6.33894C7.09556 6.0521 6.62079 6.0618 6.33394 6.36062L4.00045 8.79151L1.66649 6.35607C1.3799 6.05701 0.905129 6.04691 0.606072 6.33351Z" fill="currentColor"/>
  </svg>
);

const StripeIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="6" fill="#635BFF"/>
    <path d="M14.8 13.2C14.8 12.5 15.4 12.2 16.3 12.2C17.6 12.2 19.2 12.6 20.5 13.3V9.5C19.1 8.9 17.7 8.7 16.3 8.7C13.1 8.7 11 10.4 11 13.4C11 18 17.3 17.3 17.3 19.4C17.3 20.2 16.6 20.5 15.6 20.5C14.2 20.5 12.4 19.9 11 19.1V23C12.5 23.6 14.1 23.9 15.6 23.9C18.9 23.9 21.1 22.3 21.1 19.2C21.1 14.2 14.8 15 14.8 13.2Z" fill="white"/>
  </svg>
);

// Badge Component
const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-[#EBEEF1] text-[#596171] border border-[#D8DEE4]',
    success: 'bg-[#D1FAB3] text-[#217005] border border-[#A8F170]',
    active: 'bg-[#D1FAB3] text-[#217005] border border-[#A8F170]',
    frozen: 'bg-[#EBEEF1] text-[#596171] border border-[#D8DEE4]',
    inactive: 'bg-[#EBEEF1] text-[#596171] border border-[#D8DEE4]',
    cancelled: 'bg-[#FDE9EE] text-[#C0123C] border border-[#FBD3DC]',
    expired: 'bg-[#FCEEB5] text-[#B13600] border border-[#FBD992]',
    error: 'bg-[#FDE9EE] text-[#C0123C] border border-[#FBD3DC]',
  };
  
  return (
    <span className={`inline-flex items-center h-[18px] px-1.5 rounded text-[11px] font-semibold leading-4 ${variants[variant]}`}>
      {children}
    </span>
  );
};

// Tab Component
const Tab = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-0 py-4 text-sm font-medium border-b-2 transition-colors ${
      active 
        ? 'border-[#635bff] text-[#635bff]' 
        : 'border-transparent text-[#596171] hover:text-[#353a44]'
    }`}
  >
    {label}
  </button>
);

// Line Chart Component with Grid Lines - Updated Design
const LineChart = ({ 
  height = 180, 
  title = "Total volume",
  value = "$X.00",
  previousValue = "$X.00 previous period",
  yAxisLabels = ['12k', '10k', '8k', '6k', '4k', '2k', '0'],
  xAxisLabels = ['Midnight', '11:59 pm'],
  showComparison = true,
  variant = 'currency' // 'currency' or 'percentage'
}) => {
  const gridLines = 7; // 7 horizontal lines for 0-12k scale
  
  // Sample data points for the main line (normalized 0-1)
  const mainLineData = [
    0.35, 0.42, 0.55, 0.48, 0.62, 0.75, 0.68, 0.82, 0.78, 0.85, 
    0.72, 0.65, 0.58, 0.70, 0.82, 0.88, 0.75, 0.68, 0.72, 0.78
  ];
  
  // Sample data points for comparison line (normalized 0-1)
  const comparisonLineData = [
    0.28, 0.35, 0.42, 0.38, 0.52, 0.58, 0.55, 0.68, 0.62, 0.70,
    0.58, 0.52, 0.48, 0.55, 0.65, 0.72, 0.62, 0.55, 0.58, 0.62
  ];

  // Generate SVG path from data points
  const generatePath = (data, width, height) => {
    const points = data.map((y, i) => {
      const x = (i / (data.length - 1)) * width;
      const yPos = height - (y * height);
      return `${x},${yPos}`;
    });
    return `M ${points.join(' L ')}`;
  };

  return (
    <div className="relative" style={{ height }}>
      {/* Chart container with Y-axis */}
      <div className="flex h-full">
        {/* Chart area */}
        <div className="flex-1 flex flex-col">
          <div className="relative flex-1">
            {/* Horizontal Grid Lines */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              {Array.from({ length: gridLines }).map((_, i) => {
                const y = (i / (gridLines - 1)) * 100;
                const isBaseline = i === gridLines - 1;
                return (
                  <line
                    key={i}
                    x1="0%"
                    y1={`${y}%`}
                    x2="100%"
                    y2={`${y}%`}
                    stroke={isBaseline ? "#99a5b8" : "#d8dee4"}
                    strokeWidth="1"
                  />
                );
              })}
            </svg>
            
            {/* Chart Lines */}
            <svg 
              className="absolute inset-0 w-full h-full" 
              viewBox="0 0 100 100" 
              preserveAspectRatio="none"
            >
              {/* Comparison line (dashed, gray) */}
              {showComparison && (
                <path
                  d={generatePath(comparisonLineData, 100, 100)}
                  fill="none"
                  stroke="#99a5b8"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  vectorEffect="non-scaling-stroke"
                />
              )}
              
              {/* Main line (solid, purple) */}
              <path
                d={generatePath(mainLineData, 100, 100)}
                fill="none"
                stroke="#9966ff"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
          
          {/* X-axis labels */}
          <div className="flex justify-between text-[12px] text-[#6c7688] pt-2 h-6">
            {xAxisLabels.map((label, i) => (
              <span key={i}>{label}</span>
            ))}
          </div>
        </div>
        
        {/* Y-axis labels - on the right */}
        <div className="flex flex-col justify-between text-[12px] text-[#6c7688] w-[32px] pl-2 pt-0 pb-6">
          {yAxisLabels.map((label, i) => (
            <span key={i} className="text-left">{label}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Cancel Circle Icon for active filter chips
const CancelCircleIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6" cy="6" r="5.5" stroke="#6C7688" />
    <path d="M4 4L8 8M8 4L4 8" stroke="#6C7688" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

// Chevron Down Icon for dropdowns (8px version for chips)
const ChevronDownChipIcon = () => (
  <svg width="8" height="8" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M0.606072 6.33351C0.307015 6.62011 0.296913 7.09487 0.58351 7.39393L3.45851 10.3939C3.59989 10.5415 3.79535 10.6249 3.99969 10.625C4.20403 10.6251 4.39955 10.5418 4.54106 10.3944L7.41606 7.39938C7.70291 7.10056 7.6932 6.62579 7.39438 6.33894C7.09556 6.0521 6.62079 6.0618 6.33394 6.36062L4.00045 8.79151L1.66649 6.35607C1.3799 6.05701 0.905129 6.04691 0.606072 6.33351Z" fill="#6C7688"/>
  </svg>
);

// Plus Icon for inactive filter chips
const PlusCircleIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6" cy="6" r="5.5" stroke="#6C7688" />
    <path d="M6 3.5V8.5M3.5 6H8.5" stroke="#6C7688" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

// Filter Chip Component - matches Figma design
const FilterChip = ({ label, value, hasDropdown = true, hasSeparator = false, hasCloseIcon = false, sameValue = false, isInactive = false }) => (
  <button 
    className={`flex items-center h-6 rounded-full bg-white hover:bg-gray-50 transition-colors ${
      isInactive ? 'border border-dashed border-[#d8dee4]' : 'border border-[#d8dee4]'
    }`}
  >
    {/* Plus icon for inactive state */}
    {isInactive && (
      <div className="flex items-center justify-center pl-1.5">
        <PlusCircleIcon />
      </div>
    )}
    
    {/* Close icon for active state */}
    {hasCloseIcon && !isInactive && (
      <div className="flex items-center justify-center pl-1.5">
        <CancelCircleIcon />
      </div>
    )}
    
    {/* Content */}
    <div className={`flex items-center gap-1.5 ${(hasCloseIcon || isInactive) ? 'pl-1' : 'pl-2'} pr-2`}>
      {/* Label */}
      <span className="text-[12px] font-semibold text-[#596171] leading-4 tracking-[-0.024px]">
        {label}
      </span>
      
      {/* Separator */}
      {hasSeparator && value && !isInactive && (
        <div className="w-px h-3 bg-[#b6c0cd]" />
      )}
      
      {/* Value */}
      {value && !isInactive && (
        <span className={`text-[12px] font-semibold leading-4 tracking-[-0.024px] ${sameValue ? 'text-[#533afd]' : 'text-[#533afd]'}`}>
          {value}
        </span>
      )}
      
      {/* Dropdown chevron - not shown when inactive */}
      {hasDropdown && !isInactive && (
        <div className="flex items-center justify-center">
          <ChevronDownChipIcon />
        </div>
      )}
    </div>
  </button>
);

// Chart Widget Component
const ChartWidget = ({ 
  title, 
  value, 
  previousValue, 
  yAxisLabels,
  variant = 'currency'
}) => (
  <div className="flex-1 min-w-0 flex flex-col">
    {/* Header */}
    <div className="mb-2">
      <div className="flex items-center gap-2 mb-1">
        <h3 className="font-bold text-[16px] text-[#353a44]">{title}</h3>
        <span className="text-[#6c7688]"><InfoIcon /></span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-[18px] font-semibold text-[#353a44]">{value}</span>
        <span className="text-[14px] text-[#596171]">{previousValue}</span>
      </div>
    </div>
    
    {/* Chart */}
    <LineChart 
      height={200} 
      yAxisLabels={yAxisLabels}
      variant={variant}
    />
  </div>
);

// Filter Chip with Dropdown Component
const FilterChipDropdown = ({ label, value, options, onSelect, hasSeparator = false, hasCloseIcon = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center h-6 rounded-full border border-[#d8dee4] bg-white hover:bg-gray-50 transition-colors"
      >
        {/* Close icon */}
        {hasCloseIcon && (
          <div className="flex items-center justify-center pl-1.5">
            <CancelCircleIcon />
          </div>
        )}
        
        {/* Content */}
        <div className={`flex items-center gap-1.5 ${hasCloseIcon ? 'pl-1' : 'pl-2'} pr-2`}>
          {/* Label */}
          <span className="text-[12px] font-semibold text-[#596171] leading-4 tracking-[-0.024px]">
            {label}
          </span>
          
          {/* Separator */}
          {hasSeparator && (
            <div className="w-px h-3 bg-[#b6c0cd]" />
          )}
          
          {/* Value */}
          <span className="text-[12px] font-semibold leading-4 tracking-[-0.024px] text-[#533afd]">
            {value}
          </span>
          
          {/* Dropdown chevron */}
          <div className="flex items-center justify-center">
            <ChevronDownChipIcon />
          </div>
        </div>
      </button>
      
      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop to close dropdown */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute top-full left-0 mt-1 z-20 bg-white border border-[#d8dee4] rounded-lg shadow-lg py-1 min-w-[180px]">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-left text-[13px] hover:bg-[#f5f6f8] transition-colors ${
                  value === option.label ? 'text-[#533afd] font-semibold' : 'text-[#353a44]'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Add Funds Modal Component
const AddFundsModal = ({ isOpen, onClose, onAddFunds }) => {
  const [amount, setAmount] = useState('100');
  const [step, setStep] = useState('select'); // 'select' or 'review'
  const [statementDescriptor, setStatementDescriptor] = useState('');
  const [internalNote, setInternalNote] = useState('');
  
  if (!isOpen) return null;

  const handleClose = () => {
    setStep('select');
    onClose();
  };

  const handleAddFunds = () => {
    const numericAmount = parseFloat(amount) || 0;
    if (onAddFunds && numericAmount > 0) {
      onAddFunds(numericAmount);
    }
    handleClose();
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Gray Background Overlay */}
      <div 
        className="absolute inset-0 bg-black/40"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div 
        className="relative bg-white rounded-xl shadow-[0px_16px_32px_rgba(0,0,0,0.12),0px_4px_8px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-300 ease-out flex flex-col"
        style={{ width: step === 'select' ? '354px' : '960px', height: step === 'review' ? '600px' : 'auto' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M4.25 4.25H7C7.41421 4.25 7.75 3.91421 7.75 3.5C7.75 3.08579 7.41421 2.75 7 2.75H4C3.30964 2.75 2.75 3.30964 2.75 4V11C2.75 11.6904 3.30964 12.25 4 12.25H14.5C15.1904 12.25 15.75 11.6904 15.75 11V6.5C15.75 6.08579 15.4142 5.75 15 5.75C14.5858 5.75 14.25 6.08579 14.25 6.5V10.75H4.25V4.25Z" fill="#353A44"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M8.5 7V8C8.5 8.41421 8.83579 8.75 9.25 8.75C9.66421 8.75 10 8.41421 10 8V7C10 6.58579 9.66421 6.25 9.25 6.25C8.83579 6.25 8.5 6.58579 8.5 7ZM7.25 7V8C7.25 9.10457 8.14543 10 9.25 10C10.3546 10 11.25 9.10457 11.25 8V7C11.25 5.89543 10.3546 5 9.25 5C8.14543 5 7.25 5.89543 7.25 7Z" fill="#353A44"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M1 5.25C1.41421 5.25 1.75 5.58579 1.75 6V12.5C1.75 12.9142 2.08579 13.25 2.5 13.25H12.5C12.9142 13.25 13.25 13.5858 13.25 14C13.25 14.4142 12.9142 14.75 12.5 14.75H2.5C1.25736 14.75 0.25 13.7426 0.25 12.5V6C0.25 5.58579 0.585786 5.25 1 5.25Z" fill="#353A44"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M12.5 0.25C12.9142 0.25 13.25 0.585786 13.25 1V2.25H14.5C14.9142 2.25 15.25 2.58579 15.25 3C15.25 3.41421 14.9142 3.75 14.5 3.75H13.25V5C13.25 5.41421 12.9142 5.75 12.5 5.75C12.0858 5.75 11.75 5.41421 11.75 5V3.75H10.5C10.0858 3.75 9.75 3.41421 9.75 3C9.75 2.58579 10.0858 2.25 10.5 2.25H11.75V1C11.75 0.585786 12.0858 0.25 12.5 0.25Z" fill="#353A44"/>
            </svg>
            <h2 className="text-[14px] font-semibold text-[#353a44]">Add funds</h2>
          </div>
          <button 
            onClick={handleClose}
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#f5f6f8] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M1.45647 1.45696C1.84374 1.06969 2.47163 1.06969 2.8589 1.45696L6.99935 5.59741L11.1398 1.45696C11.5271 1.06969 12.155 1.06969 12.5422 1.45696C12.9295 1.84423 12.9295 2.47211 12.5422 2.85938L8.40178 6.99984L12.5422 11.1403C12.9295 11.5276 12.9295 12.1554 12.5422 12.5427C12.155 12.93 11.5271 12.93 11.1398 12.5427L6.99935 8.40227L2.8589 12.5427C2.47163 12.93 1.84374 12.93 1.45647 12.5427C1.0692 12.1554 1.0692 11.5276 1.45647 11.1403L5.59692 6.99984L1.45647 2.85938C1.0692 2.47211 1.0692 1.84423 1.45647 1.45696Z" fill="#474E5A"/>
            </svg>
          </button>
        </div>

        {step === 'select' ? (
          <>
            {/* Amount Display */}
            <div className="flex justify-center py-4">
              <span className="text-[14px] text-[#6c7688] mr-1 mt-1">$</span>
              <div className="flex flex-col items-center">
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, '');
                    setAmount(val);
                  }}
                  autoFocus
                  className="text-[48px] font-semibold text-[#353a44] leading-none bg-transparent border-none outline-none text-center caret-[#353a44]"
                  style={{ width: `${Math.max(amount.length, 1) * 29}px` }}
                />
                <div 
                  className="h-[4px] bg-[#353a44] rounded-sm"
                  style={{ width: `${Math.max(amount.length, 1) * 29}px` }}
                />
              </div>
              <span className="text-[14px] text-[#6c7688] ml-1.5 self-center">USD</span>
            </div>
            
            {/* Content */}
            <div className="px-5 pb-5">
              {/* To Section */}
              <div className="mb-4">
                <label className="block text-[13px] font-medium text-[#353a44] mb-1">To</label>
                <div className="flex items-center gap-3 px-2 h-14 bg-white border border-[#e3e8ee] rounded-lg">
                  <svg width="32" height="32" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                    <rect width="22" height="22" rx="5.5" fill="#6772E5"/>
                    <path d="M10.0125 8.47534C10.0125 7.9402 10.4516 7.73438 11.1789 7.73438C12.2217 7.73438 13.5389 8.04998 14.5818 8.61255V5.38802C13.4429 4.93521 12.3177 4.75684 11.1789 4.75684C8.39341 4.75684 6.54102 6.21131 6.54102 8.64C6.54102 12.4271 11.7552 11.8234 11.7552 13.4562C11.7552 14.0874 11.2063 14.2932 10.4379 14.2932C9.29902 14.2932 7.84455 13.8267 6.69195 13.1955V16.4612C7.96804 17.0101 9.25786 17.2433 10.4379 17.2433C13.292 17.2433 15.2541 15.83 15.2541 13.3739C15.2404 9.2849 10.0125 10.0121 10.0125 8.47534Z" fill="white"/>
                    <rect x="15" y="19" width="18" height="14" rx="3" stroke="white" strokeWidth="2"/>
                    <path d="M30 32H18C16.8954 32 16 31.1046 16 30V26L16 22C16 20.8954 16.8954 20 18 20H24H30C31.1046 20 32 20.8954 32 22V30C32 31.1046 31.1046 32 30 32Z" fill="#E25950"/>
                    <rect x="16" y="21.0908" width="16" height="1.09091" fill="#F6F9FC"/>
                    <rect x="16" y="23.2729" width="16" height="1.09091" fill="#F6F9FC"/>
                    <rect x="16" y="25.4546" width="16" height="1.09091" fill="#F6F9FC"/>
                    <rect x="16" y="27.6362" width="16" height="1.09091" fill="#F6F9FC"/>
                    <rect x="16" y="29.8184" width="16" height="1.09091" fill="#F6F9FC"/>
                    <path opacity="0.1" d="M30 32H18C16.8954 32 16 31.1046 16 30V26.5H17V30C17 30.5523 17.4477 31 18 31H30C30.5523 31 31 30.5523 31 30V22C31 21.4477 30.5523 21 30 21H24V20H30C31.1046 20 32 20.8954 32 22V30C32 31.1046 31.1046 32 30 32Z" fill="#E25950"/>
                    <path d="M16 26.55V21.8714C16 20.8379 16.7959 20 17.7778 20H24V26.55H16Z" fill="#43458B"/>
                  </svg>
                  <div className="flex-1">
                    <div className="text-[14px] font-medium text-[#353a44]">Financial account</div>
                    <div className="text-[12px] text-[#6c7688]">USD</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] text-[#353a44]">$0.00</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M1.76222 7.43599C2.00468 7.16659 2.41963 7.14476 2.68902 7.38722L5.99993 10.3671L9.31108 7.3872C9.58048 7.14475 9.99542 7.1666 10.2379 7.436C10.4803 7.7054 10.4585 8.12034 10.1891 8.3628L6.43891 11.7378C6.31413 11.8501 6.15703 11.9062 5.99993 11.9062C5.84281 11.9063 5.68569 11.8501 5.5609 11.7378L1.81099 8.36278C1.5416 8.12032 1.51976 7.70538 1.76222 7.43599Z" fill="#6C7688"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M5.5609 0.262219C5.68569 0.149903 5.84281 0.0937465 5.99993 0.09375C6.15703 0.0937535 6.31413 0.149905 6.43891 0.262204L10.1891 3.6372C10.4585 3.87966 10.4803 4.2946 10.2379 4.564C9.99542 4.8334 9.58048 4.85525 9.31108 4.6128L5.99993 1.63289L2.68902 4.61278C2.41963 4.85524 2.00468 4.83341 1.76222 4.56401C1.51976 4.29462 1.5416 3.87968 1.81099 3.63722L5.5609 0.262219Z" fill="#6C7688"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Method Section */}
              <div className="mb-4">
                <label className="block text-[13px] font-medium text-[#353a44] mb-1">Method</label>
                <div className="flex items-center gap-3 px-2 h-14 bg-white border border-[#e3e8ee] rounded-lg">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                    <rect width="32" height="32" rx="8" fill="#F5F6F8"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M22.6009 13.3372C22.967 13.531 23.1066 13.9848 22.9128 14.3509L21.2457 17.5H22.5859C23.3384 17.5 23.8213 18.2998 23.4708 18.9657L21.1637 23.3493C20.9708 23.7159 20.5172 23.8566 20.1507 23.6637C19.7841 23.4708 19.6434 23.0172 19.8363 22.6507L21.7577 19H20.4152C19.6617 19 19.1788 18.1981 19.5314 17.5321L21.5872 13.6491C21.781 13.283 22.2348 13.1434 22.6009 13.3372Z" fill="#474E5A"/>
                    <path d="M15.6739 8.07459C15.8752 7.97742 16.1093 7.97508 16.3125 8.0682L22.3125 10.8182C22.689 10.9908 22.8544 11.4359 22.6818 11.8125C22.5092 12.189 22.0641 12.3544 21.6875 12.1818L16.0083 9.57882L9.5 12.7208V13.5H17.5C17.5426 13.5 17.5843 13.5035 17.625 13.5104C17.6656 13.5035 17.7074 13.5 17.75 13.5C18.1642 13.5 18.5 13.8358 18.5 14.25V20.25C18.5 20.6642 18.1642 21 17.75 21C17.3357 21 17 20.6642 17 20.25V15H15V20.25C15 20.6642 14.6642 21 14.25 21C13.8358 21 13.5 20.6642 13.5 20.25V15H12V20.25C12 20.5341 11.8395 20.7938 11.5854 20.9208L9.5 21.9635V22.5H17.75C18.1642 22.5 18.5 22.8358 18.5 23.25C18.5 23.6642 18.1642 24 17.75 24H9C8.44772 24 8 23.5523 8 23V21.6545C8 21.2757 8.214 20.9295 8.55279 20.7601L10.5 19.7865V15H9C8.44772 15 8 14.5523 8 14V12.4069C8 12.0231 8.21964 11.6732 8.56525 11.5064L15.6739 8.07459Z" fill="#474E5A"/>
                  </svg>
                  <div className="flex-1">
                    <div className="text-[14px] font-medium text-[#353a44]">Linked bank account</div>
                    <div className="text-[12px] text-[#6c7688]">1-5 days</div>
                  </div>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M1.76222 7.43599C2.00468 7.16659 2.41963 7.14476 2.68902 7.38722L5.99993 10.3671L9.31108 7.3872C9.58048 7.14475 9.99542 7.1666 10.2379 7.436C10.4803 7.7054 10.4585 8.12034 10.1891 8.3628L6.43891 11.7378C6.31413 11.8501 6.15703 11.9062 5.99993 11.9062C5.84281 11.9063 5.68569 11.8501 5.5609 11.7378L1.81099 8.36278C1.5416 8.12032 1.51976 7.70538 1.76222 7.43599Z" fill="#6C7688"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.5609 0.262219C5.68569 0.149903 5.84281 0.0937465 5.99993 0.09375C6.15703 0.0937535 6.31413 0.149905 6.43891 0.262204L10.1891 3.6372C10.4585 3.87966 10.4803 4.2946 10.2379 4.564C9.99542 4.8334 9.58048 4.85525 9.31108 4.6128L5.99993 1.63289L2.68902 4.61278C2.41963 4.85524 2.00468 4.83341 1.76222 4.56401C1.51976 4.29462 1.5416 3.87968 1.81099 3.63722L5.5609 0.262219Z" fill="#6C7688"/>
                  </svg>
                </div>
              </div>
              
              {/* Bank Account Section */}
              <div className="mb-6">
                <label className="block text-[13px] font-medium text-[#353a44] mb-1">Bank account</label>
                <div className="flex items-center gap-3 px-2 h-14 bg-white border border-[#e3e8ee] rounded-lg">
                  <svg width="32" height="32" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                    <rect width="22" height="22" rx="5.5" fill="#CD1309"/>
                    <path d="M10.0527 7.72949H12.8592L12.8164 8.52221H12.7564C12.2153 8.52221 12.0952 8.72038 11.8549 9.31557L10.1722 14.34H9.09068L7.70825 10.7041L6.38587 14.34H5.3043L3.50149 9.38229C3.32073 8.7871 2.961 8.52286 2.54003 8.52286H2.41992V7.72949H5.42679V8.52351H5.18657C4.82565 8.52351 4.64549 8.58957 4.70554 8.78775C4.70554 8.80977 4.69887 8.83179 4.6922 8.85381C4.67885 8.89785 4.66551 8.94189 4.70554 8.98593C4.70554 8.98593 5.42679 10.8369 5.96787 12.6218H6.02792L7.2296 9.31623C7.16954 8.7871 6.98938 8.52286 6.50835 8.52286H6.08738V7.72949H9.27262V8.52286H8.7916C8.49073 8.52286 8.37062 8.58892 8.37062 8.7871C8.37062 8.85316 8.37062 8.91987 8.43068 9.05199C8.43068 9.05199 9.15192 10.969 9.693 12.6218H9.75306L10.8947 9.31623C10.9547 9.05199 10.9547 8.91987 10.9547 8.7871C10.9547 8.58957 10.834 8.52286 10.4737 8.52286H10.0527V7.72949Z" fill="#FFFF00"/>
                    <path d="M18.9051 8.91791C19.0852 9.31492 19.1453 9.77734 19.1453 10.3065L19.8065 10.3071V7.72949H13.6762V8.45615H14.0365C14.5169 8.45615 14.6977 8.52221 14.6977 9.05003V12.9515C14.6977 13.4799 14.5175 13.5466 14.0365 13.5466H13.6762V14.3387H17.3425V13.5466H16.6813C16.1402 13.5466 16.0801 13.5466 16.0801 12.9515V11.232H16.5612C17.2824 11.232 17.4025 11.4962 17.4025 12.6205H18.0037V9.31557H17.4025C17.4025 10.3065 17.2824 10.5046 16.5612 10.5046H16.0801V8.52221H17.5827C18.2439 8.52221 18.6648 8.58696 18.9051 8.91791Z" fill="#FFFF00"/>
                    <rect x="15" y="19" width="18" height="14" rx="3" stroke="white" strokeWidth="2"/>
                    <path d="M30 32H18C16.8954 32 16 31.1046 16 30V26L16 22C16 20.8954 16.8954 20 18 20H24H30C31.1046 20 32 20.8954 32 22V30C32 31.1046 31.1046 32 30 32Z" fill="#E25950"/>
                    <rect x="16" y="21.0908" width="16" height="1.09091" fill="#F6F9FC"/>
                    <rect x="16" y="23.2729" width="16" height="1.09091" fill="#F6F9FC"/>
                    <rect x="16" y="25.4546" width="16" height="1.09091" fill="#F6F9FC"/>
                    <rect x="16" y="27.6362" width="16" height="1.09091" fill="#F6F9FC"/>
                    <rect x="16" y="29.8184" width="16" height="1.09091" fill="#F6F9FC"/>
                    <path opacity="0.1" d="M30 32H18C16.8954 32 16 31.1046 16 30V26.5H17V30C17 30.5523 17.4477 31 18 31H30C30.5523 31 31 30.5523 31 30V22C31 21.4477 30.5523 21 30 21H24V20H30C31.1046 20 32 20.8954 32 22V30C32 31.1046 31.1046 32 30 32Z" fill="#E25950"/>
                    <path d="M16 26.55V21.8714C16 20.8379 16.7959 20 17.7778 20H24V26.55H16Z" fill="#43458B"/>
                  </svg>
                  <div className="flex-1">
                    <div className="text-[14px] font-medium text-[#353a44]">Wells Fargo ••1234</div>
                    <div className="text-[12px] text-[#6c7688]">USD</div>
                  </div>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M1.76222 7.43599C2.00468 7.16659 2.41963 7.14476 2.68902 7.38722L5.99993 10.3671L9.31108 7.3872C9.58048 7.14475 9.99542 7.1666 10.2379 7.436C10.4803 7.7054 10.4585 8.12034 10.1891 8.3628L6.43891 11.7378C6.31413 11.8501 6.15703 11.9062 5.99993 11.9062C5.84281 11.9063 5.68569 11.8501 5.5609 11.7378L1.81099 8.36278C1.5416 8.12032 1.51976 7.70538 1.76222 7.43599Z" fill="#6C7688"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.5609 0.262219C5.68569 0.149903 5.84281 0.0937465 5.99993 0.09375C6.15703 0.0937535 6.31413 0.149905 6.43891 0.262204L10.1891 3.6372C10.4585 3.87966 10.4803 4.2946 10.2379 4.564C9.99542 4.8334 9.58048 4.85525 9.31108 4.6128L5.99993 1.63289L2.68902 4.61278C2.41963 4.85524 2.00468 4.83341 1.76222 4.56401C1.51976 4.29462 1.5416 3.87968 1.81099 3.63722L5.5609 0.262219Z" fill="#6C7688"/>
                  </svg>
                </div>
              </div>
              
              {/* Review Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => setStep('review')}
                  className="h-10 px-4 text-[14px] font-semibold text-white bg-[#635bff] rounded-lg hover:bg-[#5851ea] transition-colors shadow-[0px_1px_1px_rgba(47,14,99,0.32)]"
                >
                  Review
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Review Step - Two Column Layout */}
            <div className="flex flex-1">
              {/* Left Column - Form */}
              <div className="w-[480px] px-5 pb-5 shrink-0 flex flex-col items-start text-left h-full">
                {/* Amount Display */}
                <div className="mb-1">
                  <span className="text-[36px] font-semibold text-[#353a44]">${amount}.00</span>
                </div>
                <div className="text-[14px] text-[#353a44] mb-6">
                  <span className="font-normal">to</span> <span className="font-semibold">Financial account balance — USD</span>
                </div>
                
                {/* Statement Descriptor Field */}
                <div className="mb-4 w-full">
                  <div className="flex items-center gap-2 mb-2">
                    <label className="text-[14px] font-semibold text-[#353a44]">Add an external statement descriptor</label>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M8.5 1.5H3C2.17157 1.5 1.5 2.17157 1.5 3V8.5C1.5 9.32843 2.17157 10 3 10H8.5C9.32843 10 10 9.32843 10 8.5V3C10 2.17157 9.32843 1.5 8.5 1.5ZM3 0C1.34315 0 0 1.34315 0 3V8.5C0 10.1569 1.34315 11.5 3 11.5H8.5C10.1569 11.5 11.5 10.1569 11.5 8.5V3C11.5 1.34315 10.1569 0 8.5 0H3Z" fill="#6C7688"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M4.23182 6.24998C4.23182 5.86338 4.54522 5.54998 4.93182 5.54998H6.02273C6.40933 5.54998 6.72273 5.86338 6.72273 6.24998V8.24998C6.72273 8.63658 6.40933 8.94998 6.02273 8.94998C5.63613 8.94998 5.32273 8.63658 5.32273 8.24998V6.94998H4.93182C4.54522 6.94998 4.23182 6.63658 4.23182 6.24998Z" fill="#6C7688"/>
                      <path d="M4.74994 3.74999C4.74994 3.19858 5.19854 2.74999 5.74994 2.74999C6.30134 2.74999 6.74994 3.19858 6.74994 3.74999C6.74994 4.30139 6.30134 4.74999 5.74994 4.74999C5.19854 4.74999 4.74994 4.30139 4.74994 3.74999Z" fill="#6C7688"/>
                    </svg>
                    <span className="text-[12px] font-semibold text-[#596171] bg-[#EBEEF1] border border-[#D8DEE4] rounded px-1.5 py-0.5">Optional</span>
                  </div>
                  <input
                    type="text"
                    value={statementDescriptor}
                    onChange={(e) => setStatementDescriptor(e.target.value)}
                    placeholder="Add funds to Stripe"
                    className="w-full h-10 px-3 text-[14px] text-[#353a44] placeholder-[#9ca3af] border border-[#e3e8ee] rounded-lg focus:outline-none focus:border-[#635bff] focus:ring-1 focus:ring-[#635bff]"
                  />
                </div>
                
                {/* Internal Note Field */}
                <div className="mb-6 w-full">
                  <div className="flex items-center gap-2 mb-2">
                    <label className="text-[14px] font-semibold text-[#353a44]">Add an internal note</label>
                    <span className="text-[12px] font-semibold text-[#596171] bg-[#EBEEF1] border border-[#D8DEE4] rounded px-1.5 py-0.5">Optional</span>
                  </div>
                  <input
                    type="text"
                    value={internalNote}
                    onChange={(e) => setInternalNote(e.target.value)}
                    placeholder="Description"
                    className="w-full h-10 px-3 text-[14px] text-[#353a44] placeholder-[#9ca3af] border border-[#e3e8ee] rounded-lg focus:outline-none focus:border-[#635bff] focus:ring-1 focus:ring-[#635bff]"
                  />
                </div>
                
                {/* Legal Text */}
                <p className="text-[13px] text-[#596171] mb-6 w-full">
                  By clicking "Add" below, I request and authorise Stripe to debit my account as described in these <span className="text-[#635bff] cursor-pointer hover:underline">terms</span> for the amount indicated.
                </p>
                
                {/* Buttons */}
                <div className="flex items-center justify-end gap-2 w-full mt-auto">
                  <button
                    onClick={() => setStep('select')}
                    className="h-10 px-4 text-[14px] font-semibold text-[#353a44] bg-white border border-[#e3e8ee] rounded-lg hover:bg-[#f5f6f8] transition-colors shadow-[0px_1px_1px_rgba(33,37,44,0.16)]"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleAddFunds}
                    className="h-10 px-4 text-[14px] font-semibold text-white bg-[#635bff] rounded-lg hover:bg-[#5851ea] transition-colors shadow-[0px_1px_1px_rgba(47,14,99,0.32)]"
                  >
                    Add ${amount}.00
                  </button>
                </div>
              </div>
              
              {/* Right Column - Preview */}
              <div className="flex-1 pt-4 pr-4 pb-4 flex flex-col">
                <div 
                  className="flex-1 rounded-lg p-6 flex items-center justify-center"
                  style={{
                    backgroundImage: `url(${gradientBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                {/* Semi-transparent outer box */}
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-2 w-[340px]">
                  {/* Review Card */}
                  <div className="bg-white rounded-lg shadow-lg p-5 text-left">
                    <h3 className="text-[16px] font-semibold text-[#353a44] mb-4">Review</h3>
                    
                    <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-4">
                      {/* From Row */}
                      <span className="text-[14px] text-[#6c7688] self-center">From</span>
                      <div className="flex items-center gap-2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                          <rect width="24" height="24" rx="6" fill="#CD1309"/>
                          <path d="M10.9654 8.43237H14.027L13.9803 9.29715H13.9148C13.3245 9.29715 13.1935 9.51335 12.9314 10.1626L11.0958 15.6439H9.91586L8.40775 11.6774L6.96516 15.6439H5.78527L3.81856 10.2354C3.62137 9.58612 3.22894 9.29786 2.7697 9.29786H2.63867V8.43237H5.91889V9.29858H5.65683C5.2631 9.29858 5.06656 9.37064 5.13208 9.58684C5.13208 9.61086 5.1248 9.63488 5.11752 9.6589C5.10296 9.70695 5.0884 9.75499 5.13208 9.80303C5.13208 9.80303 5.91889 11.8223 6.50916 13.7695H6.57467L7.88559 10.1634C7.82008 9.58612 7.62354 9.29786 7.09878 9.29786H6.63954V8.43237H10.1143V9.29786H9.58959C9.26137 9.29786 9.13035 9.36993 9.13035 9.58612C9.13035 9.65819 9.13035 9.73097 9.19586 9.8751C9.19586 9.8751 9.98267 11.9664 10.5729 13.7695H10.6385L11.8839 10.1634C11.9494 9.8751 11.9494 9.73097 11.9494 9.58612C11.9494 9.37064 11.8177 9.29786 11.4246 9.29786H10.9654V8.43237Z" fill="white"/>
                          <path d="M20.6225 9.72883C20.819 10.1619 20.8845 10.6664 20.8845 11.2436L21.6058 11.2443V8.43237H14.9182V9.22509H15.3113C15.8354 9.22509 16.0326 9.29715 16.0326 9.87296V14.1291C16.0326 14.7056 15.8361 14.7784 15.3113 14.7784H14.9182V15.6424H18.9178V14.7784H18.1965C17.6062 14.7784 17.5407 14.7784 17.5407 14.1291V12.2532H18.0655C18.8523 12.2532 18.9833 12.5415 18.9833 13.768H19.6391V10.1626H18.9833C18.9833 11.2436 18.8523 11.4598 18.0655 11.4598H17.5407V9.29715H19.1799C19.9012 9.29715 20.3604 9.36779 20.6225 9.72883Z" fill="white"/>
                        </svg>
                        <div>
                          <div className="text-[14px] text-[#353a44]">Wells Fargo ••1234</div>
                          <div className="text-[12px] text-[#6c7688]">USD</div>
                        </div>
                      </div>
                      
                      {/* To Row */}
                      <span className="text-[14px] text-[#6c7688] self-center">To</span>
                      <div className="flex items-center gap-2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                          <rect width="24" height="24" rx="6" fill="#6772E5"/>
                          <path d="M10.9219 9.24576C10.9219 8.66197 11.4009 8.43744 12.1942 8.43744C13.3319 8.43744 14.7689 8.78172 15.9065 9.39545V5.87777C14.6641 5.3838 13.4366 5.18921 12.1942 5.18921C9.15556 5.18921 7.13477 6.7759 7.13477 9.42538C7.13477 13.5568 12.8229 12.8981 12.8229 14.6794C12.8229 15.368 12.2242 15.5925 11.3859 15.5925C10.1435 15.5925 8.5568 15.0836 7.29942 14.395V17.9576C8.69152 18.5564 10.0986 18.8108 11.3859 18.8108C14.4994 18.8108 16.64 17.269 16.64 14.5896C16.625 10.1289 10.9219 10.9223 10.9219 9.24576Z" fill="white"/>
                        </svg>
                        <div>
                          <div className="text-[14px] text-[#353a44]">Financial account</div>
                          <div className="text-[12px] text-[#6c7688]">USD</div>
                        </div>
                      </div>
                      
                      {/* Initiated Row */}
                      <span className="text-[14px] text-[#6c7688]">Initiated</span>
                      <span className="text-[14px] text-[#353a44]">September 30, 2025</span>
                      
                      {/* Estimated Arrival Row */}
                      <span className="text-[14px] text-[#6c7688]">Estimated arrival</span>
                      <span className="text-[14px] text-[#353a44]">1-5 business days</span>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Main Issuing Home View Component
const IssuingHomeView = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [compareEnabled, setCompareEnabled] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState({ id: '1', label: 'Financial account 1' });
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isAddFundsOpen, setIsAddFundsOpen] = useState(false);
  const [fundsAvailable, setFundsAvailable] = useState(100.00);
  
  const financialAccountOptions = [
    { id: '1', label: 'Financial account 1' },
    { id: '2', label: 'Financial account 2' },
  ];
  
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'cards', label: 'Cards' },
    { id: 'cardholders', label: 'Cardholders' },
    { id: 'transactions', label: 'Transactions' },
    { id: 'disputes', label: 'Disputes' },
    { id: 'transfers', label: 'Transfers' },
    { id: 'fraud', label: 'Fraud and risk' },
  ];

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-white">
      {/* Page Header - Hidden when viewing card details */}
      {!selectedCard && (
        <div className="px-8 pt-4">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-[28px] font-bold text-[#353a44]">Issuing</h1>
            
            {/* Create Button - Changes based on active tab, hidden for transactions/disputes */}
            {activeTab === 'cards' ? (
              <button 
                className="px-3 py-1.5 bg-[#635bff] hover:bg-[#5851ea] text-white font-medium text-sm rounded-md flex items-center gap-1.5 shadow-[0_1px_1px_rgba(47,14,99,0.32)]"
              >
                <svg width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="mask_create_card" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="15" height="15">
                    <path d="M8.08524 1.18032C8.08524 0.626201 7.63604 0.177002 7.08193 0.177002C6.52781 0.177002 6.07861 0.626201 6.07861 1.18032V6.07886H1.18007C0.625957 6.07886 0.176758 6.52806 0.176758 7.08217C0.176758 7.63629 0.625957 8.08549 1.18007 8.08549H6.07861V12.984C6.07861 13.5381 6.52781 13.9873 7.08193 13.9873C7.63604 13.9873 8.08524 13.5381 8.08524 12.984V8.08549H12.9838C13.5379 8.08549 13.9871 7.63629 13.9871 7.08217C13.9871 6.52806 13.5379 6.07886 12.9838 6.07886H8.08524V1.18032Z" fill="white"/>
                  </mask>
                  <g mask="url(#mask_create_card)">
                    <rect width="14.1644" height="14.1644" fill="white"/>
                  </g>
                </svg>
                Create card
              </button>
            ) : activeTab === 'cardholders' ? (
              <button 
                className="px-3 py-1.5 bg-[#635bff] hover:bg-[#5851ea] text-white font-medium text-sm rounded-md flex items-center gap-1.5 shadow-[0_1px_1px_rgba(47,14,99,0.32)]"
              >
                <svg width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="mask_create_cardholder" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="15" height="15">
                    <path d="M8.08524 1.18032C8.08524 0.626201 7.63604 0.177002 7.08193 0.177002C6.52781 0.177002 6.07861 0.626201 6.07861 1.18032V6.07886H1.18007C0.625957 6.07886 0.176758 6.52806 0.176758 7.08217C0.176758 7.63629 0.625957 8.08549 1.18007 8.08549H6.07861V12.984C6.07861 13.5381 6.52781 13.9873 7.08193 13.9873C7.63604 13.9873 8.08524 13.5381 8.08524 12.984V8.08549H12.9838C13.5379 8.08549 13.9871 7.63629 13.9871 7.08217C13.9871 6.52806 13.5379 6.07886 12.9838 6.07886H8.08524V1.18032Z" fill="white"/>
                  </mask>
                  <g mask="url(#mask_create_cardholder)">
                    <rect width="14.1644" height="14.1644" fill="white"/>
                  </g>
                </svg>
                Create cardholder
              </button>
            ) : activeTab === 'transactions' || activeTab === 'disputes' ? null : (
              <div className="relative">
                <button 
                  onClick={() => setIsCreateMenuOpen(!isCreateMenuOpen)}
                  className="px-3 py-1.5 bg-[#635bff] hover:bg-[#5851ea] text-white font-medium text-sm rounded-md flex items-center gap-1.5 shadow-[0_1px_1px_rgba(47,14,99,0.32)]"
                >
                  Create
                  <ChevronDownSmallIcon />
                </button>
                
                {/* Dropdown Menu */}
                {isCreateMenuOpen && (
                  <>
                    {/* Backdrop */}
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setIsCreateMenuOpen(false)}
                    />
                    
                    {/* Menu */}
                    <div className="absolute right-0 top-full mt-2 z-20 bg-white rounded-lg shadow-[0px_7px_14px_rgba(48,49,61,0.08),0px_3px_6px_rgba(0,0,0,0.12)] py-2 min-w-[180px]">
                      <button
                        onClick={() => {
                          setIsCreateMenuOpen(false);
                          // Handle create card action
                        }}
                        className="w-full px-4 py-2 text-left text-[14px] text-[#353a44] hover:bg-[#f5f6f8] transition-colors"
                      >
                        Create card
                      </button>
                      <button
                        onClick={() => {
                          setIsCreateMenuOpen(false);
                          // Handle create cardholder action
                        }}
                        className="w-full px-4 py-2 text-left text-[14px] text-[#353a44] hover:bg-[#f5f6f8] transition-colors"
                      >
                        Create cardholder
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
          
          {/* Tabs */}
          <div className="flex gap-6 border-b border-[#e3e8ee]">
            {tabs.map(tab => (
              <Tab 
                key={tab.id}
                label={tab.label}
                active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        {/* Cards Tab View */}
        {activeTab === 'cards' && !selectedCard && (
          <div>
            {/* Filter Bar and Actions */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2 flex-wrap">
                <FilterChip label="Cardholder" isInactive={true} />
                <FilterChip label="Balance" isInactive={true} />
                <FilterChip label="Last 4" isInactive={true} />
                <FilterChip label="Status" isInactive={true} />
                <FilterChip label="Type" isInactive={true} />
                <FilterChip label="Created" isInactive={true} />
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 h-8 px-3 text-[14px] font-semibold text-[#353a44] bg-white border border-[#d8dee4] rounded-md hover:bg-gray-50 shadow-[0px_1px_1px_rgba(33,37,44,0.16)]">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_export1" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="12" height="12">
                      <path d="M8.03859 5.79771C7.82047 6.01556 7.82047 6.36876 8.03859 6.58661C8.25671 6.80446 8.61035 6.80446 8.82847 6.58661L11.4614 3.95695C11.6795 3.7391 11.6795 3.3859 11.4614 3.16805L8.82847 0.538386C8.61035 0.320538 8.25671 0.320538 8.03859 0.538386C7.82047 0.756235 7.82047 1.10944 8.03859 1.32729L9.71348 3.00009H6C4.86091 3.00009 3.9375 3.9235 3.9375 5.06259V8.43759C3.9375 8.74825 4.18934 9.00009 4.5 9.00009C4.81066 9.00009 5.0625 8.74825 5.0625 8.43759V5.06259C5.0625 4.54482 5.48223 4.12509 6 4.12509H9.7133L8.03859 5.79771Z" fill="#474E5A"/>
                      <path d="M0.9375 8.25C1.24816 8.25 1.5 8.50184 1.5 8.8125V10.5H10.5V8.8125C10.5 8.50184 10.7518 8.25 11.0625 8.25C11.3732 8.25 11.625 8.50184 11.625 8.8125V11.0625C11.625 11.3732 11.3732 11.625 11.0625 11.625H0.9375C0.62684 11.625 0.375 11.3732 0.375 11.0625V8.8125C0.375 8.50184 0.62684 8.25 0.9375 8.25Z" fill="#474E5A"/>
                    </mask>
                    <g mask="url(#mask0_export1)">
                      <rect width="12" height="12" fill="#474E5A"/>
                    </g>
                  </svg>
                  Export
                </button>
                <button className="flex items-center gap-1.5 h-8 px-3 text-[14px] font-semibold text-[#353a44] bg-white border border-[#d8dee4] rounded-md hover:bg-gray-50 shadow-[0px_1px_1px_rgba(33,37,44,0.16)]">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.75 2.5C3.05964 2.5 2.5 3.05964 2.5 3.75V12.25C2.5 12.9404 3.05964 13.5 3.75 13.5H12.25C12.9404 13.5 13.5 12.9404 13.5 12.25V8.69444C13.5 8.28023 13.8358 7.94444 14.25 7.94444C14.6642 7.94444 15 8.28023 15 8.69444V12.25C15 13.7688 13.7688 15 12.25 15H3.75C2.23122 15 1 13.7688 1 12.25V3.75C1 2.23122 2.23122 1 3.75 1H7.30578C7.72 1 8.05578 1.33579 8.05578 1.75C8.05578 2.16421 7.72 2.5 7.30578 2.5H3.75Z" fill="#474E5A"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M13.7385 1.17809C13.0541 0.493765 11.9443 0.494807 11.2613 1.18042L5.21115 7.25332C5.11228 7.35256 5.04318 7.47751 5.01168 7.614L4.26922 10.8313C4.21107 11.0833 4.28683 11.3475 4.46968 11.5303C4.65254 11.7132 4.91669 11.7889 5.16866 11.7308L8.38599 10.9883C8.52343 10.9566 8.64913 10.8868 8.74868 10.7869L14.8015 4.7113C15.4827 4.02751 15.4816 2.92126 14.7991 2.23875L13.7385 1.17809ZM12.3239 2.23908C12.4215 2.14114 12.5801 2.14099 12.6778 2.23875L13.7385 3.29941C13.836 3.39691 13.8361 3.55494 13.7388 3.65263L12.9927 4.40153L11.5785 2.98732L12.3239 2.23908ZM10.5198 4.04997L6.42507 8.16014L6.00064 9.99936L7.83837 9.57527L11.934 5.46418L10.5198 4.04997Z" fill="#474E5A"/>
                  </svg>
                  Edit columns
                </button>
                </div>
            </div>
            
            {/* Cards Table */}
            <div>
              {/* Table Header */}
              <div className="flex items-center border-y border-[#e3e8ee] text-[12px] font-bold text-[#353A44] whitespace-nowrap">
                <div className="w-8 flex-shrink-0 flex items-center justify-center py-2">
                  <input type="checkbox" className="w-3.5 h-3.5 appearance-none rounded-[4px] border border-[#D8DEE4] bg-white checked:bg-[#635bff] checked:border-[#635bff] cursor-pointer" />
                </div>
                <div className="flex-1 min-w-[200px] py-2 pl-1">Card</div>
                <div className="w-20 flex-shrink-0 py-2"></div>
                <div className="flex-1 min-w-[120px] py-2">Cardholder</div>
                <div className="flex-1 min-w-[140px] py-2">Balance name</div>
                <div className="w-20 flex-shrink-0 py-2">Created</div>
                <div className="flex-1 min-w-[160px] py-2 text-right">Total spent this month</div>
                <div className="w-10 flex-shrink-0 py-2"></div>
              </div>
              
              {/* Table Body */}
              {[
                { id: 1, name: 'Cam Sackett', last4: '2345', status: 'Active', cardholder: 'Cam Sackett', balance: 'Financial account 1', created: 'May 13', spent: '$0.00', email: 'cam@cactuspractice.com', phone: '+1 (206) 772 7185', address: '472 Oyster Point Blvd, Cactus Practice, South Francisco, CA, EC2J 2JH, US', cardId: 'ic_1NwIp92eZvKYlo2C8kL1qZ3x' },
                { id: 2, name: 'Ad spend', last4: '1726', status: 'Active', cardholder: 'Lulu Siegel', balance: 'Financial account 1', created: 'May 13', spent: '$5,293.93', email: 'lulu@cactuspractice.com', phone: '+1 (415) 555 0123', address: '100 Market St, San Francisco, CA, 94105, US', cardId: 'ic_2NwIp92eZvKYlo2C8kL2qZ4y' },
                { id: 3, name: 'Steven Johnson', last4: '8893', status: 'Active', cardholder: 'Steven Johnson', balance: 'Financial account 2', created: 'May 13', spent: '$4,271.00', email: 'steven@cactuspractice.com', phone: '+1 (415) 555 0124', address: '200 Pine St, San Francisco, CA, 94104, US', cardId: 'ic_3NwIp92eZvKYlo2C8kL3qZ5z' },
                { id: 4, name: 'Mathilde Jeakins', last4: '5211', status: 'Active', cardholder: 'Mathilde Jeakins', balance: 'Financial account 1', created: 'May 10', spent: '$3,235.00', email: 'mathilde@cactuspractice.com', phone: '+1 (415) 555 0125', address: '300 Bush St, San Francisco, CA, 94104, US', cardId: 'ic_4NwIp92eZvKYlo2C8kL4qZ6a' },
                { id: 5, name: 'Tax', last4: '8432', status: 'Frozen', cardholder: 'Runa Cameron', balance: 'Financial account 2', created: 'May 9', spent: '$2,371.87', email: 'runa@cactuspractice.com', phone: '+1 (415) 555 0126', address: '400 Montgomery St, San Francisco, CA, 94104, US', cardId: 'ic_5NwIp92eZvKYlo2C8kL5qZ7b' },
                { id: 6, name: 'AWS', last4: '2787', status: 'Active', cardholder: 'Katie Litz', balance: 'Financial account 1', created: 'May 6', spent: '$1,098.23', email: 'katie@cactuspractice.com', phone: '+1 (415) 555 0127', address: '500 Sansome St, San Francisco, CA, 94111, US', cardId: 'ic_6NwIp92eZvKYlo2C8kL6qZ8c' },
                { id: 7, name: 'Figma', last4: '2283', status: 'Active', cardholder: 'Josiah Brown', balance: 'Financial account 2', created: 'Apr 17', spent: '$1,018.33', email: 'josiah@cactuspractice.com', phone: '+1 (415) 555 0128', address: '600 Battery St, San Francisco, CA, 94111, US', cardId: 'ic_7NwIp92eZvKYlo2C8kL7qZ9d' },
                { id: 8, name: 'Runa Cameron', last4: '0987', status: 'Inactive', cardholder: 'Runa Cameron', balance: 'Financial account 1', created: 'May 29', spent: '$998.00', email: 'runa@cactuspractice.com', phone: '+1 (415) 555 0126', address: '400 Montgomery St, San Francisco, CA, 94104, US', cardId: 'ic_8NwIp92eZvKYlo2C8kL8qZAe' },
                { id: 9, name: 'Gina Ogazi', last4: '1928', status: 'Active', cardholder: 'Gina Ogazia', balance: 'Financial account 2', created: 'May 29', spent: '$856.00', email: 'gina@cactuspractice.com', phone: '+1 (415) 555 0129', address: '700 Front St, San Francisco, CA, 94111, US', cardId: 'ic_9NwIp92eZvKYlo2C8kL9qZBf' },
                { id: 10, name: 'Laura White', last4: '2267', status: 'Cancelled', cardholder: 'Laura White', balance: 'Financial account 1', created: 'Feb 14', spent: '$0.00', email: 'laura@cactuspractice.com', phone: '+1 (415) 555 0130', address: '800 Davis St, San Francisco, CA, 94111, US', cardId: 'ic_ANwIp92eZvKYlo2C8kLAqZCg' },
                { id: 11, name: 'Hayley Hill', last4: '0019', status: 'Active', cardholder: 'Hayley Hill', balance: 'Financial account 2', created: 'Feb 10', spent: '$2,450.00', email: 'hayley@cactuspractice.com', phone: '+1 (415) 555 0131', address: '900 Washington St, San Francisco, CA, 94108, US', cardId: 'ic_BNwIp92eZvKYlo2C8kLBqZDh' },
                { id: 12, name: 'Sarah Veshuna', last4: '2677', status: 'Active', cardholder: 'Sarah Veshuna', balance: 'Financial account 1', created: 'Jan 28', spent: '$1,125.00', email: 'sarah@cactuspractice.com', phone: '+1 (415) 555 0132', address: '1000 Clay St, San Francisco, CA, 94108, US', cardId: 'ic_CNwIp92eZvKYlo2C8kLCqZEi' },
                { id: 13, name: 'Daryl Williams', last4: '5678', status: 'Expired', cardholder: 'Daryl Williams', balance: 'Financial account 2', created: 'Jan 15', spent: '$0.00', email: 'daryl@cactuspractice.com', phone: '+1 (415) 555 0133', address: '1100 Sacramento St, San Francisco, CA, 94108, US', cardId: 'ic_DNwIp92eZvKYlo2C8kLDqZFj' },
              ].map((card, i) => (
                <div 
                  key={i} 
                  className="flex items-center h-9 border-b border-[#e3e8ee] last:border-0 cursor-pointer hover:bg-[#f7f8f9] whitespace-nowrap"
                  onClick={() => setSelectedCard(card)}
                >
                  <div className="w-8 flex-shrink-0 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" className="w-3.5 h-3.5 appearance-none rounded-[4px] border border-[#D8DEE4] bg-white checked:bg-[#635bff] checked:border-[#635bff] cursor-pointer" />
                  </div>
                  <div className="flex-1 min-w-[200px] pl-1 flex items-center gap-2">
                    <svg width="24" height="18" viewBox="0 0 38 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                      <g filter="url(#filter0_ddd_cards_list)">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.77832 17.1109C7.77832 17.5388 8.13162 17.889 8.56338 17.889H29.3935C29.8253 17.889 30.1786 17.5388 30.1786 17.1109V4.66701C30.1786 4.23908 29.8253 3.88892 29.3935 3.88892H8.56338C8.13162 3.88892 7.77832 4.23908 7.77832 4.66701V17.1109Z" fill="url(#paint0_linear_cards_list)"/>
                      </g>
                      <rect x="10.3047" y="8.51636" width="2.98339" height="2.26789" rx="0.350004" fill="url(#paint1_linear_cards_list)"/>
                      <defs>
                        <filter id="filter0_ddd_cards_list" x="0.000448704" y="-1.97887e-05" width="37.9561" height="29.5557" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                          <feOffset dy="0.388894"/>
                          <feGaussianBlur stdDeviation="0.58334"/>
                          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/>
                          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                          <feOffset dy="1.16668"/>
                          <feGaussianBlur stdDeviation="1.36113"/>
                          <feColorMatrix type="matrix" values="0 0 0 0 0.188235 0 0 0 0 0.192157 0 0 0 0 0.239216 0 0 0 0.08 0"/>
                          <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow"/>
                          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                          <feOffset dy="3.88894"/>
                          <feGaussianBlur stdDeviation="3.88894"/>
                          <feColorMatrix type="matrix" values="0 0 0 0 0.188235 0 0 0 0 0.192157 0 0 0 0 0.239216 0 0 0 0.08 0"/>
                          <feBlend mode="normal" in2="effect2_dropShadow" result="effect3_dropShadow"/>
                          <feBlend mode="normal" in="SourceGraphic" in2="effect3_dropShadow" result="shape"/>
                        </filter>
                        <linearGradient id="paint0_linear_cards_list" x1="18.9785" y1="3.88892" x2="18.9785" y2="17.889" gradientUnits="userSpaceOnUse">
                          <stop stopColor="white"/>
                          <stop offset="1" stopColor="#F5F6F8"/>
                        </linearGradient>
                        <linearGradient id="paint1_linear_cards_list" x1="11.7964" y1="8.51636" x2="11.7964" y2="10.7842" gradientUnits="userSpaceOnUse">
                          <stop stopColor="white"/>
                          <stop offset="1" stopColor="#E2E2E2"/>
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="text-[14px] font-medium text-[#353a44]">••••{card.last4}</span>
                  </div>
                  <div className="w-20 flex-shrink-0">
                    <span className={`inline-flex items-center h-[18px] px-1.5 rounded text-[11px] font-semibold leading-4 ${
                      card.status === 'Active' ? 'bg-[#D1FAB3] text-[#217005] border border-[#A8F170]' :
                      card.status === 'Frozen' ? 'bg-[#EBEEF1] text-[#596171] border border-[#D8DEE4]' :
                      card.status === 'Inactive' ? 'bg-[#EBEEF1] text-[#596171] border border-[#D8DEE4]' :
                      card.status === 'Cancelled' ? 'bg-[#FDE9EE] text-[#C0123C] border border-[#FBD3DC]' :
                      card.status === 'Expired' ? 'bg-[#FCEEB5] text-[#B13600] border border-[#FBD992]' :
                      'bg-[#EBEEF1] text-[#596171] border border-[#D8DEE4]'
                    }`}>
                      {card.status}
                    </span>
                  </div>
                  <div className="flex-1 min-w-[120px] text-[14px] text-[#596171]">{card.cardholder}</div>
                  <div className="flex-1 min-w-[140px] text-[14px] text-[#596171]">{card.balance}</div>
                  <div className="w-20 flex-shrink-0 text-[14px] text-[#596171]">{card.created}</div>
                  <div className="flex-1 min-w-[160px] text-[14px] text-[#596171] text-right">{card.spent}</div>
                  <div className="w-10 flex-shrink-0 flex items-center justify-end pr-4" onClick={(e) => e.stopPropagation()}>
                    <button className="text-[#6c7688] hover:text-[#353a44]">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 7.5C2.32843 7.5 3 6.82843 3 6C3 5.17157 2.32843 4.5 1.5 4.5C0.671573 4.5 0 5.17157 0 6C0 6.82843 0.671573 7.5 1.5 7.5Z" fill="#6C7688"/>
                        <path d="M6 7.5C6.82843 7.5 7.5 6.82843 7.5 6C7.5 5.17157 6.82843 4.5 6 4.5C5.17157 4.5 4.5 5.17157 4.5 6C4.5 6.82843 5.17157 7.5 6 7.5Z" fill="#6C7688"/>
                        <path d="M12 6C12 6.82843 11.3284 7.5 10.5 7.5C9.67157 7.5 9 6.82843 9 6C9 5.17157 9.67157 4.5 10.5 4.5C11.3284 4.5 12 5.17157 12 6Z" fill="#6C7688"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Card Detail View */}
        {activeTab === 'cards' && selectedCard && (
          <div>
            {/* Breadcrumb */}
            <div className="mb-2">
              <button 
                onClick={() => setSelectedCard(null)} 
                className="text-[14px] text-[#635bff] hover:text-[#5851db] flex items-center gap-1"
              >
                Cards
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-[24px] font-semibold text-[#353a44]">{selectedCard.cardholder} ••••{selectedCard.last4}</h1>
                  <span className={`inline-flex items-center h-[20px] px-2 rounded text-[12px] font-semibold leading-4 ${
                    selectedCard.status === 'Active' ? 'bg-[#D1FAB3] text-[#217005] border border-[#A8F170]' :
                    selectedCard.status === 'Frozen' ? 'bg-[#EBEEF1] text-[#596171] border border-[#D8DEE4]' :
                    selectedCard.status === 'Inactive' ? 'bg-[#EBEEF1] text-[#596171] border border-[#D8DEE4]' :
                    selectedCard.status === 'Cancelled' ? 'bg-[#FDE9EE] text-[#C0123C] border border-[#FBD3DC]' :
                    selectedCard.status === 'Expired' ? 'bg-[#FCEEB5] text-[#B13600] border border-[#FBD992]' :
                    'bg-[#EBEEF1] text-[#596171] border border-[#D8DEE4]'
                  }`}>
                    {selectedCard.status}
                  </span>
                </div>
                <p className="text-[14px] text-[#596171]">{selectedCard.spent} total spent this month</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 h-8 px-3 text-[14px] font-semibold text-[#353a44] bg-white border border-[#d8dee4] rounded-md hover:bg-gray-50 shadow-[0px_1px_1px_rgba(33,37,44,0.16)]">
                  Freeze
                </button>
                <button className="flex items-center justify-center h-7 w-7 text-[#6c7688] bg-white border border-[#d8dee4] rounded-md hover:bg-gray-50 shadow-[0px_1px_1px_rgba(33,37,44,0.16)]">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 7.5C2.32843 7.5 3 6.82843 3 6C3 5.17157 2.32843 4.5 1.5 4.5C0.671573 4.5 0 5.17157 0 6C0 6.82843 0.671573 7.5 1.5 7.5Z" fill="currentColor"/>
                    <path d="M6 7.5C6.82843 7.5 7.5 6.82843 7.5 6C7.5 5.17157 6.82843 4.5 6 4.5C5.17157 4.5 4.5 5.17157 4.5 6C4.5 6.82843 5.17157 7.5 6 7.5Z" fill="currentColor"/>
                    <path d="M12 6C12 6.82843 11.3284 7.5 10.5 7.5C9.67157 7.5 9 6.82843 9 6C9 5.17157 9.67157 4.5 10.5 4.5C11.3284 4.5 12 5.17157 12 6Z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="flex gap-8">
              {/* Left Column */}
              <div className="flex-1">
                {/* Card Preview and Digital Wallet */}
                <div className="flex gap-6 mb-8">
                  {/* Card Preview */}
                  <img 
                    src={new URL('../../assets/metal-card.png', import.meta.url).href}
                    alt="Card preview"
                    className="w-[280px] h-auto"
                  />
                  
                  {/* Digital Wallet */}
                  <div className="flex-1">
                    <h3 className="text-[14px] font-semibold text-[#353a44] mb-1">Add to your digital wallet</h3>
                    <p className="text-[13px] text-[#596171] mb-3">Add card to your digital wallet to start using immediately.</p>
                    <div className="flex flex-col gap-2">
                      <button className="h-10 px-4 bg-black text-white rounded-md flex items-center justify-center gap-2 text-[13px] font-medium">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 1L10.5 6H5.5L8 1Z" fill="white"/>
                          <path d="M5.5 6H10.5L12 11H4L5.5 6Z" fill="#4285F4"/>
                          <path d="M4 11L5.5 6L2 8L4 11Z" fill="#EA4335"/>
                          <path d="M12 11L10.5 6L14 8L12 11Z" fill="#34A853"/>
                          <path d="M4 11H12L10 15H6L4 11Z" fill="#FBBC05"/>
                        </svg>
                        Add to Google Wallet
                      </button>
                      <button className="h-10 px-4 bg-black text-white rounded-md flex items-center justify-center gap-2 text-[13px] font-medium">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.5 2.5C11.5 1.5 10 1 8 1C6 1 4.5 1.5 3.5 2.5C2.5 3.5 2 5 2 7C2 9 2.5 10.5 3.5 11.5L8 16L12.5 11.5C13.5 10.5 14 9 14 7C14 5 13.5 3.5 12.5 2.5Z" fill="white"/>
                        </svg>
                        Add to Apple Wallet
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Timeline */}
                <div className="mb-8">
                  <h3 className="text-[16px] font-semibold text-[#353a44] mb-4">Timeline</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#d8dee4] mt-1.5"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[14px] font-medium text-[#353a44]">Card activated</span>
                          <span className="text-[13px] text-[#596171]">Sep 1, 1:26 PM</span>
                        </div>
                        <p className="text-[13px] text-[#596171]">The card was activated for the first time</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#d8dee4] mt-1.5"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[14px] font-medium text-[#353a44]">Card created</span>
                          <span className="text-[13px] text-[#596171]">Sep 1, 10:07 AM</span>
                        </div>
                        <p className="text-[13px] text-[#596171]">The card was created by {selectedCard.cardholder}.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Transactions */}
                <div>
                  <h3 className="text-[16px] font-semibold text-[#353a44] mb-4">Transactions</h3>
                  <div className="border-2 border-dashed border-[#d8dee4] rounded-lg p-8 flex items-center justify-center">
                    <span className="text-[14px] text-[#596171]">No transactions yet</span>
                  </div>
                </div>
              </div>
              
              {/* Right Column */}
              <div className="w-[280px] space-y-6">
                {/* Spend Controls */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-[14px] font-semibold text-[#353a44]">Spend controls</h3>
                    <button className="text-[#6c7688] hover:text-[#353a44]">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5 1.5L12.5 3.5L4.5 11.5H2.5V9.5L10.5 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                  <p className="text-[13px] text-[#596171] mb-4">Manage spending limits and card restrictions.</p>
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10">
                      <svg className="w-10 h-10 transform -rotate-90">
                        <circle cx="20" cy="20" r="16" fill="none" stroke="#e3e8ee" strokeWidth="3"/>
                        <circle cx="20" cy="20" r="16" fill="none" stroke="#635bff" strokeWidth="3" strokeDasharray="100" strokeDashoffset="100"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-[#353a44]">$0.00</p>
                      <p className="text-[13px] text-[#596171]">$1,000.00 monthly limit</p>
                    </div>
                  </div>
                </div>
                
                {/* Notification Preferences */}
                <div>
                  <h3 className="text-[14px] font-semibold text-[#353a44] mb-1">Notification preferences</h3>
                  <p className="text-[13px] text-[#596171] mb-3">Used for two-step authentication and alerts about suspicious transactions.</p>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-3.5 h-3.5 appearance-none rounded-[4px] border border-[#D8DEE4] bg-white checked:bg-[#635bff] checked:border-[#635bff] cursor-pointer" />
                      <span className="text-[13px] text-[#353a44]">Email</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-3.5 h-3.5 appearance-none rounded-[4px] border border-[#D8DEE4] bg-white checked:bg-[#635bff] checked:border-[#635bff] cursor-pointer" />
                      <span className="text-[13px] text-[#353a44]">SMS</span>
                    </label>
                  </div>
                </div>
                
                {/* Details */}
                <div>
                  <h3 className="text-[14px] font-semibold text-[#353a44] mb-3">Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-[13px] font-semibold text-[#596171] mb-0.5">Cardholder</p>
                      <p className="text-[14px] text-[#635bff]">{selectedCard.cardholder}</p>
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-[#596171] mb-0.5">Email</p>
                      <p className="text-[14px] text-[#353a44]">{selectedCard.email}</p>
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-[#596171] mb-0.5">Phone number</p>
                      <p className="text-[14px] text-[#353a44]">{selectedCard.phone}</p>
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-[#596171] mb-0.5">Brand</p>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-4 bg-[#1a1f71] rounded-sm flex items-center justify-center">
                          <span className="text-[8px] text-white font-bold">VISA</span>
                        </div>
                        <span className="text-[14px] text-[#353a44]">Visa</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-[#596171] mb-0.5">Billing address</p>
                      <p className="text-[14px] text-[#353a44]">{selectedCard.address}</p>
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-[#596171] mb-0.5">Card ID</p>
                      <p className="text-[14px] text-[#353a44] font-mono">{selectedCard.cardId}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Cardholders Tab View */}
        {activeTab === 'cardholders' && (
          <div>
            {/* Status Tabs */}
            <div className="flex gap-2 mb-4">
              {['All', 'Active', 'Inactive'].map((status, i) => (
                <button
                  key={i}
                  className={`flex-1 py-2 px-4 text-[14px] rounded-lg transition-colors text-left ${
                    i === 0 
                      ? 'bg-white border-2 border-[#635bff] text-[#635bff] font-medium' 
                      : 'bg-white border border-[#e3e8ee] text-[#596171] font-normal hover:border-[#d8dee4]'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
            
            {/* Filter Bar and Actions */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 flex-wrap">
                <FilterChip label="Created" isInactive={true} />
                <FilterChip label="Name" isInactive={true} />
                <FilterChip label="Type" isInactive={true} />
                <FilterChip label="Cardholder ID" isInactive={true} />
                <FilterChip label="Last 4" isInactive={true} />
                <FilterChip label="More filters" isInactive={true} />
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 h-8 px-3 text-[14px] font-semibold text-[#353a44] bg-white border border-[#d8dee4] rounded-md hover:bg-gray-50 shadow-[0px_1px_1px_rgba(33,37,44,0.16)]">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_export2" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="12" height="12">
                      <path d="M8.03859 5.79771C7.82047 6.01556 7.82047 6.36876 8.03859 6.58661C8.25671 6.80446 8.61035 6.80446 8.82847 6.58661L11.4614 3.95695C11.6795 3.7391 11.6795 3.3859 11.4614 3.16805L8.82847 0.538386C8.61035 0.320538 8.25671 0.320538 8.03859 0.538386C7.82047 0.756235 7.82047 1.10944 8.03859 1.32729L9.71348 3.00009H6C4.86091 3.00009 3.9375 3.9235 3.9375 5.06259V8.43759C3.9375 8.74825 4.18934 9.00009 4.5 9.00009C4.81066 9.00009 5.0625 8.74825 5.0625 8.43759V5.06259C5.0625 4.54482 5.48223 4.12509 6 4.12509H9.7133L8.03859 5.79771Z" fill="#474E5A"/>
                      <path d="M0.9375 8.25C1.24816 8.25 1.5 8.50184 1.5 8.8125V10.5H10.5V8.8125C10.5 8.50184 10.7518 8.25 11.0625 8.25C11.3732 8.25 11.625 8.50184 11.625 8.8125V11.0625C11.625 11.3732 11.3732 11.625 11.0625 11.625H0.9375C0.62684 11.625 0.375 11.3732 0.375 11.0625V8.8125C0.375 8.50184 0.62684 8.25 0.9375 8.25Z" fill="#474E5A"/>
                    </mask>
                    <g mask="url(#mask0_export2)">
                      <rect width="12" height="12" fill="#474E5A"/>
                    </g>
                  </svg>
                  Export
                </button>
                <button className="flex items-center gap-1.5 h-8 px-3 text-[14px] font-semibold text-[#353a44] bg-white border border-[#d8dee4] rounded-md hover:bg-gray-50 shadow-[0px_1px_1px_rgba(33,37,44,0.16)]">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.75 2.5C3.05964 2.5 2.5 3.05964 2.5 3.75V12.25C2.5 12.9404 3.05964 13.5 3.75 13.5H12.25C12.9404 13.5 13.5 12.9404 13.5 12.25V8.69444C13.5 8.28023 13.8358 7.94444 14.25 7.94444C14.6642 7.94444 15 8.28023 15 8.69444V12.25C15 13.7688 13.7688 15 12.25 15H3.75C2.23122 15 1 13.7688 1 12.25V3.75C1 2.23122 2.23122 1 3.75 1H7.30578C7.72 1 8.05578 1.33579 8.05578 1.75C8.05578 2.16421 7.72 2.5 7.30578 2.5H3.75Z" fill="#474E5A"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M13.7385 1.17809C13.0541 0.493765 11.9443 0.494807 11.2613 1.18042L5.21115 7.25332C5.11228 7.35256 5.04318 7.47751 5.01168 7.614L4.26922 10.8313C4.21107 11.0833 4.28683 11.3475 4.46968 11.5303C4.65254 11.7132 4.91669 11.7889 5.16866 11.7308L8.38599 10.9883C8.52343 10.9566 8.64913 10.8868 8.74868 10.7869L14.8015 4.7113C15.4827 4.02751 15.4816 2.92126 14.7991 2.23875L13.7385 1.17809ZM12.3239 2.23908C12.4215 2.14114 12.5801 2.14099 12.6778 2.23875L13.7385 3.29941C13.836 3.39691 13.8361 3.55494 13.7388 3.65263L12.9927 4.40153L11.5785 2.98732L12.3239 2.23908ZM10.5198 4.04997L6.42507 8.16014L6.00064 9.99936L7.83837 9.57527L11.934 5.46418L10.5198 4.04997Z" fill="#474E5A"/>
                  </svg>
                  Edit columns
                </button>
              </div>
            </div>
            
            {/* Cardholders Table */}
            <div>
              {/* Table Header */}
              <div className="flex items-center border-y border-[#e3e8ee] text-[12px] font-bold text-[#353A44]">
                <div className="w-8 flex items-center justify-center py-2">
                  <input type="checkbox" className="w-3.5 h-3.5 appearance-none rounded-[4px] border border-[#D8DEE4] bg-white checked:bg-[#635bff] checked:border-[#635bff] cursor-pointer" />
                </div>
                <div className="flex-1 py-2 pl-1">Cardholder</div>
                <div className="w-32 py-2">Card</div>
                <div className="w-44 py-2">Total spent this month</div>
                <div className="flex-1 py-2">Balance name</div>
                <div className="w-28 py-2">Expiration</div>
                <div className="w-24 py-2">Created</div>
                <div className="w-10 flex-shrink-0 py-2"></div>
              </div>
              
              {/* Table Body */}
              {[
                { name: 'Cam Sackett', last4: '2345', spent: '$0.00', balance: 'Financial account 1', expiration: 'Sep 2028', created: 'May 13' },
                { name: 'Lulu Siegel', last4: '1726', spent: '$5,293.93', balance: 'Financial account 1', expiration: 'Dec 2027', created: 'May 13' },
                { name: 'Steven Johnson', last4: '8893', spent: '$4,271.00', balance: 'Financial account 2', expiration: 'Mar 2028', created: 'May 13' },
                { name: 'Mathilde Jeakins', last4: '5211', spent: '$3,235.00', balance: 'Financial account 1', expiration: 'Jun 2028', created: 'May 10' },
                { name: 'Runa Cameron', last4: '8432', spent: '$2,371.87', balance: 'Financial account 2', expiration: 'Aug 2027', created: 'May 9' },
                { name: 'Katie Litz', last4: '2787', spent: '$1,098.23', balance: 'Financial account 1', expiration: 'Nov 2028', created: 'May 6' },
                { name: 'Josiah Brown', last4: '2283', spent: '$1,018.33', balance: 'Financial account 2', expiration: 'Apr 2028', created: 'Apr 17' },
                { name: 'Gina Ogazia', last4: '1928', spent: '$856.00', balance: 'Financial account 1', expiration: 'Oct 2027', created: 'May 29' },
                { name: 'Laura White', last4: '2267', spent: '$0.00', balance: 'Financial account 1', expiration: 'Feb 2026', created: 'Feb 14' },
                { name: 'Hayley Hill', last4: '0019', spent: '$2,450.00', balance: 'Financial account 2', expiration: 'Jan 2029', created: 'Feb 10' },
              ].map((cardholder, i) => (
                <div key={i} className="flex items-center h-9 border-b border-[#e3e8ee]">
                  <div className="w-8 flex items-center justify-center">
                    <input type="checkbox" className="w-3.5 h-3.5 appearance-none rounded-[4px] border border-[#D8DEE4] bg-white checked:bg-[#635bff] checked:border-[#635bff] cursor-pointer" />
                  </div>
                  <div className="flex-1 pl-1">
                    <span className="text-[14px] font-medium text-[#353a44]">{cardholder.name}</span>
                  </div>
                  <div className="w-32 flex items-center gap-1.5">
                    <svg width="24" height="18" viewBox="0 0 38 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g filter="url(#filter0_ddd_cardholders)">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.77832 17.1109C7.77832 17.5388 8.13162 17.889 8.56338 17.889H29.3935C29.8253 17.889 30.1786 17.5388 30.1786 17.1109V4.66701C30.1786 4.23908 29.8253 3.88892 29.3935 3.88892H8.56338C8.13162 3.88892 7.77832 4.23908 7.77832 4.66701V17.1109Z" fill="url(#paint0_linear_cardholders)"/>
                      </g>
                      <rect x="10.3047" y="8.51636" width="2.98339" height="2.26789" rx="0.350004" fill="url(#paint1_linear_cardholders)"/>
                      <defs>
                        <filter id="filter0_ddd_cardholders" x="0.000448704" y="-1.97887e-05" width="37.9561" height="29.5557" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                          <feOffset dy="0.388894"/>
                          <feGaussianBlur stdDeviation="0.58334"/>
                          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/>
                          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                          <feOffset dy="1.16668"/>
                          <feGaussianBlur stdDeviation="1.36113"/>
                          <feColorMatrix type="matrix" values="0 0 0 0 0.188235 0 0 0 0 0.192157 0 0 0 0 0.239216 0 0 0 0.08 0"/>
                          <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow"/>
                          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                          <feOffset dy="3.88894"/>
                          <feGaussianBlur stdDeviation="3.88894"/>
                          <feColorMatrix type="matrix" values="0 0 0 0 0.188235 0 0 0 0 0.192157 0 0 0 0 0.239216 0 0 0 0.08 0"/>
                          <feBlend mode="normal" in2="effect2_dropShadow" result="effect3_dropShadow"/>
                          <feBlend mode="normal" in="SourceGraphic" in2="effect3_dropShadow" result="shape"/>
                        </filter>
                        <linearGradient id="paint0_linear_cardholders" x1="18.9785" y1="3.88892" x2="18.9785" y2="17.889" gradientUnits="userSpaceOnUse">
                          <stop stopColor="white"/>
                          <stop offset="1" stopColor="#F5F6F8"/>
                        </linearGradient>
                        <linearGradient id="paint1_linear_cardholders" x1="11.7964" y1="8.51636" x2="11.7964" y2="10.7842" gradientUnits="userSpaceOnUse">
                          <stop stopColor="white"/>
                          <stop offset="1" stopColor="#E2E2E2"/>
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="text-[14px] text-[#353a44]">••••{cardholder.last4}</span>
                  </div>
                  <div className="w-44 text-[14px] font-semibold text-[#353a44]">{cardholder.spent}</div>
                  <div className="flex-1 text-[14px] text-[#353a44]">{cardholder.balance}</div>
                  <div className="w-28 text-[14px] text-[#353a44]">{cardholder.expiration}</div>
                  <div className="w-24 text-[14px] text-[#353a44]">{cardholder.created}</div>
                  <div className="w-10 flex-shrink-0 flex items-center justify-end pr-4">
                    <button className="text-[#6c7688] hover:text-[#353a44]">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 7.5C2.32843 7.5 3 6.82843 3 6C3 5.17157 2.32843 4.5 1.5 4.5C0.671573 4.5 0 5.17157 0 6C0 6.82843 0.671573 7.5 1.5 7.5Z" fill="#6C7688"/>
                        <path d="M6 7.5C6.82843 7.5 7.5 6.82843 7.5 6C7.5 5.17157 6.82843 4.5 6 4.5C5.17157 4.5 4.5 5.17157 4.5 6C4.5 6.82843 5.17157 7.5 6 7.5Z" fill="#6C7688"/>
                        <path d="M12 6C12 6.82843 11.3284 7.5 10.5 7.5C9.67157 7.5 9 6.82843 9 6C9 5.17157 9.67157 4.5 10.5 4.5C11.3284 4.5 12 5.17157 12 6Z" fill="#6C7688"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Transactions Tab View */}
        {activeTab === 'transactions' && (
          <div>
            {/* Type Tabs */}
            <div className="flex gap-2 mb-4">
              {['Authorizations', 'Transactions'].map((type, i) => (
                <button
                  key={i}
                  className={`flex-1 py-2 px-4 text-[14px] rounded-lg transition-colors text-left ${
                    i === 1 
                      ? 'bg-white border-2 border-[#635bff] text-[#635bff] font-medium' 
                      : 'bg-white border border-[#e3e8ee] text-[#596171] font-normal hover:border-[#d8dee4]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            
            {/* Filter Bar and Actions */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2 flex-wrap">
                <FilterChip label="Date" isInactive={true} />
                <FilterChip label="Card ID" isInactive={true} />
                <FilterChip label="Cardholder ID" isInactive={true} />
                <FilterChip label="Dispute ID" isInactive={true} />
                <FilterChip label="Type" isInactive={true} />
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 h-8 px-3 text-[14px] font-semibold text-[#353a44] bg-white border border-[#d8dee4] rounded-md hover:bg-gray-50 shadow-[0px_1px_1px_rgba(33,37,44,0.16)]">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_export_transactions" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="12" height="12">
                      <path d="M8.03859 5.79771C7.82047 6.01556 7.82047 6.36876 8.03859 6.58661C8.25671 6.80446 8.61035 6.80446 8.82847 6.58661L11.4614 3.95695C11.6795 3.7391 11.6795 3.3859 11.4614 3.16805L8.82847 0.538386C8.61035 0.320538 8.25671 0.320538 8.03859 0.538386C7.82047 0.756235 7.82047 1.10944 8.03859 1.32729L9.71348 3.00009H6C4.86091 3.00009 3.9375 3.9235 3.9375 5.06259V8.43759C3.9375 8.74825 4.18934 9.00009 4.5 9.00009C4.81066 9.00009 5.0625 8.74825 5.0625 8.43759V5.06259C5.0625 4.54482 5.48223 4.12509 6 4.12509H9.7133L8.03859 5.79771Z" fill="#474E5A"/>
                      <path d="M0.9375 8.25C1.24816 8.25 1.5 8.50184 1.5 8.8125V10.5H10.5V8.8125C10.5 8.50184 10.7518 8.25 11.0625 8.25C11.3732 8.25 11.625 8.50184 11.625 8.8125V11.0625C11.625 11.3732 11.3732 11.625 11.0625 11.625H0.9375C0.62684 11.625 0.375 11.3732 0.375 11.0625V8.8125C0.375 8.50184 0.62684 8.25 0.9375 8.25Z" fill="#474E5A"/>
                    </mask>
                    <g mask="url(#mask0_export_transactions)">
                      <rect width="12" height="12" fill="#474E5A"/>
                    </g>
                  </svg>
                  Export
                </button>
                <button className="flex items-center gap-1.5 h-8 px-3 text-[14px] font-semibold text-[#353a44] bg-white border border-[#d8dee4] rounded-md hover:bg-gray-50 shadow-[0px_1px_1px_rgba(33,37,44,0.16)]">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.75 2.5C3.05964 2.5 2.5 3.05964 2.5 3.75V12.25C2.5 12.9404 3.05964 13.5 3.75 13.5H12.25C12.9404 13.5 13.5 12.9404 13.5 12.25V8.69444C13.5 8.28023 13.8358 7.94444 14.25 7.94444C14.6642 7.94444 15 8.28023 15 8.69444V12.25C15 13.7688 13.7688 15 12.25 15H3.75C2.23122 15 1 13.7688 1 12.25V3.75C1 2.23122 2.23122 1 3.75 1H7.30578C7.72 1 8.05578 1.33579 8.05578 1.75C8.05578 2.16421 7.72 2.5 7.30578 2.5H3.75Z" fill="#474E5A"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M13.7385 1.17809C13.0541 0.493765 11.9443 0.494807 11.2613 1.18042L5.21115 7.25332C5.11228 7.35256 5.04318 7.47751 5.01168 7.614L4.26922 10.8313C4.21107 11.0833 4.28683 11.3475 4.46968 11.5303C4.65254 11.7132 4.91669 11.7889 5.16866 11.7308L8.38599 10.9883C8.52343 10.9566 8.64913 10.8868 8.74868 10.7869L14.8015 4.7113C15.4827 4.02751 15.4816 2.92126 14.7991 2.23875L13.7385 1.17809ZM12.3239 2.23908C12.4215 2.14114 12.5801 2.14099 12.6778 2.23875L13.7385 3.29941C13.836 3.39691 13.8361 3.55494 13.7388 3.65263L12.9927 4.40153L11.5785 2.98732L12.3239 2.23908ZM10.5198 4.04997L6.42507 8.16014L6.00064 9.99936L7.83837 9.57527L11.934 5.46418L10.5198 4.04997Z" fill="#474E5A"/>
                  </svg>
                  Edit columns
                </button>
              </div>
            </div>
            
            {/* Transactions Table */}
            <div>
              {/* Table Header */}
              <div className="flex items-center border-y border-[#e3e8ee] text-[12px] font-bold text-[#353A44]">
                <div className="w-24 py-2 pl-4">Amount</div>
                <div className="w-16 py-2"></div>
                <div className="w-20 py-2"></div>
                <div className="w-32 py-2">Description</div>
                <div className="flex-1 py-2">Card</div>
                <div className="w-24 py-2">Date</div>
                <div className="w-10 flex-shrink-0 py-2"></div>
              </div>
              
              {/* Table Body */}
              {[
                { amount: '$10.00', currency: 'USD', status: 'Posted', description: 'Rocket Rides', cardName: 'Jenny Rosen', last4: '0005', date: 'Jan 14' },
                { amount: '$25.50', currency: 'USD', status: 'Posted', description: 'Coffee Shop', cardName: 'Cam Sackett', last4: '2345', date: 'Jan 13' },
                { amount: '$142.00', currency: 'USD', status: 'Pending', description: 'Office Supplies', cardName: 'Lulu Siegel', last4: '1726', date: 'Jan 12' },
                { amount: '$89.99', currency: 'USD', status: 'Posted', description: 'Software Sub', cardName: 'Steven Johnson', last4: '8893', date: 'Jan 11' },
                { amount: '$1,250.00', currency: 'USD', status: 'Posted', description: 'Cloud Services', cardName: 'Katie Litz', last4: '2787', date: 'Jan 10' },
                { amount: '$45.00', currency: 'USD', status: 'Declined', description: 'Restaurant', cardName: 'Mathilde Jeakins', last4: '5211', date: 'Jan 9' },
                { amount: '$320.00', currency: 'USD', status: 'Posted', description: 'Travel Booking', cardName: 'Runa Cameron', last4: '8432', date: 'Jan 8' },
              ].map((transaction, i) => (
                <div key={i} className="flex items-center h-9 border-b border-[#e3e8ee]">
                  <div className="w-24 pl-4">
                    <span className="text-[14px] font-medium text-[#353a44]">{transaction.amount}</span>
                  </div>
                  <div className="w-16">
                    <span className="inline-flex items-center h-[18px] px-1.5 rounded text-[11px] font-semibold leading-4 bg-[#EBEEF1] text-[#596171] border border-[#D8DEE4]">
                      {transaction.currency}
                    </span>
                  </div>
                  <div className="w-20">
                    <span className={`inline-flex items-center h-[18px] px-1.5 rounded text-[11px] font-semibold leading-4 ${
                      transaction.status === 'Posted' ? 'bg-[#D1FAB3] text-[#217005] border border-[#A8F170]' :
                      transaction.status === 'Pending' ? 'bg-[#FCEEB5] text-[#B13600] border border-[#FBD992]' :
                      transaction.status === 'Declined' ? 'bg-[#FDE9EE] text-[#C0123C] border border-[#FBD3DC]' :
                      'bg-[#EBEEF1] text-[#596171] border border-[#D8DEE4]'
                    }`}>
                      {transaction.status}
                    </span>
                  </div>
                  <div className="w-32 text-[14px] text-[#353a44]">{transaction.description}</div>
                  <div className="flex-1 text-[14px] text-[#353a44]">••••{transaction.last4}</div>
                  <div className="w-24 text-[14px] text-[#353a44]">{transaction.date}</div>
                  <div className="w-10 flex-shrink-0 flex items-center justify-end pr-4">
                    <button className="text-[#6c7688] hover:text-[#353a44]">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 7.5C2.32843 7.5 3 6.82843 3 6C3 5.17157 2.32843 4.5 1.5 4.5C0.671573 4.5 0 5.17157 0 6C0 6.82843 0.671573 7.5 1.5 7.5Z" fill="#6C7688"/>
                        <path d="M6 7.5C6.82843 7.5 7.5 6.82843 7.5 6C7.5 5.17157 6.82843 4.5 6 4.5C5.17157 4.5 4.5 5.17157 4.5 6C4.5 6.82843 5.17157 7.5 6 7.5Z" fill="#6C7688"/>
                        <path d="M12 6C12 6.82843 11.3284 7.5 10.5 7.5C9.67157 7.5 9 6.82843 9 6C9 5.17157 9.67157 4.5 10.5 4.5C11.3284 4.5 12 5.17157 12 6Z" fill="#6C7688"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Disputes Tab View */}
        {activeTab === 'disputes' && (
          <div>
            {/* Status Tabs */}
            <div className="flex gap-2 mb-4">
              {['All', 'Unsubmitted', 'Submitted', 'Expired', 'Won', 'Lost'].map((status, i) => (
                <button
                  key={i}
                  className={`flex-1 py-2 px-4 text-[14px] rounded-lg transition-colors text-left ${
                    i === 0 
                      ? 'bg-white border-2 border-[#635bff] text-[#635bff] font-medium' 
                      : 'bg-white border border-[#e3e8ee] text-[#596171] font-normal hover:border-[#d8dee4]'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
            
            {/* Filter Bar and Actions */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2 flex-wrap">
                <FilterChip label="Date" isInactive={true} />
                <FilterChip label="Card" isInactive={true} />
                <FilterChip label="Cardholder" isInactive={true} />
                <FilterChip label="Transaction ID" isInactive={true} />
                <FilterChip label="Status" isInactive={true} />
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 h-8 px-3 text-[14px] font-semibold text-[#353a44] bg-white border border-[#d8dee4] rounded-md hover:bg-gray-50 shadow-[0px_1px_1px_rgba(33,37,44,0.16)]">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_export_disputes" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="12" height="12">
                      <path d="M8.03859 5.79771C7.82047 6.01556 7.82047 6.36876 8.03859 6.58661C8.25671 6.80446 8.61035 6.80446 8.82847 6.58661L11.4614 3.95695C11.6795 3.7391 11.6795 3.3859 11.4614 3.16805L8.82847 0.538386C8.61035 0.320538 8.25671 0.320538 8.03859 0.538386C7.82047 0.756235 7.82047 1.10944 8.03859 1.32729L9.71348 3.00009H6C4.86091 3.00009 3.9375 3.9235 3.9375 5.06259V8.43759C3.9375 8.74825 4.18934 9.00009 4.5 9.00009C4.81066 9.00009 5.0625 8.74825 5.0625 8.43759V5.06259C5.0625 4.54482 5.48223 4.12509 6 4.12509H9.7133L8.03859 5.79771Z" fill="#474E5A"/>
                      <path d="M0.9375 8.25C1.24816 8.25 1.5 8.50184 1.5 8.8125V10.5H10.5V8.8125C10.5 8.50184 10.7518 8.25 11.0625 8.25C11.3732 8.25 11.625 8.50184 11.625 8.8125V11.0625C11.625 11.3732 11.3732 11.625 11.0625 11.625H0.9375C0.62684 11.625 0.375 11.3732 0.375 11.0625V8.8125C0.375 8.50184 0.62684 8.25 0.9375 8.25Z" fill="#474E5A"/>
                    </mask>
                    <g mask="url(#mask0_export_disputes)">
                      <rect width="12" height="12" fill="#474E5A"/>
                    </g>
                  </svg>
                  Export
                </button>
                <button className="flex items-center gap-1.5 h-8 px-3 text-[14px] font-semibold text-[#353a44] bg-white border border-[#d8dee4] rounded-md hover:bg-gray-50 shadow-[0px_1px_1px_rgba(33,37,44,0.16)]">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.75 2.5C3.05964 2.5 2.5 3.05964 2.5 3.75V12.25C2.5 12.9404 3.05964 13.5 3.75 13.5H12.25C12.9404 13.5 13.5 12.9404 13.5 12.25V8.69444C13.5 8.28023 13.8358 7.94444 14.25 7.94444C14.6642 7.94444 15 8.28023 15 8.69444V12.25C15 13.7688 13.7688 15 12.25 15H3.75C2.23122 15 1 13.7688 1 12.25V3.75C1 2.23122 2.23122 1 3.75 1H7.30578C7.72 1 8.05578 1.33579 8.05578 1.75C8.05578 2.16421 7.72 2.5 7.30578 2.5H3.75Z" fill="#474E5A"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M13.7385 1.17809C13.0541 0.493765 11.9443 0.494807 11.2613 1.18042L5.21115 7.25332C5.11228 7.35256 5.04318 7.47751 5.01168 7.614L4.26922 10.8313C4.21107 11.0833 4.28683 11.3475 4.46968 11.5303C4.65254 11.7132 4.91669 11.7889 5.16866 11.7308L8.38599 10.9883C8.52343 10.9566 8.64913 10.8868 8.74868 10.7869L14.8015 4.7113C15.4827 4.02751 15.4816 2.92126 14.7991 2.23875L13.7385 1.17809ZM12.3239 2.23908C12.4215 2.14114 12.5801 2.14099 12.6778 2.23875L13.7385 3.29941C13.836 3.39691 13.8361 3.55494 13.7388 3.65263L12.9927 4.40153L11.5785 2.98732L12.3239 2.23908ZM10.5198 4.04997L6.42507 8.16014L6.00064 9.99936L7.83837 9.57527L11.934 5.46418L10.5198 4.04997Z" fill="#474E5A"/>
                  </svg>
                  Edit columns
                </button>
              </div>
            </div>
            
            {/* Disputes Table */}
            <div>
              {/* Table Header */}
              <div className="flex items-center border-y border-[#e3e8ee] text-[12px] font-bold text-[#353A44] whitespace-nowrap">
                <div className="w-8 flex-shrink-0 flex items-center justify-center py-2">
                  <input type="checkbox" className="w-3.5 h-3.5 appearance-none rounded-[4px] border border-[#D8DEE4] bg-white checked:bg-[#635bff] checked:border-[#635bff] cursor-pointer" />
                </div>
                <div className="w-20 flex-shrink-0 py-2 pl-1">Amount</div>
                <div className="w-24 flex-shrink-0 py-2"></div>
                <div className="flex-1 min-w-[120px] py-2">Description</div>
                <div className="flex-1 min-w-[160px] py-2">Card</div>
                <div className="flex-1 min-w-[120px] py-2">Cardholder</div>
                <div className="flex-1 min-w-[130px] py-2">Submit dispute by</div>
                <div className="w-24 flex-shrink-0 py-2">Disputed on</div>
                <div className="w-10 flex-shrink-0 py-2"></div>
              </div>
              
              {/* Table Body */}
              {[
                { amount: '$378.77', status: 'Submitted', description: 'Cactus Practice', card: 'Ad spend', last4: '3576', cardholder: 'Cam Sackett', submitBy: 'Jan 12', disputedOn: 'Jan 23' },
                { amount: '$293.93', status: 'Submitted', description: 'Cactus Practice', card: 'Marketing', last4: '8972', cardholder: 'Lulu Siegel', submitBy: 'Jan 10', disputedOn: 'Jan 20' },
                { amount: '$156.50', status: 'Unsubmitted', description: 'Tech Store', card: 'Operations', last4: '2787', cardholder: 'Katie Litz', submitBy: 'Feb 15', disputedOn: '—' },
                { amount: '$892.00', status: 'Won', description: 'Office Supplies', card: 'Financial account', last4: '2345', cardholder: 'Cam Sackett', submitBy: 'Dec 20', disputedOn: 'Dec 28' },
                { amount: '$45.99', status: 'Lost', description: 'Streaming Service', card: 'Travel', last4: '5211', cardholder: 'Mathilde Jeakins', submitBy: 'Nov 5', disputedOn: 'Nov 12' },
                { amount: '$1,250.00', status: 'Expired', description: 'Software License', card: 'Tax', last4: '8432', cardholder: 'Runa Cameron', submitBy: 'Oct 1', disputedOn: '—' },
              ].map((dispute, i) => (
                <div key={i} className="flex items-center h-9 border-b border-[#e3e8ee] whitespace-nowrap">
                  <div className="w-8 flex-shrink-0 flex items-center justify-center">
                    <input type="checkbox" className="w-3.5 h-3.5 appearance-none rounded-[4px] border border-[#D8DEE4] bg-white checked:bg-[#635bff] checked:border-[#635bff] cursor-pointer" />
                  </div>
                  <div className="w-20 flex-shrink-0 pl-1">
                    <span className="text-[14px] font-medium text-[#353a44]">{dispute.amount}</span>
                  </div>
                  <div className="w-24 flex-shrink-0">
                    <span className={`inline-flex items-center h-[18px] px-1.5 rounded text-[11px] font-semibold leading-4 ${
                      dispute.status === 'Submitted' ? 'bg-[#D1FAB3] text-[#217005] border border-[#A8F170]' :
                      dispute.status === 'Unsubmitted' ? 'bg-[#EBEEF1] text-[#596171] border border-[#D8DEE4]' :
                      dispute.status === 'Won' ? 'bg-[#D1FAB3] text-[#217005] border border-[#A8F170]' :
                      dispute.status === 'Lost' ? 'bg-[#FDE9EE] text-[#C0123C] border border-[#FBD3DC]' :
                      dispute.status === 'Expired' ? 'bg-[#FCEEB5] text-[#B13600] border border-[#FBD992]' :
                      'bg-[#EBEEF1] text-[#596171] border border-[#D8DEE4]'
                    }`}>
                      {dispute.status}
                    </span>
                  </div>
                  <div className="flex-1 min-w-[120px] text-[14px] text-[#596171]">{dispute.description}</div>
                  <div className="flex-1 min-w-[160px] flex items-center gap-1.5">
                    <svg width="24" height="18" viewBox="0 0 38 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g filter="url(#filter0_ddd_disputes)">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.77832 17.1109C7.77832 17.5388 8.13162 17.889 8.56338 17.889H29.3935C29.8253 17.889 30.1786 17.5388 30.1786 17.1109V4.66701C30.1786 4.23908 29.8253 3.88892 29.3935 3.88892H8.56338C8.13162 3.88892 7.77832 4.23908 7.77832 4.66701V17.1109Z" fill="url(#paint0_linear_disputes)"/>
                      </g>
                      <rect x="10.3047" y="8.51636" width="2.98339" height="2.26789" rx="0.350004" fill="url(#paint1_linear_disputes)"/>
                      <defs>
                        <filter id="filter0_ddd_disputes" x="0.000448704" y="-1.97887e-05" width="37.9561" height="29.5557" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                          <feOffset dy="0.388894"/>
                          <feGaussianBlur stdDeviation="0.58334"/>
                          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/>
                          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                          <feOffset dy="1.16668"/>
                          <feGaussianBlur stdDeviation="1.36113"/>
                          <feColorMatrix type="matrix" values="0 0 0 0 0.188235 0 0 0 0 0.192157 0 0 0 0 0.239216 0 0 0 0.08 0"/>
                          <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow"/>
                          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                          <feOffset dy="3.88894"/>
                          <feGaussianBlur stdDeviation="3.88894"/>
                          <feColorMatrix type="matrix" values="0 0 0 0 0.188235 0 0 0 0 0.192157 0 0 0 0 0.239216 0 0 0 0.08 0"/>
                          <feBlend mode="normal" in2="effect2_dropShadow" result="effect3_dropShadow"/>
                          <feBlend mode="normal" in="SourceGraphic" in2="effect3_dropShadow" result="shape"/>
                        </filter>
                        <linearGradient id="paint0_linear_disputes" x1="18.9785" y1="3.88892" x2="18.9785" y2="17.889" gradientUnits="userSpaceOnUse">
                          <stop stopColor="white"/>
                          <stop offset="1" stopColor="#F5F6F8"/>
                        </linearGradient>
                        <linearGradient id="paint1_linear_disputes" x1="11.7964" y1="8.51636" x2="11.7964" y2="10.7842" gradientUnits="userSpaceOnUse">
                          <stop stopColor="white"/>
                          <stop offset="1" stopColor="#E2E2E2"/>
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="text-[14px] text-[#596171]">••••{dispute.last4}</span>
                  </div>
                  <div className="flex-1 min-w-[120px] text-[14px] text-[#596171]">{dispute.cardholder}</div>
                  <div className="flex-1 min-w-[130px] text-[14px] text-[#596171]">{dispute.submitBy}</div>
                  <div className="w-24 flex-shrink-0 text-[14px] text-[#596171]">{dispute.disputedOn}</div>
                  <div className="w-10 flex-shrink-0 flex items-center justify-end pr-4">
                    <button className="text-[#6c7688] hover:text-[#353a44]">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 7.5C2.32843 7.5 3 6.82843 3 6C3 5.17157 2.32843 4.5 1.5 4.5C0.671573 4.5 0 5.17157 0 6C0 6.82843 0.671573 7.5 1.5 7.5Z" fill="#6C7688"/>
                        <path d="M6 7.5C6.82843 7.5 7.5 6.82843 7.5 6C7.5 5.17157 6.82843 4.5 6 4.5C5.17157 4.5 4.5 5.17157 4.5 6C4.5 6.82843 5.17157 7.5 6 7.5Z" fill="#6C7688"/>
                        <path d="M12 6C12 6.82843 11.3284 7.5 10.5 7.5C9.67157 7.5 9 6.82843 9 6C9 5.17157 9.67157 4.5 10.5 4.5C11.3284 4.5 12 5.17157 12 6Z" fill="#6C7688"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Transfers Tab View */}
        {activeTab === 'transfers' && (
          <div className="flex items-center justify-center py-16">
            <div className="w-full max-w-[600px] h-[300px] bg-[#f5f6f8] rounded-lg flex items-center justify-center">
              <span className="text-[14px] text-[#6c7688]">Transfers content coming soon</span>
            </div>
          </div>
        )}
        
        {/* Fraud and Risk Tab View */}
        {activeTab === 'fraud' && (
          <div>
            {/* Filter Bar */}
            <div className="flex items-center gap-3 mb-8">
              <button className="h-9 px-3 bg-white border border-[#e3e8ee] rounded-lg text-[14px] text-[#353a44] flex items-center gap-2">
                Custom
                <ChevronDownChipIcon />
              </button>
              <div className="h-9 px-3 bg-white border border-[#e3e8ee] rounded-lg text-[14px] text-[#353a44] flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M1 2C1 1.44772 1.44772 1 2 1H12C12.5523 1 13 1.44772 13 2V12C13 12.5523 12.5523 13 12 13H2C1.44772 13 1 12.5523 1 12V2ZM12 2H2V12H12V2Z" fill="#6C7688"/>
                  <path d="M4 0.5C4 0.223858 4.22386 0 4.5 0C4.77614 0 5 0.223858 5 0.5V2.5C5 2.77614 4.77614 3 4.5 3C4.22386 3 4 2.77614 4 2.5V0.5Z" fill="#6C7688"/>
                  <path d="M9 0.5C9 0.223858 9.22386 0 9.5 0C9.77614 0 10 0.223858 10 0.5V2.5C10 2.77614 9.77614 3 9.5 3C9.22386 3 9 2.77614 9 2.5V0.5Z" fill="#6C7688"/>
                  <path d="M2 5H12V4H2V5Z" fill="#6C7688"/>
                </svg>
                Jan 14–Feb 3
              </div>
              <span className="text-[14px] text-[#596171]">compared to</span>
              <button className="h-9 px-3 bg-white border border-[#e3e8ee] rounded-lg text-[14px] text-[#353a44] flex items-center gap-2">
                Previous period
                <ChevronDownChipIcon />
              </button>
              <button className="h-9 px-3 bg-white border border-[#e3e8ee] rounded-lg text-[14px] text-[#353a44] flex items-center gap-2">
                Weekly
                <svg width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.606072 6.33351C0.307015 6.62011 0.296913 7.09487 0.58351 7.39393L3.45851 10.3939C3.59989 10.5415 3.79535 10.6249 3.99969 10.625C4.20403 10.6251 4.39955 10.5418 4.54106 10.3944L7.41606 7.39938C7.70291 7.10056 7.6932 6.62579 7.39438 6.33894C7.09556 6.0521 6.62079 6.0618 6.33394 6.36062L4.00045 8.79151L1.66649 6.35607C1.3799 6.05701 0.905129 6.04691 0.606072 6.33351Z" fill="#6C7688"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.39393 9.66649C7.69299 9.37989 7.70309 8.90513 7.41649 8.60607L4.54149 5.60607C4.40011 5.45854 4.20465 5.37506 4.00031 5.37499C3.79597 5.37492 3.60045 5.45825 3.45894 5.60565L0.583939 8.60062C0.297091 8.89944 0.306798 9.37421 0.605617 9.66106C0.904437 9.9479 1.37921 9.9382 1.66606 9.63938L3.99955 7.20849L6.33351 9.64393C6.6201 9.94299 7.09487 9.95309 7.39393 9.66649Z" fill="#6C7688"/>
                </svg>
              </button>
            </div>

            {/* Transaction Fraud Section */}
            <div className="mb-10">
              <h2 className="text-[16px] font-semibold text-[#353a44] mb-1">Transaction fraud</h2>
              <p className="text-[14px] text-[#596171] mb-4">Understand more about how transaction fraud is impacting your program.</p>
              
              <div className="flex gap-6">
                {/* Fraud Volume Card */}
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[14px] font-medium text-[#353a44]">Fraud volume</span>
                    <InfoIcon />
                  </div>
                  <div className="text-[14px] text-[#353a44] mb-3">Total $0.00</div>
                  <div className="bg-[#f5f6f8] rounded-lg p-4 flex items-start gap-3">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5 shrink-0">
                      <path fillRule="evenodd" clipRule="evenodd" d="M8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5ZM0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8Z" fill="#6C7688"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M8 4C8.41421 4 8.75 4.33579 8.75 4.75V8.25C8.75 8.66421 8.41421 9 8 9C7.58579 9 7.25 8.66421 7.25 8.25V4.75C7.25 4.33579 7.58579 4 8 4Z" fill="#6C7688"/>
                      <path d="M8 11.5C8.55228 11.5 9 11.0523 9 10.5C9 9.94772 8.55228 9.5 8 9.5C7.44772 9.5 7 9.94772 7 10.5C7 11.0523 7.44772 11.5 8 11.5Z" fill="#6C7688"/>
                    </svg>
                    <span className="text-[13px] text-[#596171] leading-5">This chart is only available in live mode. Please switch to live mode to access this information.</span>
                  </div>
                </div>
                
                {/* Fraud Rate Card */}
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[14px] font-medium text-[#353a44]">Fraud rate</span>
                    <InfoIcon />
                  </div>
                  <div className="text-[14px] text-[#353a44] mb-3">Average 0%</div>
                  <div className="bg-[#f5f6f8] rounded-lg p-4 flex items-start gap-3">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5 shrink-0">
                      <path fillRule="evenodd" clipRule="evenodd" d="M8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5ZM0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8Z" fill="#6C7688"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M8 4C8.41421 4 8.75 4.33579 8.75 4.75V8.25C8.75 8.66421 8.41421 9 8 9C7.58579 9 7.25 8.66421 7.25 8.25V4.75C7.25 4.33579 7.58579 4 8 4Z" fill="#6C7688"/>
                      <path d="M8 11.5C8.55228 11.5 9 11.0523 9 10.5C9 9.94772 8.55228 9.5 8 9.5C7.44772 9.5 7 9.94772 7 10.5C7 11.0523 7.44772 11.5 8 11.5Z" fill="#6C7688"/>
                    </svg>
                    <span className="text-[13px] text-[#596171] leading-5">This chart is only available in live mode. Please switch to live mode to access this information.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cardholder Fraud Section */}
            <div className="mb-10">
              <div className="flex items-center gap-1.5 mb-4">
                <h2 className="text-[16px] font-semibold text-[#353a44]">Cardholder fraud</h2>
                <InfoIcon />
              </div>
              
              <div className="w-1/2 pr-3">
                <div className="bg-[#f5f6f8] rounded-lg p-4 flex items-start gap-3">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5 shrink-0">
                    <path fillRule="evenodd" clipRule="evenodd" d="M8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5ZM0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8Z" fill="#6C7688"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M8 4C8.41421 4 8.75 4.33579 8.75 4.75V8.25C8.75 8.66421 8.41421 9 8 9C7.58579 9 7.25 8.66421 7.25 8.25V4.75C7.25 4.33579 7.58579 4 8 4Z" fill="#6C7688"/>
                    <path d="M8 11.5C8.55228 11.5 9 11.0523 9 10.5C9 9.94772 8.55228 9.5 8 9.5C7.44772 9.5 7 9.94772 7 10.5C7 11.0523 7.44772 11.5 8 11.5Z" fill="#6C7688"/>
                  </svg>
                  <span className="text-[13px] text-[#596171] leading-5">This chart is only available in live mode. Please switch to live mode to access this information.</span>
                </div>
              </div>
            </div>

            {/* Dispute Performance Section */}
            <div className="mb-10">
              <h2 className="text-[16px] font-semibold text-[#353a44] mb-1">Dispute performance</h2>
              <p className="text-[14px] text-[#596171] mb-4">Understand dispute outcomes and their financial impact on your program.</p>
              
              {/* First Row */}
              <div className="flex gap-6 mb-6">
                {/* Fraud Dispute Win Rate */}
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[14px] font-medium text-[#353a44]">Fraud dispute win rate</span>
                    <InfoIcon />
                  </div>
                  <div className="text-[14px] text-[#353a44] mb-3">Average 0%</div>
                  <div className="bg-[#f5f6f8] rounded-lg p-4 flex items-start gap-3">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5 shrink-0">
                      <path fillRule="evenodd" clipRule="evenodd" d="M8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5ZM0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8Z" fill="#6C7688"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M8 4C8.41421 4 8.75 4.33579 8.75 4.75V8.25C8.75 8.66421 8.41421 9 8 9C7.58579 9 7.25 8.66421 7.25 8.25V4.75C7.25 4.33579 7.58579 4 8 4Z" fill="#6C7688"/>
                      <path d="M8 11.5C8.55228 11.5 9 11.0523 9 10.5C9 9.94772 8.55228 9.5 8 9.5C7.44772 9.5 7 9.94772 7 10.5C7 11.0523 7.44772 11.5 8 11.5Z" fill="#6C7688"/>
                    </svg>
                    <span className="text-[13px] text-[#596171] leading-5">This chart is only available in live mode. Please switch to live mode to access this information.</span>
                  </div>
                </div>
                
                {/* Fraud Volume Dispute Win Rate */}
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[14px] font-medium text-[#353a44]">Fraud volume dispute win rate</span>
                    <InfoIcon />
                  </div>
                  <div className="text-[14px] text-[#353a44] mb-3">Average 0%</div>
                  <div className="bg-[#f5f6f8] rounded-lg p-4 flex items-start gap-3">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5 shrink-0">
                      <path fillRule="evenodd" clipRule="evenodd" d="M8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5ZM0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8Z" fill="#6C7688"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M8 4C8.41421 4 8.75 4.33579 8.75 4.75V8.25C8.75 8.66421 8.41421 9 8 9C7.58579 9 7.25 8.66421 7.25 8.25V4.75C7.25 4.33579 7.58579 4 8 4Z" fill="#6C7688"/>
                      <path d="M8 11.5C8.55228 11.5 9 11.0523 9 10.5C9 9.94772 8.55228 9.5 8 9.5C7.44772 9.5 7 9.94772 7 10.5C7 11.0523 7.44772 11.5 8 11.5Z" fill="#6C7688"/>
                    </svg>
                    <span className="text-[13px] text-[#596171] leading-5">This chart is only available in live mode. Please switch to live mode to access this information.</span>
                  </div>
                </div>
              </div>
              
              {/* Second Row */}
              <div className="flex gap-6 mb-6">
                {/* Total Volume of Lost Fraud Disputes */}
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[14px] font-medium text-[#353a44]">Total volume of lost fraud disputes</span>
                    <InfoIcon />
                  </div>
                  <div className="text-[14px] text-[#353a44] mb-3">Total $0.00</div>
                  <div className="bg-[#f5f6f8] rounded-lg p-4 flex items-start gap-3">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5 shrink-0">
                      <path fillRule="evenodd" clipRule="evenodd" d="M8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5ZM0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8Z" fill="#6C7688"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M8 4C8.41421 4 8.75 4.33579 8.75 4.75V8.25C8.75 8.66421 8.41421 9 8 9C7.58579 9 7.25 8.66421 7.25 8.25V4.75C7.25 4.33579 7.58579 4 8 4Z" fill="#6C7688"/>
                      <path d="M8 11.5C8.55228 11.5 9 11.0523 9 10.5C9 9.94772 8.55228 9.5 8 9.5C7.44772 9.5 7 9.94772 7 10.5C7 11.0523 7.44772 11.5 8 11.5Z" fill="#6C7688"/>
                    </svg>
                    <span className="text-[13px] text-[#596171] leading-5">This chart is only available in live mode. Please switch to live mode to access this information.</span>
                  </div>
                </div>
                
                {/* Overall Dispute Win Rate (count) */}
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[14px] font-medium text-[#353a44]">Overall dispute win rate (count)</span>
                    <InfoIcon />
                  </div>
                  <div className="text-[14px] text-[#353a44] mb-3">Average 0%</div>
                  <div className="bg-[#f5f6f8] rounded-lg p-4 flex items-start gap-3">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5 shrink-0">
                      <path fillRule="evenodd" clipRule="evenodd" d="M8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5ZM0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8Z" fill="#6C7688"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M8 4C8.41421 4 8.75 4.33579 8.75 4.75V8.25C8.75 8.66421 8.41421 9 8 9C7.58579 9 7.25 8.66421 7.25 8.25V4.75C7.25 4.33579 7.58579 4 8 4Z" fill="#6C7688"/>
                      <path d="M8 11.5C8.55228 11.5 9 11.0523 9 10.5C9 9.94772 8.55228 9.5 8 9.5C7.44772 9.5 7 9.94772 7 10.5C7 11.0523 7.44772 11.5 8 11.5Z" fill="#6C7688"/>
                    </svg>
                    <span className="text-[13px] text-[#596171] leading-5">This chart is only available in live mode. Please switch to live mode to access this information.</span>
                  </div>
                </div>
              </div>
              
              {/* Third Row - Single Card */}
              <div className="w-1/2 pr-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[14px] font-medium text-[#353a44]">Total volume of lost disputes</span>
                  <InfoIcon />
                </div>
                <div className="text-[14px] text-[#353a44] mb-3">Total $0.00</div>
                <div className="bg-[#f5f6f8] rounded-lg p-4 flex items-start gap-3">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5 shrink-0">
                    <path fillRule="evenodd" clipRule="evenodd" d="M8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5ZM0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8Z" fill="#6C7688"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M8 4C8.41421 4 8.75 4.33579 8.75 4.75V8.25C8.75 8.66421 8.41421 9 8 9C7.58579 9 7.25 8.66421 7.25 8.25V4.75C7.25 4.33579 7.58579 4 8 4Z" fill="#6C7688"/>
                    <path d="M8 11.5C8.55228 11.5 9 11.0523 9 10.5C9 9.94772 8.55228 9.5 8 9.5C7.44772 9.5 7 9.94772 7 10.5C7 11.0523 7.44772 11.5 8 11.5Z" fill="#6C7688"/>
                  </svg>
                  <span className="text-[13px] text-[#596171] leading-5">This chart is only available in live mode. Please switch to live mode to access this information.</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Overview Tab View */}
        {activeTab === 'overview' && (
        <div className="flex gap-12">
          {/* Primary Column */}
          <div className="flex-1 min-w-0">
            {/* Filter Bar */}
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              <FilterChipDropdown 
                label="Financial account" 
                value={selectedAccount.label}
                options={financialAccountOptions}
                onSelect={setSelectedAccount}
                hasSeparator={true}
                hasCloseIcon={true}
              />
              <FilterChip label="Date Range" value="Last 12 months" hasSeparator={true} hasCloseIcon={true} />
              <FilterChip label="Monthly" value="Monthly" sameValue={true} hasCloseIcon={true} />
              <FilterChip 
                label="Compare" 
                value="Previous period" 
                hasSeparator={true}
                hasCloseIcon={true}
              />
            </div>
            
            {/* Charts Row */}
            <div className="flex gap-6 mb-8">
              <ChartWidget 
                title="Total volume"
                value="$84,320.00"
                previousValue="$72,150.00 previous period"
                yAxisLabels={['12k', '10k', '8k', '6k', '4k', '2k', '0']}
                variant="currency"
              />
              <ChartWidget 
                title="Approval rate"
                value="96.4%"
                previousValue="94.8% previous period"
                yAxisLabels={['100%', '80%', '60%', '40%', '20%', '0%', '']}
                variant="percentage"
              />
            </div>
            
            {/* Secondary Row - Declined Transactions & Spend by Category */}
            <div className="flex gap-6 mb-8">
              {/* Declined Transactions Section */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="font-bold text-[16px] text-[#353a44]">Failed transactions</h2>
                  <span className="text-[#6c7688]"><InfoIcon /></span>
                </div>
                <div>
                  {[
                    { amount: '$2,450.00', description: 'Amazon Web Services', reason: 'Declined' },
                    { amount: '$890.00', description: 'Delta Airlines', reason: 'Blocked' },
                    { amount: '$1,200.00', description: 'Staples Office Supplies', reason: 'Declined' },
                    { amount: '$350.00', description: 'Google Ads', reason: 'Blocked' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-[#e3e8ee] last:border-0">
                      <div>
                        <div className="text-[14px] font-semibold text-[#353a44]">{item.amount}</div>
                        <div className="text-[12px] text-[#596171]">{item.description}</div>
                      </div>
                      <Badge variant="error">{item.reason}</Badge>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Spend by Category Section */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="font-bold text-[16px] text-[#353a44]">Spend by category</h2>
                  <span className="text-[#6c7688]"><InfoIcon /></span>
                </div>
                {/* Category Bar */}
                <div className="flex h-3 rounded-full overflow-hidden mb-4">
                  <div className="bg-[#9966ff] flex-[3]" />
                  <div className="bg-[#b3a1ff] flex-[2]" />
                  <div className="bg-[#0055bc] flex-[2]" />
                  <div className="bg-[#003d87] flex-[1.5]" />
                  <div className="bg-[#ed6804] flex-[1]" />
                  <div className="bg-[#b3063d] flex-[0.5]" />
                </div>
                {/* Category Legend */}
                <div>
                  {[
                    { color: '#9966ff', label: 'Software & SaaS', value: '$32,450' },
                    { color: '#b3a1ff', label: 'Travel & Transportation', value: '$18,200' },
                    { color: '#0055bc', label: 'Office Supplies', value: '$12,840' },
                    { color: '#003d87', label: 'Marketing & Ads', value: '$9,650' },
                    { color: '#ed6804', label: 'Other', value: '$5,180' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-[#e3e8ee] last:border-0">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-[14px] text-[#353a44]">{item.label}</span>
                      </div>
                      <span className="text-[14px] text-[#353a44]">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Secondary Column - Right Rail */}
          <div className="min-w-[294px] shrink-0">
            {/* Funds Available */}
            <div className="mb-6">
              {/* Header with title and action */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-[16px] text-[#353a44] leading-6 tracking-[-0.31px]">Funds available</h3>
                <button 
                  onClick={() => setIsAddFundsOpen(true)}
                  className="flex items-center gap-1 h-6 px-2 text-[12px] font-semibold text-[#353a44] tracking-[-0.024px] bg-white border border-[#d8dee4] rounded-md hover:bg-gray-50 shadow-[0px_1px_1px_rgba(33,37,44,0.16)]"
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M4.25 4.25H7C7.41421 4.25 7.75 3.91421 7.75 3.5C7.75 3.08579 7.41421 2.75 7 2.75H4C3.30964 2.75 2.75 3.30964 2.75 4V11C2.75 11.6904 3.30964 12.25 4 12.25H14.5C15.1904 12.25 15.75 11.6904 15.75 11V6.5C15.75 6.08579 15.4142 5.75 15 5.75C14.5858 5.75 14.25 6.08579 14.25 6.5V10.75H4.25V4.25Z" fill="#474E5A"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M8.5 7V8C8.5 8.41421 8.83579 8.75 9.25 8.75C9.66421 8.75 10 8.41421 10 8V7C10 6.58579 9.66421 6.25 9.25 6.25C8.83579 6.25 8.5 6.58579 8.5 7ZM7.25 7V8C7.25 9.10457 8.14543 10 9.25 10C10.3546 10 11.25 9.10457 11.25 8V7C11.25 5.89543 10.3546 5 9.25 5C8.14543 5 7.25 5.89543 7.25 7Z" fill="#474E5A"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M1 5.25C1.41421 5.25 1.75 5.58579 1.75 6V12.5C1.75 12.9142 2.08579 13.25 2.5 13.25H12.5C12.9142 13.25 13.25 13.5858 13.25 14C13.25 14.4142 12.9142 14.75 12.5 14.75H2.5C1.25736 14.75 0.25 13.7426 0.25 12.5V6C0.25 5.58579 0.585786 5.25 1 5.25Z" fill="#474E5A"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.5 0.25C12.9142 0.25 13.25 0.585786 13.25 1V2.25H14.5C14.9142 2.25 15.25 2.58579 15.25 3C15.25 3.41421 14.9142 3.75 14.5 3.75H13.25V5C13.25 5.41421 12.9142 5.75 12.5 5.75C12.0858 5.75 11.75 5.41421 11.75 5V3.75H10.5C10.0858 3.75 9.75 3.41421 9.75 3C9.75 2.58579 10.0858 2.25 10.5 2.25H11.75V1C11.75 0.585786 12.0858 0.25 12.5 0.25Z" fill="#474E5A"/>
                  </svg>
                  Add funds
                </button>
              </div>
              
              {/* Account Card */}
              <div className="flex items-stretch bg-white border border-[#e3e8ee] rounded-xl overflow-hidden">
                {/* Stripe Icon Container - gray bg fills height, extends to left edge */}
                <div className="bg-[#f5f6f8] flex items-center justify-center pl-3 pr-3 py-3 rounded-r-lg">
                  <div className="w-8 h-8 rounded overflow-hidden">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="32" height="32" fill="#533AFD"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M8 23.998L24 20.6049V7.99805L8 11.4308V23.998Z" fill="white"/>
                    </svg>
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex flex-col gap-1 justify-center py-3 px-3">
                  <div className="text-[14px] font-semibold text-[#353a44] leading-5 tracking-[-0.15px]">
                    ${fundsAvailable.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-[12px] text-[#353a44] leading-4">
                    {selectedAccount.label}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Resources */}
            <div>
              <h3 className="font-bold text-[16px] text-[#353a44] leading-6 tracking-[-0.31px] mb-3">Resources</h3>
              <div className="flex flex-col gap-2">
                {/* Quickstart guide */}
                <a href="#" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <div className="w-8 h-8 rounded-lg bg-[#f5f6f8] flex items-center justify-center shrink-0">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M13 2.5H3C2.17157 2.5 1.5 3.17157 1.5 4V12C1.5 12.8284 2.17157 13.5 3 13.5H13C13.8284 13.5 14.5 12.8284 14.5 12V4C14.5 3.17157 13.8284 2.5 13 2.5ZM3 1C1.34315 1 0 2.34315 0 4V12C0 13.6569 1.34315 15 3 15H13C14.6569 15 16 13.6569 16 12V4C16 2.34315 14.6569 1 13 1H3Z" fill="#474E5A"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M3.43056 4.51191C3.70012 4.19741 4.1736 4.16099 4.48809 4.43056L7.98809 7.43056C8.15433 7.57304 8.25 7.78106 8.25 8C8.25 8.21894 8.15433 8.42696 7.98809 8.56944L4.48809 11.5694C4.1736 11.839 3.70012 11.8026 3.43056 11.4881C3.16099 11.1736 3.19741 10.7001 3.51191 10.4306L6.34756 8L3.51191 5.56944C3.19741 5.29988 3.16099 4.8264 3.43056 4.51191Z" fill="#474E5A"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M8 10.75C8 10.3358 8.33579 10 8.75 10H12.25C12.6642 10 13 10.3358 13 10.75C13 11.1642 12.6642 11.5 12.25 11.5H8.75C8.33579 11.5 8 11.1642 8 10.75Z" fill="#474E5A"/>
                    </svg>
                  </div>
                  <span className="text-[14px] font-semibold text-[#353a44] leading-5 tracking-[-0.15px]">
                    Quickstart guide
                  </span>
                </a>
                
                {/* Integration guide */}
                <a href="#" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <div className="w-8 h-8 rounded-lg bg-[#f5f6f8] flex items-center justify-center shrink-0">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M13 2.5H3C2.17157 2.5 1.5 3.17157 1.5 4V12C1.5 12.8284 2.17157 13.5 3 13.5H13C13.8284 13.5 14.5 12.8284 14.5 12V4C14.5 3.17157 13.8284 2.5 13 2.5ZM3 1C1.34315 1 0 2.34315 0 4V12C0 13.6569 1.34315 15 3 15H13C14.6569 15 16 13.6569 16 12V4C16 2.34315 14.6569 1 13 1H3Z" fill="#474E5A"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M3.43056 4.51191C3.70012 4.19741 4.1736 4.16099 4.48809 4.43056L7.98809 7.43056C8.15433 7.57304 8.25 7.78106 8.25 8C8.25 8.21894 8.15433 8.42696 7.98809 8.56944L4.48809 11.5694C4.1736 11.839 3.70012 11.8026 3.43056 11.4881C3.16099 11.1736 3.19741 10.7001 3.51191 10.4306L6.34756 8L3.51191 5.56944C3.19741 5.29988 3.16099 4.8264 3.43056 4.51191Z" fill="#474E5A"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M8 10.75C8 10.3358 8.33579 10 8.75 10H12.25C12.6642 10 13 10.3358 13 10.75C13 11.1642 12.6642 11.5 12.25 11.5H8.75C8.33579 11.5 8 11.1642 8 10.75Z" fill="#474E5A"/>
                    </svg>
                  </div>
                  <span className="text-[14px] font-semibold text-[#353a44] leading-5 tracking-[-0.15px]">
                    Integration guide
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
      
      {/* Add Funds Modal */}
      <AddFundsModal 
        isOpen={isAddFundsOpen} 
        onClose={() => setIsAddFundsOpen(false)}
        onAddFunds={(amount) => setFundsAvailable(prev => prev + amount)}
      />
    </div>
  );
};

export default IssuingHomeView;








