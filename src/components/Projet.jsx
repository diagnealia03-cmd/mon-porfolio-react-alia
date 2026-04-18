export default function Projet({ projet, onDelete }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-violet-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
            {/* On affiche la première image de la liste */}
            <img
                src={projet.images[0]}
                alt={projet.titre}
                className="w-full h-48 object-cover border-b border-violet-50"
            />
            <div className="p-4 flex flex-col flex-grow justify-between">
                <h3 className="font-bold text-violet-900 text-lg mb-4 text-center">
                    {projet.titre}
                </h3>

                <button
                    onClick={() => onDelete(projet.id)}
                    className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-2 rounded-lg transition-colors border border-red-100"
                >
                    Supprimer
                </button>
            </div>
        </div>
    );
}