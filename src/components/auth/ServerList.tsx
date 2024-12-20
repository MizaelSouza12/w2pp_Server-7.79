import { Panel } from '../ui/Panel';
import { Button } from '../ui/Button';

interface Server {
  id: string;
  name: string;
  status: 'online' | 'full' | 'offline';
  population: number;
}

const servers: Server[] = [
  { id: 'global-1', name: 'Global-1', status: 'online', population: 85 },
  { id: 'global-2', name: 'Global-2', status: 'full', population: 100 },
  { id: 'global-3', name: 'Global-3', status: 'offline', population: 0 },
];

export function ServerList() {
  return (
    <Panel className="w-80">
      <h2 className="text-xl text-amber-100 font-medieval text-center mb-4">Select Server</h2>
      <div className="space-y-2">
        {servers.map(server => (
          <div key={server.id} className="flex items-center justify-between p-2 border border-amber-900/30 rounded bg-black/20">
            <div>
              <span className="text-amber-100">{server.name}</span>
              <div className="flex items-center gap-2 mt-1">
                <div className={`w-2 h-2 rounded-full ${
                  server.status === 'online' ? 'bg-green-500' :
                  server.status === 'full' ? 'bg-red-500' :
                  'bg-gray-500'
                }`} />
                <span className="text-xs text-gray-400">
                  {server.status === 'online' ? `${server.population}% Full` :
                   server.status === 'full' ? 'Full' :
                   'Offline'}
                </span>
              </div>
            </div>
            <Button
              disabled={server.status === 'full' || server.status === 'offline'}
              variant="secondary"
              className="text-sm"
            >
              Connect
            </Button>
          </div>
        ))}
      </div>
    </Panel>
  );
}