import { useState } from "react";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { UserIcon } from "@/assets";
import { useAxios } from "@/hooks";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Checkbox } from "../ui/checkbox";

type Role = "admin" | "moderator" | "user";

export default function UserList() {
  const [roles, setRoles] = useState<Role[]>([]);

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

  const handleSave = () => {
    instance
      .post("Auth/rolechange", {
        id: "66879856393cc07804698548",
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
    <section className="mt-10">
      <h1 className="text-4xl font-semibold">Users</h1>

      <div className="mt-5">
        <Input placeholder="Search Users" />
      </div>

      <div className="mt-5 flex flex-col gap-5">
        {[1, 2, 3, 4, 5].map((x) => (
          <Card className="flex overflow-hidden" key={x}>
            <div className="p-6">
              <UserIcon />
            </div>
            <div className="flex-grow flex">
              <CardHeader className="flex-grow px-0">
                <CardTitle className="text-lg">
                  Friendly Cricket match
                </CardTitle>
                <CardDescription>Starts in 3 hours</CardDescription>
              </CardHeader>

              <div className="flex items-center p-6">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Edit</Button>
                  </DialogTrigger>
                  <DialogContent className="justify-center gap-10">
                    <div className="flex items-center gap-5">
                      <div>
                        <UserIcon />
                      </div>
                      <div>
                        <h1 className="text-lg font-semibold">John Smith</h1>
                        <span>johnsmith@gmail.com</span>
                      </div>
                    </div>

                    <div className="flex gap-5">
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

                    <Button onClick={handleSave}>Save</Button>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
