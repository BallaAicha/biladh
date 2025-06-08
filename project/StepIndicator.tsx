import React from "react";
import { CheckCircle2 } from "lucide-react";
import clsx from "clsx";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[];
}

/**
 * Component for displaying the current step in a multi-step process
 */
export const StepIndicator: React.FC<StepIndicatorProps> = ({ 
  currentStep, 
  totalSteps,
  stepLabels = ["Infos", "Structure", "Dépendances"] 
}) => {
  return (
    <div className="flex items-center justify-center mb-10">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center">
            <div
              className={clsx(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                index < currentStep
                  ? "bg-blue-600 text-white"
                  : index === currentStep
                  ? "bg-blue-100 border-2 border-blue-600 text-blue-600"
                  : "bg-gray-100 text-gray-400"
              )}
            >
              {index < currentStep ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <span className="font-semibold">{index + 1}</span>
              )}
            </div>
            <span
              className={clsx(
                "text-xs mt-2 font-medium",
                index === currentStep ? "text-blue-600" : "text-gray-500"
              )}
            >
              {stepLabels[index] || `Step ${index + 1}`}
            </span>
          </div>
          {index < totalSteps - 1 && (
            <div
              className={clsx(
                "h-0.5 w-12 mx-2",
                index < currentStep ? "bg-blue-600" : "bg-gray-200"
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;