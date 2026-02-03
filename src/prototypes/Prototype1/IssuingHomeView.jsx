import React, { useState } from 'react';

// Icons
const InfoIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M6 5.5V8.5M6 3.5V4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const ChevronDownSmallIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
    default: 'bg-[#f5f6f8] text-[#596171]',
    success: 'bg-[#d7f7e0] text-[#1d6f42]',
  };
  
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[12px] font-medium ${variants[variant]}`}>
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
        ? 'border-[#635bff] text-[#353a44]' 
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
        {/* Y-axis labels */}
        <div className="flex flex-col justify-between text-[12px] text-[#6c7688] w-[32px] pr-2 pt-0 pb-6">
          {yAxisLabels.map((label, i) => (
            <span key={i} className="text-right">{label}</span>
          ))}
        </div>
        
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
            
            {/* Data point dots */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {mainLineData.map((y, i) => {
                const x = (i / (mainLineData.length - 1)) * 100;
                const yPos = 100 - (y * 100);
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={yPos}
                    r="0.8"
                    fill="#9966ff"
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })}
            </svg>
          </div>
          
          {/* X-axis labels */}
          <div className="flex justify-between text-[12px] text-[#6c7688] pt-2 h-6">
            {xAxisLabels.map((label, i) => (
              <span key={i}>{label}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Filter Chip Component
const FilterChip = ({ label, value, hasDropdown = true, isToggle = false, active = false }) => (
  <button 
    className={`
      flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-colors
      ${active 
        ? 'bg-[#f7f5fd] border-[#675dff] text-[#533afd]' 
        : 'bg-white border-[#d8dee4] text-[#353a44] hover:bg-gray-50'
      }
    `}
  >
    {isToggle && (
      <span className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${active ? 'border-[#675dff]' : 'border-[#99a5b8]'}`}>
        {active && <span className="w-1.5 h-1.5 rounded-full bg-[#675dff]" />}
      </span>
    )}
    <span className="text-[#6c7688]">{label}</span>
    <span className="font-medium">{value}</span>
    {hasDropdown && <ChevronDownSmallIcon />}
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
        <span className="text-[14px] font-semibold text-[#353a44]">{value}</span>
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

// Main Issuing Home View Component
const IssuingHomeView = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [compareEnabled, setCompareEnabled] = useState(true);
  
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
      {/* Page Header */}
      <div className="px-8 pt-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-[28px] font-bold text-[#353a44]">Issuing</h1>
          <button className="px-4 py-2 bg-[#635bff] hover:bg-[#5851ea] text-white font-medium text-sm rounded-md flex items-center gap-2 shadow-[0_1px_1px_rgba(47,14,99,0.32)]">
            Create
            <ChevronDownSmallIcon />
          </button>
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
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="flex gap-8">
          {/* Primary Column */}
          <div className="flex-1 min-w-0">
            {/* Filter Bar */}
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <FilterChip label="Date Range" value="Last 12 months" />
              <FilterChip label="Monthly" value="Monthly" />
              <FilterChip 
                label="Compare" 
                value="Previous period" 
                isToggle={true} 
                active={compareEnabled}
                hasDropdown={true}
              />
            </div>
            
            {/* Charts Row */}
            <div className="flex gap-6 mb-8">
              <ChartWidget 
                title="Total volume"
                value="$X.00"
                previousValue="$X.00 previous period"
                yAxisLabels={['12k', '10k', '8k', '6k', '4k', '2k', '0']}
                variant="currency"
              />
              <ChartWidget 
                title="Approval rate"
                value="X%"
                previousValue="X% previous period"
                yAxisLabels={['12k', '10k', '8k', '6k', '4k', '2k', '0']}
                variant="percentage"
              />
            </div>
            
            {/* Declined Transactions Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="font-bold text-[16px] text-[#353a44]">Declined transactions</h2>
                <span className="text-[#6c7688]"><InfoIcon /></span>
              </div>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex items-center justify-between py-2 border-b border-[#e3e8ee] last:border-0">
                    <div>
                      <div className="font-medium text-[#353a44]">$X.00</div>
                      <div className="text-sm text-[#596171]">Secondary title</div>
                    </div>
                    <Badge variant="default">Badge</Badge>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Spend by Category Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="font-bold text-[16px] text-[#353a44]">Spend by category</h2>
                <span className="text-[#6c7688]"><InfoIcon /></span>
              </div>
              {/* Category Bar */}
              <div className="flex h-4 rounded overflow-hidden mb-4">
                <div className="bg-[#9966ff] flex-[3]" />
                <div className="bg-[#0055bc] flex-[2]" />
                <div className="bg-[#00a1c2] flex-[2]" />
                <div className="bg-[#ed6804] flex-[1]" />
                <div className="bg-[#b3063d] flex-[1]" />
              </div>
              {/* Category Legend */}
              <div className="space-y-2">
                {[
                  { color: '#9966ff', label: 'Key', value: 'Value' },
                  { color: '#0055bc', label: 'Key', value: 'Value' },
                  { color: '#00a1c2', label: 'Key', value: 'Value' },
                  { color: '#ed6804', label: 'Key', value: 'Value' },
                  { color: '#b3063d', label: 'Key', value: 'Value' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-[#353a44]">{item.label}</span>
                    </div>
                    <span className="text-sm text-[#353a44]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Secondary Column */}
          <div className="w-[220px] shrink-0">
            {/* Funds Available */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-[16px] text-[#353a44]">Funds available</h3>
                <button className="px-3 py-1.5 text-sm font-medium text-[#353a44] border border-[#d8dee4] rounded-md hover:bg-gray-50">
                  Add funds
                </button>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#f5f6f8] rounded-lg">
                <StripeIcon />
                <div>
                  <div className="font-medium text-[#353a44]">$0.00</div>
                  <div className="text-sm text-[#6c7688]">Financial account balance</div>
                </div>
              </div>
            </div>
            
            {/* Resources */}
            <div>
              <h3 className="font-semibold text-[16px] text-[#353a44] mb-3">Resources</h3>
              <div className="space-y-3">
                <a href="#" className="flex items-center gap-2 text-[14px] text-[#353a44] hover:text-[#533afd]">
                  <span className="text-[#6c7688]">📄</span>
                  Quickstart guide
                </a>
                <a href="#" className="flex items-center gap-2 text-[14px] text-[#353a44] hover:text-[#533afd]">
                  <span className="text-[#6c7688]">📄</span>
                  Integration guide
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssuingHomeView;








