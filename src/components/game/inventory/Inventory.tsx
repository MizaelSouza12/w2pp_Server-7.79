import { Panel } from '../../ui/Panel';

interface InventoryProps {
  onClose: () => void;
}

export function Inventory({ onClose }: InventoryProps) {
  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
      <Panel className="w-[800px] h-[600px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-amber-100 font-medieval">Equipment</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            Close
          </button>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {/* Equipment Slots */}
          {Array.from({ length: 25 }).map((_, i) => (
            <div 
              key={i}
              className="w-16 h-16 bg-black/30 border border-amber-900/30 rounded"
            />
          ))}
        </div>
      </Panel>
    </div>
  );
}