import { useState } from 'react';

export default function DetaillerProjet({ projet, onCancel, onEdit }) {
    // Mode édition (vrai ou faux)
    const [isEditing, setIsEditing] = useState(false);

    // Champs modifiables
    const [titre, setTitre] = useState(projet.titre);
    const [description, setDescription] = useState(projet.description);

    const sauvegarderModifications = () => {
        // On envoie le projet modifié au composant parent (Dossier)
        onEdit({ ...projet, titre: titre, description: description });
        setIsEditing(false); // On quitte le mode édition
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-violet-200">

            {/* Zone de Texte ou d'Édition */}
            {isEditing ? (
                <div className="flex flex-col gap-4 mb-8 bg-orange-50 p-6 rounded-xl border border-orange-100">
                    <h3 className="font-bold text-violet-800 mb-2">Mode Édition</h3>
                    <input
                        type="text"
                        value={titre}
                        onChange={(e) => setTitre(e.target.value)}
                        className="w-full p-2 border border-violet-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border border-violet-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
                        rows="3"
                    />
                    <button
                        onClick={sauvegarderModifications}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg self-start transition-colors"
                    >
                        Sauvegarder
                    </button>
                </div>
            ) : (
                <div className="mb-8 text-center">
                    <h2 className="text-4xl font-bold text-violet-900 mb-4">{projet.titre}</h2>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">{projet.description}</p>
                </div>
            )}

            {/* Affichage des 4 images dans une jolie grille */}
            <h3 className="text-xl font-semibold text-violet-700 mb-4">Aperçus du projet</h3>
            <div className="grid grid-cols-2 gap-4 mb-8">
                {projet.images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`${projet.titre} - vue ${index + 1}`}
                        className="w-full h-48 object-cover rounded-xl shadow-sm border border-violet-100 hover:scale-[1.02] transition-transform"
                    />
                ))}
            </div>

            {/* Les boutons demandés par le coach */}
            <div className="flex justify-center gap-6 pt-4 border-t border-violet-100">
                <button
                    onClick={onCancel}
                    className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors"
                >
                    Annuler (Retour)
                </button>

                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-6 py-3 bg-orange-100 hover:bg-orange-200 text-orange-700 font-bold rounded-xl transition-colors"
                    >
                        Éditer le projet
                    </button>
                )}
            </div>
        </div>
    );
}