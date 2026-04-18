import { useState, useEffect } from 'react';
import axios from 'axios';
import Projet from './Projet'; // On importe le nouveau composant !

export default function Dossier() {
    const [projets, setProjets] = useState([]);

    useEffect(() => {
        fetchProjets();
    }, []);

    const fetchProjets = async () => {
        try {
            const response = await axios.get('http://localhost:3001/projets');
            setProjets(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des projets:", error);
        }
    };

    // NOUVEAU : Fonction de suppression
    const supprimerProjet = async (id) => {
        // Demander confirmation avant de supprimer (bonne pratique)
        if (window.confirm("Es-tu sûre de vouloir supprimer ce projet ?")) {
            try {
                // 1. Supprimer côté serveur (json-server)
                await axios.delete(`http://localhost:3001/projets/${id}`);
                // 2. Mettre à jour l'affichage côté React (en filtrant le projet supprimé)
                setProjets(projets.filter((projet) => projet.id !== id));
            } catch (error) {
                console.error("Erreur lors de la suppression:", error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-violet-50 p-8">
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-bold text-violet-800 mb-2">Mon Portfolio Alia</h1>
                <p className="text-orange-600 font-medium">Développement & Innovation</p>
            </header>

            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-violet-100">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-semibold text-violet-700">Mes Projets</h2>
                    <button className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl transition-colors font-medium shadow-sm">
                        + Nouveau Projet
                    </button>
                </div>

                {/* NOUVEAU : On utilise une grille pour afficher les composants Projet */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projets.map((projet) => (
                        <Projet
                            key={projet.id}
                            projet={projet}
                            onDelete={supprimerProjet}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}