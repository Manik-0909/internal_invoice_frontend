import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n/config';
import ComingSoon from './ComingSoon';

describe('ComingSoon', () => {
  const renderWithI18n = (
    component: React.ReactElement
  ): ReturnType<typeof render> => {
    return render(<I18nextProvider i18n={i18n}>{component}</I18nextProvider>);
  };

  it('renders the product name', () => {
    renderWithI18n(<ComingSoon />);
    expect(screen.getByText('Invoice Automation')).toBeInTheDocument();
  });

  it('renders the tagline', () => {
    renderWithI18n(<ComingSoon />);
    expect(
      screen.getByText('Smart invoice processing for modern businesses')
    ).toBeInTheDocument();
  });

  it('renders the description', () => {
    renderWithI18n(<ComingSoon />);
    expect(
      screen.getByText(
        /We're building something calm, powerful, and designed for accountants/
      )
    ).toBeInTheDocument();
  });

  it('renders email input', () => {
    renderWithI18n(<ComingSoon />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders notify button', () => {
    renderWithI18n(<ComingSoon />);
    expect(
      screen.getByRole('button', { name: /notify me/i })
    ).toBeInTheDocument();
  });

  it('renders privacy notice', () => {
    renderWithI18n(<ComingSoon />);
    expect(
      screen.getByText(/We respect your privacy. No spam, ever./)
    ).toBeInTheDocument();
  });
});
