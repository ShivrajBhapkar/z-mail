import { MailItemType } from "./types";

export const acceptance = {
  root: [MailItemType.Section],
  [MailItemType.Section]: [MailItemType.Column],
  [MailItemType.Column]: [MailItemType.Container],
  [MailItemType.Container]: [
    MailItemType.Button,
    MailItemType.Heading,
    MailItemType.Image,
    MailItemType.Link,
    MailItemType.Separator,
    MailItemType.Text,
  ],
  [MailItemType.Button]: [],
  [MailItemType.Heading]: [],
  [MailItemType.Image]: [],
  [MailItemType.Link]: [],
  [MailItemType.Separator]: [],
  [MailItemType.Text]: [],
} as Record<MailItemType | "root", MailItemType[]>;

export function canXAcceptY(x: MailItemType | "root", y: MailItemType) {
  return acceptance[x].includes(y);
}
