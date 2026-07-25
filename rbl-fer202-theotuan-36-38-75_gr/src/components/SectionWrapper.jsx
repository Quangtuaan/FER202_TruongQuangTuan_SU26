import React from 'react';

/**
 * SectionWrapper component to wrap sections with a title and optional subtitle.
 * Uses props.children to render nested components.
 * 
 * @param {Object} props
 * @param {string} props.title - The title of the section
 * @param {string} [props.subtitle] - Optional subtitle above the main title
 * @param {React.ReactNode} props.children - Nested elements/components
 */
const SectionWrapper = ({ title, subtitle, children }) => {
  return (
    <section className="section-wrapper reveal-el">
      {subtitle && (
        <div className="text-mask-wrapper">
          <div className="section-subtitle reveal-el">{subtitle}</div>
        </div>
      )}
      <div className="text-mask-wrapper">
        <h2 className="reveal-el delay-100">{title}</h2>
      </div>
      {children}
    </section>
  );
};

export default SectionWrapper;
