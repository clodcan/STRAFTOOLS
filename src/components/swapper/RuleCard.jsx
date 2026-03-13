import {
  MdClear,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
} from "react-icons/md";

const RuleButtons = ({ index, rulesCount, rule, moveRule, deleteRule }) => (
  <div className="flex items-center gap-2">
    {index > 0 && (
      <button
        onClick={(e) => {
          e.stopPropagation();
          moveRule(rule.id, "up");
        }}
        className="text-zinc-600 hover:text-white transition-all ease-in cursor-pointer border border-zinc-600 p-1 rounded-lg"
      >
        <MdKeyboardArrowUp />
      </button>
    )}
    {index < rulesCount - 1 && (
      <button
        onClick={(e) => {
          e.stopPropagation();
          moveRule(rule.id, "down");
        }}
        className="text-zinc-600 hover:text-white transition-all ease-in cursor-pointer border border-zinc-600 p-1 rounded-lg"
      >
        <MdKeyboardArrowDown />
      </button>
    )}
    <button
      onClick={(e) => {
        e.stopPropagation();
        deleteRule(rule.id);
      }}
      className="text-zinc-600 hover:text-white transition-all ease-in cursor-pointer border border-zinc-600 p-1 rounded-lg"
    >
      <MdClear />
    </button>
  </div>
);

const RuleCard = ({
  rule,
  selectedRule,
  setSelectedRule,
  deleteRule,
  ruleView,
  index,
  rulesCount,
  moveRule,
}) => {
  const label = rule.pattern ?? rule.mapString ?? "Multiple maps";

  const hasMultipleMaps = !rule.mapString;
  const activeSwapCount = rule.swaps.filter(
    (s) => s.precursor !== s.result,
  ).length;
  const isSelected = selectedRule === rule.id;
  const toggleSelectedRule = () =>
    setSelectedRule((prev) => (prev === rule.id ? null : rule.id));

  const imgSrc = hasMultipleMaps
    ? "/images/maps/Rule_Thumbnail.png"
    : `/images/maps/${rule.mapString}.png`;

  const mapCount = hasMultipleMaps ? `${rule.maps.length} Maps` : "1 Map";

  const swapLabel = `${activeSwapCount} ${activeSwapCount === 1 ? "swap" : "swaps"}`;
  const swapClass = activeSwapCount > 0 ? "text-emerald-600" : "text-zinc-400";

  const buttonProps = { index, rulesCount, rule, moveRule, deleteRule };

  if (ruleView === "grid") {
    return (
      <div
        className={`border rounded-lg w-full flex flex-col select-none cursor-pointer bg-zinc-900 hover:scale-101 transition-all linear ${isSelected ? "border-white" : "border-zinc-600"}`}
        onClick={toggleSelectedRule}
      >
        <img
          src={imgSrc}
          className="rounded-t-lg border-b border-zinc-600 h-32 w-full object-cover"
          draggable="false"
        />
        <div className="flex justify-between p-2 font-geistMono">
          <div className="flex flex-col overflow-hidden">
            <p>{label}</p>
            <div className="flex gap-1 text-xs text-zinc-400">
              <p>{mapCount}</p>
              <span>•</span>
              <p className={swapClass}>{swapLabel}</p>
            </div>
          </div>
          <RuleButtons {...buttonProps} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`border rounded-lg w-full flex items-center gap-3 pr-2 select-none cursor-pointer bg-zinc-900 hover:scale-101 transition-all linear h-12 ${isSelected ? "border-white" : "border-zinc-600"}`}
      onClick={toggleSelectedRule}
    >
      <img
        src={imgSrc}
        className="w-24 shrink-0 object-cover self-stretch rounded-l-lg border-r border-zinc-600"
        draggable="false"
      />
      <div className="flex flex-col gap-1 font-geistMono overflow-hidden">
        <p className="text-sm">{label}</p>
        <div className="flex gap-1 text-xs text-zinc-400">
          <p>{mapCount}</p>
          <span>•</span>
          <p className={swapClass}>{swapLabel}</p>
        </div>
      </div>
      <div className="ml-auto">
        <RuleButtons {...buttonProps} />
      </div>
    </div>
  );
};

export default RuleCard;
