// https://github.com/tryber/sd-024-a-live-lectures/blob/lecture/14.3/portfolio_example/src/tests/utils/renderWithRouter.js
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

function renderWithRouter(componentToRender, initialEntries = ['/']) {
  const customHistory = createMemoryHistory({ initialEntries });

  const objRender = render(
    <Router history={ customHistory }>
      { componentToRender }
    </Router>,
  );

  return {
    ...objRender,
    history: customHistory,
  };
}

export default renderWithRouter;
