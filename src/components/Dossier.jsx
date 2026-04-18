import { useState, useEffect } from 'react';
import axios from 'axios';
import Projet from './Projet';
import AjouterProjet from './AjouterProjet';
import DetaillerProjet from './DetaillerProjet';

export default function Dossier() {
    const [projets, setProjets] = useState([]);
    const [afficherFormulaire, setAfficherFormulaire] = useState(false);
    const [projetSelectionne, setProjetSelectionne] = useState(null);

    useEffect(() => {
        fetchProjets();
    }, []);

    const fetchProjets = async () => {
        try {
            const response = await axios.get('http://localhost:3001/projets');
            setProjets(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération:", error);
        }
    };

    const supprimerProjet = async (id) => {
        if (window.confirm("Es-tu sûre de vouloir supprimer ce projet ?")) {
            try {
                await axios.delete(`http://localhost:3001/projets/${id}`);
                setProjets(projets.filter((projet) => projet.id !== id));
            } catch (error) {
                console.error("Erreur de suppression:", error);
            }
        }
    };

    const ajouterNouveauProjet = async (nouveauProjet) => {
        try {
            const response = await axios.post('http://localhost:3001/projets', nouveauProjet);
            setProjets([...projets, response.data]);
            setAfficherFormulaire(false);
        } catch (error) {
            console.error("Erreur d'ajout:", error);
        }
    };

    const modifierProjet = async (projetModifie) => {
        try {
            const response = await axios.put(`http://localhost:3001/projets/${projetModifie.id}`, projetModifie);
            setProjets(projets.map(p => p.id === projetModifie.id ? response.data : p));
            setProjetSelectionne(response.data);
        } catch (error) {
            console.error("Erreur de modification:", error);
        }
    };

    return (
        <div className="min-h-screen bg-violet-50 p-8">
            <header className="mb-12 text-center">
                <h1 className="text-5xl font-extrabold text-violet-900 mb-4">Portfolio de Alia</h1>
                <p className="text-orange-600 font-medium text-lg mb-6">Développement, Réseaux & Sécurité Informatique</p>

                {/* Tes liens sociaux */}
                <div className="flex justify-center gap-4">
                    <a
                        href="https://github.com/diagnealia03-cmd/mon-porfolio-react-alia"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-sm flex items-center gap-2"
                    >
                        Mon GitHub
                    </a>
                    <a
                        href="https://www.linkedin.com/in/alia-diagne-29493a3b2"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-sm flex items-center gap-2"
                    >
                        Mon LinkedIn
                    </a>
                </div>
            </header>

            <div className="max-w-6xl mx-auto">
                {projetSelectionne ? (
                    <DetaillerProjet
                        projet={projetSelectionne}
                        onCancel={() => setProjetSelectionne(null)}
                        onEdit={modifierProjet}
                    />
                ) : (
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-violet-100">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-semibold text-violet-700">Mes Projets</h2>
                            {!afficherFormulaire && (
                                <button
                                    onClick={() => setAfficherFormulaire(true)}
                                    className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl transition-colors font-medium shadow-sm"
                                >
                                    + Nouveau Projet
                                </button>
                            )}
                        </div>

                        {afficherFormulaire && (
                            <AjouterProjet
                                onAdd={ajouterNouveauProjet}
                                onCancel={() => setAfficherFormulaire(false)}
                            />
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projets.map((projet) => (
                                <Projet
                                    key={projet.id}
                                    projet={projet}
                                    onDelete={supprimerProjet}
                                    onShowDetails={setProjetSelectionne}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}