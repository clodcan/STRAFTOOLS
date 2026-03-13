import { useState } from "react";
import {
  MdClear,
  MdDelete,
  MdAdd,
  MdTerrain,
  MdFormatListBulleted,
} from "react-icons/md";
import MapSelector from "../shared/MapSelector";

const Modal = ({ setIsModalActive, handleCreateRules }) => {
  const [modalSelection, setModalSelection] = useState([]);

  const removeMap = (mapName) => {
    setModalSelection((prev) => prev.filter((m) => m !== mapName));
  };

  return (
    <div
      className="fixed inset-0 bg-zinc-950/50 backdrop-blur-lg flex items-center justify-center z-50"
      onClick={() => setIsModalActive(false)}
    >
      <div
        className="bg-zinc-950 border border-zinc-600 rounded-lg flex flex-col w-[70vw] h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-2 pl-5 border-b border-zinc-600 shrink-0">
          <div className="flex gap-1">
            <MdTerrain />
            <p className="text-xs font-geistMono font-semibold">Add Maps</p>
          </div>
          <button
            onClick={() => setIsModalActive(false)}
            className="text-zinc-400 hover:text-white cursor-pointer"
          >
            <MdClear />
          </button>
        </div>
        <div className="flex flex-1 overflow-hidden">
          <MapSelector
            selectedMaps={modalSelection}
            setSelectedMaps={setModalSelection}
          />
          <div className="flex flex-col w-48 border-l border-l-zinc-600">
            <div className="flex gap-1 p-5 items-center">
              <MdFormatListBulleted />
              <p className="text-sm font-semibold">Selected Maps</p>
              <button
                className={`cursor-pointer text-zinc-400 hover:text-white ml-auto transition-all ease-in ${modalSelection.length <= 0 ? "hidden" : ""}`}
                onClick={() => setModalSelection([])}
              >
                <MdDelete />
              </button>
            </div>
            <div className="flex flex-col gap-2 overflow-y-auto overflow-x-hidden text-sm font-geistMono px-5">
              {modalSelection.map((selectedMap) => (
                <div
                  key={selectedMap}
                  onClick={() => removeMap(selectedMap)}
                  className="flex rounded-lg px-2 py-1 hover:bg-zinc-800 gap-2 transition-all ease-in cursor-pointer group select-none"
                >
                  <p className="overflow-hidden">{selectedMap}</p>
                  <button className="ml-auto cursor-pointer text-zinc-400 group-hover:text-white transition-all ease-in">
                    <MdClear />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-auto p-5 flex flex-col gap-2">
              <button
                className={`flex items-center gap-1 border border-zinc-600 rounded-lg px-2 py-1 shrink-0 hover:bg-zinc-800 transition-all ease-in cursor-pointer w-full ${modalSelection.length < 2 && "hidden"}`}
                onClick={() => handleCreateRules(modalSelection, true)}
              >
                <MdAdd />
                <p className="text-sm">Add as rule</p>
              </button>
              <button
                className={`flex items-center gap-1 border border-zinc-600 rounded-lg px-2 py-1 shrink-0 hover:bg-zinc-800 transition-all ease-in cursor-pointer w-full ${modalSelection.length === 0 && "hidden"}`}
                onClick={() => handleCreateRules(modalSelection)}
              >
                <MdAdd />
                <p className="text-sm">
                  {modalSelection.length === 1 ? "Add map" : "Add maps"}
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
