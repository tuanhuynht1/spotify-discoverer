import React, {Fragment} from 'react';
import {SearchBar} from './components/SearchBar';
import {Tracks} from './components/Tracks';
import {DiscoverBttn} from './components/DiscoverBttn';

export const App = () => {
  return (
    <Fragment>
      <SearchBar/>
      <Tracks />
      <DiscoverBttn />
    </Fragment>
  );
}
