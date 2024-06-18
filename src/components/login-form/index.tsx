import { useAuth } from "@/contexts";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function LoginForm() {
  const { manageLogin } = useAuth();

  const handleLogin = () => {
    manageLogin("sample token", ["admin", "moderator", "user"]);
  };

  return (
    <form className="flex flex-col gap-5">
      <h1 className="text-center font-semibold text-2xl">SignIn or SignUp</h1>
      <div>
        <label htmlFor="email">Email</label>
        <Input id="email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" />
      </div>
      <Button onClick={handleLogin}>Login</Button>
    </form>
  );
}
