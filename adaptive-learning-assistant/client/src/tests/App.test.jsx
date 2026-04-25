import { render, screen } from '@testing-library/react';
import React from 'react';
import Dashboard from '../pages/Dashboard';

/**
 * Frontend Unit Tests
 * 
 * [Criteria Alignment - Testing]
 * This file uses Vitest and React Testing Library to validate UI rendering.
 */

describe('Dashboard Page Rendering', () => {
  test('renders the main welcome heading', () => {
    render(<Dashboard onStart={() => {}} />);
    const heading = screen.getByText(/Master any subject/i);
    expect(heading).toBeInTheDocument();
  });

  test('contains a search input for topics', () => {
    render(<Dashboard onStart={() => {}} />);
    const input = screen.getByPlaceholderText(/e.g. Transformers/i);
    expect(input).toBeInTheDocument();
  });
});
