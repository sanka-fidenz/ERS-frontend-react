import { Header, UserList } from "./components";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Input } from "./components/ui/input";
import { useAuth } from "./contexts";

function App() {
  const { token, roles } = useAuth();

  return (
    <div>
      <Header />

      <main className="max-w-screen-xl mx-auto p-5">
        <section className="mt-5">
          <h1 className="text-4xl font-semibold">Events</h1>

          <div className="mt-5">
            <Input placeholder="Search Event" />
          </div>

          {token && roles?.includes("admin") && roles.includes("moderator") && (
            <div className="grid grid-cols-3 gap-5 mt-5">
              <Card>
                <CardHeader className="items-center">
                  <CardTitle>4</CardTitle>
                  <CardDescription>Today Events</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="items-center">
                  <CardTitle>4</CardTitle>
                  <CardDescription>Active Events</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="items-center">
                  <CardTitle>4</CardTitle>
                  <CardDescription>My Events</CardDescription>
                </CardHeader>
              </Card>
            </div>
          )}
        </section>

        <section className="mt-5">
          <div className="flex flex-col gap-5">
            {[1, 2, 3, 4, 5].map((x) => (
              <Card className="flex overflow-hidden" key={x}>
                <div className="w-96 shrink-0 bg-red-300">image</div>
                <div className="flex-grow">
                  <CardHeader>
                    <CardDescription>Starts in 3 hours</CardDescription>
                    <CardTitle>Friendly Cricket match</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="three-line-ellipsis">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Consequuntur odit eum omnis saepe accusamus provident quae
                      incidunt dignissimos ullam eos? Dolor optio qui labore
                      tempore quidem autem, eligendi ipsam sequi. Lorem ipsum
                      dolor sit amet consectetur adipisicing elit. Consequuntur
                      odit eum omnis saepe accusamus provident quae incidunt
                      dignissimos ullam eos? Dolor optio qui labore tempore
                      quidem autem, eligendi ipsam sequi.
                    </p>

                    <div className="flex justify-end mt-5">
                      <Button>Register</Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {roles?.includes("admin") && token && <UserList />}
      </main>
    </div>
  );
}

export default App;
