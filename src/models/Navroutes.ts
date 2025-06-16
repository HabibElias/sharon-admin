export default interface NavItem {
  title: string;
  href: string;
  description: string;
  children?: NavItem[];
}
export const navigationItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    description: "Admin page",
  },
  {
    title: "Members",
    href: "/members",
    description: "Track members",
  },
  {
    title: "Donations",
    href: "/donations",
    description: "Track donations",
  },
  {
    title: "Resources",
    href: "/images",
    description: "View Images and books",
    children: [
      {
        title: "Images",
        href: "/images",
        description: "View images",
      },
      {
        title: "Books",
        href: "/books",
        description: "View books",
      },
    ],
  },
];
