export const metadata = {
  title: "My Profile",
};

export default function HomeLayout({
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
