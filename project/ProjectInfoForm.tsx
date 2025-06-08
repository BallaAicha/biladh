import React from "react";
import { FileCode, Code2, ChevronDown } from "lucide-react";
import { ProjectRequest } from "../../types/project";

interface ProjectInfoFormProps {
  formData: ProjectRequest;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

/**
 * Form component for the first step of project generation (basic info)
 */
export const ProjectInfoForm: React.FC<ProjectInfoFormProps> = ({ formData, onChange }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-2">
            Nom du projet <span className="text-blue-600">*</span>
          </label>
          <div className="relative">
            <input
              id="projectName"
              name="projectName"
              type="text"
              value={formData.projectName}
              onChange={onChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 shadow-sm"
              placeholder="mon-projet-spring"
              required
              pattern="^[a-z][a-z0-9-]*$"
              title="Le nom du projet doit commencer par une lettre minuscule et ne contenir que des lettres minuscules, des chiffres et des tirets"
            />
            <FileCode className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Format recommandé: lettres minuscules, chiffres et tirets (ex: mon-projet-api)
          </p>
        </div>

        <div>
          <label htmlFor="groupId" className="block text-sm font-medium text-gray-700 mb-2">
            Group ID <span className="text-blue-600">*</span>
          </label>
          <div className="relative">
            <input
              id="groupId"
              name="groupId"
              type="text"
              value={formData.groupId}
              onChange={onChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 shadow-sm"
              placeholder="com.socgen.unibank.services"
              required
              pattern="^[a-z][a-z0-9_\.]*[a-z0-9]$"
              title="Le Group ID doit suivre le format de package Java (ex: com.example.project)"
            />
            <Code2 className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Format recommandé: com.socgen.unibank.services.{formData.projectName?.replace(/-/g, '.')}
          </p>
        </div>
      </div>

      <div>
        <label htmlFor="artifactId" className="block text-sm font-medium text-gray-700 mb-2">
          Artifact ID <span className="text-blue-600">*</span>
        </label>
        <div className="relative">
          <input
            id="artifactId"
            name="artifactId"
            type="text"
            value={formData.artifactId || formData.projectName}
            onChange={onChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 shadow-sm"
            placeholder="mon-projet-spring"
            required
          />
          <FileCode className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Par défaut, identique au nom du projet
        </p>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={onChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 shadow-sm"
          rows={3}
          placeholder="Description détaillée du projet (optionnelle)"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="javaVersion" className="block text-sm font-medium text-gray-700 mb-2">
            Version de Java
          </label>
          <div className="relative">
            <select
              id="javaVersion"
              name="javaVersion"
              value={formData.javaVersion}
              onChange={onChange}
              className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white shadow-sm appearance-none"
            >
              <option value="17">Java 17 (LTS)</option>
              <option value="11">Java 11 (LTS)</option>
              <option value="8">Java 8 (Legacy)</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label htmlFor="gradleVersion" className="block text-sm font-medium text-gray-700 mb-2">
            Version de Gradle
          </label>
          <div className="relative">
            <select
              id="gradleVersion"
              name="gradleVersion"
              value={formData.gradleVersion}
              onChange={onChange}
              className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white shadow-sm appearance-none"
            >
              <option value="7.5">Gradle 7.5</option>
              <option value="7.4">Gradle 7.4</option>
              <option value="7.3">Gradle 7.3</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="basePackage" className="block text-sm font-medium text-gray-700 mb-2">
            Package de base
          </label>
          <div className="relative">
            <input
              id="basePackage"
              name="basePackage"
              type="text"
              value={formData.basePackage || "com.socgen.unibank.services"}
              onChange={onChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 shadow-sm"
              placeholder="com.socgen.unibank.services"
            />
            <Code2 className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Package de base pour les classes générées
          </p>
        </div>

        <div>
          <label htmlFor="version" className="block text-sm font-medium text-gray-700 mb-2">
            Version du projet
          </label>
          <div className="relative">
            <input
              id="version"
              name="version"
              type="text"
              value={formData.version || "1.0.0"}
              onChange={onChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 shadow-sm"
              placeholder="1.0.0"
              pattern="^\d+\.\d+\.\d+(-SNAPSHOT)?$"
              title="Format de version: X.Y.Z ou X.Y.Z-SNAPSHOT"
            />
            <FileCode className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Format recommandé: X.Y.Z (ex: 1.0.0)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="unibankDomainVersion" className="block text-sm font-medium text-gray-700 mb-2">
            Version Unibank Domain
          </label>
          <div className="relative">
            <input
              id="unibankDomainVersion"
              name="unibankDomainVersion"
              type="text"
              value={formData.unibankDomainVersion || "3.7.79"}
              onChange={onChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 shadow-sm"
              placeholder="3.7.79"
            />
            <FileCode className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label htmlFor="unibankPlatformVersion" className="block text-sm font-medium text-gray-700 mb-2">
            Version Unibank Platform
          </label>
          <div className="relative">
            <input
              id="unibankPlatformVersion"
              name="unibankPlatformVersion"
              type="text"
              value={formData.unibankPlatformVersion || "3.2-95"}
              onChange={onChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 shadow-sm"
              placeholder="3.2-95"
            />
            <FileCode className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfoForm;