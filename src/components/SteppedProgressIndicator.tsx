import { Check } from 'lucide-react';

interface SteppedProgressIndicatorProps {
  totalSteps: number;
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function SteppedProgressIndicator({
  totalSteps,
  currentStep,
  onStepClick,
}: SteppedProgressIndicatorProps) {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between relative">
        {/* Background line connecting all steps */}
        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-[#3A3229] -translate-y-1/2 z-0" />

        {/* Progress line (shows completed portion) */}
        <div
          className="absolute left-0 top-1/2 h-0.5 bg-[#DAA520] -translate-y-1/2 z-0 transition-all duration-500"
          style={{
            width: `${((currentStep) / (totalSteps - 1)) * 100}%`,
          }}
        />

        {/* Step circles */}
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isPending = stepNumber > currentStep;

          return (
            <button
              key={index}
              onClick={() => onStepClick?.(stepNumber)}
              className={`
                relative z-10 flex items-center justify-center rounded-full
                transition-all duration-300 font-semibold
                ${
                  isCurrent
                    ? 'w-14 h-14 bg-[#8B1E1E] text-[#E6DCCF] shadow-lg shadow-[#8B1E1E]/50 scale-110 border-2 border-[#A52A2A]'
                    : isCompleted
                    ? 'w-12 h-12 bg-[#DAA520] text-[#2F2622] shadow-md hover:shadow-lg hover:shadow-[#DAA520]/40'
                    : 'w-12 h-12 bg-[#3A3229] text-[#6B6157] border border-[#4A4037]'
                }
                ${onStepClick ? 'cursor-pointer hover:scale-105' : 'cursor-default'}
                disabled:cursor-not-allowed
              `}
              aria-label={`Bước ${stepNumber + 1}`}
              aria-current={isCurrent ? 'step' : undefined}
            >
              {isCompleted ? (
                <Check className="w-6 h-6 stroke-[3]" />
              ) : (
                <span className="text-base">{stepNumber + 1}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Step labels below circles */}
      <div className="flex items-start justify-between mt-4">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index;
          const isCurrent = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div
              key={index}
              className="flex flex-col items-center"
              style={{ width: `${100 / totalSteps}%` }}
            >
              <span
                className={`
                  text-xs font-medium text-center transition-colors
                  ${
                    isCurrent
                      ? 'text-[#DAA520]'
                      : isCompleted
                      ? 'text-[#C2B280]'
                      : 'text-[#6B6157]'
                  }
                `}
              >
                Phần {stepNumber + 1}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
