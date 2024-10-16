import React, { Suspense } from "react";
import style from "./page.module.scss";

const AlbumForm = React.lazy(
  () => import("@/components/common/common-forms/album-form/AlbumForm")
);
const SongForm = React.lazy(
  () => import("@/components/common/common-forms/song-form/SongForm")
);
const UserForm = React.lazy(
  () => import("@/components/common/common-forms/user-form/UserForm")
);
const ArtistForm = React.lazy(
  () => import("@/components/common/common-forms/artist-form/ArtistForm")
);
const Page = () => {
  return (
    <main className={style.container}>
      <section>
        <Suspense fallback={<p>Loading... Forms</p>}>
          <UserForm />
        </Suspense>
      </section>
      <section>
        <Suspense fallback={<p>Loading... Forms</p>}>
          <ArtistForm />
        </Suspense>
      </section>
      <section>
        <Suspense fallback={<p>Loading... Forms</p>}>
          <AlbumForm />
        </Suspense>
      </section>
      <section>
        <Suspense fallback={<p>Loading... Forms</p>}>
          <SongForm />
        </Suspense>
      </section>
    </main>
  );
};

export default Page;
