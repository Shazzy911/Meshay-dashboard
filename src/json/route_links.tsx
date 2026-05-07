import { route_links_types } from "@/types/route_links_types";
import { FaTable } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { SiFormspree } from "react-icons/si";
export const sidebar_route_links: route_links_types[] = [
  {
    id: 1,
    link: "Dashboard",
    route: "/",
    icon: <MdDashboard />,
  },
  {
    id: 2,
    link: "form",
    route: "/form",
    icon: <SiFormspree />,
  },
  {
    id: 3,
    link: "Table",
    route: "/table",
    icon: <FaTable />,
  },
  // {
  //   id: 4,
  //   link: "Events",
  //   route: "/events",
  //   icon: <FaCalendarDays />,
  // },
];

export const form_route_links: route_links_types[] = [
  {
    id: 1,
    link: "User Form",
    route: "/form/userform",
  },
  {
    id: 2,
    link: "Artist Form",
    route: "/form/artistform",
  },
  {
    id: 3,
    link: "Album Form",
    route: "/form/albumform",
  },
  {
    id: 4,
    link: "Song Form",
    route: "/form/songform",
  },
  {
    id: 5,
    link: "Playlist Form",
    route: "/form/playlistform",
  },
  {
    id: 6,
    link: "Playlist Songs Form",
    route: "/form/playlistsong",
  },
  {
    id: 7,
    link: "Rating Form",
    route: "/form/ratingform",
  },
  {
    id: 8,
    link: "Subscription Form",
    route: "/form/subscriptionform",
  },
  {
    id: 9,
    link: "Payment Form",
    route: "/form/paymentform",
  },
];

export const topbar_route_links: route_links_types[] = [
  {
    id: 1,
    link: "Profile",
    route: "/profile",
  },
  {
    id: 2,
    link: "About",
    route: "/about",
  },
  {
    id: 3,
    link: "Contacts",
    route: "/contact",
  },
];
