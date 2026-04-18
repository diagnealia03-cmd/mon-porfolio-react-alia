import { useState } from 'react';

export default function AjouterProjet({ onAdd, onCancel }) {
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // Empêche le rechargement de la page

        if (!titre || !description || !imageUrl) {
            alert("Veuillez remplir tous les champs !");
            return;
        }

        // On crée l'objet projet (on duplique l'image 4 fois pour respecter le format de ta DB)
        const nouveauProjet = {
            titre: titre,
            description: description,
            images: [imageUrl, imageUrl, imageUrl, imageUrl]
        };

        onAdd(nouveauProjet);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-violet-200 mb-8">
            <h2 className="text-xl font-bold text-violet-800 mb-4">Ajouter un nouveau projet</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="block text-sm font-medium text-violet-700 mb-1">Titre du projet</label>
                    <input
                        type="text"
                        value={titre}
                        onChange={(e) => setTitre(e.target.value)}
                        className="w-full p-2 border border-violet-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
                        placeholder="Ex: Mon Super Projet"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-violet-700 mb-1">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border border-violet-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
                        placeholder="Décris ton projet..."
                        rows="3"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-violet-700 mb-1">Lien de l'image (URL)</label>
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full p-2 border border-violet-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
                        placeholder="https://lien-de-ton-image.com/image.jpg"
                    />
                </div>

                <div className="flex justify-end gap-3 mt-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 text-violet-600 bg-violet-50 hover:bg-violet-100 rounded-lg font-medium transition-colors"
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 text-white bg-violet-600 hover:bg-violet-700 rounded-lg font-medium transition-colors"
                    >
                        Enregistrer
                    </button>
                </div>
            </form>
        </div>
    );
}