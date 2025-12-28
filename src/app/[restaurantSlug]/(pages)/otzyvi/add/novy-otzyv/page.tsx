'use client';

import { FcGoogle } from 'react-icons/fc';
import { Section } from 'app/_layout/Section';
import { SectionInfo } from 'app/_layout/SectionInfo';
import { SecondaryButton } from 'theme/components/Button';
import { FlexBox } from 'theme/components/FlexBox';

import * as Styled from './styled';

export default function NovyOtzyvPage() {
  return (
    <Section>
      <SectionInfo
        center
        content={
          <FlexBox direction="column" gap="8px" marginTop="16px">
            <SecondaryButton
              icon={<FcGoogle size={20} />}
              label="Оставить отзыв на Google картах"
            />
            <Styled.Separator>Или</Styled.Separator>
          </FlexBox>
        }
        description="Мы рады, что вам все понравилось! Мы ценим ваше мнение и будем благодарны, если вы поделитесь им"
        maxWidth="600px"
        title="Оставьте отзыв"
      />
    </Section>
  );
}
