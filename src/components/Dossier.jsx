import { useState, useEffect } from 'react';
import axios from 'axios';
import Projet from './Projet';
import AjouterProjet from './AjouterProjet'; // NOUVEAU IMPORT

export default function Dossier() {
    const [projets, setProjets] = useState([]);
    const [afficherFormulaire, setAfficherFormulaire] = useState(false); // NOUVEAU STATE

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

    const supprimerProjet = async (id) => {
        if (window.confirm("Es-tu sûre de vouloir supprimer ce projet ?")) {
            try {
                await axios.delete(`http://localhost:3001/projets/${id}`);
                setProjets(projets.filter((projet) => projet.id !== id));
            } catch (error) {
                console.error("Erreur lors de la suppression:", error);
            }
        }
    };

    // NOUVELLE FONCTION : Ajouter un projet
    const ajouterNouveauProjet = async (nouveauProjet) => {
        try {
            // json-server va automatiquement créer un ID unique !
            const response = await axios.post('http://localhost:3001/projets', nouveauProjet);

            // On met à jour l'affichage en ajoutant le nouveau projet à la liste
            setProjets([...projets, response.data]);

            // On cache le formulaire
            setAfficherFormulaire(false);
        } catch (error) {
            console.error("Erreur lors de l'ajout du projet:", error);
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

                    {/* Le bouton change de rôle selon si le formulaire est ouvert ou non */}
                    {!afficherFormulaire && (
                        <button
                            onClick={() => setAfficherFormulaire(true)}
                            className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl transition-colors font-medium shadow-sm"
                        >
                            + Nouveau Projet
                        </button>
                    )}
                </div>

                {/* Affichage conditionnel du composant AjouterProjet */}
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
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}