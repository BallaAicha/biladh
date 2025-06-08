
import React, { useState, useEffect } from "react";
import {
    Download,
    Package,
    X,
    CheckCircle2,
    AlertCircle,
    ArrowRight
} from "lucide-react";
import clsx from "clsx";
import { useProjectGeneration } from "../hooks/useProjectGeneration.ts";
import StepIndicator from "../components/project/StepIndicator";
import ProjectInfoForm from "../components/project/ProjectInfoForm";
import ModuleSelectionForm from "../components/project/ModuleSelectionForm";
import DependenciesForm from "../components/project/DependenciesForm";

export function GenerateSpringProject() {
    const { generateAndDownload, isGenerating, error } = useProjectGeneration();

    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        // Basic project information
        projectName: "",
        groupId: "",
        artifactId: "",
        description: "",
        javaVersion: "17",
        gradleVersion: "7.5",

        // Additional fields to match backend
        version: "1.0.0",
        unibankDomainVersion: "3.7.79",
        unibankPlatformVersion: "3.2-95",
        lombokVersion: "1.18.26",
        junitVersion: "5.9.2",
        basePackage: "com.socgen.unibank.services",
        includeSwagger: true,
        includeTestContainers: false,

        // Module selection
        modules: {
            core: true,
            api: true,
            gateways: true
        },

        // Dependencies
        dependencies: {
            platform: true,
            sgabsStarter: true,
            swagger: false,
            testcontainers: false,
            liquibase: false,
            security: false,
            actuator: false,
            graphql: false,
            mapstruct: false,
            jpa: false,
            vault: false,
            validation: false,
            lombok: true,
            web: true
        }
    });

    const [notification, setNotification] = useState<{
        type: "success" | "error" | "info",
        message: string
    } | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            ...(name === 'projectName' ? { artifactId: value } : {})
        }));
    };

    const handleModuleToggle = (module: string) => {
        setFormData(prev => ({
            ...prev,
            modules: {
                ...prev.modules,
                [module]: !prev.modules[module as keyof typeof prev.modules]
            }
        }));
    };

    const handleDependencyToggle = (dep: string) => {
        setFormData(prev => ({
            ...prev,
            dependencies: {
                ...prev.dependencies,
                [dep]: !prev.dependencies[dep as keyof typeof prev.dependencies]
            }
        }));
    };


    const nextStep = () => {
        setCurrentStep(prev => Math.min(prev + 1, 2));
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 0));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const projectRequest = {
            // Basic project information
            projectName: formData.projectName,
            groupId: formData.groupId,
            artifactId: formData.artifactId || formData.projectName,
            description: formData.description,
            javaVersion: formData.javaVersion,
            gradleVersion: formData.gradleVersion,

            // Additional fields to match backend
            version: formData.version,
            unibankDomainVersion: formData.unibankDomainVersion,
            unibankPlatformVersion: formData.unibankPlatformVersion,
            lombokVersion: formData.lombokVersion,
            junitVersion: formData.junitVersion,
            basePackage: formData.basePackage,
            includeSwagger: formData.includeSwagger,
            includeTestContainers: formData.includeTestContainers
        };

        console.log('Submitting project request:', projectRequest);

        const success = await generateAndDownload(projectRequest);

        if (success) {
            setNotification({
                type: "success",
                message: "Projet généré avec succès! Téléchargement en cours..."
            });
        } else {
            setNotification({
                type: "error",
                message: error || "Une erreur est survenue lors de la génération du projet."
            });
        }
    };

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <ProjectInfoForm 
                        formData={formData} 
                        onChange={handleInputChange} 
                    />
                );
            case 1:
                return (
                    <ModuleSelectionForm 
                        modules={formData.modules} 
                        projectName={formData.projectName}
                        groupId={formData.groupId}
                        basePackage={formData.basePackage || "com.socgen.unibank.services"}
                        onModuleToggle={handleModuleToggle}
                    />
                );
            case 2:
                return (
                    <DependenciesForm 
                        formData={formData}
                        dependencies={formData.dependencies}
                        onDependencyToggle={handleDependencyToggle}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4 py-10">
                {notification && (
                    <div className={clsx(
                        "fixed top-5 right-5 p-4 shadow-lg rounded-lg flex items-center justify-between z-50 animate-fade-in-down",
                        notification.type === "success" ? "bg-green-50 border-l-4 border-green-500" :
                            notification.type === "error" ? "bg-red-50 border-l-4 border-red-500" :
                                "bg-blue-50 border-l-4 border-blue-500"
                    )}>
                        <div className="flex items-center">
                            {notification.type === "success" && <CheckCircle2 className="h-6 w-6 text-green-500 mr-3" />}
                            {notification.type === "error" && <AlertCircle className="h-6 w-6 text-red-500 mr-3" />}
                            {notification.type === "info" && <AlertCircle className="h-6 w-6 text-blue-500 mr-3" />}
                            <span className={clsx(
                                notification.type === "success" ? "text-green-800" :
                                    notification.type === "error" ? "text-red-800" :
                                        "text-blue-800"
                            )}>{notification.message}</span>
                        </div>
                        <button
                            onClick={() => setNotification(null)}
                            className="text-gray-400 hover:text-gray-600 ml-4"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                )}

                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-8">
                        <div className="mb-4 flex items-center justify-center">
                            <div className="bg-blue-600 text-white p-3 rounded-lg">
                                <Package className="w-8 h-8" />
                            </div>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
                            Générateur de projet Spring Hexagonal
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Créez rapidement un projet Spring Boot avec architecture hexagonale optimisé et prêt à l'emploi.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <form onSubmit={handleSubmit}>
                            <div className="border-b border-gray-200 bg-gray-50 p-6">
                                <StepIndicator currentStep={currentStep} totalSteps={3} />
                            </div>

                            <div className="p-6 md:p-10">
                                {renderStep()}
                            </div>

                            <div className="bg-gray-50 p-6 flex justify-between items-center">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    disabled={currentStep === 0}
                                    className={clsx(
                                        "px-6 py-2.5 rounded-lg font-medium transition-all",
                                        currentStep === 0
                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                                    )}
                                >
                                    Précédent
                                </button>

                                <div>
                                    {currentStep < 2 ? (
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all flex items-center"
                                        >
                                            Suivant
                                            <ArrowRight className="ml-2 w-4 h-4" />
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            disabled={isGenerating || !formData.projectName || !formData.groupId}
                                            className={clsx(
                                                "px-6 py-2.5 rounded-lg font-medium transition-all flex items-center",
                                                (isGenerating || !formData.projectName || !formData.groupId)
                                                    ? "bg-blue-400 text-white cursor-not-allowed"
                                                    : "bg-blue-600 text-white hover:bg-blue-700"
                                            )}
                                        >
                                            {isGenerating ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Génération en cours...
                                                </>
                                            ) : (
                                                <>
                                                    <Download className="w-5 h-5 mr-2" />
                                                    Générer le projet
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="mt-8 text-center text-sm text-gray-500 flex items-center justify-center">
                        <AlertCircle className="w-4 h-4 mr-2 text-blue-500" />
                        Les projets générés incluent Plateform et suivent les meilleures pratiques des Normes dev de SGABS.
                    </div>
                </div>
            </div>
        </div>
    );
}
