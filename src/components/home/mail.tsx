import { useMailContext } from "@/store/mail/mail.store";
import { AnyEmailItem, MailItemType, RootItem } from "@/store/mail/types";

import { Button } from "@react-email/button";
import { Column } from "@react-email/column";
import { Container } from "@react-email/container";
import { Heading } from "@react-email/heading";
import { Hr } from "@react-email/hr";
import { Html } from "@react-email/html";
import { Img } from "@react-email/img";
import { Link } from "@react-email/link";
import { Section } from "@react-email/section";
import { Text } from "@react-email/text";

export default function Mail() {
  const { $mail } = useMailContext();

  return <MailItem item={$mail.value} />;
}

function MailItem({ item }: { item: RootItem | AnyEmailItem }) {
  if (item.type === "root") {
    return (
      <Html id={item.id} data-item-type={item.type}>
        <Container>
          {item.children.map((child) => (
            <MailItem key={child.id} item={child} />
          ))}
        </Container>
      </Html>
    );
  }

  if (item.type === MailItemType.Section) {
    return (
      <Section>
        {item.children.map((child) => (
          <MailItem key={child.id} item={child} />
        ))}
      </Section>
    );
  }

  if (item.type === MailItemType.Column) {
    return (
      <Column data-item-type={item.type} id={item.id} width={300}>
        {item.children.map((child) => (
          <MailItem key={child.id} item={child} />
        ))}
      </Column>
    );
  }

  if (item.type === MailItemType.Container) {
    return (
      <Container data-item-type={item.type} id={item.id}>
        {item.children.map((child) => (
          <MailItem key={child.id} item={child} />
        ))}
      </Container>
    );
  }

  if (item.type === MailItemType.Button) {
    return (
      <Button data-item-type={item.type} {...item}>
        {item.label}
      </Button>
    );
  }

  if (item.type === MailItemType.Heading) {
    return (
      <Heading data-item-type={item.type} as={`h${item.level}`} id={item.id}>
        {item.text}
      </Heading>
    );
  }

  if (item.type === MailItemType.Image) {
    return <Img data-item-type={item.type} {...item} />;
  }

  if (item.type === MailItemType.Link) {
    return <Link data-item-type={item.type} {...item} />;
  }

  if (item.type === MailItemType.Separator) {
    return <Hr id={item.id} data-item-type={item.type} />;
  }

  if (item.text === MailItemType.Text) {
    return (
      <Text data-item-type={item.type} id={item.id}>
        {item.text}
      </Text>
    );
  }

  return null;
}
