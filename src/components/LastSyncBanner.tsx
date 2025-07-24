import React from 'react';

interface Props {
  lastSync: Date | null;
  offline: boolean;
}

export function LastSyncBanner({ lastSync, offline }: Props) {
  const text = lastSync
    ? lastSync.toLocaleString('es-CO', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : 'Nunca';
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#eee',
        padding: '4px 8px',
        fontSize: 12,
        textAlign: 'center'
      }}
    >
      Última actualización: {text} {offline && '(offline)'}
    </div>
  );
}
