import type { H3Event } from 'h3';

export const connectedClients = new Map<string, Set<H3Event>>();

export const addClient = (userId: string, event: H3Event) => {
  if (!connectedClients.has(userId)) {
    connectedClients.set(userId, new Set());
  }
  connectedClients.get(userId)!.add(event);
  
  // Remove the client when the connection is closed
  event.node.req.on('close', () => {
    removeClient(userId, event);
  });
};

export const removeClient = (userId: string, event: H3Event) => {
  const userClients = connectedClients.get(userId);
  if (userClients) {
    userClients.delete(event);
    if (userClients.size === 0) {
      connectedClients.delete(userId);
    }
  }
};

export const sendNotificationToUser = (userId: string, data: any) => {
  const userClients = connectedClients.get(userId);
  if (userClients) {
    const message = `data: ${JSON.stringify(data)}\n\n`;
    userClients.forEach(clientEvent => {
      clientEvent.node.res.write(message);
    });
  }
};
