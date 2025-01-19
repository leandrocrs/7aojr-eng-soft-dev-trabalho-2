import { sendMessageToQueue } from '../messaging/rabbitmqHelper.cjs'
import { handleMessage } from '../index.js';

jest.mock('../messaging/rabbitmqHelper.cjs');

describe('handleMessage', () => {
  const message = { id: '1', content: 'Test message' };
  const options = {
    host: 'localhost',
    port: '5672',
    user: 'guest',
    password: 'guest'
  };

  beforeEach(() => {
    process.env.RABBIT_HOST = 'localhost';
    process.env.RABBIT_PORT = '5672';
    process.env.RABBIT_USER = 'guest';
    process.env.RABBIT_PASSWORD = 'guest';
  });

  it('should send message to queue successfully', async () => {
    sendMessageToQueue.mockResolvedValue();

    await handleMessage(message);

    expect(sendMessageToQueue).toHaveBeenCalledWith('recommendation-created', message, options);
  });

  it('should handle errors when sending message to queue', async () => {
    const error = new Error('Failed to send message');
    sendMessageToQueue.mockRejectedValue(error);

    await expect(handleMessage(message)).rejects.toThrow('Failed to send message');
  });
});