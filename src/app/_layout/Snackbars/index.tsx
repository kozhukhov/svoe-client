import React, { useCallback } from 'react';
import { Toast, useToaster } from 'react-hot-toast/headless';
import { Paragraph } from 'theme/components/Typography';

import * as Styled from './styled';

export const SnackbarsProvider = () => {
  const { toasts, handlers } = useToaster({
    position: 'bottom-center',
    duration: 5000,
  });
  const { startPause, endPause, calculateOffset, updateHeight } = handlers;

  const renderToast = useCallback(
    (item: Toast) => {
      const offset = calculateOffset(item, {
        reverseOrder: false,
        gutter: 8,
      });

      const ref = (el: HTMLElement | null) => {
        if (el && typeof item.height !== 'number') {
          const { height } = el.getBoundingClientRect();

          updateHeight(item.id, height);
        }
      };

      const { id, visible, type, ariaProps, style } = item;

      return (
        <Styled.ItemWrapper
          data-testid="snackbars-item"
          key={id}
          ref={ref}
          style={{
            opacity: visible ? 1 : 0,
            transform: `translate(-50%, ${-offset}px)`,
            ...style,
          }}
          {...ariaProps}
        >
          <Styled.Icon $type={type} />
          <Paragraph color="#fff" level={3}>
            {String(item.message)}
          </Paragraph>
        </Styled.ItemWrapper>
      );
    },
    [calculateOffset, updateHeight],
  );

  return (
    <Styled.Wrapper onMouseEnter={startPause} onMouseLeave={endPause}>
      {toasts.map(renderToast)}
    </Styled.Wrapper>
  );
};

export { snackbar } from './snackbars';
