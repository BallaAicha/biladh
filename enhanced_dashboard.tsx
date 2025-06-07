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

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <motion.div 
                                variants={itemVariants}
                                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 flex items-center"
                            >
                                <div className="p-3 bg-white/20 rounded-lg mr-4">
                                    <Server className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-white/70 text-sm">Total APIs</p>
                                    <p className="text-2xl font-bold">{totalApis}</p>
                                </div>
                            </motion.div>

                            <motion.div 
                                variants={itemVariants}
                                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 flex items-center"
                            >
                                <div className="p-3 bg-emerald-500/30 rounded-lg mr-4">
                                    <GitBranch className="w-6 h-6 text-emerald-300" />
                                </div>
                                <div>
                                    <p className="text-white/70 text-sm">En Production</p>
                                    <p className="text-2xl font-bold">{productionApis}</p>
                                </div>
                            </motion.div>

                            <motion.div 
                                variants={itemVariants}
                                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 flex items-center"
                            >
                                <div className="p-3 bg-amber-500/30 rounded-lg mr-4">
                                    <RefreshCw className="w-6 h-6 text-amber-300" />
                                </div>
                                <div>
                                    <p className="text-white/70 text-sm">En Développement</p>
                                    <p className="text-2xl font-bold">{inProgressApis}</p>
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
