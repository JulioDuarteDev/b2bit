import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth.tsx";

export function Profile() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <>
      <div className="h-screen bg-background-private flex flex-col justify-center items-center">
        <header
          className={"fixed top-0 bg-background w-full flex justify-end p-3"}
        >
          <Button
            className={"w-64 h-11 font-bold text-base"}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </header>
        <div
          id={"container"}
          className="bg-background self-center flex-col drop-shadow-2xl rounded-2xl p-4 flex gap-4"
        >
          <div className={"flex flex-col justify-center items-center gap-2"}>
            <p className={"font-semibold text-xs"}>Profile picture</p>
            <img
              className={"size-14 rounded"}
              src={user?.avatar.low}
              alt="Profile picture"
            />
          </div>
          <div className={"flex flex-col gap-2"}>
            <Label htmlFor={"user_name"} className={"text-sm"}>
              <span className={"font-normal"}>Your</span> Name
            </Label>
            <Input
              id={"user_name"}
              className={"w-72"}
              value={user?.name}
              disabled={true}
            />
          </div>
          <div className={"flex flex-col gap-2"}>
            <Label htmlFor={"user_email"} className={"text-sm"}>
              <span>
                <span className={"font-normal"}>Your</span> Email
              </span>
            </Label>
            <Input id={"user_email"} value={user?.email} disabled={true} />
          </div>
        </div>
      </div>
    </>
  );
}
