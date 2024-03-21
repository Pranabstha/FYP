import Container from "./Components/Container";
import getListing from "./action/getListings";
import EmptyState from "./Components/EmptyState";
import Card from "./Components/Listings/Card";
import Client from "./Components/Client";
import getCurrentUser from "./action/getUser";
import homepage from "./pages/home/user/page";
import { redirect } from "next/navigation";

export default async function Home() {
  const showListings = await getListing();
  const isEmpty = true;
  const currentUser = await getCurrentUser();
  console.log(currentUser);

  if (currentUser?.role === "ADMIN") {
    return redirect("/pages/home/admin/");
  }

  if (showListings.length === 0) {
    return <EmptyState showReset />;
  }
  return (
    <Client>
      <Container>
        <div
          className="
        pt-24
        grid 
        grid-cols-1
        sm: grid-cols-2
        md: grid-cols-3
        lg: grid-cols-4
        xl: grid-cols-5
        2xl: grid-cols-6
        gap-8
        "
        >
          {showListings.map((listing: any) => {
            return (
              <div>
                <Card
                  data={listing}
                  key={listing.id}
                  currentUser={currentUser}
                />
              </div>
            );
          })}
        </div>
        {/* <homepage /> */}
      </Container>
    </Client>
  );
}
