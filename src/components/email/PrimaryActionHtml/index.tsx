import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  render,
} from '@react-email/components';

import * as React from "react";

interface EmailTemplateProps {
  actionLabel: string;
  buttonText: string;
  href: string;
}

export const EmailTemplate = ({
  actionLabel,
  buttonText,
  href,
}: EmailTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>
        Welcome to Chikiimass! Explore the world of movies and series.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`${process.env.NEXT_PUBLIC_SITE_URL}/icon.png`}
            width='150'
            height='150'
            alt='Chikiimass'
            style={logo}
          />
          <Text className="text-[24px] font-semibold leading-[32px] text-indigo-500">
            Hello and Welcome,
          </Text>
          <Text style={paragraph}>
            Thank you for joining  <Text className="text-[24px] font-semibold leading-[32px] text-indigo-500">Chikiimass</Text> We're thrilled to have you on board.
            Dive into our extensive collection of movies, series, and videos. Click the button below to {actionLabel}.
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href={href}>
              {buttonText}
            </Button>
          </Section>
          <Text style={paragraph}>
            Enjoy exploring the best of entertainment!
            <br />
            Cheers,
            <br />
            The Chikiimass Team
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            If you didn't sign up for this account, you can safely ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export const PrimaryActionEmailHtml = (
  props: EmailTemplateProps
) => render(<EmailTemplate {...props} />, { pretty: true });

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
};

const logo = {
  margin: '0 auto',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
};

const btnContainer = {
  textAlign: 'center' as const,
};

const button = {
  padding: '12px 12px',
  backgroundColor: '#FACC15',
  borderRadius: '3px',
  color: '#000',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
};

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
};
