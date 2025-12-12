import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { Loader } from 'theme/components/Loader';
import { Progress } from 'theme/components/Progress';

import * as Styled from './styled';

type Props = {
  children: React.ReactNode;
  isLoading?: boolean;
  isValidating?: boolean;
  hasMore?: boolean;
  loadMore?: () => void;
};
export const PageLayout = ({
  children,
  isLoading,
  isValidating,
  hasMore,
  loadMore,
}: PropsWithChildren<Props>) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sentinelEl = sentinelRef.current;

    if (!sentinelEl) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore &&
          !isLoading &&
          !isValidating
        ) {
          loadMore?.();
        }
      },
      {
        rootMargin: '0px 0px 200px 0px',
        threshold: 0,
      },
    );

    observer.observe(sentinelEl);

    return () => {
      observer.unobserve(sentinelEl);
      observer.disconnect();
    };
  }, [hasMore, isLoading, isValidating, loadMore]);

  return (
    <Styled.Wrapper>
      <Styled.Content>
        {isLoading ? (
          <Progress />
        ) : (
          <>
            {children}
            <Styled.Sentinel ref={sentinelRef} />
            {isValidating && (
              <Styled.LoaderWrapper>
                <Loader size={32} />
              </Styled.LoaderWrapper>
            )}
          </>
        )}
      </Styled.Content>
    </Styled.Wrapper>
  );
};
