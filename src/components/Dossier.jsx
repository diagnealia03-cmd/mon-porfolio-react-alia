import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dossier() {
    const [projets, setProjets] = useState([]);

    // Récupération des données au chargement du composant
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

    return (
        <div className="min-h-screen bg-violet-50 p-8">
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-bold text-violet-800 mb-2">Mon Portfolio Alia</h1>
                <p className="text-orange-600 font-medium">Développement & Innovation</p>
            </header>

            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6 border border-violet-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-violet-700">Mes Projets</h2>
                    {/* Le bouton AjouterProjet viendra ici plus tard */}
                    <button className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors">
                        + Nouveau Projet
                    </button>
                </div>

                {/* Liste temporaire pour tester */}
                <div className="grid gap-4">
                    {projets.map((projet) => (
                        <div key={projet.id} className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                            <h3 className="font-bold text-violet-900">{projet.titre}</h3>
                            <p className="text-slate-600 text-sm">{projet.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}