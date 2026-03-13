import { useState } from "react";
import RuleCard from "./RuleCard";
import {
  MdTerrain,
  MdAdd,
  MdContentPasteGo,
  MdFormatListBulleted,
  MdGridView,
} from "react-icons/md";
import { errorToast, successToast } from "../../utils/toast";
import { expandWildcard, normalizeMapString } from "../../utils/mapUtils";

const RulesPanel = ({
  setIsModalActive,
  rules,
  setRules,
  selectedRule,
  setSelectedRule,
  deleteRule,
  importPlaylist,
  handleAddAllMaps,
  moveRule,
}) => {
  const [ruleInput, setRuleInput] = useState("");
  const [ruleView, setRuleView] = useState("grid");

  const handleRuleSubmit = () => {
    if (!ruleInput.trim()) return;

    const input = ruleInput.trim();

    if (input.includes("*") || input.includes("?")) {
      const matched = expandWildcard(input);
      if (!matched || matched.length === 0)
        return errorToast("No maps match that pattern");

      const newRule = {
        id: crypto.randomUUID(),
        maps: matched,
        pattern: input,
        swaps: [],
      };
      setRules((prev) => [...prev, newRule]);
      setSelectedRule(newRule.id);
    } else {
      const matchedMap = normalizeMapString(input);
      if (!matchedMap) return errorToast("Map not found");

      const newRule = {
        id: crypto.randomUUID(),
        mapString: matchedMap,
        swaps: [],
      };
      setRules((prev) => [...prev, newRule]);
      setSelectedRule(newRule.id);
    }

    setRuleInput("");
    successToast("Rule added", "✅");
  };

  return (
    <div className="flex flex-col w-96 shrink-0 border-r border-zinc-600">
      <div className="flex border-b border-zinc-600 px-3 py-2.75 justify-between">
        <div className="flex gap-1 font-semibold items-center">
          <MdTerrain />
          <p>Maps</p>
        </div>
        <div className="flex gap-2">
          <button
            className={`${ruleView === "list" ? "bg-zinc-800" : "bg-transparent"} border border-zinc-600 p-1 rounded-lg hover:bg-zinc-800 transition-all ease-in cursor-pointer flex-1 flex items-center gap-1 justify-center`}
            onClick={() => setRuleView("list")}
          >
            <MdFormatListBulleted />
          </button>
          <button
            className={`${ruleView === "grid" ? "bg-zinc-800" : ""} border border-zinc-600 p-1 rounded-lg hover:bg-zinc-800 transition-all ease-in cursor-pointer flex-1 flex items-center gap-1 justify-center`}
            onClick={() => setRuleView("grid")}
          >
            <MdGridView />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4 overflow-y-auto h-full">
        {rules.map((rule, index) => (
          <RuleCard
            key={rule.id}
            rule={rule}
            index={index}
            selectedRule={selectedRule}
            setSelectedRule={setSelectedRule}
            deleteRule={deleteRule}
            ruleView={ruleView}
            rulesCount={rules.length}
            moveRule={moveRule}
          />
        ))}
      </div>
      <div className="flex flex-col gap-3 mt-auto p-4">
        <div className="flex gap-3">
          <button
            className="border border-zinc-600 p-1 rounded-lg hover:bg-zinc-800 transition-all ease-in cursor-pointer flex-1 flex items-center gap-1 justify-center"
            onClick={() => setIsModalActive((prev) => !prev)}
          >
            <MdAdd />
            <p>Select maps</p>
          </button>
          <button
            className="border border-zinc-600 p-1 rounded-lg hover:bg-zinc-800 transition-all ease-in cursor-pointer flex-1 flex items-center gap-1 justify-center"
            onClick={handleAddAllMaps}
          >
            <MdAdd />
            <p>All maps</p>
          </button>
        </div>
        <button
          className="border border-zinc-600 p-1 rounded-lg hover:bg-zinc-800 transition-all ease-in cursor-pointer flex-1 flex items-center justify-center gap-1"
          onClick={importPlaylist}
        >
          <MdContentPasteGo />
          <p>Import playlist</p>
        </button>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Arena_*"
            className="border border-zinc-600 py-1 px-2 rounded-lg outline-none"
            value={ruleInput}
            onChange={(e) => setRuleInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleRuleSubmit()}
          />
          <button
            className="border border-zinc-600 p-1 rounded-lg hover:bg-zinc-800 transition-all ease-in cursor-pointer flex-1 flex items-center justify-center gap-1"
            onClick={handleRuleSubmit}
          >
            <MdAdd />
            <p>Add rule</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RulesPanel;
