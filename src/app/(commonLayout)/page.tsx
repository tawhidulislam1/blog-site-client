import { userService } from "@/user.services";


export default async function Home() {
  const { data } = await userService.getSession();
  console.log(data);
  return <h2>Hellow word</h2>;
}
