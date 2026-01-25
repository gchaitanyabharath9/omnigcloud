"use client";

import * as React from "react";
import { NextIntlClientProvider } from "next-intl";
import type { AbstractIntlMessages } from "next-intl";

type Props = {
  locale: string;
  messages: AbstractIntlMessages;
  timeZone?: string;
  now?: Date;
  children: React.ReactNode;
};

export default function ClientIntlProvider({ locale, messages, timeZone, now, children }: Props) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone={timeZone}
      now={now}
      getMessageFallback={({ namespace, key }) => (namespace ? `${namespace}.${key}` : key)}
    >
      {children}
    </NextIntlClientProvider>
  );
}
