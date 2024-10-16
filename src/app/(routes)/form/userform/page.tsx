import React, { Suspense } from "react";
const Userform = React.lazy(
  () => import("@/components/common/user-form/Userform")
);
const Page = () => {
  return (
    <main>
      <Suspense fallback={<p>Loading... Forms</p>}>
        <Userform />
      </Suspense>
    </main>
  );
};

export default Page;
