import { HomeClient } from "../components/home-client";
import { HomePersonal } from "../components/home-personal";
import { LoadingFullscreen } from "../components/loading-fullscreen";
import { useAuth } from "../hooks/useAuth";
import { UserRole } from "../models/user-role";

export function Component() {
  const { userInfo } = useAuth();

  if (userInfo == null) {
    return <LoadingFullscreen />
  }

  return userInfo.role === UserRole.CLIENT ? <HomeClient /> : <HomePersonal />;
}