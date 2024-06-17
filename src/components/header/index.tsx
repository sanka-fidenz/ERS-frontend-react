import { useAuth } from "@/contexts";
import { Button } from "../ui/button";
import { CalendarIcon } from "@/assets";

export default function Header() {
  const { token, role, manageLogin } = useAuth();

  const handleMangeLogin = () => {
    if (token || role) {
      manageLogin(null, null);
    } else {
      manageLogin("sample token", "admin");
    }
  };

  return (
    <header className="sticky top-0 backdrop-blur border-b border-b-black/10">
      <div className="flex items-center gap-5 p-2 bg-black/5">
        <CalendarIcon className="w-16 h-16" />

        <h1 className="flex-grow text-4xl font-bold">ERS</h1>

        {(token || role) && <Button>Create New</Button>}

        <Button className="min-w-20" onClick={handleMangeLogin}>
          {token || role ? "Logout" : "Login"}
        </Button>
      </div>
    </header>
  );
}
