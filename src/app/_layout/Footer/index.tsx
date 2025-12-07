'use client';

import { Logo } from 'theme/components/Logo';
import { Paragraph } from 'theme/components/Typography';

import { Section } from '../Section';

import { MENU, SOCIALS } from './constants';
import * as Styled from './styled';

const PHONE_NUMBER_1_URL = 'tel:+79999999999';
const PHONE_NUMBER_1_LABEL = '+7 (999) 999-99-99';

export const Footer = () => {
  return (
    <Styled.Footer>
      <Section withoutMarginBottom>
        <Styled.Top>
          <Logo />
          <Styled.Contacts>
            <Styled.Link href={PHONE_NUMBER_1_URL} level={2}>
              {PHONE_NUMBER_1_LABEL}
            </Styled.Link>
          </Styled.Contacts>
        </Styled.Top>
        <Styled.Menu>
          {MENU.map((menu) => (
            <Styled.Column key={menu.title}>
              <Styled.ColumnTitle>{menu.title}</Styled.ColumnTitle>
              {menu.items.map((item) => (
                <Styled.Link
                  href={item.url}
                  key={item.title}
                  level={3}
                  marginBottom="4px"
                >
                  {item.title}
                </Styled.Link>
              ))}
            </Styled.Column>
          ))}
          <Styled.WorkTime>
            <Styled.ColumnTitle>График работы:</Styled.ColumnTitle>
            <Paragraph level={3}>
              Понедельник - пятница: 11:00 - 23:00 <br />
              Cуббота - воскресенье: 11:00 - 23:00
            </Paragraph>
          </Styled.WorkTime>
        </Styled.Menu>
        <Styled.Bottom>
          <Paragraph level={3}>
            ООО &quot;Фуд ивент&quot; <br /> УНП 691636983 <br /> г.Дзержинск,
            ул.Пераможцев 1Б пом.2
          </Paragraph>
          <Styled.Socials>
            {SOCIALS.map((social) => (
              <Styled.SocialLink
                $icon={social.icon}
                href={social.url}
                key={social.name}
                rel="noopener noreferrer"
                target="_blank"
              />
            ))}
          </Styled.Socials>
        </Styled.Bottom>
      </Section>
    </Styled.Footer>
  );
};
