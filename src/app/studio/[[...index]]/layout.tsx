export const metadata = {
  title: 'Black & White Blog Studio',
  description: 'Content management for the Black & White Blog',
};

// Use a simple div wrapper instead of html/body tags
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="sanity-studio">{children}</div>;
}
