import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

export default function CreateUserForm() {

  const handleCreateUser = () => {
  };

  return (
    <form className="flex flex-col gap-5">
      <h1 className="text-center font-semibold text-2xl">User Create</h1>
      <div>
        <label htmlFor="email">Email</label>
        <Input id="email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" />
      </div>
      <div>
        <label htmlFor="name">Name</label>
        <Input id="name" />
      </div>
      <div className="flex justify-center gap-5">
        <div className="flex items-center gap-4">
          <Checkbox id="admin" />
          <label htmlFor="admin">Admin</label>
        </div>
        <span>|</span>
        <div className="flex items-center gap-4">
          <Checkbox id="moderator" />
          <label htmlFor="moderator">Moderator</label>
        </div>
        <span>|</span>
        <div className="flex items-center gap-4">
          <Checkbox id="user" />
          <label htmlFor="user">User</label>
        </div>
      </div>
      <Button onClick={handleCreateUser}>Create</Button>
    </form>
  );
}
