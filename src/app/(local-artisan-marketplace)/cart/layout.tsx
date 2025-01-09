export const metadata = {
  title: "Explore Your Cart",
};

export default function ArtLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full">
      <div className="">{children}</div>
    </div>
  );
}
