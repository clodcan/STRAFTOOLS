import maps from "../../data/maps.json";
import { MdInfoOutline, MdClear } from "react-icons/md";

const MapModal = ({ setShowMapModal, mapModalMap }) => {
  const map = maps[mapModalMap];
  const totalWeapons = new Set(Object.values(map.weapons ?? {}).flat()).size;

  const categories = ["core", "alt", "dlc"];

  const weaponSections = [
    { key: "spawners", label: "Spawners" },
    { key: "vending_machine", label: "Vending Machine" },
    { key: "pipe", label: "Pipe" },
  ];

  return (
    <div
      className="fixed inset-0 bg-zinc-950/50 backdrop-blur-lg flex items-center justify-center z-50 select-none"
      onClick={() => setShowMapModal(false)}
    >
      <div
        className="bg-zinc-950 border border-zinc-600 rounded-lg flex flex-col w-[35vw] h-[80vh] overflow-hidden shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-2 pl-3 border-b border-zinc-600 shrink-0">
          <div className="flex gap-1">
            <MdInfoOutline />
            <p className="text-xs font-geistMono font-semibold">Map info</p>
          </div>
          <button
            onClick={() => setShowMapModal(false)}
            className="text-zinc-400 hover:text-white cursor-pointer"
          >
            <MdClear />
          </button>
        </div>
        <div className="h-2/5 border-b border-zinc-600 relative overflow-hidden">
          <img
            className="object-cover w-full h-full scale-105"
            src={`/images/maps/${mapModalMap}.webp`}
            alt={mapModalMap}
          />
          <div className="absolute top-0 left-0 w-full h-full bg-linear-to-t from-black/90"></div>

          <div className="flex gap-4 items-end absolute bottom-2 left-4 font-geistMono">
            <p className="text-3xl">{mapModalMap}</p>
            <p className="text-lg text-zinc-500">{map.family}</p>
          </div>
        </div>

        <div className="flex flex-col p-4 gap-8 overflow-y-auto">
          <div className="flex justify-between">
            <div className="flex gap-2">
              {categories.map((category) => (
                <span
                  key={category}
                  className={`text-xs px-2 py-1 rounded-lg border ${
                    map.category === category
                      ? "bg-emerald-900 border-emerald-700"
                      : "bg-zinc-800 border-zinc-600"
                  }`}
                >
                  {category}
                </span>
              ))}
            </div>
            <p className="text-sm text-zinc-500 font-geistMono">
              {totalWeapons} Weapons
            </p>
          </div>

          {weaponSections.map(({ key, label }, index) => {
            const weapons = map.weapons?.[key] ?? [];
            const isLast = index === weaponSections.length - 1;

            return (
              <div
                key={key}
                className={`flex flex-col gap-2 ${!isLast && "border-b border-zinc-600 pb-4"}`}
              >
                <p>{label}</p>

                {weapons.length === 0 ? (
                  <p className="text-xs text-zinc-500">None</p>
                ) : (
                  <div className="flex gap-2 flex-wrap">
                    {weapons.map((weapon) => (
                      <span
                        key={weapon}
                        className="text-xs px-2 py-1 rounded-lg border bg-zinc-800 border-zinc-600"
                      >
                        {weapon}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MapModal;
