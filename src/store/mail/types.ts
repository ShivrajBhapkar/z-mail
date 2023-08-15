export enum MailItemType {
  Column = "column",
  Section = "section",
  Container = "container",
  Button = "button",
  Text = "text",
  Heading = "heading",
  Separator = "separator",
  Image = "image",
  Link = "link",
}

export type ButtonItem = {
  id: string;
  type: MailItemType.Button;
  link: string;
  target?: string;
  label: string;
};

export type TextItem = {
  id: string;
  type: MailItemType.Text;
  text: string;
};

export type HeadingItem = {
  id: string;
  type: MailItemType.Heading;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
};

export type SeparatorItem = {
  id: string;
  type: MailItemType.Separator;
};

export type ImageItem = {
  id: string;
  type: MailItemType.Image;
  src: string;
  width: number;
  height: number;
  alt?: string;
};

export type LinkItem = {
  id: string;
  type: MailItemType.Link;
  href: string;
  label: string;
  target?: string;
};

export type ContainerItem = {
  id: string;
  type: MailItemType.Container;
  children: string[];
};

export type ColumnItem = {
  id: string;
  type: MailItemType.Column;
  children: string[];
};

export type SectionItem = {
  id: string;
  type: MailItemType.Section;
  children: string[];
};

export type RootItem = {
  id: string;
  type: "root";
  children: string[];
  items: Record<string, AnyEmailItem>;
  props: {
    width: number;
  };
};

export type AnyEmailItem =
  | ButtonItem
  | TextItem
  | HeadingItem
  | SeparatorItem
  | ImageItem
  | LinkItem
  | ContainerItem
  | ColumnItem
  | SectionItem;
