import React, { useState } from "react";
import { Box, Layers, Code2, FileCode, AlertCircle } from "lucide-react";
import ModuleCard from "./ModuleCard";
import SectionHeader from "./SectionHeader";

interface ModuleSelectionFormProps {
  modules: {
    api: boolean;
    core: boolean;
    gateways: boolean;
  };
  projectName: string;
  groupId: string;
  basePackage: string;
  onModuleToggle: (module: string) => void;
}

/**
 * Form component for the second step of project generation (module selection)
 */
export const ModuleSelectionForm: React.FC<ModuleSelectionFormProps> = ({
  modules,
  projectName,
  groupId,
  basePackage,
  onModuleToggle,
}) => {
  const [showPreview, setShowPreview] = useState(false);

  // Extract the company name from the groupId (e.g., "socgen" from "com.socgen.unibank")
  const companyName = groupId?.split('.')[1] || "example";

  // Format the base package for display in the preview
  const formattedBasePackage = basePackage || `com.${companyName}.unibank.services`;

  return (
    <div className="space-y-8 animate-fadeIn">
      <p className="text-gray-700 mb-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
        <AlertCircle className="inline w-5 h-5 text-blue-600 mr-2 relative -top-0.5" />
        Sélectionnez les modules à inclure dans votre architecture hexagonale.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ModuleCard
          title="Core Module"
          description="Logique métier et entités de domaine. Contient les ports et la définition des interfaces."
          icon={Box}
          selected={modules.core}
          onClick={() => onModuleToggle("core")}
        />

        <ModuleCard
          title="API Module"
          description="Contrôleurs REST et adaptateurs primaires. Gestion des entrées du système."
          icon={Layers}
          selected={modules.api}
          onClick={() => onModuleToggle("api")}
        />

        <ModuleCard
          title="Gateways Module"
          description="Services et adaptateurs secondaires. Implémentations et sorties du système."
          icon={Code2}
          selected={modules.gateways}
          onClick={() => onModuleToggle("gateways")}
        />
      </div>

      <div className="rounded-xl overflow-hidden border border-gray-200">
        <SectionHeader
          title="Prévisualisation de la structure"
          icon={FileCode}
          expanded={showPreview}
          onToggle={() => setShowPreview(!showPreview)}
        />

        {showPreview && (
          <div className="p-5 bg-gray-900 text-gray-100 font-mono rounded-b-xl overflow-x-auto text-sm">
            <pre className="whitespace-pre">
{`${projectName || "my-project"}/
├── build.gradle.kts
├── settings.gradle.kts
├── gradle.properties
├── README.md
├── .gitignore
${modules.core ? `├── ${projectName}-core/
│   ├── build.gradle.kts
│   ├── lombok.config
│   └── src/
│       ├── main/java/${formattedBasePackage.replace(/\./g, '/')}/core
│       │   └── usecases/
│       │       └── CreateSgabsHelloWorldImpl.java
│       └── test/java/
` : ''}
${modules.api ? `├── ${projectName}-api/
│   ├── build.gradle.kts
│   └── src/
│       ├── main/java/${formattedBasePackage.replace(/\./g, '/')}/api
│       │   ├── model/
│       │   │   ├── SgabsHelloworldRequest.java
│       │   │   └── SgabsHelloworldResponse.java
│       │   ├── usecases/
│       │   │   └── CreateSgabsHelloWorld.java
│       │   └── ${projectName.charAt(0).toUpperCase() + projectName.slice(1).replace(/-([a-z])/g, (g) => g[1].toUpperCase())}API.java
│       └── test/java/
` : ''}
${modules.gateways ? `└── ${projectName}-gateways/
    ├── build.gradle.kts
    └── src/
        ├── main/java/${formattedBasePackage.replace(/\./g, '/')}/
        │   ├── Service${projectName.charAt(0).toUpperCase() + projectName.slice(1).replace(/-([a-z])/g, (g) => g[1].toUpperCase())}.java
        │   └── gateway/
        │       ├── ${projectName.charAt(0).toUpperCase() + projectName.slice(1).replace(/-([a-z])/g, (g) => g[1].toUpperCase())}BeansFactory.java
        │       └── inbound/
        │           └── ${projectName.charAt(0).toUpperCase() + projectName.slice(1).replace(/-([a-z])/g, (g) => g[1].toUpperCase())}Endpoint.java
        ├── main/resources/
        │   ├── application.yml
        │   ├── application-local.yml
        │   ├── application-test.yml
        │   ├── application-vault.yml
        │   └── security/
        │       ├── unibank-dev-jwk-pub.json
        │       ├── unibank-hf2-jwk-pub.json
        │       ├── unibank-hf-jwk-pub.json
        │       └── unibank-ht-jwk-pub.json
        └── test/java/` : ''}`}
            </pre>
          </div>
        )}
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <h4 className="font-medium text-yellow-800 mb-2 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          Structure hexagonale
        </h4>
        <p className="text-sm text-yellow-700">
          Cette structure suit les principes de l'architecture hexagonale (ports et adaptateurs) pour une meilleure séparation des préoccupations.
          Le module <strong>core</strong> contient la logique métier, le module <strong>api</strong> définit les interfaces (ports), et le module <strong>gateways</strong> fournit les implémentations (adaptateurs).
        </p>
      </div>
    </div>
  );
};

export default ModuleSelectionForm;
