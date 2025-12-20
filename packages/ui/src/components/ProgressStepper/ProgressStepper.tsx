import * as React from 'react';
import { cn } from '../../utils';

export interface ProgressStep {
  id: string;
  label: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed' | 'error';
}

export interface ProgressStepperProps {
  steps: ProgressStep[];
  currentStep?: number;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const ProgressStepper: React.FC<ProgressStepperProps> = ({
  steps,
  currentStep = 0,
  orientation = 'horizontal',
  className,
}) => {
  const getStepIcon = (status: ProgressStep['status'], index: number) => {
    if (status === 'completed') {
      return (
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      );
    }

    if (status === 'error') {
      return (
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      );
    }

    if (status === 'in-progress') {
      return <div className="w-2 h-2 bg-white rounded-full animate-pulse" />;
    }

    return <span className="text-sm font-semibold text-white">{index + 1}</span>;
  };

  const getStepColor = (status: ProgressStep['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 border-green-500';
      case 'in-progress':
        return 'bg-blue-500 border-blue-500';
      case 'error':
        return 'bg-red-500 border-red-500';
      default:
        return 'bg-muted border-border';
    }
  };

  const getTextColor = (status: ProgressStep['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-700';
      case 'in-progress':
        return 'text-blue-700';
      case 'error':
        return 'text-red-700';
      default:
        return 'text-muted-foreground';
    }
  };

  if (orientation === 'vertical') {
    return (
      <div className={cn('space-y-4', className)}>
        {steps.map((step, index) => (
          <div key={step.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors',
                  getStepColor(step.status),
                )}
              >
                {getStepIcon(step.status, index)}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'w-0.5 h-12 my-2 transition-colors',
                    steps[index + 1].status !== 'pending' ? 'bg-blue-500' : 'bg-border',
                  )}
                />
              )}
            </div>
            <div className="flex-1 pt-1">
              <h4
                className={cn('font-semibold text-sm transition-colors', getTextColor(step.status))}
              >
                {step.label}
              </h4>
              {step.description && (
                <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center flex-1">
              <div
                className={cn(
                  'w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors',
                  getStepColor(step.status),
                )}
              >
                {getStepIcon(step.status, index)}
              </div>
              <div className="mt-2 text-center">
                <p
                  className={cn(
                    'text-xs font-semibold transition-colors',
                    getTextColor(step.status),
                  )}
                >
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'h-0.5 flex-1 transition-colors mx-2',
                  steps[index + 1].status !== 'pending' ? 'bg-blue-500' : 'bg-border',
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

ProgressStepper.displayName = 'ProgressStepper';

export default ProgressStepper;
