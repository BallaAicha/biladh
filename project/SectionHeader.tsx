import React from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

interface SectionHeaderProps {
  title: string;
  icon: React.ElementType;
  expanded: boolean;
  onToggle: () => void;
}

/**
 * Header component for collapsible sections
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  icon: Icon,
  expanded,
  onToggle,
}) => {
  return (
    <div
      className="flex justify-between items-center cursor-pointer py-4 px-1"
      onClick={onToggle}
    >
      <div className="flex items-center">
        <div className="bg-blue-100 p-2 rounded-lg mr-3">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      <div
        className={clsx(
          "w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 transition-transform duration-300",
          expanded && "transform rotate-180"
        )}
      >
        <ChevronDown className="w-5 h-5 text-gray-600" />
      </div>
    </div>
  );
};

export default SectionHeader;