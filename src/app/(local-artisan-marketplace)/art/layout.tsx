export const metadata = {
  title: "Explore Art",
};

export default function ArtLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full">
      <div className="">{children}</div>
    </div>
  );
}
