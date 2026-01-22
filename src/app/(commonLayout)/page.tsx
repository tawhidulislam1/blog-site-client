import { userService } from "@/user.services";
import { cookies } from "next/headers";

export default async function Home() {
  const { data, error } = await userService.getSession();
  console.log(data);
  return <h2>Hellow word</h2>;
}
