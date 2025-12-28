'use client';

import { Section } from 'app/_layout/Section';
import { SectionInfo } from 'app/_layout/SectionInfo';
import { PrimaryButton } from 'theme/components/Button';
import { FlexBox } from 'theme/components/FlexBox';

export default function PismoDirectoruPage() {
  return (
    <Section>
      <SectionInfo
        center
        content={
          <FlexBox gap="8px">
            <PrimaryButton label="Отправить письмо" />
          </FlexBox>
        }
        description="Расскажите нам, что вам не понравилось и что мы можем сделать лучше. Директор накажет виновных, свяжется с вами и предложит решение проблемы."
        maxWidth="600px"
        title="Напишите письмо директору"
      />
    </Section>
  );
}
