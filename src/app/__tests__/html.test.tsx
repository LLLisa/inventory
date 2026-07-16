import { render } from '@testing-library/react-native';
import { Text } from 'react-native';

jest.mock('expo-router/html', () => ({ ScrollViewStyleReset: () => null }));

import Root from '@/app/+html';

type Node = { type: string; props: Record<string, unknown>; children: Node[] | null };

function flatten(node: Node | null, acc: Node[] = []): Node[] {
  if (!node || typeof node !== 'object') return acc;
  acc.push(node);
  for (const child of node.children ?? []) flatten(child, acc);
  return acc;
}

describe('+html Root document', () => {
  it('emits html/head/body with PWA + theme metadata and renders children', () => {
    const json = render(
      <Root>
        <Text>page</Text>
      </Root>,
    ).toJSON() as unknown as Node;

    const nodes = flatten(json);
    const types = nodes.map((n) => n.type);
    expect(types).toEqual(expect.arrayContaining(['html', 'head', 'body']));

    const manifest = nodes.find((n) => n.type === 'link' && n.props.rel === 'manifest');
    expect(manifest?.props.href).toBe('/manifest.json');

    const theme = nodes.find((n) => n.type === 'meta' && n.props.name === 'theme-color');
    expect(theme?.props.content).toBe('#0000FF');

    // Children are rendered inside <body>.
    expect(nodes.some((n) => n.type === 'Text')).toBe(true);
  });
});
