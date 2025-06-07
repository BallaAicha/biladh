import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { APIService } from '../../types/api';
import APIStatistics from '../components/dashboard/APIStatistics';
import ServicesList from '../components/ServicesList';
import { Search, Filter, Sliders, Database, Server, GitBranch, RefreshCw, ChevronDown, X, BarChart2 } from 'lucide-react';

interface APIDashboardProps {
    services: APIService[];
}

const APIDashboard: React.FC<APIDashboardProps> = ({ services }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTrigramme, setSelectedTrigramme] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    // Get unique trigrammes
    const trigrammes = Array.from(new Set(services.map(s => s.trigramme))).sort();

    // Get stats for header
    const totalApis = services.length;
    const productionApis = services.filter(s => s.developmentStatus === 'Production').length;
    const inProgressApis = services.filter(s => s.developmentStatus === 'inProgress').length;

    // Calculate technical health metrics
    const java17MigratedCount = services.filter(s => s.java17Migrated).length;
    const java17MigratedPercentage = totalApis > 0 ? Math.round((java17MigratedCount / totalApis) * 100) : 0;

    const sonarizedCount = services.filter(s => s.sonarized).length;
    const sonarizedPercentage = totalApis > 0 ? Math.round((sonarizedCount / totalApis) * 100) : 0;

    // Calculate documentation metrics
    const documentedCount = services.filter(s => s.isDocumented).length;
    const documentedPercentage = totalApis > 0 ? Math.round((documentedCount / totalApis) * 100) : 0;

    // Calculate integration metrics
    const bridgeCount = services.filter(s => s.bridgeCommunication).length;
    const bridgePercentage = totalApis > 0 ? Math.round((bridgeCount / totalApis) * 100) : 0;

    // Calculate data source usage
    const withRabbitMQ = services.filter(s => s.dataSources?.rabbitMQ).length;
    const withDedicatedDB = services.filter(s => s.dataSources?.dedicatedDB).length;
    const withS3 = services.filter(s => s.dataSources?.s3).length;

    // Calculate criticality distribution
    const criticalityMap = services.reduce((acc, service) => {
        const criticality = service.criticality || 'Non définie';
        acc[criticality] = (acc[criticality] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const highCriticalityCount = criticalityMap['Haute'] || 0;
    const mediumCriticalityCount = criticalityMap['Moyenne'] || 0;
    const lowCriticalityCount = criticalityMap['Basse'] || 0;

    // Calculate connectivity metrics
    const avgConsumers = services.reduce((sum, service) => sum + (service.clientConsumers?.length || 0), 0) / (totalApis || 1);
    const avgConsumedBy = services.reduce((sum, service) => sum + (service.consumedBy?.length || 0), 0) / (totalApis || 1);
    const avgConsumes = services.reduce((sum, service) => sum + (service.consumes?.length || 0), 0) / (totalApis || 1);

    // Filter services
    const filteredServices = services.filter(service => {
        const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.trigramme.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.description?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesTrigramme = !selectedTrigramme || service.trigramme === selectedTrigramme;
        const matchesStatus = !selectedStatus || service.developmentStatus === selectedStatus;

        return matchesSearch && matchesTrigramme && matchesStatus;
    });

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    // Handle filter toggle
    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    // Clear all filters
    const clearFilters = () => {
        setSelectedTrigramme('');
        setSelectedStatus('');
        setSearchTerm('');
    };

    // Check if any filter is active
    const isFilterActive = selectedTrigramme !== '' || selectedStatus !== '' || searchTerm !== '';

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            {/* Header with background */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <div className="container mx-auto px-4 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <h1 className="text-4xl font-bold mb-2">Dashboard APIs</h1>
                        <p className="text-indigo-100 text-lg mb-8">
                            Vue d'ensemble et gestion des APIs de la plateforme
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            <motion.div 
                                variants={itemVariants}
                                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                            >
                                <div className="flex items-center mb-3">
                                    <div className="p-2 bg-blue-500/30 rounded-lg mr-3">
                                        <Server className="w-5 h-5 text-blue-300" />
                                    </div>
                                    <p className="text-white/80 font-medium">Santé Technique</p>
                                </div>
                                <div className="space-y-2">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-white/70">Java 17</span>
                                            <span className="text-white/90 font-medium">{java17MigratedPercentage}%</span>
                                        </div>
                                        <div className="w-full bg-white/10 rounded-full h-1.5">
                                            <div className="bg-blue-400 h-1.5 rounded-full" style={{ width: `${java17MigratedPercentage}%` }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-white/70">Sonarized</span>
                                            <span className="text-white/90 font-medium">{sonarizedPercentage}%</span>
                                        </div>
                                        <div className="w-full bg-white/10 rounded-full h-1.5">
                                            <div className="bg-blue-400 h-1.5 rounded-full" style={{ width: `${sonarizedPercentage}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div 
                                variants={itemVariants}
                                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                            >
                                <div className="flex items-center mb-3">
                                    <div className="p-2 bg-purple-500/30 rounded-lg mr-3">
                                        <Database className="w-5 h-5 text-purple-300" />
                                    </div>
                                    <p className="text-white/80 font-medium">Sources de Données</p>
                                </div>
                                <div className="grid grid-cols-3 gap-2 text-center">
                                    <div className="bg-white/10 rounded-lg p-2">
                                        <p className="text-white/70 text-xs mb-1">RabbitMQ</p>
                                        <p className="text-xl font-bold text-white">{withRabbitMQ}</p>
                                        <p className="text-white/60 text-xs">{Math.round((withRabbitMQ / totalApis) * 100)}%</p>
                                    </div>
                                    <div className="bg-white/10 rounded-lg p-2">
                                        <p className="text-white/70 text-xs mb-1">DB Dédiée</p>
                                        <p className="text-xl font-bold text-white">{withDedicatedDB}</p>
                                        <p className="text-white/60 text-xs">{Math.round((withDedicatedDB / totalApis) * 100)}%</p>
                                    </div>
                                    <div className="bg-white/10 rounded-lg p-2">
                                        <p className="text-white/70 text-xs mb-1">S3</p>
                                        <p className="text-xl font-bold text-white">{withS3}</p>
                                        <p className="text-white/60 text-xs">{Math.round((withS3 / totalApis) * 100)}%</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div 
                                variants={itemVariants}
                                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                            >
                                <div className="flex items-center mb-3">
                                    <div className="p-2 bg-green-500/30 rounded-lg mr-3">
                                        <GitBranch className="w-5 h-5 text-green-300" />
                                    </div>
                                    <p className="text-white/80 font-medium">Connectivité</p>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-white/70 text-sm">Consommateurs</span>
                                        <span className="text-white font-medium">{avgConsumers.toFixed(1)} moy.</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-white/70 text-sm">Consommé par</span>
                                        <span className="text-white font-medium">{avgConsumedBy.toFixed(1)} moy.</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-white/70 text-sm">Bridge Comm.</span>
                                        <span className="text-white font-medium">{bridgeCount} ({bridgePercentage}%)</span>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div 
                                variants={itemVariants}
                                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                            >
                                <div className="flex items-center mb-3">
                                    <div className="p-2 bg-amber-500/30 rounded-lg mr-3">
                                        <Filter className="w-5 h-5 text-amber-300" />
                                    </div>
                                    <p className="text-white/80 font-medium">Documentation & Criticité</p>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-white/70">Documenté</span>
                                            <span className="text-white/90 font-medium">{documentedPercentage}%</span>
                                        </div>
                                        <div className="w-full bg-white/10 rounded-full h-1.5">
                                            <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: `${documentedPercentage}%` }}></div>
                                        </div>
                                    </div>
                                    <div className="pt-1">
                                        <p className="text-white/70 text-sm mb-2">Criticité</p>
                                        <div className="grid grid-cols-3 gap-2 text-center">
                                            <div className="bg-white/10 rounded-lg p-1">
                                                <p className="text-white/70 text-xs">Haute</p>
                                                <p className="text-lg font-bold text-red-300">{highCriticalityCount}</p>
                                            </div>
                                            <div className="bg-white/10 rounded-lg p-1">
                                                <p className="text-white/70 text-xs">Moyenne</p>
                                                <p className="text-lg font-bold text-amber-300">{mediumCriticalityCount}</p>
                                            </div>
                                            <div className="bg-white/10 rounded-lg p-1">
                                                <p className="text-white/70 text-xs">Basse</p>
                                                <p className="text-lg font-bold text-green-300">{lowCriticalityCount}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Search bar in header */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className={`relative bg-white rounded-full shadow-lg transition-all duration-300 ${isSearchFocused ? 'ring-4 ring-indigo-300' : ''}`}
                        >
                            <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${isSearchFocused ? 'text-indigo-600' : 'text-neutral-400'}`} />
                            <input
                                type="text"
                                placeholder="Rechercher une API par nom, trigramme ou description..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setIsSearchFocused(false)}
                                className="w-full pl-12 pr-4 py-4 rounded-full focus:outline-none text-neutral-800"
                            />
                            {searchTerm && (
                                <button 
                                    onClick={() => setSearchTerm('')}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 space-y-8">
                {/* Statistiques */}
                <APIStatistics services={services} />

                {/* Filtres avancés */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden"
                >
                    <div className="p-4 md:p-6 border-b border-neutral-100 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <Filter className="w-5 h-5 text-indigo-600" />
                            <h3 className="font-semibold text-neutral-800">Filtres avancés</h3>
                        </div>

                        <div className="flex items-center gap-3">

                            <button 
                                onClick={toggleFilter}
                                className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
                            >
                                <Sliders className="w-4 h-4" />
                                <span>Filtrer</span>
                                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isFilterActive && (
                                <button 
                                    onClick={clearFilters}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                    <span>Réinitialiser</span>
                                </button>
                            )}
                        </div>
                    </div>

                    <AnimatePresence>
                        {isFilterOpen && (
                            <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-neutral-50">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">Trigramme</label>
                                        <select
                                            value={selectedTrigramme}
                                            onChange={(e) => setSelectedTrigramme(e.target.value)}
                                            className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        >
                                            <option value="">Tous les trigrammes</option>
                                            {trigrammes.map(trigramme => (
                                                <option key={trigramme} value={trigramme}>{trigramme}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">Statut</label>
                                        <select
                                            value={selectedStatus}
                                            onChange={(e) => setSelectedStatus(e.target.value)}
                                            className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        >
                                            <option value="">Tous les statuts</option>
                                            <option value="Production">Production</option>
                                            <option value="inProgress">En développement</option>
                                        </select>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Résultats de recherche */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white rounded-xl shadow-lg border border-neutral-200 p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-xl font-semibold text-neutral-800 flex items-center gap-2">
                                <Database className="w-5 h-5 text-indigo-600" />
                                <span>Résultats</span>
                            </h3>
                            <p className="text-neutral-500 mt-1">
                                {filteredServices.length} API{filteredServices.length !== 1 ? 's' : ''} trouvée{filteredServices.length !== 1 ? 's' : ''}
                                {isFilterActive && ' avec les filtres appliqués'}
                            </p>
                        </div>

                    </div>

                    {/* Liste des APIs */}
                    <ServicesList
                        services={filteredServices}
                        selectedService={null}
                        onSelectService={() => {}}
                    />

                    {filteredServices.length === 0 && (
                        <motion.div 
                            variants={itemVariants}
                            className="text-center py-12"
                        >
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-neutral-100 rounded-full mb-4">
                                <Search className="w-8 h-8 text-neutral-400" />
                            </div>
                            <h4 className="text-lg font-medium text-neutral-800 mb-2">Aucune API trouvée</h4>
                            <p className="text-neutral-500 max-w-md mx-auto">
                                Aucune API ne correspond à vos critères de recherche. Essayez de modifier vos filtres ou votre terme de recherche.
                            </p>
                            {isFilterActive && (
                                <button 
                                    onClick={clearFilters}
                                    className="mt-4 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors inline-flex items-center gap-2"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    <span>Réinitialiser les filtres</span>
                                </button>
                            )}
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default APIDashboard;
