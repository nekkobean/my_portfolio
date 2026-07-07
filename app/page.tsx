import { Suspense } from "react";
import HomeContent from "./content";

export default function MyProfile() {
  return (
    <Suspense fallback={"Loading..."}>
      <HomeContent />
    </Suspense>
  );
}
