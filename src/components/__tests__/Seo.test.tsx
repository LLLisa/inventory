import { render } from '@testing-library/react-native';

import Seo from '@/components/Seo';

type Node = { type: string; props: Record<string, unknown>; children: unknown[] | null };

/** The <head> tags Seo renders come out as a flat array from toJSON(). */
function headNodes(json: unknown): Node[] {
  if (!json) return [];
  return (Array.isArray(json) ? json : [json]) as Node[];
}

function meta(nodes: Node[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (const n of nodes) {
    if (n.type !== 'meta') continue;
    const key = (n.props.name ?? n.props.property) as string;
    out[key] = n.props.content as string;
  }
  return out;
}

const first = (nodes: Node[], type: string) => nodes.find((n) => n.type === type);

describe('Seo', () => {
  it('emits a canonical URL and full title for a normal route', () => {
    const nodes = headNodes(
      render(<Seo path="/about" title="About" description="About the app" />).toJSON(),
    );

    expect(first(nodes, 'title')?.children).toEqual(['About · NA Daily Inventory']);

    const link = first(nodes, 'link');
    expect(link?.props.rel).toBe('canonical');
    expect(link?.props.href).toBe('https://nadailyinventory.com/about');

    const m = meta(nodes);
    expect(m.description).toBe('About the app');
    expect(m['og:url']).toBe('https://nadailyinventory.com/about');
    expect(m['og:title']).toBe('About · NA Daily Inventory');
    expect(m['twitter:card']).toBe('summary');
  });

  it('uses the bare site title and root URL for "/"', () => {
    const nodes = headNodes(render(<Seo path="/" title="Home Title" description="d" />).toJSON());
    expect(first(nodes, 'title')?.children).toEqual(['Home Title']);
    expect(first(nodes, 'link')?.props.href).toBe('https://nadailyinventory.com');
  });

  it('emits noindex and no canonical when noindex is set', () => {
    const nodes = headNodes(
      render(<Seo path="/404" title="Not Found" description="d" noindex />).toJSON(),
    );
    expect(first(nodes, 'link')).toBeUndefined();
    expect(meta(nodes).robots).toBe('noindex');
  });

  it('serializes JSON-LD when provided', () => {
    const jsonLd = { '@type': 'WebApplication', name: 'X' };
    const nodes = headNodes(
      render(<Seo path="/" title="t" description="d" jsonLd={jsonLd} />).toJSON(),
    );
    const script = first(nodes, 'script');
    expect(script?.props.type).toBe('application/ld+json');
    expect(JSON.parse((script?.children as string[])[0])).toEqual(jsonLd);
  });
});
