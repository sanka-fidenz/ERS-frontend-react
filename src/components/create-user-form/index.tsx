import { useRef, useState } from "react";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { useAxios } from "@/hooks";

type Role = "admin" | "moderator" | "user";

export default function CreateUserForm() {
  const [roles, setRoles] = useState<Role[]>([]);
  const nameRef = useRef<any>(null);
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);

  const { instance } = useAxios();

  const handleRoleChange = (role: Role) => {
    setRoles((prev) => {
      if (prev.includes(role)) {
        return prev.filter((x) => x !== role);
      } else {
        return [...prev, role];
      }
    });
  };

  const handleCreate = () => {
    instance
      .post("Auth/register", {
        username: emailRef.current?.value,
        password: passwordRef.current?.value,
        firstName: nameRef.current?.value,
        secondName: "test",
        roles: roles.join(","),
      })
      .then(() => {
        toast("Role updated successfully");
      })
      .catch(() => {
        toast("Failed to update role");
      });
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-center font-semibold text-2xl">User Create</h1>
      <div>
        <label htmlFor="email">Email</label>
        <Input id="email" ref={emailRef} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" ref={passwordRef} />
      </div>
      <div>
        <label htmlFor="name">Name</label>
        <Input id="name" ref={nameRef} />
      </div>
      <div className="flex justify-center gap-5">
        <div className="flex items-center gap-4">
          <Checkbox
            id="admin"
            checked={roles.includes("admin")}
            onCheckedChange={() => handleRoleChange("admin")}
          />
          <label htmlFor="admin">Admin</label>
        </div>
        <span>|</span>
        <div className="flex items-center gap-4">
          <Checkbox
            id="moderator"
            checked={roles.includes("moderator")}
            onCheckedChange={() => handleRoleChange("moderator")}
          />
          <label htmlFor="moderator">Moderator</label>
        </div>
        <span>|</span>
        <div className="flex items-center gap-4">
          <Checkbox
            id="user"
            checked={roles.includes("user")}
            onCheckedChange={() => handleRoleChange("user")}
          />
          <label htmlFor="user">User</label>
        </div>
      </div>
      <Button onClick={handleCreate}>Create</Button>
    </div>
  );
}
