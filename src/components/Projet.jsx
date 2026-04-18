export default function Projet({ projet, onDelete, onShowDetails }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-violet-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
            <img
                src={projet.images[0]}
                alt={projet.titre}
                className="w-full h-48 object-cover border-b border-violet-50"
            />
            <div className="p-5 flex flex-col flex-grow justify-between">

                <div className="mb-4">
                    <h3 className="font-bold text-violet-900 text-xl mb-1">{projet.titre}</h3>
                    {/* Affichage de la date en petit et gris */}
                    <p className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-3">
                        {projet.date || "Date non définie"}
                    </p>
                    {/* Affichage d'un aperçu de la description */}
                    <p className="text-slate-600 text-sm line-clamp-2">
                        {projet.description}
                    </p>
                </div>

                {/* Les deux boutons côte à côte */}
                <div className="flex gap-3">
                    <button
                        onClick={() => onShowDetails(projet)}
                        className="flex-1 bg-violet-100 hover:bg-violet-200 text-violet-700 font-semibold py-2 rounded-lg transition-colors"
                    >
                        Détails
                    </button>
                    <button
                        onClick={() => onDelete(projet.id)}
                        className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-2 rounded-lg transition-colors border border-red-100"
                    >
                        Supprimer
                    </button>
                </div>

            </div>
        </div>
    );
}