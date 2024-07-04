import { useRef } from "react";
import { toast } from "sonner";
import { useAxios } from "@/hooks";
import { useAuth } from "@/contexts";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function LoginForm() {
  const userNameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const { manageLogin } = useAuth();
  const { instance } = useAxios();

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    instance
      .post("Auth/login", {
        username: userNameRef.current?.value,
        password: passwordRef.current?.value,
      })
      .then(({ data }) => {
        manageLogin(data.token, ["admin", "moderator", "user"]);
      })
      .catch(() => {
        toast("Failed to log in");
      });
  };

  return (
    <form className="flex flex-col gap-5">
      <h1 className="text-center font-semibold text-2xl">SignUp</h1>
      <div>
        <label htmlFor="userName">User Name</label>
        <Input id="userName" ref={userNameRef} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" ref={passwordRef} />
      </div>
      <Button onClick={handleLogin}>Login</Button>
    </form>
  );
}
