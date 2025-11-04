"use client";

export default function AnimatedDiagonalLine() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="w-full h-full" preserveAspectRatio="none">
        {/* Static elegant curved line */}
        <path
          d="M 0,20 Q 20,60 40,40 T 70,50 Q 85,45 100,70"
          stroke="#00b67f"
          strokeWidth="2"
          fill="none"
          opacity="0.25"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
        />
        
        {/* Secondary curved line for depth */}
        <path
          d="M 10,80 Q 30,40 60,60 T 90,30"
          stroke="#00b67f"
          strokeWidth="1.5"
          fill="none"
          opacity="0.15"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
        />
        
        {/* Random animated diagonal line 1 */}
        <line 
          x1="0" 
          y1="0" 
          x2="100%" 
          y2="100%" 
          stroke="#00b67f" 
          strokeWidth="2" 
          opacity="0.25"
          strokeDasharray="3000"
          strokeDashoffset="0"
          style={{
            animation: 'drawLine1 6s ease-in-out infinite'
          }}
        />
        
        {/* Random animated diagonal line 2 */}
        <line 
          x1="100%" 
          y1="20%" 
          x2="0" 
          y2="80%" 
          stroke="#00b67f" 
          strokeWidth="1.5" 
          opacity="0.2"
          strokeDasharray="2500"
          strokeDashoffset="0"
          style={{
            animation: 'drawLine2 8s ease-in-out infinite 2s'
          }}
        />
        
        {/* Random animated diagonal line 3 */}
        <line 
          x1="30%" 
          y1="0" 
          x2="70%" 
          y2="100%" 
          stroke="#00b67f" 
          strokeWidth="1.5" 
          opacity="0.2"
          strokeDasharray="2000"
          strokeDashoffset="0"
          style={{
            animation: 'drawLine3 7s ease-in-out infinite 4s'
          }}
        />
      </svg>
      
      <style jsx>{`
        @keyframes drawLine1 {
          0% {
            stroke-dashoffset: 3000;
            opacity: 0;
          }
          30% {
            stroke-dashoffset: 0;
            opacity: 0.25;
          }
          70% {
            stroke-dashoffset: 0;
            opacity: 0.25;
          }
          100% {
            stroke-dashoffset: -3000;
            opacity: 0;
          }
        }
        
        @keyframes drawLine2 {
          0% {
            stroke-dashoffset: 2500;
            opacity: 0;
          }
          30% {
            stroke-dashoffset: 0;
            opacity: 0.2;
          }
          70% {
            stroke-dashoffset: 0;
            opacity: 0.2;
          }
          100% {
            stroke-dashoffset: -2500;
            opacity: 0;
          }
        }
        
        @keyframes drawLine3 {
          0% {
            stroke-dashoffset: 2000;
            opacity: 0;
          }
          30% {
            stroke-dashoffset: 0;
            opacity: 0.2;
          }
          70% {
            stroke-dashoffset: 0;
            opacity: 0.2;
          }
          100% {
            stroke-dashoffset: -2000;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
