export const metadata = {
  title: "Explore Technology",
};

export default function TechnologyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full">
      <div className="">{children}</div>
    </div>
  );
}
