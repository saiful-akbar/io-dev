import {
  naikdaunHero,
  naikdaunDesktop1,
  naikdaunDesktop2,
  naikdaunDesktop3,
  naikdaunDesktop4,
  naikdaunMobile1,
  naikdaunMobile2,
  naikdaunMobile3,
  naikdaunMobile4,
  scooterWorkShopHero,
  scooterWorkShopDesktop1,
  scooterWorkShopDesktop2,
  scooterWorkShopDesktop3,
  scooterWorkShopMobile1,
  scooterWorkShopMobile2,
  scooterWorkShopMobile3,
} from "src/components/ImageLoader";

const iodev = {
  categories: ["web", "ui-ux"],
  projects: [
    {
      id: 0,
      name: "Naikdaun",
      slug: "naikdaun",
      category: "web",
      year: 2021,
      url: "https://naikdaun.id",
      heroImage: naikdaunHero,
      bannerColor: { primary: "#321272", secondary: "#a461b7" },
      tags: ["PHP", "Laravel", "Bootstrap", "Javascript", "jQuery"],
      details: [
        {
          title: "Overview",
          description:
            "Naikdaun is one of our first clients. We had the honor of being part of the team that developed this website.",
          subDescription:
            "Naikdaun is a company profile website that contains about them, to the various projects they have made",
          images: [],
        },
        {
          title: "UI",
          description:
            "UI Since hierarchy and design have a huge impact on usability, We complete all remaining functional decisions in the Design phase.",
          subDescription:
            "We designed page by page to look perfect on all types of devices. However, we pay extra attention to mobile devices because they are the ones that are used the most.",
          images: [
            {
              orientation: "horizontal",
              src: [
                naikdaunMobile1,
                naikdaunMobile2,
                naikdaunMobile3,
                naikdaunMobile4,
              ],
            },
            {
              orientation: "vertical",
              src: [
                naikdaunDesktop1,
                naikdaunDesktop2,
                naikdaunDesktop3,
                naikdaunDesktop4,
              ],
            },
          ],
        },
      ],
    },
    {
      id: 1,
      name: "Scooter Work Shop",
      slug: "scooter-work-shop",
      category: "web",
      year: 2021,
      url: "https://github.com/saiful-akbar/scooter-work-shop/",
      heroImage: scooterWorkShopHero,
      bannerColor: { primary: "#222859", secondary: "#5e6ba0" },
      tags: [
        "PHP",
        "Laravel",
        "MySql",
        "Javascript",
        "jQuery",
        "Datatables",
        "Bootstrap",
      ],
      details: [
        {
          title: "Overview",
          description:
            "Scooter Work Shop is a home for various kinds of scooter motorcycle parts. The place where you can find everything you need for your scooter. We have the opportunity to change the transaction process into an application that makes the process easier.",
          subDescription: null,
          images: [],
        },
        {
          title: "UI",
          description:
            "Although this application is mostly operated on desktop or laptop devices, we will not neglect the responsiveness of the user interface",
          subDescription:
            "Page after page we try to keep it looking perfect on various devices",
          images: [
            {
              orientation: "horizontal",
              src: [
                scooterWorkShopMobile1,
                scooterWorkShopMobile2,
                scooterWorkShopMobile3,
              ],
            },
            {
              orientation: "vertical",
              src: [
                scooterWorkShopDesktop1,
                scooterWorkShopDesktop2,
                scooterWorkShopDesktop3,
              ],
            },
          ],
        },
        {
          title: "Databases",
          description:
            "Database design is very important because it is the core of a system.",
          subDescription:
            "we did not 1 or 2 times overhaul this database design. We pay close attention to every relationship between table 1 and others to get maximum results",
          images: [
            {
              orientation: "vertical",
              src: [
                "/images/projects/scooter-work-shop/database-relation.webp",
              ],
            },
          ],
        },
      ],
    },
  ],
  clients: ["Naikdaun", "Scooter Work Shop"],
};

export default iodev;
