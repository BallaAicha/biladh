import React from "react";
import { Check } from "lucide-react";
import clsx from "clsx";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  selected: boolean;
  onClick: () => void;
}

/**
 * Card component for selecting modules in the project generation form
 */
export const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  description,
  icon: Icon,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "relative p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer",
        "transform hover:scale-[1.02] hover:shadow-md",
        selected
          ? "border-blue-600 bg-blue-50/50"
          : "border-gray-200 hover:border-gray-300"
      )}
    >
      <div
        className={clsx(
          "absolute -right-2 -top-2 w-6 h-6 rounded-full",
          selected ? "bg-blue-600" : "bg-gray-200"
        )}
      >
        {selected && <Check className="w-4 h-4 text-white absolute top-1 left-1" />}
      </div>
      <div className="flex items-start">
        <div
          className={clsx(
            "p-3 rounded-lg mr-4",
            selected ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"
          )}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;