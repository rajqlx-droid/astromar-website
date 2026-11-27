import AdminMenu, { type AdminSection } from "./AdminMenu";

// Page shell for the dashboard and the two tracker pages: background, grid and the shared menu.
export default function AdminPage({
  active,
  showSignOut,
  email,
  children,
}: {
  active: AdminSection;
  showSignOut: boolean;
  email?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex min-h-screen flex-col"
      style={{
        backgroundColor: "#eef2f8",
        backgroundImage: "linear-gradient(rgba(27,58,107,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(27,58,107,.05) 1px, transparent 1px)",
        backgroundSize: "62px 62px",
      }}
    >
      <AdminMenu active={active} showSignOut={showSignOut} email={email} />
      {children}
    </div>
  );
}
