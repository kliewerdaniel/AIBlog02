export const metadata = {
  title: 'Black & White Blog Studio',
  description: 'Content management for the Black & White Blog',
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
