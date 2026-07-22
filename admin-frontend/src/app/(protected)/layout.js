import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function ProtectedLayout({ children }) {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Topbar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
