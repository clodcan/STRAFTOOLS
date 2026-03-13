import maps from "../../data/maps.json";
import weaponData from "../../data/weapons.json";
import { MdCategory, MdMap } from "react-icons/md";
import { RiCrosshair2Fill } from "react-icons/ri";

const allWeapons = Object.keys(weaponData).sort();

const FilterButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={
      active
        ? "bg-zinc-800 rounded-lg px-2 py-1 text-start cursor-pointer"
        : "hover:bg-zinc-800 rounded-lg px-2 py-1 text-start transition-all ease-in cursor-pointer"
    }
  >
    {children}
  </button>
);

const Filters = ({
  activeFamilies,
  setActiveFamilies,
  activeCategory,
  setActiveCategory,
  activeWeapons,
  setActiveWeapons,
  weaponFilterMode,
  setWeaponFilterMode,
}) => {
  const categories = ["All", "Core", "Alt", "DLC"];
  const mapSeriesAll = activeFamilies.length === 0;

  const mapFamilies = [
    ...new Set(
      Object.values(maps)
        .filter(
          (map) => activeCategory === "all" || map.category === activeCategory,
        )
        .map((map) => map.family),
    ),
  ].sort();

  return (
    <div className="flex flex-col items-start border-r border-zinc-600 w-48 shrink-0 p-5 gap-6 overflow-hidden">
      <div className="flex flex-col w-full">
        <div className="flex items-center gap-1 mb-2">
          <MdCategory />
          <p className="text-sm font-semibold">Category</p>
        </div>
        <div className="flex flex-col gap-1 ml-2 border-l border-zinc-600 pl-2 text-sm">
          {categories.map((category) => (
            <FilterButton
              key={category}
              active={activeCategory === category.toLowerCase()}
              onClick={() => {
                setActiveCategory(category.toLowerCase());
                setActiveFamilies([]);
              }}
            >
              {category}
            </FilterButton>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full flex-1 min-h-0">
        <div className="flex items-center gap-1 mb-2">
          <MdMap />
          <p className="text-sm font-semibold">Map Series</p>
        </div>
        <div className="flex flex-col gap-1 ml-2 border-l border-zinc-600 pl-2 text-sm overflow-y-auto flex-1 min-h-0">
          <button
            onClick={() => setActiveFamilies([])}
            className={
              mapSeriesAll
                ? "bg-zinc-800 rounded-lg px-2 py-1 text-start cursor-pointer sticky top-0"
                : "hover:bg-zinc-800 rounded-lg px-2 py-1 text-start transition-all ease-in cursor-pointer sticky top-0 bg-zinc-950"
            }
          >
            All
          </button>
          {mapFamilies.map((mapFamily) => (
            <FilterButton
              key={mapFamily}
              active={activeFamilies.includes(mapFamily)}
              onClick={() => setActiveFamilies([mapFamily])}
            >
              {mapFamily}
            </FilterButton>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full flex-1 min-h-0">
        <div className="flex w-full justify-between mb-2">
          <div className="flex items-center gap-1">
            <RiCrosshair2Fill />
            <p className="text-sm font-semibold">Weapons</p>
          </div>
          <div className="flex gap-1">
            <button
              className="border border-zinc-600 p-1 w-10 rounded-lg hover:bg-zinc-800 transition-all ease-in cursor-pointer flex-1 flex items-center gap-1 justify-center text-xs"
              onClick={() =>
                setWeaponFilterMode((prev) => (prev === "and" ? "or" : "and"))
              }
            >
              {weaponFilterMode === "and" ? "AND" : "OR"}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1 ml-2 border-l border-zinc-600 pl-2 text-sm overflow-y-auto flex-1 min-h-0">
          <button
            onClick={() => setActiveWeapons([])}
            className={
              activeWeapons.length === 0
                ? "bg-zinc-800 rounded-lg px-2 py-1 text-start cursor-pointer sticky top-0"
                : "hover:bg-zinc-800 rounded-lg px-2 py-1 text-start transition-all ease-in cursor-pointer sticky top-0 bg-zinc-950"
            }
          >
            All
          </button>
          {allWeapons.map((weapon) => (
            <FilterButton
              key={weapon}
              active={activeWeapons.includes(weapon)}
              onClick={() =>
                setActiveWeapons((prev) =>
                  prev.includes(weapon)
                    ? prev.filter((w) => w !== weapon)
                    : [...prev, weapon],
                )
              }
            >
              {weapon}
            </FilterButton>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
