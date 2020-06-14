import React from 'react';
import { render } from '@testing-library/react';
import PostMeta from './PostMeta';

describe('PostMeta Testing', () => {
  test('renders correctly', () => {
    const { getByText } =
    render(<PostMeta 
      publishDate={"2020-01-01"} 
      readMinutes={1} 
      tags={ ["tag1", "tag2", "tag3"] } /> );
    const date = getByText(/January 1, 2020/);
    expect(date).toBeInTheDocument();
    const readMinutes = getByText(/1 min/);
    expect(readMinutes).toBeInTheDocument();
    const tags = getByText(/tag1 tag2 tag3/);
    expect(tags).toBeInTheDocument();
  });
  test('renders w/o tags: null', () => {
    const { getByText, queryByText } =
    render(<PostMeta 
      publishDate={"2020-01-01"} 
      readMinutes={1} /> );
    const date = getByText(/January 1, 2020/);
    expect(date).toBeInTheDocument();
    const readMinutes = getByText(/1 min/);
    expect(readMinutes).toBeInTheDocument();
    const tags = queryByText(/🏷️/);
    expect(tags).toBeNull();
  });
  test('renders w/o tags: []', () => {
    const { getByText, queryByText } =
    render(<PostMeta 
      publishDate={"2020-01-01"} 
      readMinutes={1} 
      tags={ [] } /> );
    const date = getByText(/January 1, 2020/);
    expect(date).toBeInTheDocument();
    const readMinutes = getByText(/1 min/);
    expect(readMinutes).toBeInTheDocument();
    const tags = queryByText(/🏷️/);
    expect(tags).toBeNull();
  });
});
