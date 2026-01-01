import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatusBadge from './StatusBadge';

describe('StatusBadge', () => {
  it('renders children correctly', () => {
    render(<StatusBadge status="success">Success</StatusBadge>);
    expect(screen.getByText('Success')).toBeInTheDocument();
  });

  it('applies success status styles', () => {
    render(<StatusBadge status="success">Success</StatusBadge>);
    const badge = screen.getByText('Success');
    expect(badge.className).toContain('bg-green-50');
    expect(badge.className).toContain('text-green-700');
  });

  it('applies warning status styles', () => {
    render(<StatusBadge status="warning">Warning</StatusBadge>);
    const badge = screen.getByText('Warning');
    expect(badge.className).toContain('bg-yellow-50');
    expect(badge.className).toContain('text-yellow-800');
  });

  it('applies error status styles', () => {
    render(<StatusBadge status="error">Error</StatusBadge>);
    const badge = screen.getByText('Error');
    expect(badge.className).toContain('bg-red-50');
    expect(badge.className).toContain('text-red-700');
  });

  it('applies info status styles', () => {
    render(<StatusBadge status="info">Info</StatusBadge>);
    const badge = screen.getByText('Info');
    expect(badge.className).toContain('bg-blue-50');
    expect(badge.className).toContain('text-blue-700');
  });

  it('applies neutral status styles', () => {
    render(<StatusBadge status="neutral">Neutral</StatusBadge>);
    const badge = screen.getByText('Neutral');
    expect(badge.className).toContain('bg-neutral-50');
    expect(badge.className).toContain('text-neutral-600');
  });

  it('applies small size styles', () => {
    render(
      <StatusBadge status="success" size="sm">
        Small
      </StatusBadge>
    );
    const badge = screen.getByText('Small');
    expect(badge.className).toContain('text-xs');
  });

  it('applies medium size styles by default', () => {
    render(<StatusBadge status="success">Medium</StatusBadge>);
    const badge = screen.getByText('Medium');
    expect(badge.className).toContain('text-sm');
  });
});
