import { AnyEmailItem, MailItemType } from ".";

export default {
  [MailItemType.Button]: {
    props: { link: "", target: "" },
    children: "Button",
  },
  [MailItemType.Column]: { children: [] },
  [MailItemType.Container]: { children: [] },
  [MailItemType.Heading]: { props: { level: 1, text: "Edit this heading" } },
  [MailItemType.Image]: {
    props: {
      src: new URL("/img-placeholder.webp", import.meta.url).href,
      width: "600",
      height: "",
      alt: "",
    },
  },
  [MailItemType.Link]: { props: { href: "", label: "", target: "" } },
  [MailItemType.Section]: { children: [] },
  [MailItemType.Separator]: {},
  [MailItemType.Text]: { props: { text: "Edit the text" } },
  root: { props: { width: 600 } },
} satisfies {
  [K in MailItemType | "root"]: K extends AnyEmailItem["type"]
    ? Partial<AnyEmailItem>
    : never;
};
