import { useState, useEffect } from 'react';
import axios from 'axios';
import Projet from './Projet';
import AjouterProjet from './AjouterProjet';
import DetaillerProjet from './DetaillerProjet'; // NOUVEL IMPORT

export default function Dossier() {
    const [projets, setProjets] = useState([]);
    const [afficherFormulaire, setAfficherFormulaire] = useState(false);
    const [projetSelectionne, setProjetSelectionne] = useState(null); // NOUVEAU STATE

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

    // NOUVELLE FONCTION : Éditer un projet dans la DB (Requête PUT)
    const modifierProjet = async (projetModifie) => {
        try {
            const response = await axios.put(`http://localhost:3001/projets/${projetModifie.id}`, projetModifie);
            // On met à jour le projet dans notre liste React
            setProjets(projets.map(p => p.id === projetModifie.id ? response.data : p));
            // On met à jour le projet sélectionné pour que l'affichage se rafraîchisse
            setProjetSelectionne(response.data);
        } catch (error) {
            console.error("Erreur de modification:", error);
        }
    };

    return (
        <div className="min-h-screen bg-violet-50 p-8">
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-bold text-violet-800 mb-2">Mon Portfolio Alia</h1>
                <p className="text-orange-600 font-medium">Développement & Innovation</p>
            </header>

            <div className="max-w-6xl mx-auto">
                {/* SI UN PROJET EST SÉLECTIONNÉ : ON AFFICHE LES DÉTAILS */}
                {projetSelectionne ? (
                    <DetaillerProjet
                        projet={projetSelectionne}
                        onCancel={() => setProjetSelectionne(null)}
                        onEdit={modifierProjet}
                    />
                ) : (
                    {/* SINON : ON AFFICHE LA LISTE NORMALE */ }
                    < div className="bg-white rounded-2xl shadow-lg p-8 border border-violet-100">
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
                            onShowDetails={setProjetSelectionne} // On passe la fonction ici !
                        />
                    ))}
                </div>
            </div>
        )}
        </div>
    </div >
  );
}

