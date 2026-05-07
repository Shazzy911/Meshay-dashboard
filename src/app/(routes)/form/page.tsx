"use client";

import React, { Suspense, useMemo, useState } from "react";
import style from "./page.module.scss";

const formList = [
  {
    key: "user",
    label: "User",
    component: React.lazy(
      () => import("@/components/common/common-forms/user-form/UserForm"),
    ),
  },
  {
    key: "artist",
    label: "Artist",
    component: React.lazy(
      () => import("@/components/common/common-forms/artist-form/ArtistForm"),
    ),
  },
  {
    key: "album",
    label: "Album",
    component: React.lazy(
      () => import("@/components/common/common-forms/album-form/AlbumForm"),
    ),
  },
  {
    key: "song",
    label: "Song",
    component: React.lazy(
      () => import("@/components/common/common-forms/song-form/SongForm"),
    ),
  },
  {
    key: "playlist",
    label: "Playlist",
    component: React.lazy(
      () =>
        import("@/components/common/common-forms/playlist-form/PlaylistForm"),
    ),
  },
];

const Page = () => {
  const [activeForm, setActiveForm] = useState(formList[0].key);

  const ActiveFormComponent = useMemo(() => {
    return formList.find((item) => item.key === activeForm)?.component;
  }, [activeForm]);

  console.log("Current activeForm:", activeForm);
  console.log("ActiveFormComponent:", ActiveFormComponent);

  return (
    <main className={style.container}>
      <div className={style.header}>
        <div>
          <h1 className={style.title}>Form Dashboard</h1>
        </div>
      </div>

      <nav className={style.nav} aria-label="Form selector">
        {formList.map((form) => (
          <button
            key={form.key}
            className={`${style.tabButton} ${
              form.key === activeForm ? style.activeTab : ""
            }`}
            type="button"
            onClick={() => {
              console.log("Button clicked:", form.key);
              setActiveForm(form.key);
            }}
          >
            {form.label}
          </button>
        ))}
      </nav>

      <section className={style.formCard}>
        <Suspense fallback={<p className={style.loading}>Loading form…</p>}>
          {ActiveFormComponent ? <ActiveFormComponent /> : null}
        </Suspense>
      </section>
    </main>
  );
};

export default Page;
