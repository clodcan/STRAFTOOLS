import weaponData from "../../data/weapons.json";
import { MdArrowForwardIos, MdOutlineRefresh } from "react-icons/md";

const allWeapons = Object.keys(weaponData);

const SwapEditor = ({ swap, updateSwap, mapWeapons }) => {
  const isSwapped =
    swap.result !== swap.precursor && mapWeapons.includes(swap.precursor);

  return (
    <div
      className={`border rounded-lg py-2 px-4 flex items-center gap-4 justify-between font-geistMono bg-zinc-900 ${
        isSwapped ? "border-emerald-700" : "border-zinc-600"
      }`}
    >
      <span className="text-sm px-2 flex-1 border border-zinc-600 rounded p-2 select-none">
        {swap.precursor}
      </span>
      <MdArrowForwardIos />
      <select
        value={swap.result}
        onChange={(e) => updateSwap(swap.id, e.target.value)}
        className="rounded px-2 py-2 text-sm outline-none border border-zinc-600 bg-zinc-900 flex-1"
      >
        <option value="None">None</option>
        {allWeapons.map((w) => (
          <option key={w} value={w}>
            {w}
          </option>
        ))}
      </select>
      <button
        className="text-zinc-600 hover:text-white transition-colors duration-200 cursor-pointer text-lg"
        onClick={() => updateSwap(swap.id, swap.precursor)}
      >
        <MdOutlineRefresh />
      </button>
    </div>
  );
};

export default SwapEditor;
