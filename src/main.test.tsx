import { describe, it, expect, vi, beforeEach } from 'vitest';

let renderMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  document.body.innerHTML = '';
  vi.resetModules();
});

describe('main.tsx', () => {
  it('throws error when #root is missing', async () => {
    await expect(import('./main')).rejects.toThrow('Root container not found');
  });

  it('renders without crashing when #root is present', async () => {
    const root = document.createElement('div');
    root.setAttribute('id', 'root');
    document.body.appendChild(root);

    vi.mock('react-dom/client', async () => {
      renderMock = vi.fn();

      const actual =
        await vi.importActual<typeof import('react-dom/client')>(
          'react-dom/client'
        );
      return {
        ...actual,
        createRoot: () => ({
          render: renderMock,
        }),
      };
    });

    await import('./main');

    expect(renderMock).toHaveBeenCalledTimes(1);
  });
});
