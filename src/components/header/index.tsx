import { useAuth } from "@/contexts";
import { Button } from "../ui/button";
import { CalendarIcon } from "@/assets";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import LoginForm from "../login-form";
import CreateNew from "../create-new";
import CreateUserForm from "../create-user-form";

export default function Header() {
  const { token, roles, manageLogin } = useAuth();

  const handleLogout = () => {
    manageLogin(null, null);
  };

  return (
    <header className="sticky top-0 backdrop-blur border-b border-b-black/10">
      <div className="flex items-center gap-5 p-2 bg-black/5">
        <CalendarIcon className="w-16 h-16" />

        <h1 className="flex-grow text-4xl font-bold">ERS</h1>

        {token && roles?.includes("moderator") && (
          <Dialog>
            <DialogTrigger asChild>
              <Button>New Event</Button>
            </DialogTrigger>
            <DialogContent className="gap-10">
              <CreateNew />
            </DialogContent>
          </Dialog>
        )}

        {token && roles?.includes("moderator") && (
          <Dialog>
            <DialogTrigger asChild>
              <Button>New User</Button>
            </DialogTrigger>
            <DialogContent>
              <CreateUserForm />
            </DialogContent>
          </Dialog>
        )}

        {token ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="min-w-20">Login</Button>
            </DialogTrigger>
            <DialogContent className="gap-10">
              <LoginForm />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </header>
  );
}
