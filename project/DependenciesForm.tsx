import React from "react";
import { Package, Terminal, Settings, AlertCircle } from "lucide-react";
import { ProjectRequest } from "../../types/project";

interface DependencyOption {
  key: string;
  label: string;
}

interface DependenciesFormProps {
  formData: ProjectRequest;
  dependencies: Record<string, boolean>;
  onDependencyToggle: (dep: string) => void;
}

/**
 * Form component for the third step of project generation (dependencies selection)
 */
export const DependenciesForm: React.FC<DependenciesFormProps> = ({
  formData,
  dependencies,
  onDependencyToggle,
}) => {
  // List of available dependencies
  const AVAILABLE_DEPENDENCIES: DependencyOption[] = [
    { key: "swagger", label: "Swagger / OpenAPI" },
    { key: "testcontainers", label: "Testcontainers" },
    { key: "liquibase", label: "Liquibase" },
    { key: "security", label: "Spring Security" },
    { key: "actuator", label: "Spring Actuator" },
    { key: "graphql", label: "Spring GraphQL" },
    { key: "mapstruct", label: "MapStruct" },
    { key: "jpa", label: "Spring Data JPA" },
    { key: "vault", label: "Spring Vault" },
    { key: "validation", label: "Validation" },
    { key: "lombok", label: "Lombok" },
    { key: "web", label: "Spring Web" },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <p className="text-gray-700 mb-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
        <AlertCircle className="inline w-5 h-5 text-blue-600 mr-2 relative -top-0.5" />
        Sélectionnez les dépendances supplémentaires pour votre projet.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
          <h3 className="font-semibold text-lg text-gray-800 mb-4">
            Incluses par défaut
          </h3>
          <div className="space-y-3">
            <div className="flex items-center text-gray-700">
              <div className="bg-green-100 p-2 rounded-lg mr-3">
                <Package className="w-4 h-4 text-green-600" />
              </div>
              <span>Plateform & Foundation</span>
            </div>
            <div className="flex items-center text-gray-700">
              <div className="bg-green-100 p-2 rounded-lg mr-3">
                <Terminal className="w-4 h-4 text-green-600" />
              </div>
              <span>SGABS Starter</span>
            </div>
          </div>
        </div>

        <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
          <h3 className="font-semibold text-lg text-gray-800 mb-4">
            Dépendances optionnelles
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {AVAILABLE_DEPENDENCIES.map((dep) => (
              <div
                key={dep.key}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100"
              >
                <input
                  type="checkbox"
                  id={dep.key}
                  checked={dependencies[dep.key] || false}
                  onChange={() => onDependencyToggle(dep.key)}
                  className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor={dep.key} className="ml-3 cursor-pointer">
                  {dep.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
        <h3 className="font-semibold text-gray-800 flex items-center mb-3">
          <Settings className="w-5 h-5 mr-2 text-blue-600" />
          Configuration générée
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-gray-500">Nom du projet</span>
            <p className="font-medium">{formData.projectName || "Non défini"}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Group ID</span>
            <p className="font-medium">{formData.groupId || "Non défini"}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Version Java</span>
            <p className="font-medium">Java {formData.javaVersion}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Version Gradle</span>
            <p className="font-medium">Gradle {formData.gradleVersion}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Version du projet</span>
            <p className="font-medium">{formData.version || "1.0.0"}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Package de base</span>
            <p className="font-medium">{formData.basePackage || "com.socgen.unibank.services"}</p>
          </div>
          <div className="sm:col-span-2">
            <span className="text-sm text-gray-500">Modules</span>
            <p className="font-medium">
              {Object.entries(dependencies)
                .filter(([, isEnabled]) => isEnabled)
                .map(([name]) => name.charAt(0).toUpperCase() + name.slice(1))
                .join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DependenciesForm;
