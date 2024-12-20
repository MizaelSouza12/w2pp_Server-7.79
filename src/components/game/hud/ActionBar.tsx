interface ActionBarProps {
  onInventoryClick: () => void;
}

export function ActionBar({ onInventoryClick }: ActionBarProps) {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
      {/* Action Slots */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div 
          key={i}
          className="w-12 h-12 bg-black/50 border border-amber-900/30 rounded flex items-center justify-center"
        >
          <span className="text-xs text-gray-500">{i + 1}</span>
        </div>
      ))}

      {/* Inventory Button */}
      <button
        onClick={onInventoryClick}
        className="ml-4 w-12 h-12 bg-black/50 border border-amber-900/30 rounded hover:bg-amber-900/20"
      >
        I
      </button>
    </div>
  );
}