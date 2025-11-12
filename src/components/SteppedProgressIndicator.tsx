import {Check} from 'lucide-react';

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
            {/* Container for circles and labels */}
            <div className="flex items-start justify-between relative">
                {/* Background line connecting all steps */}
                <div className="absolute left-0 right-0 top-7 h-0.5 bg-muted z-0"/>

                {/* Progress line (shows completed portion) */}
                <div
                    className="absolute left-0 top-7 h-0.5 bg-primary z-0 transition-all duration-500"
                    style={{
                        width: `${((currentStep) / (totalSteps - 1)) * 100}%`,
                    }}
                />

                {/* Step circles with labels below */}
                {Array.from({length: totalSteps}, (_, index) => {
                    const stepNumber = index;
                    const isCompleted = stepNumber < currentStep;
                    const isCurrent = stepNumber === currentStep;

                    return (
                        <div key={index} className="flex flex-col items-center gap-3" style={{flex: 1}}>
                            {/* Circle button */}
                            <button
                                onClick={() => onStepClick?.(stepNumber)}
                                className={`
                  relative z-10 flex items-center justify-center rounded-full
                  transition-all duration-300 font-semibold
                  ${
                                    isCurrent
                                        ? 'w-14 h-14 bg-primary text-primary-foreground shadow-lg shadow-primary/50 scale-110 border-2 border-primary'
                                        : isCompleted
                                            ? 'w-12 h-12 bg-primary text-primary-foreground shadow-md hover:shadow-lg hover:shadow-primary/40'
                                            : 'w-12 h-12 bg-muted text-muted-foreground border border-border'
                                }
                  ${onStepClick ? 'cursor-pointer hover:scale-105' : 'cursor-default'}
                  disabled:cursor-not-allowed
                `}
                                aria-label={`Bước ${stepNumber + 1}`}
                                aria-current={isCurrent ? 'step' : undefined}
                            >
                                {isCompleted ? (
                                    <Check className="w-6 h-6 stroke-[3]"/>
                                ) : (
                                    <span className="text-base">{stepNumber + 1}</span>
                                )}
                            </button>

                            {/* Label directly below circle */}
                            <span
                                className={`
                  text-xs font-medium text-center transition-colors whitespace-nowrap
                  ${
                                    isCurrent
                                        ? 'text-primary font-bold'
                                        : isCompleted
                                            ? 'text-foreground'
                                            : 'text-muted-foreground'
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
