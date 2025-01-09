export const metadata = {
  title: "Explore Fashion",
};

export default function FashionLayout({
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
