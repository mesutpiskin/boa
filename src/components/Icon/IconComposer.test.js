import React from 'react';
import IconComposer from './IconComposer';
import * as SvgIcons from '@material-ui/icons';
import { createMount } from '../../../test/utils';

describe('<IconComposer /> tests', () => {
  let mount;

  before(() => {
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should mount', () => {
    const Composer = IconComposer(SvgIcons.Home);
    mount(<Composer nativeColor="#ffffff" />);
  });
});
